/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import withAuth from "../../utils/withAuth";
import { isAuth, onAuth } from "../../utils/helper";
import {
  getAction,
  patchAction,
  postAction,
} from "../../services/generalServices";
import useStudentTeacherList from "../../components/utils/studentTeacherList";
import ActivityForm from "../../components/activity/ActivityForm";
import moment from "moment-timezone";

const Activity = (props) => {
  const { id } = props.match.params;
  const [values, setValues] = useState({
    name: "",
    description: "",
    more_description: "",
    position: "",
  });
  const [activity, setActivity] = useState({
    studentId: [],
    teacherId: [],
  });
  const [selectedOptions, setselectedOptions] = useState({
    student: [],
    teacher: [],
  }); // selected options
  const { teachersOptions, studentsOptions } = useStudentTeacherList(
    false,
    false,
  ); // Using the custom Hook for all student/teacherOption objects
  const [links, setLinks] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [errors, seterrors] = useState({
    name: "",
    description: "",
    more_description: "",
    position: "",
  });

  const [dropDownOption, setdropDownOption] = useState([]);
  const [submitValue, setsubmitValue] = useState({ message: "Submit" });

  // CHORE : Import from another file/ define in model
  const dropDownOptions = [
    { label: "Ongoing", value: 5445 },
    { label: "Completed", value: 68546854 },
    { label: "Ongoing | Assistance-needed", value: 45527 },
  ];
  // let title="NON ACADEMIC INITIATIVE INFORMATION";
  useEffect(async () => {
    if (id) {
      // title="EDIT NON ACADEMIC INITIATIVE INFORMATION"
      if (isAuth()) {
        // Get the project information
        const res = await getAction(`/activity/${id}`);
        if (res && res.status === 200) {
          if (res.data.data.data) {
            const a = res.data.data.data[0];
            console.log(a);
            setValues({
              name: a.name,
              description: a.description,
              more_description: a.more_description,
              position: a.position,
            });
            setLinks(a.links && a.links.length ? [...a.links] : []);
            const option = dropDownOptions.find((status) =>
              status ? status.label === a.status : false,
            );
            setdropDownOption(option ? [option] : []);
            setActivity({
              studentId: a.studentId.length ? a.studentId : [],
              teacherId: a.teacherId.length ? a.teacherId : [],
            }); // Storing value for seperation of concerns and loading values
          }
        }
      } else props.history.push("/");
    } else if (isAuth().role === "student") props.history.push("/");
  }, [id]);

  useEffect(() => {
    if (id) {
      setselectedOptions({
        teacher:
          activity.teacherId && activity.teacherId.length
            ? teachersOptions.filter(({ value }) =>
                activity.teacherId.includes(value),
              )
            : [],
        student:
          activity.studentId && activity.studentId.length
            ? studentsOptions.filter(({ value }) =>
                activity.studentId.includes(value),
              )
            : [],
      });
    }
  }, [activity, teachersOptions, studentsOptions]);

  const handleChange = (name) => (event) => {
    if (name in values) setValues({ ...values, [name]: event.target.value });
    switch (name) {
      case "name":
        if (!event.target.value) {
          errors.name = "Required";
        } else if (event.target.value.length > 0) {
          errors.name =
            event.target.value.length < 5
              ? "Name must be greater than 5 characters"
              : "";
        }
        break;
      case "description":
        if (!event.target.value) {
          errors.description = "Required";
        } else if (event.target.value.length > 0) {
          errors.description =
            event.target.value.length < 5
              ? "Description must be greater than 5 characters"
              : "";
        }
        break;
      case "position":
        if (!event.target.value) {
          errors.position = "Required";
        } else if (event.target.value.length > 0) {
          errors.position =
            event.target.value.length < 5
              ? "Position must be greater than 5 characters"
              : "";
        }
        break;
      case "more_description":
        if (!event.target.value) {
          errors.more_description = "Required";
        } else if (event.target.value.length > 0) {
          errors.more_description =
            event.target.value.length < 5
              ? "More Description should be greater than 5 characters"
              : "";
        }
        break;
      default:
        break;
    }
  };

  const onDropSelect = (selectedItem) => {
    setdropDownOption(selectedItem);
    setValues({ ...values, status: selectedItem.label });
  };

  const clickSubmit = async (event) => {
    setsubmitValue({ message: "Submitting" });
    event.preventDefault();
    const doc = {
      ...values,
      studentId: [...selectedOptions.student.map((doc) => doc.value)],
      teacherId: [...selectedOptions.teacher.map((doc) => doc.value)],
      links,
    };
    isAuth().role === "teacher"
      ? doc.teacherId.unshift(isAuth()._id) // 1st entry for teacher owning activity
      : doc.studentId.unshift(isAuth()._id); // 1st entry for a student owning activity
    if (id) {
      await patchAction(`/activity/${id}`, doc, () => {
        onAuth(() => {
          props.history.push(`/profile`);
        });
      });
    } else {
      doc.createdBy = isAuth().role;
      await postAction(`/activity`, doc, (res) => {
        console.log("user ", res);
        if (res.data && res.data.data.data) {
          selectedOptions.teacher.map(async (t) => {
            console.log("user ", t, t.notificationId);
            let notificationBody = {
              Link: res.data.data.data
                ? `/activity_detail/${res.data.data.data._id}`
                : `/${isAuth().role}/${isAuth()._id}`,
              teacher_Id: isAuth().role === "teacher" ? isAuth()._id : null,
              student_Id: isAuth().role === "student" ? isAuth()._id : null,
              NotificationType: "ActivityRequest",
              Message: `${
                isAuth().name
              } wants to start a Non Academic Initiative with you.`,
              date: moment.tz(Date.now(), "Asia/Kolkata").format(),
              activity: {
                title: res.data.data.data.name,
                _id: res.data.data.data._id,
              },
            };
            if (t.notificationId)
              await patchAction(`/notification/${t.notificationId}`, {
                notification: notificationBody,
              });
          });

          selectedOptions.student.map(async (s) => {
            let notificationBody = {
              Link: res.data.data.data
                ? `/activity_detail/${res.data.data.data._id}`
                : `/${isAuth().role}/${isAuth()._id}`,
              teacher_Id: isAuth().role === "teacher" ? isAuth()._id : null,
              student_Id: isAuth().role === "student" ? isAuth()._id : null,
              NotificationType: "ActivityRequest",
              Message: `${
                isAuth().name
              } wants to start a Non Academic Initiative  with you.`,
              date: moment.tz(Date.now(), "Asia/Kolkata").format(),
              activity: {
                title: res.data.data.data.name,
                _id: res.data.data.data._id,
              },
            };
            if (s.notificationId)
              await patchAction(`/notification/${s.notificationId}`, {
                notification: notificationBody,
              });
          });
        }
      });
    }
    onAuth(() => {
      props.history.push(`/profile`);
    });
  };

  const validate = (errors, values) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return !(
      valid &&
      dropDownOption.length !== 0 &&
      (values.name.length &&
        values.position.length &&
        values.description.length) !== 0
    );
  };

  return (
    <Layout rightSidebar={true} activityForm={true}>
      <ActivityForm
        title={
          id ? "EDIT NON ACADEMIC INITIATIVE" : "NEW NON ACADEMIC INITIATIVE"
        }
        linksHook={[links, setLinks]}
        dropDown={{
          dropDownOptions,
          dropDownOption,
          onDropSelect,
        }}
        multiDropdownData={{
          studentsOptions,
          teachersOptions,
        }}
        multiDropdownHook={[selectedOptions, setselectedOptions]}
        values={values}
        handleChange={handleChange}
        errors={errors}
        clickSubmit={clickSubmit}
        setSubmit={submitValue}
        formValid={validate(errors, values)}
      />
    </Layout>
  );
};

export default withAuth("")(Activity);
