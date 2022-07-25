import React from "react";

const UserAnswer = (props) => {
  return (
    <div className="home-forum question-box mt-3">
      <h5>
        <strong>{`${props.user.name} | ${
          props.user.branch ? props.user.branch : props.user.department
        }`}</strong>
      </h5>
      {/* make box expanding as per answer text */}
      <textarea
        placeholder={`Write answer,\nremember that this answer will be public`}
        className="w-100 my-2 pt-2 px-3 answer-inputs"
        rows={3}
        onChange={(ev) => {
          props.handleInput(ev);
        }}
        text={props.answer}
      />
      {<div style={{ textAlign:"center", color: "red" }}>{props.errors.name}</div>}
      <button
        className="btn btn-outline-primary px-5 mt-2 btn-sm"
        disabled={props.answer.length < 1 || props.errors.name.length > 0}
        onClick={(e) => props.handleSubmit(e)}
      >
        POST
      </button>
    </div>
  );
};

export default UserAnswer;
