import React from "react";
import { Footer, Navbar } from "../components";
import { styles } from "../util/styles";
import { Outlet } from "react-router";

const StudentPanel = () => {
  return (
    <>
      <Navbar />
      <div className={`${styles.container} mt-32`}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default StudentPanel;
