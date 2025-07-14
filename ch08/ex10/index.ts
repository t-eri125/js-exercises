/*
    関数を引数に受け取り、 call 相当の動きをするプロパティ myCall を追加する関数 addMyCall(f)を実装しなさい。
    実装には bind を使い call や apply は使わないこと
*/

// thisArg：呼び出すときに this として使うオブジェクト
// ...args：新しい関数に渡したい引数の集合
// 新しい関数は呼び出されると、this が固定された状態で元の関数を実行し、引数もそのまま受け取る。
export function addMyCall(f: Function): void {
    (f as any).myCall = function (thisArg: any, ...args: any[]) {
        return f.bind(thisArg)(...args);    // f の this　に thisArg を固定した新しい関数を返す
    };
}

/*

// 例
const sqaure = (n: number) => n * n;

addMyCall(sqaure);

console.log((sqaure as any).myCall(null, 5)); // 25

function Product(this: any, name: any, price: any) {
    this.name = name;
    this.price = price;
}

addMyCall(Product);

const that = {};
(Product as any).myCall(that, "Apple", 100);
console.log(that); // { name: 'Apple', price: 100 }

*/
