import React, { useEffect, useState } from "react";
import { styles } from "../util/styles";
import { useParams } from "react-router";
import axios from "axios";
import ResultSlider from "./ResultSlider";

const TestResultStudent = () => {
  const [groupedResults, setGroupedResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resultsResponse = await axios.get(
          `https://schoole-59.onrender.com/api/results-tests/student-results/${id}`
        );

        const results = resultsResponse?.data?.results || [];

        if (!results.length) {
          setGroupedResults([]);
          setLoading(false);
          return;
        }

        const subjectsResponse = await axios.get(
          `https://schoole-59.onrender.com/api/subjects/subjects-data`
        );

        const subjects = subjectsResponse?.data || [];

        if (!subjects.length) {
          setGroupedResults([]);
          setLoading(false);
          return;
        }

        // Natijalarni fanlar bo‘yicha guruhlash
        const groupedData = subjects
          .map((subject) => {
            const subjectResults = results
              .filter((result) => result.subjectId._id === subject._id)
              .map((result) => ({
                testResults: result.results,
                timeTaken: result.timeTaken,
                createdAt: new Date(result.createdAt).toLocaleString("uz-UZ", {
                  timeZone: "Asia/Tashkent",
                }),
              }))
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Eng yangi natija birinchi

            return subjectResults.length > 0
              ? {
                  ...subject,
                  testResults: subjectResults,
                }
              : null;
          })
          .filter(Boolean);

        setGroupedResults(groupedData);
      } catch (error) {
        console.error("Ma'lumotlarni olishda xatolik:", error);
        setGroupedResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full text-center align-middle py-20 h-[58vh]">
        <span className="admin__loader"></span>
      </div>
    );
  }

  if (groupedResults.length === 0) {
    return (
      <div className="w-full text-center align-middle py-20 h-[58vh]">
        <h2 className={`${styles.heading2}`}>Natijalar yo'q</h2>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className={`${styles.heading2} text-center mb-3`}>
        Ishlagan test natijalari
      </h2>
      <div
        className={`w-full mb-6 ${styles.fBetween} gap-4`}
      >
        {groupedResults.map((subject) => (
          <div
            key={subject._id}
            className="w-full md:w-[46%] lg:w-[30%] border-2 rounded-md p-5 bg-white"
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src={subject.image}
                alt={subject.subjectname}
                className="w-[50px] h-[50px] object-cover rounded-full"
              />
              <p className={`${styles.paragraph} font-semibold`}>
                {subject.subjectname}
              </p>
            </div>
            <p className={`${styles.paragraph}`}>
              Testga ajratilgan vaqt:{" "}
              <span className="font-semibold">{subject.duration}</span>
            </p>
            <ResultSlider results={subject.testResults} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestResultStudent;
