import React from "react";
import { useContext } from "react";
import { useParams } from "react-router";
import { ProductContext } from "../../helpers/contexts/ProductContext";
import { ReviewContext } from "../../helpers/contexts/ReviewContext";
import AddReviewUI from "./AddReviewUI";

const AddReview = () => {
  const { productList } = useContext(ProductContext);
  const { addingReview, addReviewMsgData, removeReviewMsgData } =
    useContext(ReviewContext);

  const [products] = productList;
  const { totalProducts } = products;

  const [addReviewMsg, setAddReviewMsg] = addReviewMsgData;
  const [removeReviewMsg, setRemoveReviewMsg] = removeReviewMsgData;
  const { errorMessage, successMessage, loading } = addReviewMsg;

  const { reviewProd } = useParams();

  return (
    <AddReviewUI
      reviewProd={reviewProd}
      totalProducts={totalProducts}
      addingReview={addingReview}
      errorMessage={errorMessage}
      successMessage={successMessage}
      loading={loading}
      addReviewMsg={addReviewMsg}
      setAddReviewMsg={setAddReviewMsg}
      removeReviewMsg={removeReviewMsg}
    />
  );
};

export default AddReview;
