import { debounce } from "../debounce";

jest.useFakeTimers();

describe("debounce", () => {
  it("delays function execution", () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 300);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    expect(fn).not.toBeCalled();

    jest.advanceTimersByTime(300);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("calls with latest arguments", () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 300);

    debouncedFn("first");
    debouncedFn("second");
    debouncedFn("final");

    jest.advanceTimersByTime(300);

    expect(fn).toHaveBeenCalledWith("final");
  });
});
