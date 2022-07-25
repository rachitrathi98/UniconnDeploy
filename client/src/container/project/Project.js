/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import withAuth from "../../utils/withAuth";
import {
  postAction,
  patchAction,
  getAction,
} from "../../services/generalServices";
import { auth } from "../../redux/actions";
import Layout from "../layout/Layout";
import ProjectForm from "../../components/project/ProjectForm";
import useStudentTeacherList from "../../components/utils/studentTeacherList";
import { isAuth, onAuth } from "../../utils/helper";
import moment from "moment-timezone";

const Project = (props) => {
  const { id } = props.match ? props.match.params : {};

  // if it's in edit project, this will populate else id===undefined
  const [values, setValues] = useState({
    name: "",
    description: "",
    more_description: "",
    status: "",
  });
  const [selectedOptions, setselectedOptions] = useState({
    student: [],
    teacher: [],
    field_of_interest: [],
  }); /* { student: [], techer: [], field_of_interest: [] } are the three entries used */
  const [project, setProject] = useState({
    studentId: [],
    teacherId: [],
    field_of_interest: [],
  });
  const [publication, setPublication] = useState([]);
  const [links, setLinks] = useState([]);
  const [dropDownSelected, setdropDownOption] = useState([]);
  const { teachersOptions, studentsOptions, field_of_interest } =
    useStudentTeacherList(false, false); // Using the custom Hook
  const dropDownOptions = [
    { label: "Ongoing", value: 5445 },
    { label: "Completed", value: 68546854 },
    { label: "Ongoing | Assistance-needed", value: 45527 },
    { label: "Float", value: 4555247 },
  ];
  // eslint-disable-next-line no-unused-vars
  const [errors, seterrors] = useState({
    name: "",
    description: "",
  });

  const [submitValue, setsubmitValue] = useState({ message: "Submit" });
  // const[dropDownCheck,setdropDownCheck]=useState(false);

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

      default:
        break;
    }
  };
  const onDropSelect = (selectedItem) => {
    //setdropDownCheck(true);
    setdropDownOption(selectedItem);
    setValues({ ...values, status: selectedItem.label });
  };

  useEffect(async () => {
    if (id) {
      // Perform side-effect only if it's an edit form
      // set the Field options
      // Get the project information
      const res = await getAction(`/projects/${id}`);
      if (res && res.status === 200) {
        if (res.data.data.data && res.data.data.data.length) {
          const p = res.data.data.data[0];
          setValues({
            name: p.name,
            description: p.description,
            more_description: p.more_description,
          });
          setPublication(
            p.publication && p.publication.length ? [...p.publication] : [],
          );
          setLinks(p.links && p.links.length ? [...p.links] : []);
          // console.log("options : ", options, "FOI : ", p.field_of_interest, "filter : ", options.filter(({ name, id }) => (p.field_of_interest.includes(name))))

          const option = dropDownOptions.find((status) =>
            status ? status.label === p.status : false,
          );
          setdropDownOption(option ? [option] : []); // Allows only one option
          // console.log(typeof p.teacherId[0])
          // manually add only the parameters necessary for p reference
          // console.log(p)
          setProject({
            teacherId: p.teacherId.length > 0 ? p.teacherId : [],
            studentId: p.studentId.length > 0 ? p.studentId : [],
            field_of_interest: p.field_of_interest.length
              ? p.field_of_interest
              : [],
          });
        }
      }
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      // Perform side-effect only if it's an edit form
      // Run after project is populated
      setselectedOptions({
        field_of_interest:
          project.field_of_interest && project.field_of_interest.length > 0
            ? field_of_interest.filter(
                ({ name }) => project.field_of_interest.includes(name), // Filter wrt `name` when comparing
              )
            : [],
        teacher:
          project.teacherId && project.teacherId.length > 0
            ? teachersOptions.filter(({ value }) =>
                project.teacherId.includes(value),
              ) // Filter wrt `id` when comparing
            : [],
        student:
          project.studentId && project.studentId.length > 0
            ? studentsOptions.filter(({ value }) =>
                project.studentId.includes(value),
              )
            : [],
      });
    }
  }, [project, teachersOptions, studentsOptions, field_of_interest]);

  const clickSubmit = async (event) => {
    setsubmitValue({ message: "Submitting" });
    event.preventDefault();
    let doc = {
      ...values,
      createdBy: isAuth().role,
      field_of_interest: selectedOptions.field_of_interest.map(
        (doc) => doc.name,
      ),
      studentId: [...selectedOptions.student.map((doc) => doc.value)],
      teacherId: [...selectedOptions.teacher.map((doc) => doc.value)],
      publication,
      links,
    };
    isAuth().role === "teacher"
      ? doc.teacherId.unshift(isAuth()._id) // 1st entry for teacher owning project
      : doc.studentId.unshift(isAuth()._id); // 1st entry for a student owning project
    // console.log(doc);
    if (id) await patchAction(`/projects/${id}`, doc);
    else
      await postAction(`/projects`, doc, (res) => {
        console.log("user ", res);
        if (res.data && res.data.data.data) {
          selectedOptions.teacher.map(async (t) => {
            console.log("user ", t, t.notificationId);
            let notificationBody = {
              Link: res.data.data.data
                ? `/project_detail/${res.data.data.data._id}`
                : `/${isAuth().role}/${isAuth()._id}`,
              teacher_Id: isAuth().role === "teacher" ? isAuth()._id : null,
              student_Id: isAuth().role === "student" ? isAuth()._id : null,
              NotificationType: "ProjectRequest",
              Message: `${isAuth().name} wants to start a project with you.`,
              date: moment.tz(Date.now(), "Asia/Kolkata").format(),
              project: {
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
                ? `/project_detail/${res.data.data.data._id}`
                : `/${isAuth().role}/${isAuth()._id}`,
              teacher_Id: isAuth().role === "teacher" ? isAuth()._id : null,
              student_Id: isAuth().role === "student" ? isAuth()._id : null,
              NotificationType: "ProjectRequest",
              Message: `${isAuth().name} wants to start a project  with you.`,
              date: moment.tz(Date.now(), "Asia/Kolkata").format(),
              project: {
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
    onAuth(() => {
      props.history.push(`/profile`);
    });
  };
  function validate(errors, values) {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return (
      valid &&
      selectedOptions.field_of_interest.length > 0 &&
      dropDownSelected.length !== 0 &&
      (values.name.length && values.description.length) !== 0
    );
  }
  return (
    <Layout rightSidebar={true} projectForm={true}>
      <ProjectForm
        multiDropdownData={{
          studentsOptions,
          teachersOptions,
          field_of_interest,
        }}
        multiDropdownHook={[selectedOptions, setselectedOptions]}
        projectStatusDropdown={{
          dropDownOptions,
          dropDownSelected,
          onDropSelect,
        }}
        publicationHook={[publication, setPublication]}
        linksHook={[links, setLinks]}
        title={id ? "Edit Project" : "Add New Project"}
        clickSubmit={clickSubmit}
        errors={errors}
        formValid={!validate(errors, values)}
        handleChange={handleChange}
        setSubmit={submitValue}
        values={values}
      />{" "}
      {/* change the value state using hook function*/}
    </Layout>
  );
};
const mapDispatchtoProps = (dispatch) => {
  return {
    onAuth: (callback) => dispatch(auth.auth(callback)),
  };
};
export default connect(null, mapDispatchtoProps)(withAuth("")(Project));
