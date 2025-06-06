export type Unit = "metric" | "imperial";

interface WeatherPoint {
  dt: number; // in milliseconds
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

interface ForecastDay {
  date: string;
  icon: string;
  description: string;
  min: number;
  max: number;
}

interface ChartPoint {
  date: string;
  temp: number;
}

interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind: number;
    icon: string;
    description: string;
  };
  forecast: ForecastDay[];
  stats: ChartPoint[];
}

const BASE_TEMPS: Record<string, number> = {
  London: 13,
  "New York": 18,
  Tokyo: 22,
  Sydney: 20,
  Cairo: 30,
};

function generateMockForecast(city: string): WeatherPoint[] {
  const baseTemp = BASE_TEMPS[city] ?? 20;
  const now = Date.now();
  const threeHours = 3 * 60 * 60 * 1000;

  return Array.from({ length: 40 }, (_, i) => {
    const temp = baseTemp + Math.sin(i / 3) * 5 + Math.random() * 2;

    return {
      dt: now + i * threeHours,
      main: {
        temp,
        feels_like: temp - 1,
        temp_min: temp - 2,
        temp_max: temp + 2,
        humidity: 50 + Math.floor(Math.random() * 20),
      },
      weather: [
        {
          description: "Cloudy",
          icon: "03d",
        },
      ],
      wind: {
        speed: Math.random() * 5 + 2,
      },
    };
  });
}

function getFiveDayForecast(list: WeatherPoint[]): ForecastDay[] {
  const byDate: Record<string, WeatherPoint[]> = {};

  for (const point of list) {
    const date = new Date(point.dt).toISOString().split("T")[0];
    byDate[date] ??= [];
    byDate[date].push(point);
  }

  return Object.entries(byDate)
    .slice(0, 5)
    .map(([date, points]) => {
      const temps = points.map((p) => p.main.temp);
      return {
        date,
        icon: points[0].weather[0].icon,
        description: points[0].weather[0].description,
        min: Math.min(...temps),
        max: Math.max(...temps),
      };
    });
}

function extractChartPoints(list: WeatherPoint[]): ChartPoint[] {
  return list.map((point) => ({
    date: new Date(point.dt).toISOString(),
    temp: point.main.temp,
  }));
}

export async function fetchWeatherData(city: string): Promise<WeatherData> {
  const allowedCities = ["London", "New York", "Tokyo", "Sydney", "Cairo"];
  if (!allowedCities.includes(city)) {
    throw new Error("City not supported in mock API.");
  }

  await new Promise((res) => setTimeout(res, 500));

  const list = generateMockForecast(city);
  const current = list[0];

  return {
    current: {
      temp: current.main.temp,
      feels_like: current.main.feels_like,
      humidity: current.main.humidity,
      wind: current.wind.speed,
      icon: current.weather[0].icon,
      description: current.weather[0].description,
    },
    forecast: getFiveDayForecast(list),
    stats: extractChartPoints(list),
  };
}
