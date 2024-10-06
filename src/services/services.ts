import axios from "axios";

const GetWeather = async ({ city }: { city: string }) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9a9b783fcb1aab7172050d26fe9dd633`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default GetWeather;
