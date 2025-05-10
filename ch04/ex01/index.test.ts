// TypeScript の場合は以下:
import { add, sub, mul, div } from "./index.ts";

describe("四則演算結果", () => {
  it("(2+2i) + (5-3i) = 7-i", () => {
    const z1 = { real: 2, imaginary: 2 };
    const z2 = { real: 5, imaginary: -3 };
    const z3 = add(z1, z2);
    expect(z3.real).toBe(7);   // 実部の計算結果
    expect(z3.imaginary).toBe(-1);   // 虚部の計算結果
  });

  it("(2+2i) - (5-3i) = -3+5i", () => {
    const z1 = { real: 2, imaginary: 2 };
    const z2 = { real: 5, imaginary: -3 };
    const z3 = sub(z1, z2);
    expect(z3.real).toBe(-3);   // 実部の計算結果
    expect(z3.imaginary).toBe(5);   // 虚部の計算結果
  });

  it("(2+2i) * (5-3i) = 16+4i", () => {
    const z1 = { real: 2, imaginary: 2 };
    const z2 = { real: 5, imaginary: -3 };
    const z3 = mul(z1, z2);
    expect(z3.real).toBe(16);   // 実部の計算結果
    expect(z3.imaginary).toBe(4);   // 虚部の計算結果
  });

  it("(2+2i) / (4-4i) = 0.5i", () => {
    const z1 = { real: 2, imaginary: 2 };
    const z2 = { real: 4, imaginary: -4 };
    const z3 = div(z1, z2);
    expect(z3.real).toBe(0);   // 実部の計算結果
    expect(z3.imaginary).toBe(0.5);   // 虚部の計算結果
  });
});
