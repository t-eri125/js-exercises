import { primes } from './index.ts';

describe('primes()', () => {
    test('最初の10個の素数', () => {
        const gen = primes();
        let result: number[] = [];
        for (let i = 0; i < 10; i++) {
            result.push(gen.next().value);
        }
        expect(result).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
    });

    test('先の値でも取得可能.1000番目の素数は7919', () => {
        const gen = primes();
        let result: number[] = [];
        for (let i = 0; i < 1000; i++) {
            result.push(gen.next().value);
        }
        expect(result[999]).toEqual(7919);
    });
});