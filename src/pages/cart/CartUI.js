import React, { useState } from "react";
import "animate.css";
import { Link } from "react-router-dom";
import {
  Footer,
  Header,
  CheckoutSummary,
  AddToCartModal,
  Toast_WishList_Cart,
  Loading,
  Pagination,
} from "../../components";
import CartComponent from "./cart-component/CartComponent";
import "./style.css";
import Alert from "../../helpers/alert/Alert";

const CartUI = ({
  products,
  cartProd,
  removingFromCart,
  errorQt,
  setErrorQt,
  toastCartProd,
  handleToastCartClick,
  settingPages,
  settingPage,
  settingSearchTerm,
  settingSort,
}) => {
  const { cartListItems, loading, errorMessage, count } = cartProd;
  const [page, setPage] = settingPage;
  const [pages, setPages] = settingPages;
  const [searchTerm, setSearchTerm] = settingSearchTerm;
  const [sort, setSort] = settingSort;

  const [selectedProdModal, setSelectedProdModal] = useState("");

  let sortingOptions = [
    {
      option: "Newest",
      icon1: "far fa-calendar-alt",
      icon2: "fas fa-long-arrow-alt-down",
    },
    {
      option: "Oldest",
      icon1: "far fa-calendar-alt",
      icon2: "fas fa-long-arrow-alt-up",
    },
  ];

  return (
    <div className="max-width-container d-flex flex-column min-vh-100 cart-page">
      <Header />
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

      <div className="cartlist-container">
        <h4 className="text-center p-3 wishlist-title">
          <span>{count}</span>
          {count === 1 ? " item" : " items"} in Cart
        </h4>
        <Alert
          alertType="alert-secondary"
          message="Your Cart will be cleared within 1 hour if you don't proceed to checkout"
          customClass="alert-cart-checkout"
        />

        {cartListItems && cartListItems.length > 0 && (
          <div className="px-3">
            <Pagination page={page} pages={pages} changePage={setPage} />
          </div>
        )}
        <div className=" flex-cart-container container-fluid p-0">
          <div className="cartProd-container">
            {count === 0 && (
              <div className="d-flex flex-column align-items-center p-4">
                <i className="fas fa-2x fa-shopping-cart empty-cart"></i>
                <p className="text-secondary">No items in the Cart</p>
                <Link to="/" className="go-back-to-shop">
                  Go back to Shop Page
                </Link>
              </div>
            )}

            {cartListItems && cartListItems.length > 0 && (
              <div className="wishlist-cart-filter-container">
                <input
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                  value={searchTerm}
                  type="search"
                  placeholder="Product name..."
                  autoFocus
                />

                <div className="d-flex align-items-center">
                  {sortingOptions.map((el) => (
                    <div
                      key={el.option}
                      className="sort"
                      onClick={() => {
                        el.option === "Newest" ? setSort(-1) : setSort(1);
                      }}
                    >
                      <i className={el.icon1}></i>
                      <i className={el.icon2}></i>
                      {el.option}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {errorMessage && errorMessage === "No product found" && (
              <h5 className="p-5 text-center">{errorMessage} </h5>
            )}
            {errorMessage && errorMessage !== "No product found" && (
              <Alert alertType="alert-danger" message={errorMessage} />
            )}

            {cartListItems &&
              cartListItems.length > 0 &&
              !errorMessage &&
              cartListItems.map((item) => {
                return (
                  <CartComponent
                    key={item._id}
                    cartItem={item}
                    removingFromCart={removingFromCart}
                    errorQt={errorQt}
                    setErrorQt={setErrorQt}
                    products={products}
                    setSelectedProdModal={setSelectedProdModal}
                  />
                );
              })}
          </div>

          <CheckoutSummary
            cartListItems={cartListItems}
            checkoutBtnActive={true}
          />
        </div>

        {loading && <Loading />}

        {selectedProdModal && selectedProdModal.quantity > 0 && (
          <AddToCartModal
            product={products}
            prod={selectedProdModal}
            toastCartProd={toastCartProd}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CartUI;
