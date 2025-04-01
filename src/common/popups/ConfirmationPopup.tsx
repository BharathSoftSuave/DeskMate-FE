import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AttributionIcon from "@mui/icons-material/Attribution";
import { SvgIconProps } from "@mui/material";
import { Button } from "@mui/material";

interface ConfirmationPopupProps {
  values: {
    heading: string;
    body: string;
    cancel: string;
    confirm: string;
    icon: SvgIconProps;
  };
  actions: {
    confirm: Function;
    cancel: Function;
  };
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  values,
  actions,
}) => {
  return (
    <div className="h-screen w-full flex items-center absolute left-0 top-0 before:content-[''] before:absolute before:w-full before:h-full before:blur-lg bg-blend-color-burn before:bg-[rgb(29,29,65,80%)] z-10">
      <div className="h-fit text-white shadow-lg rounded-2xl w-[500px] bg-[var(--primary)] border border-[#30306D] m-auto relative">
        <div className="flex justify-between p-5">
          <h1 className="text-base font-medium font-rubik">{values.heading}</h1>

          <div className="cursor-pointer" onClick={() => actions.cancel()}>
            <CloseRoundedIcon />
          </div>
        </div>
        <hr
          className="MuiDivider-root MuiDivider-fullWidth MuiDivider-flexItem css-lhgpb-MuiDivider-root"
          color="#7A7C7E"
        ></hr>
        <div className="flex flex-col items-center gap-5 p-5">
          <AttributionIcon style={{ width: "50px", height: "50px" }} />
          <p className="text-sm font-normal font-lato">{values.body}</p>
          <div className="flex gap-2">
            <Button variant="outlined" onClick={() => actions.cancel()}>
              {values.cancel}
            </Button>
            <Button variant="contained" onClick={() => actions.confirm()}>
              {values.confirm}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
