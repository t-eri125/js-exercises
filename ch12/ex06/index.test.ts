import { walk } from './index.ts';
import * as fs from "fs";

const ROOT_PATH = "./ch12/ex06/test/";

describe("walk (テストディレクトリ)", () => {
    let items: { path: string; isDirectory: boolean }[];

    // 各テストの前にジェネレータを展開
    beforeAll(() => {
        items = [...walk(ROOT_PATH)];
    });

    test("返されるパスのディレクトリ/ファイルがすべて存在する", () => {
        for (const item of items) {
            console.log(item);
            expect(fs.existsSync(item.path)).toBe(true);
        }
    });

    test("isDirectory が正しい", () => {
        for (const item of items) {
            const stats = fs.statSync(item.path);
            expect(item.isDirectory).toBe(stats.isDirectory());
            expect(!item.isDirectory).toBe(!stats.isDirectory());
        }
    });

    test("存在しないパスで例外が発生する", () => {
        expect(() => [...walk("./error/")]).toThrow();
        expect(() => [...walk("./error.txt")]).toThrow();
    });
});