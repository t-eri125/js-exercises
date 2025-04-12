// TypeScript の場合は以下:
import { Point } from "./index.ts";

describe("add", () => {
  let p = new Point(5, 5); // 自分の座標
  let addP = new Point(1, 2); // インスタンスの座標
  const answer = addP.add(p); // 自分の座標＋インスタンスの座標

  it("returns 6 when adding own X (5) and instance's X (1)", () => {
    expect(answer.x).toBe(6); // 自分のX座標＋インスタンスのX座標
  });

  it("returns 7 when adding own X (5) and instance's X (2)", () => {
    expect(answer.y).toBe(7); // 自分のy座標＋インスタンスのy座標
  });
});
