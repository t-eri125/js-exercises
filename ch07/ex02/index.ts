// 以下の関数を繰り返し (for, while) や条件分岐 (if) を利用せず map, filter, reduce, forEach 等のメソッドを利用して書き直しなさい。

// function fizzbuzz(n) {
//   for (let i = 1; i <= n; i++) {
//     if (i % 15 === 0) {
//       console.log("FizzBuzz");
//     } else if (i % 3 === 0) {
//       console.log("Fizz");
//     } else if (i % 5 === 0) {
//       console.log("Buzz");
//     } else {
//       console.log(i);
//     }
//   }
// }

function fizzbuzz(n: number[]) {
    const result = n
        .map(i =>
            (i % 15 === 0 && "FizzBuzz") ||
            (i % 3 === 0 && "Fizz") ||
            (i % 5 === 0 && "Buzz") ||
            i
        );
    return result;
}

console.log(fizzbuzz([1, 2, 3, 4, 5, 6, 7, 15]));

// function sumOfSquaredDifference(f, g) {
//   let result = 0;
//   for (let i = 0; i < f.length; i++) {
//     result += (f[i] - g[i]) ** 2;
//   }
//   return result;
// }

function sumOfSquaredDifference(f: number[], g: number[]): number {
    const result = f
        .map((value, i) => (value - g[i]) ** 2)             // fの要素valueを1つずつ関数に渡す
        .reduce((sum, mapValue) => sum + mapValue, 0);      // 合計を計算する
    return result;
}

console.log(sumOfSquaredDifference([1, 2, 3], [2, 3, 4])); // => 3

// function sumOfEvensIsLargerThan42(array) {
//   let sum = 0;
//   for (let i = 0; i < array.length; i++) {
//     if (array[i] % 2 !== 0) {
//       continue;
//     }
//     sum += array[i];
//   }
//   return sum >= 42;
// }

function sumOfEvensIsLargerThan42(array: number[]) {
    const result = array
        .filter(value => value % 2 === 0)       // 偶数だけに絞る
        .reduce((sum, value) => sum + value, 0);    // 合計を計算する
    // console.log(sum);
    return result >= 42;                           // 結果を返す
}

console.log(sumOfEvensIsLargerThan42([1, 2, 41])); // => false
console.log(sumOfEvensIsLargerThan42([1, 2, 40])); // => true
