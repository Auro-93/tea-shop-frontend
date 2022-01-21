import React from "react";
import { Link } from "react-router-dom";
import "../../helpers/common-style/auth-style.css";
import "../forgot-password/style.css";
import Alert from "../../helpers/alert/Alert";
import { Loading } from "../../components";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";

const ResetPasswordUI = ({
  resetPwdData,
  handleChange,
  handleSubmit,
  handlePwdVisibility,
  isVisible,
}) => {
  const { password, successMessage, errorMessage, loading } = resetPwdData;

  return (
    <div className="container-fluid p-0 m-0">
      <div className="row p-0 m-0 resetpassword-page-container-bg">
        <div className="resetpassword-layout-column1 auth-layout-column1 p-0 col-12 col-xl-6 min-vh-100 d-flex justify-content-center align-items-center">
          <div className="resetpassword-form-container auth-form-container container m-0 p-0 col-12 col-sm-10 col-md-11 col-lg-10 col-xxl-7">
            <h1 className="resetpassword-title auth-title text-center py-4">
              RESET PASSWORD
            </h1>

            <form className="form p-3 p-sm-5 mt-4" onSubmit={handleSubmit}>
              {errorMessage && (
                <Alert alertType="alert-danger" message={errorMessage} />
              )}
              {successMessage && (
                <Alert alertType="alert-success" message={successMessage} />
              )}

              <div className="form-group auth-custom-input mt-4">
                <label
                  htmlFor="password"
                  className="resetpassword-label auth-label mb-2"
                >
                  Password
                </label>

                <input
                  name="password"
                  value={password}
                  onChange={handleChange}
                  type={isVisible ? "text" : "password"}
                  className="resetpassword-input form-control mb-3"
                  id="password"
                  aria-describedby="passwordHelp"
                  placeholder="Password"
                />
                {isVisible ? (
                  <i
                    onClick={handlePwdVisibility}
                    className="pwd-visibility fas fa-eye"
                  ></i>
                ) : (
                  <i
                    onClick={handlePwdVisibility}
                    className=" pwd-visibility fas fa-eye-slash"
                  ></i>
                )}
              </div>

              <div className="button-group d-flex justify-content-between align-center flex-wrap">
                <button
                  type="submit"
                  className="resetpassword-yellow-button custom-button btn mt-4 flex-fill"
                >
                  Reset Password
                </button>
              </div>

              <p className="text-center mt-5">
                Don't have an account?
                <Link
                  className="resetpassword-form-switch-link auth-form-switch-link pb-2"
                  to="/sign-up"
                >
                  Sign-up
                </Link>
              </p>
              <p className="text-center mt-4">
                Already have an account?
                <Link
                  className="resetpassword-form-switch-link auth-form-switch-link pb-2"
                  to="/sign-in"
                >
                  Sign-in
                </Link>
              </p>

              <div className="resetpassword-back-to-home auth-back-to-home text-center">
                <Link to="/">
                  <p>
                    Back to{" "}
                    <span>
                      <span>Tea</span> Store
                    </span>
                  </p>
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="resetpassword-layout-column2 auth-layout-column2 col-12 col-xl-6 min-vh-100 d-none d-xl-flex justify-content-center align-items-center">
          <div className="resetpassword-back-to-home auth-back-to-home d-flex">
            <Logo className="logo-svg logo-svg-l" />
            <Link to="/">
              <p>
                Back to{" "}
                <span>
                  <span>Tea</span> Store
                </span>
              </p>
            </Link>
            <Logo className="logo-svg logo-svg-r" />
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default ResetPasswordUI;
