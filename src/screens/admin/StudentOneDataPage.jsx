import React from "react";
import {
  Button,
  StudentOneData,
  StudentOneDataUpdate,
  SubjectTestAccess,
  TestResultStudent,
} from "../../components";
import { useNavigate, useParams } from "react-router";
import { styles } from "../../util/styles";
import axios from "axios";

const StudentOneDataPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const deleteStudent = async () => {
    try {
      await axios.delete(
        `https://schoole-59.onrender.com/api/students/delete-student/${id}`
      );
      navigate("/hello-admin/panel/students");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`${styles.fCol} !items-start gap-5 p-5`}>
      <StudentOneData />
      <SubjectTestAccess />
      <StudentOneDataUpdate />
      <TestResultStudent />
      <Button
        onClick={deleteStudent}
        className={`hover:bg-red-400 active:bg-red-500 bg-red-500`}
        title={`O'quvchini o'chirish`}
      />
    </div>
  );
};

export default StudentOneDataPage;
