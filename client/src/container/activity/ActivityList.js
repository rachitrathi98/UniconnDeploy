// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, Fragment } from "react";
import Layout from "../layout/Layout";
import LoadingSign from "../../components/utils/LoadingSign";
import ActivityList from "../../components/activity/ActivityList";
import ProfileHeader from "../../components/utils/profileHeader";
import { deleteAction, getAction } from "../../services/generalServices";
import Footer from "../layout/Footer";
import default_display from "../../assets/images/default.png";
import EmptyProfile from "../../components/utils/EmptyProfile";
import withAuth from "../../utils/withAuth";
import { onAuth } from "../../utils/helper";
import Project from "../../components/project/Project";

const Activity = (props) => {
  const [activitiesList, setActivity] = useState([]);
  const [user, setUser] = useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const { id } = props.match.params;
    const res = await getAction(`/teachers/${id}`);
    if (res && res.status === 200)
      if (res.data.data.data[0]) {
        setActivity(res.data.data.data[0].activityId);
        setUser(res.data.data.data[0]);
      }
    // eslint-disable-next-line
  }, []);

  let render = <LoadingSign />;

  if (activitiesList.length > 0) {
    const photo =
      user.photo === "default.png"
        ? default_display
        : user.photo && process.env.NODE_ENV === "production"
        ? `${process.env.REACT_APP_BASE_URL}/api/auth/${user.photo}`
        : user.photo
        ? `http://localhost:${process.env.PORT}/api/auth/${user.photo}`
        : null;
    const deleteHandler = (e, activity_id) => {
      e.stopPropagation();
      let isConf = window.confirm("Are you sure you want to delete ?");
      if (isConf) {
        deleteAction(`/activity/${activity_id}`, () => {
          onAuth(() => {
            props.history.push(`/profile`);
          });
        });
      }
    };
    render = (
      <Fragment>
        <div className="col-lg-6">
          <div className="col-lg-12 profile">
            <div className="profile-img ">
              <img src={photo} alt="profile" className="pfp" />
              <div className="row bg-white mainTeacher">
                <ProfileHeader user={user} />
                <div className="col-12 mt-4">
                  {activitiesList.map((activity, key) => {
                    return (
                      <ActivityList
                        key={key}
                        activity={activity}
                        user={user}
                        deleteHandler={deleteHandler}
                      />
                    );
                  })}
                </div>
                <div className="col-12 d-none d-lg-block">
                  <Footer />
                </div>
                <div className="col-12 mt-3 d-lg-none">
                  <h3>Project?</h3>
                  {/* <Project /> */}
                </div>
                <div className="col-12 d-lg-none">
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2 d-none d-lg-block projectList ml-3 pb-5 pt-3">
          {/* <h5>Projects you might be interested in</h5> */}
          <Project />
        </div>
      </Fragment>
    );
  } else if (activitiesList.length === 0) {
    render = <EmptyProfile activity={true} />;
  }
  return <Layout>{render}</Layout>;
};

export default withAuth("")(Activity);
