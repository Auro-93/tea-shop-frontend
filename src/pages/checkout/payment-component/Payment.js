import React, { useContext } from "react";
import dotenv from "dotenv";
import { useHistory } from "react-router";
import { isAuthenticated } from "../../../helpers/storage&cookies/storage&cookies";
import { CartContext } from "../../../helpers/contexts/CartContext";
import { OrderContext } from "../../../helpers/contexts/OrderContext";
import { handleCardPayment } from "../../../api/payments.js";
import StripeCheckout from "react-stripe-checkout";
import paypalImg from "../../../assets/images/paypal.png";
import creditCardImg from "../../../assets/images/credit-card.png";
import { PaypalModal } from "../../../components";
import {
  noShippingCost,
  shippingCostAmount,
} from "../../../helpers/misc-helper-functions/MiscHelperFunc";
import "./style.css";

//LOADING ENVIRONMENT VARIABLE
dotenv.config();
const STRIPE_P_KEY = process.env.REACT_APP_STRIPE_P_KEY;

const Payment = ({ paymentMethod }) => {
  let history = useHistory();
  const { cartProdList } = useContext(CartContext);
  const [cartProd, setCartProd] = cartProdList;
  const { addingOrderGuest, addingOrderUser } = useContext(OrderContext);

  const [paymentMethodData, setPaymentMethodData] = paymentMethod;

  const manageAddOrder = async () => {
    if (isAuthenticated() && isAuthenticated().role === 0) {
      addingOrderUser();
    } else if (!isAuthenticated()) {
      addingOrderGuest();
    }
  };

  let totalPrice =
    cartProd.totalPrice >= noShippingCost
      ? cartProd.totalPrice
      : cartProd.totalPrice + shippingCostAmount;

  // HANDLE CARD PAYMENT

  const makeCardPayment = (token) => {
    let data = {
      token,
      totalPrice: totalPrice,
    };
    handleCardPayment(data)
      .then((response) => {
        console.log("payment done successfully");
        manageAddOrder();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h5 className="mb-4 shipping-methods-header">Choose a payment method:</h5>

      <div className="payments-container">
        <div className="payment-method-item">
          <div className="payment-img-container">
            <img src={creditCardImg} />
          </div>
          <StripeCheckout
            stripeKey={STRIPE_P_KEY}
            token={makeCardPayment}
            name="Tea Store Payment"
            amount={totalPrice * 100}
            currency="EUR"
          >
            <button
              onClick={() => {
                setPaymentMethodData({
                  ...paymentMethodData,
                  paymentType: "Credit Card",
                });
              }}
              className="p-3 btn custom-button standard-secondary-button"
            >
              Pay with Credit Card
            </button>
          </StripeCheckout>
        </div>
        <div className="payment-method-item d-flex align-items-center justify-content-between">
          <div className="payment-img-container">
            <img src={paypalImg} />
          </div>
          <button
            onClick={() => {
              setPaymentMethodData({
                ...paymentMethodData,
                paymentType: "Paypal",
              });
            }}
            data-bs-toggle="modal"
            data-bs-target="#paypalmodal"
            type="button"
            className="p-3 btn custom-button standard-secondary-button"
          >
            Pay with Paypal
          </button>
        </div>
      </div>
      <PaypalModal manageAddOrder={manageAddOrder} totalPrice={totalPrice} />
    </div>
  );
};

export default Payment;
