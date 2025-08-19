import * as fs from "fs";

// 独自エラークラス
class FileSizeError extends Error {
    public filePath: string;
    public size: number;
    public maxSize: number;

    constructor(filePath: string, size: number, maxSize: number) {
        super(`${size} bytes は ${maxSize} bytes を超えています(${filePath})`);
        this.name = "FileSizeError";
        this.filePath = filePath;
        this.size = size;
        this.maxSize = maxSize;
    }
}

/**
 * ファイルのパスを引数に受けとる関数で、ファイルのサイズが許容サイズをオーバーしている場合にエラー投げる
 */
function checkFileSize(filePath: string, maxSize: number): void {
    const file = fs.statSync(filePath);
    const size = file.size;

    if (size > maxSize) {
        throw new FileSizeError(filePath, size, maxSize);
    }

    console.log(`${size} bytes は規定サイズ内です。(<= ${maxSize})`);
}

// エラーを投げる
try {
    checkFileSize("./ch11/ex12/1150.png", 1024 * 64); // 100KB 上限
} catch (err) {
    if (err instanceof FileSizeError) {
        console.error(err.message);
    } else {
        console.error(err);
    }
}

// 通る
try {
    checkFileSize("./ch11/ex12/1222.png", 1024 * 64); // 100KB 上限
} catch (err) {
    if (err instanceof FileSizeError) {
        console.error(err.message);
    } else {
        console.error(err);
    }
}
