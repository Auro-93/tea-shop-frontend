import React, { useContext } from "react";
import SidebarUI from "./SidebarUI";
import { SidebarContext } from "../../helpers/contexts/SidebarContext.js";

const Sidebar = ({ children, title }) => {
  const { sidebar } = useContext(SidebarContext);
  const [isSidebarOpen, setIsSidebarOpen] = sidebar;

  const handleSidebarClosure = () => {
    setIsSidebarOpen(false);
  };

  return (
    <SidebarUI
      isSidebarOpen={isSidebarOpen}
      handleSidebarClosure={handleSidebarClosure}
      title={title}
      children={children}
    />
  );
};

export default Sidebar;
