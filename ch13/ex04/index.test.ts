import { newFetchFirstFileSize, newFetchSumOfFileSizes } from "./index.ts"; // Promise チェーン版

const testDir = './ch13/testDir/test/';
const emptyDir = './ch13/testDir/empty/';
const noExistDir = './ch13/testDir/error/';

describe("newFetchFirstFileSize", () => {
    test("空ディレクトリは null を返す", () => {
        return expect(newFetchFirstFileSize(emptyDir)).resolves.toBeNull();
    });

    test("最初のファイルサイズを返す", () => {
        return newFetchFirstFileSize(testDir).then((size) => {
            expect(typeof size).toBe("number");
            expect(size).toBe(10);
        });
    });

    test("存在しないディレクトリはエラーを返す", () => {
        return expect(newFetchFirstFileSize(noExistDir)).rejects.toThrow();
    });
});

describe("newFetchSumOfFileSizes", () => {
    test("空ディレクトリは 0 を返す", () => {
        return expect(newFetchSumOfFileSizes(emptyDir)).resolves.toBe(0);
    });

    test("複数ファイルの合計サイズを返す", () => {
        return newFetchSumOfFileSizes(testDir).then((total) => {
            expect(typeof total).toBe("number");
            expect(total).toBe(40);
        });
    });

    test("存在しないディレクトリはエラーを返す", () => {
        return expect(newFetchSumOfFileSizes(noExistDir)).rejects.toThrow();
    });
});
