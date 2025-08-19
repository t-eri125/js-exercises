## 問11.11
performance.now を使ってプログラムの処理時間を測定してみよう。
ch11/ex11/index.js は "Hello".length にどれだけの時間がかかるか測定しようと実装したコードである。
コードを実行すると以下の事実に気付くだろう:

costOfLength が負の値を返すことがある ("Hello".length を実行すると時が巻き戻るのだろうか?)
costOfLength の引数の値を大きくすれば大きくする程結果が小さくなる ("Hello".length を実行すればする程速くなるのだろうか?)

どうやら何かがおかしい。どうしてこのような結果になるか調べて説明しなさい。

### 回答
```powershell
0.000012269999999995207
0.000008699999999993223
0.000011299999999994271
0.000009519999999997708

3.9671000000000164e-8
5.2212000000000104e-8
3.8951999999999885e-8
-5.4406999999999926e-8
```

①最適化（Loop-Invariant Code Motion）
V8 などの最新ブラウザの JIT コンパイラは、ループ内で毎回同じ値を計算する式をループ外に移動させる。
今回の場合、"Hello".length の処理はループ外に出され、実際にはほとんど何もせず定数にアクセスしているような状態になる。
`参考: 「As you can see string length access was hoisted out of the loop entirely and is now sitting right above the loop entry block B2」`

②What did we actually measure?
そのため costOfLoop と CostOfLengthPlusLoop の差分には、ループごとに必ず発生する spill store や stack check のコストが大きく影響する。
`参考：　Essentially those spill stores and stack-check (that involves memory load) is what consumes most cycles when you time both loops. Even if str.length was still inside the loop its cost would be quite negligible compared to the cost of the loop itself.`

以上①、②より、costOfLength が負の値を返すことがあるのは、差分が測定誤差レベルだからである。
そして、costOfLength の引数の値を大きくすれば大きくする程結果が小さくなるのは、差分はほぼゼロで誤差レベルだが割る母数が増えるためである。

メモ
```
"Hello".length のような単純な操作のコストを測定するマイクロベンチマークは、JIT 最適化の影響を強く受けてしまうため、注意が必要
```
