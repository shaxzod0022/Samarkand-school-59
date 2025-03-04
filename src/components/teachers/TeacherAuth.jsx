import React, { useState } from "react";
import Button from "../Button";
import { logo } from "../../assets";
import axios from "axios";
import { useNavigate } from "react-router";
import { styles } from "../../util/styles";

const TeacherAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://schoole-test-site.onrender.com/api/teacher/login-teacher",
        formData
      );
      sessionStorage.setItem("teacherData", JSON.stringify(res.data));
      navigate("/hello-teacher/panel");
    } catch (error) {
      console.error(
        "Login xatosi:",
        error.response?.data?.message || "Server xatosi"
      );
      setErrorMessage(
        error.response?.data?.message && "Login yoki parol xato!"
      );
      console.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
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
        <h2 className={`${styles.heading3} mb-3`}>O'qituvchilar uchun</h2>
        <form
          className="w-full flex flex-col gap-2"
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            type="text"
            className={styles.input}
            placeholder="Login"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
          <div className={`${styles.fBetween} gap-1 ${styles.input}`}>
            <input
              maxLength={12}
              className="outline-none w-[90%]"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
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
            <Button
              title="Parolni unutdingizmi?"
              type={"button"}
              className="!bg-white !text-formaColor !p-0"
              onClick={(e) => {
                e.preventDefault();
                setErrorMessage("Dasturchiga murojat qiling!");
                setTimeout(() => {
                  setErrorMessage(null);
                }, 4000);
              }}
            />
          </div>
          {errorMessage && (
            <span className={`${styles.span} font-semibold text-red-600`}>
              {errorMessage}
            </span>
          )}
          <Button
            title={isLoading ? "Kutib turing yuklanmoqda..." : "Kirish"}
            className="w-full"
            type={"submit"}
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default TeacherAuth;
