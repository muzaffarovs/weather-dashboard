import { useEffect, useState } from "react";
import { fetchWeatherData } from "../api/mockWeatherService";
import type { Unit } from "../api/mockWeatherService";
import type { WeatherData } from "../components/WeatherDisplay";

interface WeatherHookResult {
  data: WeatherData;
  loading: boolean;
  error: string | null;
}

export function useWeatherData(city: string, unit: Unit): WeatherHookResult {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchWeatherData(city)
      .then((result) => {
        if (isMounted) {
          setData(result);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to load weather data");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [city, unit]);

  return { data, loading, error };
}
