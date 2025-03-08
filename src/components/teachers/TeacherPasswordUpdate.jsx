import React, { useEffect, useState } from "react";
import { styles } from "../../util/styles";
import Button from "../Button";
import teacherApi from "../../services/teacherApi";
import Message from "../admin/Message";

const TeacherPasswordUpdate = () => {
  const [passData, setPassData] = useState({ oldPass: "", newPass: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState("");
  const [teacherId, setTeacherId] = useState();
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const storeTeacherData = sessionStorage.getItem("teacherData");
    if (storeTeacherData) {
      const data = JSON.parse(storeTeacherData);
      setTeacherId(data);
    }
  }, []);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setIsLoad(true);

    if (passData.newPass.length < 4) {
      setInputError("Parol kamida 4 ta belgidan iborat bo‘lishi kerak!");
      setIsLoad(false);
      return;
    }

    setInputError("");

    try {
      await teacherApi.put(
        `/teacher/update-password/${teacherId.teacher._id}`,
        passData,
        { headers: { Authorization: `Bearer ${teacherId.token}` } }
      );
      setMessage("Parol muvaffaqiyatli yangilandi");
      setPassData({ oldPass: "", newPass: "" });
    } catch (error) {
      setError(error.response?.data?.message || "Serverda xatolik yuz berdi!");
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    if (message || error || inputError) {
      const timer = setTimeout(() => {
        setMessage("");
        setError("");
        setInputError("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message, error, inputError]);

  return (
    <div className={`w-full`}>
      <h2 className={`${styles.heading2} text-center mb-3`}>
        O'qituvchi parolini yangilash
      </h2>
      <form
        onSubmit={handlePasswordUpdate}
        className={`${styles.fCol} lg:w-[30%] md:w-[45%] w-full gap-5 !items-start`}
      >
        <input
          type="password"
          placeholder="Eski parol"
          value={passData.oldPass}
          onChange={(e) =>
            setPassData({ ...passData, oldPass: e.target.value })
          }
          required
          className={`${styles.input}`}
        />
        <input
          type="password"
          placeholder="Yangi parol"
          value={passData.newPass}
          onChange={(e) =>
            setPassData({ ...passData, newPass: e.target.value })
          }
          required
          className={`${styles.input} ${inputError ? "border-red-400" : ""}`}
        />
        {inputError && <p className="text-red-500">{inputError}</p>}{" "}
        {/* 🔴 Xatolik chiqarish */}
        <Button disabled={isLoad} type={"submit"} title={"Tasdiqlash"} />
      </form>
      <Message successMessage={message} errorMessage={error} />
    </div>
  );
};

export default TeacherPasswordUpdate;
