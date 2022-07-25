import React from "react";
import { isAuth } from "../../utils/helper";
import ForumHeader from "../../components/forums/ForumHeader";
import { useEffect, useState } from "react";
import { getAction, patchAction } from "../../services/generalServices";
import QuestionCard from "../../components/forums/QuestionCard";
import useStudentTeacherList from "../../components/utils/studentTeacherList";
import Loading from "../../components/utils/LoadingSign";
import ReactPaginate from "react-paginate";
import Layout from "../layout/Layout";


const ForumHome = (props) => {
  let render = <Loading />;
  const [questions, setQuestions] = useState(null);
  const [filter_questions, setFilterQuestions] = useState([]);
  const [questionsList, setQuestionsList] = useState([]);
  const [sorted_questions, setsortedQuestions] = useState([]);
  // const [tagList, setTagList] = useState([]);
  const { student, teacher } = useStudentTeacherList(true, true);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [questionsPerPage, setQuestionsPerPage] = useState(12);

  const pathname = window.location.href;
  const isPrivate = pathname.includes("private"); //checks if forum is private
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (isAuth()) {
      const res = await getAction(`/questions`);
      // const res1 = await getAction(`/tags`);
      if (res && res.data.data.data) {
        // Stuff that's Anonymous and unapproved, is not allowed
        const data = res.data.data.data.filter(
          (q) => !q.isAnonymous || q.isApproved,
        );

        // logical implication (anon -> approved) == (~anon V approved)
        setQuestions(data);
        let list = data.map((info) => {
          return info.question;
        });
        setQuestionsList(list);
        // let taglist = res1.data.data.data.map((info) => {
        //   return info.name;
        // });

        var sortedQuestions = data.sort(function (a, b) {
          return Math.abs(new Date(b.date) - new Date(a.date));
        });
        setFilterQuestions(sortedQuestions.reverse());
        setsortedQuestions(sortedQuestions);

        // setTagList(taglist);
      }
    } else {
      props.history.push("/");
    }
    // eslint-disable-next-line
  }, []);
  // console.log("ssdssd", tagList);
  const searchName = (newList) => {
    // console.log("search", newList.length === questions.length);
    // if (newList.length === questions.length)
    //   setFilterQuestions(sorted_questions);
    // else setFilterQuestions(newList);
    setFilterQuestions(newList);
    if (currentPage !== 1) setCurrentPage(1);
  };

  const handleRatingsQuestion = async (question, upvote, downvote) => {
    console.log(question,upvote,downvote)
    let FinalQuestion = question;
    FinalQuestion.upvotes = upvote;
    FinalQuestion.downvotes = downvote;

    await patchAction(`/questions/${question._id}`, question, () => {
      if (window.location) window.location.reload();
    });
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filter_questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion,
  );

  const paginate = ({ selected: selectedPage }) =>
    setCurrentPage(selectedPage + 1);
  const pageCount = Math.ceil(filter_questions.length / questionsPerPage);

  if (questions) {
    const topAnsweredQuestion = [...filter_questions];
    const topAnswered = topAnsweredQuestion.sort((a, b) =>
      a.answers.length > b.answers.length ? -1 : 1,
    );

    render = (
      <Layout
        rightSidebar={true}
        questions={true}
        recommendedQuestions={topAnswered}
      >
        <div className="col-lg-6">
          <ForumHeader
            text="Private"
            list={questionsList}
            searchName={searchName}
            question={questions}
            // tag={tagList}
          />
          {/* Map this question-box div multiple times */}
          {isPrivate
            ? currentQuestions.map(
                (question) =>
                  question.isPrivate && (
                    <QuestionCard
                      key={question._id}
                      question={question}
                      student={student}
                      teacher={teacher}
                      handleRatings={handleRatingsQuestion}
                    />
                  ),
              )
            : currentQuestions.map((question) => {
                if (!question.isPrivate)
                  return (
                    <QuestionCard
                      key={question._id}
                      question={question}
                      student={student}
                      teacher={teacher}
                    />
                  );
                return null;
              })}
          <div className="center mt-3">
            <ReactPaginate
              onPageChange={paginate}
              pageCount={pageCount}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"} 
              nextLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </Layout>
    );
  }
  return render;
};

export default ForumHome;
