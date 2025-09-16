import { walk } from './index.ts';
import * as path from "path";
import * as fs from "fs";

const rootPath = "./ch13/testDir/";
const emptyDir = path.join(rootPath, "empty");
const noExistDir = path.join(rootPath, "error");

describe('walk (非同期ジェネレータ版)', () => {
    let items: { path: string; isDirectory: boolean }[];

    beforeAll(async () => {
        items = [];
        for await (const elem of walk(rootPath)) {
            items.push(elem);
        }
    });

    test('返されるパスのディレクトリ/ファイルがすべて存在する', () => {
        for (const item of items) {
            expect(fs.existsSync(item.path)).toBe(true);
        }
    });

    test('isDirectory が正しい', () => {
        for (const item of items) {
            const stats = fs.statSync(item.path);
            expect(item.isDirectory).toBe(stats.isDirectory());
        }
    });

    test('空ディレクトリも返される', async () => {
        let found = false;
        for await (const elem of walk(rootPath)) {
            console.log({ elem });
            if (elem.path === emptyDir && elem.isDirectory) found = true;
        }
        expect(found).toBe(true);
    });

    test('存在しないパスは空配列になる', async () => {
        const results: { path: string; isDirectory: boolean }[] = [];
        for await (const elem of walk(noExistDir)) {
            results.push(elem);
        }
        expect(results).toHaveLength(0);
    });
});