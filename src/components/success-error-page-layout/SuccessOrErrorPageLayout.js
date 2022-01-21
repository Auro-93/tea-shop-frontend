import React from "react";
import { Link } from "react-router-dom";

const SuccessOrErrorPageLayout = ({ successMessage, errorMessage }) => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 confirm-account-bg">
      <div className="text-center confirm-account-container">
        {successMessage && <h1>ORDER SUCCESSFULLY COMPLETED!</h1>}
        {errorMessage && <h1>ORDER OPERATION FAILED</h1>}
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
        {!successMessage && !errorMessage && <h1>SESSION EXPIRED</h1>}
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

export default SuccessOrErrorPageLayout;
