import React from "react";

interface Settings {
  unit: "C" | "F";
  refreshRate: number; // in minutes
  showForecast: boolean;
  showChart: boolean;
}

interface SettingsPanelProps {
  settings: Settings;
  onChange: (updated: Partial<Settings>) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onChange,
}) => {
  return (
    <div className="settings-panel">
      <h3>Settings</h3>

      <div className="setting-item">
        <label>Temperature Unit:</label>
        <select
          className="bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          value={settings.unit}
          onChange={(e) => onChange({ unit: e.target.value as "C" | "F" })}
        >
          <option value="C">Celsius</option>
          <option value="F">Fahrenheit</option>
        </select>
      </div>

      <div className="setting-item">
        <label>Refresh Rate (mins):</label>
        <input
          type="number"
          min={1}
          max={60}
          value={settings.refreshRate}
          onChange={(e) => onChange({ refreshRate: parseInt(e.target.value) })}
        />
      </div>

      <div className="setting-item">
        <label>
          <input
            type="checkbox"
            checked={settings.showForecast}
            onChange={(e) => onChange({ showForecast: e.target.checked })}
          />
          Show Forecast
        </label>
      </div>

      <div className="setting-item">
        <label>
          <input
            type="checkbox"
            checked={settings.showChart}
            onChange={(e) => onChange({ showChart: e.target.checked })}
          />
          Show Temperature Chart
        </label>
      </div>
    </div>
  );
};
