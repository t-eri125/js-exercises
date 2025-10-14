export function templateLiteral(strings: TemplateStringsArray, ...values: any[]): string {
    // 補間値はその型名を展開
    const types = values.map(v => typeof v);

    // 文字列と型名を組み合わせて1つの文字列にする
    let result = strings[0];
    for (let i = 0; i < types.length; i++) {
        result += types[i] + strings[i + 1];
    }

    return result;
}

// 動作確認
// console.log(templateLiteral``);                      // ""
// console.log(templateLiteral`test`);                  // "test"
// console.log(templateLiteral`Hello, ${"A"}`);        // "Hello, string"
// console.log(templateLiteral`${1} ${null} ${() => { }}`); // "number object function"
// console.log(templateLiteral`type of 'A' is ${"A"}`);   // "type of 'A' is string"
