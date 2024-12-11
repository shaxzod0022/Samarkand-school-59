import React from "react";
import { useSelector } from "react-redux";
import { styles } from "../util/styles";
import { sciences } from "../util/constants";
import { useNavigate, useParams } from "react-router";
import Button from "./Button";

const Test = () => {
  const { id } = useParams();
  // const scinceId = Number(id);
  const scinceStoreId = useSelector((state) => state.scinceData.value);
  let scince = sciences.find((science) => science.id === scinceStoreId);

  const navigate = useNavigate();
  const startButton = () => {
    navigate(`/start_test_page/${scince.id}`);
    
  };

  if (!scinceStoreId) {
    return (
      <div
        className={`${
          scinceStoreId === null ? "h-[58.7vh]" : "h-auto"
        } bg-white pt-[140px] sm:pt-[110px] mb-10 relative`}
      >
        <h2
          className={`${styles.heading2} text-slate-600 absolute top-[50%] left-[50%] -translate-x-[50%]`}
        >
          Fan tanlanmadi
        </h2>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-wrap items-center bg-white pt-[140px] sm:pt-[110px] mb-10`}
    >
      <div
        className={`flex items-center flex-col text-center md:w-[50%] w-full sm:p-10 p-5`}
      >
        <img
          className="lg:w-[60%] w-[80%] rounded-lg object-cover"
          src={scince.img}
          alt={scince.title}
        />
      </div>
      <div className="md:w-[50%] w-full p-10">
        <h2 className={`${styles.heading2} mb-5`}>{scince.title}</h2>
        <p className={`${styles.paragraph} mb-4`}>{scince.info}</p>
        <p className={`${styles.paragraph} mb-8`}>{scince.info}</p>
        <Button title="Testni boshlash" onClick={() => startButton()} />
      </div>
    </div>
  );
};

export default Test;
