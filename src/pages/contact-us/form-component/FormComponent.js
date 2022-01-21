import React from "react";
import Alert from "../../../helpers/alert/Alert";

const FormComponent = ({
  errorMessage,
  contactingUs,
  contactData,
  handleChange,
}) => {
  return (
    <form className="contact-us-form">
      {errorMessage && (
        <div className="mb-4">
          <Alert alertType="alert-danger" message={errorMessage} />
        </div>
      )}
      <div className="row mb-3">
        <label htmlFor="store" className="col-sm-2 col-form-label">
          To:
        </label>
        <div className="col-sm-10">
          <input
            disabled
            placeholder="teastore.mern@gmail.com"
            type="email"
            className="form-control"
            id="store"
          />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          From (Name):
        </label>
        <div className="col-sm-10">
          <input
            onChange={handleChange}
            value={contactData.name}
            name="name"
            type="text"
            className="form-control"
            id="name"
          />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
          From (Email):
        </label>
        <div className="col-sm-10">
          <input
            onChange={handleChange}
            value={contactData.email}
            name="email"
            type="email"
            className="form-control"
            id="inputEmail3"
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="subject" className="col-sm-2 col-form-label">
          Subject:
        </label>
        <div className="col-sm-10">
          <input
            onChange={handleChange}
            value={contactData.subject}
            name="subject"
            type="text"
            maxLength="100"
            className="form-control"
            id="subject"
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="message" className="col-sm-2 col-form-label">
          Message:
        </label>
        <div className="col-sm-10">
          <textarea
            onChange={handleChange}
            value={contactData.message}
            name="message"
            className="form-control"
            id="message"
          />
        </div>
      </div>

      <button
        onClick={() => {
          contactingUs(
            contactData.name,
            contactData.email,
            contactData.subject,
            contactData.message
          );
        }}
        type="button"
        className="btn button-custom standard-primary-button p-3"
      >
        Send
      </button>
    </form>
  );
};

export default FormComponent;
