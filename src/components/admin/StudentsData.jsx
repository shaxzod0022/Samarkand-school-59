import React, { useEffect, useState } from "react";
import { styles } from "../../util/styles";
import api from "../../services/api";
import { useNavigate } from "react-router";

const StudentsData = () => {
  const [students, setStudents] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const response = await api.get(`/students/students-data`);
        setStudents(response.data);
      } catch (err) {
        console.error("O‘qituvchilarni yuklashda xatolik:", err);
      }
    };

    fetchStudentsData();
  }, []);

  if (!students) {
    return (
      <div className="w-full text-center align-middle py-16">
        <span className="admin__loader"></span>
      </div>
    );
  }

  if (!Array.isArray(students) || students.length === 0) {
    return (
      <h2 className={`${styles.p} py-16 text-center`}>Ma'lumot topilmadi</h2>
    );
  }

  return (
    <div className="w-full">
      <h2 className={`${styles.heading2} text-center mb-3`}>O'quvchilar</h2>
      <div className={`w-full mb-6 ${styles.fBetween} gap-7 !items-start`}>
        {students.map((user) => (
          <div
            key={user._id}
            onClick={() => navigate(`student-permitted-info/${user._id}`)}
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

export default StudentsData;
