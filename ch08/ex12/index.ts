// JavaScript で同様の書き方ができるよう、 Function コンストラクタを用いて以下のコードが動作するような 
// 関数 f を作成しなさい。
// 
// console.log(arr.reduce(f("$1 + $2"), 0));
// console.log(arr.sort(f("$1 - $2")));
// 
// f は引数に関数の本体を文字列として受け取る
// 関数の本体で使用する引数は $1, $2, ...のように記載し、 $10 までサポートする

export function f(body: string): Function {
    // 引数を $1～$10 までサポートするために、文字列を a~j まで10個用意
    const args = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

    // $の後に数字（1~10）が続いている場合、a～jに置換
    // nが数字
    const replacedBody = body.replace(/\$(\d+)/g, (_, n) => {   // "$" + 数字1桁以上 のみ
        const index = Number(n) - 1; // 数値部分を -1（0始まりのため）
        // indexが0～9出なかったら、エラーを投げる
        if (index < 0 || index >= 10) {
            throw new Error(`$1 ～ $10 を使用してください`);
        }
        return args[index];
    });

    // 関数本体が複数行の場合、｛｝を外して中身を取り出す
    const trimmed = replacedBody.trim();
    const isBlockBody = trimmed.startsWith('{') && trimmed.endsWith('}');

    // 関数本体の文字列が1行の場合は return を付けて必ず返り値を返す
    const functionBody = isBlockBody ? trimmed.slice(1, -1) : `return ${trimmed};`;

    // Functionコンストラクタで関数を生成
    return new Function(...args, functionBody);
}
