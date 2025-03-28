import React, { useEffect, useState } from "react";
import { styles } from "../../util/styles";
import { useParams } from "react-router";
import Button from "../Button";
import Message from "./Message";
import TestUpdate from "./TestUpdate";
import FullTestOne from "./FullTestOne";
import axios from "axios";

const SubjectTestsData = () => {
  const [testsData, setTestsData] = useState([]);
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [updateTes, setUpdateTest] = useState();
  const [fullTestData, setFullTestData] = useState();
  const [updateHidden, setUpdateHidden] = useState(false);
  const [fullTestHidden, setFullTestHidden] = useState(false);
  const [isLoad, setIsLoad] = useState(null);
  const [hidden, setHidden] = useState(3);
  const { id } = useParams();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(
          `https://schoole-59.onrender.com/api/tests/tests-by-subject/${id}`
        );
        setTestsData(response.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };

    fetchTests();
  }, [id]);

  const deleteTest = async (testId) => {
    setIsLoad(testId);
    try {
      const response = await axios.delete(
        `https://schoole-59.onrender.com/api/tests/delete-test/${testId}`
      );
      setMessage(response?.data?.message || "Muvaffaqiyatli o'chirildi");
    } catch (error) {
      setError(error);
    } finally {
      setIsLoad(null);
    }
  };

  if (!testsData) {
    return (
      <div className="w-full text-center align-middle py-20">
        <span className="admin__loader"></span>
      </div>
    );
  }

  const updateTest = (id) => {
    const test = testsData.find((i) => i._id === id);
    setUpdateTest(test);
    setUpdateHidden(true);
  };

  const fullTest = (id) => {
    const test = testsData.find((i) => i._id === id);
    setFullTestData(test);
    setFullTestHidden(true);
  };

  return (
    <div className={`${styles.fCol} w-full`}>
      <h2 className={`${styles.heading2} text-center mb-1`}>Testlar</h2>
      <p
        className={`${styles.paragraph} w-full text-center mb-3 font-semibold`}
      >
        Jami testlar soni: {testsData.length}
      </p>
      <div className={`w-full mb-6 ${styles.fBetween} gap-7 !items-start`}>
        {testsData.slice(0, hidden).map((item) => (
          <div
            key={item._id}
            className={`${styles.fCol} gap-1 md:w-[46%] lg:w-[31%] w-full border-2 rounded-md p-5`}
          >
            <p className={`${styles.paragraph} !font-normal w-full`}>
              Savol:{" "}
              <span className="font-semibold">
                {item.question.slice(0, 20)}...
              </span>
            </p>
            <p className={`${styles.paragraph} w-full`}>
              To'g'ri javob:{" "}
              <span className="font-semibold">{item.correctAnswer}</span>
            </p>
            <p className={`${styles.paragraph} w-full`}>Variantlar:</p>
            <div className="w-full">
              <p className="font-semibold">A: {item.options.A.slice(0, 15)}</p>
              <p className="font-semibold">B: {item.options.B.slice(0, 15)}</p>
              <p className="font-semibold">C: {item.options.C.slice(0, 15)}</p>
              <p className="font-semibold">D: {item.options.D.slice(0, 15)}</p>
            </div>
            <p className={`${styles.paragraph} w-full`}>
              Test tuzilgan vaqti:{" "}
              <span className="font-semibold">
                {item.createdAt.slice(0, 10)}
              </span>
            </p>
            <div className={`${styles.fStart} flex-wrap w-full gap-3`}>
              <Button
                onClick={() => fullTest(item._id)}
                title={`To'lig'i`}
                className={`hover:bg-blue-400 !py-1 !px-3 active:bg-blue-500 bg-blue-500`}
              />
              <Button
                title={
                  isLoad === item._id ? (
                    <span className="btns__loader"></span>
                  ) : (
                    `O'chirish`
                  )
                }
                className={`hover:bg-red-400 !py-1 !px-3 active:bg-red-500 bg-red-500`}
                onClick={() => deleteTest(item._id)}
                disabled={isLoad === item._id}
              />
              <Button
                onClick={() => updateTest(item._id)}
                title={`Yangilash`}
                className={`hover:bg-green-400 !py-1 !px-3 active:bg-green-500 bg-green-500`}
              />
            </div>
          </div>
        ))}
      </div>
      <Button
        title={hidden === 3 ? "Hammasini ko'rsatish" : "Kamroq ko'rsatish"}
        onClick={() => setHidden((i) => (i === 3 ? testsData.length : 3))}
      />
      <Message successMessage={message} errorMessage={error} />
      <TestUpdate
        newClass={updateHidden}
        testData={updateTes}
        onClose={() => setUpdateHidden(false)}
      />
      <FullTestOne
        newClass={fullTestHidden}
        test={fullTestData}
        onClose={() => setFullTestHidden(false)}
      />
      <div
        onClick={() => {
          setUpdateHidden(false);
          setFullTestHidden(false);
        }}
        className={`${
          updateHidden || fullTestHidden ? "block" : "hidden"
        } w-full h-[100vh] fixed inset-0 backdrop-blur-md bg-gray-900/50 z-40`}
      ></div>
    </div>
  );
};

export default SubjectTestsData;
