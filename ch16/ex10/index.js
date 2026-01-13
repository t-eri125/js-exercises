/**
 * node server.cjs したあと、別のターミナルで
 * node ./index.js 
 */

import fs from "fs";
import path from "path";

const PATH = path.join(process.cwd(), "tmp");

// NOTE: file.txt の内容をアップロード（この URL の内容を、送ったデータで置き換える）
fetch(`http://localhost:3000/hello.txt`, {
    method: "PUT",
    body: fs.createReadStream(path.join(PATH, "file.txt")),
    duplex: "half",
});
