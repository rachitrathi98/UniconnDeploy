/* eslint-disable react/require-default-props */
import { Button, Checkbox, Divider, TextField } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import reviewService from "../../services/reviewService";

const ReviewFormTemplate = ({
  reviewId,
  teacherId,
  teacherName,
  teacherEmail,
  rating,
  comments,
  anonymous,
  approved,
}) => {
  const history = useHistory();
  const jwt = localStorage.getItem("JWT");
  const [review, setReview] = useState({
    reviewId,
    teacherId,
    teacherName,
    teacherEmail,
    rating,
    comments,
    anonymous,
    approved,
  });

  const submitReview = async (event) => {
    event.preventDefault();
    console.log(review);
    if (!review._id) {
      const res = await reviewService.postReview(jwt, review);
      if (res.status === 200) {
        history.push(`/reviews`);
      }
    }
  };

  return (
    <>
      <div style={{ margin: "2rem" }}>
        <div>Teacher Name: {teacherName}</div>
        <div>Teacher Email: {teacherEmail}</div>
      </div>
      <Divider />
      <form
        onSubmit={submitReview}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "2rem",
          }}
        >
          <span>Comments</span>
          <TextField
            label="Comments"
            variant="filled"
            multiline
            value={review.comments}
            onChange={(event) =>
              setReview({ ...review, comments: event.target.value })
            }
            style={{ width: "30rem" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "2rem",
          }}
        >
          <span>Rating</span>
          <Rating
            name="rating"
            value={Number(review.rating)}
            onChange={(event) =>
              setReview({ ...review, rating: event.target.value })
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "2rem",
          }}
        >
          <span>Anonymous</span>
          <Checkbox
            label="Anonymous"
            value={review.anonymous}
            onChange={(event) =>
              setReview({ ...review, anonymous: event.target.checked })
            }
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ width: "10rem", margin: "2rem" }}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

// ReviewFormTemplate.propTypes = {
//   reviewId: PropTypes.string,
//   teacherId: PropTypes.string,
//   teacherName: PropTypes.string,
//   teacherEmail: PropTypes.string,
//   rating: PropTypes.number,
//   comments: PropTypes.string,
//   anonymous: PropTypes.bool,
//   approved: PropTypes.bool,
// };

export default ReviewFormTemplate;
