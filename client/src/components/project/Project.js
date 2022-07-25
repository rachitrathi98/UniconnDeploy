import React from "react";
import { Link } from "react-router-dom";

export default function Project({ project }) {
  const fontStyles = { fontSize: "0.9rem" };
  // console.log(project);
  return project ? (
    <div
      className="card mb-3 py-3 border-0 text-lg-center"
      style={{ borderRadius: "20px" }}
    >
      <ul className="list-group list-group-flush">
        <Link to={`/project_detail/${project._id}`}>
          <h5>{project.name}</h5>
        </Link>
        <p className="profile__p">{project.status}</p>
        <p className="profile__p  mt-1">
          {project.field_of_interest &&
            project.field_of_interest.map((field, key) => {
              if (key === project.field_of_interest.length - 1) {
                return (
                  <small style={fontStyles} key={key}>{` ${field} `}</small>
                );
              }
              if (key < project.field_of_interest.length - 1)
                return (
                  <small style={fontStyles} key={key}>{` ${field}, `}</small>
                );
              return null;
            })}
        </p>
        {/* <hr /> */}
      </ul>
    </div>
  ) : (
    //     <div className="card px-4 py-4 border-0 text-lg-center list-border">
    <div
      className="card pt-2 pb-2 border-0 text-lg-center"
      style={{ borderRadius: "20px" }}
    >
      <ul className="list-group list-group-flush">
        <h5>
          Add your fields of interest in profile page to view more
          recommendations
        </h5>
      </ul>
    </div>
  );
}
