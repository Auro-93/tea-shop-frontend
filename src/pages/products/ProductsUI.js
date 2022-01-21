import React from "react";
import {
  Header,
  Footer,
  Sidebar,
  Layer,
  Toast_WishList_Cart,
  Loading,
  AddToCartModal,
  Pagination,
} from "../../components";
import ProductComponent from "./product-component/ProductComponent";
import "animate.css";
import "./style.css";
import ShopElements from "../../components/sidebar/shop-elements/ShopElements";

import Alert from "../../helpers/alert/Alert";

const ProductsUI = ({
  products,
  settingPage,
  settingPages,
  settingSearchTerm,
  settingCategoriesFilter,
  settingSort,
  toastWishListProd,
  handleToastWishListClick,
  handleToastCartClick,
  favoriteProd,
  manageWishListUpdateClick,
  setSelectedProdModal,
  selectedProdModal,
  toastCartProd,
  categories,
}) => {
  const { product, errorMessage, loading } = products;
  const { notEmptyCat } = categories;

  const [page, setPage] = settingPage;
  const [pages, setPages] = settingPages;
  const [searchTerm, setSearchTerm] = settingSearchTerm;
  const [categoriesFilter, setCategoriesFilter] = settingCategoriesFilter;
  const [sort, setSort] = settingSort;

  const showCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        showCategoryList(category.children, options);
      }
    }
    return options;
  };

  const sortingOptions = [
    "Newest Items",
    "Oldest Items",
    "Lowest Price",
    "Highest Price",
  ];

  const handleSortingChange = (e) => {
    switch (e.target.value) {
      case "Newest Items":
        setSort({ date: "DateDESC" });
        setPage(1);
        break;
      case "Oldest Items":
        setSort({ date: "DateASC" });
        setPage(1);
        break;
      case "Lowest Price":
        setSort({ price: "PriceASC" });
        setPage(1);
        break;
      case "Highest Price":
        setSort({ price: "PriceDESC" });
        setPage(1);
        break;

      default:
        setSort({ date: "DateDESC", price: false });

        break;
    }
  };

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

        <div className="products-page-filter-container">
          <input
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            value={searchTerm}
            type="search"
            placeholder="Product name..."
            autoFocus
          ></input>
          <div>
            <div> Categories:</div>
            <select
              value={categoriesFilter}
              onChange={(e) => {
                e.target.value === "All"
                  ? setCategoriesFilter("") && setSearchTerm("") && setPage(1)
                  : setCategoriesFilter(e.target.value) &&
                    setSearchTerm("") &&
                    setPage(1);
                setPage(1);
              }}
              className="custom-select"
            >
              <option>All</option>
              {showCategoryList(notEmptyCat).map((option) => (
                <option key={option.name} value={option._id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div>Sort By:</div>
            <select onChange={handleSortingChange} className="custom-select">
              {sortingOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {product.length !== 0 && (
          <div className="px-4">
            <Pagination page={page} pages={pages} changePage={setPage} />
          </div>
        )}
        {product && !errorMessage && (
          <div className="product-grid">
            {product.map((prod) => (
              <ProductComponent
                key={prod._id}
                prod={prod}
                manageWishListUpdateClick={manageWishListUpdateClick}
                favoriteProd={favoriteProd}
                toastWishListProd={toastWishListProd}
                setSelectedProdModal={setSelectedProdModal}
              />
            ))}
          </div>
        )}
        {errorMessage && errorMessage === "Products not found" && (
          <p className="text-center my-4">{errorMessage}</p>
        )}

        {product.length !== 0 && (
          <div className="px-4">
            <Pagination page={page} pages={pages} changePage={setPage} />
          </div>
        )}

        {errorMessage && errorMessage !== "Products not found" && (
          <Alert
            customClass="text-center"
            message={errorMessage}
            alertType="alert-danger"
          />
        )}

        {loading && <Loading />}
      </div>
      <AddToCartModal
        prod={selectedProdModal}
        product={product}
        toastCartProd={toastCartProd}
      />
      <Footer />
      <Layer />
    </div>
  );
};

export default ProductsUI;
