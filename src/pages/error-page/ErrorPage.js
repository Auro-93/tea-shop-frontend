import React, { useContext } from "react";
import { SuccessOrErrorPageLayout } from "../../components";
import { OrderContext } from "../../helpers/contexts/OrderContext";

const ErrorPage = () => {
  const { manageCheckoutSuccess } = useContext(OrderContext);
  const [checkoutSuccess] = manageCheckoutSuccess;
  const { errorMessage, successMessage } = checkoutSuccess;
  return (
    <SuccessOrErrorPageLayout
      errorMessage={errorMessage}
      successMessage={successMessage}
    />
  );
};

export default ErrorPage;
