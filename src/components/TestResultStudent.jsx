import React, { useEffect, useState } from "react";
import { styles } from "../util/styles";
import { useParams } from "react-router";
import axios from "axios";

const TestResultStudent = () => {
  const [mergedResults, setMergedResults] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultsResponse = await axios.get(
          `https://schoole-59.onrender.com/api/results-tests/student-results/${id}`
        );
        if (!resultsResponse?.data?.results?.length) {
          setMergedResults([]);
          return;
        }

        const results = resultsResponse.data.results;

        const subjectsResponse = await axios.get(
          `https://schoole-59.onrender.com/api/subjects/subjects-data`
        );
        if (!subjectsResponse?.data?.length) {
          setMergedResults([]);
          return;
        }

        const subjects = subjectsResponse.data;

        const mergedData = results
          .map((result) => {
            const subject = subjects.find(
              (subj) => subj._id.toString() === result.subjectId._id.toString()
            );
            return subject ? { ...subject, testResults: result.results } : null;
          })
          .filter(Boolean);
        setMergedResults(mergedData);
      } catch (error) {
        console.error("Ma'lumotlarni olishda xatolik:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!mergedResults.length) {
    return (
      <div className="w-full text-center align-middle py-20 h-[58vh]">
        <span className="admin__loader"></span>
      </div>
    );
  }

  return (
    <div className="w-full h-[58vh]">
      <h2 className={`${styles.heading2} text-center mb-3`}>
        Ishlagan test natijalari
      </h2>
      <div className={`w-full mb-6 ${styles.fBetween} gap-7 !items-start`}>
        {mergedResults.map((subject) => (
          <div
            key={subject._id}
            className={`${styles.fCol} !items-start gap-1 md:w-[46%] lg:w-[30%] w-full border-2 rounded-md p-5`}
          >
            <div className={`${styles.fStart} flex-wrap gap-3`}>
              <img
                src={subject.image}
                alt={subject.subjectname}
                className="w-[50px] h-[50px] object-cover rounded-full"
              />
              <p
                className={`${styles.paragraph} text-center !font-semibold capitalize`}
              >
                {subject.subjectname}
              </p>
            </div>
            <p className={`${styles.paragraph}`}>
              Berilgan vaqt:{" "}
              <span className="font-semibold">{subject.duration} daqiqa</span>
            </p>
            <p className={`${styles.paragraph}`}>
              Teslar soni:{" "}
              <span className="font-semibold">
                {subject.testResults.length}
              </span>
            </p>
            <p className={`${styles.paragraph}`}>
              To'g'ri javoblar:
              <span className="font-semibold">
                {subject.testResults.filter((i) => i.isCorrect).length}
              </span>
            </p>
            <p className={`${styles.paragraph}`}>
              Noto'g'ri javoblar:
              <span className="font-semibold">
                {subject.testResults.filter((i) => !i.isCorrect).length}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestResultStudent;
