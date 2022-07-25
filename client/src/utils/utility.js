import {
  deleteAction,
  patchAction,
  postAction,
} from "../services/generalServices";
import { isAuth, onAuth } from "./helper";
import moment from "moment-timezone";

export const initiateMessage = async (data, history) => {
  const create_channel = async (data) => {
    const res1 = await postAction("/channel");
    let body = {
      channels: {
        person: data._id,
        chat: res1 && res1.data ? res1.data.data.data._id : null,
        onModel: data.role === "student" ? "Student" : "Teacher",
      },
    };
    //body of notification we are about to send
    let notificationBody = {
      Link: `/${isAuth().role}/${isAuth()._id}`,
      teacher_Id: isAuth().role === "teacher" ? isAuth()._id : null,
      student_Id: isAuth().role === "student" ? isAuth()._id : null,
      NotificationType: "ChatRequest",
      Message: `${isAuth().name} wants to chat with you.`,
      date: moment.tz(Date.now(), "Asia/Kolkata").format(),
      channel: {
        person: isAuth()._id,
        chat: res1.data ? res1.data.data.data._id : null,
        onModel: isAuth().role === "student" ? "Student" : "Teacher",
      },
    };
    //check if data we received from chat contains notification ID
    if (data.notificationId)
      //PATCH request to send notification to user about chat with notification object
      await patchAction(`/notification/${data.notificationId}`, {
        notification: notificationBody,
      });
    await patchAction(`/${isAuth().role}s/${isAuth()._id}`, body, () => {
      onAuth(() => {
        history.push(`/chats/${data._id}`);
        if (window && window.location.href.includes("/chats"))
          window.location.reload();
      });
    });
  };

  if (isAuth() && isAuth().channels) {
    let createUser = false;
    if (isAuth().channels.length === 0) {
      create_channel(data);
    } else {
      createUser = true;
      isAuth().channels.map(async (channel) => {
        if (String(channel.person) === String(data._id)) {
          createUser = false;
          history.push(`/chats/${data._id}`);
        }
      });
      if (createUser) create_channel(data);
    }
  }
};

export const findDiff = (prev, update) => {
  let [added, removed] = [[], []];
  if (prev) {
    added = update
      .filter((item) => !prev.includes(item))
      .map((item) => String(item)); //Sanitize
    removed = prev
      .filter((item) => !update.includes(item))
      .map((item) => String(item)); //Sanitize
  } else added = update.map((item) => String(item)); //Sanitize
  return [added, removed];
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};

export const deleteProjectHandler = async (e, project_id, history) => {
  e.stopPropagation();
  let isConf = window.confirm("Are you sure you want to delete ?");
  if (isConf) {
    await deleteAction(`/projects/${project_id}`, () => {
      onAuth(() => {
        if (window && window.location.href.includes("profile")) {
          window.location.reload();
        } else history.push(`/profile`);
      });
    });
  }
};
