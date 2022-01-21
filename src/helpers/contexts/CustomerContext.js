import { createContext, useState, useEffect } from "react";
import {
  isAuthenticated,
  getLocalStorage,
  setLocalStorage,
} from "../storage&cookies/storage&cookies";

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  /**STEP FORM MANAGEMENT STATE */

  const [stepIndex, setStepIndex] = useState(1);

  /**MANAGE GUEST PERSONAL DATA STATE ****/

  const [guestPersonalData, setGuestPersonalData] = useState({
    name: "",
    lastName: "",
    customerUsername: "",
    customerEmail: "",
    customerPassword1: "",
    customerPassword2: "",
    telephone: "",
    errorMessage: "",
    date: "",
    stepComplete: false,
  });

  /**MANAGE USER PERSONAL DATA STATE *****/

  const [userPersonalData, setUserPersonalData] = useState({
    name: "",
    lastName: "",
    telephone: "",
    errorMessage: "",
    date: "",
    stepComplete: false,
  });

  /**MANAGE ADDRESS DATA STATE ***/

  const [addressData, setAddressData] = useState({
    shippingAddress: {},
    billingAddress: {},
    errorMessage: "",
    stepComplete: false,
    date: "",
    isAddedShipping: false,
    isAddedBilling: false,
    shippingEqualToBilling: false,
  });

  /** MANAGE SHIPPING METHODS STATE ***/

  const [shippingMethodData, setShippingMethodData] = useState({
    shippingMethodType: "",
    shippingMethodPrice: "",
    errorMessage: "",
    stepComplete: false,
    date: "",
  });

  /** MANAGE PAYMENT METHODS STATE ***/

  const [paymentMethodData, setPaymentMethodData] = useState({
    paymentType: "",
    errorMessage: "",
  });

  /** GET LOCAL STORAGE FOR GUEST AN USER DATA, ADDRESS, SHIPPING METHOD ... */

  useEffect(() => {
    if (!isAuthenticated()) {
      let shippingMethodStorage = getLocalStorage("guestShippingMethod");
      shippingMethodStorage && setShippingMethodData(shippingMethodStorage);

      let addressDataStorage = getLocalStorage("guestAddress");
      addressDataStorage && setAddressData(addressDataStorage);

      let stepIndexStorage = getLocalStorage("guestCheckoutStep");
      stepIndexStorage && setStepIndex(stepIndexStorage);

      let guestDataStorage = getLocalStorage("checkoutGuestData");
      guestDataStorage && setGuestPersonalData(guestDataStorage);
    } else if (isAuthenticated().role === 0) {
      let shippingMethodStorage = getLocalStorage("userShippingMethod");
      shippingMethodStorage && setShippingMethodData(shippingMethodStorage);

      let addressDataStorage = getLocalStorage("userAddress");
      addressDataStorage && setAddressData(addressDataStorage);

      let stepIndexStorage = getLocalStorage("userCheckoutStep");
      stepIndexStorage && setStepIndex(stepIndexStorage);

      let userDataStorage = getLocalStorage("checkoutUserData");
      userDataStorage && setUserPersonalData(userDataStorage);
    }
  }, []);

  /** SET LOCAL STORAGE FOR GUEST AN USER DATA, ADDRESS ... */

  useEffect(() => {
    if (!isAuthenticated()) setLocalStorage("guestCheckoutStep", stepIndex);
    if (isAuthenticated().role === 0)
      setLocalStorage("userCheckoutStep", stepIndex);
  }, [stepIndex]);

  useEffect(() => {
    if (isAuthenticated().role === 0)
      setLocalStorage("checkoutUserData", userPersonalData);
    else if (!isAuthenticated())
      setLocalStorage("checkoutGuestData", guestPersonalData);
  }, [userPersonalData, guestPersonalData]);

  useEffect(() => {
    if (!isAuthenticated()) setLocalStorage("guestAddress", addressData);
    else if (isAuthenticated().role === 0)
      setLocalStorage("userAddress", addressData);
  }, [addressData]);

  useEffect(() => {
    if (!isAuthenticated())
      setLocalStorage("guestShippingMethod", shippingMethodData);
    else if (isAuthenticated().role === 0)
      setLocalStorage("userShippingMethod", shippingMethodData);
  }, [shippingMethodData]);

  return (
    <CustomerContext.Provider
      value={{
        guestInfo: [guestPersonalData, setGuestPersonalData],
        userInfo: [userPersonalData, setUserPersonalData],
        address: [addressData, setAddressData],
        shippingMethod: [shippingMethodData, setShippingMethodData],
        paymentMethod: [paymentMethodData, setPaymentMethodData],
        checkoutStep: [stepIndex, setStepIndex],
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
