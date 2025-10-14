import { returnHiraganaOrUtf16 } from "./index.ts";

describe("HiraganaChar", () => {
    test("文字列が期待される場合にはひらがなを返す", () => {
        const a = new returnHiraganaOrUtf16("あ");
        // String() や テンプレートリテラル では "string" hint が渡される
        expect(String(a)).toBe("あ");
        expect(`${a}`).toBe("あ");
    });

    test("数字が期待される場合には UTF-16 コード単位を返す", () => {
        const a = new returnHiraganaOrUtf16("あ");
        // +演算子 では "number" hint が渡される
        expect(+a).toBe(12354);
    });

    test("== などではひらがなを返す", () => {
        const a = new returnHiraganaOrUtf16("あ");
        // == 比較時は "default" hint が渡される
        expect((a as any) == "あ").toBe(true);
    });

    test("50音順（UTF-16 コード単位順）で <, > による比較ができる", () => {
        const a = new returnHiraganaOrUtf16("あ");
        const i = new returnHiraganaOrUtf16("い");
        const u = new returnHiraganaOrUtf16("う");
        const e = new returnHiraganaOrUtf16("え");
        const o = new returnHiraganaOrUtf16("お");

        // UTF-16 コード順での比較を確認
        expect(a < i).toBe(true);
        expect(i < u).toBe(true);
        expect(u < e).toBe(true);
        expect(e < o).toBe(true);

        // ソート時にも < / > による比較が使われ、正しい順序になる
        const randomHiragana = [u, o, a, e, i];
        const sorted = randomHiragana.sort((x, y) => (x > y ? 1 : -1));
        expect(sorted.map((x) => String(x))).toEqual(["あ", "い", "う", "え", "お"]);
    });
});
