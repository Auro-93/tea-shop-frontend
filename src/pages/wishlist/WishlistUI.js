import React from "react";
import "animate.css";
import { Link } from "react-router-dom";
import {
  Footer,
  Header,
  AddToCartModal,
  Toast_WishList_Cart,
  Pagination,
  Loading,
} from "../../components";
import "./style.css";
import WishlistComponent from "./wishlist-component/WishlistComponent";
import Alert from "../../helpers/alert/Alert";

const WishlistUI = ({
  manageWishListUpdateClick,
  favoriteProd,
  toastWishListProd,
  handleToastWishListClick,
  handleToastCartClick,
  cartProd,
  selectedProdModal,
  setSelectedProdModal,
  product,
  toastCartProd,
  settingPage,
  settingPages,
  settingSort,
  settingSearchTerm,
}) => {
  const { loading, errorMessage } = favoriteProd;
  const [page, setPage] = settingPage;
  const [pages, setPages] = settingPages;
  const [sort, setSort] = settingSort;
  const [searchTerm, setSearchTerm] = settingSearchTerm;

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
    <div className="max-width-container d-flex flex-column min-vh-100">
      <Header />
      <div className=" wishlist-page container-fluid px-0">
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
        <h4 className="text-center p-3 wishlist-title">
          <span>{favoriteProd.count}</span>
          {favoriteProd.count === 1 ? " item" : " items"} in Wishlist
        </h4>

        <div className="wishlist-page">
          {!favoriteProd.wishlistItems ||
            (favoriteProd.wishlistItems.length == 0 && (
              <div className="no-wishlist-container d-flex flex-column align-items-center justify-content-center">
                <i className="far fa-2x fa-heart empty-heart"></i>
                <p className="text-secondary">No items in the Wishlist</p>
                <Link to="/" className="go-back-to-shop">
                  Go back to Shop Page
                </Link>
              </div>
            ))}

          {favoriteProd.wishlistItems.length != 0 &&
            (errorMessage == "No product found" || !errorMessage) &&
            !loading && (
              <>
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
                {<Pagination page={page} pages={pages} changePage={setPage} />}

                {errorMessage == "No product found" ? (
                  <h5 className="p-5 text-center">{errorMessage} </h5>
                ) : (
                  <div className="d-flex justify-content-center">
                    <div className="wishlist-items-container">
                      {favoriteProd.wishlistItems.map((prod) => (
                        <div
                          key={prod.name}
                          className="wishlist-item-container"
                        >
                          <WishlistComponent
                            prod={prod}
                            manageWishListUpdateClick={
                              manageWishListUpdateClick
                            }
                            favoriteProd={favoriteProd}
                            cartProd={cartProd}
                            setSelectedProdModal={setSelectedProdModal}
                            product={product}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Pagination page={page} pages={pages} changePage={setPage} />
              </>
            )}

          {errorMessage && errorMessage !== "No product found" && (
            <Alert alertType="alert-danger" message={errorMessage} />
          )}
          {favoriteProd.loading && <Loading />}
        </div>
      </div>
      <Footer />
      <AddToCartModal
        prod={selectedProdModal}
        product={product}
        toastCartProd={toastCartProd}
      />
    </div>
  );
};

export default WishlistUI;
