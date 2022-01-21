import React, { useState } from "react";
import { updateEmail } from "../../../api/auth";

const DataSettingsComponent = ({
  data,
  updatingEmail,
  updatingUsername,
  setUpdateAccountData,
  updateAccountData,
}) => {
  const [toggleUpdate, setToggleUpdate] = useState(false);

  const handleToggleUpdate = () => {
    setToggleUpdate(!toggleUpdate);
  };

  const [updatedValue, setUpdatedValue] = useState("");

  return (
    <div className="d-flex">
      {!toggleUpdate ? (
        <>
          <p>{data.setting}</p>
          <button
            onClick={() => {
              setUpdateAccountData({
                ...updateAccountData,
                errorMessage: "",
              });
              handleToggleUpdate();
            }}
            id={data.setting}
            className=" btn custom-button standard-secondary-button"
          >
            Change {data.type}
          </button>
        </>
      ) : (
        <div className="d-flex mx-auto">
          <div
            onClick={() => {
              setToggleUpdate(false);
              setUpdateAccountData({
                ...updateAccountData,
                errorMessage: "",
              });
            }}
            style={{ backgroundColor: "var(--primary2)" }}
            className="update-status-icons back-order-status-icon-container change-settings-button"
          >
            <i className="mx-2 fa-sm fas fa-times"></i>
          </div>

          {data.type === "email" ? (
            <input
              type="email"
              className="update-settings-input"
              value={updatedValue}
              onChange={(e) => {
                setUpdateAccountData({
                  ...updateAccountData,
                  errorMessage: "",
                });
                setUpdatedValue(e.target.value);
              }}
            />
          ) : (
            <input
              type="text"
              className="update-settings-input"
              value={updatedValue}
              onChange={(e) => {
                setUpdateAccountData({
                  ...updateAccountData,
                  errorMessage: "",
                });
                setUpdatedValue(e.target.value);
              }}
            />
          )}

          <div
            style={{ backgroundColor: "var(--secondary)" }}
            onClick={() => {
              setToggleUpdate(false);
              data.type === "email"
                ? updatingEmail(updatedValue)
                : updatingUsername(updatedValue);
            }}
            className=" update-status-icons check-update-order-status-icon-container change-settings-button"
          >
            <i className="mx-2 fa-sm fas fa-check"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataSettingsComponent;
