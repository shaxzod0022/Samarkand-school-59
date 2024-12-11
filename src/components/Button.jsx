import React from "react";
import { styles } from "../util/styles";

const Button = ({ title, className, onClick }) => {
  return (
    <button onClick={onClick} className={`${className} ${styles.button}`}>
      {title}
    </button>
  );
};

export default Button;
