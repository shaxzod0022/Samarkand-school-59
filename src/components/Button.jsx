import React from "react";
import { styles } from "../util/styles";

const Button = ({ title, className, onClick, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} ${styles.button}`}
    >
      {title}
    </button>
  );
};

export default Button;
