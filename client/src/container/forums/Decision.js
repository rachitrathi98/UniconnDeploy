import React from "react";
import { Link } from "react-router-dom";
import { isAuth } from "../../utils/helper";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import BottomNav from "../layout/BottomNav";

export default function Decision() {
  return (
    <div>
      <Header />
      <div className="container-modified">
        <div className="row mt-2">
          <div className="col-lg-3 sidebar">{isAuth() && <Sidebar />}</div>
          <div className="col-lg-6">
            <div id="private-forum" className="my-5 decision-forum">
              <h4 className="text-lg-center forum-h4">
                <strong>Private Forum</strong> |{" "}
                {isAuth().collegeId && isAuth().collegeId.name}
              </h4>
              <p>
                Ask questions on any topic specific to your college and get
                replies from your peers. Answer queries raised by your peers to
                help them as well as anybody else who might face the same issue.
                Have healthy discussions and debates and promote your
                committees, clubs, competitions, fests etc
                <br />
                <br />
                <strong>NOTE</strong>: This forum is only for your university
                and won't be visible to anybody from the outside.
              </p>
              <div className="visit-button">
                <Link
                  to="/privateforum"
                  className="btn btn-outline-primary px-5"
                >
                  Open
                </Link>
              </div>
            </div>
            <div id="public-forum" className="my-5 decision-forum">
              <h4 className="text-lg-center forum-h4">
                <strong>Public Forum</strong>
              </h4>
              <p>
                Ask questions on any topic to everybody on UniConn. Get replies
                and have healthy discussions and debates. Promote your college
                fests, competitions, movements and also search for them basis
                college, geography etc
                <br />
                <br />
                <strong>NOTE</strong>: This forum is visible to everyone on
                UniConn.
              </p>
              <div className="visit-button">
                <Link
                  to="/publicforum"
                  className="btn btn-outline-primary px-5"
                >
                  Under Development
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
