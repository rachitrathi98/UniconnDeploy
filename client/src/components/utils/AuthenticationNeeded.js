import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./LoadingSign";
// import Loading from "../components/utils/LoadingSign";

// This is a fallback page which will be shown if the user redirects to an invalid URL.
export default function AuthenticationNeeded() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);
  if (loading) return <Loading />;
  else
    return (
      <div className="container" style={{ position: "relative" }}>
        <div
          id="errorCard"
          className="card text-center border-0"
          style={{ position: "fixed", top: "20vh", left: "20vw" }}
        >
          <div className="card-body">
            <h4 className="mb-4">You Are Not Authenticated.</h4>
            <h3 className="mb-4">Please Login To View This Page!</h3>
            <Link className="btn btn-outline-primary" to="/">
              Home Page
            </Link>
          </div>
        </div>
      </div>
    );
}
