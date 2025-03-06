import React, { useEffect, useState } from "react";
import { styles } from "../../util/styles";
import { useParams } from "react-router";
import axios from "axios";

const StudentOneData = () => {
  const [student, setStudent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`https://schoole-59.onrender.com/api/students/students-data`);
        const studentOneData = response.data.find((i) => i._id === id);
        setStudent(studentOneData);
      } catch (err) {
        console.error("O‘quvchilarni yuklashda xatolik:", err);
      }
    };

    fetchStudentData();
  }, [id]); // ✅ `id` qo‘shildi

  if (!student) {
    return (
      <div className={`w-full py-16 text-center align-middle`}>
        <span className="admin__loader"></span>
      </div>
    );
  }

  return (
    <div className="w-full mb-6">
      <h2 className={`${styles.heading2} text-center mb-3`}>
        O'quvchi ma'lumotlari
      </h2>
      <div className={`w-full ${styles.fBetween} !items-start`}>
        <div className={`${styles.fCol} !items-start gap-3 sm:w-[70%] w-full`}>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Ism:{" "}
            <span className="font-normal capitalize">{student.firstname}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Familia:{" "}
            <span className="font-normal capitalize">{student.lastname}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Otasining ismi:{" "}
            <span className="font-normal capitalize">{student.middlename}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Tug'ilgan sanasi:{" "}
            <span className="font-normal capitalize">
              {student.dateOfBirth.slice(0, 10)}
            </span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Jinsi:{" "}
            <span className="font-normal capitalize">{student.gender}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Telefon raqami:{" "}
            <span className="font-normal capitalize">{student.phone}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Elektron pochtasi:{" "}
            <span className="font-normal">{student.email}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Lavozimi:{" "}
            <span className="font-normal capitalize">{student.position}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Sinfi:{" "}
            <span className="font-normal capitalize">{student.className}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Maktab:{" "}
            <span className="font-normal capitalize">
              {student.school_name}
            </span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Maktab manzili:{" "}
            <span className="font-normal capitalize">
              {student.school_address}
            </span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Saytdan kim sifatida foydalanadi:{" "}
            <span className="font-normal capitalize">{student.role}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Foydalanuvchi nomi(logini):{" "}
            <span className="font-normal">{student.username}</span>
          </p>
        </div>
        <div className={`w-full sm:w-[27%] ${styles.fCol} sm:mt-0 mt-5`}>
          <img
            src={student.profile_image}
            alt="Profil rasmi"
            className="sm:w-full w-[60%]"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentOneData;
