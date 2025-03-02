import React, { useEffect, useState } from "react";
import { styles } from "../../util/styles";
import { useNavigate } from "react-router";
import axios from "axios";

const SubjectsData = () => {
  const [subjectsData, setSubjectsData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await axios.get(
          "https://schoole-test-site.onrender.com/api/subjects/subjects-data"
        );
        setSubjectsData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubject();
  }, []);

  if (!subjectsData) {
    return (
      <div className="w-full text-center align-middle py-20">
        <span className="admin__loader"></span>
      </div>
    );
  }

  if (!Array.isArray(subjectsData) || subjectsData.length === 0) {
    return (
      <h2 className={`${styles.p} py-16 text-center`}>Ma'lumot topilmadi</h2>
    );
  }

  return (
    <div className="w-full">
      <h2 className={`${styles.heading2} text-center mb-3`}>Fanlar</h2>
      <div className={`w-full mb-6 ${styles.fBetween} gap-7 !items-start`}>
        {subjectsData.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`subject-permitted-info/${item._id}`)}
            className={`${styles.fCol} cursor-pointer gap-3 md:w-[46%] lg:w-[30%] w-full border-2 rounded-md p-5`}
          >
            <img
              src={item.image}
              alt={item.subjectname}
              className="md:w-[150px] w-[80px] h-[80px] rounded-full object-cover md:h-[150px]"
            />
            <div className="w-full">
              <p
                className={`${styles.paragraph} text-center !font-bold capitalize`}
              >
                {item.subjectname}
              </p>
              <p className={`${styles.paragraph} capitalize text-center`}>
                {item.description.length > 30 ? (
                  <>{item.description.slice(0, 30)}...</>
                ) : (
                  item.description
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectsData;
