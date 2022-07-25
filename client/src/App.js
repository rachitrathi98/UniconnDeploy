/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { auth, channels, notification } from "./redux/actions";
import Routes from "./routes";
import socketClient from "socket.io-client";
import { isAuth } from "./utils/helper";

const App = (props) => {
  const { onTryAutoAuth, error, onSetSocket } = props;
  const [isFirstUpdate, setFirstUpdate] = useState(true);
  const SERVER =
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL}`
      : `http://localhost:${process.env.PORT}`;

  useEffect(() => {
    onTryAutoAuth();
  }, []);

  useEffect(() => {
    if (isFirstUpdate) {
      setFirstUpdate(false);
      return;
    }
    if (!props.socket) {
      let socketConn = socketClient(SERVER);
      socketConn.on("connection", (data) => {
        console.log("I'm connected with the back-end");
        onSetSocket(socketConn);
      });
    }
  }, [isFirstUpdate]);
  useEffect(() => {
    if (isFirstUpdate) {
      setFirstUpdate(false);
      return;
    }
    if (isAuth() && !props.notification) props.onGetNotification();
  }, [isFirstUpdate]);
  useEffect(() => {
    if (isFirstUpdate) {
      setFirstUpdate(false);
      return;
    }
    if (isAuth() && !props.channels) props.onGetChannels();
  }, [isFirstUpdate]);

  if (error) console.log("app error", error);
  return <Routes />;
};
const mapStateToProps = (state) => {
  return {
    error: state.status.error,
    socket: state.socket.socket,
    channels: state.channels,
    notification: state.notification,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onTryAutoAuth: (callback) => dispatch(auth.authCheckState(callback)),
    onSetSocket: (socket) => dispatch(auth.setSocket(socket)),
    onGetNotification: (callback) =>
      dispatch(notification.getNotification(callback)),
    onGetChannels: (callback) => dispatch(channels.getChannels(callback)),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(App));
