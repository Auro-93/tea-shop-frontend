import React, { useState } from "react";
import dotenv from "dotenv";
import StarsRating from "stars-rating";
import { Header, Footer, Loading } from "../../components";
import Alert from "../../helpers/alert/Alert";
import "animate.css";
import "./style.css";

const AddReviewUI = ({
  reviewProd,
  totalProducts,
  addingReview,
  errorMessage,
  successMessage,
  loading,
  addReviewMsg,
  setAddReviewMsg,
  removeReviewMsg,
}) => {
  //DOTENV CONFIG
  dotenv.config();
  const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

  let product =
    totalProducts && totalProducts.find((el) => el.name === reviewProd);

  const [reviewFormData, setReviewFormData] = useState({
    username: "",
    rating: 0,
    title: "",
    content: "",
  });

  const ratingDescription = () => {
    if (reviewFormData.rating !== 0) {
      switch (reviewFormData.rating) {
        case 1:
          return "Very dissatisfied";
        case 2:
          return "Dissatisfied";
        case 3:
          return "Quite satisfied";
        case 4:
          return "Satisfied";
        case 5:
          return "Very satisfied";
      }
    }
  };

  const ratingChanged = (newRating) => {
    setAddReviewMsg({ ...addReviewMsg, errorMessage: "" });
    setReviewFormData({ ...reviewFormData, rating: newRating });
  };

  return (
    <div className="max-width-container d-flex flex-column min-vh-100 position-relative">
      <Header />
      <div className="add-review-page-container container-fluid">
        <div className="add-review-form-container">
          <div className="add-review-form-item-1">
            <img
              className="add-review-img"
              src={`${baseUrl}/api/uploads/${product?.image?.filename}`}
            />
            <h5 className="add-review-prod-name">{product?.name}</h5>
          </div>
          <div className="add-review-form-item-2">
            {successMessage && (
              <div className="mb-2">
                <Alert alertType="alert-success" message={successMessage} />
              </div>
            )}

            {errorMessage && (
              <div className="mb-2">
                <Alert alertType="alert-danger" message={errorMessage} />
              </div>
            )}

            <form>
              <div className="row mb-3">
                <div className=" stars-add-review-container">
                  <StarsRating
                    count={5}
                    value={reviewFormData.rating}
                    onChange={ratingChanged}
                    half={false}
                    size={40}
                    color2={"var(--primary2)"}
                  />
                  {reviewFormData.rating !== 0 && (
                    <span className="add-review-rating-description">
                      {ratingDescription()}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <label
                  htmlFor="username"
                  className="form-label username-add-review"
                >
                  Username
                  <span>
                    ( this username will appear publicly in the product review
                    list ):
                  </span>
                </label>

                <input
                  value={reviewFormData.username}
                  onChange={(e) => {
                    setAddReviewMsg({ ...addReviewMsg, errorMessage: "" });
                    setReviewFormData({
                      ...reviewFormData,
                      username: e.target.value,
                    });
                  }}
                  name="username"
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Choose a username for your review..."
                />
              </div>
              <div className="row mb-3">
                <label htmlFor="title" className="form-label title-add-review">
                  Title :
                </label>

                <input
                  value={reviewFormData.title}
                  onChange={(e) => {
                    setAddReviewMsg({ ...addReviewMsg, errorMessage: "" });
                    setReviewFormData({
                      ...reviewFormData,
                      title: e.target.value,
                    });
                  }}
                  name="title"
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Choose a title for your review..."
                />
              </div>
              <div className="row mb-3">
                <label htmlFor="content" className="form-label">
                  Content :
                </label>

                <textarea
                  value={reviewFormData.content}
                  onChange={(e) => {
                    setAddReviewMsg({ ...addReviewMsg, errorMessage: "" });
                    setReviewFormData({
                      ...reviewFormData,
                      content: e.target.value,
                    });
                  }}
                  maxLength="20000"
                  name="content"
                  className="form-control"
                  id="content"
                  placeholder="Let us know what you think about this product..."
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  addingReview(
                    product._id,
                    product.name,
                    product.slug,
                    reviewFormData.username,
                    reviewFormData.rating,
                    reviewFormData.title,
                    reviewFormData.content
                  );
                  setReviewFormData({
                    rating: 0,
                    username: "",
                    title: "",
                    content: "",
                  });
                }}
                className="btn btn-lg custom-button standard-primary-button"
              >
                Add Review
              </button>
            </form>
          </div>
        </div>
      </div>
      {loading && <Loading />}
      {removeReviewMsg.loading && <Loading />}
      <Footer />
    </div>
  );
};

export default AddReviewUI;
