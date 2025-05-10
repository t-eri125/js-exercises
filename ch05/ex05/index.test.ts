// TypeScript の場合は以下:
import { f } from "./index.ts";

// objectの中身を比較するため、構造の同値性（toEqual）で比較
describe("偶数の値を持つプロパティだけを残した新しいオブジェクトを返す", () => {
  it("値が偶数のプロパティだけが残っていることを確認", () => {
    const o = { x: 1, y: 2, z: 3 };
    const expectO = { y: 2 };
    expect(f(o)).toEqual(expectO);
  });

  it("元のオブジェクトの中身は変更されないことを確認", () => {
    const o = { x: 1, y: 2, z: 3 };
    const expectO = { x: 1, y: 2, z: 3 };
    f(o);
    expect(o).toEqual(expectO);
  });
});