import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AdminAuth,
  Login,
  ScrollToTop,
  StartTest,
  TeacherAuth,
  Test,
  TestResultStudent,
  UserInfo,
} from "./components";
import {
  AdminDataPage,
  AdminPanel,
  StudentDataPage,
  StudentOneDataPage,
  StudentPanel,
  StudentPanelPage,
  SubjectDataPage,
  SubjectOneDataPage,
  TeacherDataPage,
  TeacherOneDataPage,
  TeacherPanel,
  TeacherPanelDataPage,
} from "./screens";
import AdminProtectedRoute from "./ProtectedRoute";
import TeacherProtectedRoute from "./TeacherProtectedRoute";
import StudentProtectedRoute from "./StudentProtectedRoute";
import AdminPublicRoute from "./AdminPublicRoute";
import TeacherPublicRoute from "./TeacherPublicRoute";
import StudentPublicRoute from "./StudentPublicRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* 🔹 Students */}
        <Route element={<StudentPublicRoute />}>
          <Route path="/" element={<Login />} />
        </Route>

        <Route element={<StudentProtectedRoute />}>
          <Route path="/start_test_page/:id" element={<StartTest />} />
        </Route>

        {/* 🔹 Himoyalangan sahifalar */}
        <Route element={<StudentProtectedRoute />}>
          <Route path="/home_page" element={<StudentPanel />}>
            <Route index element={<StudentPanelPage />} />
            <Route path="user_info/:id" element={<UserInfo />} />
            <Route path="test_page/:id" element={<Test />} />
            <Route path="results/:id" element={<TestResultStudent />} />
          </Route>
        </Route>

        {/* Admin */}
        <Route element={<AdminPublicRoute />}>
          <Route path="/hello-admin" element={<AdminAuth />} />
        </Route>
        <Route element={<AdminProtectedRoute />}>
          <Route path="/hello-admin/panel" element={<AdminPanel />}>
            <Route index element={<AdminDataPage />} />
            {/*teacher  */}
            <Route path="/hello-admin/panel/teachers">
              <Route index element={<TeacherDataPage />} />
              <Route
                path="teacher-permitted-info/:id"
                element={<TeacherOneDataPage />}
              />
            </Route>
            {/* Student */}
            <Route path="/hello-admin/panel/students">
              <Route index element={<StudentDataPage />} />
              <Route
                path="student-permitted-info/:id"
                element={<StudentOneDataPage />}
              />
            </Route>
            {/* Subject */}
            <Route path="/hello-admin/panel/subjects">
              <Route index element={<SubjectDataPage />} />
              <Route
                path="subject-permitted-info/:id"
                element={<SubjectOneDataPage />}
              />
            </Route>
          </Route>
        </Route>

        {/* Teachers */}
        <Route element={<TeacherPublicRoute />}>
          <Route path="/hello-teacher" element={<TeacherAuth />} />
        </Route>
        <Route element={<TeacherProtectedRoute />}>
          <Route path="/hello-teacher/panel" element={<TeacherPanel />}>
            <Route index element={<TeacherPanelDataPage />} />
            {/* Student */}
            <Route path="/hello-teacher/panel/students">
              <Route index element={<StudentDataPage />} />
              <Route
                path="student-permitted-info/:id"
                element={<StudentOneDataPage />}
              />
            </Route>
            {/* Subject */}
            <Route path="/hello-teacher/panel/subjects">
              <Route index element={<SubjectDataPage />} />
              <Route
                path="subject-permitted-info/:id"
                element={<SubjectOneDataPage />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
