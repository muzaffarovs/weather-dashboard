import { convertTemp } from "../transformWeatherData";

describe("convertTemp", () => {
  it("converts Kelvin to Celsius when target is metric", () => {
    expect(convertTemp(300.15, "metric", "kelvin")).toBeCloseTo(27, 1);
    expect(convertTemp(273.15, "metric", "kelvin")).toBeCloseTo(0, 1);
  });

  it("converts Kelvin to Fahrenheit when target is imperial", () => {
    expect(convertTemp(300.15, "imperial", "kelvin")).toBeCloseTo(80.6, 1);
    expect(convertTemp(273.15, "imperial", "kelvin")).toBeCloseTo(32, 1);
  });

  it("returns temperature as-is when inputUnit is metric", () => {
    expect(convertTemp(25, "metric", "metric")).toBe(25);
    expect(convertTemp(77, "imperial", "imperial")).toBe(77);
  });

  it("returns temperature as-is when inputUnit is imperial", () => {
    expect(convertTemp(68, "imperial", "imperial")).toBe(68);
  });
});
