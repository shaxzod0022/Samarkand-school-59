import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "./Button";
import { styles } from "../util/styles";
import { logo } from "../assets";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createUsers } from "../store/userSlice";

const Login = () => {
  const [valueLogin, setValueLogin] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.value);

  const getUsers = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      dispatch(createUsers(response.data));
    } catch (error) {
      console.error("Foydalanuvchilarni olishda xatolik:", error);
      alert(
        "Serverda xatolik kuzatilayotgan bo'lishi mumkin yoki sizning internet tarmog'ingiz yaxshi ishlamayapti keyinroq urunib ko'ring!!!"
      );
    }
  }, [dispatch]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    const user = localStorage.getItem("userData");
    if (user) {
      navigate(`/home_page/${JSON.parse(user).id}`);
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = userData.find(
      (user) =>
        user.id === Number(valueLogin) && user.username === valuePassword
    );

    if (user) {
      setError(null);
      localStorage.setItem("userData", JSON.stringify(user));
      navigate(
        user.role === "teacher"
          ? `home_page/teacher/${user.id}`
          : `home_page/${user.id}`
      );
    } else {
      setError("Login yoki parol noto'g'ri!");
      setValuePassword("");
      setTimeout(() => {
        setError(null);
      }, 4000);
    }
  };

  return (
    <div className={`${styles.container} h-[100vh] bg-slate-100`}>
      <div
        className={`max-w-[380px] w-[310px] sm:w-full text-center absolute translate-y-[-50%] translate-x-[-50%] left-[50%] top-[50%] bg-white rounded-lg border-2 card-box-shadow p-4 ${styles.fCol}`}
      >
        <div className="w-full flex items-center flex-col mb-3">
          <img
            className="sm:w-[60px] w-[50px] sm:h-[60px] h-[50px]"
            src={logo}
            alt="maktab platformasi logotipi"
          />
        </div>
        <h2 className={`${styles.heading3} mb-3`}>
          O'qituvchi va o'quvchilar uchun
        </h2>
        <form
          className="w-full flex flex-col gap-2"
          onSubmit={handleLogin}
          noValidate
        >
          <input
            value={valueLogin}
            onChange={(e) => setValueLogin(e.target.value)}
            type="text"
            className={styles.input}
            placeholder="Login"
            required
          />
          <div className={`${styles.fBetween} gap-1 ${styles.input}`}>
            <input
              maxLength={12}
              value={valuePassword}
              onChange={(e) => setValuePassword(e.target.value)}
              className="outline-none w-[90%]"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((i) => !i)}
              className="text-gray-500"
            >
              <i
                className={
                  showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"
                }
              ></i>
            </button>
          </div>
          <div className={`${styles.fBetween} mb-2`}>
            <div className="flex gap-2">
              <input className="cursor-pointer" type="checkbox" />
              <span className={styles.span}>Eslab qolish</span>
            </div>
            <Button
              title="Parolni unutdingizmi?"
              type={"button"}
              className="!bg-white !text-formaColor !p-0"
              onClick={(e) => {
                e.preventDefault();
                setError("Sinf rahbaringizga murojat qiling!");
                setTimeout(() => {
                  setError(null);
                }, 4000);
              }}
            />
          </div>
          {error && (
            <span className={`${styles.span} font-semibold text-red-600`}>
              {error}
            </span>
          )}
          <Button title="Kirish" className="w-full" type={"submit"} />
        </form>
      </div>
    </div>
  );
};

export default Login;
