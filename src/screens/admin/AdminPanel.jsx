import React, { useEffect, useState } from "react";
import { AdminPanelMenu } from "../../components";
import { Outlet, useLocation } from "react-router-dom";
import { styles } from "../../util/styles";

const AdminPanel = () => {
  const [showModal, setShowModal] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setShowModal(false);
  }, [pathname]);

  return (
    <div className="max-w-[1700px] mx-auto w-full px-0 md:px-[50px]">
      <div
        className={`text-center fixed top-0 left-1/2 -translate-x-1/2 max-w-[1700px] w-full z-50 px-0 md:px-[60px] lg:px-[100px] text-white bg-formaColor p-5`}
      >
        <button
          onClick={() => setShowModal((prev) => !prev)}
          className="absolute left-5 sm:top-8 top-7"
        >
          <i className="fa-solid fa-bars text-[25px]"></i>
        </button>
        <h2 className={styles.heading1}>Admin Panel</h2>
        <AdminPanelMenu
          newClass={`${
            !showModal
              ? "2xl:top-20 2xl:left-0 sm:left-0 -left-[60%]"
              : "2xl:-top-[100vh] sm:-left-[60%] left-[0]"
          } transition-all duration-300`}
        />
      </div>
      <div className="flex w-full sm:mt-24 mt-20">
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

export default AdminPanel;
