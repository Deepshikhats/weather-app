import React, { createContext, useEffect, useState } from "react";

export interface DashboardContextProps {
  widgetArray: WidgetProps[];
  currentUnit: "c" | "f";
  setCurrentUnit: React.Dispatch<React.SetStateAction<"c" | "f">>;
  setWidgetArray: React.Dispatch<React.SetStateAction<WidgetProps[]>>;
}
export const DashboardContext = createContext<null | DashboardContextProps>(
  null
);

const DashboardContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [widgetArray, setWidgetArray] = useState<WidgetProps[]>(() => {
    const existing = localStorage.getItem("CW");
    return existing ? JSON.parse(existing) : [];
  });
  const [currentUnit, setCurrentUnit] = useState<"c" | "f">(
    (localStorage.getItem("T") as "c" | "f") || "c"
  );

  useEffect(() => {
    localStorage.setItem("CW", JSON.stringify(widgetArray));
  }, [widgetArray]);

  useEffect(() => {
    localStorage.setItem("T", currentUnit);
  }, [currentUnit]);

  const values = { widgetArray, currentUnit, setCurrentUnit, setWidgetArray };
  return (
    <DashboardContext.Provider value={values}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
