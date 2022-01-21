import React from "react";
import "./style.css";
import Alert from "../../../helpers/alert/Alert";
import Loader from "../../../helpers/loading-multiple-spinners/Loader";

const CreateCategoryModalUI = ({
  categories,
  handleChange,
  handleSubmit,
  createCategoryData,
}) => {
  const { errorMessage, cat } = categories;
  const { name, parentId, successMessage, loading } = createCategoryData;

  const showCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        showCategoryList(category.children, options);
      }
    }
    return options;
  };

  return (
    <div>
      <div
        className="custom-modal modal fade"
        id="createCategoryModal"
        tabIndex="-1"
        aria-labelledby="createCategoryModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered  ">
          <div className="modal-content admin-custom-modal">
            <div className="modal-header">
              <h5
                className="modal-title"
                style={{ color: "var(--secondary)" }}
                id="createCategoryModal"
              >
                ADD CATEGORY
              </h5>
              <button
                type="button"
                className="btn-close modal-no-outline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {successMessage && (
                <Alert alertType="alert-success" message={successMessage} />
              )}
              {createCategoryData.errorMessage && (
                <Alert
                  alertType="alert-danger"
                  message={createCategoryData.errorMessage}
                />
              )}
              {loading && <Loader />}

              <form onSubmit={handleSubmit}>
                <div className="my-4">
                  <label htmlFor="createCategory" className="form-label pb-3">
                    Create category:
                  </label>

                  <input
                    onChange={handleChange}
                    name="name"
                    value={name}
                    type="text"
                    maxLength="30"
                    className="form-control mb-2"
                    id="createCategory"
                    aria-describedby="createCategoryHelp"
                  />
                </div>
                <div className="my-4">
                  <label
                    htmlFor="chooseParentCategory"
                    className="form-label pb-3"
                  >
                    Choose a parent category (optional):
                  </label>
                  {errorMessage ? (
                    <Alert alertType="alert-danger" message={errorMessage} />
                  ) : (
                    <select
                      onChange={handleChange}
                      value={parentId}
                      id="chooseParentCategory"
                      className="form-select custom-select text-secondary"
                    >
                      <option defaultValue=""></option>
                      {showCategoryList(cat).map((option) => (
                        <option key={option.name} value={option._id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="d-flex justify-content-end align-items-center mt-5">
                  <button
                    type="submit"
                    className="modal-no-outline btn custom-button outline-secondary-button px-3"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary modal-no-outline"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryModalUI;
