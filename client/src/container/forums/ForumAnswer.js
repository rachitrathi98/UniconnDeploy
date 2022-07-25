import React, { useState, useEffect } from "react";
import { isAuth } from "../../utils/helper";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import ForumHeader from "../../components/forums/ForumHeader";
import moment from "moment-timezone";
import {
  getAction,
  patchAction,
  postAction,
} from "../../services/generalServices";
// import PrivateForumHome from "./PrivateForumHome";
import QuestionCard from "../../components/forums/QuestionCard";
import UserAnswer from "../../components/forums/UserAnswer";
import Answered from "../../components/forums/Answered";
import useStudentTeacherList from "../../components/utils/studentTeacherList";
import Loading from "../../components/utils/LoadingSign";
import BottomNav from "../layout/BottomNav";
import Footer from "../layout/Footer";

const ForumAnswer = (props) => {
  let render = <Loading />;
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [editAnswer, setEditAnswer] = useState("");
  const [reply, setreply] = useState([]);
  const { student, teacher, student2, teacher2 } = useStudentTeacherList(
    true,
    true
  );

  // eslint-disable-next-line no-unused-vars
  const [errors, seterrors] = useState({});
  const [error, seterror] = useState({});

  const { id } = props.match.params;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (isAuth()) {
      const res = await getAction(`/questions/${id}`);
      if (res && res.data && res.data.data.data)
        setQuestion(res.data.data.data[0]);
      // Create a not available page for Anonymous and unApproved
      else props.history.push("/privateforum");
    } else {
      props.history.push("/");
    }
    // eslint-disable-next-line
  }, []);

  const handleInput = (e) => {
    setAnswer(e.target.value);
    if (e.target.value.length > 0) {
      errors.name =
        e.target.value.length < 10
          ? "Answer should be greater than 10 characters"
          : "";
    }
  };

  const handleEditInput = (e) => {
    setEditAnswer(e.target.value);
    if (e.target.value.length > 0) {
      error.name =
        e.target.value.length < 10
          ? "Answer should be greater than 10 characters"
          : "";
    }
  };

  const handleReplyInput = (e) => {
    setreply(e.target.value);
    if (e.target.value.length > 0) {
      errors.name = e.target.value.length < 1;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let body = {
      teacher_Id: null,
      student_Id: null,
      answer: answer,
      date: moment.tz(Date.now(), "Asia/Kolkata").format(),
      question_Id: id,
    };
    if (isAuth().role === "teacher") body.teacher_Id = isAuth()._id;
    if (isAuth().role === "student") body.student_Id = isAuth()._id;
    //body of notification we are about to send
    let notificationBody = {
      Link: `/${question.isPrivate ? "privateforum" : "publicforum"}/answer/${
        question._id
      }`,
      teacher_Id: isAuth().role === "teacher" ? isAuth()._id : null,
      student_Id: isAuth().role === "student" ? isAuth()._id : null,
      NotificationType: "Question",
      Message: `${isAuth().name} has answered your question`,
      date: moment.tz(Date.now(), "Asia/Kolkata").format(),
    };

    //check if data we received from chat contains notification ID
    const user = question.student_Id
      ? student2[question.student_Id]
      : teacher2[question.teacher_Id];
    console.log(user, question);
    if (user && user.notificationId)
      //PATCH request to send notification to user about chat with notification object
      await patchAction(`/notification/${user.notificationId}`, {
        notification: notificationBody,
      });
    await postAction(`/answers`, body, () => {
      if (window) window.location.reload();
    });
  };

  const handleReplySubmit = async (e, answer) => {
    e.preventDefault();

    let body = {
      teacher_Id: null,
      student_Id: null,
      reply: reply,
    };
    if (isAuth().role === "teacher") body.teacher_Id = isAuth()._id;
    if (isAuth().role === "student") body.student_Id = isAuth()._id;
    if (answer.replies) answer.replies.push(body);
    
    let notificationBodyQuestion = {
      Link: `/${question.isPrivate ? "privateforum" : "publicforum"}/answer/${
        question._id
      }`,
      teacher_Id: isAuth().role === "teacher" ? isAuth()._id : null,
      student_Id: isAuth().role === "student" ? isAuth()._id : null,
      NotificationType: "Question",
      Message: `${isAuth().name} has replied to the answer for your question`,
      date: moment.tz(Date.now(), "Asia/Kolkata").format(),
    };
    let notificationBodyAnswer = {
      Link: `/${question.isPrivate ? "privateforum" : "publicforum"}/answer/${
        question._id
      }`,
      teacher_Id: isAuth().role === "teacher" ? isAuth()._id : null,
      student_Id: isAuth().role === "student" ? isAuth()._id : null,
      NotificationType: "Answer",
      Message: `${isAuth().name} has replied to your answer`,
      date: moment.tz(Date.now(), "Asia/Kolkata").format(),
    };
    const userQuestion = question.student_Id
    ? student2[question.student_Id]
    : teacher2[question.teacher_Id];

  if (userQuestion && userQuestion.notificationId)
    await patchAction(`/notification/${userQuestion.notificationId}`, {
      notification: notificationBodyQuestion,
    });

    const userAnswer = answer.student_Id
    ? student2[answer.student_Id]
    : teacher2[answer.teacher_Id];
    if (userAnswer && userAnswer.notificationId)
    await patchAction(`/notification/${userAnswer.notificationId}`, {
      notification: notificationBodyAnswer,
    });

    await patchAction(`/answers/${answer._id}`, answer, () => {
      if (window.location) window.location.reload();
    });
  };
  const handleEditAnswerSubmit = async (e, answer) => {
    e.preventDefault();

    let body = {
      answer: editAnswer,
    };
    await patchAction(`/answers/${answer._id}`, body, () => {
      setEditAnswer("");
      if (window.location) window.location.reload();
    });
  };

  const handleRatingsAnswer = async (answer, upvote, downvote) => {
    let FinalAnswer = answer;
    FinalAnswer.upvotes = upvote;
    FinalAnswer.downvotes = downvote;

    await patchAction(`/answers/${answer._id}`, answer, () => {
      if (window.location) window.location.reload();
    });
  };

  // const sortedByUpvotes=x.sort((a,b)=>a.upvotes.length>b.upvotes.length?1:-1)
  // console.log(sortedByUpvotes)

  if (question) {
    const sorted = question.answers.sort((a, b) =>
      a.upvotes.length > b.upvotes.length ? -1 : 1
    );
    render = (
      <div>
        <Header />
        <BottomNav />
        <div className="container-modified">
          <div className="row">
            <div className="col-lg-3 sidebar mt-lg-5">
              {isAuth() && <Sidebar />}
            </div>

            <div className="col-lg-6 mt-lg-4">
              <button
                onClick={props.history.goBack}
                className="btn btn-outline-primary btn d-none d-lg-block"
              >
                Back
              </button>
              {!id && <ForumHeader />}
              <QuestionCard
                question={question}
                isParam={id ? true : false}
                student={student}
                teacher={teacher}
              />
              <UserAnswer
                answer={answer}
                question={question.question}
                user={isAuth()}
                handleInput={handleInput}
                errors={errors}
                handleSubmit={handleSubmit}
              />
              <p
                style={{
                  fontSize: "1.8em",
                  fontWeight: "800",
                  textAlign: "center",
                }}
              >
                Answers
              </p>
              {question.answers &&
                sorted.map((answer, _) => {
                  return (
                    <Answered
                      key={_}
                      student={student}
                      editanswer={editAnswer}
                      teacher={teacher}
                      answer={answer}
                      errors={error}
                      handleReplySubmit={handleReplySubmit}
                      handleEditAnswerSubmit={handleEditAnswerSubmit}
                      handleEditInput={handleEditInput}
                      handleReplyInput={handleReplyInput}
                      handleRatings={handleRatingsAnswer}
                    />
                  );
                })}
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6 col-12">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return render;
};

export default ForumAnswer;
