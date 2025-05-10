## 問題 4.8

古い JavaScript のコードでは undefined と比較を行う際に:

```js
if (foo === undefined) { ... }
```
ではなく以下のように書かれたコードを見ることがある (注: void 0 は undefined を返す)。

```js
if (foo === void 0) { ... }
```

これにはどのような理由があるか、また今ではこのような書き方をしないのは何故か調べて回答しなさい。

### 回答

ECMAScript 5 までは、undifinedが予約語ではなく再定義できていたため、明示的な`void 0`が使われていた。
`javascript:void(0)`という使われ方はまだ多少ありそう。
ES5以降はundefinedが変更不可になり、読みやすさ、保守性の観点で、undefinedが使われている。

```
最近のブラウザー (JavaScript 1.8.5 / Firefox 4 以降) での undefined は、 ECMAScript 5 仕様により、設定不可、書込不可のプロパティとなります。 (そうでない場合でも、上書きは避けてください。)
```
[引用mdn](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/undefined#:~:text=%E6%9C%80%E8%BF%91%E3%81%AE%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%83%BC%20(JavaScript%201.8.5%20/%20Firefox%204%20%E4%BB%A5%E9%99%8D)%20%E3%81%A7%E3%81%AE%20undefined%20%E3%81%AF%E3%80%81%20ECMAScript%205%20%E4%BB%95%E6%A7%98%E3%81%AB%E3%82%88%E3%82%8A%E3%80%81%E8%A8%AD%E5%AE%9A%E4%B8%8D%E5%8F%AF%E3%80%81%E6%9B%B8%E8%BE%BC%E4%B8%8D%E5%8F%AF%E3%81%AE%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E3%81%A8%E3%81%AA%E3%82%8A%E3%81%BE%E3%81%99%E3%80%82%20(%E3%81%9D%E3%81%86%E3%81%A7%E3%81%AA%E3%81%84%E5%A0%B4%E5%90%88%E3%81%A7%E3%82%82%E3%80%81%E4%B8%8A%E6%9B%B8%E3%81%8D%E3%81%AF%E9%81%BF%E3%81%91%E3%81%A6%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84%E3%80%82))


[参考サイト](https://www.spread1.co.jp/wp/post-2916/#:~:text=%E3%81%93%E3%81%A8%E3%81%AB%E3%81%AA%E3%82%8A%E3%81%BE%E3%81%99%E3%80%82-,undefined%E3%81%AE%E6%AD%B4%E5%8F%B2%C2%A0,-%E3%80%8C%E7%9B%B4%E6%8E%A5%20undefined%20%E3%82%92)


