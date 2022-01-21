import React from "react";

const SpinnerLayer = () => {
  return (
    <div className="layer-visible d-flex justify-content-center align-items-center layer-spinner-color">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default SpinnerLayer;
