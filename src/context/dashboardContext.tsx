import React, { createContext, useEffect, useState } from "react";
import GetWeather from "../services/services";

export interface DashboardContextProps {
  widgetArray: WidgetProps[];
  currentUnit: "c" | "f";
  lastUpdated: Date;
  setCurrentUnit: React.Dispatch<React.SetStateAction<"c" | "f">>;
  setWidgetArray: React.Dispatch<React.SetStateAction<WidgetProps[]>>;
}
export const DashboardContext = createContext<null | DashboardContextProps>(
  null
);

const DashboardContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  /******************************REACT-HOOKS********************************************** */

  const [widgetArray, setWidgetArray] = useState<WidgetProps[]>(() => {
    const existing = localStorage.getItem("CW");
    return existing ? JSON.parse(existing) : [];
  });
  const [currentUnit, setCurrentUnit] = useState<"c" | "f">(
    (localStorage.getItem("T") as "c" | "f") || "c"
  );
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    localStorage.setItem("CW", JSON.stringify(widgetArray));
  }, [widgetArray]);

  useEffect(() => {
    localStorage.setItem("T", currentUnit);
  }, [currentUnit]);

  useEffect(() => {
    updateWeatherData();
    const intervalId = setInterval(() => {
      updateWeatherData();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [currentUnit, widgetArray.length]);

  /******************************SERVICE CALLS********************************************** */

  const updateWeatherData = () => {
    const promises = widgetArray.map((wid) =>
      GetWeather({ city: wid.location }).then(({ name, weather, main }) => {
        const temp =
          currentUnit === "f"
            ? ((Number(main.temp) - 273.15) * 9) / 5 + 32
            : Number(main.temp) - 273.15;

        return {
          id: wid.id,
          location: name,
          condition: weather?.[0]?.main,
          temperature: temp,
          iconCode: weather?.[0]?.icon,
        };
      })
    );

    Promise.all(promises).then((resolvedArray) => {
      setWidgetArray((currentWidgets) => {
        const updatedWidgets = currentWidgets.map((widget) => {
          const newData = resolvedArray.find(
            (newWidget) => newWidget.id === widget.id
          );
          return newData ? newData : widget;
        });
        return updatedWidgets;
      });
      setLastUpdated(new Date());
    });
  };

  const values = {
    widgetArray,
    currentUnit,
    lastUpdated,
    setCurrentUnit,
    setWidgetArray,
  };
  return (
    <DashboardContext.Provider value={values}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
