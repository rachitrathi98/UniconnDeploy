import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import Popup from "./Popup";
import Moment from "react-moment";
import { toast } from "react-toastify";
import { postAction } from "../../services/generalServices";
import { isAuth } from "../../utils/helper";
// import { isAuth } from "../../utils/helper";

const QuestionCard = (props) => {
  const { adminApprove } = props;
  const pathname = window.location.href;
  const isPrivate = pathname.includes("private");
  const [isOpen, setIsOpen] = useState(false);
  const [text, setext] = useState("");
  const upVote = [...props.question.upvotes];
  const downVote = [...props.question.downvotes];

  const upVoteIncrement = () => {
    if (!upVote.includes(isAuth()._id)) {
      upVote.push(isAuth()._id);
      if (downVote.includes(isAuth()._id))
        downVote.splice(downVote.indexOf(isAuth()._id), 1);
      props.handleRatings(props.question, upVote, downVote);
    }
  };

  const downVoteIncrement = () => {
    if (!downVote.includes(isAuth()._id)) {
      downVote.push(isAuth()._id);
      if (upVote.includes(isAuth()._id))
        upVote.splice(upVote.indexOf(isAuth()._id), 1);
      props.handleRatings(props.question, upVote, downVote);
    }
  };
  const QUESTIONLINK = window.location.href.includes("answer")
    ? window.location.href
    : window.location.href + `/answer/${props.question._id}`;

  const togglePopup = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleReport = (event) => {
    event.preventDefault();
    console.log("send this data via mail");
    postAction("/auth/report", { hey: "efsdfs" });
  };

  return (
    <div className="home-forum question-box my-1 list-border">
      <div
        className="card d-block px-lg-4 py-lg-3 py-3 px-1"
        style={{ borderRadius: "20px" }}
      >
        <h5>
          {isPrivate ? (
            <Link
              className="question-prop"
              to={`/privateforum/answer/${props.question._id}`}
            >
              <strong>{props.question.question}</strong>
            </Link>
          ) : (
            <Link
              className="question-prop"
              to={`/publicforum/answer/${props.question._id}`}
            >
              <strong>{props.question.question}</strong>
            </Link>
          )}
          {window.location.href.includes("yourposts") && (
            <button
              onClick={(e) =>
                props.deleteHandler(
                  e,
                  props.question._id,
                  props.question.answers,
                )
              }
              className="float-right btn btn-danger btn-sm mx-1"
            >
              <i className="far fa-trash-alt"></i>{" "}
            </button>
          )}
        </h5>

        {props.teacher && props.student && (
          <p>
            {props.question.isAnonymous ? (
              <Fragment>Anonymous</Fragment>
            ) : props.question.teacher_Id ? (
              <Fragment>
                <Link to={`/teacher/${props.question.teacher_Id}`}>
                  {props.teacher[props.question.teacher_Id]}
                </Link>
                {" | Teacher "}
              </Fragment>
            ) : (
              <Fragment>
                <Link to={`/student/${props.question.student_Id}`}>
                  {props.student[props.question.student_Id]}
                </Link>
                {" | Student "}
              </Fragment>
            )}
          </p>
        )}

        <p>
          <strong>Tags:</strong>{" "}
          {props.question.tags ? props.question.tags.join(", ") : null}
        </p>
        <span className="PrivateForumHome-span moment-date">
          {<Moment format="DD MMM, YYYY">{props.question.date}</Moment>} |{" "}
          {<Moment format="HH:mm">{props.question.date}</Moment>}
        </span>
        <br className="d-lg-none" />
        <span className="PrivateForumHome-span">
          Answers :{" "}
          <strong>
            {props.question.answers && props.question.answers.length}
          </strong>
        </span>
        <br className="d-lg-none" />
        <br className="d-lg-none" />

        {!props.isParam && !adminApprove && (
          <span className="PrivateForumHome-span">
            {isPrivate ? (
              <Link to={`/privateforum/answer/${props.question._id}`}>
                <button className="btn btn-outline-primary btn-sm">
                  ANSWER
                </button>
              </Link>
            ) : (
              <Link to={`/publicforum/answer/${props.question._id}`}>
                <button className="btn btn-outline-primary btn-sm">
                  ANSWER
                </button>
              </Link>
            )}
          </span>
        )}
        <span
          style={
            upVote.includes(isAuth()._id)
              ? { color: "green", borderColor: "green" }
              : { color: "" }
          }
          className="PrivateForumHome-span btn btn-outline-primary float-lg-right btn-sm"
          onClick={upVoteIncrement}
        >
          <i className="fas fa-arrow-up"></i>
          {upVote.length}
        </span>
        <span
          style={
            downVote.includes(isAuth()._id)
              ? { color: "red", borderColor: "red" }
              : { color: "" }
          }
          className="PrivateForumHome-span btn btn-outline-primary float-lg-right btn-sm"
          onClick={downVoteIncrement}
        >
          <i className="fas fa-arrow-down"></i>
          {downVote.length}
        </span>
        {adminApprove ? (
          <span className="PrivateForumHome-span">
            <button
              className="btn btn-outline-success mr-3 btn-sm"
              onClick={(e) => {
                props.acceptHandler(
                  e,
                  props.question._id,
                  props.question.answers,
                );
              }}
            >
              Approve
            </button>
            <button
              onClick={(e) =>
                props.deleteHandler(
                  e,
                  props.question._id,
                  props.question.answers,
                )
              }
              className="PrivateForumHome-span btn btn-outline-danger ml-3 btn-sm"
            >
              Reject
            </button>
          </span>
        ) : (
          <>
            <span className="PrivateForumHome-span">
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => {
                  navigator.clipboard.writeText(QUESTIONLINK);
                  toast.success("Copied link to clipboard");
                }}
              >
                SHARE
              </button>
            </span>
            <span
              className="PrivateForumHome-span btn btn-outline-primary btn-sm"
              onClick={togglePopup}
            >
              <i className="fas fa-exclamation"></i>
            </span>
          </>
        )}
        {isOpen && (
          <Popup
            content={
              <>
                <textarea
                  className="form-control"
                  placeholder="Write your issue here"
                  id="TextArea"
                  rows="3"
                  onChange={(e) => setext(e.target.value)}
                  value={text}
                ></textarea>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.success("Your report has been sent for review");
                    setIsOpen((prevIsOpen) => !prevIsOpen);
                    handleReport(e);
                  }}
                  className="btn btn-outline-primary w-100 mt-3 btn-sm"
                >
                  Submit Report
                </button>
                <a
                  href={
                    "mailto:uniconnin@gmail.com?subject=Reporting%20question%20with%20ID%3A" +
                    encodeURI(props.question._id)
                  }
                >
                  <button className="btn btn-outline-primary w-100 mt-3 btn-sm">
                    Email Developers
                  </button>
                </a>
              </>
            }
            handleClose={togglePopup}
          />
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
