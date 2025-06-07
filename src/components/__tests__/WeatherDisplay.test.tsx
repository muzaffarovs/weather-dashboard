import { render } from "@testing-library/react";
import { WeatherDisplay, type WeatherData } from "../WeatherDisplay";

describe("WeatherDisplay", () => {
  it("renders correctly and matches snapshot", () => {
    const mockData: WeatherData = {
      city: "London",
      description: "moderate rain",
      icon: "03d",
      temperature: 21,
      feelsLike: 20,
      humidity: 60,
      wind: 5.2,
    };

    const { container } = render(<WeatherDisplay data={mockData} unit="C" />);

    expect(container).toMatchSnapshot();
  });
});
