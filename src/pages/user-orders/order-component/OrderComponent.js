import React from "react";
import OrderProdInfo from "./order-prod-info/OrderProdInfo";
import BuyAgain from "./buy-again/BuyAgain";
import "animate.css";

const OrderComponent = ({
  order,
  toggleBuyAgain,
  toggleBuyAgainFunc,
  addingOrderUser,
  addItemsToCartUser,
  setOrderList,
  userReviews,
}) => {
  return (
    <div className="order-card d-flex flex-column  justify-content-center animate__animated animate__fast">
      {toggleBuyAgain === true && (
        <BuyAgain
          order={order}
          addingOrderUser={addingOrderUser}
          addItemsToCartUser={addItemsToCartUser}
          setOrderList={setOrderList}
        />
      )}
      {toggleBuyAgain === false && (
        <OrderProdInfo
          order={order}
          toggleBuyAgainFunc={toggleBuyAgainFunc}
          userReviews={userReviews}
        />
      )}
    </div>
  );
};

export default OrderComponent;
