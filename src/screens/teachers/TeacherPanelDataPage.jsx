import React from "react";
import {
  TeacherData,
  TeacherDataUpdate,
  TeacherPasswordUpdate,
} from "../../components";

const TeacherPanelDataPage = () => {
  return (
    <div className="p-5">
      <TeacherData />
      <TeacherDataUpdate />
      <TeacherPasswordUpdate />
    </div>
  );
};

export default TeacherPanelDataPage;
