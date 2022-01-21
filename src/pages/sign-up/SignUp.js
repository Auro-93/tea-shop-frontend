import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import validator from "validator";
import SignUpUI from "./SignUpUI";
import { signup } from "../../api/auth";

const SignUp = () => {
  let history = useHistory();

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
    successMessage: "",
    errorMessage: "",
    loading: false,
  });

  const {
    username,
    email,
    password1,
    password2,
    successMessage,
    errorMessage,
    loading,
  } = signupData;

  const [isVisible, setIsVisible] = useState(false);

  const handlePwdVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
      successMessage: "",
      errorMessage: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //API POST LOGIC

    if (!username || !email || !password1 || !password2) {
      setSignupData({
        ...signupData,
        errorMessage: "All fields are required",
      });
    } else if (!validator.isEmail(email)) {
      setSignupData({
        ...signupData,
        errorMessage: "Invalid email",
      });
    } else if (!validator.isLength(password1, { min: 6 })) {
      setSignupData({
        ...signupData,
        errorMessage: "Password must be at least 6 characters",
      });
    } else if (!validator.equals(password1, password2)) {
      setSignupData({
        ...signupData,
        errorMessage: "Passwords don't match",
      });
    } else {
      const data = { username, email, password1, password2 };

      setSignupData({
        ...signupData,
        loading: true,
      });

      signup(data)
        .then((response) => {
          setSignupData({
            username: "",
            email: "",
            password1: "",
            password2: "",
            errorMessage: "",
            successMessage: response.data.successMessage,
            loading: false,
          });

          setTimeout(() => {
            history.push("/");
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 409) {
            setSignupData({
              ...signupData,
              errorMessage: "User already exists",
              loading: false,
            });
          } else {
            setSignupData({
              ...signupData,
              errorMessage: error.toString(),
              loading: false,
            });
          }
        });
    }
  };

  return (
    <SignUpUI
      signupData={signupData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handlePwdVisibility={handlePwdVisibility}
      isVisible={isVisible}
    />
  );
};

export default SignUp;
