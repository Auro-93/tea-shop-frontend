import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  convertToEuros,
  noShippingCost,
  shippingCostAmount,
} from "../../helpers/misc-helper-functions/MiscHelperFunc";
import { CartContext } from "../../helpers/contexts/CartContext";

const CheckoutSummary = ({ cartListItems, checkoutBtnActive }) => {
  const { cartProdList } = useContext(CartContext);
  const [cartProd, setCartProd] = cartProdList;

  return (
    <div className="continueToCheckOut-container">
      <h4 className="summary">SUMMARY</h4>
      <div className="items-total d-flex justify-content-between summary-item">
        <h6 className="text-secondary">Items total</h6>
        <p>
          {isNaN(cartProd.totalPrice)
            ? convertToEuros(0)
            : convertToEuros(cartProd.totalPrice)}
        </p>
      </div>
      <div className="shipping-cost d-flex justify-content-between summary-item">
        <h6 className="text-secondary">Shipping costs</h6>
        <p>
          {cartProd.totalPrice > noShippingCost || isNaN(cartProd.totalPrice)
            ? convertToEuros(0)
            : convertToEuros(shippingCostAmount)}
        </p>
      </div>
      <div className="order-total d-flex justify-content-between summary-item">
        <h6 className="text-secondary">Order total</h6>
        <p>
          {cartProd.totalPrice > noShippingCost
            ? convertToEuros(cartProd.totalPrice)
            : isNaN(cartProd.totalPrice)
            ? convertToEuros(0)
            : convertToEuros(cartProd.totalPrice + shippingCostAmount)}
        </p>
      </div>

      {checkoutBtnActive && (
        <div className="d-flex justify-content-center">
          <Link
            id={cartListItems.length > 0 ? null : "disabled-checkout"}
            to="/checkout"
            className="btn standard-secondary-button px-5 checkout-btn"
          >
            CHECKOUT
          </Link>
        </div>
      )}
    </div>
  );
};

export default CheckoutSummary;
