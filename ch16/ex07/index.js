// // https://www.gesource.jp/weblog/?p=8213

// import fs from "fs";
import * as fs from "node:fs";  // テストではこちらでないと上手くいかなかった

// fs.stat() は非同期なので、Promise 化する（fs.promises.stat を使えばいいが）
function statAsync(pathStr) {
    return new Promise((resolve, reject) => {
        fs.stat(pathStr, (err, stats) => {
            if (err) reject(err);
            else resolve(stats);
        });
    });
}

// function lstatAsync(pathStr) {
//     return new Promise((resolve, reject) => {
//         fs.lstat(pathStr, (err, stats) => {
//             if (err) reject(err);
//             else resolve(stats);
//         });
//     });
// }

export async function checkEntry(pathStr) {
    let result = "";

    try {
        const stats = await statAsync(pathStr);

        if (stats.isFile()) {
            result = "file";
        } else if (stats.isDirectory()) {
            result = "directory";
        } else {
            result = "other";
        }
    } catch (error) {
        // エラーを細分化
        if (error.code === 'ENOENT') {
            result = "not found";
        } else if (error.code === 'EACCES' || error.code === 'EPERM' || error.code === 'EINVAL') {
            result = "no permission";
        } else {
            result = error.message;
        }
    }

    return result;
}

/* 確認用
const PATH = "file.txt";
const DIR = "dir";
const SYMLINK_DIR = "symlinkDir";   // コマンドプロンプトで mklink /d symlinkDir dir で作成
const NONE = "none";

console.log(await checkEntry(PATH));
console.log(await checkEntry(DIR));
console.log(await checkEntry(SYMLINK_DIR));
console.log(await checkEntry(NONE));
*/
