// 以下の関数の Promise 版を、Promiseコンストラクタ による変換および promisify 関数による変換、それぞれで作成しなさい:
// fs.readdir
// fs.stat

import * as fs from "node:fs";
import { promisify } from "node:util";

/**
 * Promiseコンストラクタ による変換
 * @param path 
 * @param options 
 * @returns 
 */

// fs.readdir
export function readdirPromise(
    path: string | Buffer | URL,
    options?: Object
): Promise<string[] | Buffer[] | fs.Dirent[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(path, options, (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(files);
        });
    });
}

// fs.stat
export function statPromise(path: string, options?: Object): Promise<fs.Stats> {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(stats);
        });
    });
}

/**
 * promisify 関数による変換
 */

// fs.readdir
export const readdirAsync = promisify(fs.readdir);

// fs.stat
export const statAsync = promisify(fs.stat);

