/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import withAuth from "../../utils/withAuth";
import { isAuth } from "../../utils/helper";
import EditTeachersProfile from "../../components/user/teacher/EditTeachersProfile";
import EditAdminProfile from "../../components/user/admin/EditAdminProfile";
import EditStudentProfile from "../../components/user/student/EditStudentProfile";
import {
  getAction,
  patchAction,
  postAction,
} from "../../services/generalServices";
import Loading from "../../components/utils/LoadingSign";

const Register = (props) => {
  const isDisabled = false; // Disallow College selection
  const [user, setUser] = useState({});
  const [collegeOptions, setColleges] = useState({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (isAuth()) {
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
      const res = await getAction(`/${isAuth().role}s/${isAuth()._id}`, null);
      if (res && res.status === 200) {
        if (res.data.data.data) setUser(res.data.data.data[0]);
        if (res.data.data.data && !res.data.data.data[0].notificationId) {
          const res1 = await postAction(`/notification`, null);
          if (res1 && res1.status === 201) {
            await patchAction(`/${isAuth().role}s/${isAuth()._id}`, {
              notificationId: res1.data.data.data._id,
            });
          }
        }
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
        history={props.history}
        collegeOptions={collegeOptions}
      />
    );
  else return <Loading />;
};

export default withAuth()(Register);
