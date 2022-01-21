import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../helpers/contexts/ProductContext";
import { WishListContext } from "../../helpers/contexts/WishListContext";
import { CartContext } from "../../helpers/contexts/CartContext";
import WishlistUI from "./WishlistUI";
import { isAuthenticated } from "../../helpers/storage&cookies/storage&cookies";
import { updateWishlistGuest } from "../../api/wishlist";

const Wishlist = () => {
  const { productList } = useContext(ProductContext);
  const [products, setProducts] = productList;
  const { totalProducts } = products;

  const {
    favoriteProdList,
    wishlistSessionIdData,
    ToastWishListManagement,
    updatingWishlistUser,
    updatingWishlistGuest,
    handleToastWishListClick,
    settingPage,
    settingPages,
    settingSort,
    settingSearchTerm,
  } = useContext(WishListContext);

  const [favoriteProd, setFavoriteProd] = favoriteProdList;
  const [wishlistSessionId] = wishlistSessionIdData;
  const [toastWishListProd, setToastWishListProd] = ToastWishListManagement;

  const { cartProdList, ToastCartManagement, handleToastCartClick } =
    useContext(CartContext);

  const [cartProd, setCartProd] = cartProdList;
  const [toastCartProd, setToastCartProd] = ToastCartManagement;

  const [selectedProdModal, setSelectedProdModal] = useState("");

  const manageWishListUpdateClick = (
    prodId,
    prodName,
    prodSlug,
    prodPrice,
    prodDiscount,
    prodImg
  ) => {
    if (isAuthenticated() && isAuthenticated().role === 0) {
      updatingWishlistUser(
        prodId,
        prodName,
        prodSlug,
        prodPrice,
        prodDiscount,
        prodImg
      );
    }
    if (!isAuthenticated()) {
      updatingWishlistGuest(
        prodId,
        prodName,
        prodSlug,
        prodPrice,
        prodDiscount,
        prodImg
      );
    }
  };

  return (
    <WishlistUI
      manageWishListUpdateClick={manageWishListUpdateClick}
      favoriteProd={favoriteProd}
      toastWishListProd={toastWishListProd}
      handleToastWishListClick={handleToastWishListClick}
      cartProd={cartProd}
      selectedProdModal={selectedProdModal}
      setSelectedProdModal={setSelectedProdModal}
      product={totalProducts}
      toastCartProd={toastCartProd}
      handleToastCartClick={handleToastCartClick}
      settingPage={settingPage}
      settingPages={settingPages}
      settingSort={settingSort}
      settingSearchTerm={settingSearchTerm}
    />
  );
};

export default Wishlist;
