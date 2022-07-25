import { Button, List, ListItem, Modal, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import equal from "fast-deep-equal";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import adminService from "../../services/adminService";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
  },
}));

const AdminReviewList = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [adminReviews, setAdminReviews] = React.useState([]);
  const [selectedReview, setselectedReview] = React.useState({
    _id: "123",
    teacher: { username: "meel" },
    rating: 5,
  });

  const handleOpen = (id) => (_event) => {
    console.log(selectedReview);
    setselectedReview(adminReviews.filter((x) => x._id === id)[0]);
    setOpen(true);
  };

  const handleDelete = async () => {
    console.log(selectedReview._id);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const jwt = localStorage.getItem("JWT");
    const res = await adminService.getReviews(jwt);
    if (res.status === 200 && !equal(adminReviews, res.data.reviews)) {
      setAdminReviews(res.data.reviews);
    } else {
      console.log("[USER REVIEWS] Could not get reviews");
    }
    // eslint-disable-next-line
  }, []);

  const modalTemplate = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">
        Deleting Review for {selectedReview.teacher.username}
      </h2>
      <p id="simple-modal-description">
        You have given {selectedReview.teacher.username} a rating of{" "}
        {selectedReview.rating}. Do you want to Delete?
      </p>
      <Button
        variant="contained"
        color="primary"
        onClick={handleDelete}
        style={{ width: "10rem", margin: "1rem" }}
      >
        Yes
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClose}
        style={{ width: "10rem", margin: "1rem" }}
      >
        No
      </Button>
    </div>
  );

  return (
    <>
      {adminReviews.map((review) => (
        <Paper key={review._id} elevation={3} style={{ margin: "1rem" }}>
          <List>
            <ListItem>
              <Link to={`/teachers/${review.teacher._id}`}>
                Teacher: {review.teacher.username}
              </Link>
            </ListItem>
            <ListItem>Anonymous: {String(review.anonymous)}</ListItem>
            <ListItem>Approved: {String(review.approved)}</ListItem>
            <ListItem>Rating: {review.rating}</ListItem>
            <ListItem>Comments: {review.comments}</ListItem>
            <Button
              variant="contained"
              color="primary"
              onClick={() => console.log("clicked")}
              style={{ width: "10rem", margin: "1rem" }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpen(review._id)}
              style={{ width: "10rem", margin: "1rem" }}
            >
              Delete
            </Button>
          </List>
        </Paper>
      ))}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="user-review-delete"
        aria-describedby="user-review-delete-confirm"
      >
        {modalTemplate}
      </Modal>
    </>
  );
};

export default AdminReviewList;
