// P.372 で例示されている、throw()を使ってリセットを行うカウンタのようなジェネレータを実装しなさい。
// (記載箇所↓)
// 例えば、増加しつづける整数を生成する、カウンタのようなジェネレータを思い浮かべてください。
// このようなカウンタであれば、throw()を使って例外を送ることで、カウンタをゼロに初期化するように記述してもよいでしょう。

export function* counter() {
    let count = 0;
    for (; ;) {
        try {
            yield ++count;
        } catch (e) {
            yield count = 0;
        }
    }
}

// 動作確認
// const c = counter();
// console.log(c.next());
// console.log(c.next());
// console.log(c.next());
