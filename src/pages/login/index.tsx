import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { doLogin } from "../../service/loginService";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Mail, Lock } from "@mui/icons-material";
import "./styles.scss";
import Navbar from "../NavBar";

interface LoginFormInputs {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log("Hi this is ");
    try {
      const response = await doLogin(data);
      console.log("Login Response = ", response);
      if (response) navigate("/home");
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
              Create Account
            </h4>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-8 w-full">
              <div className="relative w-ful">
                <MailOutlinedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                <input
                  type="email"
                  placeholder="Email address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                  className="w-full text-white rounded-md py-3 pl-12 px-5 focus:outline-none focus:ring-1 focus:ring-[#F85E00]"
                />
              </div>
              <div className="relative w-ful">
                <LockOutlinedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
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
              <div className="flex justify-between items-center px-2">
                <FormControlLabel
                  control={<Checkbox {...register("rememberMe")} size="small" sx={{
                    color: "var(--white)",
                    "&.Mui-checked": {
                      color: "var(--weight)",
                    },
                  }} />}
                  label="Remember Me"
                />
                <button
                  type="button"
                  className="text-blue-500 hover:underline text-sm"
                  style={{ color: "#F16A23" }}
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-[var(--weight)] p-2 rounded-lg font-medium text-lg"
              >
                Login
              </button>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <Typography variant="body2">Don't have an account?</Typography>
                <Button
                  variant="text"
                  color="primary"
                  sx={{ color: "var(--weight)" }}
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
