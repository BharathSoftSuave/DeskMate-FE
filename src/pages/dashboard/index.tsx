import React, { useCallback, useState } from "react";
import BetaBlockWorkArea from "../../components/workArea";
import DashboardHeader from "../../components/DashboardHeader";
import AlphaBlockWorkArea from "../../components/AlphaBlock/workArea";


const Dashboard: React.FC = () => {
  const [searchName, setSearchName] = useState("");
  const [block, setBlock] = useState("Navalur Beta Block")
  const onSearch = useCallback((value: string): void => {
    setSearchName(value);
  }, [setSearchName])

  const switchBlockHandler = (block: string) => {
    setBlock(block);
  }

  const getBlockView = (block: string) => {
    switch (block) {
      case "Navalur Beta Block":
        return <BetaBlockWorkArea searchName={searchName.toLowerCase()} />;     
      case "Navalur Alpha Block":
        return <AlphaBlockWorkArea searchName={searchName.toLowerCase()} />;
  
      default:
        return <BetaBlockWorkArea searchName={searchName.toLowerCase()} />;
    }
  }

  return (
    <div className="h-screen bg-[#1E1B3A] text-white flex relative flex-col select-none">
      <DashboardHeader switchBlockHandler={switchBlockHandler} onSearch={onSearch} />
      <div className="h-full w-full mx-auto flex flex-col px-4 lg:px-20 gap-10 py-10 overflow-y-auto">
        {
          getBlockView(block)
        }   
      </div>
    </div>
  );
};

export default Dashboard;
