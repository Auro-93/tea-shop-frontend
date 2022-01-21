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

//SEND DATA FROM CONTACT US FORM
export const contactUs = async (data) => {
  const response = await axios.post(`${baseUrl}/api/contact-us`, data, config);
  return response;
};
