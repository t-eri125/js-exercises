// それでは以下の 2 つの関数を node:fs/promises を利用し Promise を返す関数に書き換えなさい:

import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

/**
 * 指定ディレクトリの最初のファイルのサイズを取得する
 */
export function newFetchFirstFileSize(path: string): Promise<number | null> {
    // ディレクトリ内のファイル一覧を取得
    return readdir(path).then((files) => {
        // ファイルが1つもなければ null を返す
        if (files.length === 0) {
            return null;
        };
        const fullPath = join(path, files[0]);

        // ファイル情報を取得し、その Promise が解決したらサイズを返す
        return stat(fullPath).then((stats) => stats.size);
    });
}

/**
 * 指定ディレクトリ内の全ファイルのサイズ合計を取得する
 */
export function newFetchSumOfFileSizes(path: string): Promise<number> {
    // ディレクトリ内のファイル一覧を取得
    return readdir(path).then((files) => {
        // 各ファイルのサイズを取得する Promise の配列を作成
        const statsPromises = files.map((file) =>
            stat(join(path, file)).then((stats) => stats.size)
        );

        // Promise.all で全ての statsPromises が解決するのを待つ
        return Promise.all(statsPromises).then((sizes) =>
            // 配列のサイズを合計して返す
            sizes.reduce((total, size) => total + size, 0)
        );
    });
}
