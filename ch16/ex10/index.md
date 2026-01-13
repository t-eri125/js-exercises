p.656より
`process.memoryUsage() // メモリ使用量の詳細を表すオブジェクトを返す。`
https://nodejs.org/api/process.html#processmemoryusage:~:text=no%20entry%20script.-,process.memoryUsage(),-%23

ストリームでは逐次処理で低メモリなのに対して、readFileは一括で読みこむため高メモリを消費する。
100MBのファイルにした場合、readFileは `RangeError: Invalid string length` エラーとなってしまったが、ストリームはきちんと処理できた

### fs.createReadStream の場合

```shell
// 約9.54MB（10,000,000 バイト）のファイルの時
before: 28442624
after: 38428672
```
```shell
// 100MBのとき
before: 28360704
after: 43483136
```

### fs.readFile の場合

```shell
// 約9.54MB（10,000,000 バイト）のファイルの時
before: 28061696
during: 46854144    // readFileで全部メモリに乗った瞬間
after: 67043328
```
