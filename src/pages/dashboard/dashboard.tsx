import {
  Box,
  Button,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Header from "../../components/header/header";
import Widget from "../../components/widget/widget";
import { useDashboardContext } from "../../hooks/useContext";
import GetWeather from "../../services/services";
import { v4 as uuidv4 } from "uuid";
const Dashboard = () => {
  /******************************REACT-HOOKS********************************************** */

  const {
    widgetArray,
    currentUnit,
    lastUpdated,
    setCurrentUnit,
    setWidgetArray,
  } = useDashboardContext();
  const [city, setCity] = useState<string>("");

  /******************************SERVICE********************************************** */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city) {
      setCity("");
      GetWeather({ city })
        .then(({ name, weather, main }) => {
          const temp =
            currentUnit == "f"
              ? ((Number(main.temp) - 273.15) * 9) / 5 + 32
              : Number(main.temp) - 273.15;
          setWidgetArray((cv) => [
            ...cv,
            {
              id: uuidv4(),
              location: name,
              condition: weather?.[0]?.main,
              temperature: temp,
              iconCode: weather?.[0]?.icon,
            },
          ]);
        })
        .catch((err) => {
          alert(err?.response?.data?.message);
        });
      return;
    }
    alert("Enter a value");
  };

  /******************************CUSTOM METHODS********************************************** */
  const handleUnitChange = (e: SelectChangeEvent) => {
    const newUnit = e.target.value as "c" | "f";
    if (currentUnit === e.target.value) return;

    setCurrentUnit(newUnit);
    newUnit === "f"
      ? setWidgetArray((currentWidgets) =>
          currentWidgets.map((item: WidgetProps) => ({
            ...item,
            temperature: (item.temperature * 9) / 5 + 32,
          }))
        )
      : setWidgetArray((currentWidgets) =>
          currentWidgets.map((item: WidgetProps) => ({
            ...item,
            temperature: ((item.temperature - 32) * 5) / 9,
          }))
        );
  };

  const handleDismiss = (index: number) => {
    setWidgetArray((cv) => cv.filter((_, ind) => ind != index));
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Header title="Dashboard" />
      <Box className="dashboard" overflow={"hidden"}>
        <Grid2
          container
          spacing={2}
          padding={2}
          justifyContent={"space-between"}
        >
          <Grid2>
            <form onSubmit={handleSubmit} className="form">
              <TextField
                id="standard-basic"
                label="Enter City"
                variant="standard"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(e as unknown as React.FormEvent);
                  }
                }}
              />
              <Button
                type="submit"
                variant="contained"
                style={{ background: "#115959" }}
              >
                Add Widget
              </Button>
            </form>
          </Grid2>
          <Grid2>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">Unit</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={currentUnit}
                label="Age"
                onChange={handleUnitChange}
              >
                <MenuItem value={"c"}>Celsius</MenuItem>
                <MenuItem value={"f"}>Fahrenheit</MenuItem>
              </Select>
            </FormControl>
          </Grid2>
        </Grid2>
        <Box component="span">
          Last Updated:- {lastUpdated.toLocaleString()}
        </Box>

        <Box
          component="section"
          sx={{
            p: 2,
            flex: 1,
            overflow: "auto",
          }}
        >
          <Grid2 container spacing={2} paddingX={2} justifyContent={"center"}>
            {widgetArray?.map((wid, index) => (
              <Grid2 key={index}>
                <Widget data={wid} handleDismiss={() => handleDismiss(index)} />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
