import axios from "axios";
import dotenv from "dotenv";
import { getCookies } from "../helpers/storage&cookies/storage&cookies";

//DOTENV CONFIG
dotenv.config();
const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

const config1 = {
  headers: {
    "Content-Type": "application/json",
  },
};

const config2 = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getCookies("token"),
  },
};

export const updateWishlistUser = async (data) => {
  const response = await axios.put(
    `${baseUrl}/api/user/wishlist/update-wishlist-user`,
    data,
    config2
  );
  return response;
};

export const getWishlistUser = async (name, sort, page) => {
  const response = await axios.get(
    `${baseUrl}/api/user/wishlist/get-wishlist-user?name=${name}&sort=${sort}&page=${page}`,
    config2
  );
  return response;
};

export const updateWishlistGuest = async (data) => {
  const response = await axios.put(
    `${baseUrl}/api/user/wishlist/update-wishlist-guest`,
    data,
    config2
  );
  return response;
};

export const getWishlistGuest = async (data, name, sort, page) => {
  const response = await axios.post(
    `${baseUrl}/api/user/wishlist/get-wishlist-guest?name=${name}&sort=${sort}&page=${page}`,
    data,
    config2
  );
  return response;
};
