import { addMatrix, productMatrix } from './index.ts'; // ファイル名に合わせて修正

describe('addMatrix', () => {
    test('2x3 行列の加算', () => {
        const a = [[1, 2], [3, 4], [5, 6]];
        const b = [[7, 8], [9, 0], [1, 2]];
        const expected = [[8, 10], [12, 4], [6, 8]];
        expect(addMatrix(a, b)).toEqual(expected);
    });

    test('サイズが異なる行列を加算するとエラー', () => {
        const a = [[1, 2]];
        const b = [[1, 2], [3, 4]];
        expect(() => addMatrix(a, b)).toThrow("行列のサイズが異なるため、加算できません");
    });
});

describe('productMatrix', () => {
    test('2x2 行列の乗算', () => {
        const a = [[1, 2], [3, 4],];
        const b = [[5, 6], [7, 8],];
        const expected = [[19, 22], [43, 50],];
        expect(productMatrix(a, b)).toEqual(expected);
    });

    test('2x3 と 3x2 行列の乗算', () => {
        const a = [[1, 2, 3], [4, 5, 6],];
        const b = [[7, 8], [9, 10], [11, 12],];
        const expected = [[58, 64], [139, 154],];
        expect(productMatrix(a, b)).toEqual(expected);
    });

    test('サイズ不一致で乗算エラー', () => {
        const a = [[1, 2]];
        const b = [[1, 2]];
        expect(() => productMatrix(a, b)).toThrow("1つめの列数と2つめの行数が異なるため、乗算できません");
    });
});