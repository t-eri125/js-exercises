import { pop, push, shift, unshift, sort } from './index.ts';

describe('5つの関数のテスト', () => {
    const array = [1, 2, 3, 4, 5];

    test('pop: 最後の要素を除いた新しい配列を返す', () => {
        const result = pop(array);
        expect(result).toEqual([1, 2, 3, 4]);
        expect(pop([])).toEqual([]);   // 空の場合は空
        expect(pop([10])).toEqual([]); // 元の要素が一つの場合は空
    });

    test('push: 指定した要素を末尾に追加した新しい配列を返す', () => {
        const result = push(array, 6);
        expect(result).toEqual([1, 2, 3, 4, 5, 6]);
        expect(push([], 1)).toEqual([1]);  // 空でも追加可能
    });

    test('shift: 最初の要素を除いた新しい配列を返す', () => {
        const result = shift(array);
        expect(result).toEqual([2, 3, 4, 5]);
        expect(shift([])).toEqual([]);   // 空の場合は空
        expect(shift([10])).toEqual([]); // 元の要素が一つの場合は空
    });

    test('unshift: 指定した要素を先頭に追加した新しい配列を返す', () => {
        const result = unshift(array, 0);
        expect(result).toEqual([0, 1, 2, 3, 4, 5]);
        expect(unshift([], 1)).toEqual([1]);   // 先頭が空でも追加可能
    });

    test('sort: 比較関数に従い新しいソート済み配列を返す', () => {
        const result = sort(array, (a: number, b: number) => b - a);
        expect(result).toEqual([5, 4, 3, 2, 1]);
        expect(sort([], (a: number, b: number) => a - b)).toEqual([]) // 空の場合は空
    });

    test('元配列は変更されない', () => {
        expect(array).toEqual([1, 2, 3, 4, 5]);
    });
});
