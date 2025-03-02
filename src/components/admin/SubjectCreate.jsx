import React, { useState } from "react";
import { styles } from "../../util/styles";
import Button from "../Button";
import Message from "./Message";
import axios from "axios";

const SubjectCreate = () => {
  const [subjectData, setSubjectData] = useState({
    subjectname: "",
    description: "",
    duration: null,
    image: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const submitSubject = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    try {
      const response = await axios.post(
        "https://schoole-test-site.onrender.com/api/subjects/create-subject",
        subjectData
      );
      setMessage(response.data.message);
      setSubjectData({
        subjectname: "",
        description: "",
        image: null,
        duration: "",
      });
    } catch (error) {
      setError(error.response?.data?.message || "Xatolik yuz berdi!");
    }
  };

  return (
    <div className="w-full">
      <h2 className={`${styles.heading2} text-center mb-5`}>Fan qo'shish</h2>
      <form
        onSubmit={submitSubject}
        className={`w-full ${styles.fBetween} gap-4 mb-5`}
      >
        <div className="w-full sm:w-[48%]">
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
            required
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
            required
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
            required
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
        <Button type="submit" title="Qo'shish" />
      </form>
      <Message successMessage={message} errorMessage={error} />
    </div>
  );
};

export default SubjectCreate;
