import React, { useEffect, useState, useCallback } from "react";
import { styles } from "../util/styles";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { userImg } from "../assets";
import Button from "./Button";

const UserInfo = () => {
  const { id } = useParams(); // URL-dan foydalanuvchi ID ni olish
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  // Foydalanuvchi ma'lumotlarini olish funksiyasi
  const getUser = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const userData = response.data.find((item) => item.id === Number(id));
      setData(userData);
    } catch (error) {
      console.error("Foydalanuvchini olishda xatolik:", error);
    }
  }, [id]); // Dependency sifatida faqat `id` bor

  // `getUser` funksiyasini faqat ID o'zgarganda chaqirish
  useEffect(() => {
    getUser();
  }, [getUser]);

  // Logout funksiyasi
  const handleLogout = () => {
    localStorage.removeItem("userData"); // Mahalliy saqlangan ma'lumotni o'chirish
    navigate("/"); // Login sahifasiga qaytarish
  };

  // Agar ma'lumot yuklanayotgan bo'lsa, "Loading..." ni ko'rsatish
  if (!data)
    return (
      <div className="pt-32 h-[90vh] text-center text-[50px]">Loading...</div>
    );

  return (
    <div
      className={`${styles.fWrap} !items-start bg-white !gap-0 w-full pt-[100px] sm:pt-[110px] mb-10`}
    >
      <div className={`sm:w-[50%] w-full text-center sm:p-20 p-5`}>
        <img className="w-full" src={userImg} alt={data.name} />
      </div>
      <div className={`sm:w-[50%] w-full sm:p-20 p-5`}>
        <h1 className={`${styles.heading1} mb-3`}>Mening ma'lumotlarim</h1>
        <p className="mb-2 text-lg">
          <strong>Ism:</strong> {data.name}
        </p>
        <p className="mb-2 text-lg">
          <strong>Email:</strong> {data.email}
        </p>
        <p className="mb-2 text-lg">
          <strong>Telefon:</strong> {data.phone}
        </p>
        <p className="mb-2 text-lg">
          <strong>Manzil:</strong> {data.address?.city}, {data.address?.street}
        </p>
        <Button title={"Profildan chiqish"} onClick={handleLogout} />
      </div>
    </div>
  );
};

export default UserInfo;
