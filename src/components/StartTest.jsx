import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import studentApi from "../services/studentApi";
import Button from "./Button";
import CompletedTest from "./CompletedTest";
import { checkmark } from "../assets";
import { styles } from "../util/styles";

const StartTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [tests, setTests] = useState();
  const [studentId, setStudentId] = useState("");
  const [countdown, setCountdown] = useState(null); // Test vaqti
  const [subjectInfo, setSubjectInfo] = useState();
  const [startTime, setStartTime] = useState(null); // 🕒 Test boshlanish vaqti

  useEffect(() => {
    const getSubject = async () => {
      try {
        const response = await studentApi.get("/subjects/subjects-data");
        const data = response?.data?.find((i) => i._id === id);

        const savedTime = sessionStorage.getItem(`testCountdown-${id}`);
        const remainingTime = savedTime
          ? parseInt(savedTime, 10)
          : data.duration * 60;

        setCountdown(remainingTime);
        setSubjectInfo(data);

        const savedStartTime = sessionStorage.getItem(`testStartTime-${id}`);
        if (!savedStartTime) {
          const now = Date.now();
          sessionStorage.setItem(`testStartTime-${id}`, now.toString());
          setStartTime(now);
        } else {
          setStartTime(parseInt(savedStartTime, 10));
        }
      } catch (error) {
        console.error(error);
      }
    };
    getSubject();

    const getTests = async () => {
      try {
        const response = await studentApi.get(`/tests/tests-by-subject/${id}`);
        setTests(response.data.length !== 0 ? response.data : null);
      } catch (error) {
        console.error("Testlarni olishda xatolik: ", error);
      }
    };
    getTests();

    const savedData = sessionStorage.getItem("testData");
    if (savedData) {
      setSelectedOptions(JSON.parse(savedData));
    }

    const studentData = sessionStorage.getItem("studentData");
    if (studentData) {
      const data = JSON.parse(studentData);
      setStudentId(data.student._id);
    }

    const preventBackNavigation = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventBackNavigation);

    return () => {
      window.removeEventListener("popstate", preventBackNavigation);
    };
  }, [id]);

  const submitTest = useCallback(async () => {
    const answers = Object.entries(selectedOptions).map(
      ([questionId, selectedOption]) => ({
        questionId,
        selectedOption,
      })
    );

    const testData = {
      studentId: studentId,
      subjectId: id,
      answers,
      timeTaken: Math.floor((Date.now() - startTime) / 1000), // 🕒 O‘tgan vaqt (sekundda)
    };

    try {
      await studentApi.post("/results-tests/submit-test", testData);
      await studentApi.post("/subject-access/block-subject-access", {
        studentId: studentId,
        subjectId: id,
      });

      sessionStorage.removeItem(`testCountdown-${id}`);
      sessionStorage.removeItem(`testStartTime-${id}`);
      sessionStorage.removeItem("testData");

      navigate(`/home_page`);
    } catch (error) {
      console.error("Testni jo‘natishda xatolik:", error);
    }
  }, [id, studentId, selectedOptions, startTime, navigate]); // ✅ useCallback dependencies qo‘shildi

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          const newTime = prev - 1;
          sessionStorage.setItem(`testCountdown-${id}`, newTime.toString());
          return newTime;
        });
      }, 1000);
      return () => clearInterval(timer);
    }

    if (countdown === 0) {
      submitTest();
    }
  }, [countdown, id, submitTest]); // ✅ submitTest dependenciesga qo'shildi

  const optionHandle = (questionId, option) => {
    const newSelectedOptions = { ...selectedOptions, [questionId]: option };
    sessionStorage.setItem("testData", JSON.stringify(newSelectedOptions));
    setSelectedOptions(newSelectedOptions);
  };

  const finishTest = () => {
    setHidden(true);
  };

  if (!tests) {
    return (
      <div className="w-full text-center align-middle py-20">
        <span className="admin__loader"></span>
      </div>
    );
  }

  if (tests.length === 0) {
    return (
      <h2 className={`${styles.heading2} py-16 text-center`}>Ma'lumot topilmadi</h2>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <div className="lg:w-[60%] w-full">
        <h2 className="text-2xl font-semibold text-center mb-5">
          Fan bo‘yicha testlar
        </h2>

        <div className="text-center text-lg font-semibold text-red-600 mb-2">
          ⏳ Qolgan vaqt: {Math.floor(countdown / 60)} daqiqa {countdown % 60}{" "}
          soniya
        </div>

        <ul className="flex flex-col gap-5 mb-10">
          {tests?.map((item, index) => (
            <li
              key={item._id}
              className="rounded-md border-2 border-formaColor"
            >
              <div className="flex gap-2 p-2 bg-formaColor rounded-sm text-white">
                <p>{index + 1}.</p>
                <p>{item.question}</p>
              </div>
              <ul className="p-2">
                {Object.entries(item.options).map(([key, value]) => (
                  <li
                    key={key}
                    onClick={() => optionHandle(item._id, key)}
                    className="flex justify-between gap-2 p-1 hover:bg-gray-200 rounded-sm cursor-pointer"
                  >
                    <div className="flex gap-2 items-center">
                      <p className="uppercase">{key}.</p>
                      <p>{value}</p>
                    </div>
                    {selectedOptions[item._id] === key && (
                      <img src={checkmark} alt="Checked" className="w-5 h-5" />
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <Button title="Testni yakunlash" onClick={finishTest} />
      </div>
      <CompletedTest
        hidden={hidden}
        subjectInfo={subjectInfo}
        onClose={() => setHidden((i) => !i)}
        submit={submitTest}
      />
    </div>
  );
};

export default StartTest;
