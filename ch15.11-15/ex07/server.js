import crypto from "node:crypto";
import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import url from "node:url";

// ES Modules で __dirname を取得
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// "/path/to/file.ext" の URL に対して "./contents/path/to/file.ext" のファイルを返すハンドラ
async function serveContentsHandler(url, _req, res) {
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
  };

  try {
    const reqPath = url.pathname;
    // Linux/MacOS/Windows で共通してファイルパスを構成できる処理
    const filePath = path.join(
      __dirname,
      "contents",
      reqPath === "/" ? "index.html" : path.join(...reqPath.split("/")),
    );

    const content = await fs.readFile(filePath);

    const ext = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";

    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  } catch (error) {
    if (error.code == "ENOENT") {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Content Not Found", "utf-8");
    } else {
      res.writeHead(500);
      res.end(`Internal Error: ${error.code}`, "utf-8");
    }
  }
}

/**
 * CSP には様々なディレクティブが存在するが、その中の script-src ディレクティブによって
 * 有効な JavaScript のソースを指定することができる。 
 * 
 * https://developer.mozilla.org/ja/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src#:~:text=%E3%82%A4%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%B3%E3%81%AE%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%83%88%E3%82%84%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%AB%E3%82%92%E8%A8%B1%E5%8F%AF%E3%81%99%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AB%20%27unsafe%2Dinline%27
 * https://developer.mozilla.org/ja/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src#:~:text=%E4%BF%A1%E9%A0%BC%E3%81%95%E3%82%8C%E3%81%9F%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%81%8B%E3%82%89%E3%81%AE%E3%83%AA%E3%82%BD%E3%83%BC%E3%82%B9%E3%82%92%E8%A8%B1%E5%8F%AF%E3%83%AA%E3%82%B9%E3%83%88%E3%81%AB%E8%BF%BD%E5%8A%A0
 */

// CSP のヘッダを返すミドルウェア
function cspMiddleware(_url, req, res) {
  // TODO: CSP ヘッダを設定する
  // res.setHeader("Content-Security-Policy", "TODO");
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'unsafe-inline' http://localhost:3000/hello.js"
    // unsafe-inline：スクリプトやスタイルを許可
    // hello.js：信頼されたドメインからのリソースを許可リストに追加
  );
  return true;
}

// ルーティングを行う関数
function routes(...routeHandlers) {
  return async (req, res) => {
    console.log("request:", req.method, req.url);

    // クエリパラメータを含む URL をパース
    const url = new URL(`http://localhost${req.url}`);
    const method = req.method;
    const reqPath = url.pathname;

    for (const routeConfig of routeHandlers) {
      // [メソッド, パス, メインハンドラ, ...ミドルウェア] の形式でルートを定義
      const [routeMethod, routePath, ...handlers] = routeConfig;
      const mainHandler = handlers.shift();
      const middlewares = handlers;

      if (method !== routeMethod) continue;

      const routeParts = routePath.split("/");
      const reqParts = reqPath.split("/");

      if (routeParts.length !== reqParts.length && !routePath.includes("*"))
        continue;

      const params = {};
      let match = true;

      for (let i = 0; i < routeParts.length; i++) {
        if (routeParts[i] === "*") {
          // ワイルドカードセグメントの場合、残りのパスを全て受け入れる
          params["*"] = reqParts.slice(i).join("/");
          break;
        } else if (
          routeParts[i].startsWith("{") &&
          routeParts[i].endsWith("}")
        ) {
          // パラメータセグメントの場合、パラメータ名をキーにして値を取得
          const paramName = routeParts[i].slice(1, -1);
          params[paramName] = reqParts[i];
        } else if (routeParts[i] !== reqParts[i]) {
          // 一致しない場合はマッチ不成立で終了
          match = false;
          break;
        }
      }

      if (match) {
        // Middleware の実行
        for (const middleware of middlewares) {
          const result = await middleware(url, req, res, params);
          if (result === false) return; // Middleware がfalseを返した場合、以降の処理を中断
        }
        await mainHandler(url, req, res, params);
        return;
      }
    }

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found", "utf-8");
  };
}

async function main() {
  http
    .createServer(async function (req, res) {
      await routes(["GET", "/*", serveContentsHandler, cspMiddleware])(
        req,
        res,
      );
    })
    .listen(3000);
  console.log("Server running at http://localhost:3000/");
}

await main();
