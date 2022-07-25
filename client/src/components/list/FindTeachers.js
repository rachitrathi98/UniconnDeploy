import React, { Fragment } from "react";
import Card from "../utils/Card";
import { Link } from "react-router-dom";

const FindTeachers = ({ searchValues, linkStyles, history }) => {
  return searchValues.length ? (
    searchValues &&
      searchValues.map((teacher, index) => {
        return (
          <Fragment key={index}>
            <Link
              className="card-title"
              to={`/${teacher.role}/${teacher._id}`}
              style={linkStyles}
            ></Link>
            <Card options={true} data={teacher} history={history} />
          </Fragment>
        );
      })
  ) : (
    <h5
      className="my-3"
      style={{
        display: "flex",
        justifyContent: "center",
        fontWeight: "800",
        color: "#0084FF",
        fontSize: "30px",
      }}
    >
      No Teacher Found
    </h5>
  );
};

export default FindTeachers;
