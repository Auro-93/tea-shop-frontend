import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { Header, Footer, Loading } from "../../components";
import ReviewComponent from "./review-component/ReviewComponent";
import Alert from "../../helpers/alert/Alert";

const UserReviewsUI = ({
  totalProducts,
  userReviews,
  removingReview,
  removeReviewMsg,
  settingSort,
  settingRating,
  settingLimit,
}) => {
  const { reviewsPerPage } = userReviews;

  const [rating, setRating] = settingRating;
  const [sort, setSort] = settingSort;
  const [limit, setLimit] = settingLimit;

  //MANAGE SELECT REVIEW CATEGORY

  const reviewCategories = [
    "Very dissatisfied : 1",
    "Dissatisfied : 2",
    "Quite satisfied : 3",
    "Satisfied : 4",
    "Very satisfied : 5",
  ];

  const sortingOptions = ["Newest Reviews", "Oldest Reviews"];

  return (
    <div className="max-width-container d-flex flex-column min-vh-100 position-relative">
      <Header />
      <h4 className="text-center p-3 wishlist-title mb-1">
        <span>{userReviews.count}</span>
        {userReviews.count === 1 ? " Review" : " Reviews"}
      </h4>
      {removeReviewMsg.errorMsg && (
        <Alert
          alertType="alert-danger"
          message={removeReviewMsg.errorMessage}
        />
      )}
      {userReviews.errorMessage && reviewsPerPage.length > 0 && (
        <Alert alertType="alert-danger" message={userReviews.errorMessage} />
      )}
      <div className="user-reviews-page-container container-fluid">
        {userReviews.totalReviews.length === 0 ? (
          <div className="no-reviews-container d-flex flex-column align-items-center justify-content-center">
            <i className="fas fa-2x fa-star"></i>
            <p className="text-secondary">No Reviews found</p>
            <Link to="/" className="go-back-to-shop">
              Go back to Shop Page
            </Link>
          </div>
        ) : (
          <div className="user-reviews-form-container">
            <div className="all-reviews-filter-container">
              <div className="all-reviews-filter1-container">
                <div> Filter by rating:</div>
                <select
                  value={rating}
                  onChange={(e) => {
                    e.target.value === "All"
                      ? setRating("")
                      : setRating(e.target.value);
                  }}
                  className="custom-select"
                >
                  <option>All</option>
                  {reviewCategories.map((review, index) => (
                    <option key={index}>{review}</option>
                  ))}
                </select>
              </div>
              <div className="all-reviews-filter1-container">
                <div>Sort By:</div>
                <select
                  onChange={(e) => {
                    e.target.value == "Newest Reviews"
                      ? setSort(-1)
                      : setSort(1);
                  }}
                  className="custom-select"
                >
                  {sortingOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {reviewsPerPage &&
              reviewsPerPage.length > 0 &&
              reviewsPerPage.map((review) => (
                <ReviewComponent
                  key={review.reviewId}
                  review={review}
                  totalProducts={totalProducts}
                  removingReview={removingReview}
                  username={false}
                />
              ))}
            {reviewsPerPage.length === 0 && (
              <div className="py-4 d-flex justify-content-center">
                <p>Reviews not found</p>
              </div>
            )}
            {reviewsPerPage.length !== userReviews.limitedCount && (
              <div className="py-4">
                <button
                  onClick={() => {
                    setLimit((previous) => (previous += 2));
                  }}
                  className="btn btn-lg custom-button standard-primary-button"
                >
                  Load More...
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {removeReviewMsg.loading && <Loading />}
      {userReviews.loading && userReviews.totalReviews.length > 0 && (
        <Loading />
      )}
      <Footer />
    </div>
  );
};

export default UserReviewsUI;
