import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import StudentList from "./container/list/studentsList";
import TeacherList from "./container/list/teachersList";
import Home from "./components/Home";
import Loading from "./components/utils/LoadingSign";

import Profile from "./container/user/profile";
import StudentProfile from "./container/user/studentProfile";
import TeacherProfile from "./container/user/teacherProfile";

import Register from "./container/user/Register";
import EditProfile from "./container/user/editProfile";
import Notifications from "./container/user/Notifications";

import { isAuth } from "./utils/helper";
import ErrorPage from "./components/utils/ErrorPage";
import ProjectList from "./container/project/ProjectList";
import ProjectDetail from "./container/project/ProjectDetail";
import Project from "./container/project/Project";

import allFloats from "./container/list/AllFloatsList";

import activityList from "./container/activity/ActivityList";
import activityDetail from "./container/activity/ActivityDetail";
import Activity from "./container/activity/Activity";
import YourPosts from "./container/forums/YourPosts.js";
import adminApprove from "./container/forums/adminApprove";
import Decision from "./container/forums/Decision";
import ForumHome from "./container/forums/ForumHome";
import ForumAnswer from "./container/forums/ForumAnswer";
import ForumNewQuestion from "./container/forums/ForumNewQuestion";
import ChatApp from "./container/chats/ChatApp";

const Routes = () => {
  let routes = (
    <Switch>
      <Route path="/error/:error" exact component={ErrorPage} />
      <Route path="/teachers" exact component={TeacherList} />
      <Route path="/teacher/:id" component={TeacherProfile} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/" exact component={Home} />
      <Route path="/project_detail/:id" component={ProjectDetail} />
      <Route path="/project/:id" component={ProjectList} />
      <Route path="/activity_detail/:id" component={activityDetail} />
      {/* <Route path="/addactivity" exact component={Activity} /> */}
      <Redirect to="/" />
    </Switch>
  );

  if (isAuth())
    routes = (
      <Switch>
        {/* user */}
        <Route path="/student/:id" component={StudentProfile} />
        <Route path="/students" exact component={StudentList} />
        <Route path="/teacher/:id" component={TeacherProfile} />
        <Route path="/teachers" exact component={TeacherList} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/editprofile" exact component={EditProfile} />
        <Route path="/notifications" component={Notifications} />
        {/* Project */}
        <Route path="/project_detail/:id" component={ProjectDetail} />
        <Route path="/student_project/:id" component={ProjectList} />
        <Route path="/teacher_project/:id" component={ProjectList} />
        <Route path="/addproject" exact component={Project} />
        <Route path="/editproject/:id" component={Project} />
        <Route path="/collaborators" component={allFloats} />
        {/* Activity */}
        <Route path="/activity_detail/:id" component={activityDetail} />
        <Route path="/addactivity" exact component={Activity} />
        <Route path="/editactivity/:id" component={Activity} />
        <Route path="/activity/:id" component={activityList} />
        {/* Forum */}
        <Route path="/forums" exact component={Decision} />
        <Route path="/publicforum" exact component={ForumHome} />
        <Route path="/privateforum" exact component={ForumHome} />
        <Route path="/yourposts" exact component={YourPosts} />
        <Route
          path="/privateforum/new-question"
          exact
          component={ForumNewQuestion}
        />
        <Route
          path="/publicforum/new-question"
          exact
          component={ForumNewQuestion}
        />
        <Route path="/privateforum/answer/:id" exact component={ForumAnswer} />
        <Route path="/publicforum/answer/:id" exact component={ForumAnswer} />
        {/* Chats */}
        <Route path="/chats/:id" exact component={ChatApp} />
        <Route path="/chats" exact component={ChatApp} />
        {/* Misc */}
        <Route path="/error/:error" component={ErrorPage} />
        <Route path="/underdevelopment" exact component={ErrorPage} />
        <Route path="/" exact component={Home} />
        <Redirect to="/profile" />
      </Switch>
    );

  if (isAuth() && !isAuth().isRegistered)
    routes = (
      <Switch>
        <Route path="/register" exact component={Register} />
        <Redirect to="/register" />
      </Switch>
    );
  if (isAuth() && isAuth().role === "admin" && !isAuth().isRegistered)
    routes = (
      <Switch>
        <Route path="/approve" exact component={adminApprove} />
        <Route path="/profile" exact component={Profile} />
        <Redirect to="/" />
      </Switch>
    );

  return <Suspense fallback={<Loading />}>{routes}</Suspense>;
};

export default Routes;
