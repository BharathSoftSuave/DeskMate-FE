import React, { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Divider } from "@mui/material";
import { uploadEmployees } from "../../service/loginService";
import APIErrorPopup from "../../common/popups/APIErrorPopup";

interface ImportEmployeePopupProps {
  onClose: () => void;
}

const ImportEmployeePopup: React.FC<ImportEmployeePopupProps> = ({
  onClose,
}) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await uploadEmployees({
        employee_data_sheet: file,
        full_name: name,
        email,
        gender,
        date_of_birth: dob,
      });
      onClose();
    } catch (error: any) {
      console.log(error);
      setError(error.message)
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="h-fit text-white shadow-lg rounded-2xl w-[500px] bg-[var(--primary)] border border-[#555597] m-auto relative">
        <div className="flex justify-between p-5">
          <h1 className="text-base font-medium font-rubik">
            Import Employee's
          </h1>
          <CloseRoundedIcon className="cursor-pointer" onClick={onClose} />
        </div>
        <Divider orientation="horizontal" color="#7A7C7E" flexItem />
        <form className="flex flex-col gap-5 p-5" onSubmit={handleSubmit}>
          <input
            type="file"
            required
            onChange={handleFileChange}
            className="block w-full border rounded p-2"
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full"
            className="block w-full border rounded p-2"
          />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter second data"
            className="block w-full border rounded p-2"
          />
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Enter third data"
            className="block w-full border rounded p-2"
          />
          <input
            type="text"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            placeholder="Enter third data"
            className="block w-full border rounded p-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
          >
            Submit
          </button>
        </form>
        {error && (
            <APIErrorPopup message={error} onClose={() => setError("")} />
          )}
      </div>
    </div>
  );
};

export default ImportEmployeePopup;
