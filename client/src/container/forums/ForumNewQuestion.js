import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { Link } from "react-router-dom";
// import ForumHeader from "../../components/forums/ForumHeader";
import { getAction, postAction } from "../../services/generalServices";
import NewQuestionForm from "../../components/forums/NewQuestionForm";
import { isAuth } from "../../utils/helper";
import { toast } from "react-toastify";

const ForumNewQuestion = (props) => {
  const pathname = window.location.href;
  const isPrivate = pathname.includes("private");
  const [suggestions, setsuggestions] = useState([]);

  const handleSubmit = async (event, body) => {
    event.preventDefault();
    toast.success("Your Question is submitted");
    await postAction(`/questions`, body, () => {
      isPrivate
        ? props.history.push("/privateforum")
        : props.history.push("/publicforum");
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const restag = await getAction(`/tags`);
    if (restag && restag.status === 200) {
      if (restag.data.data.data) {
        let tags = [];
        restag.data.data.data.map((tagobj) => {
          tags.push({ id: tagobj._id, name: tagobj.name });
          return null;
        });
        setsuggestions(tags);
      }
    }

    // eslint-disable-next-line
  }, []);
  console.log(suggestions);
  return (
    <div>
      <Header />
      <div className="container-modified">
        <div className="row mt-2">
          <div className="col-lg-3 sidebar">{isAuth() && <Sidebar />}</div>
          <div className="col-lg-6">
            {/* <ForumHeader /> */}
            <NewQuestionForm
              handleSubmit={handleSubmit}
              location={props.location.pathname}
              suggestions={suggestions}
            />
            <Link
              className="btn btn-outline-primary btn-sm mt-3 d-none d-lg-block"
              style={{ width: "15%" }}
              to={isPrivate ? "/privateforum" : "/publicforum"}
            >
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumNewQuestion;
