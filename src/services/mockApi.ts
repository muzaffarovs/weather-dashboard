import { fetchWeatherData } from "../api/mockWeatherService";

export const fetchWeatherMock = async (city: string) => {
  await new Promise((r) => setTimeout(r, 500));

  if (!["London", "New York", "Tokyo", "Sydney", "Cairo"].includes(city)) {
    throw new Error("Unsupported city");
  }

  return fetchWeatherData(city);
};
