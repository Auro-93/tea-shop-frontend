import React, { useContext } from "react";
import dotenv from "dotenv";
import { Link } from "react-router-dom";
import {
  calcDiscount,
  convertToEuros,
} from "../../../../helpers/misc-helper-functions/MiscHelperFunc";
import { statusColor } from "../../../../helpers/order-status-btn-style/OrderStatusBtnStyle";
import { ProductContext } from "../../../../helpers/contexts/ProductContext";

const OrderProdInfo = ({ order, toggleBuyAgainFunc, userReviews }) => {
  //DOTENV CONFIG
  dotenv.config();
  const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

  //IMPORT PRODUCT LIST TO CHECK IF ORDER PRODUCT STILL EXIST

  const { productList } = useContext(ProductContext);
  const [products] = productList;
  const { totalProducts } = products;

  //FIND IF ORDER PROD STILL EXIST

  let newOrderProdArray = order.products.map(
    ({ quantity, ...keepAttrs }) => keepAttrs
  ); // ARRAY OF PRODS IN THE SINGLE ORDER
  let existingProds = []; // ARRAY OF PRODS STILL IN STORE (VALUES FROM PRODUCTS SHOP DATA) ==> compare with newOrderProdArray to check if them are equal and prod has not been edited or removed
  order?.products.forEach((orderProd) => {
    let prodInStore = totalProducts?.find((prod) => prod._id === orderProd._id);
    if (prodInStore) {
      existingProds.push({
        discount: prodInStore.discount,
        _id: prodInStore._id,
        name: prodInStore.name,
        image: prodInStore.image,
        price: prodInStore.price,
      });
    }
  });

  //USER : DISPLAY TOTAL PROD QTY IN A ORDER

  const prodQtInOrder = () => {
    let sumArr = [];
    order &&
      order.products.forEach((prod) => {
        sumArr.push(prod.quantity);
      });
    const reducer = (previousValue, currentValue) =>
      previousValue + currentValue;
    return sumArr.reduce(reducer, 0);
  };

  return (
    <>
      <div className="status-id-container">
        <p className="order-id">
          Order: <span>{order.orderId}</span>
        </p>
        <div
          style={statusColor(order.orderStatus)}
          className="user-order-status"
        >
          {order.orderStatus}
        </div>
      </div>

      <p className="text-secondary order-date">
        {new Date(order.payment.payedAt).toLocaleDateString()}
      </p>
      {order.products.map((prod) => (
        <div key={prod._id}>
          <div className="order-card-row-info">
            <div className="order-card-img-container order-card-row-item1">
              <img src={`${baseUrl}/api/uploads/${prod.image.filename}`} />
            </div>
            <div className="order-card-row-item2">
              <div className="order-name">{prod.name}</div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="order-card-price">
                  {convertToEuros(calcDiscount(prod.price, prod.discount))}
                </div>
                <div className="order-card-qt">{`Qt: ${prod.quantity}`}</div>
              </div>
            </div>
          </div>
          {order.orderStatus === "Received" &&
            userReviews.totalReviews &&
            !userReviews.totalReviews.find(
              (el) => el.productId === prod._id
            ) && (
              <div className="order-card-review-container">
                <Link
                  to={
                    totalProducts?.filter(
                      (storeProd) => storeProd._id === prod._id
                    ) == false
                      ? "#"
                      : `/user/dashboard/reviews/add-review/${prod.name}`
                  }
                  className={
                    totalProducts?.filter(
                      (storeProd) => storeProd._id === prod._id
                    ) == false
                      ? "link-disabled"
                      : null
                  }
                  title={
                    totalProducts?.filter(
                      (storeProd) => storeProd._id === prod._id
                    ) == false
                      ? "This product no longer exists in the store"
                      : null
                  }
                >
                  <button
                    className="btn custom-button standard-primary-button disabled-review-button"
                    disabled={
                      totalProducts?.filter(
                        (storeProd) => storeProd._id === prod._id
                      ) == false
                        ? true
                        : false
                    }
                  >
                    Write a review
                  </button>
                </Link>
              </div>
            )}
        </div>
      ))}
      <div className="order-card-row-info" id="order-card-row-info">
        <div className="order-total-qt">{`Items: x${prodQtInOrder()}`}</div>
        <div className="order-shipping-cost">
          Shipping:
          <span> {convertToEuros(order.shipping.shippingCost)} </span>
        </div>
        <div className="order-total-price">
          Total: <span>{convertToEuros(order.orderTotalPrice)}</span>
        </div>
      </div>

      <div
        className="user-order-card-btn-container"
        title={
          JSON.stringify(newOrderProdArray) !== JSON.stringify(existingProds)
            ? "Some of  these products no longer exist in the store or may have been modified"
            : null
        }
      >
        <button
          onClick={() => toggleBuyAgainFunc(order._id)}
          className="btn custom-button standard-secondary-button"
          disabled={
            JSON.stringify(newOrderProdArray) === JSON.stringify(existingProds)
              ? false
              : true
          }
        >
          Buy Again
        </button>
      </div>
    </>
  );
};

export default OrderProdInfo;
