import React, { useContext, useState, useEffect } from "react";
import HeaderUI from "./HeaderUI";
import { AuthContext } from "../../helpers/contexts/AuthContext";
import { SidebarContext } from "../../helpers/contexts/SidebarContext";
import { CartContext } from "../../helpers/contexts/CartContext";
import { WishListContext } from "../../helpers/contexts/WishListContext";
import { fetchProducts } from "../../api/product";
import SearchResultsComponent from "./search-results-component/SearchResultsComponent";

const Header = () => {
  const { user, handleLogout, auth } = useContext(AuthContext);
  const { sidebar } = useContext(SidebarContext);
  const { cartProdList } = useContext(CartContext);
  const { favoriteProdList } = useContext(WishListContext);
  const [isSidebarOpen, setIsSidebarOpen] = sidebar;
  const [isAuth] = auth;
  const [profileData] = user;

  const [cartProd, setCartProd] = cartProdList;
  const [favoriteProd] = favoriteProdList;

  const handleSidebarOpening = (e) => {
    console.log(e.target);
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [searchProdResult, setSearchProdResult] = useState({
    products: [],
    errorMessage: "",
    loading: false,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [categoriesFilter, setCategoriesFilter] = useState("");
  const [sort, setSort] = useState({
    date: -1,
  });

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchProdHeader = (
    searchTerm,
    categoriesFilter,
    sort,
    page,
    limit = 50
  ) => {
    setSearchProdResult({ ...searchProdResult, loading: true });
    fetchProducts(
      searchTerm,
      categoriesFilter,
      sort[Object.keys(sort)[0]],
      page,
      limit
    )
      .then((response) => {
        setSearchProdResult({
          ...searchProdResult,
          products: response.data.products,
          errorMessage: "",
          loading: false,
        });
        setPages(response.data.pages);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setSearchProdResult({
            ...searchProdResult,
            errorMessage: "Products not found",
            loading: false,
          });
        } else {
          setSearchProdResult({
            ...searchProdResult,
            errorMessage: error.toString(),
            loading: false,
          });
        }
        setPages(1);
      });
  };

  useEffect(() => {
    console.log(searchProdResult.products);
  }, [searchProdResult.products]);

  useEffect(() => {
    fetchProdHeader(searchTerm, categoriesFilter, sort, page);
  }, [searchTerm, categoriesFilter, sort, page, pages]);

  useEffect(() => {
    const searchResContainer = document.querySelector(
      ".search-results-container"
    );
    document.addEventListener("click", (e) => {
      if (e.target.contains(searchResContainer)) return;
      else setSearchTerm("");
    });
  }, []);

  return (
    <>
      <HeaderUI
        isAuth={isAuth}
        profileData={profileData}
        handleLogout={handleLogout}
        handleSidebarOpening={handleSidebarOpening}
        favoriteProd={favoriteProd}
        cartProd={cartProd}
        handleChange={handleChange}
        searchTerm={searchTerm}
      />
      {searchTerm && (
        <SearchResultsComponent
          searchProdResult={searchProdResult}
          searchTerm={searchTerm}
        />
      )}
    </>
  );
};

export default Header;
