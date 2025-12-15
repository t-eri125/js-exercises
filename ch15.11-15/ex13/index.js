const chat = document.getElementById("chat");
const form = document.getElementById("form");

form.addEventListener("submit", async event => {
    event.preventDefault();

    // form / chat の情報取得
    const message = new FormData(form).get("message");
    form.reset();

    const userMsg = document.createElement("div");
    userMsg.className = "message user";
    userMsg.textContent = message;
    chat.appendChild(userMsg);

    const aiMsg = document.createElement("div");
    aiMsg.className = "message ai";
    chat.appendChild(aiMsg);

    try {
        const url = "http://localhost:11434/api/chat";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gemma:2b",
                messages: [{
                    role: "user",
                    content: message
                }],
                stream: true
            })
        });

        if (!response.ok) {
            aiMsg.textContent += `⚠サーバーエラー (${response.status})`;
            return;
        }

        // 確認用
        // console.log("response:", response);

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            for (const line of chunk.split("\n")) {
                if (!line) continue;
                const json = JSON.parse(line);
                if (json.message?.content) {
                    aiMsg.textContent += json.message.content;
                    chat.scrollTop = chat.scrollHeight;
                }
            }
        }
    } catch (e) {
        aiMsg.textContent = "⚠エラー：Ollama が停止しています";
        console.error("ERROR:", e);
    }
});


