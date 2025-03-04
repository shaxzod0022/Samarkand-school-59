import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: "https://schoole-test-site.onrender.com/api",
});

// 🔹 Token muddati tugaganligini tekshirish
const isTokenExpired = (token) => {
  try {
    if (!token) return true;
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

// 🔹 Logout funksiyasi
const logoutAdmin = () => {
  sessionStorage.removeItem("adminData");
  window.location.href = "/hello-admin";
};

// 🔹 Tokenni yangilash funksiyasi
const refreshToken = async () => {
  try {
    const adminData = JSON.parse(sessionStorage.getItem("adminData"));
    const refresh = adminData?.refreshToken;

    if (!refresh) {
      logoutAdmin();
      return null;
    }

    const response = await axios.post(
      "https://schoole-test-site.onrender.com/api/auth/refresh",
      {
        refreshToken: refresh,
      }
    );

    const newAdminData = { ...adminData, token: response.data.accessToken };
    sessionStorage.setItem("adminData", JSON.stringify(newAdminData));

    return response.data.accessToken;
  } catch (error) {
    logoutAdmin(); // Agar refresh token ishlamasa, foydalanuvchini logout qilamiz
    return null;
  }
};

// 🔹 Har bir so‘rov oldidan tokenni tekshirish
api.interceptors.request.use(
  async (config) => {
    let adminData = JSON.parse(sessionStorage.getItem("adminData"));
    let token = adminData?.token;

    if (token && isTokenExpired(token)) {
      token = await refreshToken(); // Tokenni yangilash
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      logoutAdmin(); // Token bo‘lmasa, foydalanuvchini logout qilamiz
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Har bir javobdan keyin xatolarni tekshirish
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && [401, 403].includes(error.response.status)) {
      logoutAdmin(); // Token yaroqsiz bo‘lsa, foydalanuvchini chiqaramiz
    }
    return Promise.reject(error);
  }
);

export default api;
