import { TypeMap } from './index.ts';

class Foo { }
class Bar { }

describe('TypeMap', () => {
    let typeMap: TypeMap;

    beforeEach(() => {
        typeMap = new TypeMap();
    });

    test('クラス型の値をセットして取得できる', () => {
        const foo = new Foo();
        const bar = new Bar();
        typeMap.set(Foo, foo);
        typeMap.set(Bar, bar);

        expect(typeMap.get(Foo)).toBe(foo);
        expect(typeMap.get(Bar)).toBe(bar);
    });

    test('プリミティブ型の値をセットして取得できる', () => {
        typeMap.set(String, 'hello');
        typeMap.set(Number, 10);
        typeMap.set(Boolean, true);
        typeMap.set(BigInt, 20n);
        typeMap.set(Symbol, Symbol('symbol'));

        expect(typeMap.get(String)).toBe('hello');
        expect(typeMap.get(Number)).toBe(10);
        expect(typeMap.get(Boolean)).toBe(true);
        expect(typeMap.get(BigInt)).toBe(20n);
        expect(typeof typeMap.get(Symbol)).toBe('symbol');
    });

    test('不正なクラス値をセットするとエラー', () => {
        expect(() => typeMap.set(Foo, new Bar())).toThrow('value が Foo のインスタンスではありません');
    });

    test('不正なプリミティブ値をセットするとエラー', () => {
        expect(() => typeMap.set(String, 123)).toThrow('value が string ではありません');
        expect(() => typeMap.set(Number, 'string')).toThrow('value が number ではありません');
    });

    test('set の連続呼び出しが可能', () => {
        const foo = new Foo();
        typeMap
            .set(String, 'chain')
            .set(Number, 100)
            .set(Foo, foo);

        expect(typeMap.get(String)).toBe('chain');
        expect(typeMap.get(Number)).toBe(100);
        expect(typeMap.get(Foo)).toBe(foo);
    });

    test('存在しないキーの get は undefined を返す', () => {
        expect(typeMap.get(Date)).toBeUndefined();
    });
});
