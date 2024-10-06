import DashboardContextProvider from "../../context/dashboardContext";
import Dashboard from "./dashboard";

const DashboardPage = () => (
  <DashboardContextProvider>
    <Dashboard />
  </DashboardContextProvider>
);

export default DashboardPage;
