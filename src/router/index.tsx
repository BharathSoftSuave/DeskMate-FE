import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/login";

const RouterComponent: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<RecentActivity />} />
          <Route path="project/:id" element={<Project />} />
        </Route> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default RouterComponent;
