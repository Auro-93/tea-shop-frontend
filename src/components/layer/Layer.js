import React, { useContext } from "react";
import { SidebarContext } from "../../helpers/contexts/SidebarContext";
import "./style.css";

const Layer = () => {
  const { sidebar } = useContext(SidebarContext);
  const [isSidebarOpen] = sidebar;

  return (
    <div
      className={isSidebarOpen ? "layer-visible" : "layer-invisible"}
      id="layer"
    />
  );
};

export default Layer;
