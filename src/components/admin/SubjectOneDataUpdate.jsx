import React, { useState } from "react";
import { styles } from "../../util/styles";
import Button from "../Button";
import Message from "./Message";
import { useParams } from "react-router";
import axios from "axios";

const SubjectOneDataUpdate = () => {
  const [subjectData, setSubjectData] = useState({
    subjectname: "",
    description: "",
    duration: null,
    image: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [isLoad, setIsLoad] = useState(false);

  const submitSubject = async (e) => {
    e.preventDefault();
    setIsLoad(true);
    setMessage(null);
    setError(null);
    try {
      const response = await axios.put(
        `https://schoole-59.onrender.com/api/subjects/subject-update/${id}`,
        subjectData
      );

      setMessage(response?.data?.message);
      setSubjectData({
        subjectname: "",
        description: "",
        image: "",
        duration: "",
      });
    } catch (error) {
      setError(error.response?.data?.message || "Xatolik yuz berdi!");
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className={`${styles.heading2} text-center gap-4 mb-5`}>
        Fan ma'lumotlarini o'zgartirish
      </h2>
      <form
        onSubmit={submitSubject}
        className={`w-full ${styles.fBetween} gap-4 mb-5`}
      >
        <div className="w-full  sm:w-[48%]">
          <label
            htmlFor="subjectname"
            className={`${styles.paragraph} font-semibold`}
          >
            Fan nomi
          </label>
          <input
            type="text"
            name="subjectname"
            className={`${styles.input}`}
            value={subjectData.subjectname}
            onChange={(e) =>
              setSubjectData({ ...subjectData, subjectname: e.target.value })
            }
          />
        </div>
        <div className="w-full sm:w-[48%]">
          <label
            htmlFor="image"
            className={`${styles.paragraph} font-semibold`}
          >
            Fanga rasm qo'shing(url ko'rinishida)
          </label>
          <input
            type="text"
            name="image"
            className={`${styles.input}`}
            value={subjectData.image}
            onChange={(e) =>
              setSubjectData({ ...subjectData, image: e.target.value })
            }
          />
        </div>
        <div className="w-full sm:w-[48%]">
          <label
            htmlFor="description"
            className={`${styles.paragraph} font-semibold`}
          >
            Fan va test haqida ma'lumot bering!
          </label>
          <textarea
            name="description"
            className={`${styles.input}`}
            value={subjectData.description}
            onChange={(e) =>
              setSubjectData({ ...subjectData, description: e.target.value })
            }
          ></textarea>
        </div>
        <div className="w-full sm:w-[48%]">
          <label
            htmlFor="description"
            className={`${styles.paragraph} font-semibold`}
          >
            Testga ajratilgan vaqtni kiriting(daqiqada)!
          </label>
          <input
            name="duration"
            className={`${styles.input}`}
            value={subjectData.duration}
            onChange={(e) =>
              setSubjectData({ ...subjectData, duration: e.target.value })
            }
            type="number"
          />
        </div>
        <Button
          disabled={isLoad}
          type="submit"
          title={isLoad ? <span className="btns__loader"></span> : "Yangilash"}
        />
      </form>
      <Message successMessage={message} errorMessage={error} />
    </div>
  );
};

export default SubjectOneDataUpdate;
