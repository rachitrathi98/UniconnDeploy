import React from "react";
import { Link } from "react-router-dom";
import default_display from "../../assets/images/default.png";
import { isAuth } from "../../utils/helper";
import { initiateMessage } from "../../utils/utility";

export default function Card(props) {
  const linkStyles = {
    width: "75%",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px",
  };
  const divStyles = {
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px",
  };
  const imgStyles = { borderRadius: "50%", height: "10rem", width: "8rem" };
  if (props.data) {
    let options;
    if (props.options && isAuth())
      options = (
        <div className="col-lg-4 mt-lg-3 mb-3 mb-lg-0">
          <Link
            to={`/${props.data.role}_project/${props.data._id}`}
            className="btn btn-outline-dark mx-1 card-body__insides my-1"
            style={linkStyles}
          >
            Projects
          </Link>
          <button
            onClick={() => initiateMessage(props.data, props.history)}
            className="btn btn-outline-dark mx-1 card-body__insides my-1"
            style={linkStyles}
          >
            Message
          </button>
          {props.students ? null : (
            <Link
              to={`/underdevelopment`}
              className="btn btn-outline-dark mx-1 card-body__insides my-1"
              style={linkStyles}
            >
              Review
            </Link>
          )}
        </div>
      );
    const photo =
      props.data.photo === "default.png"
        ? default_display
        : process.env.NODE_ENV === "production"
        ? `${process.env.REACT_APP_BASE_URL}/api/auth/${props.data.photo}`
        : `http://localhost:${process.env.PORT}/api/auth/${props.data.photo}`;

    return (
      <div className="card mb-3 border-0 text-lg-left" style={divStyles}>
        <div className="row no-gutters">
          <div className="col-lg-4">
            <img
              src={photo}
              alt="Profile"
              className="rounded-circle py-3 ml-lg-5"
              style={imgStyles}
            />
          </div>
          <div className="col-lg-4">
            <div className="card-body">
              <Link
                className="card-title"
                to={`/${props.data.role}/${props.data._id}`}
              >
                <strong>{props.data.name}</strong>
              </Link>
              <p className="card-text">{props.data.position}</p>
              <p className="card-text">{props.data.department}</p>
              <p className="card-text">{props.data.branch}</p>
              <p className="card-text">{props.data.batch}</p>
              <strong>Interests:</strong>
              <p className="text-muted font-size-sm">
                {props.data.field_of_interest.map((field, key) => {
                  if (key < props.data.field_of_interest.length && key < 2) {
                    return ` ${field}, `;
                  }
                  if (key === 2 || key === props.data.field_of_interest.length)
                    return ` ${field} `;
                  return null;
                })}
              </p>
            </div>
          </div>
          {options}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
