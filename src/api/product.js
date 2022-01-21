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

export const fetchProducts = async (name, category, sort, page, limit) => {
  const response = await axios.get(
    `${baseUrl}/api/products/get-products?name=${name}&category=${category}&sort=${sort}&page=${page}&limit=${limit}`
  );
  return response;
};

export const postProduct = async (data) => {
  const response = await axios.post(
    `${baseUrl}/api/products/create-product`,
    data,
    config
  );
  return response;
};

export const editProduct = async (data) => {
  const response = await axios.put(
    `${baseUrl}/api/products/edit-product`,
    data,
    config
  );
  return response;
};

export const deleteProduct = async (data) => {
  const response = await axios.put(
    `${baseUrl}/api/products/delete-product`,
    data,
    config
  );
  return response;
};
