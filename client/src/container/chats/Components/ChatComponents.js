import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export const IndividualConversation = (props) => {
  if (props.data)
    return (
      <Fragment>
        {props.data.role && props.data.role === "student" && (
          <div className="row mt-3 container" onClick={props.onClick}>
            <div className="w-100">
              {props.data && (
                <Link to={`/chats/${props.data._id}`}>
                  {props.role
                    ? `${props.data.name} | ${props.role}`
                    : props.data.name}
                </Link>
              )}
              {props.unreadCount > 0 ? (
                <span
                  style={{
                    float: "right",
                    textAlign: "center",
                    width: "25px",
                    borderRadius: "100%",
                    backgroundColor: "#0186FE",
                    color: "white",
                  }}
                >
                  {props.unreadCount}
                </span>
              ) : null}
            </div>
            <div className="w-100">
              <div>
                <Fragment>
                  <div className="w-100">
                    <div>
                      <div style={{ fontSize: "14px" }}>
                        {props.data.branch}
                        <br />
                      </div>
                      <small style={{ fontSize: "14px" }}>
                        {props.data.college_name}
                      </small>
                    </div>
                  </div>
                </Fragment>
              </div>
            </div>
            <hr />
          </div>
        )}
        {props.data.role && props.data.role === "teacher" && (
          <div className="row mt-3 container" onClick={props.onClick}>
            <div className="w-100">
              {console.log(props.data)}
              {props.data && (
                <Link to={`/chats/${props.data._id}`}>
                  {props.role
                    ? `${props.data.name} | ${props.role}`
                    : props.data.name}
                </Link>
              )}
              {props.unreadCount > 0 ? (
                <span
                  style={{
                    float: "right",
                    textAlign: "center",
                    width: "25px",
                    borderRadius: "100%",
                    backgroundColor: "#0186FE",
                    color: "white",
                  }}
                >
                  {props.unreadCount}
                </span>
              ) : null}
            </div>
            <div className="w-100">
              <div>
                <Fragment>
                  <div style={{ fontSize: "14px" }}>
                    {props.data.department}
                    <br />
                  </div>
                  <div className="w-100">
                    <div style={{ fontSize: "14px" }}>
                      {props.data.college_name}
                    </div>
                  </div>
                </Fragment>
              </div>
            </div>
            <hr />
          </div>
        )}
        <hr />
      </Fragment>
    );
  else {
    return null;
  }
};

export const SendMessage = (props) => {
  return (
    <div className="row mt-3">
      <div className="col-9 justify-content-lg-center">
        <div>
          <textarea
            style={{
              borderRadius: "20px",
              marginLeft: "5px",
              outline: "none",
              whiteSpace: "pre-line",
            }}
            onChange={props.changeText}
            value={props.value}
            placeholder="Type message here..."
            onKeyPressCapture={(e) => {
              if (e.key === "Enter" && !e.shiftKey) props.sendMsg();
            }}
            className="w-100 px-3 py-3 C-textarea mt-4 mt-lg-1"
          />
        </div>
      </div>
      <div className="col-3 d-flex justify-content-lg-center align-content-center">
        <div className="chat-send-div">
          <i
            className="far fa-paper-plane btn btn-outline-primary"
            onClick={props.sendMsg}
            disabled={!props.text}
          ></i>
        </div>
      </div>
    </div>
  );
};

//  <div className="row d-flex justify-content-end" style={{margin: "0px auto"}}>
//  <div className="col-9 my-2 chat-text-div mr-1" >

export const RightSideChat = (props) => (
  <div className="row d-flex justify-content-end">
    <div className="col-9 my-2 chat-text-div mr-4">
      <div className="my-2 py-3 px-3 float-right">{props.text}</div>
      <small className="mt-3 px-4 chat-time">{props.time}</small>
    </div>
  </div>
);

export const LeftSideChat = (props) => (
  <div className="row">
    <div className="col-9">
      <div className="my-2 py-3 px-3 chat-text-div ml-3">{props.text}</div>
      <small className="my-2 px-5 chat-time">{props.time}</small>
    </div>
  </div>
);
