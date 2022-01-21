import React, { useContext } from "react";
import "./style.css";
import { shippingMethodOptions } from "../../../helpers/shipping-method-data/ShippingMethodData";
import {
  convertToEuros,
  noShippingCost,
  shippingCostAmount,
} from "../../../helpers/misc-helper-functions/MiscHelperFunc";
import Button from "../../../components/buttons/Button";
import Alert from "../../../helpers/alert/Alert";
import { CartContext } from "../../../helpers/contexts/CartContext";

const ShippingMethods = ({ shippingMethod, setStepIndex }) => {
  const { cartProdList } = useContext(CartContext);
  const [cartProd, setCartProd] = cartProdList;
  const [shippingMethodData, setShippingMethodData] = shippingMethod;

  const handleChange = (e) => {
    setShippingMethodData({
      ...shippingMethodData,
      errorMessage: "",
      shippingMethodType: e.target.getAttribute("data-type"),
      shippingMethodPrice: e.target.getAttribute("data-price"),
    });
  };
  const handleProceedToNextStep = () => {
    if (
      shippingMethodData.shippingMethodType &&
      shippingMethodData.shippingMethodPrice
    ) {
      setShippingMethodData({
        ...shippingMethodData,
        stepComplete: true,
        date: new Date(),
      });
      setStepIndex(4);
    } else {
      setShippingMethodData({
        ...shippingMethodData,
        errorMessage: "Choose a shipping method",
      });
    }
  };
  return (
    <>
      <h5 className="mb-4 shipping-methods-header">
        Choose a shipping method:
      </h5>
      <form>
        {shippingMethodData.errorMessage && (
          <Alert
            alertType="alert-danger"
            message={shippingMethodData.errorMessage}
          />
        )}
        <div className="form-group me-2 shipping-item-container">
          {shippingMethodOptions.map((option) => (
            <div
              key={option.id}
              className="form-check d-flex align-items-center"
            >
              <div className="shipping-method-input-container">
                <input
                  onChange={handleChange}
                  className="form-check-input"
                  type="radio"
                  name="shippingMethods"
                  id={option.id}
                  value={shippingMethodData.shippingMethod}
                  data-type={option.method}
                  data-price={
                    cartProd.totalPrice >= noShippingCost ? 0 : option.price
                  }
                />
              </div>
              <div className="shipping-method-icon-container">
                <i className={option.icon}></i>
              </div>
              <label
                className="form-check-label shipping-method-label"
                htmlFor={option.id}
              >
                <p className="shipping-method-title text-secondary">
                  {option.method}
                </p>
                <p className="shipping-method-price">
                  {convertToEuros(
                    cartProd.totalPrice >= noShippingCost ? 0 : option.price
                  )}
                </p>
              </label>
            </div>
          ))}
        </div>
      </form>
      <Button
        handleClick={handleProceedToNextStep}
        classes="mt-4 w-100 p-3 btn custom-button standard-secondary-button"
        text="Next"
      />
    </>
  );
};

export default ShippingMethods;
