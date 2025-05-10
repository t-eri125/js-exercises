// TypeScript の場合は以下:
import { sub } from "./index.ts";

describe("ビット演算のみで減算した結果", () => {
  it("正-正=正　sub(5, 3) -> 2", () => {
    expect(sub(5, 3)).toBe(2);
  });

  it("正-負=正　sub(5, -3) -> 8", () => {
    expect(sub(5, -3)).toBe(8);
  });

  it("負-正=負　sub(-15, 10) -> -25", () => {
    expect(sub(-15, 10)).toBe(-25);
  });

  it("負-負=正　sub(-15, -20) -> 5", () => {
    expect(sub(-15, -20)).toBe(5);
  });

  it("負-負=負　sub(-15, -10) -> -5", () => {
    expect(sub(-15, -10)).toBe(-5);
  });
});
