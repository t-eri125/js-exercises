#

### 実行結果

#### npx webpack --mode=none ./ch10/ex01/index.cjs -o ./ch10/ex01/dist
モジュールをID（0, 1, 2）で管理して__webpack_require__関数で呼び出しており、記述量は大体同じ。
（exportの内容がそのまま関数でラップされている点は同じだが、教科書はモジュールをオブジェクトのキー（文字列）で管理してrequire()関数で呼び出している）

```powershell
asset main.js 10.2 KiB [emitted] (name: main)
./ch10/ex01/index.cjs 363 bytes [built] [code generated]
./ch10/ex01/stats.cjs 279 bytes [built] [code generated]
./ch10/ex01/sets.cjs 8.13 KiB [built] [code generated]
webpack 5.101.0 compiled successfully in 126 ms
```

#### npx webpack --mode=development ./ch10/ex01/index.cjs -o ./ch10/ex01/dist
教科書と比べると、モジュールは外部ファイルのままであり、モジュールのパスをキーにして呼び出しているため、変更があったモジュールだけ再読み込みできる。
（呼び出したモジュールはキャッシュに保存されるため、再呼び出しが効率的に行える。）

```powershell
asset main.js 12 KiB [emitted] (name: main)
./ch10/ex01/index.cjs 363 bytes [built] [code generated]
./ch10/ex01/stats.cjs 279 bytes [built] [code generated]
./ch10/ex01/sets.cjs 8.13 KiB [built] [code generated]
webpack 5.101.0 compiled successfully in 122 ms
```

#### npx webpack --mode=production ./ch10/ex01/index.cjs -o ./ch10/ex01/dist
モジュールをID（724, 800）で管理してe関数で呼び出しており、変数名や構造、改行がなくなり、圧縮・難読化されている。

```powershell
asset main.js 1.85 KiB [emitted] [minimized] (name: main)
./ch10/ex01/index.cjs 363 bytes [built] [code generated]
./ch10/ex01/stats.cjs 279 bytes [built] [code generated]
./ch10/ex01/sets.cjs 8.13 KiB [built] [code generated]
webpack 5.101.0 compiled successfully in 374 ms
```

メモ
- [なぜwebpack（モジュールバンドラ）を利用するのか](https://qiita.com/soarflat/items/28bf799f7e0335b68186#:~:text=%E3%81%97%E3%81%A6%E3%81%84%E3%81%8F%E3%80%82-,%E3%81%AA%E3%81%9Cwebpack%EF%BC%88%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB%E3%83%90%E3%83%B3%E3%83%89%E3%83%A9%EF%BC%89%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B,-%E6%A9%9F%E8%83%BD%E3%81%94%E3%81%A8%E3%81%AB)
- [webpackでコードの圧縮とソースマップを有効にする](https://ics.media/entry/12140/#webpack-js:~:text=%E3%82%8F%E3%81%A3%E3%81%A6%E3%81%84%E3%81%BE%E3%81%99%E3%80%82-,webpack%E3%81%A7%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E5%9C%A7%E7%B8%AE%E3%81%A8%E3%82%BD%E3%83%BC%E3%82%B9%E3%83%9E%E3%83%83%E3%83%97%E3%82%92%E6%9C%89%E5%8A%B9%E3%81%AB%E3%81%99%E3%82%8B,-JavaScript%E3%81%AE%E9%96%8B%E7%99%BA)

**modeの使い分け**
```
development：ソースマップを有効にできる。開発時に適している。
production：JavaSciptのコードを圧縮できる。ウェブサイト公開時に適している。
```
