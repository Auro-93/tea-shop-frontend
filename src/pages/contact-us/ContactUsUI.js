import React from "react";
import { Footer, Header, Loading } from "../../components";
import Alert from "../../helpers/alert/Alert";
import FormComponent from "./form-component/FormComponent";
import "./style.css";

const ContactUsUI = ({
  contactResponse,
  setContactResponse,
  contactingUs,
  contactData,
  handleChange,
}) => {
  const { loading, successMessage, errorMessage } = contactResponse;

  return (
    <div className="max-width-container d-flex flex-column min-vh-100">
      <Header />
      <div className="container-fluid p-0 contact-us-page ">
        {successMessage && (
          <div className="mt-5 mx-3 text-center">
            <Alert alertType="alert-success" message={successMessage} />
          </div>
        )}

        <FormComponent
          errorMessage={errorMessage}
          contactingUs={contactingUs}
          contactData={contactData}
          handleChange={handleChange}
        />
      </div>
      {loading && <Loading />}
      <Footer />
    </div>
  );
};

export default ContactUsUI;
