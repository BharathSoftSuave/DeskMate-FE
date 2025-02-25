import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { doSignUp } from "../../service/loginService";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  TextField,
  Button,
  MenuItem,
  Container,
  Typography,
  IconButton,
  InputAdornment,
  Box,
  Grid,
} from "@mui/material";
import dayjs from "dayjs";
// import "./styles.scss";
import { Mail, Work, Lock, CalendarMonth, Person } from "@mui/icons-material";
// import logo from "../../assets/svg/Softsuave.svg";

interface SignUpFormInputs {
  full_name: string;
  lastName: string;
  designation: string;
  email: string;
  gender: string;
  date_of_birth: string;
  password: string;
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

  return (
    <div>
      <div className="flex items-center justify-center h-screen white">
        <Container maxWidth="sm">
          <Box
            sx={{
              mt: 2,
              p: 2,
              boxShadow: 15,
              borderRadius: 2,
              bgcolor: "var(--primary)"
            }}
          >
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                fontWeight: "bold",
                mt: 2,
              }}
            >
              Create Account
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Full Name */}
              <TextField
                fullWidth
                label="Full Name*"
                variant="outlined"
                margin="dense"
                {...register("full_name", {
                  required: "Full name is required",
                })}
                error={!!errors.full_name}
                helperText={errors.full_name?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: "var(--white)" }}  />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Email */}
              <TextField
                fullWidth
                label="Email Address*"
                type="email"
                variant="outlined"
                margin="dense"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail sx={{ color: "var(--white)" }} />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Designation */}
              <TextField
                fullWidth
                label="Designation*"
                variant="outlined"
                margin="dense"
                {...register("designation", {
                  required: "Designation is required",
                })}
                error={!!errors.designation}
                helperText={errors.designation?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Work sx={{ color: "var(--white)" }}  />
                    </InputAdornment>
                  ),
                }}
              />

              {/* DOB & Gender (Same Row) */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      name="date_of_birth"
                      control={control}
                      rules={{ required: "Date of Birth is required" }}
                      render={({ field, fieldState }) => (
                        <DatePicker
                          label="Date of Birth*"
                          value={field.value}
                          onChange={(date) => field.onChange(date)}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              variant: "outlined",
                              margin: "dense",
                              error: !!fieldState.error,
                              helperText: fieldState.error?.message,
                              InputProps: {
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <CalendarMonth sx={{ color: "var(--white)" }}  />
                                  </InputAdornment>
                                ),
                              },
                            },
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    select
                    label="Gender*"
                    variant="outlined"
                    margin="dense"
                    {...register("gender", { required: "Gender is required" })}
                    error={!!errors.gender}
                    helperText={errors.gender?.message}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="others">Others</MenuItem>
                  </TextField>
                </Grid>
              </Grid>

              {/* Password */}
              <TextField
                fullWidth
                label="Password*"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                margin="dense"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters required",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock  sx={{ color: "var(--white)" }} />
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

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2, bgcolor: "var(--weight)" }}
              >
                Sign Up
              </Button>
            </form>
            <br></br>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default SignUp;
