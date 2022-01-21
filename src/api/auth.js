import axios from "axios";
import dotenv from "dotenv";
import { getCookies } from "../helpers/storage&cookies/storage&cookies";

//DOTENV CONFIG
dotenv.config();
const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

//CONFIG AXIOS REQUEST
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getCookies("token"),
  },
};

//SIGN UP
export const signup = async (data) => {
  const response = await axios.post(
    `${baseUrl}/api/auth/sign-up`,
    data,
    config
  );
  return response;
};

//AUTH ACCOUNT AFTER SIGN-UP
export const accountAuth = async (data) => {
  const response = await axios.post(
    `${baseUrl}/api/auth/account-authentication/:token`,
    data,
    config
  );
  return response;
};

//SIGN-IN
export const signin = async (data) => {
  const response = await axios.post(
    `${baseUrl}/api/auth/sign-in`,
    data,
    config
  );
  return response;
};

//LOGIN WITH GOOGLE
export const googleLogin = async (data) => {
  const response = await axios.post(
    `${baseUrl}/api/auth/google-login`,
    data,
    config
  );
  return response;
};

//FORGOT PASSWORD
export const forgotPassword = async (data) => {
  const response = await axios.post(
    `${baseUrl}/api/auth/forgot-password`,
    data,
    config
  );
  return response;
};

//RESET PASSWORD
export const resetPassword = async (data) => {
  const response = await axios.post(
    `${baseUrl}/api/auth/reset-password/:token`,
    data,
    config
  );
  return response;
};

//GET USER BY EMAIL
export const getUserByEmail = async (data) => {
  const response = await axios.post(
    `${baseUrl}/api/auth/getUserByEmail`,
    data,
    config
  );
  return response;
};

//UPDATE USER EMAIL
export const updateEmail = async (data) => {
  const response = await axios.put(
    `${baseUrl}/api/auth/update-email`,
    data,
    config
  );
  return response;
};

//UPDATE USERNAME
export const updateUsername = async (data) => {
  const response = await axios.put(
    `${baseUrl}/api/auth/update-username`,
    data,
    config
  );
  return response;
};
