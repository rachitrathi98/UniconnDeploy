import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const QuestionCard = (props) => {
  const pathname = window.location.href;
  const isPrivate = pathname.includes("private");
  return (
    <div className="home-forum question-box list-border">
      <div
        className="card d-block px-lg-4 py-lg-3 py-3 px-1"
        style={{ borderRadius: "20px" }}
      >
        <h5>
          {isPrivate ? (
            <Link
              style={{ fontSize: "1rem" }}
              className="answer-prop"
              to={`/privateforum/answer/${props.question._id}`}
            >
              <strong>{props.question.question}</strong>
            </Link>
          ) : (
            <Link
              style={{ fontSize: "1rem" }}
              className="answer-prop"
              to={`/publicforum/answer/${props.question._id}`}
            >
              <strong>{props.question.question}</strong>
            </Link>
          )}
        </h5>
        {props.teacher && props.student && (
          <p>
            {props.question.teacher_Id ? (
              <Fragment>
                <Link
                  style={{ fontSize: "0.7rem" }}
                  to={`/teacher/${props.question.teacher_Id}`}
                >
                  {props.teacher[props.question.teacher_Id]}
                </Link>
                <small style={{ fontSize: "0.7rem" }}>{" | Teacher "}</small>
              </Fragment>
            ) : (
              <Fragment>
                <Link
                  style={{ fontSize: "0.7rem" }}
                  to={`/student/${props.question.student_Id}`}
                >
                  {props.student[props.question.student_Id]}
                </Link>
                <small style={{ fontSize: "0.7rem" }}>{" | Student "}</small>
              </Fragment>
            )}
          </p>
        )}
        {props.question.tags.length > 0 ? (
          <p style={{ fontSize: "1rem" }}>
            <strong>Tags: {props.question.tags.join(", ")}</strong>
          </p>
        ) : null}
        <span className="PrivateForumHome-span" style={{ fontSize: "1rem" }}>
          Answers :{" "}
          <strong>
            {props.question.answers && props.question.answers.length}
          </strong>
        </span>
      </div>
    </div>
  );
};

export default QuestionCard;
