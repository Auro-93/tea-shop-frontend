import React from "react";
import Alert from "../../helpers/alert/Alert";

const Toast_WishList_Cart = ({
  toastProd,
  handleToastClick,
  list,
  customClass,
  icon,
}) => {
  return (
    <>
      {toastProd.prodAddedOrRemoved ? (
        <Alert
          message={
            toastProd.added === true ? (
              <>
                {icon}
                <span
                  style={{
                    color: "var(--secondary)",
                    fontWeight: "bold",
                    letterSpacing: "0.1rem",
                  }}
                >
                  {toastProd.prodAddedOrRemoved}
                </span>
                {toastProd.quantity && (
                  <span
                    style={{
                      color: "var(--primary2)",
                      fontWeight: "bold",
                      letterSpacing: "0.1rem",
                    }}
                  >
                    {` (x${toastProd.quantity}) `}
                  </span>
                )}
                <span> has been added to your {list}</span>
              </>
            ) : (
              <>
                {icon}
                <span
                  style={{
                    color: "var(--secondary)",
                    fontWeight: "bold",
                    letterSpacing: "0.1rem",
                  }}
                >
                  {toastProd.prodAddedOrRemoved}
                </span>{" "}
                has been removed by your {list}.
              </>
            )
          }
          alertType="alert-warning"
          customClass={customClass}
          handleClick={handleToastClick}
        />
      ) : null}
    </>
  );
};

export default Toast_WishList_Cart;
