import React, { useContext } from "react";
import CartUI from "./CartUI";
import { CartContext } from "../../helpers/contexts/CartContext";
import { ProductContext } from "../../helpers/contexts/ProductContext";
import { isAuthenticated } from "../../helpers/storage&cookies/storage&cookies";

const Cart = () => {
  const {
    cartProdList,
    settingPage,
    settingPages,
    settingSearchTerm,
    settingSort,
    error,
    removingFromCartUser,
    removingFromCartGuest,
    ToastCartManagement,
    handleToastCartClick,
    guestCartSessionId,
  } = useContext(CartContext);
  const { productList } = useContext(ProductContext);
  const [cartProd, setCartProd] = cartProdList;
  const [toastCartProd, setToastCartProd] = ToastCartManagement;
  const [errorQt, setErrorQt] = error;
  const [products, setProducts] = productList;
  const [cartGuestId, setCartGuestId] = guestCartSessionId;

  const manageRemoveFromCartClick = (prodId, prodQt) => {
    if (isAuthenticated() && isAuthenticated().role === 0) {
      removingFromCartUser(prodId, prodQt);
    }
    if (!isAuthenticated()) {
      removingFromCartGuest(prodId, prodQt);
    }
  };

  return (
    <CartUI
      cartProd={cartProd}
      removingFromCart={manageRemoveFromCartClick}
      products={products.totalProducts}
      errorQt={errorQt}
      setErrorQt={setErrorQt}
      toastCartProd={toastCartProd}
      handleToastCartClick={handleToastCartClick}
      settingPage={settingPage}
      settingPages={settingPages}
      settingSearchTerm={settingSearchTerm}
      settingSort={settingSort}
    />
  );
};

export default Cart;
