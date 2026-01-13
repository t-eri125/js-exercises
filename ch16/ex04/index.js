/**
 * iconv ストリーミングAPI
 * https://www.npmjs.com/package/iconv-lite?activeTab=readme#:~:text=us%2Dascii%22%20)-,%E3%82%B9%E3%83%88%E3%83%AA%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%B0API,-//%20%E3%82%B9%E3%83%88%E3%83%AA%E3%83%BC%E3%83%A0%E3%82%92%E3%83%87%E3%82%B3%E3%83%BC%E3%83%89
 */

import fs from "fs";
import iconv from "iconv-lite";

const FILE_DIR = `${process.cwd()}/ex04/hello.txt`;   // ~~~/ch16 で実行する場合

function convertShiftJISToUTF8(fileDir) {
    const converterStream = iconv.decodeStream("Shift_JIS");
    fs.createReadStream(fileDir).pipe(converterStream); // Shift_JISを変換ストリームに流す

    // Shift_JIS → UTF-8 に変換された文字列を受け取り、チャンクごとに処理
    converterStream.on("data", (str) => {
        console.log(str);
    });
}

convertShiftJISToUTF8(FILE_DIR);
