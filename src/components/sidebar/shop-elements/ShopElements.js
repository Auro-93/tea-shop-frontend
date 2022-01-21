import React, { useContext } from "react";
import ShopElementsUI from "./ShopElementsUI";
import { CategoryContext } from "../../../helpers/contexts/CategoryContext";
import { ProductContext } from "../../../helpers/contexts/ProductContext";

const ShopElements = ({ handleSidebarClosure }) => {
  const { categoryList } = useContext(CategoryContext);
  const [categories] = categoryList;

  const { settingCategoriesFilter } = useContext(ProductContext);

  return (
    <ShopElementsUI
      categories={categories}
      settingCategoriesFilter={settingCategoriesFilter}
      handleSidebarClosure={handleSidebarClosure}
    />
  );
};

export default ShopElements;
