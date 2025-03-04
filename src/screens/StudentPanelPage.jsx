import React, { useEffect } from "react";
import { ResultStudent, Subjects } from "../components";
import { useNavigate } from "react-router";

const StudentPanelPage = () => {
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
      <Subjects />
      <ResultStudent />
    </>
  );
};

export default StudentPanelPage;
