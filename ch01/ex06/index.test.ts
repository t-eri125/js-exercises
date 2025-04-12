// TypeScript の場合は以下:
import { fib } from "./index.ts";

describe("fib", () => {
  it("returns 5 when the 5th Fibonacci number is requested", () => {
    expect(fib(5)).toBe(5);
  });
  it("returns 2111485077978050 when the 75th Fibonacci number is requested", () => {
    expect(fib(75)).toBe(2111485077978050);
  });
});
