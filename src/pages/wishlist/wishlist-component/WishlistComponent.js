import React from "react";
import dotenv from "dotenv";
import {
  convertToEuros,
  calcDiscount,
} from "../../../helpers/misc-helper-functions/MiscHelperFunc";
import { Link } from "react-router-dom";

const WishlistComponent = ({
  prod,
  manageWishListUpdateClick,
  cartProd,
  setSelectedProdModal,
  product,
}) => {
  //DOTENV CONFIG
  dotenv.config();
  const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

  const { totalCart } = cartProd;

  const cartQtEqualStockQt = () => {
    let prodInStock = product && product.find((item) => item._id == prod._id);
    console.log(prodInStock);
    if (prodInStock) {
      if (prodInStock.quantity == 0) {
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <div className="d-flex my-4 flex-wishlist-container">
      <div className="wishlistItem-img-container">
        <img src={prod && `${baseUrl}/api/uploads/${prod.image?.filename}`} />
      </div>
      <div className="wishlist-grid">
        <h5 className="wishlist-name wishlist-item-1">Product</h5>
        <p className="wishlist-name-value wishlist-item-2 text-secondary">
          {prod.name}
        </p>
        <h5 className="wishlist-price wishlist-item-1">Price</h5>
        <div className="wishlist-price-value wishlist-item-2">
          {prod.discount != 0 && (
            <span className="text-decoration-line-through text-secondary">
              {convertToEuros(prod.price)}
            </span>
          )}

          <span className="mx-2 price-text-highlight">
            {convertToEuros(calcDiscount(prod.price, prod.discount))}
          </span>
        </div>
        <h5 className="wishlist-timestamp wishlist-item-1">Added in</h5>
        <p className="wishlist-timestamp-value wishlist-item-2 text-secondary">
          {new Date(prod.date).toLocaleDateString()}
        </p>
        {!cartQtEqualStockQt() ? (
          <button
            onClick={() => {
              setSelectedProdModal(prod);
            }}
            data-bs-toggle="modal"
            data-bs-target="#addtocart-modal"
            type="button"
            className="wishlist-button-cart  align-self-stretch add-to-cart-btn btn custom-button standard-secondary-button d-flex justify-content-center align-items-center"
          >
            <i className="fas fa-lg fa-cart-plus"></i>
          </button>
        ) : (
          <button
            disabled
            className="wishlist-button-cart  align-self-stretch add-to-cart-btn btn custom-button standard-secondary-button d-flex justify-content-center align-items-center"
          >
            <i className="fas fa-lg fa-shopping-cart"></i>
          </button>
        )}

        <Link
          to={`/products/${prod.slug}/${prod._id}`}
          type="button"
          className=" wishlist-button-detail align-self-stretch btn custom-button standard-primary-button d-flex justify-content-center align-items-center"
        >
          View
        </Link>
      </div>
      <div
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
        className="remove-wishlist-item"
      >
        <i className="far fa-trash-alt"></i> Remove
      </div>
      {totalCart && totalCart.find((item) => item._id == prod._id) && (
        <div className="item-in-cart">
          <i className="fab fa-lg fa-opencart mx-1" /> <span>Item in Cart</span>
        </div>
      )}
    </div>
  );
};

export default WishlistComponent;
