// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, Fragment } from "react";
import Layout from "../layout/Layout";
import LoadingSign from "../../components/utils/LoadingSign";
import { deleteAction, getAction } from "../../services/generalServices";
import { isAuth, onAuth } from "../../utils/helper";
import QuestionCard from "../../components/forums/QuestionCard";
import EmptyProfile from "../../components/utils/EmptyProfile";

const YourPosts = () => {
  const [questions, setquestions] = useState(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const res = await getAction(`/questions`);
    if (res && res.status === 200)
      if (res.data.data && res.data.data.data.length) {
        if (isAuth().role === "student") {
          let userQuestion = res.data.data.data.filter(
            (question) => question.student_Id === isAuth()._id,
          );
          setquestions(userQuestion);
        } else if (isAuth().role === "teacher") {
          let userQuestion = res.data.data.data.filter(
            (question) => question.teacher_Id === isAuth()._id,
          );
          setquestions(userQuestion);
        }
      }
  }, []);
  const deleteHandler = async (e, question_id, answers) => {
    e.stopPropagation();
    let isConf = window.confirm("Are you sure you want to delete ?");
    if (isConf) {
      await deleteAction(`/questions/${question_id}`, () => {
        onAuth(() => {
          window.location.reload();
          console.log("am i really here?", answers);
          if (answers && answers.length > 0) {
            answers.map(async (ans) => {
              await deleteAction(`/answers/${ans._id}`);
            });
          }
        });
      });
    }
  };
  let render = <LoadingSign />;
  if (questions && questions.length > 0) {
    const questionsSorted = Object.values(questions)
      .map((question) => question)
      .reverse();
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
              <strong>Your Posts</strong>
            </h4>
          </div>
          {questionsSorted.map((question) => {
            return (
              <QuestionCard
                key={question._id}
                question={question}
                // student={student}
                // teacher={teacher}
                deleteHandler={deleteHandler}
              />
            );
          })}
        </div>
      </Layout>
    );
  } else if (questions && questions.length === 0) {
    render = (
      <Layout>
        <EmptyProfile posts={true} />;
      </Layout>
    );
  }
  return render;
};

export default YourPosts;
