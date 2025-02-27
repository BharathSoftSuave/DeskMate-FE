import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { doSignUp } from "../../service/loginService";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { InputAdornment, SvgIconTypeMap } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { IconButton } from "@mui/material";
import dayjs from "dayjs";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import "./style.scss";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Navbar from "../NavBar";
import SensorOccupiedOutlinedIcon from "@mui/icons-material/SensorOccupiedOutlined";
import TransgenderIcon from '@mui/icons-material/Transgender';


interface SignUpFormInputs {
  full_name: string;
  lastName: string;
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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormInputs>();

  const password = watch("password");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfrimPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    try {
      // data.date_of_birth = data.date_of_birth.format('YYYY-MM-DD');
      data.date_of_birth = dayjs(data.date_of_birth).format("YYYY-MM-DD");
      const response = await doSignUp(data);
      console.log("Sign up succesfully");
      navigate("/otp", { state: { email: data.email } });
      if (response) {
        console.log("Sign up succesfully", response, "   ireiureuiiu");
        navigate("/otp", { state: { email: data.email } });
      } else {
        console.log("");
      }
    } catch (error) {
      console.error("Sign up Error:", error);
    }
  };
  const createHandleMenuClick = (menuItem: string) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };


  return (
    // <div>
    //   <div className="flex items-center justify-center h-screen white">
    //     <Container maxWidth="sm">
    //       <Box
    //         sx={{
    //           mt: 2,
    //           p: 2,
    //           boxShadow: 15,
    //           borderRadius: 2,
    //           bgcolor: "var(--primary)"
    //         }}
    //       >
    //         <Typography
    //           variant="h5"
    //           sx={{
    //             display: "flex",
    //             justifyContent: "center",
    //             alignItems: "center",
    //             textAlign: "center",
    //             fontWeight: "bold",
    //             mt: 2,
    //           }}
    //         >
    //           Create Account
    //         </Typography>
    //         <form onSubmit={handleSubmit(onSubmit)}>
    //           {/* Full Name */}
    //           <TextField
    //             fullWidth
    //             label="Full Name*"
    //             variant="outlined"
    //             margin="dense"
    //             {...register("full_name", {
    //               required: "Full name is required",
    //             })}
    //             error={!!errors.full_name}
    //             helperText={errors.full_name?.message}
    //             InputProps={{
    //               startAdornment: (
    //                 <InputAdornment position="start">
    //                   <Person sx={{ color: "var(--white)" }}  />
    //                 </InputAdornment>
    //               ),
    //             }}
    //           />

    //           {/* Email */}
    //           <TextField
    //             fullWidth
    //             label="Email Address*"
    //             type="email"
    //             variant="outlined"
    //             margin="dense"
    //             {...register("email", {
    //               required: "Email is required",
    //               pattern: {
    //                 value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    //                 message: "Invalid email format",
    //               },
    //             })}
    //             error={!!errors.email}
    //             helperText={errors.email?.message}
    //             InputProps={{
    //               startAdornment: (
    //                 <InputAdornment position="start">
    //                   <Mail sx={{ color: "var(--white)" }} />
    //                 </InputAdornment>
    //               ),
    //             }}
    //           />

    //           {/* Designation */}
    //           <TextField
    //             fullWidth
    //             label="Designation*"
    //             variant="outlined"
    //             margin="dense"
    //             {...register("designation", {
    //               required: "Designation is required",
    //             })}
    //             error={!!errors.designation}
    //             helperText={errors.designation?.message}
    //             InputProps={{
    //               startAdornment: (
    //                 <InputAdornment position="start">
    //                   <Work sx={{ color: "var(--white)" }}  />
    //                 </InputAdornment>
    //               ),
    //             }}
    //           />

    //           {/* DOB & Gender (Same Row) */}
    //           <Grid container spacing={2}>
    //             <Grid item xs={6}>
    //               <LocalizationProvider dateAdapter={AdapterDayjs}>
    //                 <Controller
    //                   name="date_of_birth"
    //                   control={control}
    //                   rules={{ required: "Date of Birth is required" }}
    //                   render={({ field, fieldState }) => (
    //                     <DatePicker
    //                       label="Date of Birth*"
    //                       value={field.value}
    //                       onChange={(date) => field.onChange(date)}
    //                       slotProps={{
    //                         textField: {
    //                           fullWidth: true,
    //                           variant: "outlined",
    //                           margin: "dense",
    //                           error: !!fieldState.error,
    //                           helperText: fieldState.error?.message,
    //                           InputProps: {
    //                             startAdornment: (
    //                               <InputAdornment position="start">
    //                                 <CalendarMonth sx={{ color: "var(--white)" }}  />
    //                               </InputAdornment>
    //                             ),
    //                           },
    //                         },
    //                       }}
    //                     />
    //                   )}
    //                 />
    //               </LocalizationProvider>
    //             </Grid>

    //             <Grid item xs={6}>
    //               <TextField
    //                 fullWidth
    //                 select
    //                 label="Gender*"
    //                 variant="outlined"
    //                 margin="dense"
    //                 {...register("gender", { required: "Gender is required" })}
    //                 error={!!errors.gender}
    //                 helperText={errors.gender?.message}
    //               >
    //                 <MenuItem value="male">Male</MenuItem>
    //                 <MenuItem value="female">Female</MenuItem>
    //                 <MenuItem value="others">Others</MenuItem>
    //               </TextField>
    //             </Grid>
    //           </Grid>

    //           {/* Password */}
    //           <TextField
    //             fullWidth
    //             label="Password*"
    //             type={showPassword ? "text" : "password"}
    //             variant="outlined"
    //             margin="dense"
    //             {...register("password", {
    //               required: "Password is required",
    //               minLength: {
    //                 value: 6,
    //                 message: "Minimum 6 characters required",
    //               },
    //             })}
    //             error={!!errors.password}
    //             helperText={errors.password?.message}
    //             InputProps={{
    //               startAdornment: (
    //                 <InputAdornment position="start">
    //                   <Lock  sx={{ color: "var(--white)" }} />
    //                 </InputAdornment>
    //               ),
    //               endAdornment: (
    //                 <InputAdornment position="end">
    //                   <IconButton
    //                     onClick={() => setShowPassword(!showPassword)}
    //                     edge="end"
    //                   >
    //                     {showPassword ? <VisibilityOff /> : <Visibility />}
    //                   </IconButton>
    //                 </InputAdornment>
    //               ),
    //             }}
    //           />

    //           {/* Submit Button */}
    //           <Button
    //             type="submit"
    //             variant="contained"
    //             fullWidth
    //             sx={{ mt: 2, bgcolor: "var(--weight)" }}
    //           >
    //             Sign Up
    //           </Button>
    //         </form>
    //         <br></br>
    //       </Box>
    //     </Container>
    //   </div>
    // </div>

    <div className="h-screen bg-[#1E1B3A] text-white flex flex-col">
      <Navbar />
      <div className="flex items-center justify-center lg:px-16 px-10 h-screen">
        <div className="w-[500px] bg-[var(--primary)] rounded-lg border border-[#555597]">
          <div className="py-14 px-8 shadow-lg rounded-lg w-full">
            <h4 className="relative text-center text-3xl  font-bold text-white mb-4 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-5 after:w-48 after:h-[3px] after:bg-[#F85E00]">
              Create Account
            </h4>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 pt-8 w-full"
            >
              <div className="relative w-ful">
                <PersonOutlineIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full text-white rounded-md py-3 pl-12 px-5 focus:outline-none focus:ring-1 focus:ring-[#F85E00]"
                />
              </div>
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
                <SensorOccupiedOutlinedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                <input
                  type="text"
                  placeholder="Designation"
                  className="w-full text-white rounded-md py-3 pl-12 px-5 focus:outline-none focus:ring-1 focus:ring-[#F85E00]"
                />
              </div>
              <div className="grid grid-cols-2 w-full space-x-3">
                <div className="relative w-ful">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      slotProps={{
                        textField: {
                          className: "date-picker rounded-md",
                          tabIndex: 0,
                          sx: {
                            "& .MuiOutlinedInput-root": {
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "transparent", // Removes hover effect
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#F85E00",
                                borderWidth: "1px",
                              },
                              "& input": {
                                textTransform: "none", // Prevents automatic text transformation
                                translate: "none", // Ensures no translation effect
                              },
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>
                <div className="relative w-full">
                  <TransgenderIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                  <select
                    {...register("gender", { required: "Gender is required" })}
                    className="w-full text-white bg-[var(--input)] rounded-md py-3 pl-12 px-5 focus:outline-none focus:ring-1 focus:ring-[#F85E00] appearance-none"
                  >
                    <option value="" disabled selected className="text-gray-500">
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
              <button
                type="submit"
                className="w-full bg-[var(--weight)] p-2 rounded-lg font-medium text-lg"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
