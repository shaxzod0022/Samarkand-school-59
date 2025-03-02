import React, { useState, useEffect } from "react";
import { styles } from "../../util/styles";

const Message = ({ successMessage, errorMessage }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (successMessage || errorMessage) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => clearTimeout(timer); // Toza ishlash uchun `cleanup` qo‘shildi
    }
  }, [successMessage, errorMessage]);

  if (!isVisible) return null; // Agar hech qanday xabar bo‘lmasa, hech narsa ko‘rsatilmaydi

  return (
    <div
      className={`p-3 rounded-md fixed bottom-5 right-5 transform ${
        successMessage
          ? "bg-green-500/60 text-white"
          : "bg-red-500/60 text-white"
      } ${
        isVisible ? "block" : "hidden"
      } transition-all duration-300 ease-in-out shadow-lg`}
    >
      <p className={`${styles.paragraph} font-medium`}>
        {successMessage ? successMessage : errorMessage}
      </p>
    </div>
  );
};

export default Message;
