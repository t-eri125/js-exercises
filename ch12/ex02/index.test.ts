import { fibonacciSequence, fibonacciSequenceIter } from './index.ts';

describe('fibonacciSequenceIter', () => {
    test('next()で正しく値を返す', () => {
        const gen = fibonacciSequence();
        const iter = fibonacciSequenceIter();
        expect(iter.next()).toEqual(gen.next());
        expect(iter.next()).toEqual(gen.next());
        expect(iter.next()).toEqual(gen.next());
        expect(iter.next()).toEqual(gen.next());
        expect(iter.next()).toEqual(gen.next());
    });

    test('for-ofで反復できる', () => {
        const gen = fibonacciSequence();
        const iter = fibonacciSequenceIter();
        let numGen: number = 5;
        let numIter: number = 5;
        let genValue: number | undefined = 0;
        let iterValue: number | undefined = 0;
        for (const val of gen) {
            if (numGen-- <= 0) {
                genValue = val;
                break;
            }
        }
        for (const val of iter) {
            if (numIter-- <= 0) {
                iterValue = val;
                break;
            }
        }
        // 5番目の値が等しい
        expect(iterValue).toEqual(genValue);
    });

    test('return()、throw()を正しく呼べる', () => {
        const gen = fibonacciSequence();
        const iter = fibonacciSequenceIter();
        iter.next();
        gen.next();
        const genRet = gen.return();
        const iterRet = iter.return();

        expect(iterRet).toEqual(genRet);
        console.log("genRet: " + genRet);
        console.log("iterRet: " + iterRet);

        // throwでエラーを返す
        const err = new Error("明示的エラー");
        let genErr, iterErr;
        try {
            gen.throw(err);
        } catch (e) {
            genErr = e;
        }
        try {
            iter.throw(err);
        } catch (e) {
            iterErr = e;
        }
        // console.log(genErr);
        // console.log(iterErr);
        expect(iterErr).toEqual(genErr);
    });
});
