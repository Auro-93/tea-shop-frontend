import React, { useContext } from "react";
import UserReviewsUI from "./UserReviewsUI";
import { ReviewContext } from "../../helpers/contexts/ReviewContext";
import { ProductContext } from "../../helpers/contexts/ProductContext";

const UserReviews = () => {
  const {
    userReviewsData,
    removingReview,
    removeReviewMsgData,
    settingRating,
    settingSort,
    settingLimit,
  } = useContext(ReviewContext);
  const { productList } = useContext(ProductContext);
  const [products, setProducts] = productList;
  const { totalProducts } = products;
  const [userReviews, setUserReviews] = userReviewsData;
  const [removeReviewMsg, setRemoveReviewMsg] = removeReviewMsgData;

  return (
    <UserReviewsUI
      userReviews={userReviews}
      removingReview={removingReview}
      totalProducts={totalProducts}
      removeReviewMsg={removeReviewMsg}
      setRemoveReviewMsg={setRemoveReviewMsg}
      settingRating={settingRating}
      settingSort={settingSort}
      settingLimit={settingLimit}
    />
  );
};

export default UserReviews;
