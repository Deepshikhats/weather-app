import { useContext } from "react";
import { DashboardContext } from "../context/dashboardContext";
export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (context === null) {
    throw new Error(
      "Dashboard context must be used in dashboard context provider"
    );
  } else {
    return context;
  }
};
