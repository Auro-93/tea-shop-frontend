import React, { useContext, useState, useEffect } from "react";
import UserOrdersUI from "./UserOrdersUI";
import { OrderContext } from "../../helpers/contexts/OrderContext";
import { CartContext } from "../../helpers/contexts/CartContext";
import { ReviewContext } from "../../helpers/contexts/ReviewContext";

const UserOrders = () => {
  const {
    orderListData,
    addingOrderUser,
    settingSearchTerm,
    settingPage,
    settingPages,
    settingStatus,
    settingSort,
  } = useContext(OrderContext);
  const [orderList, setOrderList] = orderListData;

  const { addItemsToCartUser, cartProdList } = useContext(CartContext);

  const { userReviewsData } = useContext(ReviewContext);
  const [userReviews] = userReviewsData;

  //FILTERED ORDER LIST
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    setFilteredOrders(orderList.orders);
  }, [orderList.orders]);

  //TOGGLE UI WHEN CLICK ON BUY AGAIN BUTTON

  const [toggleBuyAgain, setToggleBuyAgain] = useState(false);

  const toggleBuyAgainFunc = (orderId = false) => {
    let orderGrid = document.querySelector(".order-card-grid-container");
    let orderCard = document.querySelectorAll(".order-card");

    if (toggleBuyAgain === false) {
      orderGrid.classList.remove("grid-col-2");
      orderGrid.classList.add("grid-col-1");
      orderCard.forEach((el) => {
        el.classList.remove("animate__bounceInLeft");
        el.classList.add("animate__zoomIn");
      });

      const filteredArr = filteredOrders.filter((el) => el._id === orderId);
      setToggleBuyAgain(true);
      setFilteredOrders(filteredArr);
    } else {
      orderGrid.classList.remove("grid-col-1");
      orderGrid.classList.add("grid-col-2");
      orderCard.forEach((el) => {
        el.classList.remove("animate__zoomIn");
        el.classList.add("animate__bounceInLeft");
      });
      setToggleBuyAgain(false);
      setFilteredOrders(orderList.orders);
    }
  };

  //MANAGE ORDER CARD AND GRID ANIMATION AND MANAGE GRID UI

  useEffect(() => {
    let orderGrid = document.querySelector(".order-card-grid-container");
    orderGrid.classList.remove("grid-col-1");
    orderGrid.classList.add("grid-col-2");
  }, []);

  return (
    <UserOrdersUI
      filteredOrders={filteredOrders}
      orderList={orderList}
      setOrderList={setOrderList}
      toggleBuyAgain={toggleBuyAgain}
      toggleBuyAgainFunc={toggleBuyAgainFunc}
      addingOrderUser={addingOrderUser}
      addItemsToCartUser={addItemsToCartUser}
      settingPages={settingPages}
      settingPage={settingPage}
      settingSearchTerm={settingSearchTerm}
      settingStatus={settingStatus}
      settingSort={settingSort}
      cartProdList={cartProdList}
      userReviews={userReviews}
    />
  );
};

export default UserOrders;
