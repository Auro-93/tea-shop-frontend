import { createContext, useState, useContext, useEffect } from "react";
import { CustomerContext } from "./CustomerContext.js";
import { CartContext } from "./CartContext.js";
import { isAuthenticated } from "../storage&cookies/storage&cookies";
import {
  addOrderGuest,
  addOrderUser,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  getAllCustomers,
  getTotalProdSaled,
  getTotalIncome,
} from "../../api/order.js";
import {
  getLocalStorage,
  setLocalStorage,
} from "../storage&cookies/storage&cookies";
import { convertToEuros } from "../misc-helper-functions/MiscHelperFunc.js";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const {
    guestInfo,
    userInfo,
    address,
    shippingMethod,
    paymentMethod,
    checkoutStep,
  } = useContext(CustomerContext);
  const [guestPersonalData, setGuestPersonalData] = guestInfo;
  const [userPersonalData, setUserPersonalData] = userInfo;
  const [addressData, setAddressData] = address;
  const [shippingMethodData, setShippingMethodData] = shippingMethod;
  const [paymentMethodData, setPaymentMethodData] = paymentMethod;
  const [stepIndex, setStepIndex] = checkoutStep;

  const { cartProdList, guestCartSessionId } = useContext(CartContext);
  const [cartProd, setCartProd] = cartProdList;
  const [cartGuestId, setCartGuestId] = guestCartSessionId;

  //ALL AUTH USERS: SPECIFIC ORDERS FOR ONLY USER AND ALL ORDERS FOR ADMINS
  const [orderList, setOrderList] = useState({
    orders: [],
    count: 0,
    errorMessage: "",
    loading: false,
  });

  //ALL AUTH USERS: MANAGE PAGINATION
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  // ALL AUTH USERS: MANAGE FILTER ORDERS BY STATUS
  const [status, setStatus] = useState("");

  //ALL AUTH USERS: MANAGE SORTING ORDERS BY DATE
  const [sort, setSort] = useState(-1);

  //ALL AUTH USERS: MANAGE SEARCH ORDERS BY PRODUCT NAME
  const [searchTerm, setSearchTerm] = useState("");

  //ADMIN: MANAGE ERROR AND LOADING OF UPDATING ORDER STATUS
  const [updateOrderStatusErrorLoading, setUpdateOrderStatusErrorLoading] =
    useState({
      loading: false,
      errorMessage: "",
    });

  //ADMIN: ALL CUSTOMERS NUMBER STATE
  const [allCustomers, setAllCustomers] = useState({
    customers: [],
    errorMessage: "",
  });

  //ADMIN: TOTAL INCOME
  const [totalIncome, setTotalIncome] = useState({
    income: 0,
    errorMessage: "",
  });

  //ADMIN: TOTAL PROD SALED
  const [totalProdSaled, setTotalProdSaled] = useState({
    prodSaled: 0,
    errorMessage: "",
  });

  //////////////////////////////////////////////////////////////////////

  //USER: MANAGE ERROR, SUCCESS AND LOADING OF CHECKOUT STATE
  const [checkoutSuccess, setCheckoutSuccess] = useState({
    loading: false,
    errorMessage: "",
    successMessage: "",
  });

  // ORDER OBJECT FOR API ORDER POST CALL
  let orderObj = {
    sessionId: isAuthenticated() ? null : cartGuestId,
    name: isAuthenticated() ? userPersonalData.name : guestPersonalData.name,
    lastName: isAuthenticated()
      ? userPersonalData.lastName
      : guestPersonalData.lastName,
    email: isAuthenticated() ? null : guestPersonalData.customerEmail,
    username: isAuthenticated() ? null : guestPersonalData.customerUsername,
    password1: isAuthenticated() ? null : guestPersonalData.customerPassword1,
    password2: isAuthenticated() ? null : guestPersonalData.customerPassword2,
    telephone: isAuthenticated()
      ? userPersonalData.telephone.toString()
      : guestPersonalData.telephone.toString(),
    products: cartProd.cartListItems,
    productsTotalPrice: cartProd.totalPrice,
    shipping: {
      shippingMethod: shippingMethodData.shippingMethodType,
      shippingCost: shippingMethodData.shippingMethodPrice,
    },
    orderTotalPrice:
      cartProd.totalPrice + Number(shippingMethodData.shippingMethodPrice),
    shippingAddress: {
      streetAddress: addressData.shippingAddress.streetAddress,
      postalCode: addressData.shippingAddress.postalCode,
      city: addressData.shippingAddress.city,
      region: addressData.shippingAddress.region,
      country: addressData.shippingAddress.country,
    },
    billingAddress: {
      streetAddress: addressData.billingAddress.streetAddress,
      postalCode: addressData.billingAddress.postalCode,
      city: addressData.billingAddress.city,
      region: addressData.billingAddress.region,
      country: addressData.billingAddress.country,
    },
    payment: {
      payedAt: new Date(),
    },
  };

  //RESET CHECKOUT DATA AND CART ITEMS AFTER ORDER

  const resetCheckoutData = () => {
    setCartProd({
      ...cartProd,
      cartListItems: [],
    });
    if (isAuthenticated().role === 0) {
      setUserPersonalData({
        name: "",
        lastName: "",
        telephone: "",
        errorMessage: "",
        date: "",
        stepComplete: false,
      });
    } else if (!isAuthenticated()) {
      setGuestPersonalData({
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
    }
    setAddressData({
      shippingAddress: {},
      billingAddress: {},
      errorMessage: "",
      stepComplete: false,
      date: "",
      isAddedShipping: false,
      isAddedBilling: false,
      shippingEqualToBilling: false,
    });
    setShippingMethodData({
      shippingMethodType: "",
      shippingMethodPrice: "",
      errorMessage: "",
      stepComplete: false,
      date: "",
    });
    setPaymentMethodData({
      paymentType: "",
      errorMessage: "",
    });
    setStepIndex(1);
  };

  // ADD ORDER FOR GUESTS

  const addingOrderGuest = (order = orderObj) => {
    let data = { order: order };
    setOrderList({ ...orderList, loading: true });

    addOrderGuest(data)
      .then((response) => {
        setOrderList({
          ...orderList,
          loading: false,
        });
        setCheckoutSuccess({
          ...checkoutSuccess,
          successMessage: response.data.successMessage,
          errorMessage: "",
        });
        resetCheckoutData();
        window.location.assign("/success");
      })
      .catch((error) => {
        setCheckoutSuccess({
          ...checkoutSuccess,
          successMessage: "",
          errorMessage: "Something went wrong",
          loading: false,
        });
        window.location.assign("/error");
      });
  };

  // ADD ORDER FOR USERS

  const addingOrderUser = (repeatOrder = false, order = orderObj) => {
    let data = { order: order, repeatOrder: repeatOrder };

    setOrderList({ ...orderList, loading: true });
    addOrderUser(data)
      .then((response) => {
        setOrderList({
          ...orderList,
          loading: false,
        });
        setCheckoutSuccess({
          ...checkoutSuccess,
          successMessage: response.data.successMessage,
          errorMessage: "",
        });
        resetCheckoutData();
        window.location.assign("/success");
      })
      .catch((error) => {
        setCheckoutSuccess({
          ...checkoutSuccess,
          successMessage: "",
          errorMessage: "Something went wrong",
          loading: false,
        });
        window.location.assign("/error");
      });
  };

  //LOCAL STORAGE FOR ERROR AND SUCCESS MESSAGE AFTER ORDER

  useEffect(() => {
    let orderMsgStorage = getLocalStorage("orderDataMsg");
    if (orderMsgStorage) {
      setCheckoutSuccess({
        ...checkoutSuccess,
        errorMessage: orderMsgStorage.errorMessage,
        successMessage: orderMsgStorage.successMessage,
      });
    }
  }, []);

  useEffect(() => {
    let messages = {
      errorMessage: checkoutSuccess.errorMessage,
      successMessage: checkoutSuccess.successMessage,
    };
    setLocalStorage("orderDataMsg", messages);
  }, [checkoutSuccess]);

  //ADMIN: UPDATE ORDER STATUS

  const updatingOrderStatus = (
    object_id,
    order_id,
    order_status,
    order_email
  ) => {
    let data = { object_id, order_id, order_status, order_email };
    if (isAuthenticated().role === 1) {
      if (!order_status || order_status === "Choose a new status...") {
        setUpdateOrderStatusErrorLoading({
          ...updateOrderStatus,
          errorMessage: "Select a new status.",
        });
      } else {
        setUpdateOrderStatusErrorLoading({
          ...updateOrderStatus,
          loading: true,
        });
        updateOrderStatus(data)
          .then((response) => {
            setOrderList({
              ...orderList,
              orders: response.data.orders,
            });
            setPages(response.data.pages);
            setSearchTerm("");
            setPage(1);
            setStatus("");
            setUpdateOrderStatusErrorLoading({
              errorMessage: "",
              loading: false,
            });
            window.location.reload();
          })
          .catch((error) => {
            setUpdateOrderStatusErrorLoading({
              errorMessage: error.toString(),
              loading: false,
            });
          });
      }
    }
  };

  //ALL AUTH USERS: FOR ONLY USER GET SPECIFIC ORDERS AND FOR ADMINS GET ALL ORDERS
  useEffect(() => {
    if (isAuthenticated().role === 0) {
      setOrderList({ ...orderList, loading: true });
      window.scrollTo(0, 0);
      getUserOrders(searchTerm, status, sort, page)
        .then((response) => {
          setOrderList({
            ...orderList,
            orders: response.data.orders,
            loading: false,
          });
          setPages(response.data.pages);
        })
        .catch((error) => {
          setOrderList({
            ...orderList,
            errorMessage: error.toString(),
            loading: false,
          });
          setPages(1);
        });
    } else if (isAuthenticated().role === 1) {
      setOrderList({ ...orderList, loading: true });
      getAllOrders(searchTerm, status, sort, page)
        .then((response) => {
          setOrderList({
            ...orderList,
            orders: response.data.orders,
            count: response.data.count,
            loading: false,
          });
          setPages(response.data.pages);
        })
        .catch((error) => {
          setOrderList({
            ...orderList,
            errorMessage: error.toString(),
            loading: false,
          });
          setPages(1);
        });
    }
  }, [page, sort, searchTerm, status, pages]);

  //ADMIN: GET ALL CUSTOMERS

  useEffect(() => {
    if (isAuthenticated().role === 1) {
      getAllCustomers()
        .then((response) => {
          setAllCustomers({
            errorMessage: "",
            customers: response.data.customers,
          });
        })
        .catch((error) => {
          setAllCustomers({
            ...allCustomers,
            errorMessage: error.toString(),
          });
        });
      getTotalIncome()
        .then((response) => {
          setTotalIncome({
            ...totalIncome,
            income: convertToEuros(response.data.totalIncome),
          });
        })
        .catch((error) => {
          setTotalIncome({ ...totalIncome, errorMessage: error.toString() });
        });
      getTotalProdSaled()
        .then((response) => {
          setTotalProdSaled({
            ...totalProdSaled,
            prodSaled: response.data.prodSaled,
          });
        })
        .catch((error) => {
          setTotalProdSaled({
            ...totalProdSaled,
            errorMessage: error.toString(),
          });
        });
    }
  }, []);

  return (
    <OrderContext.Provider
      value={{
        settingPage: [page, setPage],
        settingPages: [pages, setPages],
        settingStatus: [status, setStatus],
        settingSort: [sort, setSort],
        settingSearchTerm: [searchTerm, setSearchTerm],
        orderListData: [orderList, setOrderList],
        customersData: [allCustomers, setAllCustomers],
        totalIncomeData: [totalIncome, setTotalIncome],
        totalProdSaledData: [totalProdSaled, setTotalProdSaled],
        manageCheckoutSuccess: [checkoutSuccess, setCheckoutSuccess],
        adminUpdateOrderManageError: [
          updateOrderStatusErrorLoading,
          setUpdateOrderStatusErrorLoading,
        ],
        addingOrderGuest,
        addingOrderUser,
        updatingOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
