#!/usr/bin/env node

// ===== 設定 =====
const API_BASE = "https://api.github.com";
const token = process.env.GITHUB_TOKEN;

if (!token) {
    console.log("GITHUB_TOKEN を設定してください");
    process.exit(1);
}

// ===== 引数取得 =====
const args = process.argv.slice(2);

if (args.length === 0 || args.includes("-h") || args.includes("--help")) {
    console.log("使い方:");
    console.log("  list owner repo");
    console.log('  create owner repo "title"');
    console.log("  close owner repo number");
    console.log("  -v でHTTPログ表示");
    process.exit(0);
}

const verbose = args.includes("-v") || args.includes("--verbose");

// -v を除去
const filtered = args.filter(a => a !== "-v" && a !== "--verbose");

const command = filtered[0];

// ===== 共通関数 =====
async function request(method, path, body) {
    const url = API_BASE + path;

    if (verbose) {
        console.log("REQUEST:", method, url);
        if (body) console.log("BODY:", body);
    }

    const res = await fetch(url, {
        method,
        headers: {
            "Accept": "application/vnd.github+json",
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: body ? JSON.stringify(body) : undefined
    });

    const data = await res.json();

    if (verbose) {
        console.log("STATUS:", res.status);
        console.log("RESPONSE:", data);
    }

    if (!res.ok) {
        console.log("エラー:", data.message);
        process.exit(1);
    }

    return data;
}

// ===== list =====
if (command === "list") {
    const owner = filtered[1];
    const repo = filtered[2];

    if (!owner || !repo) {
        console.log("owner と repo を指定してください");
        process.exit(1);
    }

    request("GET", `/repos/${owner}/${repo}/issues?state=open`)
        .then(issues => {
            issues.forEach(i => {
                if (!i.pull_request) {
                    console.log(i.number + " " + i.title);
                }
            });
        });
}

// ===== create =====
else if (command === "create") {
    const owner = filtered[1];
    const repo = filtered[2];
    const title = filtered[3];

    if (!owner || !repo || !title) {
        console.log('create owner repo "title"');
        process.exit(1);
    }

    request("POST", `/repos/${owner}/${repo}/issues`, {
        title: title
    }).then(issue => {
        console.log("作成:", issue.number, issue.title);
    });
}

// ===== close =====
else if (command === "close") {
    const owner = filtered[1];
    const repo = filtered[2];
    const number = filtered[3];

    if (!owner || !repo || !number) {
        console.log("close owner repo number");
        process.exit(1);
    }

    request("PATCH", `/repos/${owner}/${repo}/issues/${number}`, {
        state: "closed"
    }).then(issue => {
        console.log("クローズ:", issue.number, issue.title);
    });
}

else {
    console.log("不明なコマンドです");
}
