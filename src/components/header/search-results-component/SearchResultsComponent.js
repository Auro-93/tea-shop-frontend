import React from "react";
import dotenv from "dotenv";
import { Link } from "react-router-dom";
import Loader from "../../../helpers/loading-multiple-spinners/Loader";
import {
  convertToEuros,
  calcDiscount,
} from "../../../helpers/misc-helper-functions/MiscHelperFunc";
import Alert from "../../../helpers/alert/Alert";

const SearchResultsComponent = ({ searchProdResult }) => {
  const { products, loading, errorMessage } = searchProdResult;

  //DOTENV CONFIG
  dotenv.config();
  const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

  return (
    <div className="search-results-container d-flex flex-column">
      {loading && !errorMessage && (
        <div className="p-3">
          <Loader />
        </div>
      )}
      {!errorMessage &&
        !loading &&
        products &&
        products.length > 0 &&
        products.map((prod) => (
          <Link
            to={`/products/${prod.slug}/${prod._id}`}
            key={prod._id}
            className="search-results-card d-flex align-items-center"
          >
            <img
              className="search-results-img"
              src={`${baseUrl}/api/uploads/${prod.image.filename}`}
            />
            <p>{prod.name}</p>
            <p> {convertToEuros(calcDiscount(prod.price, prod.discount))}</p>
          </Link>
        ))}
      {errorMessage && errorMessage !== "Products not found" && (
        <div className="p-3">
          <Alert alertType="alert-danger" message={errorMessage} />
        </div>
      )}
      {errorMessage && errorMessage === "Products not found" && (
        <p className="text-center my-4">{errorMessage}</p>
      )}
    </div>
  );
};

export default SearchResultsComponent;
