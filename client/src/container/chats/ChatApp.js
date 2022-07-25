/* eslint-disable array-callback-return */
import { isAuth } from "../../utils/helper";
import React, { useEffect, useState } from "react";
import Chat from "./Components/Chat";
import useStudentTeacherList from "../../components/utils/studentTeacherList";
import { getAction } from "../../services/generalServices";

import { connect } from "react-redux";
import { channels } from "../../redux/actions";

const ChatApp = (props) => {
  const personId = props.match.params.id;

  const [channelInfo, setChannelInfo] = useState({});
  const [allChannels, setallChannels] = useState([]);
  const [messageList, setmessageList] = useState([]);
  const [unreadMessageList, setUnreadMessageList] = useState([]);
  const [messageListupdate, setmessageListupdate] = useState(false);
  const [studentInfo, setStudentInfo] = useState([]);
  const [teacherInfo, setTeacherInfo] = useState([]);
  const { student2, teacher2 } = useStudentTeacherList(true, true);

  useEffect(()=>{
     props.onGetChannels((res)=>{if(res.data)setallChannels(res.data.user.channels)});
  }, [])
  useEffect(() => {
    if (isAuth()) {
      setStudentInfo(student2);
      setTeacherInfo(teacher2);

      // if (!props.channels) props.onGetChannels();
      // else setallChannels(props.channels);

      props.socket &&
      props.socket.emit("connectMe", {
        _id: isAuth()._id,
        category: isAuth().role,
      });

      setUnreadMessageList(props.channels);
      if (personId && props.channels) {
        if (props.channels.length === 0) props.history.push("/chats");
        props.channels.map(async (channel) => {
          if (channel.chat && channel.person === personId) {
            const res = await getAction(`/getMessages?id=${channel.chat._id}`);
            if (res) {
              setmessageList(res.data.messageList);
              console.log("Hey checking for Chat data: ", res);
            }
            setChannelInfo(channel);
          }
        });
      }
    }
    // eslint-disable-next-line
  }, [personId, messageListupdate, props.channels]);

  const getSearchedName = (value) => {
    setStudentInfo(student2);
    setTeacherInfo(teacher2);

    if (value) {
      let newObjectStud = {};
      Object.keys(student2).map((keyName, keyIndex) => {
        if (
          student2[keyName].name
            .toLowerCase()
            .includes(value.toLowerCase().trim())
        )
          newObjectStud[keyName] = student2[keyName];
      });
      setStudentInfo(newObjectStud);

      let newObjectTeach = {};
      Object.keys(teacher2).map((keyName, keyIndex) => {
        if (
          teacher2[keyName].name
            .toLowerCase()
            .includes(value.toLowerCase().trim())
        )
          newObjectTeach[keyName] = teacher2[keyName];
      });
      setTeacherInfo(newObjectTeach);
    }
  };

  const searchMyChannels = (value) => {
    if (value) {
      const newChannel = isAuth().channels.filter((c) => {
        if (
          c.onModel === "Teacher" &&
          teacher2[c.person] &&
          teacher2[c.person].name
            .toLowerCase()
            .includes(value.toLowerCase().trim())
        )
          return c;
        else if (
          c.onModel === "Student" &&
          student2[c.person] &&
          student2[c.person].name
            .toLowerCase()
            .includes(value.toLowerCase().trim())
        )
          return c;
      });
      setallChannels(newChannel);
    } else {
      setallChannels(isAuth().channels);
    }
  };

  const updateMessage = (data) => {
    const messt = messageList.concat(data);
    console.log("Checking for msst:",messt);
    setmessageList(messt);
    setmessageListupdate(!messageListupdate);
  };

  let user = null;

  if (teacher2 && student2) {
    if (channelInfo.onModel === "Student") {
      user = student2[channelInfo.person];
    } else if (channelInfo.onModel === "Teacher") {
      user = teacher2[channelInfo.person];
    } else user = isAuth();
  }
  console.log("Unread Channel:",unreadMessageList);

  return (
    <div className="Chat">
      {messageList && unreadMessageList && (
        <Chat
          channelInfo={channelInfo}
          allChannels={allChannels}
          messageList={messageList ? messageList : "wait"}
          unreadMessageList={unreadMessageList}
          socket={props.socket}
          user={user}
          updateMessage={updateMessage}
          student={studentInfo}
          teacher={teacherInfo}
          personId={personId}
          allstudent={student2}
          allteacher={teacher2}
          searchUser={getSearchedName}
          searchMyChannels={searchMyChannels}
          history={props.history}
         // channels={props.channels}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.status.error,
    socket: state.socket.socket,
    channels: state.channels,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    onGetChannels: (callback) => dispatch(channels.getChannels(callback)),
  };
};
export default connect(mapStateToProps, mapDispatchtoProps)(ChatApp);
