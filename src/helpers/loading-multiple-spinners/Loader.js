import React from "react";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className={`mx-2 spinner-grow`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className={`mx-2 spinner-grow`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className={`mx-2 spinner-grow`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className={`mx-2 spinner-grow`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
