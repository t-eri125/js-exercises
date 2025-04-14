// TypeScript の場合は以下:
import { fib } from "./index.ts";

describe("fib", () => {
  it("fib(5) は 5 を返すこと", () => {
    expect(fib(5)).toBe(5);
  });
  it("fib(75) は 2111485077978050 を返すこと", () => {
    expect(fib(75)).toBe(2111485077978050);
  });
});
