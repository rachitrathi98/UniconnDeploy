/* eslint-disable react-hooks/exhaustive-deps */
import { withRouter } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import { Fragment, useEffect, useState } from "react";
import { postAction } from "../../services/generalServices";
import { isAuth } from "../../utils/helper";
import Footer from "./Footer";
import BottomNav from "./BottomNav";

const Layout = (props) => {
  const [recommendedProjects, setProjects] = useState(undefined);
  const [recommendedTeachers, setTeachers] = useState(undefined);
  const [recommendedStudents, setStudents] = useState(undefined);
  // Undefined to allow detection of "no results yet" || "Loading..."

  useEffect(async () => {
    // Integrate with Redux and make it call API only once.
    const user = isAuth();
    if (user) {
      const doc = { field_of_interest: user.field_of_interest };
      if (props.projects) {
        const p = await postAction("projects/recommended", doc);
        if (p && p.status === 200) if (p.data) setProjects(p.data);
      } else if (props.teachers) {
        const t = await postAction("teachers/recommended", doc);
        console.log(t);
        if (t && t.status === 200) if (t.data) setTeachers(t.data);
      } else if (props.students) {
        const s = await postAction("students/recommended", doc);
        console.log(s);
        if (s && s.status === 200) if (s.data) setStudents(s.data);
      }
      // Not checking ".data.length" to Allow "no results yet" here
    }
  }, []);

  let floatFormSuggestions = (
    <div style={{ fontSize: "18px" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <strong>NOTE:</strong>
      <br />
      <small>
        If you find your field of project missing, please fill the suggestions
        form at the bottom of the profile page and we will add it to the list
      </small>
    </div>
  );
  let projectFormSuggestions = (
    <div style={{ fontSize: "18px" }}>
      <br />
      <small>
        <strong>Completed</strong>:
        <br />
        Your past projects which can be included in your current field of
        interests
      </small>
      <br />
      <small>
        <strong>Ongoing</strong>:
        <br />
        Projects you are currently working on, but are not looking for
        collaborators
      </small>
      <br />
      <small>
        <strong>Ongoing | Assistance Needed</strong>:
        <br />
        Projects that you have started working on and are looking for other
        collaborators to work with you
      </small>
      <br />
      <small>
        <strong>Float</strong>:
        <br />
        Projects that are in idea stage and you are just putting it out there
        for others to see and reach out
      </small>
      <br />
      <br />
      <small style={{ fontSize: "20px", fontWeight: "800" }}>NOTE</small>
      <br />
      <small>
        If you find your field of project missing, please fill the suggestions
        form at the bottom of the profile page and we will add it to the list
      </small>
      <br />
    </div>
  );

  let activityFormSuggestions = (
    <div style={{ fontSize: "18px" }}>
      <br />
      <small>
        <strong>Completed</strong>:
        <br />
        Your past initiative which is now completed.
      </small>
      <br />
      <small>
        <strong>Ongoing</strong>:
        <br />
        An initiative that you are currently working on/at
      </small>
      <br />
      <small>
        <strong>Ongoing | Assistance Needed</strong>:
        <br />
        The initiative you are currently working on and are looking for other
        collaborators
      </small>
    </div>
  );

  if (props.activityForm) {
    return (
      <Fragment>
        <Header props={props} />
        <div className="container-modified">
          <div className="row text-center mt-4">
            {props.children}
            <div
              className="col-3 col-lg-4 d-none d-lg-block text-left"
              style={{ marginTop: "30px" }}
            >
              {window.innerWidth > "1025" && activityFormSuggestions}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  if (props.projectForm) {
    return (
      <Fragment>
        <Header props={props} />
        <div className="container-modified">
          <div className="row text-center mt-4">
            {props.children}
            <div
              className="col-3 col-lg-4 d-none d-lg-block text-left"
              style={{ marginTop: "60px" }}
            >
              {window.innerWidth > "1025" && projectFormSuggestions}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  if (props.floatForm) {
    return (
      <Fragment>
        <Header props={props} />
        <div className="container-modified">
          <div className="row text-center mt-4">
            {props.children}
            <div
              className="col-3 col-lg-4 d-none d-lg-block text-left"
              style={{ marginTop: "60px" }}
            >
              {window.innerWidth > "1025" && floatFormSuggestions}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
  if (props.rightSidebar) {
    return (
      <Fragment>
        <Header props={props} />
        <div className="container-modified">
          <div className="row text-center text-lg-left mt-4">
            <div className="col-lg-3 sidebar">{isAuth() && <Sidebar />}</div>
            {props.children}
            {isAuth() && (
              <RightSidebar
                teachers={{ bool: props.teachers, recommendedTeachers }}
                students={{ bool: props.students, recommendedStudents }}
                projects={{ bool: props.projects, recommendedProjects }}
                questions={{
                  bool: props.questions,
                  recommendedQuestions: props.recommendedQuestions,
                }}
              />
            )}
            {!props.profile && (
              <div className="col-6 d-none d-lg-block mx-auto">
                <Footer />
              </div>
            )}
          </div>
        </div>
        {!props.profile && (
          <div className="col-12 d-lg-none">
            <Footer />
          </div>
        )}
        <BottomNav />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Header props={props} />
        <div className="container-modified">
          <div className="row mt-lg-4">
            <div className="col-lg-3 sidebar">{isAuth() && <Sidebar />}</div>
            {props.children}
          </div>
        </div>
        <BottomNav />
      </Fragment>
    );
  }
};

export default withRouter(Layout);
