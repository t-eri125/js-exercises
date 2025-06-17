/**
 * reduce を使って関数 (sum, join, reverse, every, some) を実装しなさい。
 */

// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#:~:text=JavaScript%20Demo%3A%20Array.reduce()
export function sum(array: number[] = []): number {
    return array
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);  // 各要素加算、初期値0
}

export function join(array?: any[], separator?: string | null | undefined): string {
    if (array === undefined) {
        // 引数がない場合は例外を投げる
        throw new Error();
    }

    if (separator === undefined) {
        // separator がない場合は "," とする
        separator = ",";
    } else if (separator === null) {
        // separator が null の場合は文字列 "null" とする
        separator = "null";
    }

    return array.reduce((accumulator, currentValue, index) => {
        if (currentValue === null || currentValue === undefined) {
            // currentValue が null またはないときは空文字に変換
            currentValue = "";
        }
        currentValue = String(currentValue);  // ここで文字列化

        // index === 0 の時は空文字～最初の要素の文字列。その後はセパレータ付きで文字列を追加
        if (index === 0) {
            return currentValue;
        } else {
            return accumulator + separator + currentValue;
        }
    }, "");
}

export function reverse(array?: string[] | number[]): string[] | number[] {
    if (array === undefined) {
        // 引数がない場合は例外を投げる
        throw new Error();
    }

    // 今の値を先に入れ、ひとつ前までのシャロ―コピーを後ろに
    return array
        .reduce((reversedArray, currentValue) => [currentValue, ...reversedArray], [] as any[]);
}

export function every(
    array: any[],
    callback: (value: any, index: number, array: any[]) => boolean  // 3つの引数から true か false か
): boolean {
    return array.reduce((accumulator, currentValue, index, arr) => {
        return accumulator && callback(currentValue, index, arr);  // すべて true なら true
    }, true);   // 初期値は true 。
}

export function some(
    array: any[],
    callback: (value: any, index: number, array: any[]) => boolean  // 3つの引数から true か false か
): boolean {
    // 一つでも true なら
    return array.reduce((accumulator, currentValue, index, arr) => {
        return accumulator || callback(currentValue, index, arr);  // 一つでも true なら true
    }, false);  // 初期値は false 。
}