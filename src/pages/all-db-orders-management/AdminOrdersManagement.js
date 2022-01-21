import React, { useContext, useState, useEffect } from "react";
import AdminOrdersManagementUI from "./AdminOrdersManagementUI";
import { OrderContext } from "../../helpers/contexts/OrderContext";
import { AuthContext } from "../../helpers/contexts/AuthContext";

const AdminOrdersManagement = () => {
  const {
    orderListData,
    updatingOrderStatus,
    adminUpdateOrderManageError,
    customersData,
    totalIncomeData,
    totalProdSaledData,
    settingPage,
    settingPages,
    settingStatus,
    settingSearchTerm,
    settingSort,
  } = useContext(OrderContext);

  const [orderList, setOrderList] = orderListData;
  const [allCustomers, setAllCustomers] = customersData;
  const [totalIncome, setTotalIncome] = totalIncomeData;
  const [totalProdSaled, setTotalProdSaled] = totalProdSaledData;

  const [searchTerm, setSearchTerm] = settingSearchTerm;
  const [status, setStatus] = settingStatus;
  const [sort, setSort] = settingSort;
  const [page, setPage] = settingPage;
  const [pages, setPages] = settingPages;

  const { handleLogout } = useContext(AuthContext);

  //TOGGLE TABLE ANIMATION WHEN USER CHANGES ORDERS FILTERS

  useEffect(() => {
    const table = document.querySelector(".table-admin-orders");
    table.classList.add("animate__fadeIn");
    let interval;
    interval = setInterval(() => {
      if (table.classList.contains("animate__fadeIn")) {
        table.classList.remove("animate__fadeIn");
      }
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, [orderList.orders]);

  return (
    <AdminOrdersManagementUI
      allOrderLists={orderList}
      adminUpdateOrderManageError={adminUpdateOrderManageError}
      handleLogout={handleLogout}
      updatingOrderStatus={updatingOrderStatus}
      allCustomers={allCustomers}
      totalProdSaled={totalProdSaled}
      totalIncome={totalIncome}
      page={page}
      setPage={setPage}
      pages={pages}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      setStatus={setStatus}
      setSort={setSort}
    />
  );
};

export default AdminOrdersManagement;
