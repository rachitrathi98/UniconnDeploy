import React, { Component } from "react";
import Message from "./Message";
import { SendMessage } from "./ChatComponents";
import moment from "moment-timezone";

export class MessagePanel extends Component {
  state = {
    text: "",
    messageList: [],
    checkText: false,
    //datees: moment.tz(Date.now(), "Asia/Kolkata")
  };

  componentDidMount = () => {
    // console.log("Here checking for props:", this.props);
    // this.props.socket &&
    //   this.props.socket.emit("connectMe", {
    //     _id: isAuth()._id,
    //     category: isAuth().role,
    //   });
    this.props.socket &&
      this.props.socket.on("newMsg", (data) => {
        if (data.channelId === this.props.currentChannel.chat._id) {
          this.setState({ text: "" });
          this.props.updateMessage(data);
        }
      });
  };

  componentWillUnmount = () => {
    if (this.props.socket) this.props.socket.off("newMsg");
  };

  changeText = (e) => {
    // console.log("Here checking for text: ", e.target.value);
    this.setState({ text: e.target.value });
    if (e.target.value.length > 0) this.setState({ checkText: true });
    else this.setState({ checkText: false });
  };

  sendMsg = () => {
    let data = {
      channelId: this.props.currentChannel.chat._id,
      text: this.state.text,
      username: this.props.currentChannel.person,
      Date: moment.tz(Date.now(), "Asia/Kolkata").format(),
    };
    if (data.channelId !== null && data.username !== null) {
      this.props.socket.emit("message", data);
      console.log("Hello Sir sending data:", data);
    }
    // this.setState({ text: "" });
    // this.props.updateMessage(data);
  };

  showChats = () => {
    try {
      fetch("/getMessages?id=" + this.props.currentChannel.chat._id)
        .then((res) => res.json())
        .then((result) => {
          this.setState({ messageList: result.messageList });
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let group =
      this.props.messageList !== "wait" &&
      this.props.messageList.length > 0 &&
      this.props.messageList.reduce((groups, question) => {
        const date = moment(question.Date).format("MM-DD-YYYY");
        // console.log("Here checking for groups:",groups,question,this.props.messageList);
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(question);
        return groups;
      }, []);
    console.log(group);
    let list = (
      <div className="no-content-message px-2">
        There are no messages to show
      </div>
    );
    if (this.props.currentChannel && this.props.messageList.length > 0) {
      list = <Message groups={group} />;
    }

    return (
      <div className="messages-panel">
        <div
          style={{
            maxHeight: "33vh",
            overflowY: "auto",
            overflowX: "hidden",
          }}
          className="messages-list"
        >
          {list}
        </div>
        <SendMessage
          changeText={this.changeText}
          value={this.state.text}
          sendMsg={this.sendMsg}
          text={this.state.checkText}
        />
      </div>
    );
  }
}

export default MessagePanel;
