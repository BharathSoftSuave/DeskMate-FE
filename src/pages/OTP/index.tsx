import { SubmitHandler, useForm } from "react-hook-form";
import Navbar from "../NavBar";
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doOTPVeify } from "../../service/loginService";
import { Button, Typography } from "@mui/material";

interface OTPFormValues {
  otp: string[];
  email: string;
}

const OTP: React.FC = () => {
  const { handleSubmit, setValue, formState: { errors } } = useForm<OTPFormValues>();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(true);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isRunning]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setValue("otp", newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = () => {
    setTimeLeft(60);
    setIsRunning(true);
  };

  const onSubmit: SubmitHandler<OTPFormValues> = async () => {
    const enteredOtp = otp.join("");
    try {
      const response = await doOTPVeify({ otp: enteredOtp, email: location.state?.email });
      if (response) {
        setIsOtpVerified(true);
        navigate("/success");
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
    }
  };

  return (
    <div className="h-screen bg-[#1E1B3A] text-white flex flex-col">
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="w-[500px] bg-[var(--primary)] rounded-lg border border-[#555597] p-8">
          <h4 className="text-center text-3xl font-bold text-white mb-4">Verify OTP</h4>
          {!isOtpVerified ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-8 w-full">
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    className="w-12 h-12 text-center text-white text-xl bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-[#F85E00]"
                  />
                ))}
              </div>
              {errors.otp && <p className="text-red-500 text-center">{errors.otp.message}</p>}
              <button type="submit" className="w-full bg-[var(--weight)] p-2 rounded-lg font-medium text-lg">
                Submit
              </button>
            </form>
          ) : (
            <Typography variant="h5" color="green">OTP Verified Successfully!</Typography>
          )}
          <div className="text-center mt-5">
            <Typography variant="h6">{timeLeft > 0 ? `OTP valid for ${timeLeft}s` : "Didn't receive OTP?"}</Typography>
            <Button onClick={handleResendOtp} variant="contained" color="primary" disabled={timeLeft > 0} sx={{ mt: 2 }}>
              Resend OTP
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;
