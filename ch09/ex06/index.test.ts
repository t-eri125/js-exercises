import { TypeMap } from './index.ts';

describe('TypeMap', () => {
    test('コンストラクタは正しい型のエントリを受け入れる', () => {
        const tm = new TypeMap(
            'string',
            'number',
            [['a', 1], ['b', 2]]
        );
        // setメソッドで確認
        expect(tm.set('c', 3)).toBeInstanceOf(Map);
    });

    test('コンストラクタが不正な型のエントリで例外を投げる', () => {
        // キーが間違っている場合
        expect(() => {
            new TypeMap(
                'string',
                'number',
                [[1, 100]]
            );
        }).toThrow(TypeError);
        // 値が間違っている場合
        expect(() => {
            new TypeMap(
                'string',
                'number',
                [['abc', 'ABC']]
            );
        }).toThrow(TypeError);
    });

    test('set メソッドはkey（string） が "a"、value（number） が 1 の場合、セットできる', () => {
        const tm = new TypeMap(
            'string',
            'number'
        );
        expect(() => tm.set('a', 1)).not.toThrow();
    });

    test('set メソッドはキーか値の型が間違っている場合、エラーを投げる', () => {
        const tm = new TypeMap(
            'string',
            'number'
        );
        // キーが間違っている場合
        expect(() => tm.set(1, 100)).toThrow(TypeError);
        // 値が間違っている場合
        expect(() => tm.set("abc", "ABC")).toThrow(TypeError);
    });
});
