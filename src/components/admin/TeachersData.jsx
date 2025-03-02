import React, { useEffect, useState } from "react";
import { styles } from "../../util/styles";
import api from "../../services/api";
import { useNavigate } from "react-router";

const TeachersData = () => {
  const [teacher, setTeacher] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await api.get(`/teacher/teacher-data`);
        setTeacher(response.data);
      } catch (err) {
        console.error("O‘qituvchilarni yuklashda xatolik:", err);
      }
    };

    fetchTeacherData();
  }, []);

  if (!teacher) {
    return (
      <div className="w-full text-center align-middle py-20">
        <span className="admin__loader"></span>
      </div>
    );
  }

  if (!Array.isArray(teacher) || teacher.length === 0) {
    return (
      <h2 className={`${styles.p} py-16 text-center`}>Ma'lumot topilmadi</h2>
    );
  }

  return (
    <div className="w-full">
      <h2 className={`${styles.heading2} text-center mb-3`}>O'qituvchilar</h2>
      <div className={`w-full mb-6 ${styles.fBetween} gap-7 !items-start`}>
        {teacher.map((user) => (
          <div
            key={user._id}
            onClick={() => navigate(`teacher-permitted-info/${user._id}`)}
            className={`${styles.fCol} cursor-pointer gap-3 md:w-[46%] lg:w-[30%] w-full border-2 rounded-md p-5`}
          >
            <img
              className="w-[60%]"
              src={user.profile_image}
              alt={user.lastname}
            />
            <div className="w-full">
              <p
                className={`${styles.paragraph} text-center font-semibold capitalize`}
              >
                {user.lastname}. {user.firstname[0]}. {user.middlename[0]}
              </p>
              <p className={`${styles.paragraph} capitalize text-center`}>
                {user.subject}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeachersData;
