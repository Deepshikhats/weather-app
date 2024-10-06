import { Close } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";
import { useDashboardContext } from "../../hooks/useContext";

const Widget: React.FC<{
  data: WidgetProps;
  handleDismiss: () => void;
}> = ({ data, handleDismiss }) => {
  const { currentUnit } = useDashboardContext();
  return (
    <Card
      sx={{
        minWidth: 300,
        width: "auto",
        backgroundColor: "darkgoldenrod",
        borderRadius: 4,
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {data?.location}
          <button
            type="button"
            onClick={handleDismiss}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Close />
          </button>
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 2,
          }}
        >
          <img
            src={`http://openweathermap.org/img/wn/${data?.iconCode}@2x.png`}
          />
        </Box>

        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          {data?.temperature.toFixed(2)}°{currentUnit}
        </Typography>

        <Typography
          sx={{ textAlign: "center", textTransform: "capitalize", mt: 1 }}
        >
          {data?.condition}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Widget;
