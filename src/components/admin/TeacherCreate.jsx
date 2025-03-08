import React, { useEffect, useState } from "react";
import { styles } from "../../util/styles";
import Button from "../Button";
import { teacherCreate } from "../../util/constants";
import api from "../../services/api";
import Message from "./Message";

const TeacherCreate = () => {
  const [teacherData, setTeacherData] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [adminToken, setAdminToken] = useState();
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const storeAdminData = sessionStorage.getItem("adminData");
    if (storeAdminData) {
      setAdminToken(JSON.parse(storeAdminData));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoad(true);
    try {
      await api.post(`/teacher/create`, teacherData, {
        headers: { Authorization: `Bearer ${adminToken.token}` },
      });
      setMessage("Ma'lumotlar muvaffaqiyatli qo'shildi!");
      setTeacherData({});
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

    setTeacherData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full mb-6">
      <h2 className={`${styles.heading2} text-center mb-5`}>
        O'qituvchi qo'shish
      </h2>
      <form
        onSubmit={handleSubmit}
        className={`${styles.fCol} gap-5 !items-start`}
      >
        <div className={`${styles.fBetween} gap-5`}>
          {teacherCreate.map((item, idx) => (
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
                      checked={teacherData[item.name] === "Erkak"}
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
                      checked={teacherData[item.name] === "Ayol"}
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
                  value={teacherData[item.name] || ""}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          ))}
        </div>
        <Button disabled={isLoad} type={"submit"} title={"Qo'shish"} />
      </form>
      <Message successMessage={message} errorMessage={error} />
    </div>
  );
};

export default TeacherCreate;
