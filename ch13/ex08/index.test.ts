import { newFetchFirstFileSize, newFetchSumOfFileSizes } from "./index.ts";
import { fetchFirstFileSize, fetchSumOfFileSizes } from "../testDir/sample.js"; // コールバック版

const testDir = './ch13/testDir/test/';
const emptyDir = './ch13/testDir/empty/';
const noExistDir = './ch13/testDir/error/';

/** コールバック版を Promise でラップ */
function fetchFirstFileSizeAsync(path: string): Promise<number | null> {
    return new Promise((resolve, reject) => {
        fetchFirstFileSize(path, (err: any, size: number | PromiseLike<number | null> | null) => {
            if (err) reject(err);
            else resolve(size);
        });
    });
}

function fetchSumOfFileSizesAsync(path: string): Promise<number> {
    return new Promise((resolve, reject) => {
        fetchSumOfFileSizes(path, (err: any, total: number | PromiseLike<number>) => {
            if (err) reject(err);
            else resolve(total);
        });
    });
}

describe("fetchFirstFileSize", () => {
    test("空ディレクトリは null を返す", async () => {
        const size = await fetchFirstFileSizeAsync(emptyDir);
        const newSize = await newFetchFirstFileSize(emptyDir);
        expect(newSize).toBeNull();
        expect(newSize).toBe(size);
    });

    test("最初のファイルサイズを返す", async () => {
        const size = await fetchFirstFileSizeAsync(testDir);
        const newSize = await newFetchFirstFileSize(testDir);
        console.log({ size, newSize });
        expect(newSize).toBe(size);
    });

    test("存在しないディレクトリはエラーを返す", async () => {
        await expect(fetchFirstFileSizeAsync(noExistDir)).rejects.toThrow();
        await expect(newFetchFirstFileSize(noExistDir)).rejects.toThrow();
    });
});

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
