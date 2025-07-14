// 可変長引数を受け取り、以下の仕様でオブジェクトを返却する関数 sequenceToObject(...values)を作成しなさい。
// 
// １．奇数番に string の値を受け取り偶数番に任意の値を受け取り、
// 　　各偶数奇数のペアで {奇数番の値: 偶数番の値}の形式になるオブジェクトを返却する。
// 　　例えばsequenceToObject("a", 1, "b", 2)は{a: 1, b: 2}を返却する
// ２．いずれかの奇数番の値が string でない場合、または値の個数の合計が偶数ではない場合は例外を発生させる
// 
// また作成した sequenceToObject に対してスプレッド演算子で配列を与えられることを確認しなさい。

export function sequenceToObject(...values: any[]): object {
    // 値の個数が偶数でない場合、エラーを投げる
    if (values.length % 2 !== 0) {
        throw new Error("値の個数が偶数ではありません");
    }

    // 結果を格納するオブジェクト（文字列キー、任意の値）
    const resultObj: { [key: string]: any } = {};

    // 奇数番と偶数番（文字列キー、任意の値）に分けて処理するループ
    for (let i = 0; i < values.length; i += 2) {
        const key: string = values[i];
        const value: unknown = values[i + 1];

        // 奇数番の値が文字列でなければ例外を投げる
        if (typeof key !== "string") {
            throw new TypeError("奇数番の値（キー）が文字列ではありません");
        }

        resultObj[key] = value; // キーと値のペアをオブジェクトにセット
    }

    return resultObj;
}
