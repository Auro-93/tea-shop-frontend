import React, { useContext } from "react";
import AdminElementsUI from "./AdminElementsUI";
import { AuthContext } from "../../../helpers/contexts/AuthContext";

const AdminElements = ({ handleSidebarClosure }) => {
  const { user } = useContext(AuthContext);
  const [profileData] = user;

  return (
    <AdminElementsUI
      profileData={profileData}
      handleSidebarClosure={handleSidebarClosure}
    />
  );
};

export default AdminElements;
