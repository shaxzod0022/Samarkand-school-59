import React, { useEffect, useState } from "react";
import { TeacherPanelMenu } from "../../components";
import { Outlet, useLocation } from "react-router-dom";
import { styles } from "../../util/styles";
const TeacherPanel = () => {
  const [showModal, setShowModal] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setShowModal(false);
  }, [pathname]);

  return (
    <div className="max-w-[1700px] w-full px-0 md:px-[50px]">
      <div
        className={`text-center fixed top-0 left-0 max-w-[1700px] w-full z-50 px-0 md:px-[60px] lg:px-[100px] text-white bg-formaColor p-5`}
      >
        <button
          onClick={() => setShowModal((prev) => !prev)}
          className="absolute left-5 sm:top-8 top-7"
        >
          <i className="fa-solid fa-bars text-[25px]"></i>
        </button>
        <h2 className={styles.heading1}>Teacher Panel</h2>
      </div>
      <div className="flex w-full relative sm:mt-24 mt-20">
        <TeacherPanelMenu
          newClass={`${
            !showModal ? "sm:left-0 -left-[60%]" : "sm:-left-[60%] left-[0]"
          } transition-all duration-300`}
        />
        <div
          className={`${
            !showModal
              ? "lg:ml-[18%] md:ml-[22%] sm:ml-[30%] ml-0 w-full"
              : "w-full"
          } transition-all duration-300`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TeacherPanel;
