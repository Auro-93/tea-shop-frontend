import React, { useContext } from "react";
import UserElementsUI from "./UserElementsUI";
import { AuthContext } from "../../../helpers/contexts/AuthContext";

const UserElements = ({ handleSidebarClosure }) => {
  const { user } = useContext(AuthContext);
  const [profileData] = user;

  return (
    <UserElementsUI
      profileData={profileData}
      handleSidebarClosure={handleSidebarClosure}
    />
  );
};

export default UserElements;
