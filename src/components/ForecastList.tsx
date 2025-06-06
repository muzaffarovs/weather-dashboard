import React from "react";

interface ForecastItem {
  date: string;
  icon: string;
  min: number;
  max: number;
  description: string;
}

interface ForecastListProps {
  forecast: ForecastItem[];
  unit: "C" | "F";
}

export const ForecastList: React.FC<ForecastListProps> = ({
  forecast,
  unit,
}) => {
  return (
    <div className="forecast-list">
      {forecast.map((day) => (
        <div className="forecast-card" key={day.date}>
          <p className="forecast-date">{day.date}</p>
          <img
            src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
            alt={day.description}
            className="forecast-icon"
          />
          <p className="forecast-temp">
            {Math.round(day.min)}°{unit} / {Math.round(day.max)}°{unit}
          </p>
          <p className="forecast-desc">{day.description}</p>
        </div>
      ))}
    </div>
  );
};
