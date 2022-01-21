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

//GET SPECIFIC PRODUCT REVIEWS
export const getProductReviews = async (product, rating, sort, limit) => {
  const response = await axios.get(
    `${baseUrl}/api/reviews/get-product-reviews?product=${product}&rating=${rating}&sort=${sort}&limit=${limit}`,
    config2
  );
  return response;
};

//GET SPECIFIC USER REVIEWS
export const getUserReviews = async (rating, sort, limit) => {
  const response = await axios.get(
    `${baseUrl}/api/reviews/get-user-reviews?rating=${rating}&sort=${sort}&limit=${limit}`,
    config1
  );
  return response;
};

//ADD REVIEW
export const addReview = async (data) => {
  const response = await axios.post(
    `${baseUrl}/api/reviews/add-user-review`,
    data,
    config1
  );
  return response;
};

//REMOVE REVIEW
export const removeReview = async (data) => {
  const response = await axios.put(
    `${baseUrl}/api/reviews/remove-user-review`,
    data,
    config1
  );
  return response;
};
