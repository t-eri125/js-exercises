// MDN には「ES6 互換のコードを書く場合は、残余引数が推奨されます」とある。
// しかし、現実には arguments を使ったコードは世の中に存在する (例)。
// そのような関数を書き直す練習として、以下の関数 call を arguments を使わないように書き直しなさい。
// 
/*
const args = [];
function call() {
  args.push(Array.from(arguments));
}

call(1, 2, 3);
call("A", "B");

console.log(args[0]); // [1, 2, 3]
console.log(args[1]); // ["A", "B"]
*/

const args: (string | number)[][] = [];

function call(...values: (string | number)[]) {
    // 引数を配列としてそのまま追加
    args.push(values);
}

call(1, 2, 3);
call("A", "B");

console.log(args[0]); // [1, 2, 3]
console.log(args[1]); // ["A", "B"]
