export class returnHiraganaOrUtf16 {
    char: string; // ひらがな1文字
    code: number; // UTF-16コード単位

    constructor(char: string) {
        // ひらがな1文字を受け取り、そのUTF-16コード単位（数値）を取得して保持
        this.char = char;
        this.code = char.charCodeAt(0);
    }

    // Symbol.toPrimitive: デフォルトのオブジェクトから基本型値への変換の振る舞いをオーバライド
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive
    [Symbol.toPrimitive](hint: "string" | "number") {
        if (hint === "string") {
            // 文字列として使われる場合、ひらがなを返す
            return this.char;
        }
        if (hint === "number") {
            // 数値として使われる場合、UTF-16コードを返す
            return this.code;
        }
        // どちらでもない場合、ひらがなを返す
        return this.char;
    }
}
