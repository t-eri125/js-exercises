// 指定されたファイルパスを受け取り、そのファイルを改行コード \n の出現ごとに分割して返す
// ジェネレータ関数 function* readLines(filePath) を作成しなさい。
// 取得できる文字列からは改行コードが除去されていること。
// 
// ファイルの読み込みは一度にすべて読み込むのではなく、fs.openSync(), fs.readSync() を使って
// 一定バッファサイズごとに読み込むようにし、必ず fs.closeSync() でファイルをクローズすること。 
// また、利用者側のイテレータのループの途中で break したり throw された場合でも fs.closeSync() されるようにすること。
// 
// 読み込まれるファイルは UTF-8 エンコーディングされたテキストファイルであると想定して良い。

import * as fs from "fs";
import { StringDecoder } from "string_decoder";

export function* readLines(filePath: string): Generator<string> {
    const BUFFER_SIZE: number = 64;   // バッファーサイズ（読み取りサイズ）
    const buffer: any = Buffer.alloc(BUFFER_SIZE);
    let str = "";       // 一度で読み込む文字列
    let overLine = "";  // バッファを改行で分割したときの余り

    const fd = fs.openSync(filePath, "r");      // ファイルを開く
    // マルチバイト文字がバッファの途中で切れる場合、未完了のバイト列を保持して次の読み込みと結合
    const decoder = new StringDecoder("utf8");

    try {
        // bytesRead を先に読んで条件式に使う
        let bytesRead: number;

        // 最後（bytesRead === 0）になるまで繰り返したら、ループを抜ける
        // readSync(fd, 書き込むバッファ, 書き込み開始オフセット, 読み込むバイト数, 読み込み開始位置)
        while ((bytesRead = fs.readSync(fd, buffer, 0, BUFFER_SIZE, null)) > 0) {
            // バッファから文字列に変換し、前のバッファの余りにつなげる
            str = overLine + decoder.write(buffer.slice(0, bytesRead));

            let lines = str.split("\n");            // 改行で分割した配列
            overLine = lines.pop() ?? "";           // 分割した最後は、次のバッファにつなげるため取り出す

            // 各行を返す（CRLFの場合は\rが残るため、もしあれば削除）
            for (const line of lines) {
                yield line.replace(/\r$/, "");
            }
        }

        // 最後の余りを返す
        if (overLine.length > 0) {
            yield overLine.replace(/\r$/, "");
        }
    } finally {
        // break したり throw された場合でも fs.closeSync() される
        fs.closeSync(fd);
    }
}

// const r = readLines("./ch12/ex05/toshishun.txt");
// console.log(r.next().value);
// console.log(r.next().value);
// console.log(r.next().value);
// console.log(r.next().value);
