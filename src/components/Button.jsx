import React from "react";
import { styles } from "../util/styles";

const Button = ({ title, className, onClick, type, disabled }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${className} ${styles.button}`}
    >
      {title}
    </button>
  );
};

export default Button;
