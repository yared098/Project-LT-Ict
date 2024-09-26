import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ErrorElement = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white overflow-hidden" style={{ height: "100vh" }}>
      <div className="container-fluid d-flex align-items-center justify-content-center h-100 px-3 py-5">
        <div>
          <p className="text-sm text-danger">500 Internal Server Error</p>
          <h1 className="mt-3 h3 font-weight-bold text-dark">Oops!</h1>
          <p className="mt-4 text-muted">
            Something went wrong. Please try again later.
          </p>

          <div className="d-flex align-items-center mt-4 gap-2">
            <Link
              to={navigate(-1)}
              className="d-flex align-items-center justify-content-center w-50 btn btn-outline-secondary"
            >
              <span className="ml-2">Go back</span>
            </Link>

            <Link to="/dashboard" className="w-50 btn btn-primary">
              Take me home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorElement;
