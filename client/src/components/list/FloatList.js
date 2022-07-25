import React from "react";
import CollabCard from "../utils/CollabCard";

const FindCollaborators = ({ searchValues }) => {
  return searchValues.length ? (
    searchValues &&
      searchValues.map((float, index) => {
        return <CollabCard data={float} key={index} collaborator={true} />;
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
      No Projects found
    </h5>
  );
};

export default FindCollaborators;
