import { makeProxyAndLogs } from './index.ts'; // 作成した関数をインポート

describe('makeProxyAndLogs', () => {
    let obj: any;
    let proxy: any;
    let logs: Array<{ name: string; args: any[]; timestamp: string }>;

    beforeEach(() => {
        obj = {
            p: 10,
            f: function (x: number, y: number) { return x + y; },
            h: function () { return this.p; } // this を使う関数
        };
        [proxy, logs] = makeProxyAndLogs(obj);
    });

    test('メソッド呼び出しでログが追加される', () => {
        const result = proxy.f(1, 2);
        expect(result).toBe(3);
        expect(logs.length).toBe(1);
        expect(logs[0].name).toBe('f');
        expect(logs[0].args).toEqual([1, 2]);
        expect(typeof logs[0].timestamp).toBe('string');
    });

    test('通常プロパティの取得ではログに追加されない', () => {
        expect(proxy.p).toBe(10);
        expect(logs.length).toBe(0);
    });

    test('this を使うメソッドでも正しく動作する', () => {
        expect(proxy.h()).toBe(10);
        expect(logs.length).toBe(1);
        expect(logs[0].name).toBe('h');
    });

    test('Proxy と logs が返却される', () => {
        expect(proxy).toBeDefined();
        expect(Array.isArray(logs)).toBe(true);
    });

    test('タイムスタンプが JST 形式である', () => {
        proxy.f(5, 5);
        const ts = logs[0].timestamp;
        expect(ts).toMatch(/^\d{4}\/\d{1,2}\/\d{1,2} \d{1,2}:\d{2}:\d{2}$/);

        // 実際に Date としてパースできるか
        const parsed = new Date(ts);
        expect(isNaN(parsed.getTime())).toBe(false);
    });

    test('複数メソッドを呼び出してもログが順番通り記録される', () => {
        proxy.f(1, 2);
        proxy.h();

        expect(logs.length).toBe(2);
        expect(logs[0].name).toBe('f');
        expect(logs[0].args).toEqual([1, 2]);

        expect(logs[1].name).toBe('h');
        expect(logs[1].args).toEqual([]);
    });
});
