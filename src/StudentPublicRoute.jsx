import { Navigate, Outlet } from "react-router-dom";

const StudentPublicRoute = () => {
  const studentData = sessionStorage.getItem("studentData");
  const token = studentData ? JSON.parse(studentData).token : null;

  return token ? <Navigate to="/" /> : <Outlet />;
};

export default StudentPublicRoute;
