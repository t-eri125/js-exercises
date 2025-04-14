// 2つのオブジェクト `o1` と `o2` を比較する関数 `equals`
function equals(o1: unknown, o2: unknown): boolean {
    // 1. `o1` と `o2` が厳密に等価である場合 `true` を返す。
    if (o1 === o2) return true;

    // 2. `o1` または`o2` に`null` またはオブジェクト以外が指定された場合`false` を返す(`tyepof` の返り値が`object` かどうかを確認しなさい)
    if (o1 === null || o2 === null || typeof (o1) !== "object" || typeof (o2) !== "object") return false;

    // 3. `o1` と`o2` のプロパティの数・名前が一致しない場合は`false` を返す
    // 4. `o1` と`o2` のプロパティの各値を`equals` で比較し、全て`true` ならば`true` を返し、1つでも`false` があれば`false` を返す
    if (Object.keys(o1).length !== Object.keys(o2).length) return false;
    for (const key of Object.keys(o1)) {
        if (!Object.keys(o2).includes(key)) return false;
        if (!equals((o1 as any)[key], (o2 as any)[key])) return false;
    }

    return true;
}

describe("checkEquals", () => {
    it("厳密等価なら true であること", async () => {
        expect(equals(42, 42)).toBe(true);
        expect(equals(null, null)).toBe(true);
    });
    it("厳密等価ではない場合オブジェクト以外が指定されれば false であること", async () => {
        expect(equals({ x: 42 }, 42)).toBe(false);
        expect(equals(null, { x: 42 })).toBe(false);
    });
    it("プロパティの数・名前が一致しなければ false であること", async () => {
        expect(equals({ x: 1 }, { y: 1 })).toBe(false);
        expect(equals({ x: 1 }, { x: 1, y: 1 })).toBe(false);
    });
    it("プロパティの各値を equals で再帰的に比較して、true/falseを返すこと", async () => {
        expect(equals({ x: { y: { z: 10 } } }, { x: { y: { z: 10 } } })).toBe(true);
        expect(equals({ x: { y: { z: 10 } } }, { x: { y: { z: 10, w: 1 } } })).toBe(false);
    });
});
