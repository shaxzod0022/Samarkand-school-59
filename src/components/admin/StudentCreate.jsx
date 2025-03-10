import React, { useState } from "react";
import { styles } from "../../util/styles";
import Button from "../Button";
import { studentCreate } from "../../util/constants";
import Message from "./Message";
import axios from "axios";

const StudentCreate = () => {
  const [studentData, setStudentData] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoad(true);
    try {
      await axios.post(
        `https://schoole-59.onrender.com/api/students/create`,
        studentData
      );
      setMessage("Ma'lumotlar muvaffaqiyatli qo'shildi!");
      setStudentData({});
    } catch (err) {
      setError(err.response?.data?.message);
    } finally {
      setIsLoad(false);
    }

    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full mb-6">
      <h2 className={`${styles.heading2} text-center mb-5`}>
        O'quvchi qo'shish
      </h2>
      <form
        onSubmit={handleSubmit}
        className={`${styles.fCol} gap-5 !items-start`}
      >
        <div className={`${styles.fBetween} gap-5`}>
          {studentCreate.map((item, idx) => (
            <div
              key={idx}
              className={`${styles.fCol} !items-start w-full lg:w-[30%] md:w-[45%]`}
            >
              <label className="font-semibold sm:text-[18px] text-[16px]">
                {item.label}
              </label>

              {item.type === "radio" ? (
                <div className={`${styles.fStart} gap-5`}>
                  <div className={`${styles.fStart} gap-2`}>
                    <span>Erkak</span>
                    <input
                      type={item.type}
                      name={item.name}
                      value="Erkak"
                      className="cursor-pointer"
                      checked={studentData[item.name] === "Erkak"}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={`${styles.fStart} gap-2`}>
                    <span>Ayol</span>
                    <input
                      type={item.type}
                      name={item.name}
                      value="Ayol"
                      className="cursor-pointer"
                      checked={studentData[item.name] === "Ayol"}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              ) : (
                <input
                  className={`${styles.input}`}
                  type={item.type}
                  name={item.name}
                  value={studentData[item.name] || ""}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          ))}
        </div>
        <Button
          disabled={isLoad}
          type={"submit"}
          title={isLoad ? <span className="btns__loader"></span> : "Qo'shish"}
        />
      </form>
      <Message successMessage={message} errorMessage={error} />
    </div>
  );
};

export default StudentCreate;
