import React, { Fragment, useState } from "react";
import Moment from "react-moment";
// import { Link } from "react-router-dom";
import LoadingSign from "../utils/LoadingSign";

const Notification = (props) => {
  let [showAcceptRejectButtons, setShowAcceptRejectButtons] = useState("");
  const data = props.notification;
  const type = props.notification ? props.notification.NotificationType : null;
  let notificationText = data.Message
    ? data.Message
    : props.fromUser
    ? `You have a notification from ${props.fromUser.name}`
    : null;

  let render = <LoadingSign />;
  if (props.fromUser)
    render = (
      <div
        className="home-forum question-box pb-lg-4"
        style={{ position: "relative" }}
      >
        <h5>
          {/* <Link to={`/privateforum/answer/${props.question._id}`}> */}
          <strong>{notificationText}</strong>
          {/* <span className="PrivateForumHome-span d-none d-lg-inline float-right">
            <button
              className="btn btn-outline-danger"
              onClick={(e) => {
                props.deleteHandler(e, data._id);
              }}
            >
              <i className="far fa-trash-alt"></i>
            </button>
          </span> */}
        </h5>
        {type.includes("Project") && props.notification.project && (
          <p>
            <strong>Title:</strong> {props.notification.project.title}
          </p>
        )}
        {type.includes("Activity") && props.notification.activity && (
          <p>
            <strong>Title:</strong> {props.notification.activity.title}
          </p>
        )}
        <span className="PrivateForumHome-span" style={{ fontSize: "1rem" }}>
          <strong>
            {<Moment format="DD MMM, YYYY">{props.notification.date}</Moment>} |{" "}
            {<Moment format="HH:mm">{props.notification.date}</Moment>}
          </strong>
        </span>
        <br className="d-lg-none" />
        <br className="d-lg-none" />
        <span className="PrivateForumHome-span d-inline d-lg-none float-lg-right">
          <button
            className="btn btn-outline-danger"
            onClick={(e) => {
              props.deleteHandler(e, data._id);
            }}
          >
            <i className="far fa-trash-alt"></i>
          </button>
        </span>
        <span
          className="PrivateForumHome-span d-none d-lg-inline"
          style={{ position: "absolute", right: 20, top: 5 }}
        >
          <button
            className="btn btn-outline-danger"
            onClick={(e) => {
              props.deleteHandler(e, data._id);
            }}
          >
            <i className="far fa-trash-alt"></i>
          </button>
        </span>
        <div style={{ display: "flex", float: "right" }}>
          <span
            className="PrivateForumHome-span"
            // style={{ position: "absolute", right: 0 }}
          >
            <button
              className="btn btn-outline-primary"
              onClick={(e) => {
                props.viewHandler(e, data.Link);
              }}
            >
              View
            </button>
          </span>
          {(type === "ProjectRequest" ||
            type === "ChatRequest" ||
            type === "ActivityRequest") && (
            <Fragment>
              <span
                className="PrivateForumHome-span"
                // style={{ position: "absolute", right: 80 }}
              >
                {showAcceptRejectButtons !== "reject" && (
                  <button
                    className="btn btn-outline-success"
                    disabled={showAcceptRejectButtons === "accepted"}
                    onClick={(e) => {
                      setShowAcceptRejectButtons("accepted");
                      props.acceptHandler(e, data, props.fromUser);
                    }}
                  >
                    {showAcceptRejectButtons === "accepted"
                      ? "Accepted"
                      : "Accept"}
                  </button>
                )}
              </span>
              <span
                className="PrivateForumHome-span"
                // style={{ position: "absolute", right: 180 }}
              >
                {showAcceptRejectButtons !== "accepted" && ( //only show button if accept is not clicked
                  <button
                    className="btn btn-outline-danger"
                    disabled={showAcceptRejectButtons === "rejected"}
                    onClick={(e) => {
                      setShowAcceptRejectButtons("rejected");
                      props.rejectHandler(e, data, props.fromUser);
                    }}
                  >
                    {showAcceptRejectButtons === "rejected"
                      ? "Rejected"
                      : "Reject"}
                  </button>
                )}
              </span>
            </Fragment>
          )}
        </div>
      </div>
    );
  return render;
};

export default Notification;
