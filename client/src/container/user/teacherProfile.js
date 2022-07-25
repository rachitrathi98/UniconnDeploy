import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import LoadingSign from "../../components/utils/LoadingSign";
import TeacherProfile from "../../components/user/teacher/TeacherProfile";
import { getAction } from "../../services/generalServices";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/auth";

const Profile = (props) => {
  const [profile, setprofile] = useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const { id } = props.match.params;

    // if (isAuth()) {
    const res = await getAction(`/teachers/${id}`);
    if (res && res.status === 200) {
      if (res.data.data.data) setprofile(res.data.data.data[0]);
    }
    // }

    // eslint-disable-next-line
  }, [props.match.params]);

  let render = <LoadingSign />;
  if (profile && profile.role === "teacher") {
    render = <TeacherProfile data={profile} history={props.history} />;
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
export default connect(null, mapDispatchtoProps)(Profile);
