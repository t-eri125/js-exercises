import { sort } from './index.ts';

describe('sort関数（バブルソート）', () => {
    test('昇順', () => {
        const input = [5, 3, 4, 1, 2];
        const result = sort(input);
        expect(result).toEqual([1, 2, 3, 4, 5]);
        expect(input).toEqual([5, 3, 4, 1, 2]); // 元の配列はそのまま
    });

    test('降順', () => {
        const input = [1, 2, 3, 4, 5];
        const result = sort(input, (a: number, b: number) => b - a);
        expect(result).toEqual([5, 4, 3, 2, 1]);
        expect(input).toEqual([1, 2, 3, 4, 5]); // 元の配列はそのまま
    });

    test('空配列はそのまま', () => {
        const input: number[] = [];
        const result = sort(input);
        expect(result).toEqual([]);
        expect(input).toEqual([]); // 元の配列はそのまま
    });

    test('要素が1つの場合はそのまま', () => {
        const input = [42];
        const result = sort(input);
        expect(result).toEqual([42]);
        expect(input).toEqual([42]); // 元の配列はそのまま
    });

    test('重複を含む場合', () => {
        const input = [4, 2, 2, 1, 3];
        const result = sort(input);
        expect(result).toEqual([1, 2, 2, 3, 4]);
        expect(input).toEqual([4, 2, 2, 1, 3]); // 元の配列はそのまま
    });

    test('負の数や0を含む場合', () => {
        const input = [3, -1, 0, 2, -5];
        const result = sort(input);
        expect(result).toEqual([-5, -1, 0, 2, 3]);
        expect(input).toEqual([3, -1, 0, 2, -5]);
    });
});