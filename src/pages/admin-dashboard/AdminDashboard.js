import React, { useContext } from "react";
import AdminDashboardUI from "./AdminDashboardUI";
import { AuthContext } from "../../helpers/contexts/AuthContext";

const AdminDashboard = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const [profileData] = user;

  return (
    <AdminDashboardUI handleLogout={handleLogout} profileData={profileData} />
  );
};
export default AdminDashboard;
