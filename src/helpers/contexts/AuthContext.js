import { createContext, useState, useEffect, useContext } from "react";
import { logout } from "../storage&cookies/storage&cookies";
import {
  isAuthenticated,
  getLocalStorage,
} from "../storage&cookies/storage&cookies";
import { WishListContext } from "./WishListContext";
import { CartContext } from "./CartContext";
import { updateEmail, updateUsername } from "../../api/auth";
import validator from "validator";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { favoriteProdList } = useContext(WishListContext);
  const { cartProdList } = useContext(CartContext);
  const [cartProd, setCartProd] = cartProdList;
  const [favoriteProd, setFavoriteprod] = favoriteProdList;

  const [isAuth, setIsAuth] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    image: "",
    role: "",
  });

  const [updateAccountData, setUpdateAccountData] = useState({
    successMessage: "",
    errorMessage: "",
    loading: false,
  });

  // UPDATE EMAIL

  const updatingEmail = (email) => {
    if (isAuthenticated()) {
      if (!email) {
        setUpdateAccountData({
          ...updateAccountData,
          errorMessage: "Email field is required",
        });
      } else if (!validator.isEmail(email)) {
        setUpdateAccountData({
          ...updateAccountData,
          errorMessage: "Invalid Email",
        });
      } else {
        setUpdateAccountData({ ...updateAccountData, loading: true });
        let data = { email: email };
        updateEmail(data)
          .then((response) => {
            setUpdateAccountData({
              ...updateAccountData,
              successMessage: response.data.successMessage,
              loading: false,
            });
            setTimeout(() => {
              logout();
              window.location.assign("/sign-in");
            }, 2000);
          })
          .catch((error) => {
            if (error.response.status === 409) {
              setUpdateAccountData({
                ...updateAccountData,
                errorMessage: "This email address already exists",
                loading: false,
              });
            } else {
              setUpdateAccountData({
                ...updateAccountData,
                errorMessage: error.toString(),
                loading: false,
              });
            }
          });
      }
    }
  };

  //UPDATE USERNAME

  const updatingUsername = (username) => {
    if (isAuthenticated()) {
      if (!username) {
        setUpdateAccountData({
          ...updateAccountData,
          errorMessage: "Username field is required",
        });
      } else {
        setUpdateAccountData({ ...updateAccountData, loading: true });
        let data = { username: username };
        updateUsername(data)
          .then((response) => {
            setUpdateAccountData({
              ...updateAccountData,
              successMessage: response.data.successMessage,
              loading: false,
            });
            setTimeout(() => {
              logout();
              window.location.assign("/sign-in");
            }, 2000);
          })
          .catch((error) => {
            setUpdateAccountData({
              ...updateAccountData,
              errorMessage: error.toString(),
              loading: false,
            });
          });
      }
    }
  };
  //AUTH MANAGEMENT

  const handleLogout = () => {
    logout();
    setIsAuth(false);
    setProfileData({
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      image: "",
      role: "",
    });
    setFavoriteprod({
      ...favoriteProd,
      wishlistItems: getLocalStorage("wishlistGuest"),
    });
    setCartProd({ ...cartProd, cartListItems: getLocalStorage("cartGuest") });
    window.location.reload();
  };

  const manageAuthState = () => {
    if (isAuthenticated()) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  };

  const manageUserData = () => {
    if (isAuthenticated()) {
      setProfileData({
        username: isAuthenticated().username,
        firstName: isAuthenticated().firstName || "",
        lastName: isAuthenticated().lastName || "",
        email: isAuthenticated().email,
        image: isAuthenticated().userImage || "",
        role: isAuthenticated().role,
      });
    }
  };

  useEffect(() => {
    manageAuthState();
    manageUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth: [isAuth, setIsAuth],
        user: [profileData, setProfileData],
        updatingAccountData: [updateAccountData, setUpdateAccountData],
        updatingEmail,
        updatingUsername,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
