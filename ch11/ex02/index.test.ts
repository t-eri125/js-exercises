import { cachedSlowFn } from './index.ts';

describe("cachedSlowFn", () => {
    test("2回目の実行でキャッシュされると処理が早くなる", () => {
        const obj = { name: "test" };

        // 1回目の呼び出し（計算あり）
        const start1 = performance.now();
        const result1 = cachedSlowFn(obj).value;
        const duration1 = performance.now() - start1;

        // 2回目の呼び出し（キャッシュ）
        const start2 = performance.now();
        const result2 = cachedSlowFn(obj).value;
        const duration2 = performance.now() - start2;

        // 3回目の呼び出し（キャッシュ）
        const start3 = performance.now();
        const result3 = cachedSlowFn(obj).value;
        const duration3 = performance.now() - start3;

        // 結果は同じ
        expect(result2).toBe(result1);
        expect(result3).toBe(result1);
        console.log("[結果] 1回目：" + result1 + ", 2回目：" + result2 + ", 3回目：" + result3);
        // => [結果] 1回目：499999999067109000, 2回目：499999999067109000, 3回目：499999999067109000

        // 1回目よりも2回目、3回目の方が早い（2回目と3回目はかなり早い）
        expect(duration2).toBeLessThan(duration1);
        expect(duration3).toBeLessThan(duration1);
        console.log("[処理時間] 1回目：" + duration1 + ", 2回目：" + duration2 + ", 3回目：" + duration3);
        // => [処理時間] 1回目：456.33770000000004, 2回目：0.0014999999998508429, 3回目：0.0003000000001520675
    });
});
