import axios from "axios";
import { jwtDecode } from "jwt-decode";

const studentApi = axios.create({
  baseURL: "https://schoole-test-site.onrender.com/api",
});

const isTokenExpired = (token) => {
  try {
    if (!token) return true;
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

const refreshToken = async () => {
  try {
    const studentData = JSON.parse(sessionStorage.getItem("studentData"));
    const refresh = studentData?.refreshToken;

    if (!refresh) {
      throw new Error("Refresh token mavjud emas!");
    }

    const response = await axios.post(
      "https://schoole-test-site.onrender.com/api/auth/refresh",
      {
        refreshToken: refresh,
      }
    );

    const newStudentData = { ...studentData, token: response.data.accessToken };
    sessionStorage.setItem("studentData", JSON.stringify(newStudentData));

    return response.data.accessToken;
  } catch (error) {
    logoutUser();
    return null;
  }
};

const logoutUser = () => {
  sessionStorage.removeItem("studentData");
  window.location.href = "/";
};

studentApi.interceptors.request.use(
  async (config) => {
    let studentData = JSON.parse(sessionStorage.getItem("studentData"));
    let token = studentData?.token;

    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

studentApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && [401, 403].includes(error.response.status)) {
      logoutUser();
    }
    return Promise.reject(error);
  }
);

export default studentApi;
