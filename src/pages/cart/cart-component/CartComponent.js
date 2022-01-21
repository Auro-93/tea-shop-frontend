import React, { useState } from "react";
import dotenv from "dotenv";
import { Link } from "react-router-dom";
import "animate.css";
import {
  calcDiscount,
  convertToEuros,
} from "../../../helpers/misc-helper-functions/MiscHelperFunc";
import { StandardModal } from "../../../components";

const CartComponent = ({
  cartItem,
  removingFromCart,
  products,
  setSelectedProdModal,
}) => {
  //DOTENV CONFIG
  dotenv.config();
  const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

  const prod = products && products.find((item) => item._id == cartItem._id);

  const [prodQuantity, setProdQuantity] = useState(cartItem.quantity);

  return (
    <div className="p-3 cart-item-container">
      <Link
        to={`/products/${cartItem.slug}/${cartItem._id}`}
        className="cartItem-img-container"
      >
        <img
          className="img"
          src={cartItem && `${baseUrl}/api/uploads/${cartItem.image.filename}`}
        />
      </Link>
      <div className="cart-grid">
        <h5 className="text-color name text-center grid-item-1">Product</h5>
        <Link
          className="text-secondary name-value text-center grid-item-2"
          to={`/products/${cartItem.slug}/${cartItem._id}`}
        >
          <p>{cartItem.name}</p>
        </Link>

        <h5 className="text-color price text-center grid-item-1">Price</h5>
        <p className="price-value text-center text-secondary grid-item-2">
          {convertToEuros(calcDiscount(cartItem.price, cartItem.discount))}
        </p>

        <h5 className="text-color quantity text-center grid-item-1"> Qt.</h5>
        <p className="qt-value text-center text-secondary  grid-item-2">
          <strong>{cartItem.quantity}</strong>
          {prod && prod.quantity > 0 && (
            <i
              data-bs-toggle="modal"
              data-bs-target="#addtocart-modal"
              type="button"
              onClick={() => {
                setSelectedProdModal(prod);
              }}
              className="fas fa-lg mx-1 fa-plus-square plus-cart-btn"
            />
          )}
        </p>

        <h5 className="text-color total text-center grid-item-1"> Total</h5>
        <p className="totalEl total-value text-center grid-item-2">
          {convertToEuros(
            calcDiscount(cartItem.price, cartItem.discount) * prodQuantity
          )}
        </p>
      </div>
      <div
        data-bs-toggle="modal"
        data-bs-target="#standardmodal"
        className="remove-cart-item"
      >
        <i className="far fa-trash-alt"></i> Remove
      </div>
      <StandardModal
        title="Delete item"
        customClass="bg-primary-custom"
        handleClick={removingFromCart}
        cartItem={cartItem}
      />
    </div>
  );
};

export default CartComponent;
