import React, { useState, useEffect } from "react";
import { styles } from "../util/styles";
import { useNavigate, useParams } from "react-router";
import { sciences, testOnaTili } from "../util/constants";
import Button from "./Button";
import { checkmark } from "../assets";
import { type } from "@testing-library/user-event/dist/type";

const StartTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const science = sciences.find((item) => item.id === Number(id));
  const [hidden, setHidden] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timeLeft, setTimeLeft] = useState(3600); // Vaqt (soniya)
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const testCount = testOnaTili.length;
  const keys = Object.keys(selectedOptions).map(Number);

  useEffect(() => {
    const allTestData = JSON.parse(localStorage.getItem("testData")) || {};
    const currentScienceData = allTestData[science.title] || {};
    const savedOptions = currentScienceData.selectedOptions || {};
    setSelectedOptions(savedOptions);

    let savedTime = localStorage.getItem("timeLeft");
    if (!savedTime) {
      savedTime = 1800; // Set default to 30 minutes if no timeLeft in local storage
      localStorage.setItem("timeLeft", savedTime); // Save the 30 minutes in localStorage
    } else {
      savedTime = parseInt(savedTime, 10);
    }
    setTimeLeft(savedTime);
  }, [science.title]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev > 0 ? prev - 1 : 0;
        if (newTime > 0) {
          localStorage.setItem("timeLeft", newTime); // Faqat 0 dan yuqori qiymatlar saqlanadi
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const finishTest = () => {
    const updatedScienceData = {
      science: science, // Fanning barcha ma'lumotlari
      selectedOptions, // Belgilangan javoblar
      completedTime: formatTime(timeLeft), // Qolgan vaqt
    };

    // Ma'lumotlarni localStorage ga saqlash
    localStorage.setItem("testData", JSON.stringify(updatedScienceData));
    setTimeLeft(0);
    setIsTestCompleted(true);
    alert(
      `${science.title} testi yakunlandi! Qolgan vaqt: ${formatTime(timeLeft)}`
    );

    // Foydalanuvchini o'z sahifasiga yo'naltirish
    navigate(`/home_page/${user}`);
  };

  useEffect(() => {
    const blockNavigation = (event) => {
      if (!isTestCompleted) {
        event.preventDefault();
        event.returnValue = "Saytdan chiqishni xohlaysizmi?";
      }
    };

    const handlePopState = () => {
      if (!isTestCompleted) {
        alert("Testni yakunlamasdan oldingi sahifaga qaytolmaysiz!");
        window.history.pushState(null, null, window.location.href);
      }
    };

    window.addEventListener("beforeunload", blockNavigation);
    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", blockNavigation);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isTestCompleted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const optionHandle = (questionId, option) => {
    const newSelectedOptions = { ...selectedOptions, [questionId]: option };
    const allTestData = JSON.parse(localStorage.getItem("testData")) || {};
    const updatedScienceData = {
      selectedOptions: newSelectedOptions,
      science,
    };
    const updatedTestData = {
      ...allTestData,
      [science.title]: updatedScienceData,
    };
    localStorage.setItem("testData", JSON.stringify(updatedTestData));
    setSelectedOptions(newSelectedOptions);
  };

  const [user, setUser] = useState();
  useEffect(() => {
    let userId = JSON.parse(localStorage.getItem("userData"));
    setUser(userId.id);
  }, []);

  return (
    <div
      className={`${styles.fCol} ${styles.container} bg-white py-10 flex-wrap`}
    >
      <div className={`lg:w-[60%] w-full ${styles.fCol}`}>
        <div className="flex gap-3 items-center justify-center mb-5">
          <img className="max-w-[50px] rounded-full" src={science.img} alt="" />
          <h2 className={`${styles.heading2}`}>{science.title}</h2>
        </div>

        <p className={`${styles.paragraph} text-center mb-3`}>
          Umumiy testlar soni: {testCount}
        </p>
        <p className={`${styles.paragraph} text-center mb-5`}>
          Qolgan vaqt: {formatTime(timeLeft)}
        </p>

        <ul className="flex-col flex w-full gap-5 mb-10">
          {testOnaTili.map((item) => (
            <li
              key={item.id}
              id={`${item.id}`}
              className="rounded-md border-2 border-formaColor"
            >
              <div className="flex gap-2 mb-2 p-2 bg-formaColor">
                <p className={`${styles.paragraph} !text-white`}>{item.id}.</p>
                <p className={`${styles.paragraph} !text-white`}>
                  {item.question}
                </p>
              </div>
              <ul className="p-2">
                {item.options.map((answer) => {
                  const isSelected = selectedOptions[item.id] === answer.option;
                  return (
                    <li
                      key={answer.option}
                      onClick={() => optionHandle(item.id, answer.option)}
                      className={`${styles.fBetween} gap-2 p-1 hover:bg-slate-200 rounded-sm cursor-pointer`}
                    >
                      <div className="flex gap-2 items-center">
                        <p className={`${styles.paragraph} uppercase`}>
                          {answer.option}.
                        </p>
                        <p className={`${styles.paragraph}`}>{answer.title}</p>
                      </div>
                      {isSelected && (
                        <img
                          src={checkmark}
                          alt="Checked"
                          className="w-5 h-5"
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
        {/* Har bir savolga tezkor o'tish */}
        <ul
          className={`${styles.fWrap} bg-white mb-10 !gap-3 border-2 rounded-md p-5 border-formaColor`}
        >
          {testOnaTili.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`${
                  keys.find((i) => i === item.id)
                    ? "!bg-formaColor text-white"
                    : ""
                } rounded-full border-2 sm:w-10 sm:h-10 w-8 h-8 cursor-pointer flex justify-center flex-col text-center border-formaColor`}
              >
                {item.id}
              </a>
            </li>
          ))}
        </ul>
        <Button title="Testni yakunlash" onClick={() => setHidden(true)} />
      </div>

      {hidden && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div
            className={`${styles.fCol} bg-white rounded-md p-8 w-[90%] max-w-[500px]`}
          >
            <div className="flex gap-3 items-center justify-center mb-5">
              <img
                className="max-w-[50px] rounded-full"
                src={science.img}
                alt=""
              />
              <h2 className={styles?.heading2}>{science.title}</h2>
            </div>
            <h3 className={`${styles.heading3} text-center mb-5`}>
              Testni rosdan yakunlamoqchimisiz?
            </h3>
            <div className="flex justify-between gap-4">
              <Button
                title="Yo'q"
                onClick={() => setHidden(false)}
                className="!bg-red-500"
              />
              <Button
                title="Ha"
                onClick={finishTest}
                className="!bg-green-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartTest;
