import { createContext, useState, useEffect } from "react";
import { fetchProducts } from "../../api/product";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState({
    product: [],
    count: 0,
    totalProducts: [],
    errorMessage: "",
    successMessage: "",
    loading: false,
  });

  //MANAGE FILTER, SORTING AND PAGINATION STATE

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriesFilter, setCategoriesFilter] = useState("");
  const [sort, setSort] = useState({
    date: "DateDESC",
  });

  const fetchProd = (searchTerm, categoriesFilter, sort, page, limit = 9) => {
    setProducts({ ...products, loading: true });
    window.scrollTo(0, 0);
    fetchProducts(
      searchTerm,
      categoriesFilter,
      sort[Object.keys(sort)[0]],
      page,
      limit
    )
      .then((response) => {
        setProducts({
          ...products,
          product: response.data.products,
          count: response.data.count,
          totalProducts: response.data.totalProducts,
          errorMessage: "",
          loading: false,
        });
        setPages(response.data.pages);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setProducts({
            ...products,
            errorMessage: "Products not found",
            loading: false,
          });
        } else {
          setProducts({
            ...products,
            errorMessage: error.toString(),
            loading: false,
          });
        }
        setPages(1);
      });
  };

  useEffect(() => {
    fetchProd(searchTerm, categoriesFilter, sort, page);
  }, [searchTerm, categoriesFilter, sort, page, pages]);

  return (
    <ProductContext.Provider
      value={{
        productList: [products, setProducts],
        settingPage: [page, setPage],
        settingPages: [pages, setPages],
        settingSearchTerm: [searchTerm, setSearchTerm],
        settingCategoriesFilter: [categoriesFilter, setCategoriesFilter],
        settingSort: [sort, setSort],
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
