/* eslint-disable array-callback-return */
import React, { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
const ref = React.createRef();

export const SearchBar = (props) => {
  const [name, setName] = useState("");

  const handleChange = (selectedOptions) => {
    console.log("checking for changes: ", selectedOptions[0]);
    if (!selectedOptions.length) handleInputChange(name);
    else {
      setName(selectedOptions[0]);
      checkname(selectedOptions[0]);
    }
  };

  const handleInputChange = (input, e) => {
    console.log("value: ", input);
    setName(input);
    checkname(input);
  };

  const checkname = (name1) => {
    if (name1 === "") {
      props.searchName(props.list);
    } else {
      let newValues = props.list.filter((info) => {
        if (info.name.toLowerCase().includes(name1.toLowerCase().trim())) {
          return info;
        }
      });
      props.searchName(newValues);
    }
  };

  return (
    <div className="jumbotron searchBar" style={{ backgroundColor: "#D4DADF" }}>
      <div className="input-group mb-3">
        <Typeahead
          id="typeaheadBar"
          options={props.nameList}
          minLength={1}
          placeholder={`Search A ${props.role}`}
          onChange={handleChange}
          onInputChange={handleInputChange}
          ref={ref}
        />
        <div className="input-group-prepend ml-1">
          <span className="input-group-text border-0 bg-transparent">
            <i
              className="fa fa-search search-hover"
              onClick={() => {
                checkname(name);
                ref.current.clear();
              }}
            ></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export const Progress = () => {
  return (
    <div className="progress mb-4">
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow="70"
        aria-valuemin="0"
        aria-valuemax="100"
        style={{ width: "70%" }}
      >
        <span className="sr-only">70% Complete</span>
      </div>
    </div>
  );
};

export const multiSelectStyles = {
  searchBox: { borderRadius: "20px" },
  chips: { borderRadius: "20px" },
  optionContainer: { borderRadius: "20px" },
};
