import React from "react";
import "animate.css";
import { isAuthenticated } from "../../../helpers/storage&cookies/storage&cookies";
import { Link } from "react-router-dom";
import { InStockLabel } from "../../index";

const ProductLayer = ({
  toastWishListProd,
  manageWishListUpdateClick,
  prod,
  favoriteProd,
  setSelectedProdModal,
}) => {
  const { totalWishlist } = favoriteProd;

  const manageHeartIcon = (toastWishListProd, prod, totalWishlist) => {
    if (isAuthenticated().role == 0 || !isAuthenticated()) {
      if (!toastWishListProd.loading) {
        return (
          <i
            onClick={() => {
              manageWishListUpdateClick(
                prod._id,
                prod.name,
                prod.slug,
                prod.price,
                prod.discount,
                prod.image
              );
            }}
            className={
              Array.isArray(totalWishlist) &&
              totalWishlist.find((item) => item._id == prod._id)
                ? "fas fa-2x fa-heart favorite-icon m-4  animate__animated animate__heartBeat"
                : "far fa-2x fa-heart favorite-icon m-4 animate__animated animate__heartBeat"
            }
          ></i>
        );
      } else {
        return (
          <i
            className={
              Array.isArray(totalWishlist) &&
              totalWishlist.find((item) => item._id == prod._id)
                ? "fas fa-2x fa-heart favorite-icon m-4  animate__animated animate__rotateIn"
                : "far fa-2x fa-heart favorite-icon m-4 animate__animated animate__rotateIn"
            }
          ></i>
        );
      }
    }
  };

  const manageDiscountLabel = (prod) => {
    if (prod.discount) {
      return (
        <div className="discount-stripe animate__animated animate__fadeInDown">
          {"Discount: " + prod.discount + "%"}
        </div>
      );
    }
  };

  const manageOutOfStockLabel = (prod) => {
    if (prod.quantity < 1) {
      return (
        <InStockLabel
          product={prod}
          customClassContent="align-self-end outOfStockLayer animate__animated animate__zoomIn"
        />
      );
    }
  };

  return (
    <div className="product-image-layer d-flex flex-column justify-content-between">
      <div className="d-flex justify-content-between align-items-center">
        {manageHeartIcon(toastWishListProd, prod, totalWishlist)}
        {prod.quantity > 0 &&
          (isAuthenticated().role === 0 || !isAuthenticated()) && (
            <button
              onClick={() => {
                setSelectedProdModal(prod);
              }}
              data-bs-toggle="modal"
              data-bs-target="#addtocart-modal"
              type="button"
              className=" product-page-add-cart wishlist-button-cart add-to-cart-btn btn custom-button standard-secondary-button d-flex justify-content-center align-items-center animate__animated animate__zoomIn"
            >
              <i className="fas fa-lg fa-cart-plus"></i>
            </button>
          )}
      </div>

      <div>{manageDiscountLabel(prod)}</div>
      <div className="d-flex justify-content-between">
        <Link
          className="align-self-start details-btn animate__animated animate__zoomIn"
          to={`/products/${prod.slug}/${prod._id}`}
        >
          View
        </Link>
        {manageOutOfStockLabel(prod)}
      </div>
    </div>
  );
};

export default ProductLayer;
