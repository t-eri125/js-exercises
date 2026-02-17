1. `npm install -save-dev flow-bin`
2. package.jsonのscriptに `"flow": "flow" `を追加
3. `npm run flow --init` で.flowconfig設定ファイルを作成

たぶんファイルを読み込めていないが、どうやっても動かなくて断念
```
npx flow check　もしくは　npm run flow check ./flow       
Skipping C:\Users\~~~~\ch17\ex09\flow (No such file or directory)
Found 0 errors
```

```shell
npx tsx ts/caller.ts  
[
  {
    title: 'テキストを読む',
    completed: true,
    user: { id: 1, name: 'Alice' },
    priority: 'high'
  },
  {
    title: '質問表を書く',
    completed: true,
    user: { id: 1, name: 'Alice' },
    priority: 'middle'
  },
  {
    title: '質問表を確認する',
    completed: true,
    user: { id: 2, name: 'Bob' },
    priority: 'low'
  },
  {
    title: '問題を作成する',
    completed: false,
    user: { id: 2, name: 'Bob' },
    priority: 'middle'
  }
]
[
  {
    title: '問題を作成する',
    completed: false,
    user: { id: 2, name: 'Bob' },
    priority: 'middle'
  }
]
```
