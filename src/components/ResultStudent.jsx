import React, { useEffect, useState } from "react";
import { styles } from "../util/styles";
import { reyting } from "../assets";
import { useNavigate } from "react-router-dom";

const ResultStudent = () => {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState();

  useEffect(() => {
    const storeDataStudent = localStorage.getItem("studentData");
    if (storeDataStudent) {
      const data = JSON.parse(storeDataStudent);
      setStudentId(data.student._id);
    }
  }, []);

  return (
    <div className="w-full py-8">
      <h2 className={`${styles.heading2} text-center mb-4`}>Reyting</h2>
      <div className="w-full">
        <div
          onClick={() => navigate(`results/${studentId}`)}
          className={`${styles.fCol} cursor-pointer gap-3 sm:w-[46%] lg:w-[30%] w-full border-2 rounded-md p-5`}
        >
          <img
            src={reyting}
            alt=""
            className="md:w-[150px] w-[80px] h-[80px] rounded-full object-cover md:h-[150px]"
          />
          <h3 className={`${styles.heading3}`}>Natijalar</h3>
        </div>
      </div>
    </div>
  );
};

export default ResultStudent;
