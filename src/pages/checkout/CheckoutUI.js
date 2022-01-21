import React, { useContext } from "react";
import { Header, Footer, CheckoutSummary, Loading } from "../../components";
import { CartContext } from "../../helpers/contexts/CartContext";
import { isAuthenticated } from "../../helpers/storage&cookies/storage&cookies";
import PersonalData from "./personal-data-component/PersonalData";
import AddressInfo from "./address-info-component/AddressInfo";
import ShippingMethods from "./shipping-methods-component/ShippingMethods";
import Payment from "./payment-component/Payment";

import "./style.css";

const CheckoutUI = ({
  stepIndex,
  guestInfo,
  userInfo,
  address,
  shippingMethod,
  paymentMethod,
  setStepIndex,
  orderList,
}) => {
  const { cartProdList } = useContext(CartContext);
  const [cartProd, setCartProd] = cartProdList;
  const { cartListItems } = cartProd;

  const [guestPersonalData, setGuestPersonalData] = guestInfo;
  const [userPersonalData, setUserPersonalData] = userInfo;
  const [addressData, setAddressData] = address;
  const [shippingMethodData, setShippingMethodData] = shippingMethod;

  const displayCheckoutStep = () => {
    if (stepIndex === 1) {
      return (
        <PersonalData
          guestInfo={guestInfo}
          userInfo={userInfo}
          setStepIndex={setStepIndex}
        />
      );
    } else if (stepIndex === 2) {
      return <AddressInfo setStepIndex={setStepIndex} address={address} />;
    } else if (stepIndex === 3) {
      return (
        <ShippingMethods
          setStepIndex={setStepIndex}
          shippingMethod={shippingMethod}
        />
      );
    } else if (stepIndex === 4) {
      return <Payment paymentMethod={paymentMethod} />;
    }
  };

  return (
    <div className="max-width-container d-flex flex-column min-vh-100 cart-page">
      <Header />
      <div className="page-checkout-container">
        <div className="user-info-block">
          <h2 className="checkout-title">
            <i className="fas fa-credit-card mx-3"></i>
            Checkout (<span>{isAuthenticated() ? "User" : "Guest"}</span>)
          </h2>
          {cartListItems.length === 0 && (
            <p className="text-center px-1">
              No items in cart. Your cart session could be expired.
            </p>
          )}
          {cartListItems.length > 0 && (
            <>
              <div className="d-flex justify-content-around step-title-container">
                <div
                  id={stepIndex === 1 ? "active" : null}
                  className="step-item step-pointer"
                  onClick={() => {
                    setStepIndex(1);
                    if (!isAuthenticated()) {
                      setGuestPersonalData({
                        ...guestPersonalData,
                        stepComplete: false,
                      });
                    } else if (isAuthenticated().role === 0) {
                      setUserPersonalData({
                        ...userPersonalData,
                        stepComplete: false,
                      });
                    }
                  }}
                >
                  <div className="p-1">1.</div>
                  <div>Personal Data</div>
                </div>
                <div
                  id={stepIndex === 2 ? "active" : null}
                  className={
                    guestPersonalData.stepComplete ||
                    userPersonalData.stepComplete
                      ? "step-item step-pointer"
                      : "step-item step-blocked"
                  }
                  onClick={() => {
                    if (
                      userPersonalData.stepComplete ||
                      guestPersonalData.stepComplete
                    ) {
                      setStepIndex(2);
                    }
                    setAddressData({ ...addressData, stepComplete: false });
                  }}
                >
                  <div className="p-1">2.</div>
                  <div>Address Info</div>
                </div>
                <div
                  id={stepIndex === 3 ? "active" : null}
                  className={
                    addressData.stepComplete
                      ? "step-item step-pointer"
                      : "step-item step-blocked"
                  }
                  onClick={() => {
                    if (addressData.stepComplete) {
                      setStepIndex(3);
                    }
                    setShippingMethodData({
                      ...shippingMethodData,
                      shippingMethodType: "",
                      shippingMethodPrice: "",
                      stepComplete: false,
                    });
                  }}
                >
                  <div className="p-1">3.</div>
                  <div>Shipping Methods</div>
                </div>
                <div
                  id={stepIndex === 4 ? "active" : null}
                  className={
                    shippingMethodData.stepComplete
                      ? "step-item step-pointer"
                      : "step-item step-blocked"
                  }
                >
                  <div className="p-1">4.</div>
                  <div>Payment</div>
                </div>
              </div>
              <div className="p-2 mt-5">{displayCheckoutStep()}</div>
            </>
          )}
        </div>

        <CheckoutSummary
          cartListItems={cartListItems}
          checkoutBtnActive={false}
        />
      </div>
      {orderList.loading && <Loading />}

      <Footer />
    </div>
  );
};

export default CheckoutUI;
