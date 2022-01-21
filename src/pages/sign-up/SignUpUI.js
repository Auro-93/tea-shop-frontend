import React from "react";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";
import "../../helpers/common-style/auth-style.css";
import "./style.css";
import Alert from "../../helpers/alert/Alert";
import { Loading } from "../../components/index";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";

const SignUpUI = ({
  signupData,
  handleChange,
  handleSubmit,
  handlePwdVisibility,
  isVisible,
}) => {
  const {
    username,
    email,
    password1,
    password2,
    successMessage,
    errorMessage,
    loading,
  } = signupData;

  return (
    <div className="container-fluid p-0 m-0">
      <div className="row p-0 m-0 signup-page-container-bg">
        <div className="signup-layout-column1 auth-layout-column1 p-0 col-12 col-xl-6 min-vh-100 d-flex justify-content-center align-items-center">
          <div className="signup-form-container auth-form-container container m-0 p-0 col-12 col-sm-10 col-md-11 col-lg-10 col-xxl-7">
            <h1 className="signup-title auth-title text-center py-4">
              {" "}
              SIGN UP
            </h1>

            <form
              className="form py-2 px-3 px-sm-5 mt-4"
              onSubmit={handleSubmit}
            >
              {errorMessage && (
                <Alert alertType="alert-danger" message={errorMessage} />
              )}
              {successMessage && (
                <Alert alertType="alert-success" message={successMessage} />
              )}

              <div className="form-group mt-4">
                <label
                  htmlFor="username"
                  className="signup-label auth-label mb-2"
                >
                  Username
                </label>

                <input
                  type="text"
                  value={username}
                  name="username"
                  onChange={handleChange}
                  className="signup-input form-control mb-3"
                  id="username"
                  aria-describedby="usernameHelp"
                  placeholder="Username"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="signup-label auth-label mb-2">
                  Email address
                </label>

                <input
                  type="email"
                  value={email}
                  name="email"
                  onChange={handleChange}
                  className="signup-input form-control mb-3"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                />
              </div>
              <div className="form-group auth-custom-input ">
                <label
                  htmlFor="password1"
                  className="signup-label auth-label mb-2"
                >
                  Password
                </label>

                <input
                  type={isVisible ? "text" : "password"}
                  value={password1}
                  name="password1"
                  onChange={handleChange}
                  className="signup-input form-control mb-3"
                  id="password1"
                  placeholder="Password"
                />
                {isVisible ? (
                  <i
                    onClick={handlePwdVisibility}
                    id="pwd1"
                    className="pwd-visibility fas fa-eye"
                  ></i>
                ) : (
                  <i
                    onClick={handlePwdVisibility}
                    className=" pwd-visibility fas fa-eye-slash"
                  ></i>
                )}
              </div>
              <div className="form-group auth-custom-input ">
                <label
                  htmlFor="password2"
                  className="signup-label auth-label mb-2"
                >
                  Confirm password
                </label>

                <input
                  type={isVisible ? "text" : "password"}
                  value={password2}
                  name="password2"
                  onChange={handleChange}
                  className="signup-input form-control mb-3"
                  id="password2"
                  placeholder="Password"
                />
                {isVisible ? (
                  <i
                    id="pwd2"
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
                  className="signup-secondary-button1 custom-button btn mt-4 flex-fill"
                >
                  Sign-Up
                </button>
                <GoogleLogin
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="signup-secondary-button2 custom-button btn mt-4 flex-fill google-login"
                    >
                      <i className="fab fa-google mx-2"></i>Login with Google
                    </button>
                  )}
                  clientId="203822999175-ic2e949ccriqa983otoa5949dodi7iif.apps.googleusercontent.com"
                  buttonText="Login with Google"
                  cookiePolicy={"single_host_origin"}
                />
              </div>

              <p className="text-center mt-5">
                Already have an account?
                <Link
                  className="signup-form-switch-link auth-form-switch-link pb-2"
                  to="/sign-in"
                >
                  Sign In
                </Link>
              </p>

              <div className="signup-back-to-home auth-back-to-home text-center">
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
        <div className="signup-layout-column2 auth-layout-column2 col-12 col-xl-6 min-vh-100 d-none d-xl-flex justify-content-center align-items-center">
          <div className="signup-back-to-home auth-back-to-home d-flex">
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

export default SignUpUI;
