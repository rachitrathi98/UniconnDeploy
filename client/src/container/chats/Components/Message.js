/* eslint-disable no-lone-blocks */
import React from "react";
import { isAuth } from "../../../utils/helper";
import { LeftSideChat, RightSideChat } from "./ChatComponents";
import moment from "moment";

const Message = (props) => {
  {

    let list = Object.keys(props.groups).map((m) => {
      return (
        <div>
          <div style={{ textAlign: "center" }}>
            {moment(m).format("DD MMM, YYYY")}
          </div>
          {props.groups[m].map((value, key) => {
            return value.username === isAuth()._id ? (
              <LeftSideChat
                key={key}
                text={value.text}
                time={moment(value.Date).format("hh:mm")}
              />
            ) : (
              <RightSideChat
                key={key}
                text={value.text}
                time={moment(value.Date).format("HH:mm")}
              />
            );
          })}
        </div>
      );
    });
    return list;
  }
};
export default Message;
