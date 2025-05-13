/** 
 * 文字列のパラメータを取り、制御文字など文字列リテラル作成時エスケープシーケンスで記述する必要がある
 * 文字 (p37 表 3-1 の\\より上)を、エスケープシーケンスに変換した文字列を返すメソッドを書きなさい。
 * 例えば文字列中に\が含まれていたら、\\に変換しなさい。
 * if-else で分岐するバージョンと switch で分岐するバージョンの両方を作りなさい。
 */

// 指定のエスケープシーケンスが来たら、\を\\に変換して文字列として認識する
// 新たに文字列を作成し、返す

// if-else文の例
export const escapeStringLiteralIf = (string: string) => {
  let escapedStr: string = "";
  for (let letter of string) {
    if (letter === "\0") {
      letter = "\\0";
    } else if (letter === "\b") {
      letter = "\\b";
    } else if (letter === "\t") {
      letter = "\\t";
    } else if (letter === "\n") {
      letter = "\\n";
    } else if (letter === "\v") {
      letter = "\\v";
    } else if (letter === "\f") {
      letter = "\\f";
    } else if (letter === "\r") {
      letter = "\\r";
    } else if (letter === "\"") {
      letter = "\\\"";
    } else if (letter === "\'") {
      letter = "\\'";
    }
    escapedStr += letter;
  }
  return escapedStr;
}

// switch分の例
export const escapeStringLiteralSwitch = (string: string) => {
  let escapedStr: string = "";
  for (let letter of string) {
    switch (letter) {
      case "\0":
        letter = "\\0";
        break;
      case "\b":
        letter = "\\b";
        break;
      case "\t":
        letter = "\\t";
        break;
      case "\n":
        letter = "\\n";
        break;
      case "\v":
        letter = "\\v";
        break;
      case "\f":
        letter = "\\f";
        break;
      case "\r":
        letter = "\\r";
        break;
      case "\"":
        letter = "\\\"";
        break;
      case "\'":
        letter = "\\'";
        break;
      default:
        letter;
        break;
    }
    escapedStr += letter;
  }
  return escapedStr;
}

// 各メソッドの実行
// const str: string = "\0　\b　\t　\n　\v　\f　\r　\"　\'";
// console.log(escapeStringLiteralIf(str).length);
// console.log(str.length);
