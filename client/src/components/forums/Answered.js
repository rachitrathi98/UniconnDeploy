import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { isAuth } from "../../utils/helper";
import Moment from "react-moment";

const Answered = (props) => {
  const upVote = [...props.answer.upvotes];
  const downVote = [...props.answer.downvotes];
  const [replybtn, setreplybtn] = useState(false);
  const [editToggle, seteditToggle] = useState(false);
  const upVoteIncrement = () => {
    if (!upVote.includes(isAuth()._id)) {
      upVote.push(isAuth()._id);
      if (downVote.includes(isAuth()._id))
        downVote.splice(downVote.indexOf(isAuth()._id), 1);
      props.handleRatings(props.answer, upVote, downVote);
    }
  };

  const downVoteIncrement = () => {
    if (!downVote.includes(isAuth()._id)) {
      downVote.push(isAuth()._id);
      if (upVote.includes(isAuth()._id))
        upVote.splice(upVote.indexOf(isAuth()._id), 1);
      props.handleRatings(props.answer, upVote, downVote);
    }
  };

  let replies = props.answer.replies.map((item) => item).reverse();
  let answer = props.answer.answer;
  // answer = answer.replace(/\r?\n/g, "<br />");

  return (
    <div className="home-forum question-box mt-3">
      <small className="answer-prop">{answer}</small>
      {props.answer && props.answer.student_Id ? (
        props.answer.student_Id === isAuth()._id ? (
          <button
            onClick={() => seteditToggle(!editToggle)}
            className="fas fa-pencil-alt float-right btn btn-primary btn-sm mx-2"
            style={{ color: "white" }}
          ></button>
        ) : (
          ""
        )
      ) : props.answer.teacher_Id === isAuth()._id ? (
        <button
          onClick={() => seteditToggle(!editToggle)}
          className="fas fa-pencil-alt float-right btn btn-primary btn-sm mx-2"
          style={{ color: "white" }}
        ></button>
      ) : (
        ""
      )}
      <h6 className="mt-3">
        {props.answer.teacher_Id ? (
          <Fragment>
            <Link
              style={{ fontSize: "1rem" }}
              to={`/teacher/${props.answer.teacher_Id}`}
            >
              {props.teacher[props.answer.teacher_Id]}
            </Link>
            {" | Teacher "}
          </Fragment>
        ) : (
          <Fragment>
            <Link to={`/student/${props.answer.student_Id}`}>
              {props.student[props.answer.student_Id]}
            </Link>
            {" | Student "}
          </Fragment>
        )}
      </h6>
      <p className="PrivateForumHome-span moment-date">
        {<Moment format="DD MMM, YYYY">{props.answer.date}</Moment>} |{" "}
        {<Moment format="HH:mm">{props.answer.date}</Moment>}
      </p>
      <br className="d-lg-none" />
      <br className="d-lg-none" />
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
      {!editToggle ? (
        <Fragment>
          <textarea
            rows="2"
            className="w-100 my-2 pt-2 px-3 answer-inputs"
            placeholder="Write Reply Here"
            onChange={props.handleReplyInput}
          />
          <button
            onClick={(e) => props.handleReplySubmit(e, props.answer)}
            className="btn btn-outline-primary px-5 mt-2 btn-sm"
          >
            POST
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <textarea
            placeholder={`Write answer,\nremember that this answer will be public`}
            className="w-100 my-2 pt-2 px-3 answer-inputs"
            rows={3}
            onChange={(ev) => {
              props.handleEditInput(ev);
            }}
            //text={props.answer}
          />{" "}
          {
            <div style={{ textAlign: "center", color: "red" }}>
              {props.errors.name}
            </div>
          }
          <button
            className="btn btn-outline-primary px-5 mt-2 btn-sm"
            onClick={(e) => {
              props.handleEditAnswerSubmit(e, props.answer);
              seteditToggle(!editToggle);
            }}
            disabled={
              props.editanswer.length < 1 || props.errors.name.length > 0
            }
          >
            POST ANSWER
          </button>
        </Fragment>
      )}

      <ul className="mt-4 list-group-flush">
        <button
          onClick={() => setreplybtn(!replybtn)}
          className="btn btn-outline-primary btn-sm"
        >
          View replies ({props.answer.replies && props.answer.replies.length})
        </button>
        {replybtn
          ? props.answer.replies.length > 0 &&
            replies.map((reply, key) => {
              return (
                <Fragment key={key}>
                  <li className="list-group-item answer-reply">
                    {reply.teacher_Id ? (
                      <Link to={`/teacher/${reply.teacher_Id}`}>
                        {props.teacher[reply.teacher_Id]}
                      </Link>
                    ) : (
                      <Link to={`/student/${reply.student_Id}`}>
                        {props.student[reply.student_Id]}
                      </Link>
                    )}{" "}
                    {reply.reply}
                  </li>
                </Fragment>
              );
            })
          : props.answer.replies.length > 0 &&
            replies
              .filter((number, index) => index < 2)
              .map((reply, key) => {
                return (
                  <Fragment key={key}>
                    <li className="list-group-item answer-reply">
                      {reply.teacher_Id ? (
                        <Link to={`/teacher/${reply.teacher_Id}`}>
                          {props.teacher[reply.teacher_Id]}
                        </Link>
                      ) : (
                        <Link to={`/student/${reply.student_Id}`}>
                          {props.student[reply.student_Id]}
                        </Link>
                      )}{" "}
                      {reply.reply}
                    </li>
                  </Fragment>
                );
              })}
      </ul>
    </div>
  );
};

export default Answered;
