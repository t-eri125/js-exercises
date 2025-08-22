## 問11.6
メールアドレスの正規表現として一般的には何を使うのが良いと考えられるか調べて記述しなさい。

### 回答
WHATWGの正規表現を使用する

https://zenn.dev/igz0/articles/email-validation-regex-best-practices

```
/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
```
