import React, { useState } from "react";
import { postAction } from "../../services/generalServices";
import { isAuth } from "../../utils/helper";
import AutocompleteTagInput from "./AutocompleteTagInput";
import moment from "moment-timezone";

const NewQuestionForm = (props) => {
  const [questionInput, setQuestionInput] = useState("");
  const [tagInput, setTagInput] = useState([]);
  const [isAnonymous, setPrivate] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [errors, seterrors] = useState({});
  const [submitValue, setsubmitValue] = useState({ message: "Submit" });
  // console.log(isAnonymous)
  const handleChange = (event) => {
    setQuestionInput(event.target.value);
    if (!event.target.value) {
      errors.question = "Required";
    } else if (event.target.value.length > 0) {
      errors.question =
        event.target.value.length < 10
          ? "Question must be greater than 10 characters"
          : "";
    }
  };

  const handleSubmit = (event) => {
    setsubmitValue({ message: "Submitting" });
    let body = {
      question: questionInput,
      tags: [],
      isPrivate: false,
      isAnonymous,
      isApproved: false,
      teacher_Id: undefined,
      student_Id: undefined,
      date: moment.tz(Date.now(), "Asia/Kolkata").format(),
      collegeName: isAuth() ? isAuth().collegeId.name : "",
    };
    tagInput.map((tag) => {
      body.tags.push(tag.name);
      return null;
    });

    if (isAuth() && !isAnonymous) {
      if (isAuth().role === "teacher") body.teacher_Id = isAuth()._id;
      else if (isAuth().role === "student") body.student_Id = isAuth()._id;
    }

    if (props.location === "/privateforum/new-question") {
      body.isPrivate = true;
    } else {
      body.isPrivate = false;
    }
    setsubmitValue({ message: "Submit" });
    // console.log(" tags", body);
    props.handleSubmit(event, body);
  };

  const onDelete = (i) => {
    const tags = tagInput.slice(0);
    tags.splice(i, 1);
    console.log(" tags", tags);

    setTagInput(tags);
  };

  const onAddition = async (tag) => {
    const tags = [].concat(tagInput, tag);
    console.log(" tags", tag, tags);

    if (!props.suggestions.includes(tag)) {
      let body = {
        name: tag.name,
        ownerId: isAuth()._id,
      };
      await postAction("/tags", body);
    }
    setTagInput(tags);
  };
  return (
    <form className="mt-5">
      <div className="new-question-forum form-group">
        <label htmlFor="newQuestionInput">Question</label>
        <input
          placeholder="Question*"
          className={
            "form-control bg-transparent formInputs" +
            (errors.question ? " is-invalid" : "")
          }
          id="newQuestionInput"
          type="text"
          onChange={handleChange}
          value={questionInput}
        />
        {
          <div style={{ color: "red", textAlign: "center" }}>
            {errors.question}
          </div>
        }
      </div>
      <div className="tags-new-question-forum form-group">
        <label htmlFor="newQuestionTagsInput">
          Tags (Press Enter to add a tag)
        </label>
        <AutocompleteTagInput
          tags={tagInput}
          suggestions={props.suggestions}
          onDelete={onDelete}
          onAddition={onAddition}
        />
      </div>
      <div className="tags-new-question-forum form-group">
        <input
          type="checkbox"
          defaultChecked={isAnonymous}
          onChange={() => {
            setPrivate(!isAnonymous);
          }}
        />
        &nbsp;&nbsp;&nbsp; <label htmlFor="isAnonymous">Post Anonymously</label>
      </div>
      <button
        className="btn btn-outline-primary btn-sm w-100 mb-3"
        style={{ borderRadius: "20px" }}
        onClick={handleSubmit}
        disabled={!(!errors.question && questionInput.length !== 0)}
      >
        {submitValue.message}
      </button>
      {/* <small>
        <strong>Note:</strong> Option to ask questions anonymously coming soon
      </small> */}
      <small>
        <strong>DOs:</strong> <br />
        1) Check whether the question you are asking is already asked by
        somebody else.
        <br />
        2) Type an appropriate tag for the question. <br />
        <strong>DONTs:</strong> <br />
        1) This is not a confession page so please avoid directly naming anybody
        in the post. <br />
        2) Don't resubmit an anonymous question if it has been rejected earlier.{" "}
        <br />
        <strong>NOTE:</strong> <br />
        1) Each anonymous question will be read by the UniConn team before being
        posted on the website. <br />
        2) UniConn Team see the name of the person who posted an anonymous
        question. <br />
        3) You will not be able to delete an anonymous question once it is
        accepted by us. Although if valid flags are raised against a question,
        we will take it down. <br />
        4) Uniconn Team reserves the rights to accept or reject any post as we deem fit,
        the decision will be final.
      </small>
    </form>
  );
};

export default NewQuestionForm;
