/**
 * 高階関数（higher-order function）は、関数に対して処理を行う関数
 */

// １．残余パラメータとして任意の数の関数を受け取り、
// 　　いずれかの関数が true を返せば true を返す新たな関数を返すany 関数

// ...fns が残余パラメータ
// ((arg: any) => boolean)[]　は引数を1つ受け取り、boolean を返す関数の配列
export function any(...fns: ((arg: any) => boolean)[]) {
    return function (arg: any) {
        // 配列の中の関数で true を返すものが1つでもあれば true を返す
        return fns.some(f => f(arg));
    };
}

/*
const isNonZero = any(
    (n) => n > 0,
    (n) => n < 0
);

console.log(isNonZero(0));      // => false
console.log(isNonZero(42));     // => true
console.log(isNonZero(-0.5));   // => true
*/


// ２．引数として 2 つの関数を受け取り、1 つ目の関数で発生した例外を 
// 　　2 つ目の関数の引数として処理し結果を返す新たな関数を返すcatching 関数
export function catching(f1: Function, f2: Function) {
    return function (...args: any[]) {
        try {
            // 1つ目の関数を呼び出す
            return f1(...args);
        } catch (e) {
            // 1つ目の関数で例外が発生したら、2つ目の関数に例外オブジェクトを渡して処理し、その結果を返す
            return f2(e);
        }
    };
}

/*
const safeJsonParse = catching(JSON.parse, (e) => {
    return { error: e.toString() };
});

console.log(safeJsonParse('{"a": 1}'));         // => {a: 1}
console.log(safeJsonParse("{Invalid Json}"));   // => {error: "SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)"}
*/
