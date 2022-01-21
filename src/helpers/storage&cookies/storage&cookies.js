import Cookies from "js-cookie";

//LOCAL STORAGE

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const deleteLocalStorage = (key) => {
  localStorage.removeItem(key);
};

//COOKIES

export const setCookies = (key, value) => {
  Cookies.set(key, value, { expires: 1 });
};

export const getCookies = (key) => {
  return Cookies.get(key);
};

export const deleteCookies = (key) => {
  Cookies.remove(key);
};

//AUTHENTICATION

export const setAuth = (token, user) => {
  if (getCookies("token") && getLocalStorage("user")) {
    deleteCookies("token");
    deleteLocalStorage("user");
  }
  setCookies("token", token);
  setLocalStorage("user", user);
};

//ISAUTH

export const isAuthenticated = () => {
  if (getCookies("token") && getLocalStorage("user")) {
    return getLocalStorage("user");
  } else {
    return false;
  }
};

//LOGOUT

export const logout = () => {
  if (getCookies("token") && getLocalStorage("user")) {
    deleteCookies("token");
    deleteLocalStorage("user");
  }
};
