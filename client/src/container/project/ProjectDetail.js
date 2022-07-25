import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import LoadingSign from "../../components/utils/LoadingSign";
import ProjectDetails from "../../components/project/ProjectDetails";
import { getAction } from "../../services/generalServices";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/auth";
import useStudentTeacherList from "../../components/utils/studentTeacherList";
import { deleteProjectHandler } from "../../utils/utility";

const Project = (props) => {
  const [project, setProject] = useState(null);
  const [user, setUser] = useState({});

  const { student, teacher } = useStudentTeacherList(true, true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const { id } = props.match.params;
    const res = await getAction(`/projects/${id}`);
    if (res && res.status === 200) {
      if (res.data.data.data[0] && res.status === 200) {
        setProject(res.data.data.data[0]);
        let res1;
        if (res.data.data.data[0].createdBy === "teacher")
          res1 = await getAction(
            `/${res.data.data.data[0].createdBy}s/${res.data.data.data[0].teacherId[0]}`,
          );
        else if (res.data.data.data[0].createdBy === "student")
          res1 = await getAction(
            `/${res.data.data.data[0].createdBy}s/${res.data.data.data[0].studentId[0]}`,
          );

        else
        res1 = await getAction(
          `/teachers/${res.data.data.data[0].teacherId[0]}`,
        );
          console.log("res1",res1)
        if (res1 && res1.status === 200) {
          if (res1.data.data.data) setUser(res1.data.data.data[0]);
        }
      }
    }
  }, [props.match.params]);

  let render = <LoadingSign />;
  if (project && user) {
    render = (
      <ProjectDetails
        deleteHandler={deleteProjectHandler}
        user={user}
        data={project}
        student={student}
        history={props.history}
        teacher={teacher}
      />
    );
  }

  return <Layout>{render}</Layout>;
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onAuth: (callback) => dispatch(actions.auth(callback)),
  };
};
export default connect(null, mapDispatchtoProps)(Project);
