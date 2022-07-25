import React, { useState } from "react";
import { isAuth } from "../../../utils/helper";
import Header from "../../layout/Header";
import Sidebar from "../../layout/Sidebar";
import ChannelList from "./ChannelList";
import MessagePanel from "./MessagePanel";
import { IndividualConversation } from "./ChatComponents";
// import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { initiateMessage } from "../../../utils/utility";
import LoadingSign from "../../../components/utils/LoadingSign";
import BottomNav from "../../layout/BottomNav";

const Chat = (props) => {
  console.log("Chat prosp",props)
  // const studentsPerPage = 8;
  //const teachersPerPage = 8;
  const [searchValue, setsearchValue] = useState("");
  //const [currentPage, setcurrentPage] = useState(1);
  const [allList, setallList] = useState(false);

  const handleChange = (e) => {
    setsearchValue(e.target.value);
    if (allList) props.searchUser(e.target.value);
    else props.searchMyChannels(e.target.value);
  };
  //console.log("Checking for all channels: ", props);
  // const paginate = ({ selected: selectedPage }) =>
  //   setcurrentPage(selectedPage + 1);

  // const indexOfLastStudent = currentPage * studentsPerPage;
  // const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  // const currentStudents = Object.keys(props.student).slice(
  //   indexOfFirstStudent,
  //   indexOfLastStudent
  // );

  // const indexOfLastTeacher = currentPage * teachersPerPage;
  // const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  // const currentTeachers = Object.keys(props.teacher).slice(
  //   indexOfFirstTeacher,
  //   indexOfLastTeacher
  // );
  // const paginate = ({ selected: selectedPage }) =>
  //   setcurrentPage(selectedPage + 1);

  const Students = Object.keys(props.student).filter(
    (value) => value !== isAuth()._id,
  );
  const Teachers = Object.keys(props.teacher).filter(
    (value) => value !== isAuth()._id,
  );

  // const pageCount = Math.ceil(
  //   (Object.values(props.student).length +
  //     Object.values(props.teacher).length) /
  //     (studentsPerPage + teachersPerPage)
  // );

  let render = <LoadingSign />;
  if (props.user) {
    render = (
      <div>
        <Header />
        <div className="container-modified">
          <div className="row mt-2">
            <div className="col-lg-3 sidebar mt-lg-5">
              {isAuth() && <Sidebar />}
            </div>
            <div className="col-lg-6">
              <div className="my-5 py-3 px-3 chat-outside-container">
                <h4 className="d-none mb-4 d-lg-block">
                  <Link
                    to={
                      props.user.role === "teacher"
                        ? `/teacher/${props.user._id}`
                        : `/student/${props.user._id}`
                    }
                    className="forum-h4"
                  >
                    {props.user.name}
                  </Link>
                  <strong> | </strong>
                  {props.user.role === "teacher"
                    ? props.user.position
                    : props.user.batch}
                  <br />
                  {props.user.role === "teacher"
                    ? props.user.department
                    : props.user.branch}
                  <br />
                  {props.user.collegeId && props.user.collegeId.name}
                </h4>
                <p className="d-block d-lg-none">
                  <Link
                    to={
                      props.user.role === "teacher"
                        ? `/teacher/${props.user._id}`
                        : `/student/${props.user._id}`
                    }
                    className="forum-h4"
                  >
                    {props.user.name}
                  </Link>
                  <strong> | </strong>
                  {props.user.role === "teacher"
                    ? props.user.position
                    : props.user.batch}
                  <br />
                  {props.user.role === "teacher"
                    ? props.user.department
                    : props.user.branch}
                  <br />
                  {props.user.collegeId && props.user.collegeId.name}
                </p>
                <div className=" my-3 py-3 chat-inside-container">
                  {props.messageList && props.personId ? (
                    <MessagePanel
                      currentChannel={props.channelInfo}
                      updateMessage={props.updateMessage}
                      messageList={props.messageList}
                      socket={props.socket}
                    />
                  ) : (
                    <p className="mt-2 ml-4" style={{ fontSize: "20px" }}>
                      {" "}
                      No Conversations Opened Yet
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-3 mt-lg-1">
              <div
                className="my-lg-5 py-3 px-3 chat-outside-container"
                style={
                  allList
                    ? {
                        maxHeight: "62vh",
                        overflowY: "auto",
                        overflowX: "hidden",
                      }
                    : null
                }
              >
                <div
                  className="d-flex"
                  style={{
                    position: "relative",
                  }}
                >
                  <small style={{ fontSize: "25px" }}>Messaging</small>
                  <button
                    className="btn btn-primary btn-sm"
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "2px",
                      fontSize: "14px",
                    }}
                    onClick={() => {
                      setallList(!allList);
                      props.searchUser(searchValue);
                    }}
                  >
                    <i className="fas fa-plus-circle"></i>
                  </button>
                  <hr />
                </div>
                <div
                  className="flex-horizontal mt-2"
                  style={{ position: "relative" }}
                >
                  <input
                    type="text"
                    placeholder="Search Messages..."
                    className="input-group px-3 chat-search"
                    onChange={handleChange}
                    value={searchValue}
                  />
                  <hr />
                </div>
                {allList ? (
                  props.student && Students.length > 0 ? (
                    <div>
                      <p
                        className="my-2 font-weight-bold justify-content-center d-flex"
                        style={{ fontSize: "20px" }}
                      >
                        Students
                      </p>
                      {Students.map((keyName, keyIndex) => {
                        return (
                          <IndividualConversation
                            key={keyIndex}
                            onClick={() =>
                              initiateMessage(
                                props.student[keyName],
                                props.history,
                              )
                            }
                            data={props.student[keyName]}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    "No Student"
                  )
                ) : (
                  <ChannelList
                    unreadMessageList={props.unreadMessageList}
                    teacher={props.allteacher}
                    student={props.allstudent}
                    showChannels={props.allChannels}
                  />
                )}

                {allList ? (
                  props.teacher && Teachers.length > 0 ? (
                    <div>
                      <p
                        className="my-2 font-weight-bold justify-content-center d-flex"
                        style={{ fontSize: "20px" }}
                      >
                        Teachers
                      </p>
                      {Teachers.map((keyName, keyIndex) => {
                        return (
                          <IndividualConversation
                            onClick={() =>
                              initiateMessage(
                                props.teacher[keyName],
                                props.history,
                              )
                            }
                            key={keyIndex}
                            data={props.teacher[keyName]}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    "No Teacher"
                  )
                ) : (
                  ""
                )}
              </div>
              {/* {allList ? (
                <ReactPaginate
                  pageCount={pageCount}
                  onPageChange={paginate}
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
              ) : null} */}
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }
  return render;
};

export default Chat;
