// これは指定されたディレクトリからファイルを提供するシンプルで静的なHTTPサーバ。
// また、受信したリクエストをエコーする特別な/test/mirrorエンドポイントも実装している。
// これは、クライアントをデバッグする際に便利。
const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");

const ROOTDIR = path.join(process.cwd(), "tmp");

// 指定されたポートで待ち受けるHTTP サーバを介して、
// 指定されたルートディレクトリのファイルを提供する。
function serve(rootDirectory, port) {
    let server = new http.Server();
    server.listen(port);
    console.log("Listening on port", port);

    // リクエストが届いたら、この関数で処理を行う。
    server.on("request", (request, response) => {
        // リクエストURL のパス部分を取得する。その際、付加されているクエリパラメータは無視する。
        let endpoint = url.parse(request.url).pathname;

        // ★追加：アップロード
        if (request.method === "PUT") {
            console.log("PUT start:", request.url);

            // エンドポイントをローカルファイルにマッピングする
            let filename = endpoint.substring(1); // 最初の / を取り除く
            filename = filename.replace(/\.\.\//g, ""); // ../ を禁止
            filename = path.resolve(rootDirectory, filename);

            console.log("before:", process.memoryUsage().rss);   // メモリ使用量の詳細を表すオブジェクトを返す。

            /*****************★★ここから★★***************** */

            let body = "";

            request.setEncoding("utf8");   // 文字列として読む（教科書範囲）
            request.on("data", chunk => {
                body += chunk;             // ★ここで全部メモリに溜める
            });

            request.on("end", () => {
                console.log("during:", process.memoryUsage().rss);

                fs.writeFile(filename, body, err => {
                    console.log("after:", process.memoryUsage().rss);

                    if (err) {
                        response.writeHead(500);
                        response.end(err.message);
                        return;
                    }

                    response.writeHead(200, {
                        "Content-Type": "text/plain; charset=UTF-8"
                    });
                    response.end("OK");
                });
            });

            return;
            /*****************★★ここまで★★***************** */

        }
        // リクエストが「/test/mirror」の場合、リクエストをそのまま送り返す。
        else if (endpoint === "/test/mirror") {
            // レスポンスヘッダを設定する。
            response.setHeader("Content-Type", "text/plain; charset=UTF-8");
            response.writeHead(200); // 200 OK

            // レスポンスボディの最初はリクエスト。
            response.write(`${request.method} ${request.url} HTTP/${request.httpVersion
                }\r\n`);

            // リクエストヘッダを出力する。
            let headers = request.rawHeaders;
            for (let i = 0; i < headers.length; i += 2) {
                response.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
            }

            // ヘッダの末尾に空行を追加する。リクエストボディをレスポンスボディにコピーする
            response.write("\r\n");
            request.pipe(response);
        }
        // それ以外の場合は、ローカルディレクトリからファイルを提供する。
        else {
            // エンドポイントをローカルファイルシステムのファイルにマッピングする。
            let filename = endpoint.substring(1); // 最初の/を取り除く。
            // パス中の「../」を禁止する。ルートディレクトリの外側のファイルを提供する
            // ことになり、セキュリティホールになるから。
            filename = filename.replace(/\.\.\//g, "");
            // 次に、相対パスを絶対パスに変換する。
            filename = path.resolve(rootDirectory, filename);

            // 拡張子に基づいて、ファイルのコンテンツタイプを推測する。
            let type;
            switch (path.extname(filename)) {
                case ".html":
                case ".htm": type = "text/html"; break;
                case ".js": type = "text/javascript"; break;
                case ".css": type = "text/css"; break;
                case ".png": type = "image/png"; break;
                case ".txt": type = "text/plain"; break;
                default: type = "application/octet-stream"; break;
            }

            let stream = fs.createReadStream(filename);
            stream.once("readable", () => {
                // ストリームが読み込めるようになったら、Content-Type ヘッダと
                // 200 OK ステータスを設定する。そして、ファイル読み出し
                // ストリームをレスポンスにパイプする。ストリームが終了すると、
                // パイプは自動的にresponse.end() を呼び出す。
                response.setHeader("Content-Type", type);
                response.writeHead(200);
                stream.pipe(response);
            });

            stream.on("error", (err) => {
                // ストリームを開こうとしてエラーが発生した場合、
                // そのファイルはおそらく存在しないか、読めないと思われる。
                // エラーメッセージをプレーンテキストで記述して、
                // 404 Not Found レスポンスを送信する。
                response.setHeader("Content-Type", "text/plain; charset=UTF-8");
                response.writeHead(404);
                response.end(err.message);
            });
        }
    });
}

// コマンドラインから起動された場合は、serve() 関数を呼び出す。
serve(process.argv[2] || ROOTDIR, parseInt(process.argv[3]) || 3000);

