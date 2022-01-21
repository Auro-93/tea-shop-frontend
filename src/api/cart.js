import axios from "axios";
import dotenv from "dotenv";
import { getCookies } from "../helpers/storage&cookies/storage&cookies";

//DOTENV CONFIG
dotenv.config();
const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

//CONFIG AXIOS REQUEST
const config1 = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getCookies("token"),
  },
};

const config2 = {
  headers: {
    "Content-Type": "application/json",
  },
};

//USER: ADD TO CART
export const addToCartUser = async (data) => {
  const response = await axios.put(
    `${baseUrl}/api/user/cart/add-item-to-cart-user`,
    data,
    config1
  );
  return response;
};

//GUEST: ADD TO CART
export const addToCartGuest = async (data) => {
  const response = await axios.put(
    `${baseUrl}/api/user/cart/add-item-to-cart-guest`,
    data,
    config2
  );
  return response;
};

//USER: REMOVE FROM CART
export const removeFromCartUser = async (data) => {
  const response = await axios.put(
    `${baseUrl}/api/user/cart/delete-cart-item-user`,
    data,
    config1
  );
  return response;
};

//GUEST: REMOVE FROM CART
export const removeFromCartGuest = async (data) => {
  const response = await axios.put(
    `${baseUrl}/api/user/cart/delete-cart-item-guest`,
    data,
    config2
  );
  return response;
};

//USER: GET CART ITEMS
export const getCartItemsUser = async (name, sort, page) => {
  const response = await axios.get(
    `${baseUrl}/api/user/cart/get-cart-items-user?name=${name}&sort=${sort}&page=${page}`,
    config1
  );
  return response;
};

//GUEST: GET CART ITEMS
export const getCartItemsGuest = async (data, name, sort, page) => {
  const response = await axios.post(
    `${baseUrl}/api/user/cart/get-cart-items-guest?name=${name}&sort=${sort}&page=${page}`,
    data,
    config2
  );
  return response;
};
