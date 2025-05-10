// TypeScript の場合は以下:
import { getFibonacci10While, getFibonacci10DoWhile, getFibonacci10For } from "./index.ts";

// 配列の中身を比較するため、構造の同値性（toEqual）で比較
describe("フィボナッチ数列が10個返ってくる", () => {
  it("while文の場合", () => {
    const expectArr = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
    expect(getFibonacci10While()).toEqual(expectArr);
  });

  it("do/while文の場合", () => {
    const expectArr = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
    expect(getFibonacci10DoWhile()).toEqual(expectArr);
  });

  it("for文の場合", () => {
    const expectArr = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
    expect(getFibonacci10For()).toEqual(expectArr);
  });
});