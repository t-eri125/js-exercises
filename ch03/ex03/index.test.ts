import { numEqual } from "./index.ts";

describe("numEqual", () => {
    it("(0.3 - 0.2) と 0.1 が等しいこと", async () => {
        const actual = numEqual((0.3 - 0.2), 0.1);
        expect(actual).toBe(true);
    });
    it("(0.2 - 0.1) と 0.1 が等しいこと", async () => {
        const actual = numEqual((0.2 - 0.1), 0.1);
        expect(actual).toBe(true);
    });
    it("1.0 と (1.0 + 1e-10) は等しくないこと（誤差の境界ちょうど）", async () => {
        const actual = numEqual(1.0, 1.0 + 1e-10);
        expect(actual).toBe(false);
    });
    it("1.0 と (1.0, 1.0 + 1e-10) は等しいこと（誤差の境界内）", async () => {
        const actual = numEqual(1.0, 1.0 + 1e-11);
        expect(actual).toBe(true);
    });
});