import axios from "axios";
import dotenv from "dotenv";

//DOTENV CONFIG
dotenv.config();
const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

//CONFIG AXIOS REQUEST
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//HANDLE CARD PAYMENT
export const handleCardPayment = async (data) => {
  const response = await axios.post(
    `${baseUrl}/api/payment/credit-card`,
    data,
    config
  );
  return response;
};
