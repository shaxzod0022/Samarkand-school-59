import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { classes } from "../util/constants";
import axios from "axios";
import { styles } from "../util/styles";

const StudentsClass = () => {
  const { classId } = useParams();
  let id = Number(classId);
  const nameClass = classes.find((item) => item.id === Number(classId));
  const [data, setData] = useState([]);
  const getUsers = async () => {
    try {
      let response = await axios.get("https://hp-api.onrender.com/api/spells");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, [id]);
  if (!data) {
    return (
      <div className="pt-[100px] font-semibold text-[40px] text-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="w-full">
      <h2 className={`${styles.heading2} mb-3`}>{nameClass.title}</h2>
      {data.map((item, idx) => {
        return (
          <div
            key={idx}
            className={`${styles.fBetween} gap-7 border-2 rounded-md p-3 mb-[12px]`}
          >
            <p className={`${styles.paragraph}`}>{item.name}</p>
            <span className={`${styles.span}`}>{item.description}</span>
          </div>
        );
      })}
    </div>
  );
};

export default StudentsClass;
