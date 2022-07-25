import React from "react";
import { Link } from "react-router-dom";

const RightSidebarItem = ({ student, teacher, project }) => {
  // Single Item (of student/teacher/project) Here...

  const item = (object) => {
    // console.log("Checking object:", object);
    return (
      <div
        className="card py-3 px-4 mt-3 border-0 text-lg-center"
        style={{ borderRadius: "20px" }}
      >
        <ul className="list-group list-group-flush">
          {
            object ? (
              <>
                {object.role ? (
                  <Link to={`${object.role}/${object._id}`}>
                    <h5>{object.name}</h5>
                  </Link>
                ) : (
                  <Link to={`/project_detail/${object._id}`}>
                    <h5>{object.name}</h5>
                  </Link>
                )}
                <p className="profile__p">{object.status}</p>
                <p className="profile__p  mt-1">
                  {object.field_of_interest ? ( // Assumption: Object will always have "field of interest"
                    object.field_of_interest.map((field, key) => {
                      if (key === object.field_of_interest.length - 1) {
                        return (
                          <small
                            style={fontStyles}
                            key={key}
                          >{` ${field} `}</small>
                        );
                      }
                      if (key < object.field_of_interest.length - 1)
                        return (
                          <small
                            style={fontStyles}
                            key={key}
                          >{` ${field}, `}</small>
                        );
                      return null;
                    })
                  ) : (
                    <h5>Nothing to show</h5>
                  )}
                </p>
              </>
            ) : (
              <h5>LOADING...</h5>
            ) // object is undefined
          }
        </ul>
      </div>
    );
  };
  const fontStyles = { fontSize: "0.9rem" };

  return student
    ? item(student) // If student
    : teacher
    ? item(teacher) // If teacher
    : project
    ? item(project) // If project
    : item(); // Else LOADING...
};

export default RightSidebarItem;
