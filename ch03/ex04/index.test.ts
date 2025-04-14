describe("checkLength", () => {
    it("💯（Hundred Points Symbol）のlengthを確認すること", async () => {
        return console.log("💯".length);    // => 2
    });
    it("\\uD83D\\uDCAF と 💯 が同値であること", async () => {
        const actual = ("\uD83D\uDCAF" === "💯");
        expect(actual).toBe(true);
    });
    it("\\u{0001F4AF} と 💯 が同値であること", async () => {
        const actual = ("\u{0001F4AF}" === "💯");
        expect(actual).toBe(true);
    });
});