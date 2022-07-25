import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import withAuth from "../../utils/withAuth";
import LoadingSign from "../../components/utils/LoadingSign";
import StudentProfile from "../../components/user/student/StudentProfile";
import { getAction } from "../../services/generalServices";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/auth";

const Profile = (props) => {
  const [profile, setprofile] = useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const { id } = props.match.params;
    const res = await getAction(`/students/${id}`);
    if (res && res.status === 200) {
      const studentProfile = res.data.data.data[0];
      setprofile(studentProfile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let render = <LoadingSign />;
  if (profile) {
    render = <StudentProfile history={props.history} data={profile} />;
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
