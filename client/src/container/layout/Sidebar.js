import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Sidebar = (props) => {
  console.log("Sidebar", props);
  let unreadConversations = 0;
  if (props.channels)
    props.channels.map((check) =>
      check.chat &&
      check.chat.unreadMessageList &&
      check.chat.unreadMessageList.length > 0
        ? unreadConversations++
        : unreadConversations
    );

  const selected = {
    borderRadius: "25px",
    backgroundColor: "white",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
    color: "#0186fe",
  };
  const isActive = (path) => {
    if (props.match.path.includes(path) && !props.slideDrawer) {
      return selected;
    } else {
      return { color: "#3f435e", textDecoration: "none" };
    }
  };
  let wrapperClassname;
  if (props.slideDrawer) {
    wrapperClassname = "";
  } else {
    wrapperClassname = "d-none d-lg-block";
  }
  return (
    <div className={wrapperClassname}>
      <div className="my-3">
        <Link to="/chats">
          <button style={isActive("/chats")} className="btn font-weight-bold">
            <i className="fas fa-comment-dots mr-3"></i>
            {unreadConversations > 0 &&<span
              style={{
                float: "right",
                textAlign: "center",
                width: "25px",
                borderRadius: "100%",
                backgroundColor: "#0186FE",
                color: "white",
              }}
            >
              {unreadConversations}
            </span>}
            Conversations(<small>Under Development</small>)
          </button>
        </Link>
      </div>
      <div className="my-3">
        <Link to="/teachers">
          <button
            style={isActive("/teachers")}
            className="btn font-weight-bold"
          >
            <i className="fas fa-user-tie mr-3"></i>
            Find Teachers
          </button>
        </Link>
      </div>
      <div className="my-3">
        <Link to="/students">
          <button
            style={isActive("/students")}
            className="btn font-weight-bold"
          >
            <i className="fas fa-user-graduate mr-3"></i>
            Find Students
          </button>
        </Link>
      </div>
      <div className="my-3">
        <Link to="/collaborators">
          <button
            style={isActive("/collaborators")}
            className="btn font-weight-bold"
          >
            <i className="fas fa-people-arrows mr-3"></i>
            Find Projects
          </button>
        </Link>
      </div>
      <div className="my-3">
        <Link to="/forums">
          <button style={isActive("forum")} className="btn font-weight-bold">
            <i className="fas fa-users mr-3"></i>
            Forums
          </button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    channels: state.channels,
  };
};

export default withRouter(connect(mapStateToProps, null)(Sidebar));
