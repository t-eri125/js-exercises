// TypeScript の場合は以下:
import { bitCount } from "./index.ts";

describe(" 1 であるビットの数を返す関数の結果", () => {
  it("bitCount(0b111) は 3 を返す", () => {
    expect(bitCount(0b111)).toBe(3);
  });

  it("bitCount(0b1111111111111111111111111111111) は 31 を返す", () => {
    expect(bitCount(0b1111111111111111111111111111111)).toBe(31);
  });

  it("bitCount(10101010) は 8 を返す", () => {
    expect(bitCount(10101010)).toBe(8);
  });
});
