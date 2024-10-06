interface WidgetProps {
  id: string;
  location: string;
  temperature: number;
  condition:
    | "clear"
    | "clouds"
    | "rain"
    | "thunderstorm"
    | "snow"
    | "mist"
    | "fog"
    | "drizzle"
    | "haze"
    | "hail"
    | "windy";
  iconCode: string;
}
