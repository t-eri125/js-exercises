## 問2
CommonJS と ES Module 以外の JavaScript のモジュール方式名を調べて記述しなさい

### 回答
#### ① IIFE（即時実行関数式）
関数を定義して即時実行し、その中の変数を外部から隠す。グローバル汚染防止のための初歩的なモジュール化手法。

#### ② AMD(Asynchronous Module Definition)：https://github.com/amdjs/amdjs-api/blob/master/AMD.md
define() 関数で依存関係とモジュール本体を定義する、主にブラウザで非同期で読み込む仕組みやAPIを指す。RequireJSで採用されている。
```js
define(['dep1', 'dep2'], function (d1, d2) {
  return function () { /* ... */ };
});
```

#### ③ UMD (Universal Module Definition)：https://ja.wikibooks.org/wiki/JavaScript/Universal_Module_Definition
複数のモジュールシステムに対応するモジュールを定義する方法で、ライブラリ配布によく用いられる。
<br>（define 関数があれば AMD 形式で登録、module.exports があれば CommonJS 形式で登録、それ以外であればwindow や global に直接代入（グローバル変数））

#### ④ ES6 Module Syntax (ES Modules / ESM)
import / export 構文でモジュールを記述する方法。静的解析が可能で、ブラウザと Node.js 双方で公式に対応している。

<br>参考
- https://qiita.com/riku_takeuchi/items/4fd0bca8a99ac14aed45#%E5%B9%B4%E8%A1%A8
- https://scrapbox.io/tasuwo/JavaScript_%E3%81%AE_Module_System_%E3%81%AE%E6%AD%B4%E5%8F%B2
