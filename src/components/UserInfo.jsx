import React, { useEffect, useState } from "react";
import { styles } from "../util/styles";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { userImg } from "../assets";
import Button from "./Button";

const UserInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const getUser = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const userData = response.data.find((item) => item.id === Number(id));
      setData(userData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };

  if (!data)
    return (
      <div className="pt-32 h-[90vh] text-center text-[50px]">Loading...</div>
    );

  return (
    <div
      className={`${styles.fWrap} !items-start bg-white !gap-0 w-full pt-[140px] sm:pt-[110px] mb-10`}
    >
      <div className={`sm:w-[50%] w-full text-center sm:p-20 p-5`}>
        <img className="w-full" src={userImg} alt={data.name} />
      </div>
      <div className={`sm:w-[50%] w-full sm:p-20 p-5`}>
        <h1 className={`${styles.heading1} mb-3`}>Mening ma'lumotlarim</h1>
        <Button title={"Profildan chiqish"} onClick={handleLogout} />
      </div>
    </div>
  );
};

export default UserInfo;
