// Express フレームワークを利用して P.672 のサンプルコードと同等の HTTP サーバーを実装しなさい。

const express = require("express"); // ★変更：http の代わりに Express
const url = require("url"); // URL 解析用。
const path = require("path"); // ファイルシステムのパス操作用。
const fs = require("fs"); // ファイル読み込み用。

module.exports = function serveIndex(rootDirectory, port) {
    const app = express();

    // ★変更：リクエストが「/test/mirror」の場合、リクエストをそのまま送り返す。
    app.all("/test/mirror", (request, response) => {

        /**＝＝＝＝＝＝変更なし（ここから）＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ */

        // レスポンスヘッダを設定する。
        response.setHeader("Content-Type", "text/plain; charset=UTF-8");
        response.status(200); // 200 OK

        // ★変更：Expressでは url →　originalUrl がクエリ含みのURLになる。
        response.write(`${request.method} ${request.originalUrl} HTTP/${request.httpVersion}\r\n`);

        // リクエストヘッダを出力する。
        const headers = request.rawHeaders;
        for (let i = 0; i < headers.length; i += 2) {
            response.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
        }

        response.write("\r\n"); // ヘッダの末尾に空行を追加
        request.pipe(response); // リクエストボディをレスポンスボディにコピー

        /**＝＝＝＝＝＝変更なし（ここまで）＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ */
    });

    // それ以外は静的ファイル配信（p.673）
    app.use((request, response) => {
        // ★移動：パス部分を取得しクエリパラメータを無視
        const endpoint = url.parse(request.originalUrl).pathname;

        /**＝＝＝＝＝＝変更なし（ここから）＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ */

        // エンドポイントをローカルファイルシステムのファイルにマッピングする。
        let filename = endpoint.substring(1); // 最初の/を取り除く。
        // パス中の「../」を禁止する。ルートディレクトリの外側のファイルを提供することになり、セキュリティホールになるから。
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

        const stream = fs.createReadStream(filename);   // ここは const に

        // readableになったら200 + Content-Type + pipe
        stream.once("readable", () => {
            response.setHeader("Content-Type", type);
            response.status(200);
            stream.pipe(response); // 終了時に自動でres.end()されるのはp.673の説明どおり
        });

        // エラーは404 + err.message（text/plain; charset=UTF-8）
        stream.on("error", (err) => {
            response.setHeader("Content-Type", "text/plain; charset=UTF-8");
            response.status(404);
            response.end(err.message);
        });

        /**＝＝＝＝＝＝変更なし（ここまで）＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ */
    });

    // return app; // 閉じ忘れないため
    return app.listen(port); // ExpressのlistenでHTTPサーバを起動し、指定されたポートで待ち受ける。
}
