import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DeskOutlinedIcon from '@mui/icons-material/DeskOutlined';
import WebAssetOutlinedIcon from '@mui/icons-material/WebAssetOutlined';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import "./styles.scss";
import Navbar from "../NavBar";

interface LoginFormInputs {
  text: string;
}

const CreateWorkArea: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/dashboard");
  };
  const {
    register,
    handleSubmit,
  } = useForm<LoginFormInputs>();


  const onSubmit: SubmitHandler<LoginFormInputs> = async () => {
    console.log("Hi this is ");

  };

  return (
    <div className="h-screen bg-[#1E1B3A] text-white flex flex-col">
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="w-[500px] bg-[var(--primary)] rounded-lg border border-[#555597]">
          <div className="py-14 px-8 shadow-lg rounded-lg w-full">
            <h4
              className="relative text-center text-3xl  font-bold text-white mb-4 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-5 after:w-48 after:h-[3px] after:bg-[#F85E00]"
            >
              Create Workarea
            </h4>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-8 w-full">
              <div className="relative w-ful">
                <WebAssetOutlinedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                <input
                  type="text"
                  placeholder="Work area Name"
                  {...register("text", {
                    required: "Work area name is required",
                    // pattern: {
                    //   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    //   message: "Invalid email format",
                    // },
                  })}
                  className="w-full text-white rounded-md py-3 pl-12 px-5 focus:outline-none focus:ring-1 focus:ring-[#F85E00]"
                />
              </div>
              <div className=" w-full flex gap-5">
                <div className="relative w-full">
                  <DeskOutlinedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                  <input
                    type="number"
                    placeholder="Number of Desk"
                    {...register("text", {
                      required: "Desk count is required",
                    })}
                    className="w-full text-white rounded-md py-3 pl-12 px-5 focus:outline-none focus:ring-1 focus:ring-[#F85E00] hover:appearance-none"
                  />
                </div>
                <div className="relative w-full">
                  <MeetingRoomOutlinedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                  <input
                    type="number"
                    placeholder="Number of Rooms"
                    {...register("text", {
                      required: "Desk count is required",
                    })}
                    className="w-full text-white rounded-md py-3 pl-12 px-5 focus:outline-none focus:ring-1 focus:ring-[#F85E00] hover:appearance-none"
                  />
                </div>
              </div>


              <button
                type="submit"
                className="w-full bg-[var(--weight)] p-2 rounded-lg font-medium text-lg mt-4"
                onClick={handleClick}
              >
                Generate Smart Space
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkArea;
