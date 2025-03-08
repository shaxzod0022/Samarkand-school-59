import React, { useEffect, useState } from "react";
import { styles } from "../../util/styles";
import Button from "../Button";
import Message from "./Message";
import { useParams } from "react-router";
import axios from "axios";

const TestUpdate = ({ newClass, testData, onClose }) => {
  const { id } = useParams();
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    subjectId: id || "",
    question: "",
    correctAnswer: "",
    options: { A: "", B: "", C: "", D: "" },
  });
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    if (testData) {
      setFormData({
        subjectId: testData.subjectId || id || "",
        question: testData.question || "",
        correctAnswer: testData.correctAnswer || "",
        options: testData.options || { A: "", B: "", C: "", D: "" },
      });
    }
  }, [testData, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["A", "B", "C", "D"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        options: { ...prev.options, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoad(true);
    try {
      const response = await axios.put(
        `https://schoole-59.onrender.com/api/tests/update-test/${testData._id}`,
        formData
      );
      setMessage(response?.data?.message || "Muvaffaqiyatli yangilandi");

      setTimeout(() => {
        setMessage("");
        onClose();
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <div
      className={`${
        newClass ? "block" : "hidden"
      } fixed bg-white z-50 rounded-lg p-4 sm:w-[80%] lg:w-[60%] w-[98%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
    >
      <h2 className={`${styles.heading2} text-center`}>Testni tahrirlash</h2>
      <button
        onClick={onClose}
        className={`${styles.fCol} absolute top-3 right-3 justify-center active:bg-red-300/50 rounded-full border-2 border-red-500 w-7 h-7 p-2`}
      >
        <i className="fa-solid text-red-500 fa-x"></i>
      </button>
      <form
        className={`${styles.fCol} gap-3 w-full !items-start`}
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <label
            className={`${styles.paragraph} font-semibold`}
            htmlFor="question"
          >
            Savolni kiriting!
          </label>
          <textarea
            className={`${styles.input}`}
            name="question"
            value={formData.question}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className={`${styles.fCol} w-full gap-3`}>
          <p className={`${styles.paragraph} w-full font-semibold`}>
            Variantlarni kiriting!
          </p>
          {["A", "B", "C", "D"].map((option) => (
            <div key={option} className={`${styles.fStart} w-full gap-3`}>
              <label
                className={`${styles.paragraph} font-semibold`}
                htmlFor={option}
              >
                {option}:
              </label>
              <input
                name={option}
                type="text"
                required
                className={`${styles.input}`}
                value={formData.options[option]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        <p className={`${styles.paragraph} font-semibold`}>
          To'g'ri javobni tanlang!
        </p>
        <div className={`${styles.fStart} gap-5`}>
          {["A", "B", "C", "D"].map((option) => (
            <div key={option} className={`${styles.fStart} gap-2`}>
              <label
                className={`${styles.paragraph} font-semibold`}
                htmlFor="correctAnswer"
              >
                {option}:
              </label>
              <input
                required
                className="cursor-pointer"
                type="radio"
                name="correctAnswer"
                value={option}
                checked={formData.correctAnswer === option}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        <div className={`${styles.fStart} gap-3`}>
          <Button disabled={isLoad} type="submit" title={`Yangilash`} />
          <Button
            title={"Bekor qilish"}
            className={`hover:bg-red-400 active:bg-red-500 bg-red-500`}
            onClick={onClose}
          />
        </div>
        <Message errorMessage={error} successMessage={message} />
      </form>
    </div>
  );
};

export default TestUpdate;
