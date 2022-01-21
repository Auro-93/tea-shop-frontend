import React from "react";
import dotenv from "dotenv";
import StarsRating from "stars-rating";

const ReviewComponent = ({
  review,
  totalProducts,
  removingReview,
  username,
}) => {
  //DOTENV CONFIG
  dotenv.config();
  const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

  let reviewProd =
    totalProducts && totalProducts.find((el) => el.name === review.productName);

  const ratingDescription = () => {
    if (review.rating !== 0) {
      switch (review.rating) {
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

  return (
    <div className="review-component-card">
      {username === false && (
        <div className="review-component-card-item-1">
          <img
            src={`${baseUrl}/api/uploads/${reviewProd?.image?.filename}`}
            className="review-card-component-img "
          />
          <h5 className="review-card-component-product-name">
            {review.productName}
          </h5>
        </div>
      )}

      <div className="review-component-card-item-2">
        <div className=" stars-add-review-container">
          <StarsRating
            count={5}
            value={review.rating}
            half={false}
            size={40}
            color2={"var(--primary2)"}
            edit={false}
          />
          {review.rating !== 0 && (
            <span className="add-review-rating-description">
              {ratingDescription()}
            </span>
          )}
        </div>

        <div className="review-component-content-paragraph">
          <h5>{review.title}</h5>
          <p>{review.content}</p>
          {username && (
            <p className="review-username">{review.reviewUsername}</p>
          )}
        </div>
      </div>

      {removingReview !== false && (
        <div
          onClick={() => {
            removingReview(review.reviewId);
          }}
          className="remove-review-item"
        >
          <i className="far fa-2x fa-trash-alt"></i>
        </div>
      )}

      <div className="review-date-item">
        {new Date(review.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default ReviewComponent;
