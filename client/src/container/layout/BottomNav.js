import React from "react";
import { Link } from "react-router-dom";

const BottomNav = () => {
  const isActive = (path) => {
    if (window && window.location.href.includes(path)) {
      return { fontSize: "12px", fill: "#0186FE", color: "#0186FE" };
    } else {
      return { fontSize: "12px", color: "black" };
    }
  };
  return (
    <div
      className="d-lg-none"
      style={{
        width: "100%",
        position: "fixed",
        overflow: "hidden",
        left: 0,
        bottom: 0,
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-around",
        zIndex: 100,
      }}
    >
      <small className="nav-item my-1 my-lg-0">
        <Link to="/chats">
          <div className="text-center" style={isActive("chats")}>
            <div>
              <i
                style={{ fontSize: "20px" }}
                className="fas fa-comment-dots"
              ></i>
            </div>
            <p>Chats</p>
          </div>
        </Link>
      </small>
      <small className="nav-item my-1 my-lg-0">
        <Link to="/teachers">
          <div className="text-center" style={isActive("/teachers")}>
            <div>
              <i style={{ fontSize: "20px" }} className="fas fa-user-tie"></i>
            </div>
            <p>Find Teachers</p>
          </div>
        </Link>
      </small>
      <small className="nav-item my-1 my-lg-0">
        <Link to="/students">
          <div className="text-center" style={isActive("/students")}>
            <div>
              <i
                style={{ fontSize: "20px" }}
                className="fas fa-user-graduate"
              ></i>
            </div>
            <p>Find Students</p>
          </div>
        </Link>
      </small>
      <small className="nav-item my-1 my-lg-0">
        <Link to="/collaborators">
          <div className="text-center" style={isActive("/collaborators")}>
            <div>
              <i
                style={{ fontSize: "20px" }}
                className="fas fa-people-arrows"
              ></i>
            </div>
            <p>Find Projects</p>
          </div>
        </Link>
      </small>
      <small className="nav-item my-1 my-lg-0">
        <Link to="/forums">
          <div className="text-center" style={isActive("forum")}>
            <div>
              <i style={{ fontSize: "20px" }} className="fas fa-users"></i>
            </div>
            <p>Forums</p>
          </div>
        </Link>
      </small>
    </div>
  );
};

export default BottomNav;
