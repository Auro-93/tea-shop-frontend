import React, { useContext, useState } from "react";
import { AuthContext } from "../../helpers/contexts/AuthContext";
import AccountPrivacySettingsUI from "./AccountPrivacySettingsUI";

const AccountPrivacySettings = () => {
  const {
    handleLogout,
    user,
    updatingAccountData,
    updatingEmail,
    updatingUsername,
  } = useContext(AuthContext);
  const [profileData] = user;
  const [updateAccountData, setUpdateAccountData] = updatingAccountData;

  return (
    <AccountPrivacySettingsUI
      profileData={profileData}
      handleLogout={handleLogout}
      updateAccountData={updateAccountData}
      setUpdateAccountData={setUpdateAccountData}
      updatingEmail={updatingEmail}
      updatingUsername={updatingUsername}
    />
  );
};

export default AccountPrivacySettings;
