import React, { Fragment } from "react";
import Card from "../utils/Card";
import { Link } from "react-router-dom";

const FindStudents = ({ searchValues, linkStyles, history }) => {

  return searchValues.length ? (
    searchValues &&
      searchValues.map((student, index) => (
        <Fragment key={index}>
          <Link
            className="card-title"
            to={`/${student.role}/${student._id}`}
            style={linkStyles}
          ></Link>
          <Card options={true} data={student} students={true} history={history} />
        </Fragment>
      ))
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
      No Student Found
    </h5>
  );
};

export default FindStudents;
