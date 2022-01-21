import React, { useEffect } from "react";
import {
  Header,
  Footer,
  Sidebar,
  Layer,
  LogoutModal,
  CreateProductModal,
  Pagination,
  Loading,
} from "../../components";
import AdminElements from "../../components/sidebar/admin-elements/AdminElements";
import Alert from "../../helpers/alert/Alert";
import "../../helpers/common-style/admin-management-elements.css";
import ManageProductComponent from "./manage-product-component/ManageProductComponent";

const ProductManagementUI = ({
  handleLogout,
  categories,
  products,
  page,
  setPage,
  pages,
  searchTerm,
  setSearchTerm,
  deletingProd,
  selectedProdEditModal,
  setSelectedProdEditModal,
}) => {
  const { errorMessage, cat } = categories;

  return (
    <div className="max-width-container d-flex flex-column min-vh-100">
      <Header />
      <Sidebar title="ADMIN" children={<AdminElements />} />

      <div className=" manage-page container-fluid d-flex flex-column justify-content-center align-items-center body-container">
        <div className="manage-container col col-11">
          <div className="d-flex align-items-center justify-content-between py-4 px-4 px-sm-5 manage-header">
            <span className="admin-items-count">{products.count} Products</span>
            <button
              onClick={() =>
                setSelectedProdEditModal({ prod: "", edit: false })
              }
              type="submit"
              className="btn custom-button outline-secondary-button px-4 px-sm-5 manage-button"
              data-bs-toggle="modal"
              data-bs-target="#createProductModal"
            >
              +
            </button>
          </div>
          {products.successMessage && (
            <Alert
              alertType="alert-success"
              message={products.successMessage}
            />
          )}
          {products.errorMessage &&
            products.errorMessage !== "Products not found" && (
              <Alert alertType="alert-danger" message={products.errorMessage} />
            )}
          <div className="products-page-filter-container py-3">
            <input
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              value={searchTerm}
              type="search"
              placeholder="Product name..."
            ></input>
          </div>
          {products.totalProducts.length > 0 && (
            <Pagination
              page={page}
              pages={pages}
              changePage={setPage}
              style={{ margin: 0 }}
            />
          )}

          {products.totalProducts.length > 0 && !products.errorMessage && (
            <div
              className="px-sm-4 pb-4 product-grid"
              id="manage-product-grid"
              style={{
                backgroundColor: "transparent",
                boxShadow: "none",
                border: "none",
              }}
            >
              {products.product.map((prod) => (
                <ManageProductComponent
                  key={prod._id}
                  prod={prod}
                  deletingProd={deletingProd}
                  setSelectedProdEditModal={setSelectedProdEditModal}
                />
              ))}
            </div>
          )}
          {products.totalProducts.length === 0 && (
            <h5 className="text-center">No product Found</h5>
          )}
          {products.errorMessage &&
            products.errorMessage === "Products not found" && (
              <p className="text-center my-4">{products.errorMessage}</p>
            )}
          {products.totalProducts.length > 0 && (
            <Pagination page={page} pages={pages} changePage={setPage} />
          )}
        </div>
      </div>

      <Footer />
      <LogoutModal handleLogout={handleLogout} />
      <CreateProductModal
        categories={categories}
        selectedProdEditModal={selectedProdEditModal}
        id={selectedProdEditModal.prod ? selectedProdEditModal.prod._id : null}
        originalImg={
          selectedProdEditModal.prod
            ? selectedProdEditModal.prod.image.filename
            : null
        }
      />
      {products.loading && <Loading />}
      <Layer />
    </div>
  );
};

export default ProductManagementUI;
