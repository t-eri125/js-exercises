import { any, catching } from "./index.ts";

describe("any関数のテスト", () => {
    it("全ての関数がfalseならfalseを返す", () => {
        const isPositive = (n: number) => n > 0;
        const isNegative = (n: number) => n < 0;
        const isNonZero = any(isPositive, isNegative);

        expect(isNonZero(0)).toBe(false);
    });

    it("どれかの関数がtrueならtrueを返す", () => {
        const isPositive = (n: number) => n > 0;
        const isNegative = (n: number) => n < 0;
        const isNonZero = any(isPositive, isNegative);

        expect(isNonZero(10)).toBe(true);
        expect(isNonZero(-5)).toBe(true);
    });
});

describe("catching関数のテスト", () => {
    it("正常な入力はそのまま返す", () => {
        const safeJsonParse = catching(JSON.parse, (e: Error) => ({ error: e.toString() }));
        expect(safeJsonParse('{"a":1}')).toEqual({ a: 1 });
    });

    it("エラーが起きたらエラー内容を返す", () => {
        const safeJsonParse = catching(JSON.parse, (e: Error) => ({ error: e.toString() }));
        expect(safeJsonParse("bad json")).toHaveProperty("error");
    });
});
