import { retryWithExponentialBackoff } from './index.ts';

describe('retryWithExponentialBackoff', () => {

    it('func が1回目で成功する場合、1回目で解決される', async () => {
        const func = async () => '成功';
        const result = await retryWithExponentialBackoff(func, 3);
        expect(result).toBe('成功');
    });

    it('func が複数回失敗して成功する場合（2回失敗、3回目成功）', async () => {
        let count = 0;
        const func = async () => {
            count++;
            if (count <= 2) {
                throw new Error(`失敗${count}回目`);
            }
            return '成功3回目';
        };

        const result = await retryWithExponentialBackoff(func, 5);
        expect(result).toBe('成功3回目');
        expect(count).toBe(3); // 正しく3回呼ばれたか
    });

    it('func が maxRetry（2） 回失敗した場合は最終的に拒否', async () => {
        let count = 0;
        const func = async () => {
            count++;
            throw new Error(`失敗${count}回目`);
        };

        const maxRetry = 2;
        await expect(retryWithExponentialBackoff(func, maxRetry)).rejects.toThrow('失敗');
        expect(count).toBe(maxRetry + 1); // 初回 + maxRetry 回
    });

    it('maxRetry=0 の場合は即時解決または拒否', async () => {
        const funcSuccess = async () => '成功';
        const funcFail = async () => { throw new Error('失敗'); };

        await expect(retryWithExponentialBackoff(funcSuccess, 0)).resolves.toBe('成功');
        await expect(retryWithExponentialBackoff(funcFail, 0)).rejects.toThrow('失敗');
    });
});
