import React, { Fragment, useState } from "react";
import Mitesh from "../assets/images/Mitesh.jpg";
import Krishna from "../assets/images/Krishna.jpg";
import Soham from "../assets/images/Soham.jpg";
import Aashay from "../assets/images/Aashay.jpeg";
import Header from "../container/layout/Header";
import Footer from "../container/layout/Footer";
import Amogh from "../assets/images/Amogh.jpg";
import Anshul from "../assets/images/Anshul.jpeg";
import Param from "../assets/images/Param.jpeg";
import Arka from "../assets/images/Arka.jpg";
import Rachit from "../assets/images/Rachit.jpeg";
import Third from "../assets/images/Third.png";
import { Link } from "react-router-dom";
import HomeReadMore from "./utils/HomeReadMore";
import { isAuth } from "../utils/helper";

const Home = (props) => {
  const linkStyles = {
    backgroundColor: "#0186FE",
    color: "white",
  };
  const specialThanks = {
    marginBottom: "0",
  };
  const pStyles = { fontSize: "2.5em" };
  let longText1 =
    "UniConn is trying to solve a two fold problem that are faced today by every college in India - Communication & Information.";
  longText1 +=
    " The aim of this website is to better the communication between teachers and students, increase ease of information in colleges while also solving a few other challenges along the way.";
  longText1 +=
    " We spoke to multiple teachers as well as students to understand what exactly is wrong in the current system.";
  longText1 +=
    " The answer we came up with was simple - Visibility; Most students and teachers know what or whom they are looking for but just don't know where to look.";
  longText1 +=
    " For Teachers - we are a “Teacher Branding Website”. Colleges should be known for the kind of teachers they have and not placements they get the students. ";
  longText1 +=
    ' For Students - we are a "Collaboration website". Every problem, issue, query, idea or project a student can think of can surely be addressed by a peer of his/her, they just need help in finding the right person. ';

  let longText2 =
    " Imagine you are interested in a particular field while in college and want to do a project. You want to find a faculty, a fellow student, or even somebody from another college, but don't know where to start looking.";
  longText2 +=
    " Imagine you just entered engineering and have no idea what's going on. It's a new campus, new city, new people, new everything and you don’t know whom to ask simple questions which will make your life simpler.";
  longText2 +=
    " Imagine you have entered the third year and need to choose a mentor for your project. You have to find a mentor by the end of the week and have no idea which teacher has the required expertise. ";
  longText2 +=
    " Imagine you are the head of a college committee and want to spread the word about an upcoming event. Getting participants from other colleges is difficult, social media pages don't do the trick, you need a place where people themselves come to look for such events.";
  longText2 +=
    " Most of us faced situations like these while our time in engineering. If you haven't yet, there's a good chance you will.";
  longText2 +=
    " UniConn is trying to solve all these problems, we just need your support.";

  const [topButton, setTopButton] = useState(true);
  const [bottomButton, setBottomButton] = useState(false);
  const topHandleClick = () => {
    setTopButton(false);
    setBottomButton(true);
  };

  const bottomHandleClick = () => {
    setBottomButton(false);
    setTopButton(true);
  };

  return (
    <Fragment>
      <Header props={props} />
      <div className="mainLayout py-5">
        <div className="jumbotron container bg-white div-jumbotron">
          <p style={pStyles} className="ml-3 text-center d-none d-lg-block">
            Explore | Connect | Collaborate
          </p>
          <h3 className="text-center d-block d-lg-none">
            <p>Explore</p>
            <hr />
            <p>Connect</p>
            <hr />
            <p>Collaborate</p>
          </h3>
          <div className="row mt-5">
            <div className="col-12">
              <Link
                className="btn btn-large py-4"
                to="/teachers"
                style={{
                  backgroundColor: "#0186FE",
                  color: "white",
                }}
              >
                Find A{" "}
                <h2 className="font-weight-bold d-none d-lg-block">Teacher</h2>
                <p className="font-weight-bold d-block d-lg-none">Teacher</p>
              </Link>
              <div className="col-12 d-none d-lg-flex justify-content-center mt-3 text-white">
                <strong>OR</strong>
              </div>
            </div>
          </div>

          {isAuth() ? (
            <Link
              className="btn btn-large py-4"
              to="/students"
              style={{
                backgroundColor: "#0186FE",
                color: "white",
              }}
            >
              Find A{" "}
              <h2 className="font-weight-bold d-none d-lg-block">Student</h2>
              <p className="font-weight-bold d-block d-lg-none">Student</p>
            </Link>
          ) : (
            <div className="row">
              <div className="col-12 col-md-5">
                <button
                  className="btn btn-large py-4 button-teacher-student"
                  style={linkStyles}
                  onClick={() => {
                    process.env.NODE_ENV !== "production"
                      ? (window.location.href = `http://localhost:${process.env.PORT}/api/auth/login-student`)
                      : (window.location.href = "/api/auth/login-student");
                  }}
                >
                  <h2 className="d-none d-lg-block font-weight-bold">Login</h2>
                  <p className="d-block d-lg-none font-weight-bold">Login</p>
                  <p className="d-none d-lg-block">As Student</p>
                  <small className="d-block d-lg-none">As Student</small>
                </button>
              </div>
              <div className="col-12 col-md-5 button-student">
                <button
                  className="btn btn-large py-4 button-teacher-student"
                  style={linkStyles}
                  onClick={() => {
                    process.env.NODE_ENV !== "production"
                      ? (window.location.href = `http://localhost:${process.env.PORT}/api/auth/login-teacher`)
                      : (window.location.href = "/api/auth/login-teacher");
                  }}
                >
                  <h2 className="d-none d-lg-block font-weight-bold">Login</h2>
                  <p className="d-block d-lg-none font-weight-bold">Login</p>
                  <p className="d-none d-lg-block">As Teacher</p>
                  <small className="d-block d-lg-none">As Teacher</small>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="container mb-5">
          <div className="text-center mr-lg-0 font-weight-bold">
            <div>
              <h3 className="my-5 font-weight-bold">Teachers Of The Month</h3>
            </div>
            <div>
              <h3>COMING SOON!</h3>
            </div>
          </div>
        </div>

        <div className="container">
          <div
            className="row bg-white py-5 my-3"
            style={{ borderRadius: "40px" }}
          >
            <div className="col-lg-6 iframe-container">
              <iframe
                id="youtube-video"
                src="https://www.youtube.com/embed/duZBgRiRM4o"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="col-lg-6 text-center text-lg-left">
              <h3 className="font-weight-bold mt-4 mt-lg-2 mb-lg-3">
                UniConn - University Connect
              </h3>
              <p className="pr-4 mb-5 mb-lg-0">
                <HomeReadMore
                  className="read-more-content"
                  limit={250}
                  value={longText1}
                  firstPara={true}
                />
              </p>
            </div>
          </div>
        </div>

        <div className="container">
          <div
            className="row bg-white py-5 my-3"
            style={{ borderRadius: "40px" }}
          >
            <div className="col-lg-6 text-center text-lg-left">
              <h3 className="font-weight-bold mt-4 mt-lg-2 mb-lg-3">
                Why UniConn?
              </h3>
              <p>
                <HomeReadMore
                  className="read-more-content"
                  limit={250}
                  value={longText2}
                  firstPara={false}
                />
              </p>
            </div>
            <div className="col-lg-6 d-flex align-items-center">
              <img alt={"Read"} src={Third} style={{ width: "90%" }} />
            </div>
          </div>
        </div>

        <div className="container pt-1" id="team">
          <div className="text-center">
            <div className="my-5">
              <h3 className="font-weight-bold">Team</h3>
              <p>
                We are a group of engineering passouts trying to solve a few
                problems that we faced during our 4 years in college.
              </p>
            </div>

            <div className="row mt-4">
              <div className="col-6 col-lg-3">
                <img
                  alt="fallback"
                  src={Soham}
                  className="rounded-circle team"
                />
                <p className="names mt-2 font-weight-bold">Soham Jagtap</p>
              </div>
              <div className="col-6 col-lg-3">
                <img
                  alt="fallback"
                  src={Mitesh}
                  className="rounded-circle team"
                />
                <p className="names mt-2 font-weight-bold">Mitesh Sarode</p>
              </div>
              <div className="col-6 col-lg-3">
                <img
                  alt="fallback"
                  src={Aashay}
                  className="rounded-circle team"
                />
                <p className="names mt-2 font-weight-bold">Aashay Phirke</p>
              </div>
              <div className="col-6 col-lg-3">
                <img
                  alt="fallback"
                  src={Krishna}
                  className="rounded-circle team"
                />
                <p className="names mt-2 font-weight-bold">Krishna Mehta</p>
              </div>
            </div>

            {topButton && (
              <button
                className="btn btn-outline-primary w-50"
                onClick={topHandleClick}
              >
                See more
              </button>
            )}
            {bottomButton && (
              <Fragment>
                <div className="row row-cols-2 row-cols-lg-5 mt-4">
                  <div className="col">
                    <img
                      alt="fallback"
                      src={Amogh}
                      className="rounded-circle team"
                    />
                    <p className="names mt-2 font-weight-bold">Amogh Godbole</p>
                  </div>
                  <div className="col">
                    <img
                      alt="fallback"
                      src={Rachit}
                      className="rounded-circle team"
                    />
                    <p className="names mt-2 font-weight-bold">Rachit Rathi</p>
                  </div>
                  <div className="col">
                    <img
                      alt="fallback"
                      src={Param}
                      className="rounded-circle team"
                    />
                    <p className="names mt-2 font-weight-bold">Param Patil</p>
                  </div>
                  <div className="col">
                    <img
                      alt="fallback"
                      src={Arka}
                      className="rounded-circle team"
                    />
                    <p className="names mt-2 font-weight-bold">Arka Haldi</p>
                  </div>
                  <div className="col">
                    <img
                      alt="fallback"
                      src={Anshul}
                      className="rounded-circle team"
                    />
                    <p className="names mt-2 font-weight-bold">Anshul Laikar</p>
                  </div>
                </div>
                <h3 className="font-weight-bold mt-2 mb-3">Special Thanks</h3>
                <p style={specialThanks}>Dr. B. N. Chaudhari</p>
                <p style={specialThanks}>Dr. Reena Sonkusare</p>
                <p style={specialThanks}>Prof. Pallavi Malame</p>
                <p style={specialThanks}>Dr. Sukanya Kulkarni</p>
                <p style={specialThanks}>Mr. Neel Shah</p>
                <p style={specialThanks} className="mb-4">
                  Ms. Richa Agrawal
                </p>
                <button
                  className="btn btn-outline-primary w-50"
                  onClick={bottomHandleClick}
                >
                  See Less
                </button>
              </Fragment>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Home;
