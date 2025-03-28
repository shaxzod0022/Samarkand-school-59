import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { styles } from "../util/styles";

const ResultSlider = ({ results }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % results.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + results.length) % results.length);
  };

  return (
    <div className="relative w-full mt-3">
      <div className="border p-3 rounded-md mb-3">
        <p className={`${styles.paragraph}`}>
          Test yechilgan sana:{" "}
          <span className="font-semibold">
            {results[currentIndex].createdAt}
          </span>
        </p>
        <p className={`${styles.paragraph}`}>
          Tugatish vaqti:{" "}
          <span className="font-semibold">
            {results[currentIndex].timeTaken > 60
              ? `${Math.floor(results[currentIndex].timeTaken / 60)} daqiqa`
              : `${results[currentIndex].timeTaken} sekund`}
          </span>
        </p>
        <p className={`${styles.paragraph}`}>
          To‘g‘ri javoblar:{" "}
          <span className="font-semibold">
            {
              results[currentIndex].testResults.filter((i) => i.isCorrect)
                .length
            }
          </span>
        </p>
        <p className={`${styles.paragraph}`}>
          Noto‘g‘ri javoblar:{" "}
          <span className="font-semibold">
            {
              results[currentIndex].testResults.filter((i) => !i.isCorrect)
                .length
            }
          </span>
        </p>
        <p className={`${styles.paragraph}`}>
          Test natijasi:{" "}
          <span className="font-semibold">
            {(
              (results[currentIndex].testResults.filter((i) => i.isCorrect)
                .length /
                results[currentIndex].testResults.length) *
              100
            ).toFixed(1)}
            %
          </span>
        </p>
      </div>
      <div className={`w-full flex justify-center gap-5`}>
        <button onClick={prevSlide}>
          <ArrowLeft
            size={30}
            className="text-gray-700 border-2 border-formaColor rounded-full p-1 active:bg-slate-300"
          />
        </button>
        <span>
          {currentIndex + 1} / {results.length}
        </span>
        <button onClick={nextSlide}>
          <ArrowRight
            size={30}
            className="text-gray-700 border-2 border-formaColor rounded-full p-1 active:bg-slate-300"
          />
        </button>
      </div>
    </div>
  );
};

export default ResultSlider;
