import React, { useState, useContext, useEffect } from "react";
import { ItemQtInput } from "../../index.js";
import { CartContext } from "../../../helpers/contexts/CartContext.js";
import Alert from "../../../helpers/alert/Alert.js";
import "animate.css";
import { isAuthenticated } from "../../../helpers/storage&cookies/storage&cookies.js";

const AddToCartModal = ({ prod, product, toastCartProd }) => {
  const { addItemsToCartUser, addItemsToCartGuest, error, guestCartSessionId } =
    useContext(CartContext);
  const [errorQt, setErrorQt] = error;

  const manageAddToCartClick = (
    prodId,
    prodName,
    prodSlug,
    prodImg,
    prodQuantity,
    prodPrice,
    prodDiscount
  ) => {
    if (isAuthenticated() && isAuthenticated().role === 0) {
      addItemsToCartUser(
        prodId,
        prodName,
        prodSlug,
        prodImg,
        prodQuantity,
        prodPrice,
        prodDiscount
      );
    }
    if (!isAuthenticated()) {
      addItemsToCartGuest(
        prodId,
        prodName,
        prodSlug,
        prodImg,
        prodQuantity,
        prodPrice,
        prodDiscount
      );
    }
  };

  const [prodQuantity, setProdQuantity] = useState(1);

  const stockItem = product && product.find((item) => item._id == prod._id);

  const resetForm = () => {
    const form = document.querySelector("#modal-cart-form");
    form.reset();
  };

  const resetStateOnModalClose = () => {
    setErrorQt("");
    setProdQuantity(1);
    resetForm();
  };

  return (
    <div>
      <div
        className="custom-modal modal fade"
        id="addtocart-modal"
        tabIndex="-1"
        aria-labelledby="addtocart-modal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content text-center">
            <div className="modal-header">
              <h5
                className="modal-title"
                style={{ color: "var(--secondary)" }}
                id="addtocart-modal"
              >
                Add To Cart
              </h5>
              <button
                type="button"
                className="btn-close modal-no-outline"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={resetStateOnModalClose}
              ></button>
            </div>
            <div className="modal-body">
              Choose a quantity of <strong>{prod && prod.name}</strong>:
              <div className="my-4 flex-form">
                <form
                  id="modal-cart-form"
                  className="d-flex justify-content-center"
                >
                  <ItemQtInput
                    maxValue={stockItem?.quantity}
                    inputClass="form-control quantity-input"
                    inputId="chooseProductQuantityModal"
                    prodQuantity={prodQuantity}
                    stockItem={stockItem}
                    setProdQuantity={setProdQuantity}
                    setErrorQt={setErrorQt}
                  />
                </form>
                {errorQt && (
                  <Alert
                    customClass="text-center"
                    alertType="alert-danger"
                    message={errorQt}
                  />
                )}
              </div>
            </div>

            <div className="modal-footer d-flex justify-content-center">
              <button
                onClick={() => {
                  manageAddToCartClick(
                    prod._id,
                    prod.name,
                    prod.slug,
                    prod.image,
                    prodQuantity,
                    prod.price,
                    prod.discount
                  );
                }}
                type="button"
                className="modal-no-outline px-5 py-3 btn custom-button standard-secondary-button d-flex justify-content-center align-items-center'"
              >
                {toastCartProd && toastCartProd.loading && (
                  <i className="fas fa-lg fa-cart-plus animate__animated animate__rotateIn" />
                )}
                {toastCartProd && !toastCartProd.loading && (
                  <i className="fas fa-lg fa-cart-plus" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
