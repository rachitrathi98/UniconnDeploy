import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { isAuth } from "../../utils/helper";
import { Links } from "../utils/Links";
const ProfileHeader = (props) => {
  const user = props.user;
  const iStyles = { color: "white" };
  const h4Styles = { fontSize: "1.5rem", marginRight: "0.5rem" };
  let render = null;
  if (user && isAuth()) {
    render = (
      <Fragment>
        <div className="col-lg-6 mt-2">
          <span className="d-inline d-lg-none">
            {isAuth()._id === user._id ? (
              <Link to={`/editprofile`}>
                <i
                  className="fa fa-pencil float-right btn btn-primary mt-2"
                  style={iStyles}
                ></i>
              </Link>
            ) : null}
          </span>
          <h4 className="text-primary font-weight-bold mt-3" style={h4Styles}>
            {user.name}
          </h4>
          {user.position && user.department ? (
            <p className="profile__p">
              {user.position} at {user.department}
            </p>
          ) : null}
          {user.collegeId ? (
            <Fragment>
              <p className="profile__p">{user.collegeId.name}</p>
              <p className="profile__p">{user.collegeId.address}</p>
            </Fragment>
          ) : null}
        </div>
        <div className="col-lg-6 mt-4 text-lg-center">
          <span className="d-none d-lg-block">
            {isAuth()._id === user._id ? (
              <Link to={`/editprofile`}>
                <i
                  className="fa fa-pencil float-right btn btn-primary"
                  style={iStyles}
                ></i>
              </Link>
            ) : null}
          </span>
          <h4 className="text-primary font-weight-bold">Contact Information</h4>
          <p className="profile__p">
            {user.contact && user.contact.phone_no ? (
              <>
                <strong>Phone no: </strong> {user.contact.phone_no}
              </>
            ) : null}
          </p>
          {user.emailId && (
            <p>
              <strong>Email: </strong> {user.emailId}
            </p>
          )}
          {<Links links={user.links} />}
        </div>
      </Fragment>
    );
  }
  return render;
};
export default ProfileHeader;
