import { useNavigate } from "react-router";
import Button from "./Button";
import { useEffect, useState, useCallback } from "react";
import { styles } from "../util/styles";
import { logo } from "../assets";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createUsers } from "../store/userSlice";

const Login = () => {
  const [valueLogin, setValueLogin] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.value);

  // Foydalanuvchilarni olish funksiyasi
  const getUsers = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      dispatch(createUsers(response.data));
    } catch (error) {
      console.error("Foydalanuvchilarni olishda xatolik yuz berdi:", error);
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

  // 1 daqiqa (60000 ms) vaqtni belgilash
  const expiryTime = 1 * 60 * 1000;
  const resetLogoutTimeout = useCallback(() => {
    clearTimeout(window.logoutTimeout);
    window.logoutTimeout = setTimeout(() => {
      localStorage.removeItem("userData");
      localStorage.removeItem("loginTime");
      alert(
        "Siz 1 daqiqa davomida faol bo'lmagansiz. Kirish sahifasiga qaytdingiz."
      );
      navigate("/");
    }, expiryTime);
  }, [navigate]);

  useEffect(() => {
    const events = ["mousemove", "keypress", "click", "scroll"];
    events.forEach((event) => {
      window.addEventListener(event, resetLogoutTimeout);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetLogoutTimeout);
      });
      clearTimeout(window.logoutTimeout);
    };
  }, [resetLogoutTimeout]);

  const navigationHomePage = (e) => {
    e.preventDefault();

    const user = userData.find(
      (user) =>
        user.id === Number(valueLogin) && user.username === valuePassword
    );

    if (user) {
      setError(null);
      localStorage.setItem("userData", JSON.stringify(user));

      if (user.role === "teacher") {
        navigate(`home_page/teacher/${user.id}`);
      } else {
        navigate(`home_page/${user.id}`);
      }
    } else {
      setError("Login yoki parol noto'g'ri!");
    }
  };

  return (
    <div className={`${styles.container} h-[100vh] bg-slate-100`}>
      <div
        className={`max-w-[380px] w-[310px] sm:w-full text-center absolute translate-y-[-50%] translate-x-[-50%] left-[50%] top-[50%] bg-white rounded-lg border-2 border-formaColor card-box-shadow p-4 ${styles.fCol}`}
      >
        <div className={`w-full flex items-center flex-col mb-3`}>
          <img
            className="sm:w-[60px] w-[50px] sm:h-[60px] h-[50px]"
            src={logo}
            alt="Logo"
          />
        </div>
        <h2 className={`${styles.heading3} mb-3`}>
          O'qituvchi va o'quvchilar uchun
        </h2>
        <form
          className="w-full flex flex-col gap-2"
          onSubmit={navigationHomePage}
        >
          <input
            value={valueLogin}
            onChange={(e) => setValueLogin(e.target.value)}
            type="text"
            className={`${styles.input}`}
            placeholder="Login"
            required
          />
          <input
            maxLength={12}
            value={valuePassword}
            onChange={(e) => setValuePassword(e.target.value)}
            className={`${styles.input}`}
            type="password"
            placeholder="Password"
            required
          />
          <div className={`${styles.fBetween} mb-2`}>
            <div className="flex gap-2">
              <input className="cursor-pointer" type="checkbox" />
              <span className={`${styles.span}`}>Eslab qolish</span>
            </div>
            <Button
              onClick={() => {}}
              title="Parolni unutdingizmi?"
              className="!bg-white !text-formaColor !p-0"
            />
          </div>
          <div className={`w-full text-start mb-2`}>
            {error && (
              <span className={`${styles.span} font-semibold text-red-600`}>
                {error}
              </span>
            )}
          </div>
          <Button title="Kirish" className={`w-full`} type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;
