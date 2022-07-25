import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import withAuth from "../../utils/withAuth";
import { isAuth } from "../../utils/helper";
import LoadingSign from "../../components/utils/LoadingSign";
import TeacherProfile from "../../components/user/teacher/TeacherProfile";
import StudentProfile from "../../components/user/student/StudentProfile";
import { getAction, deleteAction } from "../../services/generalServices";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/auth";

const Profile = (props) => {
  const [profile, setprofile] = useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const { id } = props.match.params;
    if (props.match.path === "/student/:id") {
      if (isAuth()) {
        const res = await getAction(`/students/${id}`);
        if (res && res.status === 200) {
          if (res.data.data.data) setprofile(res.data.data.data[0]);
        }
      }
    }

    if (props.match.path === "/teacher/:id") {
      if (isAuth()) {
        const res = await getAction(`/teachers/${id}`);
        if (res && res.status === 200) {
          if (res.data.data.data) setprofile(res.data.data.data[0]);
        }
      }
    }
    if (props.match.path === "/profile") {
      setprofile(isAuth());
    }
    // eslint-disable-next-line
  }, [props]);

  const deleteHandler = (e, project_id) => {
    e.stopPropagation();
    let isConf = window.confirm("Are you sure you want to delete ?");
    if (isConf) {
      deleteAction(`/projects/${project_id}`, () => {
        props.onAuth(() => {
          props.history.push(`/profile`);
          window.location.reload();
        });
      });
    }
  };
  let render = <LoadingSign />;
  if (profile && profile.role === "teacher") {
    render = <TeacherProfile deleteHandler={deleteHandler} data={profile} />;
  } else if (profile && profile.role === "student") {
    render = <StudentProfile deleteHandler={deleteHandler} data={profile} />;
  }

  // styling issues
  // return <Layout rightSidebar={true} projects={true}>{render}</Layout>;
  return <Layout>{render}</Layout>;
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onAuth: (callback) => dispatch(actions.auth(callback)),
  };
};
export default connect(null, mapDispatchtoProps)(withAuth("")(Profile));
