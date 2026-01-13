import fs from "fs";

// ファイルを読み込み標準出力する関数
fs.truncate("expandedFile.txt", 70, (err) => {
    if (err) throw err;
    console.log("ファイル拡張：成功");
});
