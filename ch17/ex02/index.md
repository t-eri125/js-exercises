## モック

\package.json に `"test": "jest"` を追加

```shell
cd ch17
npm run test
```
```
PASS  ex02/test/mock.test

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        2.102 s
```
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 | 
 index.js |     100 |      100 |     100 |     100 | 


## Polly

今回はfetchのみを使うので、以下を実行・
Polly は
・API通信を記録する
・その記録をどこかに保存する
・次回はそれを読み込んで再生する
という仕組み

```shell
npm install -D @pollyjs/core @pollyjs/adapter-fetch @pollyjs/persister-fs
```

```
PASS  ex02/test/polly.test.js

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        1.681 s, estimated 3 s
```
                                               
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                                    
----------|---------|----------|---------|---------|-------------------
All files |   100 |       100 |     100 |   100 | 
 index.js |   100 |       100 |     100 |   100 | 

