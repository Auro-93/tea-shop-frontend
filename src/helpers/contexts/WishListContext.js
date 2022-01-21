import { createContext, useState, useEffect } from "react";
import {
  isAuthenticated,
  getLocalStorage,
  setLocalStorage,
} from "../storage&cookies/storage&cookies";
import {
  updateWishlistUser,
  getWishlistUser,
  updateWishlistGuest,
  getWishlistGuest,
} from "../../api/wishlist";

export const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  //WISHLIST STATE

  const [favoriteProd, setFavoriteProd] = useState({
    wishlistItems: [],
    totalWishlist: [],
    count: 0,
    errorMessage: "",
    loading: false,
  });

  //SESSION ID FOR GUESTS

  const [wishlistSessionId, setWishlistSessionId] = useState("");

  // WHISLIST TOAST STATE

  const [toastWishListProd, setToastWishListProd] = useState({
    prodAddedOrRemoved: null,
    added: null,
    hidden: null,
    loading: false,
  });

  //PAGINATION, FILTER AND SORTING STATES

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [sort, setSort] = useState(-1);
  const [searchTerm, setSearchTerm] = useState("");

  //GET WISHLIST USER FUNCTION

  const gettingWishlistUser = (searchTerm, sort, page) => {
    setFavoriteProd({ ...favoriteProd, loading: true });
    window.scrollTo(0, 0);
    getWishlistUser(searchTerm, sort, page)
      .then((response) => {
        setFavoriteProd({
          ...favoriteProd,
          wishlistItems: response.data.wishlistItems,
          count: response.data.count,
          totalWishlist: response.data.totalWishlistItems,
          loading: false,
          errorMessage: "",
        });
        setPages(response.data.pages);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setFavoriteProd({
            ...favoriteProd,
            errorMessage: "No product found",
            loading: false,
          });
        } else {
          setFavoriteProd({
            ...favoriteProd,
            errorMessage: error.toString(),
            loading: false,
          });
        }
        setPages(1);
      });
  };

  // GET WISHLIST GUEST FUNCTION

  const gettingWishlistGuest = (searchTerm, sort, page) => {
    let data = { sessionId: wishlistSessionId };
    setFavoriteProd({ ...favoriteProd, loading: true });
    window.scrollTo(0, 0);
    getWishlistGuest(data, searchTerm, sort, page)
      .then((response) => {
        setFavoriteProd({
          ...favoriteProd,
          wishlistItems: response.data.wishlistItems,
          count: response.data.count,
          totalWishlist: response.data.totalWishlistItems,
          loading: false,
          errorMessage: "",
        });
        setPages(response.data.pages);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setFavoriteProd({
            ...favoriteProd,
            errorMessage: "No product found",
            loading: false,
          });
        } else {
          setFavoriteProd({
            ...favoriteProd,
            errorMessage: error.toString(),
            loading: false,
          });
        }
        setPages(1);
      });
  };

  //UPDATE WISHLIST GUEST

  const updatingWishlistGuest = (
    prodId,
    prodName,
    prodSlug,
    prodPrice,
    prodDiscount,
    prodImg,
    sessionId = wishlistSessionId
  ) => {
    let date = new Date();
    let favItem = {
      _id: prodId,
      name: prodName,
      slug: prodSlug,
      date: date,
      price: prodPrice,
      discount: prodDiscount,
      image: prodImg,
    };
    let data = { favItem: favItem, sessionId: sessionId };

    setToastWishListProd({
      ...toastWishListProd,
      loading: true,
    });
    setFavoriteProd({
      ...favoriteProd,
      loading: true,
    });

    //UPDATE FAVLIST IN BACKEND

    updateWishlistGuest(data)
      .then((response) => {
        setToastWishListProd({
          prodAddedOrRemoved: response.data.prodAddedOrRemoved,
          added: response.data.added,
          hidden: response.data.hidden,
          loading: false,
        });
        setFavoriteProd({
          ...favoriteProd,
          totalWishlist: response.data.favoriteList,
          count: response.data.count,
          loading: false,
        });
        if (response.data.sessionId) {
          console.log(response.data.sessionId);
          setLocalStorage("wishlistSessionId", response.data.sessionId);
        }
        setTimeout(() => {
          setToastWishListProd({
            prodAddedOrRemoved: "",
            added: "",
            hidden: true,
            loading: false,
          });
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        setFavoriteProd({
          ...favoriteProd,
          errorMessage: error.toString(),
          loading: false,
        });
        setToastWishListProd({
          prodAddedOrRemoved: "",
          added: "",
          hidden: true,
          loading: false,
        });
      });
  };

  //UPDATE WISHLIST USER

  const updatingWishlistUser = (
    prodId,
    prodName,
    prodSlug,
    prodPrice,
    prodDiscount,
    prodImg
  ) => {
    let date = new Date();
    let favItem = {
      _id: prodId,
      name: prodName,
      slug: prodSlug,
      date: date,
      price: prodPrice,
      discount: prodDiscount,
      image: prodImg,
    };
    let data = { favItem: favItem };

    setToastWishListProd({
      ...toastWishListProd,
      loading: true,
    });

    setFavoriteProd({
      ...favoriteProd,
      loading: true,
    });

    //UPDATE FAVLIST IN BACKEND

    updateWishlistUser(data)
      .then((response) => {
        setToastWishListProd({
          prodAddedOrRemoved: response.data.prodAddedOrRemoved,
          added: response.data.added,
          hidden: response.data.hidden,
          loading: false,
        });
        setFavoriteProd({
          ...favoriteProd,
          totalWishlist: response.data.favoriteList,
          count: response.data.count,
          loading: false,
        });
        setTimeout(() => {
          setToastWishListProd({
            prodAddedOrRemoved: "",
            added: "",
            hidden: true,
            loading: false,
          });
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        setFavoriteProd({
          ...favoriteProd,
          errorMessage: error.toString(),
          loading: false,
        });
        setToastWishListProd({
          prodAddedOrRemoved: "",
          added: "",
          hidden: true,
          loading: false,
        });
      });
  };

  //MANAGE WISHLIST TOAST CLOSURE

  const handleToastWishListClick = () => {
    setToastWishListProd({
      prodAddedOrRemoved: "",
      added: "",
      hidden: true,
      loading: false,
    });
  };

  // GETTTING WISHLIST USER

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 0) {
      gettingWishlistUser(searchTerm, sort, page);
    }
  }, [page, sort, searchTerm, pages]);

  // GETTING WISHLIST GUEST

  useEffect(() => {
    if (!isAuthenticated()) {
      gettingWishlistGuest(searchTerm, sort, page);
    }
  }, [wishlistSessionId, page, sort, searchTerm, pages]);

  //GETTING WISHLIST GUEST SESSION ID STORAGE

  useEffect(() => {
    if (!isAuthenticated()) {
      let wishlistStorage = getLocalStorage("wishlistSessionId");
      if (wishlistStorage) {
        setWishlistSessionId(wishlistStorage);
      } else {
        setWishlistSessionId("");
      }
    }
  }, []);

  return (
    <WishListContext.Provider
      value={{
        favoriteProdList: [favoriteProd, setFavoriteProd],
        wishlistSessionIdData: [wishlistSessionId, setWishlistSessionId],
        ToastWishListManagement: [toastWishListProd, setToastWishListProd],
        settingPage: [page, setPage],
        settingPages: [pages, setPages],
        settingSort: [sort, setSort],
        settingSearchTerm: [searchTerm, setSearchTerm],
        updatingWishlistGuest,
        updatingWishlistUser,
        handleToastWishListClick,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};
