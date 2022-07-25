import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { isAuth } from "../../utils/helper";

const ActivityCard = (props) => {
  const { activity, teacher, deleteActivityHandler } = props;
  let render = (
    <div className="col-12 mt-2">
      {teacher && isAuth() && teacher._id === isAuth()._id ? (
        <Fragment>
          <button
            onClick={(e) => deleteActivityHandler(e, activity._id)}
            className="float-right btn btn-danger btn-sm mx-2"
          >
            <i className="far fa-trash-alt"></i>{" "}
          </button>
        </Fragment>
      ) : null}
      <Link
        to={`/editactivity/${activity._id}`}
        className="float-right btn btn-primary btn-sm mx-2"
      >
        <i className="fas fa-pencil-alt" style={{ color: "white" }}></i>{" "}
      </Link>
      <Link to={`/activity_detail/${activity._id}`}>
        <h4 style={{ color: "black" }}>{activity.name}</h4>
      </Link>
      {activity.position && <p className="profile__p">{activity.position} </p>}
      {activity.collaborator && (
        <p className="profile__p">{activity.collaborator} </p>
      )}
      {activity.status && <p className="profile__p">{activity.status} </p>}
      <hr />
    </div>
  );
  return render;
};

export default ActivityCard;
