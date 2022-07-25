import React from "react";

const Popup = (props) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          <i className="far fa-times-circle"></i>
        </span>
        {props.content}
      </div>
    </div>
  );
};

export default Popup;
