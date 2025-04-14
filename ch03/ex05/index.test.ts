import { lfToCrlf, crlfToLf } from "./index.ts";

describe("changeLfOrCrlf", () => {
    it("A\\nB\\r\\nC が A\\r\\nB\\r\\nC に変換されていること", async () => {
        const lfString = "A\nB\r\nC";
        const expectString = "A\r\nB\r\nC";
        expect(lfToCrlf(lfString)).toBe(expectString);
    });
    it("A\\nB\\r\\nC が A\\nB\\nC に変換されていること", async () => {
        const crlfString = "A\nB\r\nC";
        const expectString = "A\nB\nC";
        expect(crlfToLf(crlfString)).toBe(expectString);
    });
});