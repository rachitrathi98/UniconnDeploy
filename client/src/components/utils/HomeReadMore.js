import React, { useState } from "react";

const HomeReadMore = (props) => {
  const { value, limit, style } = props;
  const [state, toggle] = useState(true);
  const toggleState = (e) => {
    e.preventDefault();
    toggle(!state);
  };

  const vals = value.split(".");

  const smallStyles = { marginTop: "0", marginBottom: "0", fontSize: "15px" };
  return value ? (
    <>
      {value.length < limit ? (
        <p style={style}>{value}</p>
      ) : state ? (
        <>
          <span style={style}>
            <small style={smallStyles}>{vals[0]}.</small>
            <small style={smallStyles}>{vals[1]}.</small>
            <br />
            <br />
            <small style={smallStyles}>{vals[2]}.</small>
            <br />
            <br />
            <a href="/#" onClick={toggleState}>
              Read More
            </a>
          </span>
        </>
      ) : (
        <>
          <span style={style}>
            {vals.map((v, i) => {
              return (
                <small key={i} style={smallStyles}>
                  {v}
                  {i !== vals.length - 1 && "."}
                  {i % 2 !== 0 && i !== vals.length - 1 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                </small>
              );
            })}
            <br />
            <br />
            <a href="/#" onClick={toggleState}>
              Read Less
            </a>
          </span>
        </>
      )}
    </>
  ) : (
    <></>
  );
};

export default HomeReadMore;
