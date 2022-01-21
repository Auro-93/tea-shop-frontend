import { createContext, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { ProductContext } from "./ProductContext";
import {
  addToCartUser,
  removeFromCartUser,
  getCartItemsUser,
  getCartItemsGuest,
  removeFromCartGuest,
  addToCartGuest,
} from "../../api/cart";
import {
  isAuthenticated,
  getLocalStorage,
  setLocalStorage,
} from "../storage&cookies/storage&cookies";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { productList } = useContext(ProductContext);
  const [products, setProducts] = productList;

  let history = useHistory();

  const [cartProd, setCartProd] = useState({
    cartListItems: [],
    count: 0,
    totalCart: [],
    totalPrice: 0,
    errorMessage: "",
    loading: false,
    updatedTime: "",
  });

  const [errorQt, setErrorQt] = useState();

  const [toastCartProd, setToastCartProd] = useState({
    prodAddedOrRemoved: null,
    quantity: null,
    added: null,
    hidden: null,
    loading: false,
  });

  // MANAGE STATE OF GUEST CART SESSION ID

  const [cartGuestId, setCartGuestId] = useState("");

  //PAGINATION, SORTING AND FILTER STATES

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [sort, setSort] = useState(-1);
  const [searchTerm, setSearchTerm] = useState("");

  // GET CART LIST GUEST FUNCTION
  const gettingCartListGuest = (searchTerm, sort, page) => {
    let data = { sessionId: cartGuestId };
    setCartProd({ ...cartProd, loading: true });
    window.scrollTo(0, 0);
    getCartItemsGuest(data, searchTerm, sort, page)
      .then((response) => {
        setCartProd({
          cartListItems: response.data.cartList,
          count: response.data.count,
          totalCart: response.data.totalCart.cartItems,
          totalPrice: response.data.totalPrice,
          updatedTime: response.data.updatedTime,
          loading: false,
          errorMessage: "",
        });
        setPages(response.data.pages);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setCartProd({
            ...cartProd,
            errorMessage: "No product found",
            loading: false,
          });
        } else {
          setCartProd({
            ...cartProd,
            errorMessage: error.toString(),
            loading: false,
            totalPrice: 0,
          });
        }
        setPages(1);
      });
  };

  //GET CART LIST USER FUNCTION

  const gettingCartListUser = (searchTerm, sort, page) => {
    setCartProd({ ...cartProd, loading: true });
    window.scrollTo(0, 0);
    getCartItemsUser(searchTerm, sort, page)
      .then((response) => {
        setCartProd({
          cartListItems: response.data.cartList,
          count: response.data.count,
          totalCart: response.data.totalCart.cartItems,
          totalPrice: response.data.totalPrice,
          updatedTime: response.data.updatedTime,
          loading: false,
          errorMessage: "",
        });
        setPages(response.data.pages);
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          setCartProd({
            ...cartProd,
            errorMessage: "No product found",
            loading: false,
          });
        } else {
          setCartProd({
            ...cartProd,
            errorMessage: error.toString(),
            loading: false,
          });
        }
        setPages(1);
      });
  };

  // UPDATE CART LIST GUEST

  const addItemsToCartGuest = (
    prodId,
    prodName,
    prodSlug,
    prodImg,
    prodQuantity,
    prodPrice,
    prodDiscount,
    sessionId = cartGuestId
  ) => {
    if (prodQuantity == 0) {
      setErrorQt("Set a valid quantity.");
    } else {
      let cartItem = {
        _id: prodId,
        name: prodName,
        slug: prodSlug,
        image: prodImg,
        quantity: prodQuantity,
        price: prodPrice,
        discount: prodDiscount,
      };
      let data = { cartItem: cartItem, sessionId: sessionId };

      setToastCartProd({
        ...toastCartProd,
        loading: true,
      });

      /// update cart items in backend
      addToCartGuest(data)
        .then((response) => {
          setToastCartProd({
            prodAddedOrRemoved: response.data.prodAddedOrRemoved,
            added: response.data.added,
            quantity: response.data.quantity,
            hidden: response.data.hidden,
            loading: false,
          });
          setCartProd({
            ...cartProd,
            updatedTime: response.data.updatedTime,
            loading: false,
            errorMessage: "",
          });
          setErrorQt("");
          if (response.data.sessionId) {
            setLocalStorage("cartSessionId", response.data.sessionId);
          }
          setTimeout(() => {
            setToastCartProd({
              prodAddedOrRemoved: "",
              quantity: "",
              added: "",
              hidden: true,
              loading: false,
            });
            window.location.assign("/cart");
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          setToastCartProd({
            prodAddedOrRemoved: "",
            quantity: "",
            added: "",
            hidden: true,
            loading: false,
          });
          setCartProd({ ...cartProd, errorMessage: error.toString() });
          setErrorQt("");
        });
    }
  };

  //UPDATE CART LIST USER

  const addItemsToCartUser = (
    prodId,
    prodName,
    prodSlug,
    prodImg,
    prodQuantity,
    prodPrice,
    prodDiscount
  ) => {
    if (prodQuantity == 0) {
      setErrorQt("Set a valid quantity.");
    } else {
      let cartItem = {
        _id: prodId,
        name: prodName,
        slug: prodSlug,
        image: prodImg,
        quantity: prodQuantity,
        price: prodPrice,
        discount: prodDiscount,
      };
      let data = { cartItem: cartItem };

      setToastCartProd({
        ...toastCartProd,
        loading: true,
      });

      setCartProd({ ...cartProd, loading: true });

      // update cart items in backend
      addToCartUser(data)
        .then((response) => {
          setToastCartProd({
            prodAddedOrRemoved: response.data.prodAddedOrRemoved,
            added: response.data.added,
            quantity: response.data.quantity,
            hidden: response.data.hidden,
            loading: false,
          });

          setCartProd({
            ...cartProd,
            updatedTime: response.data.updatedTime,
            loading: false,
            errorMessage: "",
          });
          setErrorQt("");

          setTimeout(() => {
            setToastCartProd({
              prodAddedOrRemoved: "",
              quantity: "",
              added: "",
              hidden: true,
              loading: false,
            });
            window.location.assign("/cart");
          }, 2000);
        })
        .catch((error) => {
          setToastCartProd({
            prodAddedOrRemoved: "",
            quantity: "",
            added: "",
            hidden: true,
            loading: false,
          });
          setCartProd({ ...cartProd, errorMessage: error.toString() });
          setErrorQt("");
        });
    }
  };

  //REMOVE ITEM FROM CART LIST GUEST

  const removingFromCartGuest = (prodId, prodQt, sessionId = cartGuestId) => {
    let cartItem = { _id: prodId, quantity: prodQt };
    let data = { cartItem: cartItem, sessionId: sessionId };

    setToastCartProd({
      ...toastCartProd,
      loading: true,
    });

    /////remove cart item in backend

    removeFromCartGuest(data)
      .then((response) => {
        setCartProd({
          ...cartProd,

          updatedTime: response.data.updatedTime,
          loading: false,
        });

        setToastCartProd({
          prodAddedOrRemoved: "",
          quantity: "",
          added: "",
          hidden: true,
          loading: false,
        });
        window.location.assign("/cart");
      })
      .catch((error) => {
        setToastCartProd({
          prodAddedOrRemoved: "",
          quantity: "",
          added: "",
          hidden: true,
          loading: false,
        });
        setCartProd({
          ...cartProd,
          loading: false,
          errorMessage: error.toString(),
        });
      });
  };

  // REMOVE ITEM FROM CART LIST USER

  const removingFromCartUser = (prodId, prodQt) => {
    let cartItem = { _id: prodId, quantity: prodQt };
    let data = { cartItem: cartItem };

    setToastCartProd({
      ...toastCartProd,
      loading: true,
    });

    /////remove cart item in backend

    removeFromCartUser(data)
      .then((response) => {
        setCartProd({
          ...cartProd,
          updatedTime: response.data.updatedTime,
          loading: false,
        });

        setToastCartProd({
          prodAddedOrRemoved: "",
          quantity: "",
          added: "",
          hidden: true,
          loading: false,
        });
        window.location.assign("/cart");
      })
      .catch((error) => {
        setToastCartProd({
          prodAddedOrRemoved: "",
          quantity: "",
          added: "",
          hidden: true,
          loading: false,
        });
        setCartProd({
          ...cartProd,
          loading: false,
          errorMessage: error.toString(),
        });
      });
  };

  //MANAGE CART TOAST CLOSURE

  const handleToastCartClick = () => {
    setToastCartProd({
      prodAddedOrRemoved: "",
      quantity: "",
      added: "",
      hidden: true,
      loading: false,
    });
  };

  //GET CART LIST USER

  useEffect(() => {
    setErrorQt("");
    if (isAuthenticated() && isAuthenticated().role == 0) {
      gettingCartListUser(searchTerm, sort, page);
    }
  }, [page, sort, searchTerm, pages]);

  //GET CART LIST GUEST

  useEffect(() => {
    if (!isAuthenticated()) {
      gettingCartListGuest(searchTerm, sort, page);
    }
  }, [cartGuestId, page, sort, searchTerm, pages]);

  //GET AND SET GUEST CART SESSION ID // INTERVAL TO CLEAR CARTLIST ITEMS IN FRONTEND AFTER AN 1 HOUR

  useEffect(() => {
    if (!isAuthenticated()) {
      let cartStorage = getLocalStorage("cartSessionId");
      if (cartStorage) {
        setCartGuestId(cartStorage);
      } else {
        setCartGuestId("");
      }
    }
    let interval;
    if (
      (isAuthenticated() && isAuthenticated().role == 0) ||
      !isAuthenticated()
    ) {
      if (cartProd.updatedTime) {
        interval = setInterval(() => {
          const updatedTime = new Date(cartProd.updatedTime).getTime();
          const thisTime = new Date().getTime();
          const total = thisTime - updatedTime;
          const hours = Math.floor(total / 1000) / 3600;
          console.log(hours);
          if (hours === 1 || hours > 1) {
            setCartProd({ ...cartProd, cartListItems: [], updatedTime: "" });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        }, 1000);
      }
    }
    return () => {
      clearInterval(interval);
    };
  }, [cartProd]);

  return (
    <CartContext.Provider
      value={{
        cartProdList: [cartProd, setCartProd],
        ToastCartManagement: [toastCartProd, setToastCartProd],
        error: [errorQt, setErrorQt],
        guestCartSessionId: [cartGuestId, setCartGuestId],
        settingPage: [page, setPage],
        settingPages: [pages, setPages],
        settingSort: [sort, setSort],
        settingSearchTerm: [searchTerm, setSearchTerm],
        handleToastCartClick,
        addItemsToCartUser,
        addItemsToCartGuest,
        removingFromCartUser,
        removingFromCartGuest,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
