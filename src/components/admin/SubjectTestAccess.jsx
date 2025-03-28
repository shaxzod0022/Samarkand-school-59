import React, { useEffect, useState } from "react";
import axios from "axios";
import { styles } from "../../util/styles";
import { useParams } from "react-router";

const SubjectTestAccess = () => {
  const [subjectsData, setSubjectsData] = useState([]);
  const { id: studentId } = useParams();
  const [access, setAccess] = useState({});
  const [maxAllowed, setMaxAllowed] = useState({});
  const [barchaTest, setBarchaTest] = useState({});
  const [totalQuestions, setTotalQuestions] = useState({});
  const [isLoad, setIsLoad] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "https://schoole-59.onrender.com/api/subjects/subjects-data"
        );
        setSubjectsData(response.data);

        const totalQMap = {};
        response.data.forEach((item) => {
          totalQMap[item._id] = item.totalQuestions || null;
        });
        setTotalQuestions(totalQMap);
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
        const maxAllowedMap = {};
        const barchaTestMap = {};

        response.data.forEach((item) => {
          accessMap[item.subjectId] = item.isAllowed;
          maxAllowedMap[item.subjectId] = item.maxAllowed || 1;
          barchaTestMap[item.subjectId] = item.barchaTest || false;
        });

        setAccess(accessMap);
        setMaxAllowed(maxAllowedMap);
        setBarchaTest(barchaTestMap);
      } catch (error) {
        console.error("Fanga kirish huquqini olishda xatolik:", error);
      }
    };

    fetchSubjects();
    getSubjectAccess();
  }, [studentId]);

  const subjectAccess = async (subjectId) => {
    if (!maxAllowed[subjectId] && !barchaTest[subjectId]) {
      alert("Iltimos, test sonini kiriting yoki barcha testni tanlang!");
      return;
    }

    setIsLoad(subjectId);
    try {
      const endpoint = access[subjectId]
        ? "/api/subject-access/block-subject-access"
        : "/api/subject-access/allow-subject-access";

      await axios.post(`https://schoole-59.onrender.com${endpoint}`, {
        studentId,
        subjectId,
        maxAllowed: barchaTest[subjectId]
          ? totalQuestions[subjectId]
          : maxAllowed[subjectId],
        barchaTest: barchaTest[subjectId],
      });

      setAccess((prev) => ({
        ...prev,
        [subjectId]: !prev[subjectId],
      }));
    } catch (error) {
      console.error("Ruxsatni yangilashda xatolik:", error);
    } finally {
      setIsLoad(null);
    }
  };

  return (
    <div className="w-full">
      <h2 className={`${styles.heading2} text-center mb-3`}>
        Fan testlarini yechishga ruxsat berish yoki bloklash
      </h2>
      <div className={`w-full mb-6 ${styles.fBetween} gap-7 !items-start`}>
        {subjectsData.map((item) => (
          <div
            key={item._id}
            className={`${styles.fCol} !items-start gap-3 md:w-[46%] lg:w-[30%] w-full border-2 rounded-md p-5`}
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
            <div className={`${styles.fCol} !items-start`}>
              <label className={`${styles.paragraph}`} htmlFor="">
                Nechta test savoliga ruxsat berasiz?
              </label>
              <div className={`${styles.fStart} flex-wrap gap-3`}>
                <input
                  disabled={access[item._id] || barchaTest[item._id]}
                  type="number"
                  className={`${styles.input} !p-1 !w-24`}
                  min={1}
                  value={maxAllowed[item._id] || ""}
                  onChange={(e) =>
                    setMaxAllowed({
                      ...maxAllowed,
                      [item._id]: e.target.value,
                    })
                  }
                />
                <div className={`${styles.fStart} gap-2 mt-2`}>
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    checked={barchaTest[item._id] || false}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setBarchaTest({ ...barchaTest, [item._id]: isChecked });
                      if (isChecked) {
                        setMaxAllowed({
                          ...maxAllowed,
                          [item._id]: totalQuestions[item._id],
                        });
                      }
                    }}
                    disabled={access[item._id]}
                  />
                  <label className={`${styles.paragraph}`}>
                    Barcha testga ruxsat
                  </label>
                </div>
                {isLoad === item._id ? (
                  <span className="access__btn__loader"></span>
                ) : (
                  <button
                    disabled={isLoad}
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
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectTestAccess;
