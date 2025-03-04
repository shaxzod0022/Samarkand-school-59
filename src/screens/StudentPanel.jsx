import React, { useEffect } from "react";
import { Footer, Navbar } from "../components";
import { styles } from "../util/styles";
import { Outlet, useNavigate } from "react-router";

const StudentPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    const handlePopState = () => {
      if (sessionStorage.getItem("studentData")) {
        window.history.pushState(null, null, window.location.href);
      } else {
        navigate("/");
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

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
