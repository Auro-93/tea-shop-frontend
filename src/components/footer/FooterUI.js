import React from "react";
import "./style.css";

const FooterUI = () => {
  return (
    <footer className="footer">
      <div className="footer-row">
        <div className="max-width-footer">
          <div className="footer-contact">
            <p>
              Email : <span className="fw-bold">teastore.mern@gmail.com </span>
            </p>
            <p>
              Phone Number: <span className="fw-bold">+39 06 185 9154</span>
            </p>
          </div>
          <div className="social-icons-container">
            <i className="fab  fa-facebook social-icon"></i>
            <i className="fab  fa-instagram social-icon"></i>
            <i className="fab fa-whatsapp social-icon"></i>
            <i className="fas fa-map-marker-alt social-icon"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterUI;
