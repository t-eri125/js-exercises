// 接続だけする
import net from "net";

let success = 0;
let failed = 0;
let result = null;

for (let i = 0; i < 20000; i++) {
    const socket = net.createConnection(8000);

    socket.on("connect", () => {
        success++;
        console.log("成功！！", success);
    });

    socket.on("error", (err) => {
        failed++;
        if (result === null) {
            result = i;
            console.log("＝＝＝＝＝＝＝失敗＝＝＝＝＝＝", result);
        }
    });
}
