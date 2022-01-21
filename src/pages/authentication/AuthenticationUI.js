import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const AuthenticationUI = ({ confirmAccountData }) => {
  const { username, successMessage, errorMessage } = confirmAccountData;

  return (
    <div className="d-flex justify-content-center align-items-center vw-100 vh-100 confirm-account-bg">
      <div className="text-center confirm-account-container">
        {successMessage && <h1>WELCOME {`${username.toUpperCase()}!`}</h1>}
        {errorMessage && <h1>ACCOUNT CONFIRMATION ERROR</h1>}
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
        {successMessage && (
          <Link
            to="/sign-in"
            className="px-4 py-2 btn custom-button outline-primary2-button"
          >
            Sign-in
          </Link>
        )}
        {errorMessage === "Incorrect or expired link" && (
          <Link
            to="/sign-up"
            className="px-4 py-2 btn custom-button outline-primary2-button"
          >
            Sign-up
          </Link>
        )}
        <div className="auth-back-to-home text-center confirm-account-back-to-home">
          <Link to="/">
            <p>
              Back to{" "}
              <span>
                <span>Tea</span> Store
              </span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationUI;
