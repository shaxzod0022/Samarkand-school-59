import React from "react";
import { SubjectCreate, SubjectsData } from "../../components";

const SubjectDataPage = () => {
  return (
    <div className="p-5">
      <SubjectCreate />
      <SubjectsData />
    </div>
  );
};

export default SubjectDataPage;
