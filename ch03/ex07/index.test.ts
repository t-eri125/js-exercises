import { equalArrays } from "./index.ts";

test("ch03-ex07", () => {
  const x = { x: 1 }; // ここを変更
  const y = { x: 2 }; // ここを変更

  expect(equalArrays(x, y)).toBe(true); // オブジェクトのインデックスは参照できないので無視される
  expect(x).not.toEqual(y);
});
