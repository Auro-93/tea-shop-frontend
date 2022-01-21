import React from "react";
import { useHistory } from "react-router-dom";
import "./style.css";

const LogoutModal = ({ handleLogout }) => {
  let history = useHistory();

  return (
    <div>
      <div
        className="custom-modal modal fade"
        id="logoutmodal"
        tabIndex="-1"
        aria-labelledby="logoutmodal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content text-center">
            <div className="modal-header">
              <h5
                className="modal-title"
                style={{ color: "var(--secondary)" }}
                id="logoutmodal"
              >
                Logout
              </h5>
              <button
                type="button"
                className="btn-close modal-no-outline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Are you sure you want to logout?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary modal-no-outline"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  history.push("/");
                }}
                type="button"
                className="modal-no-outline btn custom-button outline-secondary-button"
                data-bs-dismiss="modal"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
