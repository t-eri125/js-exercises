// 値が必要になるまで実際の計算を行わない評価戦略を遅延評価と呼ぶ。
// ジェネレータ関数はnext()が呼ばれるまで評価が遅延される関数と考えることができる。
// 遅延評価を行うことで、例えば素数のような無限に続く値を扱うことができる。
//
// 呼び出しごとに素数を順番に返す無限ジェネレータ primes() を実装しなさい。
//
// ヒント: P363 の filter() 関数と整数列を返すジェネレータを組み合わせることで、
// 素数の倍数をふるい落とす再帰ジェネレータを作成し、内部に配列を保持することなくアルゴリズムを実現できる

// 整数列を返すジェネレータ（使うのは素数なので2から）
function* returnIntArr(i: number = 2): Generator<number> {
    while (true) {
        yield i++;
    }
}

// P363 の filter() 関数
// 指定したiterable をフィルタした反復可能なオブジェクトを返す。
// predicate がtrue を返す要素のみを反復する。

// filterが返す型とprimesが期待する型がずれるため、ジェネレータ関数に修正
function* filter(iterable: Iterable<number>, predicate: (n: number) => boolean): Generator<number> {
    for (const v of iterable) {
        if (predicate(v)) {
            yield v;
        }
    }
}

// 素数の倍数をふるい落とす再帰ジェネレータ
export function* primes(intArr: Generator<number> = returnIntArr()): Generator<number> {
    const p = intArr.next().value as number;        // 次の素数
    yield p;
    // pの倍数を振るい落とす新しいジェネレータで再帰呼び出し
    const f = filter(intArr, n => n % p !== 0);
    yield* primes(f);
}

// 確認用
const p = primes();
console.log(p.next());
console.log(p.next());
console.log(p.next());
console.log(p.next());
console.log(p.next());
