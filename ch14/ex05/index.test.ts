import { templateLiteral } from "./index.ts";

describe("templateタグ関数のテスト", () => {
    test("空文字列は空文字列", () => {
        expect(templateLiteral``).toBe("");
    });

    test("文字列のみは、そのまま返す", () => {
        expect(templateLiteral`test`).toBe("test");
    });

    test("文字列の補間値は string", () => {
        expect(templateLiteral`Hello, ${"A"}`).toBe("Hello, string");
    });

    test("複数の型を補間することができる", () => {
        expect(templateLiteral`${1} ${null} ${() => { }}`).toBe("number object function");
    });

    test("文字列中に補間することもできる", () => {
        expect(templateLiteral`type of 'A' is ${"A"}`).toBe("type of 'A' is string");
        expect(templateLiteral`type of 'A' is ${"A"}. type of 'B' is ${"B"}`).toBe("type of 'A' is string. type of 'B' is string");
    });

    test("配列やオブジェクトも型名に変換できる", () => {
        expect(templateLiteral`${[1, 2]} ${{ a: 1 }}`).toBe("object object");
    });
});
