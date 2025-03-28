import React, { useEffect, useState } from "react";
import { Button, TeacherOneData, TeacherOneDataUpdate } from "../../components";
import { useNavigate, useParams } from "react-router";
import { styles } from "../../util/styles";
import axios from "axios";

const TeacherOneDataPage = () => {
  const [adminToken, setAdminToken] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const storedAdminData = sessionStorage.getItem("adminData");
    if (storedAdminData) {
      setAdminToken(JSON.parse(storedAdminData));
    }
  }, []);

  const deleteTeacher = async () => {
    setIsLoad(true);
    try {
      await axios.delete(
        `https://schoole-59.onrender.com/api/teacher/delete-teacher/${id}`,
        {
          headers: { Authorization: `Bearer ${adminToken.token}` },
        }
      );
      navigate("/hello-admin/panel/teachers");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <div className={`${styles.fCol} !items-start gap-5 p-5`}>
      <TeacherOneData />
      <TeacherOneDataUpdate />
      <Button
        disabled={isLoad}
        onClick={deleteTeacher}
        className={`hover:bg-red-400 active:bg-red-500 bg-red-500`}
        title={`O'qituvchini o'chirish`}
      />
    </div>
  );
};

export default TeacherOneDataPage;
