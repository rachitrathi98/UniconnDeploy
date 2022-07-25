import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import withAuth from "../../utils/withAuth";
import { isAuth } from "../../utils/helper";
import LoadingSign from "../../components/utils/LoadingSign";
import TeacherProfile from "../../components/user/teacher/TeacherProfile";
import StudentProfile from "../../components/user/student/StudentProfile";
import { deleteAction } from "../../services/generalServices";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/auth";

const Profile = (props) => {
  const [profile, setprofile] = useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    setprofile(isAuth());
  }, []);

  const deleteProjectHandler = (e, project_id) => {
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
  const deleteActivityHandler = (e, activity_id) => {
    e.stopPropagation();
    let isConf = window.confirm("Are you sure you want to delete ?");
    if (isConf) {
      deleteAction(`/activity/${activity_id}`, () => {
        props.onAuth(() => {
          props.history.push(`/profile`);
          window.location.reload();
        });
      });
    }
  };
  const deleteFloatHandler = (e, float_id) => {
    e.stopPropagation();
    let isConf = window.confirm("Are you sure you want to delete ?");
    if (isConf) {
      deleteAction(`/floats/${float_id}`, () => {
        props.onAuth(() => {
          props.history.push(`/profile`);
          window.location.reload();
        });
      });
    }
  };

  let render = <LoadingSign />;
  if (profile && profile.role === "teacher") {
    render = (
      <TeacherProfile
        deleteProjectHandler={deleteProjectHandler}
        deleteActivityHandler={deleteActivityHandler}
        data={profile}
      />
    );
  } else if (profile && profile.role === "student") {
    render = (
      <StudentProfile deleteFloatHandler={deleteFloatHandler} data={profile} />
    );
  }

  // styling issues
  // return <Layout rightSidebar={true} projects={true}>{render}</Layout>;
  if (window.innerWidth > 992) {
    return (
      <Layout profile={true} rightSidebar={true} projects={true}>
        {render}
      </Layout>
    );
  } else {
    return <Layout>{render}</Layout>;
  }
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onLogout: (next) => dispatch(actions.logout(next)),
    onAuth: (callback) => dispatch(actions.auth(callback)),
  };
};
export default connect(null, mapDispatchtoProps)(withAuth("")(Profile));
