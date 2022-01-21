import React, { useContext } from "react";
import CategoryManagementUI from "./CategoryManagementUI";
import { AuthContext } from "../../helpers/contexts/AuthContext";
import { CategoryContext } from "../../helpers/contexts/CategoryContext";

const CategoryManagement = () => {
  const { handleLogout } = useContext(AuthContext);
  const { categoryList, removingCategory } = useContext(CategoryContext);
  const [categories] = categoryList;

  return (
    <CategoryManagementUI
      handleLogout={handleLogout}
      categories={categories}
      removingCategory={removingCategory}
    />
  );
};

export default CategoryManagement;
