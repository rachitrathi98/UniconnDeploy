import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getAction,deleteAction } from "../../services/generalServices";

const UserReviewList = () => {

  const handleDelete = async () => {
    const res = await deleteAction("jwt._id");
    if (res.status === 200) {
      // dispatch(updateUserReviews(userReviews.filter(x => x._id !== toDeleteReview._id)));
      console.log(`[USER REVIEWS] success - ${res.status}`);
    }
  };

  useEffect(() => {
    const userReviews = async () => {
      const res = await getAction("jwt");
      if (res.status === 200) {
        // dispatch(updateUserReviews(res.data.reviews));
        console.log(
          `[USER REVIEWS] success - ${res.status} ${res.data.reviews}`,
        );
      } else {
        console.log("[USER REVIEWS] Could not get reviews");
      }
    };
    userReviews();
  }, []);

  return (
    <div> here are your reviews</div>
  );
};

export default UserReviewList;
