// 12 章の演習問題で実装した walk 関数の非同期ジェネレータ版を実装しなさい:

import * as fs from 'fs/promises';
import * as path from 'path';

export async function* walk(rootPath: string): AsyncGenerator<{ path: string, isDirectory: boolean }> {
    let stats;
    try {
        // stat: 非同期で指定したパスの情報を取得
        stats = await fs.stat(rootPath);
    } catch {
        return;
    }

    if (stats.isDirectory()) {
        // パスがディレクトリの場合、ディレクトリ自身を返す（ここは同じ）
        yield { path: rootPath, isDirectory: true };

        // readdir: 指定されたディレクトリ内のファイルおよびサブディレクトリのリストを'非同期'で取得
        let dirList: string[];
        try {
            dirList = await fs.readdir(rootPath);
        } catch {
            return;
        }


        for (const item of dirList) {
            // dirListはディレクトリ名/ファイル名しか返さないため、ルートパスに追加（ここは同じ）
            const currentPath: string = path.join(rootPath, item);
            // 下層のディレクトリ/ファイルすべてに対して、再帰的に探索（ここは同じ）
            yield* walk(currentPath);
        }
    } else if (stats.isFile()) {
        // パスがファイルの場合、ファイルを返す（ここは同じ）
        yield { path: rootPath, isDirectory: false };
    } else {
        // ファイルとディレクトリのみを考慮すれば良く、シンボリックリンクやブロックデバイスなどは無視
    }
}

// // 利用例
// (async () => {
//     // テスト用ディレクトリのファイル・フォルダを再帰的に取得し表示する
//     for await (const elem of walk("./ch13/testDir/")) {
//         console.log(elem);
//     }

//     // NOTE: walk に与えたパスが以下のようなディレクトリ・ファイルを持つ時を考える
//     // .
//     // ├── A
//     // ├── B
//     // │   └── C
//     // │       └── buz.txt
//     // └── foo.txt
//     //
//     // この気 `walk` は以下を返す (順序は任意):
//     // - { path: "A", isDirectory: true }
//     // - { path: "B", isDirectory: true }
//     // - { path: "B/C", isDirectory: true }
//     // - { path: "B/C/buz.txt", isDirectory: false }
//     // - { path: "foo.txt", isDirectory: false }
// })();
