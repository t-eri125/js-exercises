// TypeScript の場合は以下:
import { powerCalculationRecursive, powerCalculationLoop } from "./index.ts";

function test(f: (b: number, n: number) => number) {
    it('指数が0, 1の場合、計算できる', () => {
        expect(f(2, 0)).toBe(1);
        expect(f(2, 1)).toBe(2);
    });

    it('底が正、負の場合、計算できる', () => {
        expect(f(2, 2)).toBe(4);
        expect(f(-3, 2)).toBe(9);
    });

    it('指数が奇数の場合、計算できる', () => {
        expect(f(2, 5)).toBe(32);
        expect(f(3, 7)).toBe(2187);
    });

    it('指数が偶数の計算、計算できる', () => {
        expect(f(4, 6)).toBe(4096);
        expect(f(10, 2)).toBe(100);
    });

    it('指数が負の場合、エラーを投げる', () => {
        expect(() => f(2, -1)).toThrow(RangeError);
    });
}

describe('powerCalculationRecursive', () => {
    test(powerCalculationRecursive);
});

describe('powerCalculationLoop', () => {
    test(powerCalculationLoop);
});
