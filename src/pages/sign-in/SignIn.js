import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import validator from "validator";
import SignInUI from "./SignInUI";
import { signin, googleLogin } from "../../api/auth";
import {
  setAuth,
  isAuthenticated,
  setLocalStorage,
} from "../../helpers/storage&cookies/storage&cookies.js";
import { AuthContext } from "../../helpers/contexts/AuthContext.js";

const SignIn = () => {
  const { auth, user } = useContext(AuthContext);
  const [isAuth, setIsAuth] = auth;
  const [profileData, setProfileData] = user;

  const [isMounted, setIsMounted] = useState(false);

  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
    successMessage: "",
    errorMessage: "",
    loading: false,
  });

  const { email, password, errorMessage, successMessage, loading } = signinData;

  const [isVisible, setIsVisible] = useState(false);

  const handlePwdVisibility = () => {
    setIsVisible(!isVisible);
  };

  let history = useHistory();

  const responseSuccessGoogle = (response) => {
    if (isMounted) {
      const token = response.tokenId;
      const data = { token };

      setSigninData({
        ...signinData,
        loading: true,
      });

      googleLogin(data)
        .then((response) => {
          setSigninData({
            ...signinData,
            successMessage: response.data.successMessage,
            errorMessage: "",
            loading: false,
          });

          setAuth(response.data.token, response.data.user);

          if (isAuthenticated()) {
            setIsAuth(true);
            setProfileData({
              username: isAuthenticated().username,
              firstName: isAuthenticated().firstName,
              lastName: isAuthenticated().lastName,
              email: isAuthenticated().email,
              image: isAuthenticated().userImage || "",
              role: isAuthenticated().role,
            });
          }
          setSigninData({
            ...signinData,
            loading: true,
          });
          setTimeout(() => {
            setSigninData({
              ...signinData,
              loading: false,
            });
            history.push("/");
            window.location.reload();
          }, 1500);
        })
        .catch((error) => console.log(error));
    }
  };

  const responseErrorGoogle = (response) => {
    if (isMounted) {
      if (response.status === 400) {
        setSigninData({
          ...signinData,
          errorMessage: "Invalid credentials",
          loading: false,
        });
      } else if (response.error === "popup_closed_by_user") {
        console.log(response);
      } else {
        alert(response.error);
        setSigninData({
          ...signinData,
          errorMessage: "Something went wrong. Please, try again",
          loading: false,
        });
      }
    }
  };

  const handleChange = (e) => {
    setSigninData({
      ...signinData,
      [e.target.name]: e.target.value,
      errorMessage: "",
    });
  };

  const handleSubmit = (e) => {
    if (isMounted) {
      e.preventDefault();

      //API POST LOGIC

      if (!email || !password) {
        setSigninData({
          ...signinData,
          errorMessage: "All fields are required",
        });
      } else if (!validator.isEmail(email)) {
        setSigninData({
          ...signinData,
          errorMessage: "Invalid email",
        });
      } else {
        const data = { email, password };

        setSigninData({
          ...signinData,
          loading: true,
        });

        signin(data)
          .then((response) => {
            setAuth(response.data.token, response.data.user);

            if (isAuthenticated()) {
              setIsAuth(true);
              setProfileData({
                username: isAuthenticated().username,
                firstName: isAuthenticated().firstName || "",
                lastName: isAuthenticated().lastName || "",
                email: isAuthenticated().email,
                image: isAuthenticated().userImage || "",
                role: isAuthenticated().role,
              });
              history.push("/");
              window.location.reload();
            }

            setSigninData({
              email: "",
              password: "",
              errorMessage: "",
              loading: false,
            });
          })

          .catch((error) => {
            console.log(error);
            if (error.response.status === 400) {
              setSigninData({
                ...signinData,
                errorMessage: "Invalid credentials",
                loading: false,
              });
            } else {
              setSigninData({
                ...signinData,
                errorMessage: error.toString(),
                loading: false,
              });
            }
          });
      }
    }
  };

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  return (
    <SignInUI
      signinData={signinData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      responseSuccessGoogle={responseSuccessGoogle}
      responseErrorGoogle={responseErrorGoogle}
      handlePwdVisibility={handlePwdVisibility}
      isVisible={isVisible}
    />
  );
};

export default SignIn;
