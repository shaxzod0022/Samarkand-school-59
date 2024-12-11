import React from "react";
import { Footer, Navbar } from "../components";
import { styles } from "../util/styles";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className={`${styles.container}`}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
