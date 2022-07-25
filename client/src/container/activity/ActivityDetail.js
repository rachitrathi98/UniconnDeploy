/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import LoadingSign from "../../components/utils/LoadingSign";
import ActivityDetails from "../../components/activity/ActivityDetails";
import { getAction, deleteAction } from "../../services/generalServices";
import { onAuth } from "../../utils/helper";
import withAuth from "../../utils/withAuth";

const Activity = (props) => {
  const [activity, setActivity] = useState(null);
  const [user, setUser] = useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const { id } = props.match.params;
    const res = await getAction(`/activity/${id}`);
    if (res && res.status === 200) {
      if (res.data.data.data) setActivity(res.data.data.data[0]);

      if (res.data.data && res.status === 200) {
        const res1 = await getAction(
          `/teachers/${res.data.data.data[0].teacherId[0]}`,
        );
        if (res1 && res1.status === 200) {
          if (res1.data.data.data) setUser(res1.data.data.data[0]);
        }
      }
    }
  }, [props.match.params]);

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
  let render = <LoadingSign />;
  if (activity)
    render = (
      <ActivityDetails
        deleteHandler={deleteHandler}
        user={user}
        data={activity}
        history={props.history}
      />
    );

  return <Layout>{render}</Layout>;
};

export default withAuth("")(Activity);
