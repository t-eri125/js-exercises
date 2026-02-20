/**
 * Polly.JS を用いたテストコード
 * 実行には GITHUB_OWNER/GITHUB_REPO/GITHUB_TOKEN 環境変数の設定が必要
 */

// spyonを使うべき

const fs = require("fs");
const path = require("path");
const { Polly } = require("@pollyjs/core");
const FetchAdapter = require("@pollyjs/adapter-fetch");
const FSPersister = require("@pollyjs/persister-fs");

const { createIssue, closeIssue, listIssues } = require("../index.js");

Polly.register(FetchAdapter);
Polly.register(FSPersister);

describe("Polly.JS を用いた Issue テスト", () => {
    const recordingsDir = path.join(__dirname, "recordings");

    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const token = process.env.GITHUB_TOKEN;
    const dummyToken = "dummy-token";

    let polly;

    // Polly インスタンスを作成する
    //  adapters: fetch のみを監視
    //  persister: 記録データをファイル保存
    //  mode
    //      replay-if-missing: 記録が無ければ実通信して記録（デフォルト）
    //      replay: 記録のみ使う
    // recordIfMissing: true -> リプレイモードでも、記録が無いリクエストは実通信して記録（デフォルトは false）
    // matchRequestsBy.headers: リクエストのヘッダはマッチングに使わない（トークンが変わるため）
    function setupPolly(name, record = false) {
        if (record && (!owner || !repo || !token)) {
            throw new Error("GITHUB_OWNER/GITHUB_REPO/GITHUB_TOKEN のどれかが設定されていません");
        }

        polly = new Polly(name, {
            adapters: ["fetch"],
            persister: "fs",
            mode: "replay",
            recordIfMissing: record, // 初回だけ記録させるため
            persisterOptions: {
                fs: { recordingsDir },
            },
            matchRequestsBy: {
                headers: false
            }
        });

        // beforePersist イベントを使って、記録されるリクエストから Authorization ヘッダを削除する
        // https://marmelab.com/blog/2020/01/23/mocking-an-api-with-pollyjs.html#:~:text=hands%20under%20the-,hood%3A,-//%20in%20router.spec
        polly.server.any().on("beforePersist", (_req, recording) => {
            if (Array.isArray(recording?.request?.headers)) {
                recording.request.headers = recording.request.headers.filter(
                    (h) => String(h?.name).toLowerCase() !== "authorization" // 大文字/小文字を区別せずに Authorization ヘッダを削除
                );
            }
        });

        // リクエストとレスポンスをコンソールにログ出力（デバッグ用）
        polly.server.any().on("response", (req, res) => {
            console.log(`リクエスト：${req.method} ${req.url}　→　レスポンス：${res.statusCode}`);
        });

        return polly;
    }

    test("Create: 最初だけ通信し、その後はリプレイする", async () => {
        setupPolly("Create", true);

        const result = await createIssue(owner, repo, "test01", token);
        expect(result.title).toBe("test01");

        await polly.stop();

        setupPolly("Create", false);

        const result2 = await createIssue(owner, repo, "test01", dummyToken);
        expect(result2.title).toBe("test01");
        await polly.stop();
    });

    test("Create→Close: 初回だけ通信して記録、2回目はリプレイ", async () => {
        // 初回（記録）
        setupPolly("CreateClose", true);
        const created1 = await createIssue(owner, repo, "test02", token);
        expect(created1.title).toBe("test02");

        const closed1 = await closeIssue(owner, repo, created1.number, token);
        expect(closed1.state).toBe("closed");
        await polly.stop();

        // 2回目（リプレイ）
        setupPolly("CreateClose", false);
        const created2 = await createIssue(owner, repo, "test02", dummyToken);
        expect(created2.title).toBe("test02");

        const closed2 = await closeIssue(owner, repo, created2.number, dummyToken);
        expect(closed2.state).toBe("closed");
        await polly.stop();
    });

    test("List: 初回だけ通信して録音、2回目はリプレイ", async () => {
        setupPolly("List", true);
        const list1 = await listIssues(owner, repo, token);
        expect(list1.some(i => i.title === "test01")).toBe(true);
        await polly.stop();

        setupPolly("List", false);
        const list2 = await listIssues(owner, repo, dummyToken);
        expect(list2.some(i => i.title === "test01")).toBe(true);
        await polly.stop();
    });

    test("Error: API がエラー(500)を返したら apiError を投げる", async () => {
        // このテストは録音/リプレイではなく、Pollyで強制的に 500 を返して分岐を踏む
        polly = new Polly("ErrorBranches", {
            adapters: ["fetch"],
            persister: "fs",
            mode: "replay",            // 実通信禁止
            recordIfMissing: false,    // 録音も禁止
            persisterOptions: {
                fs: { recordingsDir },
            },
            matchRequestsBy: {
                headers: false,
            },
        });

        const { server } = polly;

        // createIssue: POST /issues -> 500
        server
            .post(`https://api.github.com/repos/${owner}/${repo}/issues`)
            .intercept((_req, res) => {
                res.status(500).send("fail");
            });

        // closeIssue: PATCH /issues/1 -> 500
        server
            .patch(`https://api.github.com/repos/${owner}/${repo}/issues/1`)
            .intercept((_req, res) => {
                res.status(500).send("fail");
            });

        // listIssues: GET /issues?state=open -> 500（クエリまで一致させる）
        server
            .get(`https://api.github.com/repos/${owner}/${repo}/issues?state=open`)
            .intercept((_req, res) => {
                res.status(500).send("fail");
            });

        await expect(createIssue(owner, repo, "x", dummyToken)).rejects.toThrow(
            "APIエラー: 500, Internal Server Error, fail"
        );
        await expect(closeIssue(owner, repo, 1, dummyToken)).rejects.toThrow(
            "APIエラー: 500, Internal Server Error, fail"
        );
        await expect(listIssues(owner, repo, dummyToken)).rejects.toThrow(
            "APIエラー: 500, Internal Server Error, fail"
        )

        await polly.stop();
        polly = null;
    });
});
