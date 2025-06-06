import { throttle } from "../throttle";

describe("throttle", () => {
  jest.useFakeTimers();

  it("should call function only once within delay window", () => {
    const fn = jest.fn();
    const throttledFn = throttle(fn, 1000);
    throttledFn();
    throttledFn();
    throttledFn();

    expect(fn).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    throttledFn();

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("should call with latest arguments at each allowed interval", () => {
    const fn = jest.fn();
    const throttledFn = throttle(fn, 500);
    throttledFn("first");
    jest.advanceTimersByTime(500);
    throttledFn("second");

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenNthCalledWith(1, "first");
    expect(fn).toHaveBeenNthCalledWith(2, "second");
  });
});
