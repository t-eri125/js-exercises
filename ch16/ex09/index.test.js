// Express フレームワークを利用して P.672 のサンプルコードと同等の HTTP サーバーを実装しなさい。
// https://www.npmjs.com/package/supertest#:~:text=any%20of%20the-,.expect()%20calls,-%3A

const request = require('supertest');
const path = require("path"); // ファイルシステムのパス操作用。
const fs = require("fs"); // ファイル読み込み用。

const serveIndex = require("./index");
const serve = require("./sample");

let index;
let sample;

// サーバを2つ止める（止め忘れ防止）
function close2(server1, server2, callback) {
    server1.close(() => server2.close(callback));
}

describe("index.js と sample.js は GET / POST が同じ結果になる", () => {
    beforeEach(() => {
        const tmpPath = path.join(process.cwd(), "ch16", "ex09", "test");
        // ★portは 0（空きポート）で起動
        index = serveIndex(tmpPath, 0);
        sample = serve(tmpPath, 0);
    });

    afterEach((done) => {
        close2(index, sample, done);
    });

    test("GET /hello.txt", (done) => {
        request(index)
            .get("/hello.txt")
            .expect('Content-Type', /text\/plain/)
            .expect(200)
            .end((err1, res1) => {
                if (err1) {
                    return done(err1);
                }

                request(sample)
                    .get("/hello.txt")
                    .expect('Content-Type', /text\/plain/)
                    .expect(200)
                    .end((err2, res2) => {
                        if (err2) {
                            return done(err2);
                        }

                        // ★読み込んだファイル内容が同じか
                        expect(res2.text).toBe(res1.text);

                        // ★サーバを止める（Jest を終了させるため）
                        done();
                    });
            });
    });

    test("POST /test/mirror", (done) => {
        request(index)
            .post("/test/mirror?x=1")   // URLにクエリを入れられる
            .set("Host", "test")     // サーバのホストは勝手に異なってしまうため、固定にする
            .set("header", "123")   // 任意のヘッダーを追加できる
            .send("リクエスト本文")
            .expect(200)
            .end((err1, res1) => {
                if (err1) {
                    return done(err1);
                }

                request(sample)
                    .post("/test/mirror?x=1")
                    .set("Host", "test") // ★追加：Hostを固定
                    .set("header", "123")
                    .send("リクエスト本文")
                    .expect(200)
                    .end((err2, res2) => {
                        if (err2) {
                            return done(err2);
                        }

                        expect(res2.text).toBe(res1.text);
                        done();
                    });
            });

    });
});
