/* eslint-disable array-callback-return */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";


const ForumHeader = (props) => {
  const pathname = window.location.href;
  const isPrivate = pathname.includes("private");
  const [name, setName] = useState([]);
  const ref = React.createRef();

  const handleChange = (selectedOptions) => {
    console.log("checking for changes: ", selectedOptions[0]);
    if (!selectedOptions.length) findQuestions(name);
    else {
      setName(selectedOptions[0]);
      checkname(selectedOptions[0]);
    }
  };

  const findQuestions = (input) => {
    // setName(e.target.value);
    // checkname(e.target.value);
      setName(input);
    checkname(input);
  };

  const checkname = (value) => {
    // if (value.length) {
    //   let newValues = props.question.filter((info) => {
    //     let present = info.tags.filter((tag) => {
    //       if (tag.toLowerCase().includes(value.toLowerCase().trim()))
    //         return true;
    //     });

    //     let bool = false;
    //     if (present[0]) {
    //       bool = true;
    //     }

    //     if (
    //       info.question.toLowerCase().includes(value.toLowerCase().trim()) ||
    //       bool
    //     )
    //       return info;
    //   });
    //   let sortedValues = [...newValues];
    //   sortedValues = sortedValues.sort(function (a, b) {
    //     return Math.abs(new Date(b.date) - new Date(a.date));
    //   });
    //   props.searchName(sortedValues);
    // } else {
    //   props.searchName(props.question);
    // }
    if (value === "") {
      props.searchName(props.question);
    } else {
      let newValues = props.question.filter((info) => {
        if (info.question.toLowerCase().includes(value.toLowerCase().trim())) {
          return info;
        }
      });
      props.searchName(newValues);
    }
  };

  return (
    <div
      className="mt-4 mb-3 home-forum"
      style={{ lineHeight: "1rem", backgroundColor: "#d4dadf" }}
    >
      <h4 className="text-lg-center forum-h4">
        <strong>{isPrivate ? "Private" : "Public"} Forum</strong>{" "}
        {isPrivate ? "| Sardar Patel Institute of Technology" : ""}
      </h4>
      <div className="row mt-3">
        <div className="col-12 col-lg-8 mb-3 mb-lg-0">
          {/* <input
            className="pt-1 px-3 border-0 mb-3 mb-lg-0"
            type="text"
            placeholder={"Search"}
            onChange={findQuestions}
            value={name}
            style={{ width: "100%", height: "95%" }}
          /> */}
           <Typeahead
          id="typeaheadBars"
          options={props.list}
          minLength={1}
          placeholder={`Search A Question`}
          onChange={handleChange}
          onInputChange={findQuestions}
          ref={ref}
        />
        </div>
        <div className="ask-a-question-button col-12 col-lg-4">
          {isPrivate ? (
            <Link
              to={{
                pathname: "/privateforum/new-question",
              }}
              className="w-100"
            >
              <button className="btn" style={{ fontSize: "15px" }}>
                ASK A QUESTION
              </button>
            </Link>
          ) : (
            <Link
              to={{
                pathname: "/publicforum/new-question",
              }}
              className="w-100"
            >
              <button className="btn" style={{ fontSize: "15px" }}>
                ASK A QUESTION
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumHeader;
