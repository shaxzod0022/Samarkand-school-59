import React, { useEffect, useState } from "react";
// import { useParams } from "react-router";
import { sciences, testOnaTili } from "../util/constants";
import Button from "../components/Button";
import { styles } from "../util/styles";

const Appropriation = () => {
  // const { id } = useParams();
  const [testAnsware, setTestAnsware] = useState(null);

  useEffect(() => {
    let response = JSON.parse(localStorage.getItem("testData"));
    if (response) {
      setTestAnsware(response);
      console.log(response.selectedOptions);
    }
  }, []);

  useEffect(() => {
    if (testAnsware) {
      testOnaTili.forEach((item, idx) => {
        const isCorrect = testAnsware.selectedOptions[idx] === item.answer;
        console.log(`Answer for question ${item.id}: ${isCorrect}`);
      });
    }
  }, [testAnsware]);

  return (
    <div className={`bg-white pt-[100px] sm:pt-[110px] mb-10`}>
      <h2 className={`${styles.heading2} mb-6`}>O'zlashtirish</h2>
      <ul
        className={`w-full flex flex-wrap sm:justify-between justify-around items-center gap-4`}
      >
        {sciences.map((i, idx) => {
          return (
            <li
              key={idx}
              className={`max-w-[300px] w-full flex items-center justify-around sm:justify-between flex-col border-2 rounded-sm p-4`}
            >
              <div className={`flex flex-col items-center gap-6 mb-3`}>
                <img src={i.img} className="w-20 rounded-full h-20" alt="maktab fanlari" />
                <h3 className={`${styles.heading3}`}>{i.title}</h3>
              </div>
              <div className={`flex w-full flex-col items-start gap-3`}>
                <p className={`${styles.paragraph} text-slate-600`}>
                  Testlar soni:
                </p>
                <p className={`${styles.paragraph} text-slate-600`}>
                  To'g'ri javoblar soni:
                </p>
                <p className={`${styles.paragraph} text-slate-600`}>Vaqti:</p>
                <Button title={"Testni ko'rish"} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Appropriation;
