import React, { useState, useEffect } from "react";
import { styles } from "../../util/styles";
import { useNavigate, useParams } from "react-router";
import Button from "../Button";
import axios from "axios";

const SubjectOneData = () => {
  const [subject, setSubject] = useState();
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        const response = await axios.get(
          "https://schoole-59.onrender.com/api/subjects/subjects-data"
        );
        const subjectData = response.data.find((i) => i._id.toString() === id);

        if (!subjectData) {
          setError("Bu ID bo‘yicha fan topilmadi!");
          return;
        }

        setSubject(subjectData);
      } catch (error) {
        console.error(error);
        setError("Fanni yuklashda xatolik yuz berdi!");
      }
    };

    fetchSubjectData();
  }, [id]);

  const deleteSubject = async () => {
    setIsLoad(true);
    try {
      await axios.delete(
        `https://schoole-59.onrender.com/api/subjects/subject-delete/${id}`
      );
      setSubject(null);
      navigate("/hello-admin/panel/subjects");
    } catch (error) {
      console.error(error);
      setError("Fan o‘chirilmadi! Qayta urinib ko‘ring.");
    } finally {
      setIsLoad(false);
    }
  };

  if (error) {
    return (
      <h2
        className={`${styles.heading3} w-full py-18 !text-center text-red-500`}
      >
        {error}
      </h2>
    );
  }

  if (!subject) {
    return (
      <div className="w-full text-center align-middle py-20">
        <span className="admin__loader"></span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className={`${styles.heading2} text-center mb-3`}>Fan haqida</h2>
      <div className={`${styles.fBetween} !items-start`}>
        <div className={`${styles.fCol} !items-start gap-3 sm:w-[70%] w-full`}>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Fan nomi:{" "}
            <span className="font-normal capitalize">
              {subject.subjectname}
            </span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Ma'lumot: <span className="font-normal">{subject.description}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Testga ajratilgan vaqt:{" "}
            <span className="font-normal">{subject.duration} minut</span>
          </p>
          <p className={`${styles.paragraph} text-red-500`}>
            E'tibor bering. Agar fanni o'chirsangiz shu fanga doir testlar ham
            o'chib ketadi!
          </p>
          <Button
            title={
              isLoad ? (
                <span className="btns__loader"></span>
              ) : (
                `Fanni o'chirish`
              )
            }
            className={`hover:bg-red-400 active:bg-red-500 bg-red-500`}
            onClick={deleteSubject}
            disabled={isLoad}
          />
        </div>
        <div className={`w-full sm:w-[27%] ${styles.fCol} sm:mt-0 mt-5`}>
          <img
            src={subject.image}
            alt="Fan rasmi"
            className="sm:w-full w-[60%] object-cover h-[150px] rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default SubjectOneData;
