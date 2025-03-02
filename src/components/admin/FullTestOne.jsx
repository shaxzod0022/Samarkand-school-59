import React from "react";
import { styles } from "../../util/styles";

const FullTestOne = ({ test, newClass, onClose }) => {
  if (!test) {
    return null;
  }

  return (
    <div
      className={`${
        newClass ? "block" : "hidden"
      } fixed bg-white z-50 rounded-lg p-4 sm:w-[80%] lg:w-[60%] w-[98%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
    >
      <h2 className={`${styles.heading2} text-center`}>To'liq test</h2>
      <button
        onClick={onClose}
        className={`${styles.fCol} absolute top-3 right-3 justify-center active:bg-red-300/50 rounded-full border-2 border-red-500 w-7 h-7 p-2`}
      >
        <i className="fa-solid text-red-500 fa-x"></i>
      </button>
      <div className={`${styles.fCol} gap-3 w-full !items-start`}>
        <div className="w-full">
          <label className={`${styles.paragraph} font-semibold`}>Savol:</label>
          <p className={`${styles.paragraph}`}>{test.question}</p>
        </div>
        <div className={`${styles.fCol} w-full gap-3`}>
          <p className={`${styles.paragraph} w-full font-semibold`}>
            Variantlar:
          </p>
          {["A", "B", "C", "D"].map((option) => (
            <div key={option} className={`${styles.fStart} w-full gap-3`}>
              <label className={`${styles.paragraph} font-semibold`}>
                {option}:
              </label>
              <p className={`${styles.paragraph}`}>{test.options[option]}</p>
            </div>
          ))}
        </div>
        <p className={`${styles.paragraph} font-semibold`}>To‘g‘ri javob:</p>
        <div className={`${styles.fStart} gap-5`}>
          <p className={`${styles.paragraph} font-bold text-green-600`}>
            {test.correctAnswer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FullTestOne;
