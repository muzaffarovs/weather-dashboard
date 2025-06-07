import { render, screen, fireEvent } from "@testing-library/react";
import { CitySelector } from "../CitySelector";
import { act } from "react";

jest.useFakeTimers();

test("filters cities based on input", async () => {
  render(
    <CitySelector
      cities={["London", "New York", "Tokyo", "Sydney", "Cairo"]}
      selectedCity=""
      onCityChange={() => {}}
    />
  );

  const input = screen.getByPlaceholderText(/search/i);
  fireEvent.change(input, { target: { value: "London" } });

  await act(() => {
    jest.advanceTimersByTime(300);
    return Promise.resolve();
  });

  expect(screen.getByText("London")).toBeInTheDocument();
});
