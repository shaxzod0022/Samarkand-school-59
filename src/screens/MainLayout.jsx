import React, { useEffect } from "react";
import { Footer, Navbar } from "../components";
import { styles } from "../util/styles";
import { Outlet, useLocation } from "react-router";

const MainLayout = () => {
  const pathname = useLocation().pathname;
  const user = JSON.parse(localStorage.getItem("userData")) || {};

  useEffect(() => {
    const handlePopState = () => {
      if (user?.id && pathname === `/home_page/${user.id}`) {
        window.location.href = "about:blank"; // Sahifani yopish
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [pathname, user?.id]);

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
