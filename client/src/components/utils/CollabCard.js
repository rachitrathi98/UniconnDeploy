import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const CollabCard = (props) => {
  // console.log(props);
  const divStyles = {
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px",
  };
  if (props.data) {
    const {
      _id,
      name,
      ownerId,
      ownerName,
      field_of_interest,
      description,
      mentors,
    } = props.data;
    const limit = 250;
    return (
      <div className="card mb-3 border-0 text-lg-left" style={divStyles}>
        <div className="row no-gutters">
          <div className="card-body">
            {mentors ? (
              <Link className="card-title" to={`/project_detail/${_id}`}>
                <strong>{name}</strong>
              </Link>
            ) : (
              <Link className="card-title" to={`/float_detail/${_id}`}>
                <strong>{name}</strong>
              </Link>
            )}
            {props.collaborator ? (
              <p className="text-muted font-size-sm float-lg-right">
                {mentors ? <strong>Project</strong> : <strong>Float</strong>}
              </p>
            ) : null}
            <p className="text-muted font-size-sm">
              <small>
                {field_of_interest.map((field, key) => {
                  if (key < field_of_interest.length && key < 2) {
                    return ` ${field}, `;
                  }
                  if (key === 2 || key === field_of_interest.length)
                    return ` ${field} `;
                  return null;
                })}
              </small>
            </p>
            {mentors ? (
              <>
                Mentored by{" "}
                {mentors.map(({ id, name }, key) => {
                  const end = mentors.length - 1;
                  if (key < end)
                    return (
                      <Fragment key={key}>
                        <Link to={`/teacher/${id}`}>{name}</Link>, &nbsp;
                      </Fragment>
                    );
                  if (key === end) {
                    return (
                      <Fragment key={key}>
                        <Link key={id} to={`/teacher/${id}`}>
                          {name}
                        </Link>
                      </Fragment>
                    );
                  }
                  return null;
                })}
              </>
            ) : (
              <>
                Floated by <Link to={`/student/${ownerId}`}>{ownerName}</Link>
              </>
            )}
            <br />
            <b>Description:</b> &nbsp;{" "}
            {description.length < limit ? (
              description
            ) : (
              <>
                {description.substr(0, limit)}...&nbsp;
                <Link
                  to={
                    mentors ? `/project_detail/${_id}` : `/float_detail/${_id}`
                  }
                >
                  Read More
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
export default CollabCard;
