Powershell で `setx GITHUB_TOKEN ""トークン"` を実行

```shell
node ./ex08/index.js create t-eri125 js-exercises "test"
作成: 1 test

node ./ex08/index.js list t-eri125 js-exercises
1 test

node ./ex08/index.js close t-eri125 js-exercises 1

node ./ex08/index.js -h
node ./ex08/index.js --help
使い方:
  list owner repo
  create owner repo "title"
  close owner repo number
  -v でHTTPログ表示

node ./ex08/index.js -v list t-eri125 js-exercises
node ./ex08/index.js --verbose list t-eri125 js-exercises
REQUEST: GET https://api.github.com/repos/t-eri125/js-exercises/issues?state=open
STATUS: 200
RESPONSE: []
```
