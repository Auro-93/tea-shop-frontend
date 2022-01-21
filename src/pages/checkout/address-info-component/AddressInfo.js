import React, { useEffect } from "react";
import ShippingAddressComponent from "./shipping-address-component/ShippingAddressComponent";
import BillingAddressComponent from "./billing-address-component/BillingAddressComponent";
import { Button } from "../../../components";
import Alert from "../../../helpers/alert/Alert";
import "./style.css";

const AddressInfo = ({ setStepIndex, address }) => {
  const [addressData, setAddressData] = address;

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      let addr;
      if (
        addressData.shippingAddress.length !== 0 &&
        addressData.billingAddress.length === 0
      ) {
        addr = addressData.shippingAddress;
      } else if (
        addressData.shippingAddress.length === 0 &&
        addressData.billingAddress.length !== 0
      ) {
        addr = addressData.billingAddress;
      } else if (
        addressData.shippingAddress.length !== 0 &&
        addressData.billingAddress.length !== 0
      ) {
        addr = addressData.shippingAddress;
      }
      setAddressData({
        ...addressData,
        shippingEqualToBilling: true,
        billingAddress: addr,
        shippingAddress: addr,
        errorMessage: "",
        stepComplete: false,
      });
    } else {
      setAddressData({
        ...addressData,
        isAddedBilling: false,
        shippingEqualToBilling: false,
        billingAddress: {},
        errorMessage: "",
        stepComplete: false,
      });
    }
  };

  useEffect(() => {
    console.log(addressData);
  }, [addressData]);

  const handleProceedToNextStep = () => {
    if (
      Object.keys(addressData.shippingAddress).length !== 0 &&
      Object.keys(addressData.billingAddress).length !== 0
    ) {
      setAddressData({ ...addressData, stepComplete: true });
      setStepIndex(3);
    } else {
      setAddressData({
        ...addressData,
        errorMessage: "All fields are required",
      });
    }
  };

  return (
    <form>
      {addressData.errorMessage && (
        <Alert alertType="alert-danger" message={addressData.errorMessage} />
      )}
      <input
        onChange={handleCheckboxChange}
        className="form-check-input me-2 custom-checkbox"
        type="checkbox"
        value="sameAddress"
        style={{ backgroundColor: "transparent !important" }}
        checked={addressData.shippingEqualToBilling ? true : false}
      />
      Shipping and Billing Address are the same
      <div className="accordion mt-4" id="AddressAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              {addressData.shippingEqualToBilling
                ? "Shipping and Billing Address"
                : "Shipping Address"}
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#AddressAccordion"
          >
            <div className="accordion-body accordion-address-body">
              {addressData.isAddedShipping && (
                <div className="edit-address-block">
                  {Object.keys(addressData.shippingAddress).length !== 0 && (
                    <div className="editable-address">
                      <strong>{`${addressData.shippingAddress.streetAddress} 
                      ${addressData.shippingAddress.city}
                      ${addressData.shippingAddress.postalCode}
                      ${addressData.shippingAddress.region}
                      ${addressData.shippingAddress.country}
                      `}</strong>
                    </div>
                  )}
                  <Button
                    handleClick={() => {
                      addressData.shippingEqualToBilling &&
                        setAddressData({
                          ...addressData,
                          shippingAddress: {},
                          billingAddress: {},
                          isAddedShipping: false,
                          stepComplete: false,
                        });
                      !addressData.shippingEqualToBilling &&
                        setAddressData({
                          ...addressData,
                          shippingAddress: {},
                          isAddedShipping: false,
                          stepComplete: false,
                        });
                    }}
                    classes="mt-2  px-5 py-2 btn custom-button outline-primary2-button"
                    children={<i className="fas fa-lg me-3 fa-pen-square"></i>}
                    text="Edit"
                  />
                </div>
              )}

              {!addressData.isAddedShipping && (
                <div className="add-address-block">
                  <ShippingAddressComponent address={address} />
                </div>
              )}
            </div>
          </div>
        </div>
        {!addressData.shippingEqualToBilling && (
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                Billing Address
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse show"
              aria-labelledby="headingTwo"
              data-bs-parent="#AddressAccordion"
            >
              <div className="accordion-body accordion-address-body">
                {addressData.isAddedBilling && (
                  <div className="edit-address-block">
                    {Object.keys(addressData.billingAddress).length !== 0 && (
                      <div className="editable-address">
                        <strong>{`${addressData.billingAddress.streetAddress} 
                      ${addressData.billingAddress.city}
                      ${addressData.billingAddress.postalCode}
                      ${addressData.billingAddress.region}
                      ${addressData.billingAddress.country}
                      `}</strong>
                      </div>
                    )}
                    <Button
                      handleClick={() => {
                        setAddressData({
                          ...addressData,
                          billingAddress: {},
                          isAddedBilling: false,
                          stepComplete: false,
                        });
                      }}
                      classes="mt-2  px-5 py-2 btn custom-button outline-primary2-button"
                      children={
                        <i className="fas fa-lg me-3 fa-pen-square"></i>
                      }
                      text="Edit"
                    />
                  </div>
                )}

                {!addressData.isAddedBilling && (
                  <div className="add-address-block">
                    <BillingAddressComponent address={address} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Button
        handleClick={handleProceedToNextStep}
        classes="mt-4 w-100 p-3 btn custom-button standard-secondary-button"
        text="Next"
      />
    </form>
  );
};

export default AddressInfo;
