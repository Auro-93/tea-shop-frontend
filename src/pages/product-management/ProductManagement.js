import React, { useContext, useEffect, useState } from "react";
import ProductManagementUI from "./ProductManagementUI";
import { AuthContext } from "../../helpers/contexts/AuthContext";
import { CategoryContext } from "../../helpers/contexts/CategoryContext";
import { ProductContext } from "../../helpers/contexts/ProductContext";
import { deleteProduct } from "../../api/product";
import { useHistory } from "react-router";

const ProductManagement = () => {
  const { handleLogout } = useContext(AuthContext);
  const { categoryList } = useContext(CategoryContext);
  const {
    productList,
    settingPage,
    settingPages,
    settingSearchTerm,
    settingSort,
  } = useContext(ProductContext);

  const [products, setProducts] = productList;
  const [page, setPage] = settingPage;
  const [pages, setPages] = settingPages;
  const [searchTerm, setSearchTerm] = settingSearchTerm;
  const [sort, setSort] = settingSort;

  const [categories] = categoryList;

  const [selectedProdEditModal, setSelectedProdEditModal] = useState({
    prod: "",
    edit: false,
  });

  const deletingProd = (prodId, prodImg) => {
    setProducts({ ...products, loading: true });
    let data = { prodId, prodImg };
    deleteProduct(data)
      .then((response) => {
        setProducts({
          ...products,
          successMessage: response.data.successMessage,
          loading: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        setProducts({
          ...products,
          errorMessage: error.toString(),
          loading: false,
        });
      });
  };

  const history = useHistory();

  useEffect(() => {
    return history.listen((location) => {
      setProducts({
        ...products,
        errorMessage: "",
        successMessage: "",
      });
      setPage(1);
      setSearchTerm("");
      setSort({ date: "DateDESC" });
    });
  }, [history]);

  useEffect(() => {
    setPage(1);
    setSearchTerm("");
    setSort({ date: "DateDESC" });
  }, []);

  return (
    <ProductManagementUI
      handleLogout={handleLogout}
      categories={categories}
      products={products}
      pages={pages}
      page={page}
      setPage={setPage}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      deletingProd={deletingProd}
      selectedProdEditModal={selectedProdEditModal}
      setSelectedProdEditModal={setSelectedProdEditModal}
    />
  );
};

export default ProductManagement;
