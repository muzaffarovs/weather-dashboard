import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { WeatherWidget } from "./components/WeatherWidget";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <WeatherWidget />
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
