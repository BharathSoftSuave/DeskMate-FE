import { useState } from "react";
import { useForm } from "react-hook-form";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Button, Divider } from "@mui/material";

const EmployeeAllocationPopup = ({
  editClosePopup,
}: {
  editClosePopup: () => void;
}) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      gender: "",
      date_of_birth: "",
      employee_data_sheet: null,
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    editClosePopup();
  };

  return (
    <div
      className="flex items-center justify-center fixed top-0 left-0 w-full h-full z-20 
             before:content-[''] before:absolute before:w-full before:h-full before:blur-[50px] 
             before:bg-[rgb(29,29,65,50%)]"
    >
      <div className="h-fit text-white shadow-lg rounded-2xl w-[500px] bg-[var(--primary)] border border-[#555597] m-auto relative">
        <div className="flex justify-between p-5">
          <h1 className="text-base font-medium">Employee Details</h1>
          <CloseRoundedIcon onClick={editClosePopup} className="cursor-pointer" />
        </div>
        <Divider orientation="horizontal" color="#7A7C7E" flexItem />

        {/* 📝 Form Section */}
        <form
          className="flex flex-col gap-5 p-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium">Full Name *</label>
            <input
              {...register("full_name", { required: true })}
              type="text"
              placeholder="Enter Full Name"
              className="w-full text-white rounded-md py-2 px-4 bg-[var(--secondary)] focus:outline-none focus:ring-1 focus:ring-[#F85E00]"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium">Email *</label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Enter Email"
              className="w-full text-white rounded-md py-2 px-4 bg-[var(--secondary)] focus:outline-none focus:ring-1 focus:ring-[#F85E00]"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium">Gender *</label>
            <select
              {...register("gender", { required: true })}
              className="w-full text-white rounded-md py-2 px-4 bg-[var(--secondary)] focus:outline-none focus:ring-1 focus:ring-[#F85E00]"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium">Date of Birth *</label>
            <input
              {...register("date_of_birth", { required: true })}
              type="date"
              className="w-full text-white rounded-md py-2 px-4 bg-[var(--secondary)] focus:outline-none focus:ring-1 focus:ring-[#F85E00]"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium">Employee Data Sheet *</label>
            <input
              {...register("employee_data_sheet", { required: true })}
              type="file"
              className="w-full text-white rounded-md py-2 px-4 bg-[var(--secondary)] focus:outline-none focus:ring-1 focus:ring-[#F85E00]"
            />
          </div>

          {/* 🔘 Submit Button */}
          <button
            type="submit"
            className="bg-[#F85E00] text-white py-2 rounded-md hover:bg-[#d84e00] transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeAllocationPopup;
