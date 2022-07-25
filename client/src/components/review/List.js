import { Button, List, ListItem, Paper } from "@material-ui/core";
import equal from "fast-deep-equal";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
// import { updateReviews } from "../../reducers/reviewsReducer";
import Header from "../../container/layout/Header";
import ReviewCard from "../utils/ReviewCard";
import reviewServices from "../../services/reviewService";

const ReviewList = () => {
  const match = useRouteMatch();
  const history = useHistory();
  // const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const res = await reviewServices.getReviews();
    if (res.status === 200 && !equal(reviews, res.data.reviews)) {
      // dispatch(updateReviews(res.data.reviews));
      console.log(`[STUDENT] success - ${res.status}`);
    } else {
      console.log("[REVIEWS] Could not get reviews");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // <>
    //   {reviews.map((review) => (
    //     <Paper key={review._id} elevation={3} style={{ margin: "1rem" }}>
    //       <List>
    //         <ListItem>
    //           <Link to={`/teachers/${review.teacher._id}`}>
    //             Teacher: {review.teacher.username}
    //           </Link>
    //         </ListItem>
    //         <ListItem>
    //           <Link
    //             to={
    //               review.student
    //                 ? `/students/${review.student._id}`
    //                 : `/students`
    //             }
    //           >
    //             Student:{" "}
    //             {review.student ? review.student.username : "Anonymous"}
    //           </Link>
    //         </ListItem>
    //         <ListItem>Rating: {review.rating}</ListItem>
    //         <ListItem>Comments: {review.comments}</ListItem>
    //       </List>
    //     </Paper>
    //   ))}
    //   <Button
    //     variant="contained"
    //     color="primary"
    //     onClick={() => history.push(`${match.url}/edit`)}
    //     style={{ width: "10rem", margin: "1rem" }}
    //   >
    //     Add Review
    //   </Button>
    // </>
    <div>
      <Header />
      <div className="container">
        {/* 
          I think we will need to pass the teacher name as props and make some changes 
          to the ReviewCard file  
        */}
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
    </div>
  );
};

export default ReviewList;
