import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { doLogin } from "../../service/loginService";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  IconButton,
} from "@mui/material";

import Navbar from "../NavBar";

interface LoginFormInputs {
  email: string;
  password: string;
  rememberMe: boolean;
}

const PasswordReset: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
  } = useForm<LoginFormInputs>();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [error, setError] = useState("");


  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log("Hi this is ");
    try {
      const response = await doLogin(data);
      console.log("Login Response = ", response);
      if (response) navigate("/otp");
      else {
        alert("Authentication in Invalid");
        setError("Authentication in Invalid");
      }
    } catch (error) {
      console.error("Sign  12334w Error:", error);
      setError("Authentication in Invalid");
    }
  };

  function onForgotPassword(event: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="h-screen bg-[#1E1B3A] text-white flex flex-col">
      <Navbar />
      <div className="flex items-center justify-center lg:px-16 px-10 h-screen">
        <div className="w-[500px] bg-[var(--primary)] rounded-lg border border-[#555597]">
          <div className="py-14 px-8 shadow-lg rounded-lg w-full">
            <h4 className="relative text-center text-3xl  font-bold text-white mb-4 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-5 after:w-48 after:h-[3px] after:bg-[#F85E00]">
              Reset Password
            </h4>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-8 w-full">
              <div className="relative w-ful">
                <LockOutlinedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters required",
                    },
                  })}
                  className="w-full text-white rounded-md py-3 pl-12 pr-10 focus:outline-none focus:ring-1 focus:ring-[#F85E00]"
                />
                <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? (
                      <Visibility className="text-gray-200" fontSize="small" />
                    ) : (
                      <VisibilityOff className="text-white" fontSize="small" />
                    )}
                  </IconButton>
                </div>
              </div>
              <div className="relative w-full">
                <LockOutlinedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters required",
                    },
                  })}
                  className="w-full text-white rounded-md py-3 pl-12 pr-10 focus:outline-none focus:ring-1 focus:ring-[#F85E00]"
                />
                <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
                  <IconButton
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    edge="end"
                  >
                    {showPasswordConfirm ? (
                      <Visibility className="text-gray-200" fontSize="small" />
                    ) : (
                      <VisibilityOff className="text-white" fontSize="small" />
                    )}
                  </IconButton>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[var(--weight)] p-2 rounded-lg font-medium text-lg "
              >
                Send OTP
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
