// 指定されたディクトリ内のファイル/ディレクトリを再帰的に探索するジェネレータ関数 function* walk(rootPath) を作成しなさい。
// 
// ファイルとディレクトリのみを考慮すれば良く、シンボリックリンクやブロックデバイスなどは無視して良い。
// 
// fs モジュールの同期関数 (fs.xxxSync()) を利用すること。
// 
// 取得できるデータは以下のプロパティを持つオブジェクトにすること。
// 
// path: ファイル/ディレクトリのパス文字列
// isDirectory: ディレクトリであれば true, そうでなければ false

import * as fs from "fs";
import * as path from "path";

export function* walk(rootPath: string): Generator<{ path: string, isDirectory: boolean }> {
    // statSync()：指定したパスの情報を返す
    const stats = fs.statSync(rootPath);

    try {
        if (stats.isDirectory()) {
            // パスがディレクトリの場合、ディレクトリ自身を返す
            yield { path: rootPath, isDirectory: true };

            // readdirSync：指定されたディレクトリ内のファイルおよびサブディレクトリのリストを同期的に取得
            const dirList = fs.readdirSync(rootPath);

            for (const item of dirList) {
                // dirListはディレクトリ名/ファイル名しか返さないため、ルートパスに追加
                const currentPath: string = path.join(rootPath, item);
                // 下層のディレクトリ/ファイルすべてに対して、再帰的に探索
                yield* walk(currentPath);
            }
        } else if (stats.isFile()) {
            // パスがファイルの場合、ファイルを返す
            yield { path: rootPath, isDirectory: false };
        } else {
            // 
            // ファイルとディレクトリのみを考慮すれば良く、シンボリックリンクやブロックデバイスなどは無視して良い。
            // 
        }
    } catch (e) {
        throw (e);
    }
}

// const w = walk("./ch12/ex06/test");
// console.log(w.next());
// console.log(w.next());
// console.log(w.next());
// console.log(w.next());
// console.log(w.next());
// console.log(w.next());
// console.log(w.next());
