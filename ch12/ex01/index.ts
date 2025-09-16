function counterIter(max: number) {
    console.log("counterIter");
    let c = 1;
    return {
        [Symbol.iterator]() {
            console.log("counterIter: Symbol.iterator");
            return this;
        },
        next() {
            console.log("counterIter: next");
            if (c >= max + 1) {
                return { value: undefined, done: true };
            }
            const value = c;
            c++;
            return { value, done: false };
        },
        return(value: number) {
            console.log("counterIter: return:", value);
            return { value, done: true };
        },
        throw(e: Error) {   // 通常エラーインスタンス
            console.log("counterIter: throw:", e);
            throw e;
        },
    };
}

function* counterGen(max: number) {
    console.log("counterGen");
    try {
        for (let c = 1; c <= max; c++) {
            console.log("counterGen: next");
            yield c;
        }
    } catch (e) {
        console.log("counterGen: catch:", e);
        throw e;
    } finally {
        console.log("counterGen: finally");
    }
}

/**
 * イテレータ
 */
// const iter: any = counterIter(2);

// // 明示的にイテレータプロトコルの next() を呼び出す
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());

// // 明示的にイテレータプロトコルの return() を呼び出す
// iter.return(99);

// // 明示的にイテレータプロトコルの throw() を呼び出す
// try {
//     iter.throw(new Error("明示的エラー"));
// } catch (e) {
// }

// // for-of ループを実行
// for (const x of iter) {
//     console.log(x);
// }

// // for-of ループを実行途中で break
// for (const x of iter) {
//     console.log(x);
//     if (1 <= x) {
//         break;
//     }
// }

// // for-of ループを実行中に例外発生
// try {
//     for (const x of iter) {
//         console.log(x);
//         if (1 <= x) {
//             throw new Error("イテレータエラー");
//         }
//     }
// } catch (e) {
//     console.log("エラーをキャッチした", e);
// }


/**
 * ジェネレータ
 */

// const gen: any = counterGen(2);

// // 明示的にイテレータプロトコルの next() を呼び出す
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());

// // 明示的にイテレータプロトコルの return() を呼び出す
// // gen.next();　　// これを付ければ出力される
// console.log(gen.return(99));

// // 明示的にイテレータプロトコルの throw() を呼び出す
// try {
//     gen.next();
//     gen.throw(new Error("明示的エラー"));
// } catch (e) {
// }

// // for-of ループを実行
// for (const x of gen) {
//     console.log(x);
// }

// // for-of ループを実行途中で break
// for (const x of gen) {
//     console.log(x);
//     if (1 <= x) {
//         break;
//     }
// }

// // for-of ループを実行中に例外発生
// try {
//     for (const x of gen) {
//         if (1 <= x) {
//             console.log(x);
//             throw new Error("イテレータエラー");
//         }
//     }
// } catch (e) {
//     console.log("エラーをキャッチした", e);
// }
