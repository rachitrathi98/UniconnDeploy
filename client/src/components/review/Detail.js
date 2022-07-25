import React from "react";
import Header from "../../container/layout/Header";
import Sidebar from "../../container/layout/Sidebar";
import Progress from "../utils/Progress";
import image from "../../assets/images/Rectangle.png";
import Project from "../utils/Project";
import ReviewCard from "../utils/ReviewCard";

const ReviewDetail = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row mt-2 cover">
          <Sidebar />
          <div className="col-lg-9 profile">
            <div className="profile-img">
              <img alt="profile" src={image} className="pfp" />
              <div className="row">
                <div className="col-lg-4">
                  <h4 className="mt-3">Reena Sonkusare</h4>
                  <p>Assistant Professor at EXTC Branch</p>
                  <p>Sardar Patel Institute Of Technology</p>
                  <p>Mumbai, Maharashtra</p>
                  <p>19+ Years Of Experience</p>
                  <h4 className="mt-3">PROJECT MENTOR</h4>
                  <small>(15 Ratings)</small>
                  <strong>
                    <p>Average</p>
                  </strong>
                  <Progress />
                  <strong>
                    <p>Average</p>
                  </strong>
                  <Progress />
                  <strong>
                    <p>Average</p>
                  </strong>
                  <Progress />
                  <strong>
                    <p>Average</p>
                  </strong>
                  <Progress />
                </div>
                <div className="col-lg-4 text-center mt-4">
                  <h4>TEACHING</h4>
                  <small>(23 Ratings)</small>
                  <strong>
                    <p>Average</p>
                  </strong>
                  <Progress />
                  <strong>
                    <p>Average</p>
                  </strong>
                  <Progress />
                  <strong>
                    <p>Average</p>
                  </strong>
                  <Progress />
                  <strong>
                    <p>Average</p>
                  </strong>
                  <Progress />
                  <strong>
                    <p>Average</p>
                  </strong>
                  <Progress />
                  <h5 className="mt-3">ADMINISTRATION</h5>
                  <small>(15 Ratings)</small>
                </div>
                <div className="col-lg-4 mt-3 text-center">
                  {/* <h3>Projects you might be interested in</h3> */}
                  <Project />
                  <Project />
                  <Project />
                </div>
              </div>
            </div>
            <ReviewCard />
            <ReviewCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail;
