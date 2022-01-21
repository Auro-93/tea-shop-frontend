import React, { useState } from "react";
import dotenv from "dotenv";
import { handleCardPayment } from "../../../../api/payments";
import StripeCheckout from "react-stripe-checkout";
import creditCardImg from "../../../../assets/images/credit-card.png";
import paypalImg from "../../../../assets/images/paypal.png";
import { PaypalPayment } from "../../../../components";
import "animate.css";

const BuyAgain = ({
  order,
  addingOrderUser,
  setOrderList,
  addItemsToCartUser,
}) => {
  //LOADING ENVIRONMENT VARIABLE
  dotenv.config();
  const STRIPE_P_KEY = process.env.REACT_APP_STRIPE_P_KEY;

  //CREATE ORDER OBJ

  let orderObjRepeat = {
    name: order.name,
    lastName: order.lastName,
    telephone: order.telephone,
    products: order.products,
    productsTotalPrice: order.productsTotalPrice,
    shipping: order.shipping,
    orderTotalPrice: order.orderTotalPrice,
    shippingAddress: order.shippingAddress,
    billingAddress: order.billingAddress,
    payment: {
      payedAt: new Date(),
    },
  };

  //HANDLE CARD PAYMENT

  const [paypalOpen, setPaypalOpen] = useState(false);

  const togglePaypalDiv = () => {
    setPaypalOpen(!paypalOpen);
  };

  const makeCardPayment = (token) => {
    let data = {
      token,
      totalPrice: order.orderTotalPrice,
    };
    setOrderList({ ...setOrderList, loading: true });
    handleCardPayment(data)
      .then((response) => {
        console.log("payment done successfully");
        addingOrderUser(true, orderObjRepeat);
      })
      .catch((error) => console.log(error));
  };

  //HANDLE PAYPAL PAYMENT

  const manageAddOrder = async () => {
    addingOrderUser(true, orderObjRepeat);
  };

  return (
    <div className="buy-again-div">
      <h6 className="my-3 buy-again-title"> PERSONAL DATA</h6>
      <div className="user-shipping-info-repeat-order-flex item1">
        <p className="order-user-name">
          {" "}
          <span>Name: </span> {order.name}
        </p>
        <p className="order-user-lastname">
          {" "}
          <span> Last Name: </span> {order.lastName}
        </p>
      </div>
      <div className="user-shipping-info-repeat-order-flex item2">
        <p className="order-user-phone">
          <span>Telephone: </span>
          {order.telephone}
        </p>
        <p className="order-user-email">
          <span>Email: </span> {order.email}
        </p>
      </div>
      <h6 className="my-3 buy-again-title"> SHIPPING ADDRESS</h6>
      <div className="user-shipping-info-repeat-order-flex item3">
        <p className="order-user-street">
          <span>Address: </span>
          {order.shippingAddress.streetAddress}
        </p>
        <p className="order-user-postalcode">
          <span>Postal code: </span>
          {order.shippingAddress.postalCode}
        </p>
      </div>
      <div className="user-shipping-info-repeat-order-flex item4">
        <p className="order-user-city">
          <span>City: </span> {order.shippingAddress.city}
        </p>
        <p className="order-user-region">
          <span>Region: </span> {order.shippingAddress.region}
        </p>
      </div>
      <div className="user-shipping-info-repeat-order-flex item5">
        <p className="order-user-country">
          <span>Country: </span>
          {order.shippingAddress.country}
        </p>
      </div>
      <h6 className="my-3 buy-again-title"> BILLING ADDRESS</h6>
      <div className="user-shipping-info-repeat-order-flex item6">
        <p className="order-user-street">
          <span>Address: </span> {order.billingAddress.streetAddress}
        </p>
        <p className="order-user-postalcode">
          <span>Postal code: </span> {order.billingAddress.postalCode}
        </p>
      </div>
      <div className="user-shipping-info-repeat-order-flex item7">
        <p className="order-user-city">City: {order.billingAddress.city}</p>
        <p className="order-user-region">
          <span>Region: </span> {order.billingAddress.region}
        </p>
      </div>
      <div className="user-shipping-info-repeat-order-flex item8">
        <p className="order-user-country">
          <span>Country: </span> {order.billingAddress.country}
        </p>
      </div>
      <div className="user-order-card-btn-container mb-5">
        <div className="repeat-order-btn-container">
          <StripeCheckout
            stripeKey={STRIPE_P_KEY}
            token={makeCardPayment}
            name="Tea Store Payment"
            amount={order.orderTotalPrice * 100}
            currency="EUR"
          >
            <div className="repeat-order-btn">
              <img src={creditCardImg} />
            </div>
          </StripeCheckout>
          <div onClick={togglePaypalDiv} className="repeat-order-btn">
            <img src={paypalImg} />
          </div>
        </div>
      </div>
      {paypalOpen && (
        <div className="paypal-repeat-order animate__animated animate__fast animate__zoomIn">
          <PaypalPayment
            manageAddOrder={manageAddOrder}
            totalPrice={order.orderTotalPrice}
          />
        </div>
      )}
    </div>
  );
};

export default BuyAgain;
