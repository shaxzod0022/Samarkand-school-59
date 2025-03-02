import axios from "axios";
import { jwtDecode } from "jwt-decode";

const teacherApi = axios.create({
  baseURL: "https://schoole-test-site.onrender.com/api",
});

// 🔹 Token muddati tugaganligini tekshirish
const isTokenExpired = (token) => {
  try {
    if (!token) return true;
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true; // Xato bo‘lsa, token eskirgan deb hisoblaymiz
  }
};

// 🔹 Logout funksiyasi
const logoutTeacher = () => {
  localStorage.removeItem("teacherData");
  window.location.href = "/hello-teacher"; // Foydalanuvchini login sahifasiga yo‘naltiramiz
};

// 🔹 Tokenni yangilash funksiyasi
const refreshToken = async () => {
  try {
    const teacherData = JSON.parse(localStorage.getItem("teacherData"));
    const refresh = teacherData?.refreshToken;

    if (!refresh) {
      logoutTeacher();
      return null;
    }

    const response = await axios.post(
      "https://schoole-test-site.onrender.com/api/auth/refresh",
      {
        refreshToken: refresh,
      }
    );

    const newTeacherData = { ...teacherData, token: response.data.accessToken };
    localStorage.setItem("teacherData", JSON.stringify(newTeacherData));

    return response.data.accessToken;
  } catch (error) {
    logoutTeacher(); // Agar refresh token ishlamasa, foydalanuvchini logout qilamiz
    return null;
  }
};

// 🔹 Har bir so‘rov oldidan tokenni tekshirish
teacherApi.interceptors.request.use(
  async (config) => {
    let teacherData = JSON.parse(localStorage.getItem("teacherData"));
    let token = teacherData?.token;

    if (token && isTokenExpired(token)) {
      token = await refreshToken(); // Tokenni yangilash
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      logoutTeacher(); // Token bo‘lmasa, foydalanuvchini logout qilamiz
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Har bir javobdan keyin xatolarni tekshirish
teacherApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && [401, 403].includes(error.response.status)) {
      logoutTeacher(); // Token yaroqsiz bo‘lsa, foydalanuvchini chiqaramiz
    }
    return Promise.reject(error);
  }
);

export default teacherApi;
