/**
 * Jest のモック関数 を利用して GitHub の API をモックする方法
 */

// spyonを使うべき

// これからテストを行う関数をインポート
const { createIssue, closeIssue, listIssues } = require("../index.js");

// fetch をモックに置き換える
global.fetch = jest.fn();

describe("モックを用いた Issue テスト", () => {
    const owner = "test-owner";
    const repo = "test-repo";
    const token = "test-token";

    beforeEach(() => {
        fetch.mockClear();  // 呼び出し履歴リセット
    });

    test("Issue を作成できる", async () => {
        // HTTPレスポンスをモック
        fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ number: 1, title: "test01" })
        });

        // 実行
        const result = await createIssue(owner, repo, "test01", token);

        // モックレスポンスが正しく返されているか確認
        expect(result.number).toBe(1);
        expect(result.title).toBe("test01");

        // fetchが正しく呼ばれたか確認
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            `https://api.github.com/repos/${owner}/${repo}/issues`,
            expect.objectContaining({ method: "POST" })
        );
    });

    test("指定した Issue をクローズできる", async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ state: "closed" })
        });

        // 実行
        const result = await closeIssue(owner, repo, 1, token);

        // モックレスポンスが正しく返されているか確認
        expect(result.state).toBe("closed");

        // fetchが正しく呼ばれたか確認
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            `https://api.github.com/repos/${owner}/${repo}/issues/1`,
            expect.objectContaining({ method: "PATCH" })
        );
    });

    test("オープンな Issue の Id と Title の一覧を表示できる", async () => {

        fetch.mockResolvedValue({
            ok: true,
            json: async () => [{ number: 1, title: "test01" }]
        });

        // 実行
        const result = await listIssues(owner, repo, token);

        // モックレスポンスが正しく返されているか確認
        expect(result).toEqual([{ number: 1, title: "test01" }]);

        expect(fetch).toHaveBeenCalledWith(
            `https://api.github.com/repos/${owner}/${repo}/issues?state=open`,
            expect.any(Object)
        );
    });

    test("APIがエラーを返した場合に例外を投げる", async () => {

        fetch
            .mockResolvedValueOnce({
                ok: false,
                status: 500,
                statusText: "ステータステキスト",
                text: jest.fn().mockResolvedValue("エラー本文"),
            })
            .mockResolvedValueOnce({
                ok: false,
                status: 500,
                statusText: "ステータステキスト",
                text: jest.fn().mockResolvedValue("エラー本文"),
            })
            .mockResolvedValueOnce({
                ok: false,
                status: 500,
                statusText: "ステータステキスト",
                text: jest.fn().mockResolvedValue("エラー本文"),
            });

        // 実行
        // エラーが返ることの確認
        await expect(createIssue(owner, repo, "test01", token))
            .rejects
            .toThrow("APIエラー: 500, ステータステキスト, エラー本文");
        await expect(closeIssue(owner, repo, 1, token)).rejects.toThrow("APIエラー: 500, ステータステキスト, エラー本文");
        await expect(listIssues(owner, repo, token)).rejects.toThrow("APIエラー: 500, ステータステキスト, エラー本文");
    });
});
