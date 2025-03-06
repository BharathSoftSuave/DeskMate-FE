import { SubmitHandler, useForm } from "react-hook-form";
import Navbar from "../NavBar"
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doOTPVeify } from "../../service/loginService";
import { Button, Typography } from "@mui/material";

interface OTPFormValues  {
    otp: string;
    email: string;
  };

const OTP: React.FC = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm<OTPFormValues>();
    
      const [timeLeft, setTimeLeft] = useState(60);
      const [isRunning, setIsRunning] = useState(true);
      const [isOtpVerified, setIsOtpVerified] = useState(false);
      const navigate = useNavigate();
      const location = useLocation();
    
      useEffect(() => {
        if (!isRunning || timeLeft <= 0) return;
        const timer = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
      }, [timeLeft, isRunning]);
    
      const handleResendOtp = () => {
        setTimeLeft(60);
        setIsRunning(true);
      };
      
    const onSubmit: SubmitHandler<OTPFormValues> = async (data) => {
        console.log(data);
        alert("Hi this is my ");
        try {
        const response = await doOTPVeify(data);
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
        <>
             <div className="h-screen bg-[#1E1B3A] text-white flex flex-col">
        <Navbar />
        <div className="flex items-center justify-center lg:px-16 px-10 h-screen">
        <div className="w-[500px] bg-[var(--primary)] rounded-lg border border-[#555597]">
          <div className="py-14 px-8 shadow-lg rounded-lg w-full">
           
          <h4 className="relative text-center text-3xl  font-bold text-white mb-4 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-5 after:w-48 after:h-[3px] after:bg-[#F85E00]">
              Create Account
            </h4>
            {!isOtpVerified ? (
                <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-8 w-full">
          <div className="relative w-full">
        <input
          type="text"
          placeholder="Enter OTP"
          {...register("otp", {
            required: "OTP is required",
            pattern: {
              value: /^[0-9]{4,6}$/, // 4-6 digit OTP validation
              message: "OTP must be 4 to 6 digits",
            },
          })}
          className="w-full text-white rounded-md py-3 pl-12 px-5 focus:outline-none focus:ring-1 focus:ring-[#F85E00]"
        />
        {errors.otp && <p className="text-red-500">{errors.otp.message}</p>}
      </div>

      <button type="submit" className="w-full bg-[var(--weight)] p-2 rounded-lg font-medium text-lg">
         Submit
      </button>

      </form>
      <div style={{ textAlign: "center", marginTop: 20 }}>
      <Typography variant="h6">
        {timeLeft > 0
          ? `OTP valid for ${timeLeft}s`
          : "Didn't receive OTP?"}
      </Typography>

      <Button
        onClick={handleResendOtp}
        variant="contained"
        color="primary"
        disabled={timeLeft > 0} // Disable button while timer is running
        sx={{ mt: 2 }}
      >
        Resend OTP
      </Button>
    </div>
    </>
             ) : (
                <>
                <Typography variant="h5" color="green">
                  OTP Verified Successfully!
                </Typography>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/148/148767.png" // Success checkmark image
                  alt="Success"
                  width="100"
                  style={{ marginTop: 10 }}
                />
              </>
      

             )

}   

          </div>
          </div>
          </div>
             </div>
        </>
    )
}

export default OTP;