import { Navigate, Outlet } from "react-router-dom";

const TeacherPublicRoute = () => {
  const teacherData = localStorage.getItem("teacherData");
  const token = teacherData ? JSON.parse(teacherData).token : null;

  return token ? <Navigate to="/hello-teacher/panel" /> : <Outlet />;
};

export default TeacherPublicRoute;
