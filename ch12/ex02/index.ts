// ジェネレータ関数を使わずに、P.367 のfibonacciSequence()が返すジェネレータと同等のイテレータを返す関数を実装しなさい。

export function* fibonacciSequence() {
    let x = 0, y = 1;
    for (; ;) {
        yield y;
        [x, y] = [y, x + y]; // 分割代入を行っている。
    }
}

export function fibonacciSequenceIter() {
    let x = 0, y = 1;

    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            const value = y;      // valueを更新
            [x, y] = [y, x + y];  // 分割代入
            return { value, done: false };  // 無限ジェネレータのため、done: falseだけでいい
        },
        return() {
            return { value: undefined, done: true };
        },
        throw(e: any): IteratorResult<number> {
            throw e;
        },
    };
}





// export function fibonacciSequenceIter() {
//     let x = 0, y = 1;

//     return {
//         [Symbol.iterator]() {
//             return this;
//         },
//         next() {
//             const value = y;      // valueを更新
//             [x, y] = [y, x + y];  // 分割代入
//             return { value, done: false };
//         },
// 今回は不要
// return(value?: number) {
//     return { value: undefined, done: true };
// },
// throw(e: Error) {         // 通常はエラーインスタンス
//     console.log("throw:", e);
//     throw e;
// },
//     };
// }
