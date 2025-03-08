import React from "react";
import { Footer, Navbar } from "../components";
import { styles } from "../util/styles";
import { Outlet } from "react-router";

const StudentPanel = () => {
  return (
    <div className="max-w-[1700px] mx-auto">
      <Navbar />
      <div className={`${styles.container} mt-32`}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default StudentPanel;
