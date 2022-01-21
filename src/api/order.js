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
  },
};

const config2 = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getCookies("token"),
  },
};

// ADD ORDER FOR GUESTS
export const addOrderGuest = async (data) => {
  const response = await axios.post(
    `${baseUrl}/api/order/add-order-guest`,
    data,
    config1
  );
  return response;
};

//ADD ORDERS FOR USERS
export const addOrderUser = async (data) => {
  const response = await axios.post(
    `${baseUrl}/api/order/add-order-user`,
    data,
    config2
  );
  return response;
};

//GET ORDERS OF A SPECIFIC USER
export const getUserOrders = async (name, status, sort, page) => {
  const response = await axios.get(
    `${baseUrl}/api/order/get-user-orders?name=${name}&status=${status}&sort=${sort}&page=${page}`,
    config2
  );
  return response;
};

//ADMIN: GET ALL ORDERS IN DB
export const getAllOrders = async (id, status, sort, page) => {
  const response = await axios.get(
    `${baseUrl}/api/order/get-all-orders?id=${id}&status=${status}&sort=${sort}&page=${page}`,
    config2
  );
  return response;
};

//ADMIN: UPDATE ORDER STATUS
export const updateOrderStatus = async (data) => {
  const response = await axios.put(
    `${baseUrl}/api/order/update-order-status`,
    data,
    config2
  );
  return response;
};

//ADMIN: GET ALL CUSTOMERS
export const getAllCustomers = async () => {
  const response = await axios.get(
    `${baseUrl}/api/order/get-all-customers`,
    config2
  );
  return response;
};

//ADMIN: GET TOTAL INCOME
export const getTotalIncome = async () => {
  const response = await axios.get(
    `${baseUrl}/api/order/get-total-income`,
    config2
  );
  return response;
};

//ADMIN : GET TOTAL NUM OF PROD SALED
export const getTotalProdSaled = async () => {
  const response = await axios.get(
    `${baseUrl}/api/order/get-prod-saled`,
    config2
  );
  return response;
};
