import { weatherReducer, initialState } from "../weatherReducer";

describe("weatherReducer", () => {
  const baseState: typeof initialState = {
    city: "London",
    unit: "metric",
    data: null,
    error: null,
  };

  it("should handle FETCH_WEATHER", () => {
    const result = weatherReducer(baseState, {
      type: "FETCH_WEATHER",
      payload: { temp: 25 },
    });
    expect(result.data).toEqual({ temp: 25 });
    expect(result.error).toBeNull();
  });

  it("should handle CHANGE_CITY", () => {
    const result = weatherReducer(baseState, {
      type: "CHANGE_CITY",
      payload: "Tokyo",
    });
    expect(result.city).toBe("Tokyo");
  });

  it("should toggle unit between metric and imperial", () => {
    const result1 = weatherReducer(baseState, { type: "TOGGLE_UNIT" });
    expect(result1.unit).toBe("imperial");

    const result2 = weatherReducer(result1, { type: "TOGGLE_UNIT" });
    expect(result2.unit).toBe("metric");
  });

  it("should handle SET_ERROR", () => {
    const result = weatherReducer(baseState, {
      type: "SET_ERROR",
      payload: "Something went wrong",
    });
    expect(result.error).toBe("Something went wrong");
  });

  it("should handle CLEAR_ERROR", () => {
    const errorState = { ...baseState, error: "Oops" };
    const result = weatherReducer(errorState, { type: "CLEAR_ERROR" });
    expect(result.error).toBeNull();
  });
});
