import React, { useState } from "react";
import validator from "validator";
import "../style.css";
import { isAuthenticated } from "../../../helpers/storage&cookies/storage&cookies";
import Alert from "../../../helpers/alert/Alert";
import { getUserByEmail } from "../../../api/auth";
import { Button } from "../../../components/index.js";

const PersonalData = ({ userInfo, guestInfo, setStepIndex }) => {
  const [guestPersonalData, setGuestPersonalData] = guestInfo;
  const [userPersonalData, setUserPersonalData] = userInfo;

  const [isVisible, setIsVisible] = useState(false);

  const handlePwdVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleChange = (e) => {
    if (!isAuthenticated()) {
      setGuestPersonalData({
        ...guestPersonalData,
        [e.target.name]: e.target.value,
        errorMessage: "",
        stepComplete: false,
      });
    } else if (isAuthenticated().role === 0) {
      setUserPersonalData({
        ...userPersonalData,
        [e.target.name]: e.target.value,
        errorMessage: "",
        stepComplete: false,
      });
    }
  };

  const handleProceedToNextStep = async (e) => {
    e.preventDefault();
    if (isAuthenticated().role === 0) {
      if (
        !userPersonalData.name ||
        !userPersonalData.lastName ||
        !userPersonalData.telephone
      ) {
        setUserPersonalData({
          ...userPersonalData,
          errorMessage: "All fields are required",
          stepComplete: false,
        });
      } else {
        setUserPersonalData({
          ...userPersonalData,
          stepComplete: true,
          date: new Date(),
        });

        setStepIndex(2);
      }
    } else if (!isAuthenticated()) {
      let data = { email: guestPersonalData.customerEmail.trim() };

      if (
        !guestPersonalData.name ||
        !guestPersonalData.lastName ||
        !guestPersonalData.customerEmail ||
        !guestPersonalData.customerUsername ||
        !guestPersonalData.customerPassword1 ||
        !guestPersonalData.customerPassword2 ||
        !guestPersonalData.telephone
      ) {
        setGuestPersonalData({
          ...guestPersonalData,
          errorMessage: "All fields are required",
          stepComplete: false,
        });
      } else if (!validator.isEmail(guestPersonalData.customerEmail)) {
        setGuestPersonalData({
          ...guestPersonalData,
          errorMessage: "Invalid email",
          stepComplete: false,
        });
      } else if (
        !validator.isLength(guestPersonalData.customerPassword1, { min: 6 })
      ) {
        setGuestPersonalData({
          ...guestPersonalData,
          errorMessage: "Password must be at least 6 characters",
          stepComplete: false,
        });
      } else if (
        !validator.equals(
          guestPersonalData.customerPassword1,
          guestPersonalData.customerPassword2
        )
      ) {
        setGuestPersonalData({
          ...guestPersonalData,
          errorMessage: "Passwords don't match",
          stepComplete: false,
        });
      } else {
        getUserByEmail(data)
          .then((response) => {
            setGuestPersonalData({
              ...guestPersonalData,
              stepComplete: true,
              date: new Date(),
            });

            setStepIndex(2);
          })
          .catch((error) => {
            if (error.response.status === 409) {
              setGuestPersonalData({
                ...guestPersonalData,
                errorMessage: "This email already exists",
                stepComplete: false,
              });
            } else {
              console.log(error);
            }
          });
      }
    }
  };

  return (
    <form>
      {!isAuthenticated() && (
        <Alert
          alertType="alert-secondary"
          message="Checkout automatically create an account for you"
        />
      )}
      {!isAuthenticated() && guestPersonalData.errorMessage && (
        <Alert
          alertType="alert-danger"
          message={guestPersonalData.errorMessage}
        />
      )}
      {isAuthenticated().role === 0 && userPersonalData.errorMessage && (
        <Alert
          alertType="alert-danger"
          message={userPersonalData.errorMessage}
        />
      )}

      <div className="form-group">
        <label htmlFor="name" className=" auth-label mb-2">
          Name*:
        </label>

        <input
          onChange={handleChange}
          value={
            !isAuthenticated() ? guestPersonalData.name : userPersonalData.name
          }
          type="text"
          name="name"
          className="checkout-input form-control mb-3"
          id="name"
          placeholder="Name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName" className=" auth-label mb-2">
          Last Name*:
        </label>

        <input
          onChange={handleChange}
          value={
            !isAuthenticated()
              ? guestPersonalData.lastName
              : userPersonalData.lastName
          }
          type="text"
          name="lastName"
          className="checkout-input form-control mb-3"
          id="lastName"
          placeholder="Last Name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="telephone" className=" auth-label mb-2">
          Telephone*:
        </label>

        <input
          onChange={handleChange}
          value={
            !isAuthenticated()
              ? guestPersonalData.telephone
              : userPersonalData.telephone
          }
          type="number"
          name="telephone"
          className="checkout-input form-control mb-3"
          id="telephone"
          placeholder="Telephone Number"
        />
      </div>

      {!isAuthenticated() && (
        <>
          <div className="form-group">
            <label htmlFor="customerUsername" className="auth-label mb-2">
              Username*:
            </label>

            <input
              onChange={handleChange}
              value={guestPersonalData.customerUsername}
              type="text"
              name="customerUsername"
              className="checkout-input form-control mb-3"
              id="customerUsername"
              placeholder="Username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="customerEmail" className="auth-label mb-2">
              Email*:
            </label>

            <input
              onChange={handleChange}
              value={guestPersonalData.customerEmail}
              type="email"
              name="customerEmail"
              className="checkout-input form-control mb-3"
              id="customerEmail"
              placeholder="Email"
            />
          </div>
          <div className="form-group auth-custom-input ">
            <label htmlFor="customerPassword1" className="auth-label mb-2">
              Password*:
            </label>

            <input
              onChange={handleChange}
              value={guestPersonalData.customerPassword1}
              type={isVisible ? "text" : "password"}
              name="customerPassword1"
              className="checkout-input form-control mb-3"
              id="customerPassword1"
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
          <div className="form-group auth-custom-input ">
            <label htmlFor="customerPassword2" className="auth-label mb-2">
              Confirm password*:
            </label>

            <input
              onChange={handleChange}
              value={guestPersonalData.customerPassword2}
              type={isVisible ? "text" : "password"}
              name="customerPassword2"
              className="checkout-input form-control mb-3"
              id="customerPassword2"
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
        </>
      )}
      <Button
        handleClick={handleProceedToNextStep}
        classes="mt-4 w-100 p-3 btn custom-button standard-secondary-button"
        text="Next"
      />
    </form>
  );
};

export default PersonalData;
