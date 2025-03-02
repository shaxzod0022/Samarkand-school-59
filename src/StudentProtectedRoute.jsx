import { Navigate, Outlet } from "react-router-dom";

const StudentProtectedRoute = () => {
  const studentData = localStorage.getItem("studentData");
  const token = studentData ? JSON.parse(studentData).token : null;

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default StudentProtectedRoute;
