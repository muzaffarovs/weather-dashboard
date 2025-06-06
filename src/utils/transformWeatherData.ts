type WeatherEntry = {
  dt: number;
  main: { temp: number };
  dt_txt: string;
};

export function transformWeatherData(
  data: any,
  unit: "metric" | "imperial",
  inputUnit: "kelvin" | "metric" | "imperial"
) {
  const grouped: Record<string, number[]> = {};

  data.list.forEach((entry: WeatherEntry) => {
    const date = entry.dt_txt.split(" ")[0];
    const temp = convertTemp(entry.main.temp, unit, inputUnit);

    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(temp);
  });

  const dailyStats = Object.entries(grouped).map(([date, temps]) => {
    const avg = temps.reduce((sum, t) => sum + t, 0) / temps.length;
    const min = Math.min(...temps);
    const max = Math.max(...temps);

    return {
      date,
      average: round(avg),
      min: round(min),
      max: round(max),
    };
  });

  return {
    original: data,
    stats: dailyStats.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    ),
  };
}

function convertTemp(
  temp: number,
  unit: "metric" | "imperial",
  inputUnit: "kelvin" | "metric" | "imperial"
) {
  if (inputUnit === "kelvin") {
    const celsius = temp - 273.15;
    return unit === "metric" ? celsius : (celsius * 9) / 5 + 32;
  }
  return temp;
}

function round(n: number) {
  return Math.round(n * 10) / 10;
}
