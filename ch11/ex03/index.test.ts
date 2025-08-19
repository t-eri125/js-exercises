import { littleToBig, bigToLittle } from './index.ts';

describe('littleToBig', () => {
    test('Uint32Arrayのリトルエンディアンをビッグエンディアンに変換できる', () => {
        const littleEndianArray = new Uint32Array([0x12345678, 0x90ABCDEF]);

        // 変換
        const result = littleToBig(littleEndianArray);
        // DataViewで確認
        const view = new DataView(result.buffer);

        expect(view.getUint32(0, false)).toBe(0x12345678);
        expect(view.getUint32(4, false)).toBe(0x90ABCDEF);
    });

    test('元の配列は変更されない', () => {
        const array = new Uint32Array([0x12345678]);
        const newArray = new Uint32Array(array);

        littleToBig(newArray);
        expect(newArray).toEqual(array);
    });
});

describe('BigToLittle', () => {
    test('Uint32Arrayのビッグエンディアンをリトルエンディアンに変換できる', () => {
        const bigEndianArray = new Uint32Array([0x12345678, 0x90ABCDEF]);

        // 変換
        const result = bigToLittle(bigEndianArray);
        // DataViewで確認
        const view = new DataView(result.buffer);

        expect(view.getUint32(0, true)).toBe(0x78563412);
        expect(view.getUint32(4, true)).toBe(0xEFCDAB90);
    });

    test('元の配列は変更されない', () => {
        const array = new Uint32Array([0x12345678]);
        const newArray = new Uint32Array(array);

        bigToLittle(newArray);
        expect(newArray).toEqual(array);
    });
});