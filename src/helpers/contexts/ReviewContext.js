import { createContext, useState, useEffect } from "react";
import { isAuthenticated } from "../storage&cookies/storage&cookies";
import {
  getProductReviews,
  getUserReviews,
  addReview,
  removeReview,
} from "../../api/review";

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  //MANAGE ALL PRODUCT REVIEWS

  const [allReviews, setAllReviews] = useState({
    reviewsPerPage: [],
    totalReviews: [],
    count: 0,
    limitedCount: 0,
    averageRating: 0,
    errorMessage: "",
    loading: false,
  });

  //MANAGE  USER REVIEWS

  const [userReviews, setUserReviews] = useState({
    reviewsPerPage: [],
    totalReviews: [],
    count: 0,
    averageVote: 0,
    successMessage: "",
    errorMessage: "",
    loading: false,
  });

  //MANAGE ADD REVIEW MSG
  const [addReviewMsg, setAddReviewMsg] = useState({
    loading: false,
    successMessage: "",
    errorMessage: "",
  });

  //MANAGE REMOVE REVIEW MSG
  const [removeReviewMsg, setRemoveReviewMsg] = useState({
    loading: false,
    errorMessage: "",
    successMessage: "",
  });

  //MANAGE FILTER, SORTING AND PAGINATION STATE FOR USER REVIEWS

  const [limit, setLimit] = useState(2);
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState(-1);

  //GET ALL PRODUCT REVIEWS FUNCTION

  const gettingProductReviews = (product, rating, sort, limit) => {
    setAllReviews({ ...allReviews, loading: true });
    getProductReviews(product, rating, sort, limit)
      .then((response) => {
        setAllReviews({
          ...allReviews,
          totalReviews: response.data.totalReviews,
          reviewsPerPage: response.data.reviews,
          count: response.data.count,
          limitedCount: response.data.limitedCount,
          averageRating: response.data.averageRating,
          loading: false,
        });
      })
      .catch((error) => {
        setAllReviews({
          ...allReviews,
          errorMessage: error.toString(),
          loading: false,
        });
      });
  };

  //GET USER REVIEWS FUNCTION

  const gettingUserReviews = (rating, sort, limit) => {
    setUserReviews({ ...userReviews, loading: true });
    getUserReviews(rating, sort, limit)
      .then((response) => {
        setUserReviews({
          ...userReviews,
          totalReviews: response.data.totalReviews,
          reviewsPerPage: response.data.reviewsPerPage,
          count: response.data.count,
          limitedCount: response.data.limitedCount,
          loading: false,
        });
      })
      .catch((error) => {
        setUserReviews({
          ...userReviews,
          errorMessage: error.toString(),
          loading: false,
        });
      });
  };

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 0) {
      gettingUserReviews(rating, sort, limit);
    }
  }, [rating, sort, limit]);

  //ADD REVIEW FUNCTION

  const addingReview = (
    productId,
    productName,
    productSlug,
    username,
    rating,
    title,
    content
  ) => {
    if (rating === 0 || !content || !title || !username) {
      window.scrollTo(0, 0);
      setAddReviewMsg({
        ...addReviewMsg,
        errorMessage: "All fields are required",
      });
    } else {
      setAddReviewMsg({ ...addReviewMsg, loading: true });
      let data = {
        productId: productId,
        productName: productName,
        productSlug: productSlug,
        username: username,
        rating: rating,
        title: title,
        content: content,
      };
      addReview(data)
        .then((response) => {
          window.scrollTo(0, 0);
          setAddReviewMsg({
            ...addReviewMsg,
            loading: false,
            successMessage: response.data.successMessage,
            errorMessage: "",
          });
          setTimeout(() => {
            window.location.assign("/user/dashboard/reviews/reviews-list");
          }, 1000);
        })
        .catch((error) => {
          window.scrollTo(0, 0);
          if (error.response.status === 409) {
            setAddReviewMsg({
              ...addReviewMsg,
              loading: false,
              errorMessage: "You have already reviewed this product",
              successMessage: "",
            });
          } else {
            setAddReviewMsg({
              ...addReviewMsg,
              loading: false,
              errorMessage: error.toString(),
              successMessage: "",
            });
          }
        });
    }
  };

  //REMOVE REVIEW FUNCTION

  const removingReview = (reviewId) => {
    if (isAuthenticated().role === 0) {
      setRemoveReviewMsg({ ...removeReviewMsg, loading: true });
      let data = { reviewId: reviewId };
      removeReview(data)
        .then((response) => {
          window.scrollTo(0, 0);
          setRemoveReviewMsg({
            ...removeReviewMsg,
            successMessage: response.data.successMessage,
            errorMessage: "",
            loading: false,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((error) => {
          window.scrollTo(0, 0);
          setRemoveReviewMsg({
            ...removeReviewMsg,
            successMessage: "",
            errorMessage: error.toString(),
            loading: false,
          });
        });
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        allReviewsData: [allReviews, setAllReviews],
        userReviewsData: [userReviews, setUserReviews],
        addReviewMsgData: [addReviewMsg, setAddReviewMsg],
        removeReviewMsgData: [removeReviewMsg, setRemoveReviewMsg],
        gettingProductReviews,
        addingReview,
        removingReview,
        settingRating: [rating, setRating],
        settingSort: [sort, setSort],
        settingLimit: [limit, setLimit],
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
