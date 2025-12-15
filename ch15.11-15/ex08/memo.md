sendRequest 関数
・Promise の生成
・timeout 設定
・リクエスト送信
・並行リクエスト管理
を関数内で実行する

WebSocket の message / close イベントは複数リクエスト共通の処理であるため、関数外に分離


