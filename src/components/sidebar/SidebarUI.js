import React from "react";
import "./style.css";

const SidebarUI = ({
  isSidebarOpen,
  handleSidebarClosure,
  title,
  children,
}) => {
  return (
    <div
      id="sidebar"
      className={
        isSidebarOpen === false
          ? "sidebar closed mx-0 col col-12 col-sm-8 col-md-6 col-lg-4  min-vh-100"
          : "sidebar mx-0 col col-12 col-sm-8 col-md-6 col-lg-4 min-vh-100"
      }
    >
      <div className="p-3 d-flex sidebar-header justify-content-between">
        <h3 className="sidebar-title text-white">{title}</h3>

        <button
          onClick={handleSidebarClosure}
          type="button"
          className=" btn btn-lg btn-close btn-close-white sidebar-close"
          aria-label="Close"
        ></button>
      </div>

      {React.cloneElement(children, {
        handleSidebarClosure: handleSidebarClosure,
      })}
    </div>
  );
};

export default SidebarUI;
