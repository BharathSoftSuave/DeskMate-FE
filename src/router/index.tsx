import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Landingpage from "../pages/landingPage";
import Login from "../pages/login";
import SignUp from "../pages/signup";
import Dashboard from "../pages/dashboard";
import CreateWorkArea from "../pages/createWorkarea";
import OTP from "../pages/OTP";
import Drag1 from "../pages/Drag";
import KeepChildInside from "../test";
const RouterComponent: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/OTP" element={<OTP />} />
        <Route path="/create-workarea" element={<CreateWorkArea />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test" element={<KeepChildInside />} />
        <Route path="/drag" element={<Drag1 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterComponent;
