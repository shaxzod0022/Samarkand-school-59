import React from "react";
import { StudentCreate, StudentsData } from "../../components";

const StudentDataPage = () => {
  return (
    <div className="p-5">
      <StudentCreate />
      <StudentsData />
    </div>
  );
};

export default StudentDataPage;
