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

//GET CATEGORIES
export const fetchCategories = async () => {
  const response = await axios.get(`${baseUrl}/api/categories/get-categories`);
  return response;
};

//ADD CATEGORY
export const postCategory = async (data) => {
  const response = await axios.post(
    `${baseUrl}/api/categories/create-category`,
    data,
    config
  );
  return response;
};

//EDIT CATEGORY
export const editCategory = async (data) => {
  const response = await axios.put(
    `${baseUrl}/api/categories/edit-category`,
    data,
    config
  );
  return response;
};

//REMOVE CATEGORY
export const removeCategory = async (data) => {
  const response = await axios.put(
    `${baseUrl}/api/categories/remove-category`,
    data,
    config
  );
  return response;
};
