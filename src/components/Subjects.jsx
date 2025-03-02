import React, { useEffect, useState } from "react";
import { styles } from "../util/styles";
import { useNavigate } from "react-router";
import studentApi from "../services/studentApi";

const Subjects = () => {
  const [subjectsData, setSubjectsData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await studentApi.get("/subjects/subjects-data");
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
      <div className={`h-[80vh] ${styles.fCol} justify-center text-center`}>
        <h2 className={`${styles.heading2} py-16 text-center`}>
          Ma'lumot topilmadi
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className={`${styles.heading2} text-center mb-3`}>Fanlar</h2>
      <div className={`w-full mb-6 ${styles.fBetween} gap-7 !items-start`}>
        {subjectsData.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`test_page/${item._id}`)}
            className={`${styles.fCol} cursor-pointer gap-3 sm:w-[46%] lg:w-[30%] w-full border-2 rounded-md p-5`}
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

export default Subjects;
