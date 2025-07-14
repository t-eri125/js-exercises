import { instanceOf } from './index.ts'; // 適宜パス調整

class A { }
class B extends A { }
class C extends B { }
class D { }

describe('instanceOf関数のテスト', () => {
    test('多段継承したクラスのインスタンスとクラスのコンストラクタの場合', () => {
        const c = new C();
        expect(instanceOf(c, C)).toBe(c instanceof C);    // C クラスのインスタンスか
        expect(instanceOf(c, B)).toBe(c instanceof B);    // B クラスのインスタンスか
        expect(instanceOf(c, A)).toBe(c instanceof A);    // A クラスのインスタンスか
        expect(instanceOf(c, Object)).toBe(c instanceof Object);    // すべての基底である Object クラス
    });

    test('継承関係にないインスタンスとクラスのコンストラクタの場合', () => {
        const d = new D();
        expect(instanceOf(d, A)).toBe(d instanceof A);          // 継承関係なし
        expect(instanceOf(d, Array)).toBe(d instanceof Array);  // 継承関係なし
        expect(instanceOf(d, Object)).toBe(d instanceof Object);    // すべての基底である Object クラス
    });

    test('プリミティブ値とクラスのコンストラクタの場合', () => {
        // null、undefined、プリミティブ値（数値、文字列、真偽値など）はfalse
        expect(instanceOf(null, Object)).toBe(false);
        expect(instanceOf(undefined, Object)).toBe(false);
        expect(instanceOf(123, Number)).toBe(false);
        expect(instanceOf('hello', String)).toBe(false);
        expect(instanceOf(true, Boolean)).toBe(false);
    });

    test('関数とFunctionコンストラクタの場合', () => {
        function f() { }
        expect(instanceOf(f, Function)).toBe(f instanceof Function);   // Function クラス
        expect(instanceOf(f, Object)).toBe(f instanceof Object);   // すべての基底である Object クラス
    });

    test('組み込みオブジェクト（Array、Date）の場合', () => {
        const arr: any[] = [];
        expect(instanceOf(arr, Array)).toBe(arr instanceof Array);
        expect(instanceOf(arr, Object)).toBe(arr instanceof Object);

        const date = new Date();
        expect(instanceOf(date, Date)).toBe(date instanceof Date);
        expect(instanceOf(date, Object)).toBe(date instanceof Object);
    });
});
