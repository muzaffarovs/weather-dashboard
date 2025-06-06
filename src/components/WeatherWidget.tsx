import React, { useReducer, useState, useEffect } from "react";
import { weatherReducer, initialState } from "../reducers/weatherReducer";
import { useWeatherData } from "../hooks/useWeatherData";
import { CitySelector } from "./CitySelector";
import { WeatherDisplay } from "./WeatherDisplay";
import { ForecastList } from "./ForecastList";
import { DataVisualization } from "./DataVisualization";
import { SettingsPanel } from "./SettingsPanel";
import { useTheme } from "../context/ThemeContext";

export const WeatherWidget: React.FC = () => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);
  const [tab, setTab] = useState<"current" | "forecast" | "stats">("current");

  const [settings, setSettings] = useState({
    unit: "C" as "C" | "F",
    refreshRate: 10,
    showForecast: true,
    showChart: true,
  });

  const { theme, toggleTheme } = useTheme();
  const { data, error, loading } = useWeatherData(state.city, state.unit);

  useEffect(() => {
    if (data) dispatch({ type: "FETCH_WEATHER", payload: data });
    if (error) dispatch({ type: "SET_ERROR", payload: error });
  }, [data, error]);

  const handleCityChange = (city: string) => {
    dispatch({ type: "CHANGE_CITY", payload: city });
  };

  const handleSettingsChange = (changes: Partial<typeof settings>) => {
    setSettings((prev) => ({ ...prev, ...changes }));
    if (changes.unit && changes.unit !== settings.unit) {
      dispatch({ type: "TOGGLE_UNIT" });
    }
  };

  if (state.error) {
    return <div className="error-message">Error: {state.error}</div>;
  }

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="weather-widget" style={{ maxWidth: 800, margin: "0 auto" }}>
      <header className="widget-header">
        <CitySelector
          selectedCity={state.city}
          onCityChange={handleCityChange}
        />
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </header>
      <nav className="tab-nav">
        {["current", "forecast", "stats"].map((t) => (
          <button
            key={t}
            className={tab === t ? "active" : ""}
            onClick={() => setTab(t as any)}
          >
            {t[0].toUpperCase() + t.slice(1)}
          </button>
        ))}
      </nav>
      {loading && <p>Loading weather data...</p>}
      {!loading && state.data && (
        <>
          {tab === "current" && (
            <WeatherDisplay
              unit={settings.unit}
              data={{
                city: state.city,
                description: state.data.current.description,
                icon: state.data.current.icon,
                temperature: state.data.current.temp,
                feelsLike: state.data.current.feels_like,
                humidity: state.data.current.humidity,
                wind: state.data.current.wind,
              }}
            />
          )}

          {tab === "forecast" && settings.showForecast && (
            <ForecastList forecast={state.data.forecast} unit={settings.unit} />
          )}

          {tab === "stats" && settings.showChart && (
            <DataVisualization data={state.data.stats} unit={settings.unit} />
          )}

          <SettingsPanel settings={settings} onChange={handleSettingsChange} />
        </>
      )}
    </div>
  );
};
