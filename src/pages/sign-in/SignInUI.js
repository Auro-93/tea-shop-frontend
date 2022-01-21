import React from "react";
import dotenv from "dotenv";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";
import "../../helpers/common-style/auth-style.css";
import "./style.css";
import Alert from "../../helpers/alert/Alert";
import { Loading } from "../../components";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";

const SignInUI = ({
  signinData,
  handleChange,
  handleSubmit,
  responseSuccessGoogle,
  responseErrorGoogle,
  handlePwdVisibility,
  isVisible,
}) => {
  const { email, password, errorMessage, successMessage, loading } = signinData;

  //DOTENV CONFIG
  dotenv.config();
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  return (
    <div className="container-fluid p-0 m-0">
      <div className="row p-0 m-0 signin-page-container-bg">
        <div className="signin-layout-column1 auth-layout-column1 p-0 col-12 col-xl-6 min-vh-100 d-flex justify-content-center align-items-center">
          <div className="signin-form-container auth-form-container container m-0 p-0 col-12 col-sm-10 col-md-11 col-lg-10 col-xxl-7">
            <h1 className="signin-title auth-title text-center py-4">
              {" "}
              SIGN IN
            </h1>

            <form className="form p-3 p-sm-5 mt-4" onSubmit={handleSubmit}>
              {errorMessage && (
                <Alert alertType="alert-danger" message={errorMessage} />
              )}
              {successMessage && (
                <Alert alertType="alert-success" message={successMessage} />
              )}

              <div className="form-group mt-4">
                <label htmlFor="email" className="signin-label auth-label mb-2">
                  Email address
                </label>

                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className="signin-input form-control mb-3"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                />
              </div>
              <div className="form-group auth-custom-input ">
                <label
                  htmlFor="password"
                  className="signin-label auth-label mb-2"
                >
                  Password
                </label>

                <input
                  type={isVisible ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleChange}
                  className="signin-input form-control mb-3"
                  id="password"
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
                  className="signin-outline-primary-button custom-button btn mt-4 flex-fill"
                >
                  Sign-In
                </button>

                <GoogleLogin
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="signin-primary-button custom-button btn mt-4 flex-fill google-login"
                    >
                      <i className="fab fa-google mx-2"></i>Login with Google
                    </button>
                  )}
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  buttonText="Login with Google"
                  onSuccess={responseSuccessGoogle}
                  onFailure={responseErrorGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>

              <p className="text-center mt-5">
                Don't have an account?
                <Link
                  className="signin-form-switch-link auth-form-switch-link pb-2"
                  to="/sign-up"
                >
                  Sign-up
                </Link>
              </p>
              <p className="text-center mt-4">
                Forgot your password?
                <Link
                  className="signin-form-switch-link auth-form-switch-link pb-2"
                  to="/user/password/forgot-password"
                >
                  Reset Password
                </Link>
              </p>

              <div className="signin-back-to-home auth-back-to-home text-center">
                <Link to="/">
                  {" "}
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
        <div className="signin-layout-column2 auth-layout-column2 col-12 col-xl-6 min-vh-100 d-none d-xl-flex justify-content-center align-items-center">
          <div className="signin-back-to-home auth-back-to-home d-flex">
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

export default SignInUI;
