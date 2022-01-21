import React from "react";
import "./style.css";
import "animate.css";

const Loading = ({ style }) => {
  return (
    <div style={style} className="full-page-loader">
      <div className="circle-container d-flex flex-column justify-content-center align-items-center">
        <i className="fas fa-mug-hot fa-4x mb-5 tea-loading-icon"></i>
        <div className="d-flex">
          <div className="spinner-grow mx-2 spinner-custom" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow mx-2 spinner-custom" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow mx-2 spinner-custom" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow mx-2 spinner-custom" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
