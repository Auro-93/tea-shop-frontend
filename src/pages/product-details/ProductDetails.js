import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { isAuthenticated } from "../../helpers/storage&cookies/storage&cookies";
import { ProductContext } from "../../helpers/contexts/ProductContext";
import { WishListContext } from "../../helpers/contexts/WishListContext";
import { CartContext } from "../../helpers/contexts/CartContext";
import { ReviewContext } from "../../helpers/contexts/ReviewContext";
import ProductDetailsUI from "./ProductDetailsUI";

const ProductDetails = () => {
  let { productId } = useParams();

  const { productList } = useContext(ProductContext);
  const {
    favoriteProdList,
    wishlistSessionIdData,
    ToastWishListManagement,
    updatingWishlistUser,
    updatingWishlistGuest,
    handleToastWishListClick,
  } = useContext(WishListContext);
  const {
    cartProdList,
    ToastCartManagement,
    handleToastCartClick,
    addItemsToCartUser,
    addItemsToCartGuest,
    error,
  } = useContext(CartContext);
  const { gettingProductReviews, allReviewsData } = useContext(ReviewContext);

  const [products, setProducts] = productList;

  const [favoriteProd, setFavoriteProd] = favoriteProdList;
  const [wishlistSessionId] = wishlistSessionIdData;
  const [toastWishListProd, setToastWishListProd] = ToastWishListManagement;

  const [cartProd, setCartProd] = cartProdList;
  const [toastCartProd, setToastCartProd] = ToastCartManagement;
  const [errorQt, setErrorQt] = error;

  const [allReviews, setAllReviews] = allReviewsData;

  // MANAGE REVIEWS PER PAGE

  const [limit, setLimit] = useState(2);

  // MANAGE CHOOSE A REVIEW CATEGORY

  const [rewCategory, setRewCategory] = useState("");

  // MANAGE SORT BY DATE

  const [sort, setSort] = useState(-1);

  useEffect(() => {
    gettingProductReviews(productId, rewCategory, sort, limit);
  }, [limit, rewCategory, sort, productId]);

  let prodDetails = products.totalProducts
    ? products.totalProducts.find((prod) => prod._id === productId)
    : null;

  const [prodQuantity, setProdQuantity] = useState(1);

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

  const manageAddToCartClick = (
    prodId,
    prodName,
    prodSlug,
    prodImg,
    prodQuantity,
    prodPrice
  ) => {
    if (isAuthenticated() && isAuthenticated().role === 0) {
      addItemsToCartUser(
        prodId,
        prodName,
        prodSlug,
        prodImg,
        prodQuantity,
        prodPrice
      );
    }
    if (!isAuthenticated()) {
      addItemsToCartGuest(
        prodId,
        prodName,
        prodSlug,
        prodImg,
        prodQuantity,
        prodPrice
      );
    }
  };

  return (
    <ProductDetailsUI
      favoriteProd={favoriteProd}
      manageWishlistClick={manageWishListUpdateClick}
      handleToastWishListClick={handleToastWishListClick}
      toastWishListProd={toastWishListProd}
      prod={prodDetails}
      prodQuantity={prodQuantity}
      manageAddToCartClick={manageAddToCartClick}
      handleToastCartClick={handleToastCartClick}
      toastCartProd={toastCartProd}
      errorQt={errorQt}
      setProdQuantity={setProdQuantity}
      setErrorQt={setErrorQt}
      allReviews={allReviews}
      totalProducts={products.totalProducts}
      limit={limit}
      setLimit={setLimit}
      rewCategory={rewCategory}
      setRewCategory={setRewCategory}
      sort={sort}
      setSort={setSort}
    />
  );
};

export default ProductDetails;
