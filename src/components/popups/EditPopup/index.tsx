import { useState } from "react";
import { useForm } from "react-hook-form";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AttributionIcon from "@mui/icons-material/Attribution";
import { Button, Divider } from "@mui/material";

const DeskAllocationPopup = ({
  employee,
  editClosePopup,
}: {
  employee : any,
  editClosePopup: () => void; 
}) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: employee?.user?.full_name,
      designation: employee?.user?.designation,
      experience : "2"
    },
  });
  console.log(employee, " in edit option");
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    editClosePopup();
    setConfirmPopupOpen(true);
  };

  const closePopup = () => {
    editClosePopup();
  };

  return (
    <div
      className="flex items-center justify-center fixed top-0 left-0 w-full h-full z-20 
             before:content-[''] before:absolute before:w-full before:h-full before:blur-[50px] 
             before:bg-[rgb(29,29,65,50%)]"
      id="popup-background"
    >
      <div className="h-fit text-white shadow-lg rounded-2xl w-[500px] bg-[var(--primary)] border border-[#555597] m-auto relative">
        <div className="flex justify-between p-5">
          <h1 className="text-base font-medium">Edit Employee details</h1>
          <CloseRoundedIcon onClick={closePopup} className="cursor-pointer" />
        </div>
        <Divider orientation="horizontal" color="#7A7C7E" flexItem />


        <form
          className="flex flex-col gap-5 p-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium">Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter Name"
              className="w-full text-white rounded-md py-2 px-4 bg-[var(--secondary)] focus:outline-none focus:ring-1 focus:ring-[#F85E00]"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium">Designation</label>
            <input
              {...register("designation", { required: true })}
              type="text"
              placeholder="Enter Designation"
              className="w-full text-white rounded-md py-2 px-4 bg-[var(--secondary)] focus:outline-none focus:ring-1 focus:ring-[#F85E00]"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium">Experience (Years)</label>
            <input
              {...register("experience", { required: true, min: 0 })}
              type="number"
              placeholder="Enter Experience"
              className="w-full text-white rounded-md py-2 px-4 bg-[var(--secondary)] focus:outline-none focus:ring-1 focus:ring-[#F85E00]"
            />
          </div>

 
          <button
            type="submit"
            className="bg-[#F85E00] text-white py-2 rounded-md hover:bg-[#d84e00] transition"
          >
            Submit
          </button>
        </form>
      </div>

      {isConfirmPopupOpen && (
        <div className="h-screen w-full flex items-center absolute left-0 top-0 before:content-[''] before:absolute before:w-full before:h-full before:blur-lg bg-blend-color-burn before:bg-[rgb(29,29,65,80%)] z-10">
          <div className="h-fit text-white shadow-lg rounded-2xl w-[500px] bg-[var(--primary)] border border-[#30306D] m-auto relative">
            <div className="flex justify-between p-5">
              <h1 className="text-base font-medium">
                Confirm Employee Details
              </h1>
              <div
                className="cursor-pointer"
                onClick={() => setConfirmPopupOpen(false)}
              >
                <CloseRoundedIcon />
              </div>
            </div>
            <Divider color="#7A7C7E" />
            <div className="flex flex-col items-center gap-5 p-5">
              <AttributionIcon style={{ width: "50px", height: "50px" }} />
              <p className="text-sm font-normal">
                Are you sure you want to submit this form?
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  onClick={() => setConfirmPopupOpen(false)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    reset();
                    setConfirmPopupOpen(false);
                  }}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeskAllocationPopup;
