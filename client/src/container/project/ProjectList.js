// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, Fragment } from "react";
import Layout from "../layout/Layout";
import LoadingSign from "../../components/utils/LoadingSign";
import ProjectList from "../../components/project/ProjectList";
import { getAction } from "../../services/generalServices";
import useStudentTeacherList from "../../components/utils/studentTeacherList";
import EmptyProfile from "../../components/utils/EmptyProfile";
import { deleteProjectHandler } from "../../utils/utility";
// import { isAuth } from "../../utils/helper";

const Project = (props) => {
  const [projects, setprojects] = useState(null);
  const [user, setUser] = useState({});

  const { student, teacher } = useStudentTeacherList(true, true);

  const id = props.match ? props.match.params.id : null;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    let res;
    if (window.location.href.includes("student"))
      res = await getAction(`/students/${id}`);
    else res = await getAction(`/teachers/${id}`);
    if (res && res.status === 200)
      if (res.data.data && res.data.data.data.length) {
        const user = res.data.data.data[0];
        setUser(user);
        setprojects(user.projectId);
      }
  }, [id]);

  let render = <LoadingSign />;

  if (projects && projects.length > 0) {
    render = (
      <Layout rightSidebar={true} projects={true}>
        <div className="col-lg-6">
          <div
            className="my-4 home-forum col-lg-12"
            style={{
              lineHeight: "1rem",
              backgroundColor: "rgb(212, 218, 223)",
              margin: "auto",
            }}
          >
            <h4 className="text-center forum-h4">
              <strong>Projects</strong>
            </h4>
          </div>
          <div className="col-12 mt-4">
            {projects.map((project, key) => {
              return (
                <ProjectList
                  key={key}
                  project={project}
                  user={user}
                  deleteHandler={deleteProjectHandler}
                  history={props.history}
                  student={student}
                  teacher={teacher}
                />
              );
            })}
          </div>
        </div>
      </Layout>
    );
  } else if (projects && projects.length === 0) {
    render = (
      <Layout>
        <EmptyProfile projects={true} />
      </Layout>
    );
  }
  return render;
};

export default Project;
