import React, { useState } from "react";
import { styles } from "../../util/styles";
import Button from "../Button";
import Message from "./Message";
import { useParams } from "react-router";
import axios from "axios";

const TestAddToSubject = () => {
  const { id } = useParams();
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    subjectId: id || "",
    question: "",
    correctAnswer: "",
    options: { A: "", B: "", C: "", D: "" },
  });

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
    try {
      const response = await axios.post("https://schoole-59.onrender.com/api/tests/create-test", formData);
      setMessage(response?.data?.message || "Muvaffaqiyatli");
      setFormData({
        subjectId: id || "",
        question: "",
        correctAnswer: "",
        options: { A: "", B: "", C: "", D: "" },
      });
    } catch (error) {
      setError(error.response?.data?.message || "Xatolik!");
    }
  };

  return (
    <>
      <h2 className={`${styles.heading2} text-center`}>Test qo'shish</h2>
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
        <Button type="submit" title={`Qo'shish`} />
        <Message errorMessage={error} successMessage={message} />
      </form>
    </>
  );
};

export default TestAddToSubject;
