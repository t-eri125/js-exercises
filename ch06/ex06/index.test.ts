// TypeScript の場合は以下:
import { returnPropatyArr } from "./index.ts";

describe("returnPropatyArr", () => {
  test("オブジェクトのすべての独自プロパティ（列挙不可、プロパティ名が Symbol のものを含む）および列挙可能な継承プロパティのプロパティ名の配列を返す", () => {
    const ReferenceObj: object = {
      100: "one hundred",
      "string": "文字列",
      "arr": [1, 2, 3, 4, 5, 6, 7]
    };

    const symbol1 = Symbol("secret");

    const object = Object.create(ReferenceObj);
    object["visible"] = 456;
    object[symbol1] = "symbolic";   // Symbol
    // 列挙不可
    Object.defineProperty(object, "hidden", {
      value: 123,
      enumerable: false,
    });

    const result = returnPropatyArr(object);

    // すべての独自プロパティ（列挙不可、プロパティ名が Symbol のものを含む）が含まれているか
    expect(result).toEqual(
      expect.arrayContaining([
        "visible",
        "hidden", // enumerable: falseだけどownKeysに入る
        symbol1,
      ])
    );

    // 列挙可能な継承プロパティのプロパティ名が含まれているか
    expect(result).toEqual(
      expect.arrayContaining(["100", "string", "arr"])
    );
  });

  test("空オブジェクトの場合エラーにはならず空の配列が返ってくる", () => {
    const emptyObj = {};
    const result = returnPropatyArr(emptyObj);
    expect(result).toEqual([]);
  });
});