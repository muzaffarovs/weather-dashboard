import { render, screen, fireEvent } from "@testing-library/react";
import { CitySelector } from "../CitySelector";
import { act } from "react";

jest.useFakeTimers();

test("filters cities based on input", async () => {
  render(
    <CitySelector
      cities={["Tashkent", "Samarkand", "Bukhara"]}
      selectedCity=""
      onCityChange={() => {}}
    />
  );

  const input = screen.getByPlaceholderText(/search/i);
  fireEvent.change(input, { target: { value: "Sam" } });

  await act(() => {
    jest.advanceTimersByTime(300);
    return Promise.resolve();
  });

  expect(screen.getByText("Samarkand")).toBeInTheDocument();
});
