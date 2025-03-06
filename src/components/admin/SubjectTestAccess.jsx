import React, { useEffect, useState } from "react";
import axios from "axios";
import { styles } from "../../util/styles";
import { useParams } from "react-router";

const SubjectTestAccess = () => {
  const [subjectsData, setSubjectsData] = useState([]);
  const { id: studentId } = useParams();
  const [access, setAccess] = useState({});

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "https://schoole-59.onrender.com/api/subjects/subjects-data"
        );
        setSubjectsData(response.data);
      } catch (error) {
        console.error("Fanni olishda xatolik:", error);
      }
    };

    const getSubjectAccess = async () => {
      try {
        const response = await axios.get(
          `https://schoole-59.onrender.com/api/subject-access/check-subject-all/${studentId}`
        );

        const accessMap = {};
        response.data.forEach((item) => {
          accessMap[item.subjectId] = item.isAllowed;
        });

        setAccess(accessMap);
      } catch (error) {
        console.error("Fanga kirish huquqini olishda xatolik:", error);
      }
    };

    fetchSubjects();
    getSubjectAccess();
  }, [studentId]);

  const subjectAccess = async (subjectId) => {
    try {
      const endpoint = access[subjectId]
        ? "/api/subject-access/block-subject-access"
        : "/api/subject-access/allow-subject-access";

      await axios.post(`https://schoole-59.onrender.com${endpoint}`, {
        studentId,
        subjectId,
      });

      // API chaqirilgandan keyin access obyektini yangilash
      setAccess((prev) => ({
        ...prev,
        [subjectId]: !prev[subjectId],
      }));
    } catch (error) {
      console.error("Ruxsatni yangilashda xatolik:", error);
    }
  };

  if (!subjectsData.length) {
    return (
      <div className="w-full text-center align-middle py-20">
        <span className="admin__loader"></span>
      </div>
    );
  }

  if (subjectsData.length === 0) {
    return (
      <h2 className={`${styles.heading2} text-center py-16 w-full`}>
        Ma'lumot topilmadi
      </h2>
    );
  }

  return (
    <div className="w-full">
      <h2 className={`${styles.heading2} text-center mb-3`}>
        Fan testlarini yechishga ruxsat berish yoki bloklash
      </h2>
      <div className={`w-full mb-6 ${styles.fBetween} gap-7 !items-start`}>
        {subjectsData.map((item) => (
          <div
            key={item._id}
            className={`${styles.fBetween} gap-3 md:w-[46%] lg:w-[30%] w-full border-2 rounded-md p-5`}
          >
            <div className={`${styles.fStart} flex-wrap gap-3`}>
              <img
                src={item.image}
                alt={item.subjectname}
                className="md:w-[60px] w-[40px] h-[40px] rounded-full object-cover md:h-[60px]"
              />
              <p
                className={`${styles.paragraph} text-center font-bold capitalize`}
              >
                {item.subjectname}
              </p>
            </div>
            <button
              onClick={() => subjectAccess(item._id)}
              className={`transition-all duration-300 border-2 rounded-2xl w-[50px] h-[25px] ${
                access[item._id] ? "border-green-500" : "border-red-500"
              }`}
            >
              <div
                className={`w-1/2 h-full border-2 border-white rounded-full ${
                  access[item._id] ? "bg-green-500 ml-auto" : "bg-red-500"
                }`}
              ></div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectTestAccess;
