# 8.11

### 回答

```text
ES2018 以降、この仕様では、ホストがソースコードを何らかの理由で利用できない場合、 toString() の返値として、空白やコメントを含め、宣言されたソースコードとまったく同じソースコードを返すことが要求されます。

toString() メソッドが組み込み関数オブジェクトで呼び出された場合、 Function.prototype.bind() で作成された関数、その他の JavaScript 以外の関数で呼び出された場合、 toString() は、次のようなネイティブ関数文字列を返す
```
参考：[MDN：Function.prototype.toString()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/toString)


自作関数の場合、関数のソースコード全体が文字列として返される
```js
function returnMinusNum(x: number) {
    return -x;
}
console.log(returnMinusNum.toString());
// =>
// function returnMinusNum(x        ) {
//     return -x;
// }"
```

組み込み関数（ネイティブ関数）の場合、関数本体が "[native code]" となった文字列が返される。
```js
console.log(Math.max.toString());
// => function max() { [native code] }
```
