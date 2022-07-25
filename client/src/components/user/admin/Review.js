/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ReviewCard from "../../utils/ReviewCard";
import Header from "../../../container/layout/Header";
import adminService from "../../../services/adminService";

const AdminReviewList = () => {
  const [open, setOpen] = React.useState(false);
  const [adminReviews, setAdminReviews] = React.useState([]);
  const [selectedReview, setselectedReview] = React.useState({
    _id: "123",
    teacher: { username: "meel" },
    rating: 5,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const jwt = localStorage.getItem("JWT");
    const res = await adminService.getReviews(jwt);
    if (res.status === 200) {
      setAdminReviews(res.data.reviews);
    } else {
      console.log("[USER REVIEWS] Could not get reviews");
    }
    // eslint-disable-next-line
  }, []);

  // const modalTemplate = (
  //   <div className={classes.paper}>
  //     <h2 id="simple-modal-title">
  //       Deleting Review for {selectedReview.teacher.username}
  //     </h2>
  //     <p id="simple-modal-description">
  //       You have given {selectedReview.teacher.username} a rating of{" "}
  //       {selectedReview.rating}. Do you want to Delete?
  //     </p>
  //     <Button
  //       variant="contained"
  //       color="primary"
  //       onClick={handleDelete}
  //       style={{ width: "10rem", margin: "1rem" }}
  //     >
  //       Yes
  //     </Button>
  //     <Button
  //       variant="contained"
  //       color="primary"
  //       onClick={handleClose}
  //       style={{ width: "10rem", margin: "1rem" }}
  //     >
  //       No
  //     </Button>
  //   </div>
  // );

  return (
    <div>
      <Header />
      <div className="container">
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
    </div>
  );
};

export default AdminReviewList;
