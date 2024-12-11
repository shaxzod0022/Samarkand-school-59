import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, ScrollToTop, StartTest, Test, UserInfo } from "./components";
import {
  Appropriation,
  ClassStudents,
  MainLayout,
  PrivateRoute,
  SciensesAndActivity,
  TeacherDashboard,
} from "./screens"; // TeacherDashboard yangi komponent
import NoFootHeadLayout from "./screens/NoFootHeadLayout";

const Navigate = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Login va umumiy sahifalar */}
        <Route path="/" element={<NoFootHeadLayout />}>
          <Route index element={<Login />} />
          <Route path="start_test_page/:id" element={<StartTest />} />
        </Route>

        {/* Himoyalangan sahifalar */}
        <Route
          path="/home_page/:userId"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<SciensesAndActivity />} />
          {/* O'quvchilar uchun sahifa */}
          <Route path="user_info/:id" element={<UserInfo />} />
          <Route path="test_page/:id" element={<Test />} />
          <Route path="appropriation/:id" element={<Appropriation />} />
        </Route>

        {/* O'qituvchilar uchun sahifa */}
        <Route
          path="/home_page/teacher/:userId"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<TeacherDashboard />} />
          {/* O'qituvchilar uchun yangi sahifa */}
          <Route path="class_students/:classId" element={<ClassStudents />} />
          <Route path="user_info/:id" element={<UserInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Navigate;
