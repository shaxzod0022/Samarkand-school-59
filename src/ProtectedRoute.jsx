import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const adminData = localStorage.getItem("adminData");
  const token = adminData ? JSON.parse(adminData).token : null; // ✅ Null bo‘lsa, xatolik bermaslik uchun tekshiramiz

  return token ? <Outlet /> : <Navigate to="/hello-admin" />;
};

export default AdminProtectedRoute;
