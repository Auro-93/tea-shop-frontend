import React, { useState } from "react";
import { editCategory } from "../../../api/category";
import Loader from "../../../helpers/loading-multiple-spinners/Loader";
import Alert from "../../../helpers/alert/Alert";

const EditCategoryModal = ({ catId, catName }) => {
  const [newCatName, setNewCatName] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //EDIT CATEGORY

  const editingCategory = (e) => {
    e.preventDefault();
    if (!newCatName) {
      setErrorMessage("New Category Name is required");
    } else {
      setLoading(true);
      let data = { categoryId: catId, categoryName: newCatName };

      editCategory(data)
        .then((response) => {
          setLoading(false);
          setErrorMessage("");
          setSuccessMessage(response.data.successMessage);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((error) => {
          setLoading(false);
          setSuccessMessage("");
          setErrorMessage(error.toString());
        });
    }
  };

  return (
    <div>
      <div
        className="custom-modal modal fade"
        id="editCategoryModal"
        tabIndex="-1"
        aria-labelledby="editCategoryModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content text-center">
            <div
              className="modal-header"
              style={{ backgroundColor: "var(--tertiary)" }}
            >
              <h5 className="modal-title text-secondary" id="editCategoryModal">
                EDIT CATEGORY
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
              {errorMessage && (
                <Alert alertType="alert-danger" message={errorMessage} />
              )}
              {loading && <Loader />}

              <form className="py-4">
                <div className="d-flex align-items-center">
                  <label htmlFor="newCatName" className="form-label mb-0 me-3">
                    Name:
                  </label>

                  <input
                    onChange={(e) => setNewCatName(e.target.value)}
                    value={newCatName}
                    placeholder={catName}
                    type="text"
                    className="form-control"
                    id="newCatName"
                  />
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
              <button
                type="submit"
                className="modal-no-outline btn custom-button outline-secondary-button"
                onClick={(e) => editingCategory(e)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
