const seq = [1, 2, 3, 4, 5];
const seq2 = [1, 2, 3, 4];

// 先頭から最後の要素の手前までをコピーした新しい配列を返す
export function pop(array: number[]): number[] {
    return array.slice(0, -1);  // 0～length-1まで
}

// 配列をシャロ―コピーし、最後に値を追加
export function push(array: number[], item: number): number[] {
    return [...array, item];
}

// 最初を飛ばして、2番目から最後までをコピーした新しい配列を返す
export function shift(array: number[]): number[] {
    return array.slice(1);
}

// 最初に値を追加し、配列をシャロ―コピー
export function unshift(array: number[], item: number): number[] {
    return [item, ...array];
}

// 元の配列と、省略できる比較関数（昇順、降順を決める）
export function sort(array: number[], compareFn?: (a: number, b: number) => number): number[] {
    const arr = [...array]; // 元の配列をコピー
    const compare = compareFn ?? ((a, b) => (a < b ? -1 : a > b ? 1 : 0));  // デフォルトは昇順（左が小さいと-1）
    const n = arr.length;

    // バブルソート
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            if (compare(arr[j], arr[j + 1]) > 0) {  // a<bかa>bかによって並び順を変える
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }

    return arr;
}

// console.log(pop(seq)); // [1, 2, 3, 4]
// console.log(push(seq, 6)); // [1, 2, 3, 4, 5, 6]
// console.log(shift(seq)); // [2, 3, 4, 5]
// console.log(unshift(seq, 0)); // [0, 1, 2, 3, 4, 5]
// console.log(sort(seq, (a, b) => b - a)); // [5, 4, 3, 2, 1]

// // 元の配列は変更されていない
// console.log(seq); // [1, 2, 3, 4, 5]


// console.log(pop(seq2)); // [1, 2, 3]
// console.log(push(seq2, 6)); // [1, 2, 3, 4, 5]
// console.log(shift(seq2)); // [2, 3, 4]
// console.log(unshift(seq2, 0)); // [0, 1, 2, 3, 4]
// console.log(sort(seq2, (a, b) => b - a)); // [4, 3, 2, 1]

// // 元の配列は変更されていない
// console.log(seq2); // [1, 2, 3, 4]