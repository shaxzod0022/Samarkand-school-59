import React from "react";
import { TeacherCreate, TeachersData } from "../../components";

const TeacherDataPage = () => {
  return (
    <div className={`p-5`}>
      <TeacherCreate />
      <TeachersData />
    </div>
  );
};

export default TeacherDataPage;
