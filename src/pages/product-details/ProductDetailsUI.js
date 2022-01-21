import React, { useState, useEffect } from "react";
import dotenv from "dotenv";
import StarsRating from "stars-rating";
import "animate.css";
import {
  Header,
  Footer,
  Sidebar,
  Layer,
  Toast_WishList_Cart,
  ZoomImgModal,
  InStockLabel,
  ItemQtInput,
  Loading,
} from "../../components";
import Alert from "../../helpers/alert/Alert";
import ShopElements from "../../components/sidebar/shop-elements/ShopElements";
import "./style.css";
import {
  calcDiscount,
  convertToEuros,
} from "../../helpers/misc-helper-functions/MiscHelperFunc";
import { isAuthenticated } from "../../helpers/storage&cookies/storage&cookies";
import ReviewComponent from "../user-reviews/review-component/ReviewComponent";

const ProductDetailsUI = (props) => {
  let {
    prod,
    totalProducts,
    favoriteProd,
    manageWishlistClick,
    toastWishListProd,
    handleToastWishListClick,
    prodQuantity,
    setProdQuantity,
    manageAddToCartClick,
    handleToastCartClick,
    toastCartProd,
    errorQt,
    setErrorQt,
    allReviews,

    setLimit,
    rewCategory,
    setRewCategory,

    setSort,
  } = props;

  //DOTENV CONFIG
  dotenv.config();
  const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

  const { totalWishlist } = favoriteProd;

  //MANAGE SEE PRODUCT REVIEWS
  const [seeReviews, setSeeReviews] = useState(false);

  const rating = allReviews && Number(allReviews.averageRating);

  const ratingDescription = () => {
    switch (true) {
      case rating >= 1 && rating <= 2:
        return "Very dissatisfied";
      case rating >= 2.1 && rating <= 3:
        return "Dissatisfied";
      case rating >= 3.1 && rating <= 4:
        return "Quite satisfied";
      case rating >= 4.1 && rating <= 4.5:
        return "Satisfied";
      case rating >= 4.6 && rating <= 5:
        return "Very satisfied";
    }
  };

  //MANAGE SELECT REVIEW CATEGORY

  const reviewCategories = [
    "Very dissatisfied : 1",
    "Dissatisfied : 2",
    "Quite satisfied : 3",
    "Satisfied : 4",
    "Very satisfied : 5",
  ];

  const sortingOptions = ["Newest Reviews", "Oldest Reviews"];

  //SCROLL TO REVIEWS CONTAINER IF IT IS VISIBLE

  let reviewsContainer;

  useEffect(() => {
    if (seeReviews) {
      window.scrollTo(0, document.body.scrollHeight / 2);
      reviewsContainer = document.querySelector(
        "#productDetails-reviews-container"
      );
      reviewsContainer.classList.add("animate__zoomInUp");
    }
  }, [seeReviews]);

  return (
    <div className="max-width-container d-flex flex-column min-vh-100">
      <Header />
      <Sidebar title="SHOP MENU" children={<ShopElements />} />
      <div className="products-page container-fluid px-0">
        <Toast_WishList_Cart
          toastProd={toastWishListProd}
          handleToastClick={handleToastWishListClick}
          list="Wishlist"
          customClass="wish-list-alert animate__animated animate__bounceInRight"
          icon={
            <i
              style={{ color: "var(--primary2)" }}
              className="fas fa-heart favorite-icon me-3"
            ></i>
          }
        />
        <Toast_WishList_Cart
          toastProd={toastCartProd}
          handleToastClick={handleToastCartClick}
          list="Cart"
          customClass="cart-list-alert animate__animated animate__bounceInRight"
          icon={
            <i
              style={{ color: "var(--primary2)" }}
              className="fas fa-cart-plus favorite-icon me-3"
            ></i>
          }
        />

        {prod && (
          <div className="prod-details-cards-container-margin profile-cards-container">
            <div className="productDetails-container">
              <div className="m-5 prod-details-img-container">
                <img
                  src={`${baseUrl}/api/uploads/${prod.image?.filename}`}
                  className="m-5 prod-details-img"
                />
                <div className="prod-image-layer">
                  <i
                    data-bs-toggle="modal"
                    data-bs-target="#zoommodal"
                    className="fas fa-2x fa-expand zoom-img-icon animate__animated animate__rubberBand"
                  />
                  {prod.discount != 0 && (
                    <div className="discount-stripe animate__animated animate__fadeInDown">
                      <span>{`Original price: ${convertToEuros(
                        prod.price
                      )}`}</span>
                      <span>{`Discount: ${prod.discount}%`}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="prod-details-info-container">
                <h2 className="prod-name">{prod.name}</h2>
                {allReviews.count > 0 && (
                  <>
                    <div className=" stars-add-review-container">
                      <StarsRating
                        count={5}
                        value={rating}
                        half={true}
                        size={40}
                        color2={"var(--primary2)"}
                        edit={false}
                      />
                      <span className="add-review-rating-description">
                        {ratingDescription()}
                      </span>
                    </div>
                    <p
                      onClick={() => {
                        setSeeReviews(true);
                      }}
                      className="reviews-count"
                    >
                      {allReviews.count}{" "}
                      <span>{allReviews.count > 1 ? "reviews" : "review"}</span>
                    </p>
                  </>
                )}

                <hr style={{ color: "var(--primary2)" }} />
                <InStockLabel
                  product={prod}
                  customClassContent="py-1 px-2 d-inline-block mb-3 h6"
                />
                <div className="prod-price">
                  {convertToEuros(calcDiscount(prod.price, prod.discount))}
                </div>
                <div className="categories-container mt-4">
                  {prod.categories.map((cat) => (
                    <span
                      key={cat.name}
                      className="text-secondary categories-element"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
                <p className="prod-description text-secondary">
                  {prod.description}
                </p>
                {(isAuthenticated().role == 0 || !isAuthenticated()) && (
                  <>
                    {totalWishlist &&
                    totalWishlist.find((item) => item._id == prod._id) ? (
                      <div
                        onClick={() => {
                          manageWishlistClick(
                            prod._id,
                            prod.name,
                            prod.slug,
                            prod.price,
                            prod.discount,
                            prod.image
                          );
                        }}
                        className="wishlist-btn"
                      >
                        <i
                          className={
                            toastWishListProd.loading
                              ? "far fa-lg fa-heart fav-icon animate__animated animate__rotateIn"
                              : "fas fa-lg fa-heart fav-icon"
                          }
                        />
                        <span>This item is in your Wishlist</span>
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          manageWishlistClick(
                            prod._id,
                            prod.name,
                            prod.slug,
                            prod.price,
                            prod.discount,
                            prod.image
                          );
                        }}
                        className="wishlist-btn"
                      >
                        <i
                          className={
                            toastWishListProd.loading
                              ? "far fa-lg fa-heart fav-icon animate__animated animate__rotateIn"
                              : "far fa-lg fa-heart fav-icon"
                          }
                        />
                        <span>Add this item to your Wishlist</span>
                      </div>
                    )}

                    {prod.quantity != 0 && (
                      <>
                        <div className="my-4 flex-form">
                          <div className="d-flex">
                            <ItemQtInput
                              uiProdDetails={true}
                              maxValue={prod.quantity}
                              inputClass="form-control quantity-input"
                              inputId="chooseProductQuantity"
                              prodQuantity={prodQuantity}
                              stockItem={prod}
                              setProdQuantity={setProdQuantity}
                              setErrorQt={setErrorQt}
                            />
                          </div>
                          <button
                            onClick={() => {
                              manageAddToCartClick(
                                prod._id,
                                prod.name,
                                prod.slug,
                                prod.image,
                                prodQuantity,
                                prod.price
                              );
                            }}
                            type="button"
                            className="add-to-cart-btn btn custom-button standard-secondary-button  d-flex justify-content-center align-items-center"
                          >
                            {toastCartProd.loading && (
                              <i className="fas fa-lg fa-cart-plus mx-3 animate__animated animate__rotateIn"></i>
                            )}
                            {!toastCartProd.loading && (
                              <>
                                <span>Add to Cart</span>
                                <i className="fas fa-lg fa-cart-plus mx-3"></i>
                              </>
                            )}
                          </button>
                        </div>
                        {errorQt && (
                          <Alert
                            customClass="text-center"
                            alertType="alert-danger"
                            message={errorQt}
                          />
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        {seeReviews && (
          <div
            id="productDetails-reviews-container"
            className="productDetails-reviews-container container-fluid d-flex justify-content-center animate__animated"
          >
            <div className="user-reviews-form-container">
              <i
                onClick={() => {
                  window.scrollTo(0, 0);
                  setSeeReviews(false);
                }}
                className="fas fa-2x fa-minus-square hide-all-reviews"
              ></i>
              <div className="all-reviews-filter-container">
                <div className="all-reviews-filter1-container">
                  <div> Filter by rating:</div>
                  <select
                    value={rewCategory}
                    onChange={(e) => {
                      e.target.value === "All"
                        ? setRewCategory("") && setLimit(2)
                        : setRewCategory(e.target.value) && setLimit(2);
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
              {allReviews.reviewsPerPage.length > 0 &&
                allReviews.reviewsPerPage.map((review) => (
                  <ReviewComponent
                    review={review}
                    key={review._id}
                    totalProducts={totalProducts}
                    removingReview={false}
                    username={true}
                  />
                ))}
              {allReviews.reviewsPerPage.length === 0 && (
                <div className="py-4 d-flex justify-content-center">
                  <p>Reviews not found</p>
                </div>
              )}
              {allReviews.reviewsPerPage.length !== allReviews.limitedCount && (
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
          </div>
        )}
      </div>
      <ZoomImgModal prod={prod} />
      {allReviews.loading && <Loading />}
      <Footer />
      <Layer />
    </div>
  );
};

export default ProductDetailsUI;
