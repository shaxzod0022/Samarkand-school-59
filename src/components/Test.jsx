import React, { useEffect, useState } from "react";
import { styles } from "../util/styles";
import { useNavigate, useParams } from "react-router";
import Button from "./Button";
import studentApi from "../services/studentApi";
import axios from "axios";

const Test = () => {
  const navigate = useNavigate();
  const { id: subjectId } = useParams();
  const [subjectData, setSubjectData] = useState(null);
  const [checkSubjectAccess, setCheckSubjectAccess] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [maxAllowedTests, setMaxAllowedTests] = useState(null); // Ruxsat berilgan testlar soni

  useEffect(() => {
    const storeStudentData = sessionStorage.getItem("studentData");
    if (storeStudentData) {
      const data = JSON.parse(storeStudentData);
      setStudentId(data.student._id);
    }
  }, []);

  useEffect(() => {
    const getTest = async () => {
      try {
        const response = await studentApi.get("/subjects/subjects-data");
        const data = response?.data?.find((i) => i._id === subjectId);
        setSubjectData(data);
      } catch (error) {
        console.error("Fanni olishda xatolik:", error);
      }
    };

    if (subjectId) getTest();
  }, [subjectId]);

  useEffect(() => {
    if (!studentId || !subjectId) return;

    const checkSubject = async () => {
      try {
        const response = await axios.get(
          `https://schoole-59.onrender.com/api/subject-access/check-subject-access/${studentId}/${subjectId}`
        );

        const accessData = response.data;
        setCheckSubjectAccess(accessData);

        if (accessData.allowed !== null) {
          setMaxAllowedTests(accessData.allowed);
          sessionStorage.setItem("maxAllowedTests", accessData.allowed);
        }
      } catch (error) {
        console.error("Ruxsatni tekshirishda xatolik:", error);
        setCheckSubjectAccess(false);
      }
    };

    checkSubject();
  }, [studentId, subjectId]);

  if (!subjectData) {
    return (
      <div className={`${styles.heading2} w-full h-[58vh] text-center`}>
        <div className="w-full text-center align-middle py-20">
          <span className="admin__loader"></span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center bg-white mb-10`}>
      <div
        className={`flex items-center flex-col text-center md:w-[50%] w-full sm:p-10 p-2`}
      >
        <img
          className="lg:w-[400px] md:w-[300px] w-[80%] rounded-lg object-cover"
          src={subjectData.image}
          alt={subjectData.subjectname}
        />
      </div>
      <div className="md:w-[50%] w-full sm:p-10 p-2">
        <h2
          className={`${styles.heading2} sm:text-start text-center mb-5 capitalize`}
        >
          {subjectData.subjectname}
        </h2>
        <p className={`${styles.paragraph} mb-4`}>{subjectData.description}</p>

        {checkSubjectAccess ? (
          <>
            <p className="text-green-600 mb-2">
              Ruxsat berilgan testlar soni:{" "}
              {maxAllowedTests !== null ? maxAllowedTests : "Cheklanmagan"}
            </p>
            <Button
              title={"Testni boshlash"}
              onClick={() => navigate(`/start_test_page/${subjectData._id}`)}
            />
          </>
        ) : (
          <p className="text-red-500">Test yechishga ruxsat berilmagan!</p>
        )}
      </div>
    </div>
  );
};

export default Test;
