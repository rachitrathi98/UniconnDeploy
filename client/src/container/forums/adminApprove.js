// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import LoadingSign from "../../components/utils/LoadingSign";
import {
  deleteAction,
  getAction,
  patchAction,
} from "../../services/generalServices";
import { onAuth } from "../../utils/helper";
import QuestionCard from "../../components/forums/QuestionCard";
import EmptyProfile from "../../components/utils/EmptyProfile";
import withAuth from "../../utils/withAuth";

const YourPosts = (props) => {
  const [questions, setquestions] = useState(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const res = await getAction(
      `/questions?isAnonymous=true&&isApproved=false`,
    );
    if (res && res.status === 200) {
      setquestions(res.data.data.data);
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

  const acceptHandler = async (e, question_id, answers) => {
    e.stopPropagation();
    await patchAction(`/questions/${question_id}`, { isApproved: true }, () => {
      props.history.go(0);
    });
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
                adminApprove={!question.isApproved}
                deleteHandler={deleteHandler}
                acceptHandler={acceptHandler}
                isParam
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

export default withAuth("admin")(YourPosts);
