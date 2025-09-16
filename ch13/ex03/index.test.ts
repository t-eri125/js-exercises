import * as fs from 'node:fs';
import { readdirPromise, statPromise, readdirAsync, statAsync } from './index.ts';

describe('Promise', () => {
    const testDir = './ch13/ex03/';

    describe('readdir', () => {
        test('Promiseコンストラクタ：文字列配列を返す', (done) => {
            readdirPromise(testDir)
                .then((files) => {
                    expect(Array.isArray(files)).toBe(true);    // 配列チェック
                    expect(typeof files[0]).toBe('string');     // 要素が文字列
                    done();
                })
                .catch(done);
        });

        test('promisify：文字列配列を返す', (done) => {
            readdirAsync(testDir)
                .then((files) => {
                    expect(Array.isArray(files)).toBe(true);
                    expect(typeof files[0]).toBe('string');
                    done();
                })
                .catch(done);
        });

        test('両方の関数が同じ配列を返す', (done) => {
            Promise.all([readdirPromise(testDir), readdirAsync(testDir)])
                .then(([filesPromise, filesAsync]) => {
                    expect(filesPromise).toEqual(filesAsync);
                    done();
                })
                .catch(done);
        });
    });

    describe('promisify', () => {
        // Promiseコンストラクタ版の挙動確認
        test('Promiseコンストラクタ：Statsオブジェクトを返す', (done) => {
            statPromise(testDir)
                .then((stats) => {
                    expect(stats).toBeInstanceOf(fs.Stats);             // fs.Stats のインスタンス
                    expect(typeof stats.isDirectory).toBe('function');  // isDirectory() メソッドがある
                    done();
                })
                .catch(done);
        });

        // promisify版の挙動確認
        test('promisify：Statsオブジェクトを返す', (done) => {
            statAsync(testDir)
                .then((stats) => {
                    expect(stats).toBeInstanceOf(fs.Stats);
                    expect(typeof stats.isDirectory).toBe('function');
                    done();
                })
                .catch(done);
        });

        // 両方の関数が同じ結果を返すか確認
        test('両方の関数が同じStatsを返す', (done) => {
            Promise.all([statPromise(testDir), statAsync(testDir)])
                .then(([statsPromise, statsAsync]) => {
                    // fs.Stats は別インスタンスなので、主要プロパティで比較
                    expect(statsPromise.isDirectory()).toBe(statsAsync.isDirectory());
                    expect(statsPromise.isFile()).toBe(statsAsync.isFile());
                    expect(statsPromise.size).toBe(statsAsync.size);
                    done();
                })
                .catch(done);
        });
    });
});
