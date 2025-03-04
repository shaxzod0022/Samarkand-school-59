import { Navigate, Outlet } from "react-router-dom";

const AdminPublicRoute = () => {
  const adminData = sessionStorage.getItem("adminData");
  const token = adminData ? JSON.parse(adminData).token : null;

  return token ? <Navigate to="/hello-admin/panel" /> : <Outlet />;
};

export default AdminPublicRoute;
