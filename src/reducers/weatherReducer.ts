export type State = {
  city: string;
  unit: "metric" | "imperial";
  data: any | null;
  error: string | null;
};

export const initialState: State = {
  city: "London",
  unit: "metric",
  data: null,
  error: null,
};

export type Action =
  | { type: "FETCH_WEATHER"; payload: any }
  | { type: "CHANGE_CITY"; payload: string }
  | { type: "TOGGLE_UNIT" }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_ERROR" };

export const weatherReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_WEATHER":
      return { ...state, data: action.payload, error: null };
    case "CHANGE_CITY":
      return { ...state, city: action.payload };
    case "TOGGLE_UNIT":
      return {
        ...state,
        unit: state.unit === "metric" ? "imperial" : "metric",
      };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};
