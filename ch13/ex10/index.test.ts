import { newFetchSumOfFileSizes } from "./index.ts"; // async/await 版
import { fetchSumOfFileSizes } from '../testDir/sample.js';   // コールバック版

const testDir = './ch13/testDir/test/';
const emptyDir = './ch13/testDir/empty/';
const noExistDir = './ch13/testDir/error/';

/**
 * コールバック版を Promise でラップするヘルパー
 */
function fetchSumOfFileSizesAsync(path: string): Promise<number> {
    return new Promise((resolve, reject) => {
        fetchSumOfFileSizes(path, (err: any, total: number | PromiseLike<number>) => {
            if (err) reject(err);
            else resolve(total);
        });
    });
}

describe("fetchSumOfFileSizes", () => {
    test("空ディレクトリは 0 を返す", async () => {
        const total = await fetchSumOfFileSizesAsync(emptyDir);
        const newTotal = await newFetchSumOfFileSizes(emptyDir);
        expect(newTotal).toBe(0);
        expect(newTotal).toBe(total);
    });

    test("複数ファイルの合計サイズを返す", async () => {
        const total = await fetchSumOfFileSizesAsync(testDir);
        const newTotal = await newFetchSumOfFileSizes(testDir);
        expect(newTotal).toBe(total);
    });

    test("存在しないディレクトリはエラーを返す", async () => {
        await expect(fetchSumOfFileSizesAsync(noExistDir)).rejects.toThrow();
        await expect(newFetchSumOfFileSizes(noExistDir)).rejects.toThrow();
    });
});

