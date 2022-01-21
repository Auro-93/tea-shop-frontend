import axios from "axios";
import dotenv from "dotenv";
import { getCookies } from "../helpers/storage&cookies/storage&cookies";

//DOTENV CONFIG
dotenv.config();
const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getCookies("token"),
  },
};

export const signup = async (data) => {
  const response = await axios.post(
    `${baseUrl}/api/auth/sign-up`,
    data,
    config
  );
  return response;
};

export const accountAuth = async (data) => {
  const response = await axios.post(
    `${baseUrl}/api/auth/account-authentication/:token`,
    data,
    config
  );
  return response;
};

export const signin = async (data) => {
  const response = await axios.post(
    `${baseUrl}/api/auth/sign-in`,
    data,
    config
  );
  return response;
};

export const googleLogin = async (data) => {
  const response = await axios.post(
    `${baseUrl}/api/auth/google-login`,
    data,
    config
  );
  return response;
};

export const forgotPassword = async (data) => {
  const response = await axios.post(
    `${baseUrl}/api/auth/forgot-password`,
    data,
    config
  );
  return response;
};

export const resetPassword = async (data) => {
  const response = await axios.post(
    `${baseUrl}/api/auth/reset-password/:token`,
    data,
    config
  );
  return response;
};

export const getUserByEmail = async (data) => {
  const response = await axios.post(
    `${baseUrl}/api/auth/getUserByEmail`,
    data,
    config
  );
  return response;
};

export const updateEmail = async (data) => {
  const response = await axios.put(
    `${baseUrl}/api/auth/update-email`,
    data,
    config
  );
  return response;
};

export const updateUsername = async (data) => {
  const response = await axios.put(
    `${baseUrl}/api/auth/update-username`,
    data,
    config
  );
  return response;
};
