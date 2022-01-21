import React from "react";
import dotenv from "dotenv";

const ZoomImgModal = ({ prod }) => {
  //DOTENV CONFIG
  dotenv.config();
  const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

  return (
    <div>
      <div
        className="custom-modal modal fade"
        id="zoommodal"
        tabIndex="-1"
        aria-labelledby="zoommodal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content text-center">
            <div className="modal-header">
              <h5
                className="modal-title"
                style={{ color: "var(--secondary)" }}
                id="zoommodal"
              >
                {prod ? prod.name : "Product Image"}
              </h5>
              <button
                type="button"
                className="btn-close modal-no-outline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex justify-content-center align-items-center">
              <div className="container-fluid">
                {prod && (
                  <img
                    src={`${baseUrl}/api/uploads/${prod.image.filename}`}
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
              </div>
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

export default ZoomImgModal;
