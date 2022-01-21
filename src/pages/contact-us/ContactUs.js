import React, { useState } from "react";
import validator from "validator";
import ContactUsUI from "./ContactUsUI";
import { isAuthenticated } from "../../helpers/storage&cookies/storage&cookies";
import { contactUs } from "../../api/contact-us";

const ContactUs = () => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [contactResponse, setContactResponse] = useState({
    successMessage: "",
    errorMessage: "",
    loading: false,
  });

  const handleChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
    setContactResponse({
      ...contactResponse,
      errorMessage: "",
    });
  };

  const resetForm = () => {
    setContactData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const contactingUs = (name, email, subject, message) => {
    if (!name || !email || !subject || !message) {
      setContactResponse({
        ...contactResponse,
        errorMessage: "All fields are required",
      });
    } else if (!validator.isEmail(email)) {
      setContactResponse({
        ...contactResponse,
        errorMessage: "Invalid email",
      });
    } else {
      setContactResponse({ ...contactResponse, loading: true });
      let data = { name, email, subject, message };
      contactUs(data)
        .then((response) => {
          resetForm();
          setContactResponse({
            successMessage: response.data.successMessage,
            errorMessage: "",
            loading: false,
          });
        })
        .catch((error) => {
          setContactResponse({
            successMessage: "",
            errorMessage: error.toString(),
            loading: false,
          });
        });
    }
  };
  return (
    <ContactUsUI
      contactResponse={contactResponse}
      setContactResponse={setContactResponse}
      contactingUs={contactingUs}
      contactData={contactData}
      handleChange={handleChange}
    />
  );
};

export default ContactUs;
