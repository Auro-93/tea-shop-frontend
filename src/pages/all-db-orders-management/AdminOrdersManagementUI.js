import React from "react";
import "animate.css";
import {
  Header,
  Footer,
  Sidebar,
  Layer,
  LogoutModal,
  Pagination,
  Loading,
} from "../../components";
import AdminElements from "../../components/sidebar/admin-elements/AdminElements";
import OrderComponent from "./order-component/OrderComponent";
import "./style.css";
import Alert from "../../helpers/alert/Alert";

const AdminOrdersManagementUI = ({
  adminUpdateOrderManageError,
  handleLogout,
  updatingOrderStatus,
  allCustomers,
  totalProdSaled,
  totalIncome,
  allOrderLists,
  page,
  setPage,
  pages,
  setSort,
  setStatus,
  searchTerm,
  setSearchTerm,
}) => {
  const [updateOrderStatusErrorLoading, setUpdateOrderStatusErrorLoading] =
    adminUpdateOrderManageError;

  //DATA FOR FILTERS DROPDOWN
  const statusArr = ["Processing", "Processed", "Shipped", "Received", "All"];
  const dateArr = ["Newest", "Oldest"];

  //DATA FOR ORDER STATISTICS CARDS

  const statCard = [
    {
      class: "stat-customer-card-bg ",
      icon: "fas fa-3x fa-users",
      span1: "Customers: ",
      span2: allCustomers.customers,
    },
    {
      class: "stat-total-orders-card-bg",
      icon: "far fa-3x fa-credit-card",
      span1: "Orders total: ",
      span2: allOrderLists.count,
    },
    {
      class: "stat-total-products-card-bg",
      icon: "fas fa-3x fa-coffee",
      span1: "Products saled: ",
      span2: totalProdSaled.prodSaled,
    },
    {
      class: "stat-total-income-card-bg",
      icon: "fas fa-3x fa-euro-sign",
      span1: "Total income: ",
      span2: totalIncome.income,
    },
  ];

  return (
    <div className="max-width-container d-flex flex-column min-vh-100 position-relative">
      {updateOrderStatusErrorLoading.loading && <Loading />}
      {allOrderLists.loading && <Loading />}
      <Header />
      <Sidebar title="ADMIN" children={<AdminElements />} />
      <div className=" admin-orders-container container-fluid d-flex flex-column justify-content-center align-items-center">
        {/***********ADMIN ORDER STATISTICS CONTAINER  **************/}

        <div className="container-fluid admin-order-statistics-main-container mb-4">
          {statCard.map((stat, index) => (
            <div
              key={index}
              className={`${stat.class} admin-order-statistics-card-bg animate__animated animate__faster animate__fadeIn`}
            >
              <div className="admin-order-statistics-card d-flex flex-column align-items-center justify-content-center">
                <div className="admin-order-stat-card-icon-container mb-4 ">
                  <i className={stat.icon}></i>
                </div>
                <span>{stat.span1} </span>
                <span>{stat.span2}</span>
              </div>
            </div>
          ))}
        </div>

        {/****************UPDATING ORDER STATUS TABLE ********************************/}

        <Pagination page={page} pages={pages} changePage={setPage} />
        {updateOrderStatusErrorLoading.errorMessage && (
          <Alert
            customClass="w-100 text-center"
            alertType="alert-danger"
            message={updateOrderStatusErrorLoading.errorMessage}
          />
        )}

        <table className="table table-light table-hover table-admin-orders animate__animated animate__faster">
          <thead className="table-primary text-center">
            <tr>
              <th
                className="py-3 table-title text-center"
                scope="col"
                colSpan="3"
              >
                <div className="d-flex align-items-center justify-content-around">
                  <div className="admin-order-filters-icons-container">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      id="admin-order-date-filters"
                    >
                      <i className=" fa-lg far fa-calendar-alt" />
                    </div>

                    <div className="dropdown-admin-order-filters animate__animated animate__zoomIn animate__faster">
                      {dateArr.map((date) => (
                        <div
                          key={date}
                          onClick={() => {
                            date === "Newest" ? setSort(-1) : setSort(1);
                          }}
                        >
                          {date}
                        </div>
                      ))}
                    </div>
                  </div>

                  <input
                    type="search"
                    placeholder="Order ID..."
                    className="py-1 px-2 admin-orders-search-input"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setPage(1);
                    }}
                  />

                  <div className="admin-order-filters-icons-container">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      id="admin-order-status-filters"
                    >
                      <i className="fas fa-filter" />
                    </div>

                    <div className="dropdown-admin-order-filters animate__animated animate__zoomIn animate__faster">
                      {statusArr.map((status) => (
                        <div
                          key={status}
                          onClick={() => {
                            status === "All"
                              ? setStatus("")
                              : setStatus(status);
                            setPage(1);
                          }}
                        >
                          {status}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          </thead>

          <thead className="table-secondary text-center">
            <tr>
              <th className="text-secondary" scope="col">
                ID
              </th>
              <th className="display-payedAt text-secondary" scope="col">
                Payed at
              </th>
              <th className="text-secondary" scope="col">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {allOrderLists.orders.length === 0 && (
              <tr>
                <td>#</td>
                <td>#</td>
                <td className="td-invisible">#</td>
              </tr>
            )}
            {allOrderLists.orders.length > 0 &&
              allOrderLists.orders.map((order) => (
                <OrderComponent
                  key={order._id}
                  order={order}
                  updatingOrderStatus={updatingOrderStatus}
                  setUpdateOrderStatusErrorLoading={
                    setUpdateOrderStatusErrorLoading
                  }
                  updateOrderStatusErrorLoading={
                    setUpdateOrderStatusErrorLoading
                  }
                />
              ))}
          </tbody>
        </table>
        <Pagination page={page} pages={pages} changePage={setPage} />
      </div>

      <Footer />
      <LogoutModal handleLogout={handleLogout} />
      <Layer />
    </div>
  );
};

export default AdminOrdersManagementUI;
