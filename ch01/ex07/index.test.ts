// TypeScript の場合は以下:
import { Point } from "./index.ts";

describe("add", () => {
  let p = new Point(5, 5); // 自分の座標
  let addP = new Point(1, 2); // インスタンスの座標
  const answer = addP.add(p); // 自分の座標＋インスタンスの座標

  it("自分のX座標 (5) にインスタンスのX座標 (1) を足したら x座標は (6) になること", () => {
    expect(answer.x).toBe(6); // 自分のX座標＋インスタンスのX座標
  });

  it("自分のX座標 (5) にインスタンスのX座標 (2) を足したら x座標は (7) になること", () => {
    expect(answer.y).toBe(7); // 自分のy座標＋インスタンスのy座標
  });
});
