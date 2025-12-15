document.getElementById("upload").onclick = async () => {
    const token = document.getElementById("token").value;
    const file = document.getElementById("file").files[0];
    const result = document.getElementById("result");

    if (!token || !file) {
        result.textContent = "トークンまたはファイルが未指定です";
        return;
    }

    const filename = encodeURIComponent(file.name);

    // HTTP 要求
    // https://learn.microsoft.com/ja-jp/graph/api/driveitem-put-content?view=graph-rest-1.0&tabs=http
    const url = "https://graph.microsoft.com/v1.0/me/drive/root:/" + filename + ":/content";

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + token
            },
            body: file
        });

        if (response.ok) {
            result.textContent = "アップロード成功";
        } else {
            result.textContent =
                "失敗: " + response.status + " " + response.statusText;
        }
    } catch (e) {
        result.textContent = "エラー: " + e;
    }
};
