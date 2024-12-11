import React from "react";
import { styles } from "../util/styles";
import { classes } from "../util/constants";
import { useNavigate } from "react-router";
const Classes = () => {
  const navigate = useNavigate();
  // const { userId } = useParams();
  const classSub = (id) => {
    navigate(`class_students/${id}`);
  };
  return (
    <div className={`bg-white text-center w-full h-[40vh]`}>
      <h2 className={`${styles.heading2} mb-3`}>Sinflar</h2>
      <div className={`w-full ${styles.fWrap} justify-around`}>
        {classes.map((item, idx) => {
          return (
            <div
              onClick={() => classSub(item.id)}
              key={idx}
              className={`active:bg-slate-300 card-box-shadow px-8 py-6 cursor-pointer border-2 border-formaColor rounded-md sm:w-auto w-[40%]`}
            >
              <h3 className={`${styles.heading3}`}>{item.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Classes;
