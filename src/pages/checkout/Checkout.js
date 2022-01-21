import React, { useContext } from "react";
import CheckoutUI from "./CheckoutUI";
import { CustomerContext } from "../../helpers/contexts/CustomerContext";
import { OrderContext } from "../../helpers/contexts/OrderContext";

const Checkout = () => {
  const {
    guestInfo,
    userInfo,
    address,
    shippingMethod,
    paymentMethod,
    checkoutStep,
  } = useContext(CustomerContext);
  const { orderListData } = useContext(OrderContext);

  const [stepIndex, setStepIndex] = checkoutStep;
  const [orderList] = orderListData;

  return (
    <CheckoutUI
      stepIndex={stepIndex}
      setStepIndex={setStepIndex}
      guestInfo={guestInfo}
      userInfo={userInfo}
      address={address}
      shippingMethod={shippingMethod}
      paymentMethod={paymentMethod}
      orderList={orderList}
    />
  );
};

export default Checkout;
