import { createContext, useContext } from "react";

type DashboardContextType = {
  searchName: string;
  setSearchName: (value: string) => void;
  block: string;
  setBlock: (block: string) => void;
};

export const DashboardContext = createContext<DashboardContextType | null>(null);

export const useDashboardContext = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboardContext must be used inside DashboardContext.Provider");
  return ctx;
};
