import React, { useState, useEffect } from "react";
import { debounce } from "../utils/debounce";

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

const cities = ["London", "New York", "Tokyo", "Sydney", "Cairo"];

export const CitySelector: React.FC<CitySelectorProps> = ({
  selectedCity,
  onCityChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCities, setFilteredCities] = useState<string[]>(cities);

  useEffect(() => {
    const handleSearch = debounce((term: string) => {
      const filtered = cities.filter((city) =>
        city.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCities(filtered);
    }, 300);

    handleSearch(searchTerm);
  }, [searchTerm]);

  return (
    <div className="city-selector">
      <input
        type="text"
        placeholder="Search city..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <ul className="city-list">
        {filteredCities.map((city) => (
          <li
            key={city}
            className={`city-item ${city === selectedCity ? "selected" : ""}`}
            onClick={() => onCityChange(city)}
          >
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
};
