// JavaScript の場合は以下:
// import { abs, sum, factorial } from "./index.js";

// TypeScript の場合は以下:
import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
  // abs のテスト
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0);
    });
  });

  /* 以下に sum, factorial のテストを記載せよ */
  // sum のテスト
  describe("sum", () => {
    // 3つの正の値を与えたら、正の合計値が返ってくる
    it("returns positive sum when three positive values given", () => {
      expect(sum([30, 10, 2])).toBe(42);
    });

    // 3つの負の値を与えたら、負の合計値が返ってくる
    it("returns negative sum when three negative values given", () => {
      expect(sum([-30, -10, -2])).toBe(-42);
    });

    // 3つの正負混じった値を与えたら、正しい正負の合計値が返ってくる
    it("returns correct sum with both positive and negative values given", () => {
      expect(sum([-30, 10, 2])).toBe(-18);
    });

    // 6つの正負混じった値を与えたら、正しい正負の合計値が返ってくる
    it("returns correct sum with both positive and negative values given", () => {
      expect(sum([-30, 10, 2, -60, 20, 4])).toBe(-54);
    });
  });

  // factorial のテスト
  describe("factorial", () => {
    // 正の値の階乗だったら、正常に結果を返す
    it("returns correct result for factorial of positive value", () => {
      expect(factorial(5)).toBe(120);
    });

    // 負の値の階乗だったら、エラーを返す
    // it("throws error for factorial of negative value", () => {
    //   expect(factorial(-5)).toThrow();
    // });

    // 1の階乗だったら、結果は1
    it("returns 1 for factorial of 1", () => {
      expect(factorial(1)).toBe(1);
    });

    // 0の階乗だったら、結果は1
    it("returns 1 for factorial of 0", () => {
      expect(factorial(0)).toBe(1);
    });
  });
});
