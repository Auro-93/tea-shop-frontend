import React from "react";
import Alert from "../../../../helpers/alert/Alert";
import {
  countryList,
  italyProvinces,
} from "../../../../helpers/countries-data/CountriesName";
import { Button } from "../../../../components";

const AddressFormComponent = ({
  handleChange,
  streetAddress,
  postalCode,
  city,
  region,
  country,
  onSubmit,
  errorMessage,
}) => {
  return (
    <>
      {errorMessage && (
        <Alert alertType="alert-danger" message={errorMessage} />
      )}

      <div className="form-group">
        <label
          htmlFor="streetAddress"
          className=" auth-label address-label mb-2"
        >
          Street Address*:
        </label>

        <input
          onChange={handleChange}
          value={streetAddress}
          type="text"
          name="streetAddress"
          className="checkout-input form-control mb-4"
          id="streetAddress"
          placeholder="Ex. Via Cagliari 20"
        />
      </div>

      <div className="flex-address-form">
        <div className="form-group flex-input-address">
          <label
            htmlFor="postalCode"
            className=" auth-label address-label mb-2"
          >
            Postal Code*:
          </label>

          <input
            onChange={handleChange}
            value={postalCode}
            type="number"
            name="postalCode"
            className="checkout-input form-control mb-4"
            id="postalCode"
            placeholder="Ex. 09010"
          />
        </div>
        <div className="form-group">
          <label htmlFor="city" className=" auth-label address-label mb-2">
            City*:
          </label>

          <input
            onChange={handleChange}
            value={city}
            type="text"
            name="city"
            className="checkout-input form-control mb-4"
            id="city"
            placeholder="Ex. Rome"
          />
        </div>
      </div>
      <div className="flex-address-form">
        <div className="form-group flex-input-address">
          <label htmlFor="country" className=" auth-label address-label mb-2">
            Country*:
          </label>

          <select
            onChange={handleChange}
            id="country"
            className="form-select mb-4"
            aria-label="Default select example"
            value={country}
          >
            <option selected></option>
            {countryList.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="region" className=" auth-label address-label mb-2">
            Region, area, district or territory*:
          </label>

          {country === "Italy" ? (
            <select
              onChange={handleChange}
              id="region"
              className="form-select mb-4"
              aria-label="Default select example"
              value={region}
            >
              <option selected></option>
              {italyProvinces.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          ) : (
            <input
              onChange={handleChange}
              value={region}
              type="text"
              name="region"
              className="checkout-input form-control mb-4"
              id="region"
              placeholder="Ex. Sud-Sardegna (SU)"
            />
          )}
        </div>
      </div>
      <Button
        handleClick={onSubmit}
        classes="mt-2  px-4 py-2 btn custom-button outline-primary2-button"
        children={<i className="fas fa-lg me-3 fa-plus-square"></i>}
        text="Add"
      />
    </>
  );
};

export default AddressFormComponent;
