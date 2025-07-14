import { sequenceToObject } from './index.ts'

describe("sequenceToObject 関数のテスト", () => {
    it("配列をスプレッドして渡した時に正しくオブジェクトになること", () => {
        const arr = ["a", 1, "b", 2];
        const result = sequenceToObject(...arr);
        expect(result).toEqual({ a: 1, b: 2 });
    });

    it("値の個数が奇数の時にエラーが投げられること", () => {
        expect(() => sequenceToObject("a", 1, "b")).toThrow();
    });

    it("奇数番の値が文字列でない時にエラーが投げられること", () => {
        expect(() => sequenceToObject("a", 1, 2, "b")).toThrow(TypeError);
    });
});
