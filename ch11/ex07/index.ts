// 括弧の対応が正しい文字列かどうか判定する正規表現は書けるだろうか。
// 連続する 2 文字が () である箇所を除去する操作を 0 回以上繰り返して空文字列にできるとき、その文字列は括弧の対応が取れているものとする。
// 以下の文字列に対してはマッチする:

// "(()(()))"
// "(((())))"

// 以下の文字列に対してはマッチしない:

// "((())"
// "()()())"

/**
 * 一文字を一度しか通れないため、再帰的な処理ができない
 */
// const regex = /\(\)/g;

// function findParentheses(input: string): boolean {
//     const result = input.replace(regex, "");
//     return false;
// }

/**
 * 以下のようにwhileで回し直さなくてはならない
 */
const regex = /\(\)/g;

function findParentheses(input: string): boolean {
    let prev = "";
    while (prev !== input) {
        prev = input;
        input = input.replace(regex, "");
    }

    if (input === "") {
        return true;
    }
    return false;
}

// true
console.log(findParentheses("(()(()))"));
console.log(findParentheses("(((())))"));

// false
console.log(findParentheses("((())"));
console.log(findParentheses("()()())"));
