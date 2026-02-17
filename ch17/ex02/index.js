const API = "https://api.github.com";

// APIリクエストの共通ヘッダを返す関数
function getHeaders(token) {
    return {
        "Accept": "application/vnd.github+json",
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
        "User-Agent": "pollyjs-test"
    };
}

// Issue を作成する関数
async function createIssue(owner, repo, title, token) {
    const res = await fetch(
        `${API}/repos/${owner}/${repo}/issues`,
        {
            method: "POST",
            headers: getHeaders(token),
            body: JSON.stringify({ title })
        }
    );
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`APIエラー: ${res.status}, ${res.statusText}, ${body}`);
    };
    return res.json();
}

// 指定した Issue をクローズする関数
async function closeIssue(owner, repo, number, token) {
    const res = await fetch(
        `${API}/repos/${owner}/${repo}/issues/${number}`,
        {
            method: "PATCH",
            headers: getHeaders(token),
            body: JSON.stringify({ state: "closed" })
        }
    );
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`APIエラー: ${res.status}, ${res.statusText}, ${body}`);
    };
    return res.json();
}


// オープンな Issue の Id と Title の一覧を表示する関数
async function listIssues(owner, repo, token) {
    const res = await fetch(
        `${API}/repos/${owner}/${repo}/issues?state=open`,
        { headers: getHeaders(token) }
    );
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`APIエラー: ${res.status}, ${res.statusText}, ${body}`);
    };
    return res.json();
}

module.exports = {
    createIssue,
    listIssues,
    closeIssue
};

