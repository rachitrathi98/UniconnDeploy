/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import withAuth from "../../utils/withAuth";
import { isAuth } from "../../utils/helper";
import EditTeachersProfile from "../../components/user/teacher/EditTeachersProfile";
import EditAdminProfile from "../../components//user/admin/EditAdminProfile";
import EditStudentProfile from "../../components/user/student/EditStudentProfile";
import { getAction } from "../../services/generalServices";
import Loading from "../../components/utils/LoadingSign";

const EditProfile = (props) => {
  // const [isProfile, setisProfile] = useState(true);
  const isDisabled = true; // Disallow College selection
  const [user, setUser] = useState({});
  const [collegeOptions, setColleges] = useState({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    // if (props.match.path === "/register") {
    //   setisProfile(false);
    // }
    const c = await getAction("/colleges/?fields=_id name");
    if (c && c.status === 200) {
      if (c.data.data.data && c.data.data.data.length)
        setColleges(
          c.data.data.data.map(({ _id, name }) => ({
            label: name,
            value: _id,
          })),
        );
    }
    if (isAuth()) {
      const res = await getAction(`/${isAuth().role}s/${isAuth()._id}`, null);
      console.log(res);
      if (res && res.status === 200) {
        if (res.data.data.data) setUser(res.data.data.data[0]);
      }
    } else {
      props.history.push("/");
    }
  }, []);
  if (user.role === "student")
    return (
      <EditStudentProfile
        user={user}
        history={props.history}
        collegeDropdown={{ collegeOptions, isDisabled }}
      />
    );
  else if (user.role === "teacher")
    return (
      <EditTeachersProfile
        user={user}
        history={props.history}
        collegeDropdown={{ collegeOptions, isDisabled }}
      />
    );
  else if (isAuth().role === "admin")
    return (
      <EditAdminProfile
        user={isAuth()}
        collegeOptions={collegeOptions}
        history={props.history}
      />
    );
  else return <Loading />;
};

export default withAuth()(EditProfile);
