import React, { useState } from "react";
import { styles } from "../../util/styles";
import Button from "../Button";
import { adminPermittedInfo } from "../../util/constants";
import Message from "./Message";
import { useParams } from "react-router";
import axios from "axios";

const StudentOneDataUpdate = () => {
  const [studentData, setStudentData] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const [isLoad, setIsLoad] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoad(true);

    try {
      await axios.put(
        `https://schoole-59.onrender.com/api/students/update-student-data/${id}`,
        studentData
      );
      setMessage("Ma'lumotlar muvaffaqiyatli yangilandi!");
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
    <div className="w-full">
      <h2 className={`${styles.heading2} text-center mb-5`}>
        O'quvchi ma'lumotlarini yangilash
      </h2>
      <form
        onSubmit={handleSubmit}
        className={`${styles.fCol} gap-5 !items-start`}
      >
        <div className={`${styles.fBetween} gap-5`}>
          {adminPermittedInfo.map((item) => (
            <div
              key={item.name}
              className={`${styles.fCol} !items-start w-full lg:w-[30%] md:w-[45%]`}
            >
              {item.name !== "subject" && (
                <>
                  <label
                    htmlFor={item.name}
                    className="font-semibold sm:text-[18px] text-[16px]"
                  >
                    {item.label}
                  </label>
                  {item.type === "radio" ? (
                    <div className={`${styles.fStart} gap-5`}>
                      {["Erkak", "Ayol"].map((gender) => (
                        <label
                          key={gender}
                          className={`${styles.fStart} gap-2 cursor-pointer`}
                        >
                          <input
                            type="radio"
                            name={item.name}
                            value={gender}
                            className="cursor-pointer"
                            checked={studentData[item.name] === gender}
                            onChange={handleChange}
                            required
                          />
                          {gender}
                        </label>
                      ))}
                    </div>
                  ) : (
                    <input
                      id={item.name}
                      className={`${styles.input}`}
                      type={item.type}
                      name={item.name}
                      value={studentData[item.name] || ""}
                      onChange={handleChange}
                      required
                    />
                  )}
                </>
              )}
            </div>
          ))}
        </div>
        <Button
          disabled={isLoad}
          type={"submit"}
          title={isLoad ? <span className="btns__loader"></span> : "Yangilash"}
        />
      </form>
      <Message successMessage={message} errorMessage={error} />
    </div>
  );
};

export default StudentOneDataUpdate;
