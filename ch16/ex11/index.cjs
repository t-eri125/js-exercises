/*
  参考：https://hikoleaf.hatenablog.jp/entry/2019/06/09/131620
  リクエストの例：https://developer.mozilla.org/ja/docs/Web/HTTP/Guides/Session#:~:text=%E3%82%92%E5%90%AB%E3%81%BF%E3%81%BE%E3%81%99%E3%80%82-,%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E3%81%AE%E4%BE%8B,-developer.mozilla.org
  HTTPレスポンスステータスコード：
  https://developer.mozilla.org/ja/docs/Web/HTTP/Reference/Status/200#200_ok_%E3%82%92_get_%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E3%81%A7%E5%8F%97%E4%BF%A1
*/

const net = require("net");

// レスポンスの共通の部分
const COMMON_RES =
  "HTTP/1.1 200 OK\r\n" +
  "Content-Type: text/html; charset=utf-8\r\n" +
  "\r\n"
  ;

// GETで表示する HTML フォーム
const HTML = `
  <!doctype html>
  <html lang="ja">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Greeting Form</title>
    </head>
    <body>
      <form action="/greeting" method="POST">
        <label for="greeting">Name:</label>
        <input type="text" id="name" name="name" />
        <input type="text" id="greeting" name="greeting" />
        <button type="submit">Submit</button>
      </form>
    </body>
  </html>
`;

// クライアントから接続があったとき、HTML を返却する
const server = net.createServer(socket => {
  socket.on("data", (data) => {
    // TCPサーバを作り、文字(data:バイト列)が送られてくるときに処理を実行

    const request = data.toString();
    const firstLine = request.split("\r\n")[0];
    const [method, path] = firstLine.split(" ");    // ★httpと違い、ヘッダ部分を解析する必要がある

    // ①　"/"が GET されたとき、以下の HTML を返却する
    if (method === "GET" && path === "/") {
      socket.write(COMMON_RES + HTML);
    }
    // ②　1.のフォームから/greetingに POST されたとき、nameとgreeting の内容をボディに含む HTML を返却する
    else if (method === "POST" && path === "/greeting") {
      const [headerPart, body] = request.split("\r\n\r\n");
      const data = {};

      // 「key1=value1&key2=value2」のようになっているのを分解する
      body.split("&").forEach(input => {
        const [key, value] = input.split("=");
        data[key] = decodeURIComponent(value);   // 教科書 p.591 「15.12.2.1 クッキーの読み出し」
      });

      const responseHtml = `
        <!doctype html>
        <html lang="ja">
          <body>
            <p>${data.greeting}, ${data.name}!</p>
          </body>
        </html>
      `;

      socket.write(COMMON_RES + responseHtml);
    }
    // ③　1.2.3.で非対応のパスとメソッドの組み合わせでアクセスされた場合、HTTP のプロトコルにしたがい 404 または 405 を返す
    // パスは知っているが、メソッドが違う場合は 405、それ以外は 404
    else if (path === "/" || path === "/greeting") {
      socket.write("HTTP/1.1 405 Method Not Allowed\r\n\r\n");
    } else {
      socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
    }

    socket.end();
  });
});

server.listen(8000, () => console.log("8000 ポートで待ち受け中"));
// Content-Length: ${Buffer.byteLength(html)}\r\n