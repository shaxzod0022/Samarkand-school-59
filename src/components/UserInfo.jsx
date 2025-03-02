import React, { useEffect, useState } from "react";
import { styles } from "../util/styles";
import { useParams, useNavigate } from "react-router-dom";
import Button from "./Button";
import studentApi from "../services/studentApi";
import StudentsPasswordUpdate from "./StudentPasswordUpdate";

const UserInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState();

  useEffect(() => {
    const getStudentData = async () => {
      try {
        const response = await studentApi.get("/students/students-data");
        const data = response.data.find((i) => i._id === id);
        setStudentData(data);
      } catch (error) {
        console.error(error.response?.data?.message);
      }
    };

    getStudentData();
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("studentData");
    navigate("/");
  };

  if (!studentData)
    return (
      <div className="pt-32 h-[90vh] text-center text-[50px]">
        <div className="w-full text-center align-middle py-20">
          <span className="admin__loader"></span>
        </div>
      </div>
    );

  return (
    <div className="w-full mb-6 mt-32">
      <h2 className={`${styles.heading2} text-center mb-3`}>
        O'quvchi ma'lumotlari
      </h2>
      <div className={`w-full ${styles.fBetween} !items-start mb-5`}>
        <div className={`${styles.fCol} !items-start gap-3 sm:w-[70%] w-full`}>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Ism:{" "}
            <span className="font-normal capitalize">
              {studentData.firstname}
            </span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Familia:{" "}
            <span className="font-normal capitalize">
              {studentData.lastname}
            </span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Otasining ismi:{" "}
            <span className="font-normal capitalize">
              {studentData.middlename}
            </span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Tug'ilgan sanasi:{" "}
            <span className="font-normal capitalize">
              {studentData.dateOfBirth.slice(0, 10)}
            </span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Jinsi:{" "}
            <span className="font-normal capitalize">{studentData.gender}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Telefon raqami:{" "}
            <span className="font-normal capitalize">{studentData.phone}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Elektron pochtasi:{" "}
            <span className="font-normal">{studentData.email}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Lavozimi:{" "}
            <span className="font-normal capitalize">
              {studentData.position}
            </span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Sinfi:{" "}
            <span className="font-normal capitalize">
              {studentData.className}
            </span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Maktab:{" "}
            <span className="font-normal capitalize">
              {studentData.school_name}
            </span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Maktab manzili:{" "}
            <span className="font-normal capitalize">
              {studentData.school_address}
            </span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Saytdan kim sifatida foydalanadi:{" "}
            <span className="font-normal capitalize">{studentData.role}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Foydalanuvchi nomi(logini):{" "}
            <span className="font-normal">{studentData.username}</span>
          </p>
        </div>
        <div className={`w-full sm:w-[27%] ${styles.fCol} sm:mt-0 mt-5`}>
          <img
            src={studentData.profile_image}
            alt="Profil rasmi"
            className="sm:w-full w-[60%]"
          />
        </div>
      </div>
      <StudentsPasswordUpdate />
      <Button
        onClick={handleLogout}
        title={`Profildan chiqish`}
        className={`active:bg-red-500 bg-red-500 hover:bg-red-400 mt-4`}
      />
    </div>
  );
};

export default UserInfo;
