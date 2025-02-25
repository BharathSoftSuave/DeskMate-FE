import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { doLogin } from "../../service/loginService";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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
    <div className="flex items-center justify-center h-screen white">
      <Container maxWidth="xs">
        <Box
          sx={{
            mb: 18,
            p: 3,
            boxShadow: 15,
            borderRadius: 4,
            bgcolor: "var(--primary)",
          }}
        >
          <Typography
            variant="h5"
            className="relative text-center after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:w-44 after:h-1 after:bg-[#F85E00]"
            gutterBottom
            sx={{ color: "#FFFFFF", textAlign: "center", fontWeight: "bold" }}
          >
            <b>Welcome back!</b>
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-44 h-1 bg-[#F85E00]"></div>
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div style={{ position: "relative", width: "100%" }}>
              <Mail
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--white)",
                }}
              />
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
                style={{
                  backgroundColor: "var(--primary)",
                  width: "100%",
                  padding: "8px",
                  paddingLeft: "35px",
                  marginTop: "5px",
                  borderRadius: "4px",
                  color: "var(--white)",
                }}
              />
            </div>
            


            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
              sx={{
                input: { color: "var(--white)" },
              }}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "var(--white)" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div className="flex justify-between items-center">
              <FormControlLabel
                control={<Checkbox {...register("rememberMe")} />}
                sx={{
                  color:"var(--white)",
                  "&.Mui-checked": {
                    color: "red", // Checked color
                  },
                }}
                label="Remember Me"
                className="text-sm"
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
            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="bg-red-500"
              sx={{ backgroundColor: "#F16A23" }}
            >
              Login
            </Button>
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
        </Box>
      </Container>
    </div>
  );
};

export default Login;
