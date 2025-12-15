### 最初のエラー

エラーは、API の URL に対して OPTIONS メソッドのリクエストを送り、レスポンスが 404 のため発生している。200 なので、サーバからはレスポンスが返ってきているが、ブラウザが破棄。

![alt text]({395C9358-EA3D-4400-BC8E-F10F87EC15DB}.png)

![alt text]({851CD896-3667-426E-AF8D-7478FB3B4A68}.png)

![alt text]({2843C2FF-EF06-478D-9FCF-7768686244B2}.png)


### contents/index.js で、fetch のオプション設定を変更し、CORS モードでのリクエスト送信と、クロスオリジンでの Cookie の送信を許可する



### server.js で以下の箇所を変更して、http://localhost:3000 からのクロスオリジンリクエストを許可する
