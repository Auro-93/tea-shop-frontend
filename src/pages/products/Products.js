import React, { useContext, useState } from "react";
import ProductsUI from "./ProductsUI";
import { ProductContext } from "../../helpers/contexts/ProductContext";
import { WishListContext } from "../../helpers/contexts/WishListContext";
import { CartContext } from "../../helpers/contexts/CartContext";
import { CategoryContext } from "../../helpers/contexts/CategoryContext";
import { isAuthenticated } from "../../helpers/storage&cookies/storage&cookies";

const Products = () => {
  const {
    productList,
    settingPage,
    settingPages,
    settingSearchTerm,
    settingSort,
    settingCategoriesFilter,
  } = useContext(ProductContext);
  const { ToastCartManagement, handleToastCartClick } = useContext(CartContext);
  const [toastCartProd, setToastCartProd] = ToastCartManagement;
  const {
    favoriteProdList,
    ToastWishListManagement,
    updatingWishlistUser,
    updatingWishlistGuest,
    handleToastWishListClick,
  } = useContext(WishListContext);
  const { categoryList } = useContext(CategoryContext);

  const [products, setProducts] = productList;
  const [favoriteProd, setFavoriteProd] = favoriteProdList;
  const [toastWishListProd, setToastWishListProd] = ToastWishListManagement;
  const [selectedProdModal, setSelectedProdModal] = useState("");
  const [categories] = categoryList;

  const manageWishListUpdateClick = (
    prodId,
    prodName,
    prodSlug,
    prodPrice,
    prodDiscount,
    prodImg
  ) => {
    if (isAuthenticated() && isAuthenticated().role === 0) {
      updatingWishlistUser(
        prodId,
        prodName,
        prodSlug,
        prodPrice,
        prodDiscount,
        prodImg
      );
    }
    if (!isAuthenticated()) {
      updatingWishlistGuest(
        prodId,
        prodName,
        prodSlug,
        prodPrice,
        prodDiscount,
        prodImg
      );
    }
  };

  return (
    <ProductsUI
      products={products}
      settingPage={settingPage}
      settingPages={settingPages}
      settingSearchTerm={settingSearchTerm}
      settingCategoriesFilter={settingCategoriesFilter}
      settingSort={settingSort}
      favoriteProd={favoriteProd}
      manageWishListUpdateClick={manageWishListUpdateClick}
      handleToastWishListClick={handleToastWishListClick}
      toastWishListProd={toastWishListProd}
      setSelectedProdModal={setSelectedProdModal}
      selectedProdModal={selectedProdModal}
      toastCartProd={toastCartProd}
      handleToastCartClick={handleToastCartClick}
      categories={categories}
    />
  );
};

export default Products;
