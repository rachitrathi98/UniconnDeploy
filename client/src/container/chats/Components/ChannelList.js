import React from "react";
import { patchAction } from "../../../services/generalServices";
import { isAuth } from "../../../utils/helper";
import { IndividualConversation } from "./ChatComponents";

export class ChannelList extends React.Component {
  checkChannel2 = (msgID, chat) => {
    console.log("change channels", this.props, isAuth()._id);
    // if (
    //   this.props.unreadMessageList[0] &&
    //   this.props.unreadMessageList[0].username &&
    //   this.props.unreadMessageList[0].username === String(isAuth()._id)
    // )
    //   await patchAction(
    //     `/channel/${chat._id}`,
    //     { unreadMessageList: [] },
    //     (res) => {
    //       console.log("dadasdsadaszdasdasa", res);
    //     },
    //   );
    // eslint-disable-next-line array-callback-return
    this.props.showChannels.map((c) => {
      console.log("Checking for items:", c, msgID);
      if (
        c.person === msgID &&
        c.chat.unreadMessageList[0] &&
        c.chat.unreadMessageList[0].username &&
        c.chat.unreadMessageList[0].username === String(isAuth()._id)
      )
        patchAction(
          `/channel/${chat._id}`,
          { unreadMessageList: [] },
          (res) => {
            console.log("dadasdsadaszdasdasa", res);
          },
        );
      // if (c.person._id === msgID) {
      //   this.props.changeCurrentChat(c);
      // }
    });
  };

  render() {
    let list = (
      <p className="mt-4" style={{ fontSize: "20px" }}>
        {" "}
        There are no channels to show
      </p>
    );
    if (this.props.showChannels) {
      list = this.props.showChannels.map((c) => {
        let unreadCount = 0;
        if (c.chat && c.chat.unreadMessageList.length > 0) {
          try {
            if (c.chat.unreadMessageList[c.chat.unreadMessageList.length-1].username === isAuth()._id) {
              unreadCount = c.chat.unreadMessageList.length;
              console.log("URC", unreadCount)
            }
          } catch (error) {
            console.log(error);
          }
        }
          return (
          <IndividualConversation
            unreadCount={unreadCount}
            key={c.person}
            role={c.onModel}
            data={
              c.onModel === "Teacher"
                ? this.props.teacher[c.person]
                : this.props.student[c.person]
            }
            onClick={this.checkChannel2.bind(this, c.person, c.chat)}
          />
        );
      });
    }

    return (
      <div
        style={{
          marginTop: "2.5rem",
          maxHeight: "55vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
        className="channel-list"
      >
        {list}
      </div>
    );
  }
}

export default ChannelList;
