import { counter } from './index.ts';

describe('カウンタのようなジェネレータ', () => {

    test('next()でイテレート', () => {
        const c = counter();
        expect(c.next()).toEqual({ value: 1, done: false });
        expect(c.next()).toEqual({ value: 2, done: false });
        expect(c.next()).toEqual({ value: 3, done: false });
    });

    test('throw()で値を0にリセット', () => {
        const c = counter();
        c.next(); // 1
        c.next(); // 2

        // throw()で値がリセットされる
        expect(c.throw("リセット")).toEqual({ value: 0, done: false });
    });

    test('for-ofで反復可能', () => {
        const c = counter();
        let result;
        for (const x of c) {
            result = x;
            if (3 <= x) {
                break;
            }
        }
        expect(result).toEqual(3);
    });

    test('throw()後、next()でまた1からイテレートできる', () => {
        const c = counter();
        // カウントを5まで増やす
        for (let i = 0; i < 5; i++) {
            c.next();
        };
        expect(c.next()).toEqual({ value: 6, done: false });
        c.throw("リセット");
        expect(c.next()).toEqual({ value: 1, done: false });
        expect(c.next()).toEqual({ value: 2, done: false });
    });

    test('複数回throw()してもリセットされる', () => {
        const c = counter();
        expect(c.next()).toEqual({ value: 1, done: false });
        expect(c.next()).toEqual({ value: 2, done: false });
        expect(c.throw("リセット")).toEqual({ value: 0, done: false });
        expect(c.next()).toEqual({ value: 1, done: false });
        expect(c.next()).toEqual({ value: 2, done: false });
        expect(c.throw("リセット")).toEqual({ value: 0, done: false });
        expect(c.next()).toEqual({ value: 1, done: false });
    });

});