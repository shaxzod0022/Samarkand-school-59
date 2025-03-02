import React, { useEffect, useState } from "react";
import { styles } from "../../util/styles";
import { useParams } from "react-router";
import axios from "axios";

const TeacherOneData = () => {
  const [teacher, setTeacher] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await axios.get(
          `https://schoole-test-site.onrender.com/api/teacher/teacher-data`
        );
        const teacherOneData = response.data.find((i) => i._id === id);
        setTeacher(teacherOneData);
      } catch (err) {
        console.error("O‘qituvchilarni yuklashda xatolik:", err);
      }
    };

    fetchTeacherData();
  }, [id]);

  if (!teacher) {
    return (
      <div className="w-full text-center align-middle py-20">
        <span className="admin__loader"></span>
      </div>
    );
  }

  if (teacher.length === 0) {
    return (
      <h2 className={`${styles.p} py-16 text-center`}>Ma'lumot topilmadi</h2>
    );
  }

  return (
    <div className="w-full mb-6">
      <h2 className={`${styles.heading2} text-center mb-3`}>
        O'qituvchi ma'lumotlari
      </h2>
      <div className={`w-full ${styles.fBetween} !items-start`}>
        <div className={`${styles.fCol} !items-start gap-3 sm:w-[70%] w-full`}>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Ism:{" "}
            <span className="font-normal capitalize">{teacher.firstname}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Familia:{" "}
            <span className="font-normal capitalize">{teacher.lastname}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Otasining ismi:{" "}
            <span className="font-normal capitalize">{teacher.middlename}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Tug'ilgan sanasi:{" "}
            <span className="font-normal capitalize">
              {teacher.dateOfBirth.slice(0, 10)}
            </span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Jinsi:{" "}
            <span className="font-normal capitalize">{teacher.gender}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Telefon raqami:{" "}
            <span className="font-normal capitalize">{teacher.phone}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Elektron pochtasi:{" "}
            <span className="font-normal">{teacher.email}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Lavozimi:{" "}
            <span className="font-normal capitalize">{teacher.position}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Fan:{" "}
            <span className="font-normal capitalize">{teacher.subject}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Maktab:{" "}
            <span className="font-normal capitalize">
              {teacher.school_name}
            </span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Maktab manzili:{" "}
            <span className="font-normal capitalize">
              {teacher.school_address}
            </span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Saytdan kim sifatida foydalanadi:{" "}
            <span className="font-normal capitalize">{teacher.role}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Foydalanuvchi nomi(logini):{" "}
            <span className="font-normal">{teacher.username}</span>
          </p>
        </div>
        <div className={`w-full sm:w-[27%] ${styles.fCol} sm:mt-0 mt-5`}>
          <img
            src={teacher.profile_image}
            alt="Profil rasmi"
            className="sm:w-full w-[60%]"
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherOneData;
