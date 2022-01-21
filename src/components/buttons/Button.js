import React from "react";

const Button = ({ text, children, handleClick, classes }) => {
  return (
    <button onClick={handleClick} type="button" className={classes}>
      {children}
      <span
        style={{
          letterSpacing: "0.2rem",
          fontWeight: "bold",
        }}
      >
        {text}
      </span>
    </button>
  );
};

export default Button;
