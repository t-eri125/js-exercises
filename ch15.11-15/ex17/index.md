### ログイン前
![alt text]({A0BC7F92-A4B6-41FD-8B53-71765800E909}.png)
![alt text]({A4F80338-6ACD-4B14-9B34-E7B6A278FB49}.png)
（CORS とは関係ないが、GitLab に関しては Set-Cookie が設定されていた。
別タブでログイン画面を開くと Max-Age が異なっており、Cookie が発行時刻を基準とした短命なものであることが確認できた。認証フローごとに一時的な Cookie が発行されている。）

### メールアドレス入力時
Cookie 未使用、セッション未確立、資格情報未送信、でセキュリティリスクが低いため、指定が緩い
![alt text](image-1.png)

### ログイン時
![alt text]({2E79AF33-D794-4A9F-909F-AA6268E48777}.png)
