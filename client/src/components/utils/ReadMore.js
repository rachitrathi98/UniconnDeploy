import React, { useState } from "react";

const ReadMore = (props) => {
  const { value, limit, style } = props;
  const [state, toggle] = useState(true);
  const toggleState = (e) => {
    e.preventDefault();
    toggle(!state);
  };

  return value ? (
    <>
      {value.length < limit ? (
        <p style={style}>{value}</p>
      ) : state ? (
        <>
          <p style={style}>
            {value.substr(0, limit)}...&nbsp;
            <a href="/#" onClick={toggleState}>
              Read More
            </a>
          </p>
        </>
      ) : (
        <>
          <p style={style}>
            {value}
            <br />
            <a href="/#" onClick={toggleState}>
              Read Less
            </a>
          </p>
        </>
      )}
    </>
  ) : (
    <></>
  );
};

export default ReadMore;
