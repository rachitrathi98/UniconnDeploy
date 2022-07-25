import React from "react";
import { useEffect, useState } from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import Notification from "../../components/user/Notification";
import useStudentTeacherList from "../../components/utils/studentTeacherList";
import LoadingSign from "../../components/utils/LoadingSign";
import { isAuth, onAuth } from "../../utils/helper";
import moment from "moment-timezone";
import BottomNav from "../layout/BottomNav";
import { connect } from "react-redux";
import { notification } from "../../redux/actions";
import {
  deleteAction,
  getAction,
  patchAction,
} from "../../services/generalServices";

const Notifications = (props) => {
  const { student2, teacher2 } = useStudentTeacherList(true, true);
  const [notifications, setNotifications] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (isAuth()) {
      const res = await getAction(`/notification/${isAuth().notificationId}`);
      if (res && res.status === 200 && res.data.data.data[0]) {
        setNotifications(res.data.data.data[0][0]);
      }
      const res1 = await getAction(`/notification/readStatus/${isAuth().notificationId}`);

    }
  }, []);

  const acceptHandler = async (e, notificationData, user) => {
    e.preventDefault();
    let notificationBody = {
      Link: "",
      teacher_Id: isAuth().role === "teacher" ? isAuth()._id : null,
      student_Id: isAuth().role === "student" ? isAuth()._id : null,
      NotificationType: "",
      Message: `${isAuth().name} wants to chat with you.`,
      date: moment.tz(Date.now(), "Asia/Kolkata").format(),
      Status: "Accept",
    };

    switch (notificationData.NotificationType) {
      case "ChatRequest":
        let createUser = true;
        notificationBody.NotificationType = "Chat";
        notificationBody.Link = `/chats/${isAuth()._id}`;
        notificationBody.Message = `You can now chat with ${isAuth().name}`;
        isAuth().channels.map(async (channel) => {
          if (
            notificationData.channel &&
            String(channel.person) === String(notificationData.channel.person)
          ) {
            createUser = false;
            props.history.push(`/chats/${notificationData.channel.person}`);
          }
        });
        if (createUser)
          await patchAction(
            `/${isAuth().role}s/${isAuth()._id}`,
            { channels: notificationData.channel },
            () => {
              onAuth();
            },
          );
        break;

      case "ProjectRequest":
        notificationBody.NotificationType = "Project";
        notificationBody.Link = notificationData.Link;
        notificationBody.Message = `${isAuth().name} has joined your project`;
        notificationBody.project = notificationData.project;
        if (notificationData.project)
          await patchAction(
            `${isAuth().role}s/${isAuth()._id}`,
            {
              projectId: notificationData.project._id,
            },
            () => {
              onAuth(() => {
                props.history.push(
                  `/project_detail/${notificationData.project._id}`,
                );
              });
            },
          );
        break;
      case "ActivityRequest":
        notificationBody.NotificationType = "Activity";
        notificationBody.Link = notificationData.Link;
        notificationBody.activity = notificationData.activity;
        notificationBody.Message = `${
          isAuth().name
        } has joined your Non Academic Initiative`;
        if (notificationData.activity)
          await patchAction(
            `${isAuth().role}s/${isAuth()._id}`,
            {
              activityId: notificationData.activity._id,
            },
            () => {
              onAuth(() => {
                props.history.push(
                  `/activity_detail/${notificationData.activity._id}`,
                );
              });
            },
          );
        break;
      default:
        notificationBody.NotificationType = "Default";
        notificationBody.Link = notificationData.Link;
        notificationBody.Message = `you have a notification from ${
          isAuth().name
        }`;
    }

    if (user.notificationId) {
      await patchAction(`/notification/${user.notificationId}`, {
        notification: notificationBody,
      });

      await deleteAction(
        `/notification/${isAuth().notificationId}?notification_id=${
          notificationData._id
        }`,
        () => {
          props.onGetNotification();
        },
      );
    }
  };

  const rejectHandler = async (e, notificationData) => {
    e.preventDefault();
    await deleteAction(
      `/notification/${isAuth().notificationId}?notification_id=${
        notificationData._id
      }`,
      () => {
        props.onGetNotification();
      },
    );
  };

  const deleteHandler = async (e, notification_id) => {
    e.stopPropagation();
    let isConf = window.confirm("Are you sure you want to delete ?");
    if (isConf) {
      await deleteAction(
        `/notification/${
          isAuth().notificationId
        }?notification_id=${notification_id}`,
        () => {
          props.onGetNotification(() => {
            props.history.go(0);
          });
        },
      );
    }
  };

  const viewHandler = (e, url) => {
    e.preventDefault();
    props.history.push(url);
  };

  let render = <LoadingSign />;
  console.log("notifications:", notifications);
  if (notifications) {
    let notificationsSorted = notifications.map((item) => item).reverse();

    render = (
      <div>
        <Header />
        <div className="container-modified">
          <div className="row mt-2">
            <div className="col-lg-3 sidebar">{<Sidebar />}</div>
            <div className="col-lg-6">
              <div
                className="my-4 home-forum col-lg-12"
                style={{
                  lineHeight: "1rem",
                  backgroundColor: "rgb(212, 218, 223)",
                  margin: "auto",
                }}
              >
                <h4 className="text-center forum-h4">
                  <strong>Notifications</strong>
                </h4>
              </div>
              <div className="mb-5 mb-lg-0">
                {notifications &&
                  teacher2 &&
                  student2 &&
                  notificationsSorted.map((notification, key) => {
                    let fromUser = notification.teacher_Id
                      ? teacher2[notification.teacher_Id]
                      : student2[notification.student_Id];

                    return (
                      <Notification
                        key={key}
                        notification={notification}
                        fromUser={fromUser}
                        deleteHandler={deleteHandler}
                        viewHandler={viewHandler}
                        acceptHandler={acceptHandler}
                        rejectHandler={rejectHandler}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }
  return render;
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onGetNotification: (callback) =>
      dispatch(notification.getNotification(callback)),
  };
};
const mapStateToProps = (state) => {
  return {
    notifications: state.notification,
  };
};
export default connect(mapStateToProps, mapDispatchtoProps)(Notifications);
