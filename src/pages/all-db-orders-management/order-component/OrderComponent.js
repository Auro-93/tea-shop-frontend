import React, { useState } from "react";
import { statusColor } from "../../../helpers/order-status-btn-style/OrderStatusBtnStyle";

const OrderComponent = ({
  order,
  updatingOrderStatus,
  updateOrderStatusErrorLoading,
  setUpdateOrderStatusErrorLoading,
}) => {
  const [edit, setEdit] = useState(false);
  const [status, setStatus] = useState("");

  const selectStatusOptions = () => {
    if (order.orderStatus === "Processing") {
      return (
        <>
          <option className="fw-bold" value="Processed">
            Processed
          </option>
        </>
      );
    } else if (order.orderStatus === "Processed") {
      return (
        <>
          <option className="fw-bold" value="Shipped">
            Shipped
          </option>
        </>
      );
    } else if (order.orderStatus === "Shipped") {
      return (
        <>
          <option className="fw-bold" value="Received">
            Received
          </option>
        </>
      );
    }
  };

  return (
    <tr>
      <td>
        <div className="fw-bold text-secondary">{order.orderId}</div>
        <div className="order-date-sm">
          {new Date(order.payment.payedAt).toLocaleDateString()}
        </div>
      </td>
      <td className="display-payedAt">
        {new Date(order.payment.payedAt).toLocaleDateString()}
      </td>
      <td className="d-flex justify-content-center align-items-center">
        {edit && (
          <div className=" edit-order-status-select-container d-flex align-items-center justify-content-center">
            <div
              onClick={() => {
                setEdit(false);
              }}
              className="update-status-icons  back-order-status-icon-container"
            >
              <i className="mx-2 fa-sm fas fa-times"></i>
            </div>
            <select
              onChange={(e) => {
                setUpdateOrderStatusErrorLoading({
                  ...updateOrderStatusErrorLoading,
                  errorMessage: "",
                });
                setStatus(e.target.value);
              }}
              className="form-select edit-order-status-select checkout-input"
              value={status}
            >
              <>
                {" "}
                <option selected className="text-secondary">
                  Choose a new status...
                </option>
                {selectStatusOptions()}
              </>
            </select>
            <div
              onClick={() => {
                setEdit(false);
                updatingOrderStatus(
                  order._id,
                  order.orderId,
                  status,
                  order.email
                );
              }}
              className=" update-status-icons check-update-order-status-icon-container"
            >
              <i className="mx-2 fa-sm fas fa-check"></i>
            </div>
          </div>
        )}
        {!edit && (
          <div
            className="order-status-container d-flex align-items-center justify-content-between"
            style={statusColor(order.orderStatus)}
          >
            {order.orderStatus}
            {order.orderStatus !== "Received" && (
              <i
                onClick={() => {
                  setEdit(true);
                }}
                className="mx-2 fas fa-lg fa-edit edit-order-status-icon"
              ></i>
            )}
            {order.orderStatus === "Received" && (
              <i className="mx-3 fas fa-lg fa-check"></i>
            )}
          </div>
        )}
      </td>
    </tr>
  );
};

export default OrderComponent;
