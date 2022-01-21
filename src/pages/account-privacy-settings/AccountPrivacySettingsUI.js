import React from "react";
import { Link } from "react-router-dom";
import { Header, Footer, Sidebar, Layer, Loading } from "../../components";
import Alert from "../../helpers/alert/Alert";
import { LogoutModal } from "../../components";
import UserElements from "../../components/sidebar/user-elements/UserElements";
import AdminElements from "../../components/sidebar/admin-elements/AdminElements";
import { isAuthenticated } from "../../helpers/storage&cookies/storage&cookies";
import DataSettingsComponent from "./data-settings-component/DataSettingsComponent";
import "./style.css";

import "../../helpers/common-style/main-user-page-cards.css";

const AccountPrivacySettingsUI = ({
  profileData,
  handleLogout,
  updateAccountData,
  setUpdateAccountData,
  updatingEmail,
  updatingUsername,
}) => {
  let dataToModify = [
    { setting: isAuthenticated().email, type: "email" },
    { setting: isAuthenticated().username, type: "username" },
  ];

  return (
    <div className="max-width-container d-flex flex-column min-vh-100">
      <Header />
      <Sidebar
        title="USER"
        children={
          isAuthenticated().role === 0 ? <UserElements /> : <AdminElements />
        }
      />
      <div className="container-fluid d-flex justify-content-center align-items-center body-container change-privacy-settings-bg">
        <div className="change-data-card-container d-flex flex-column align-items-center">
          <h4>PROFILE DATA</h4>
          <div className="form-change-data-container">
            {updateAccountData.errorMessage && (
              <Alert
                alertType="alert-danger"
                message={updateAccountData.errorMessage}
              />
            )}

            {updateAccountData.successMessage && (
              <Alert
                alertType="alert-success"
                message={updateAccountData.successMessage}
              />
            )}
            {!updateAccountData.successMessage && (
              <>
                {dataToModify.map((data) => (
                  <DataSettingsComponent
                    data={data}
                    key={data.type}
                    updatingEmail={updatingEmail}
                    updatingUsername={updatingUsername}
                    updateAccountData={updateAccountData}
                    setUpdateAccountData={setUpdateAccountData}
                  />
                ))}
                <Link
                  to="/user/password/forgot-password"
                  className=" btn custom-button standard-primary-button change-pwd-link"
                >
                  Change Password
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {updateAccountData.loading && <Loading />}
      <Footer />
      <LogoutModal handleLogout={handleLogout} />
      <Layer />
    </div>
  );
};

export default AccountPrivacySettingsUI;
