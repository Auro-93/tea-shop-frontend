import React from "react";
import "../../../helpers/common-style/user-sidebar-style.css";
import { Link } from "react-router-dom";
import { sidebarAdminData } from "../../../helpers/sidebar-data/sidebarData";

const AdminElementsUI = ({ profileData, handleSidebarClosure }) => {
  const { username, email, image } = profileData;

  return (
    <div className="overscroll-container">
      <div className="profile-sidebar-info-header">
        <div className="d-flex justify-content-center align-items-center p-3">
          {image && (
            <div
              className="profile-sidebar-image"
              style={{ backgroundImage: `url('${image}')` }}
            />
          )}
          {!image && <div className="profile-sidebar-image no-image" />}
        </div>
        <h6 className="text-center username">{username}</h6>
        <p className="text-center text-secondary email">{email}</p>
        <button
          className="btn col-12 d-flex justify-content-center align-items-center text-secondary"
          data-bs-toggle="modal"
          data-bs-target="#logoutmodal"
        >
          Logout
          <i className="px-2 fas fa-sign-out-alt logout-icon"></i>
        </button>
      </div>

      <ul className="accordion-body mt-2 text-center profile-menu-elements">
        {sidebarAdminData.map((el, i) => {
          return (
            <li
              onClick={() => {
                handleSidebarClosure();
              }}
              key={i}
              className="nav-item sidebar-item"
            >
              <Link className="p-4" to={el.url}>
                {el.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminElementsUI;
