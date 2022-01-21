import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import { isAuthenticated } from "../../helpers/storage&cookies/storage&cookies";

const HeaderUI = ({
  isAuth,
  profileData,
  handleSidebarOpening,
  favoriteProd,
  cartProd,
  handleChange,

  searchTerm,
}) => {
  const showMobileNav = () => {
    return (
      <>
        <div className="navbar-mobile navbar-row">
          <div className="buttons-container d-flex align-items-center justify-content-center flex-wrap pt-3">
            <div>
              <Link
                to="/"
                onClick={handleSidebarOpening}
                className={
                  window.location.pathname === "/"
                    ? "navbar-toggler px-4 pt-3 active"
                    : "navbar-toggler px-4 pt-3"
                }
                id="mobile-nav-link-products"
              >
                <span className="shop">
                  <i className="fas fa-shopping-bag"></i>
                </span>
                <span>Shop</span>
              </Link>
            </div>
            {isAuthenticated() && isAuthenticated().role === 1 && (
              <div>
                <Link
                  to="/admin/dashboard/manage-categories"
                  className={
                    window.location.pathname ===
                    "/admin/dashboard/manage-categories"
                      ? "navbar-toggler list-nav-item px-4 pt-3 active"
                      : "navbar-toggler list-nav-item px-4 pt-3"
                  }
                >
                  <span className="manage-categories">
                    <i className="fas fa-project-diagram"></i>
                  </span>
                  <span>Categories</span>
                </Link>
              </div>
            )}
            {(!isAuthenticated() || isAuthenticated().role === 0) && (
              <div>
                <Link
                  to="/wishlist"
                  className={
                    window.location.pathname === "/wishlist"
                      ? "navbar-toggler list-nav-item px-4 pt-3 active"
                      : "navbar-toggler list-nav-item px-4 pt-3"
                  }
                >
                  <span className="wishlist">
                    <i className="fas fa-heart"></i>
                  </span>
                  <span>Wishlist</span>
                  {favoriteProd.count !== 0 && (
                    <div className="count-nav-item">
                      <span>{favoriteProd.count}</span>
                    </div>
                  )}
                </Link>
              </div>
            )}

            {(!isAuthenticated() || isAuthenticated().role === 0) && (
              <div>
                <Link
                  to="/cart"
                  className={
                    window.location.pathname === "/cart"
                      ? "navbar-toggler list-nav-item px-4 pt-3 active"
                      : "navbar-toggler list-nav-item px-4 pt-3"
                  }
                >
                  <span className="cart">
                    <i className="fas fa-shopping-cart"></i>
                  </span>
                  <span>Cart</span>
                  {cartProd.count !== 0 && (
                    <div className="count-nav-item">{cartProd.count}</div>
                  )}
                </Link>
              </div>
            )}

            {isAuthenticated() && isAuthenticated().role === 1 && (
              <div>
                <Link
                  to="/admin/dashboard/manage-products"
                  className={
                    window.location.pathname ===
                    "/admin/dashboard/manage-products"
                      ? "navbar-toggler list-nav-item px-4 pt-3 active"
                      : "navbar-toggler list-nav-item px-4 pt-3"
                  }
                >
                  <span className="manage-products">
                    <i className="fas fa-shopping-basket"></i>
                  </span>
                  <span>Products</span>
                </Link>
              </div>
            )}
            {(!isAuthenticated() || isAuthenticated().role === 0) && (
              <div>
                <Link
                  to="/contact-us"
                  className={
                    window.location.pathname === "/contact-us"
                      ? "navbar-toggler list-nav-item px-4 pt-3 active"
                      : "navbar-toggler list-nav-item px-4 pt-3"
                  }
                >
                  <span className="contact-us">
                    <i className="far fa-envelope"></i>
                  </span>
                  <span>Contact Us</span>
                </Link>
              </div>
            )}

            {isAuthenticated() && isAuthenticated().role === 1 && (
              <div>
                <Link
                  to="/admin/dashboard/manage-orders"
                  className={
                    window.location.pathname ===
                    "/admin/dashboard/manage-orders"
                      ? "navbar-toggler list-nav-item px-4 pt-3 active"
                      : "navbar-toggler list-nav-item px-4 pt-3"
                  }
                >
                  <span className="manage-orders">
                    <i className="fas fa-dollar-sign"></i>
                  </span>
                  <span>Orders</span>
                </Link>
              </div>
            )}

            <button
              className="navbar-toggler signin-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              {isAuth === false && (
                <Link className="sign-in-link" to="/sign-in">
                  <span className="sign-in mb-1">
                    <i className="fas fa-user"></i>
                  </span>
                  <span>Sign-In</span>
                </Link>
              )}
              {isAuth && (
                <Link
                  id="mobile-nav-link-user"
                  className="text-secondary sign-in-link d-flex justify-content-center align-items-center"
                  onClick={handleSidebarOpening}
                  to={
                    profileData?.role === 1
                      ? "/admin/dashboard"
                      : "/user/dashboard"
                  }
                >
                  {profileData.image.length !== 0 ? (
                    <div
                      className="profile-image m-0"
                      style={{ backgroundImage: `url('${profileData.image}')` }}
                    />
                  ) : null}
                  {profileData.image.length === 0 &&
                  profileData.firstName.length !== 0
                    ? profileData.firstName
                    : null}
                  {profileData.image.length === 0 &&
                  profileData.username.length !== 0
                    ? profileData.username
                    : null}
                </Link>
              )}
            </button>
          </div>

          <div className="form-container  px-4">
            <form className="mt-3  header-search-form" id="form-mobile">
              <input
                value={searchTerm}
                onChange={handleChange}
                className="form-control"
                type="search"
                placeholder="Search a product..."
                aria-label="Search"
              />
            </form>
          </div>
        </div>
      </>
    );
  };

  const showDesktopNav = () => {
    return (
      <>
        <div className="navbar-desktop navbar-row d-flex justify-content-between align-items-center pt-3 p-3 px-4 pb-2">
          <ul className="navbar-nav d-flex flex-row text-center">
            <li
              onClick={handleSidebarOpening}
              id="desktop-nav-link-products"
              className={
                window.location.pathname === "/"
                  ? "nav-item px-3 active"
                  : "nav-item px-3"
              }
            >
              <Link to="/" id="desktop-nav-link-products" className="nav-link">
                Shop
              </Link>
            </li>

            {(!isAuthenticated() || isAuthenticated().role === 0) && (
              <li
                className={
                  window.location.pathname === "/wishlist"
                    ? "nav-item px-3 list-nav-item active"
                    : "nav-item list-nav-item px-3"
                }
              >
                <Link to="/wishlist" className="nav-link">
                  Wishlist
                </Link>
                {favoriteProd.count !== 0 && (
                  <div className="count-nav-item">
                    <span>{favoriteProd.count}</span>
                  </div>
                )}
              </li>
            )}
            {(!isAuthenticated() || isAuthenticated().role === 0) && (
              <li
                className={
                  window.location.pathname === "/cart"
                    ? "nav-item px-3 list-nav-item active"
                    : "nav-item list-nav-item px-3"
                }
              >
                <Link to="/cart" className="nav-link">
                  Cart
                </Link>
                {cartProd.count !== 0 && (
                  <div className="count-nav-item">
                    <span>{cartProd.count}</span>
                  </div>
                )}
              </li>
            )}

            {isAuthenticated() && isAuthenticated().role === 1 && (
              <li
                className={
                  window.location.pathname ===
                  "/admin/dashboard/manage-categories"
                    ? "nav-item px-3 list-nav-item active"
                    : "nav-item list-nav-item px-3"
                }
              >
                <Link
                  to="/admin/dashboard/manage-categories"
                  className="nav-link"
                >
                  Manage Categories
                </Link>
              </li>
            )}
          </ul>

          <div className="form-container d-flex flex-fill px-4 mx-4">
            <form className="d-flex flex-fill header-search-form">
              <input
                value={searchTerm}
                onChange={handleChange}
                className="form-control"
                type="search"
                placeholder="Search a product..."
                aria-label="Search"
              />
            </form>
          </div>

          <ul className="navbar-nav d-flex flex-row text-center">
            {isAuthenticated() && isAuthenticated().role === 1 && (
              <li
                className={
                  window.location.pathname ===
                  "/admin/dashboard/manage-products"
                    ? "nav-item px-3 list-nav-item active"
                    : "nav-item list-nav-item px-3"
                }
              >
                <Link
                  to="/admin/dashboard/manage-products"
                  className="nav-link"
                >
                  Manage Products
                </Link>
              </li>
            )}
            {(!isAuthenticated() || isAuthenticated().role === 0) && (
              <li
                className={
                  window.location.pathname === "/contact-us"
                    ? "nav-item px-3 active"
                    : "nav-item px-3"
                }
              >
                <Link to="/contact-us" className="nav-link">
                  Contact Us
                </Link>
              </li>
            )}

            {isAuthenticated() && isAuthenticated().role === 1 && (
              <li
                className={
                  window.location.pathname === "/admin/dashboard/manage-orders"
                    ? "nav-item px-3 active"
                    : "nav-item px-3"
                }
              >
                <Link to="/admin/dashboard/manage-orders" className="nav-link">
                  Manage Orders
                </Link>
              </li>
            )}

            {isAuth && (
              <>
                <li
                  className="nav-item dropdown px-3"
                  onClick={handleSidebarOpening}
                >
                  <Link
                    id="desktop-nav-link-user"
                    className="nav-link  d-flex justify-content-center align-items-center"
                    to={
                      profileData?.role === 1
                        ? "/admin/dashboard"
                        : "/user/dashboard"
                    }
                  >
                    {profileData.image.length !== 0 ? (
                      <div
                        className="profile-image m-0"
                        style={{
                          backgroundImage: `url('${profileData.image}')`,
                        }}
                      />
                    ) : null}

                    {profileData.image.length === 0 &&
                    profileData.firstName.length !== 0
                      ? profileData.firstName
                      : null}
                    {profileData.image.length === 0 &&
                    profileData.username.length !== 0
                      ? profileData.username
                      : null}
                  </Link>
                </li>
              </>
            )}
            {isAuth === false && (
              <li className="nav-item px-3">
                <Link to="/sign-in" className="nav-link">
                  Sign-In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </>
    );
  };

  return (
    <>
      <header className="header">
        <nav className="navbar-expand-lg navbar-light navbar-custom pt-2">
          <div className="navbar-row d-flex justify-content-center align-items-center">
            <Logo className="logo-svg logo-svg-l" />
            <Link to="/" className="navbar-brand">
              <h1 className="logo ml-1">
                <span className="color-secondary-custom">Tea</span> Store
              </h1>
            </Link>
            <Logo className="logo-svg logo-svg-r" />
          </div>
          {showMobileNav()}
          {showDesktopNav()}
        </nav>
      </header>
    </>
  );
};

export default HeaderUI;
