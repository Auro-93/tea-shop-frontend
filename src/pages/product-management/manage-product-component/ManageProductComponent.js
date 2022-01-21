import React from "react";
import dotenv from "dotenv";
import {
  convertToEuros,
  calcDiscount,
} from "../../../helpers/misc-helper-functions/MiscHelperFunc";
import { Link } from "react-router-dom";
import "../style.css";

const ManageProductComponent = ({
  prod,
  deletingProd,
  setSelectedProdEditModal,
}) => {
  //DOTENV CONFIG
  dotenv.config();
  const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

  return (
    <div key={prod._id} className="product-element">
      <div className="product-image-container">
        <img src={`${baseUrl}/api/uploads/${prod?.image?.filename}`} />
      </div>

      <div className="product-info p-3 mt-4 d-flex flex-column justify-content-center">
        <div className="categories-container">
          {prod.categories.map((cat) => (
            <span key={cat.name} className="text-secondary categories-element">
              {cat.name}
            </span>
          ))}
        </div>

        <div className="prod-title-price-container mt-1 d-flex justify-content-between align-items-center">
          <Link to={`/products/${prod.slug}/${prod._id}`}>
            <h5 className="product-title">{prod.name}</h5>
          </Link>
          {prod.discount == 0 || prod.discount == null ? (
            <h5 className="product-price">{convertToEuros(prod.price)}</h5>
          ) : (
            <h5 className="product-price d-flex flex-column justify-content-center align-items-center">
              <span className="text-decoration-line-through old-price">
                {convertToEuros(prod.price)}
              </span>
              <span className="mx-2">
                {convertToEuros(calcDiscount(prod.price, prod.discount))}
              </span>
            </h5>
          )}
        </div>
      </div>
      <div className="manage-product-layer">
        <div className="d-flex justify-content-between align-items-center">
          <i
            onClick={() => setSelectedProdEditModal({ prod: prod, edit: true })}
            data-bs-toggle="modal"
            data-bs-target="#createProductModal"
            className="fas fa-lg fa-edit manage-prod-icon manage-prod-edit"
          ></i>
          <i
            onClick={() => deletingProd(prod._id, prod.image.filename)}
            className="fas fa-lg fa-trash-alt manage-prod-icon manage-prod-delete"
          ></i>
        </div>
      </div>
    </div>
  );
};

export default ManageProductComponent;
