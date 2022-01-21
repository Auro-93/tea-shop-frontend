import React, { useState } from "react";
import {
  Header,
  Footer,
  Sidebar,
  Layer,
  LogoutModal,
  CreateCategoryModal,
  Loading,
  EditCategoryModal,
} from "../../components";
import AdminElements from "../../components/sidebar/admin-elements/AdminElements";
import "../../helpers/common-style/admin-management-elements.css";
import "./style.css";
import Alert from "../../helpers/alert/Alert";

const CategoryManagementUI = ({
  handleLogout,
  categories,
  removingCategory,
}) => {
  const { errorMessage, successMessage, loading, cat } = categories;

  const [selectedCat, setSelectedCat] = useState({ catName: "", catId: "" });

  const showCategoryList = (categories) => {
    let catList = [];
    for (let category of categories) {
      catList.push(
        <div className="category-container text-secondary" key={category._id}>
          <li
            id={category._id}
            className="category-item d-flex justify-content-between align-items-center py-4"
          >
            <div className="px-4">{category.name}</div>
            <div className="d-flex justify-content-between align-items-center px-3">
              <i
                onClick={() => {
                  setSelectedCat({
                    catName: category.name,
                    catId: category._id,
                  });
                }}
                className="far fa-lg fa-edit mx-2 p-1 edit-category"
                data-bs-toggle="modal"
                data-bs-target="#editCategoryModal"
              ></i>
              <i
                onClick={() => {
                  removingCategory(category._id);
                }}
                className="fas fa-lg fa-times p-1 delete-category"
              ></i>
            </div>
          </li>
          {category.children.length > 0 ? (
            <ul className="subcategory-item">
              {showCategoryList(category.children)}
            </ul>
          ) : null}
        </div>
      );
    }
    return catList;
  };

  return (
    <div className="max-width-container d-flex flex-column min-vh-100">
      <Header />
      <Sidebar title="ADMIN" children={<AdminElements />} />

      <div className=" manage-page container-fluid d-flex flex-column justify-content-center align-items-center body-container">
        <div className="manage-container col col-12 col-lg-11">
          <div className="d-flex align-items-center justify-content-between py-4 px-4 px-sm-5 manage-header">
            <span className="admin-items-count">
              {categories.count} Categories
            </span>
            <button
              type="submit"
              className="btn custom-button outline-secondary-button px-4 px-sm-5 manage-button"
              data-bs-toggle="modal"
              data-bs-target="#createCategoryModal"
            >
              +
            </button>
          </div>
          <div className="px-sm-4 pb-4">
            <div className="my-2">
              <Alert
                alertType="alert-secondary"
                message="Warning: deleting a category will also delete its sub-categories and products."
              />
            </div>
            {errorMessage && (
              <Alert alertType="alert-danger" message={errorMessage} />
            )}
            {successMessage && (
              <Alert alertType="alert-success" message={successMessage} />
            )}

            <ul className="px-0 px-sm-4 mt-5">{showCategoryList(cat)}</ul>
          </div>
        </div>
        {loading && <Loading />}
      </div>

      <Footer />
      <LogoutModal handleLogout={handleLogout} />
      <CreateCategoryModal categories={categories} />
      <EditCategoryModal
        catId={selectedCat.catId}
        catName={selectedCat.catName}
      />
      <Layer />
    </div>
  );
};

export default CategoryManagementUI;
