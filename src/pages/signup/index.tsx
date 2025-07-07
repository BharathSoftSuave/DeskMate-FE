import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { doSignUp } from "../../service/loginService";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { IconButton } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SensorOccupiedOutlinedIcon from "@mui/icons-material/SensorOccupiedOutlined";
import TransgenderIcon from "@mui/icons-material/Transgender";
import Navbar from "../NavBar";
import dayjs from "dayjs";
import "./style.scss";

interface SignUpFormInputs {
  full_name: string;
  designation: string;
  email: string;
  gender: string;
  date_of_birth: string;
  password: string;
}

export function CustomDatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select Date"
        slotProps={{
          textField: {
            InputProps: {
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon className="text-gray-400" />
                </InputAdornment>
              ),
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignUpFormInputs>();

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    try {
      setIsSubmit(true);
      data.date_of_birth = dayjs(data.date_of_birth).format("YYYY-MM-DD");
      const response = await doSignUp(data);
      setIsSubmit(false);
      navigate("/otp", { state: { email: data.email } });
      if (response) {
        navigate("/otp", { state: { email: data.email } });
      }
    } catch (error) {
      console.error("Sign up Error:", error);
    }
  };

  return (
    <div className="h-screen bg-[#1E1B3A] text-white flex flex-col">
      <Navbar />
      <div className="flex items-start justify-center lg:px-16 px-10 py-20 h-full overflow-auto">
        <div className="w-[500px] bg-[var(--primary)] rounded-lg border border-[#555597] m-auto">
          <div className="py-14 px-8 shadow-lg rounded-lg w-full">
            <h4 className="relative text-center text-3xl  font-bold text-white mb-4 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-5 after:w-48 after:h-[3px] after:bg-[#F85E00]">
              Create Account
            </h4>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 pt-8 w-full"
            >
              <div className="relative w-full">
                <div className="relative">
                  <PersonOutlineIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    {...register("full_name", {
                      required: "Full Name is required",
                    })}
                    className="w-full text-white rounded-md py-3 pl-12 px-5 focus:outline-none focus:ring-1 focus:ring-[#F85E00]"
                  />
                </div>
                {errors.full_name && (
                  <p className="text-red-500">{errors.full_name.message}</p>
                )}
              </div>

              <div className="relative w-full">
                <div className="relative">
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
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="relative w-full">
                <div className="relative">
                  <SensorOccupiedOutlinedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                  <input
                    type="text"
                    placeholder="Designation"
                    {...register("designation", {
                      required: "Designation is required",
                    })}
                    className="w-full text-white rounded-md py-3 pl-12 px-5 focus:outline-none focus:ring-1 focus:ring-[#F85E00]"
                  />
                </div>
                {errors.designation && (
                  <p className="text-red-500">{errors.designation.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 w-full space-x-3">
                <div className="relative w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      onChange={(date) =>
                        setValue(
                          "date_of_birth",
                          dayjs(date).format("YYYY-MM-DD")
                        )
                      }
                      slotProps={{
                        textField: {
                          className: "date-picker rounded-md",
                          sx: {
                            "& .MuiOutlinedInput-root": {
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "transparent",
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: "#F85E00",
                                  borderWidth: "1px",
                                },
                              "& input": {
                                textTransform: "none",
                                translate: "none",
                              },
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                  {errors.date_of_birth && (
                    <p className="text-red-500">
                      {errors.date_of_birth.message}
                    </p>
                  )}
                </div>

                <div className="relative w-full">
                  <div className="relative">
                    <TransgenderIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                    <select
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      className="w-full text-white bg-[var(--input)] rounded-md py-3 pl-12 px-5 focus:outline-none focus:ring-1 focus:ring-[#F85E00] appearance-none"
                    >
                      <option
                        value=""
                        disabled
                        selected
                        className="text-gray-500"
                      >
                        Gender
                      </option>
                      <option
                        value="male"
                        className="bg-black text-white hover:bg-[#F85E00] transition duration-300"
                      >
                        Male
                      </option>
                      <option
                        value="female"
                        className="bg-black text-white hover:bg-[#F85E00] transition duration-300"
                      >
                        Female
                      </option>
                      <option
                        value="other"
                        className="bg-black text-white hover:bg-[#F85E00] transition duration-300"
                      >
                        Other
                      </option>
                    </select>
                  </div>
                  {errors.gender && (
                    <p className="text-red-500">{errors.gender.message}</p>
                  )}
                </div>
              </div>

              <div className="relative w-full">
                <div className="relative">
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
                        <Visibility
                          className="text-gray-200"
                          fontSize="small"
                        />
                      ) : (
                        <VisibilityOff
                          className="text-white"
                          fontSize="small"
                        />
                      )}
                    </IconButton>
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                className={`w-full bg-[var(--weight)] p-2 rounded-lg font-medium text-lg ${isSubmit ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isSubmit ?"Sign Up..." : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
