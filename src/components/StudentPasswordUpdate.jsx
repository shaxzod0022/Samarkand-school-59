import React, { useEffect, useState } from "react";
import { styles } from "../util/styles";
import Button from "./Button";
import Message from "./admin/Message";
import studentApi from "../services/studentApi";

const StudentsPasswordUpdate = () => {
  const [passData, setPassData] = useState({ oldPass: "", newPass: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [studentStoreData, setStudentStoreData] = useState();

  useEffect(() => {
    const storeStudentData = sessionStorage.getItem("studentData");
    if (storeStudentData) {
      const data = JSON.parse(storeStudentData);
      setStudentStoreData(data);
    }
  }, []);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    try {
      await studentApi.put(`/students/update-password`, passData, {
        headers: { Authorization: `Bearer ${studentStoreData.token}` },
      });
      setMessage("Parol muvaffaqiyatli yangilandi");
      setPassData({ oldPass: "", newPass: "" });
    } catch (error) {
      setError(error.response?.data?.message || "Serverda xatolik yuz berdi!");
    }
  };

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage("");
        setError("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message, error]);

  return (
    <div className={`w-full`}>
      <h2 className={`${styles.heading2} mb-3`}>Parolni yangilash</h2>
      <form
        onSubmit={handlePasswordUpdate}
        className={`${styles.fCol} lg:w-[30%] sm:w-[45%] w-full gap-5 !items-start`}
      >
        <input
          type="password"
          placeholder="Eski parol"
          value={passData.oldPass}
          onChange={(e) =>
            setPassData({ ...passData, oldPass: e.target.value })
          }
          required
          className={`${styles.input} ${error && "border-red-400"}`}
        />
        <input
          type="password"
          placeholder="Yangi parol"
          value={passData.newPass}
          onChange={(e) =>
            setPassData({ ...passData, newPass: e.target.value })
          }
          required
          className={`${styles.input}`}
        />
        <Button type={"submit"} title={"Tasdiqlash"} />
      </form>
      <Message successMessage={message} errorMessage={error} />
    </div>
  );
};

export default StudentsPasswordUpdate;
