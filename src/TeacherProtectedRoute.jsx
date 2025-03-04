import { Navigate, Outlet } from "react-router-dom";

const TeacherProtectedRoute = () => {
  const teacherData = sessionStorage.getItem("teacherData");
  const token = teacherData ? JSON.parse(teacherData).token : null;

  return token ? <Outlet /> : <Navigate to="/hello-admin" />;
};

export default TeacherProtectedRoute;
