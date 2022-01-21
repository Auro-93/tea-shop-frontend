import React from "react";
import "./style.css";
import Alert from "../../../helpers/alert/Alert";
import { Loading } from "../../../components";

const CreateProductModalUI = ({
  categories,
  changeData,
  setChangeData,
  handleSubmit,
  resetStateOnModalClose,
  handleCheckboxChange,
  selectedProdEditModal,
}) => {
  const [
    setName,
    setQuantity,
    setPrice,
    setDiscount,
    setDescription,
    setImage,
    setCategory,
  ] = setChangeData;
  const [
    name,
    quantity,
    price,
    discount,
    description,
    image,
    category,
    productErrorMessage,
    productSuccessMessage,
    productLoading,
  ] = changeData;

  const { cat, errorMessage } = categories;

  const showCategoryList = (categories, checkbtn = []) => {
    for (let category of categories) {
      checkbtn.push({
        id: category._id,
        name: category.name,
        slug: category.slug,
      });
      if (category.children.length > 0) {
        showCategoryList(category.children, checkbtn);
      }
    }
    function compare(a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }

    checkbtn = checkbtn.sort(compare);
    return checkbtn;
  };

  return (
    <div>
      <div
        className="custom-modal modal fade"
        id="createProductModal"
        tabIndex="-1"
        aria-labelledby="createProductModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-md-down">
          <div className="modal-content admin-custom-product-modal">
            <div className="modal-header">
              <h5
                className="modal-title"
                style={{ color: "var(--secondary)" }}
                id="createProductModal"
              >
                {selectedProdEditModal.edit ? "EDIT PRODUCT" : "ADD PRODUCT"}
              </h5>
              <button
                onClick={resetStateOnModalClose}
                type="button"
                className="btn-close modal-no-outline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {productErrorMessage && (
                <Alert alertType="alert-danger" message={productErrorMessage} />
              )}
              {productSuccessMessage && (
                <Alert
                  alertType="alert-success"
                  message={productSuccessMessage}
                />
              )}
              {productLoading && <Loading />}

              <form
                id="productForm"
                onSubmit={handleSubmit}
                encrypt="multipart/form-data"
              >
                <div className="row col col-12">
                  <div className="col col-12 col-lg-6 px-md-4 mx-3 mx-lg-0">
                    <div className="my-4">
                      <label
                        htmlFor="createProductName"
                        className="form-label pb-2"
                      >
                        Name:
                      </label>

                      <input
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        value={name}
                        name="name"
                        type="text"
                        maxLength="30"
                        className="form-control mb-2"
                        id="createProductName"
                        aria-describedby="createProductNameHelp"
                      />
                    </div>

                    <div className="my-4">
                      <label
                        htmlFor="createProductQuantity"
                        className="form-label pb-2"
                      >
                        Quantity:
                      </label>
                      <input
                        onChange={(e) => {
                          setQuantity(e.target.value);
                        }}
                        value={quantity}
                        name="quantity"
                        type="number"
                        min="0"
                        className="form-control mb-2"
                        id="createProductQuantity"
                        aria-describedby="createProductQuantityHelp"
                      />
                    </div>

                    <div className="my-4">
                      <label
                        htmlFor="createProductPrice"
                        className="form-label pb-2"
                      >
                        Price ( € ):
                      </label>
                      <input
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                        value={price}
                        name="price"
                        type="number"
                        step="0.01"
                        min="0.00"
                        className="form-control mb-2"
                        id="createProductPrice"
                        aria-describedby="createProductPriceHelp"
                      />
                    </div>

                    <div className="my-4">
                      <label
                        htmlFor="createProductDiscount"
                        className="form-label pb-2"
                      >
                        Discount % (optional):
                      </label>
                      <input
                        onChange={(e) => {
                          setDiscount(e.target.value);
                        }}
                        value={discount}
                        name="discount"
                        type="number"
                        step="0.01"
                        min="0.00"
                        max="100.00"
                        className="form-control mb-2"
                        id="createProductDiscount"
                        aria-describedby="createDiscountHelp"
                      />
                    </div>

                    <div className="my-4">
                      <label
                        htmlFor="createProductImage"
                        className="form-label pb-2"
                      >
                        Image:
                      </label>
                      <input
                        onChange={(e) => {
                          setImage(e.target.files[0]);
                        }}
                        name="image"
                        type="file"
                        accept="image/png, image/jpeg"
                        className="form-control mb-2"
                        id="createProductImage"
                        aria-describedby="createProductImageHelp"
                      />
                    </div>

                    <div className="my-4">
                      <label
                        htmlFor="createProductDescription"
                        className="form-label pb-2"
                      >
                        Description:
                      </label>
                      <textarea
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        value={description}
                        name="description"
                        maxLength="500"
                        className="form-control mb-2"
                        id="createProductDescription"
                        aria-describedby="createProductDescriptionHelp"
                      />
                    </div>
                  </div>

                  <div className="col col-12 col-lg-6 px-md-4 mx-3 mx-lg-0">
                    <div className="my-4 mx-3 mx-md-0">
                      <label
                        id="chooseProductCategories"
                        className="form-label pb-3"
                      >
                        Categories:
                      </label>
                      <div className="row checkbox-container text-secondary">
                        {errorMessage ? (
                          <Alert
                            alertType="alert-danger"
                            message={errorMessage}
                          />
                        ) : (
                          <>
                            {showCategoryList(cat).map((check) => (
                              <div
                                className="col col-12  col-xl-6 mb-2"
                                key={check.name}
                              >
                                <input
                                  onChange={handleCheckboxChange}
                                  id={check.id}
                                  data-name={check.name}
                                  data-slug={check.slug}
                                  className="form-check-input me-3 mb-2 custom-checkbox"
                                  type="checkbox"
                                  value="category"
                                  style={{
                                    backgroundColor: "transparent !important",
                                  }}
                                />
                                {check.name}
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row d-flex justify-content-end align-items-center mt-5 col col-12">
                  <button
                    type="submit"
                    className="modal-no-outline btn custom-button add-product-btn outline-secondary-button px-3 col col-2 d-flex justify-content-center align-items-center"
                  >
                    {selectedProdEditModal.edit ? "Update" : "Add"}
                  </button>

                  <button
                    onClick={resetStateOnModalClose}
                    type="button"
                    className="btn btn-secondary add-product-close-btn modal-no-outline col col-2 d-flex justify-content-center align-items-center "
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProductModalUI;
