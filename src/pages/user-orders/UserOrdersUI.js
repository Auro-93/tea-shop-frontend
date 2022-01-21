import React from "react";
import OrderComponent from "./order-component/OrderComponent";
import { Header, Footer, Pagination, Loading } from "../../components";

import "./style.css";

const UserOrdersUI = ({
  filteredOrders,
  setOrderList,
  orderList,
  toggleBuyAgain,
  toggleBuyAgainFunc,
  addingOrderUser,
  addItemsToCartUser,
  settingPages,
  settingPage,
  settingStatus,
  settingSearchTerm,
  settingSort,
  cartProdList,
  userReviews,
}) => {
  const [page, setPage] = settingPage;
  const [pages] = settingPages;
  const [sort, setSort] = settingSort;
  const [status, setStatus] = settingStatus;
  const [searchTerm, setSearchTerm] = settingSearchTerm;

  const [cartProd, setCartProd] = cartProdList;

  let orderStatus = [
    {
      status: "All",
      class: "all",
    },
    {
      status: "Processing",
      class: "processing",
    },
    {
      status: "Processed",
      class: "processed",
    },
    {
      status: "Shipped",
      class: "shipped",
    },
    {
      status: "Received",
      class: "received",
    },
  ];
  let sortingOptions = [
    {
      option: "Newest",
      icon1: "far fa-calendar-alt",
      icon2: "fas fa-long-arrow-alt-down",
    },
    {
      option: "Oldest",
      icon1: "far fa-calendar-alt",
      icon2: "fas fa-long-arrow-alt-up",
    },
  ];
  const customStyle = { backgroundColor: "rgba(255,255,255,0.8" };

  return (
    <div className="max-width-container d-flex flex-column min-vh-100 position-relative">
      {orderList.loading && <Loading style={customStyle} />}
      {cartProd.loading && <Loading />}
      <Header />

      <div className=" user-orders-page-container container-fluid">
        <div className="container-fluid user-orders-main-container">
          <div className="user-orders-filters-container">
            {toggleBuyAgain && (
              <div
                onClick={toggleBuyAgainFunc}
                className="buy-again-back-icon-container"
              >
                <i className="fas fa-7x fa-arrow-left"></i>
              </div>
            )}

            {/******** FILTERS **********/}

            {!toggleBuyAgain && (
              <div className="user-order-query-container">
                <input
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                  value={searchTerm}
                  type="search"
                  placeholder="Product name..."
                />
                <div className="order-status-container">
                  {orderStatus.map((el) => (
                    <div
                      key={el.status}
                      className={`order-status ${el.class}`}
                      onClick={() => {
                        el.status === "All"
                          ? setStatus("")
                          : setStatus(el.status);
                        setPage(1);
                      }}
                    >
                      {el.status}
                    </div>
                  ))}
                </div>
                <>
                  {sortingOptions.map((el) => (
                    <div
                      key={el.option}
                      className="sort"
                      onClick={() => {
                        el.option === "Newest" ? setSort(-1) : setSort(1);
                      }}
                    >
                      <i className={el.icon1}></i>
                      <i className={el.icon2}></i>
                      {el.option}
                    </div>
                  ))}
                </>
              </div>
            )}
          </div>

          <div className="user-orders-orderlist-container">
            <h4 className="user-orderlist-title">ORDER HISTORY</h4>
            {!toggleBuyAgain && (
              <Pagination page={page} pages={pages} changePage={setPage} />
            )}
            {filteredOrders && filteredOrders.length === 0 && (
              <p className="p-3">Orders not found</p>
            )}
            <div className="order-card-grid-container grid-col-2">
              {filteredOrders &&
                filteredOrders.length > 0 &&
                filteredOrders.map((order) => (
                  <OrderComponent
                    key={order._id}
                    order={order}
                    toggleBuyAgain={toggleBuyAgain}
                    toggleBuyAgainFunc={toggleBuyAgainFunc}
                    addingOrderUser={addingOrderUser}
                    addItemsToCartUser={addItemsToCartUser}
                    setOrderList={setOrderList}
                    userReviews={userReviews}
                  />
                ))}
            </div>
            {!toggleBuyAgain && (
              <Pagination page={page} pages={pages} changePage={setPage} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserOrdersUI;
