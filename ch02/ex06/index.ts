/**
 * FizzBuzz問題
 *   1から順番に数字を述べる
 *   3で割り切れるときは「Fizz」を返す
 *   5で割り切れるときは「Buzz」を返す
 *   両方で割り切れるときは「FizzBuzz」を返す
 * 
*/

// FizzBuzz関数
// 1. 3で割り切れるときは"Fizz"を付け加える
// 2. 5で割り切れるときは"Buzz"を付け加える
// 3. どちらでも割り切れないときは値を文字列で付け加える
// 4. 改行する
export function fizzbuzz() { let result: String = ''; for (let i = 1; i <= 100; i++) { if (i % 3 === 0) result += 'Fizz'; if (i % 5 === 0) result += 'Buzz'; if (i % 3 && i % 5) result += i.toString(); result += '\n'; } return result; }
// console.log(fizzbuzz()); // 確認用
