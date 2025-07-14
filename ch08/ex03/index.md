# 8.3
## 1. プログラミング言語や処理系によっては、再帰呼び出しを関数の処理の末尾にする(末尾再帰)ことで、スタックオーバーフローが起こらないよう最適化できるものがある。末尾再帰は何故そのような最適化ができるのか答えなさい。
普通の再帰関数は、処理を繰り返すために、自分を呼び出すたびに「戻る場所や変数の状態を保存するための情報（戻りアドレス）」をスタックに積む必要がある。
しかし末尾呼出しのコードは、戻り先が必要ないため、保存しないジャンプに変換する（呼び出し元のスタックフレームを破棄し、新しい呼び出し先のスタックフレームに置き換える）ことでスタックの累積を無くし、効率の向上などを図っているため。

参考：[末尾呼出し最適化（Wiki）](https://ja.wikipedia.org/wiki/%E6%9C%AB%E5%B0%BE%E5%86%8D%E5%B8%B0#%E6%9C%AB%E5%B0%BE%E5%91%BC%E5%87%BA%E3%81%97%E6%9C%80%E9%81%A9%E5%8C%96:~:text=%E7%8F%BE%E3%82%8C%E3%81%A6%E3%81%84%E3%82%8B%E3%80%82-,%E6%9C%AB%E5%B0%BE%E5%91%BC%E5%87%BA%E3%81%97%E6%9C%80%E9%81%A9%E5%8C%96,-%5B%E7%B7%A8%E9%9B%86%5D)

## 2. JavaScript で末尾再帰最適化を実装している処理系を答えなさい。利用できる環境があれば、実際に以下の URL を表示・実行してエラーが発生しないことを確認しなさい。
https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABMAhtOAnGKA2AKMALkTBAFsAjAUwwEpEBvAWAChFlxp4kYoa8ADhjgATENGKlKNADSIIccHwyTy1Oo1bt2MYIjwKlNRAD4S9Zm23sMVKCAxIho8VADcW7QF9PNuw55lQWExaEQAKnlFMGU5QxjjAGpEAEZaDysfK1t7R0RefhS5NIys1gUwAGc4HCoAOhw4AHM8VHQsXDwUgAZe3tp01iA

```
〇safari（ES6）　iPhoneで実行
　[LOG]: Infinity

✕Chrome、Edge、Firefox（V8、SpiderMonkey、Chakraなど）
　[ERR]: "Executed JavaScript Failed:"
　[ERR]: Maximum call stack size exceeded 
```
