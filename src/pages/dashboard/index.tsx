// pages/Dashboard.tsx
import React from "react";
import BetaBlockWorkArea from "../../components/workArea";
import AlphaBlockWorkArea from "../../components/AlphaBlock/workArea";
import { useDashboardContext } from "../../components/Layout/DashboardContextType";

const Dashboard: React.FC = () => {
  const { searchName, block } = useDashboardContext();

  const getBlockView = (block: string) => {
    switch (block) {
      case "Navalur Beta Block":
        return <BetaBlockWorkArea searchName={searchName.toLowerCase()} />;
      case "Navalur Alpha Block":
        return <AlphaBlockWorkArea searchName={searchName.toLowerCase()} />;
      default:
        return <BetaBlockWorkArea searchName={searchName.toLowerCase()} />;
    }
  };

  return (
    <div className="w-full flex flex-col px-4 lg:px-20 gap-10 py-10 overflow-y-auto">
      {getBlockView(block)}
    </div>
  );
};

export default Dashboard;
