import { retryWithExponentialBackoff } from './index.ts';

describe('retryWithExponentialBackoff', () => {
    it('func が 1 回目で true を返せば、1 回の実行で処理は終わり、コールバック関数が 1 回呼ばれる', (done) => {
        let callCount = 0;
        const func = () => {
            callCount++;
            return true; // 最初の呼び出しで成功
        };

        const callback = (result: boolean) => {
            expect(result).toBe(true);
            expect(callCount).toBe(1);
            done();
        };

        retryWithExponentialBackoff(func, 3, callback);
    }, 5000);

    it('func が 2 回目で true を返せば、2 回の実行で処理は終わり、コールバック関数が 1 回呼ばれる', (done) => {
        let callCount = 0;
        const func = () => {
            callCount++;
            if (callCount >= 2) {
                return true; // 最初の呼び出しで成功
            }
            return false;
        };

        const callback = (result: boolean) => {
            expect(result).toBe(true);
            expect(callCount).toBe(2);
            done();
        };

        retryWithExponentialBackoff(func, 3, callback);
    }, 5000);

    it('2 回で true でなければ失敗', (done) => {
        let callCount = 0;
        const func = () => {
            callCount++;
            if (callCount >= 3) {
                return true;
            }
            return false;
        };

        const callback = (result: boolean) => {
            expect(result).toBe(false);
            expect(callCount).toBe(2);
            done();
        };

        retryWithExponentialBackoff(func, 1, callback);
    }, 5000);

    it('非同期処理として行われている', (done) => {
        let flag = false;
        const func = () => true;

        const callback = (result: boolean) => {
            expect(flag).toBe(true);
            expect(result).toBe(true);
            done();
        };

        retryWithExponentialBackoff(func, 1, callback);
        flag = true;
        // 関数実行終了後だが、callback は非同期処理で後から呼ばれるため、flag = true の状態で処理できる
    }, 5000);

    it('3 回実行する場合、3～4 秒程度かかる', (done) => {
        const start = performance.now();

        let callCount = 0;
        const func = () => {
            callCount++;
            return callCount >= 3;
        };

        const callback = (result: boolean) => {
            const end = performance.now()
            const delay = end - start;

            // 0 + 1 + 2 = 3 秒以上経過
            expect(delay).toBeGreaterThanOrEqual(3000);
            expect(delay).toBeLessThanOrEqual(4000);
            done();
            console.log("3 回実行する場合: " + delay + "ms");
        };

        retryWithExponentialBackoff(func, 5, callback);
    }, 5000);

    it('4 回実行する場合、7～8 秒程度かかる', (done) => {
        const start = performance.now();

        let callCount = 0;
        const func = () => {
            callCount++;
            return callCount >= 4;
        };

        const callback = (result: boolean) => {
            const end = performance.now()
            const delay = end - start;

            // 0 + 1 + 2 + 4 = 7 秒以上経過
            expect(delay).toBeGreaterThanOrEqual(7000);
            expect(delay).toBeLessThanOrEqual(8000);
            done();
            console.log("4 回実行する場合: " + delay + "ms");
        };

        retryWithExponentialBackoff(func, 5, callback);
    }, 10000);
});