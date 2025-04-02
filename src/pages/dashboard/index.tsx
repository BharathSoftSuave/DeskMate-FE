import React, { useCallback, useState } from "react";
import WorkArea from "../../components/workArea";
import DashboardHeader from "../../components/DashboardHeader";


const Dashboard: React.FC = () => {
  const [searchName, setSearchName] = useState("");
  const onSearch = useCallback((value: string): void => {
    setSearchName(value);
  }, [setSearchName])

  return (
    <div className="h-screen bg-[#1E1B3A] text-white flex relative flex-col select-none">
      <DashboardHeader onSearch={onSearch} />
      <div className="h-full w-full mx-auto flex flex-col px-4 lg:px-20 gap-10 py-10 overflow-y-auto">
        <WorkArea searchName={searchName.toLowerCase()} />
      </div>
    </div>
  );
};

export default Dashboard;
