// 問題13.4 のfetchFirstFileSize および fetchSumOfFileSizes を async/await を使って書き直しなさい。

import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";


/**
 * 指定ディレクトリの最初のファイルのサイズを取得する
 */
export async function newFetchFirstFileSize(path: string): Promise<number | null> {
    const files = (await readdir(path)).sort(); // ソートして最初を固定

    if (files.length === 0) {
        return null;
    }

    const fullPath = join(path, files[0]);
    const stats = await stat(fullPath);
    return stats.size;
}

/**
 * 指定ディレクトリ内の全ファイルのサイズ合計を取得する
 */
export async function newFetchSumOfFileSizes(path: string): Promise<number> {
    const files = await readdir(path);
    let total = 0;

    for (const file of files) {
        const stats = await stat(join(path, file));
        total += stats.size;
    }

    return total;
}
