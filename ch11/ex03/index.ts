// 引数として与えられる 符号なし 32 ビット整数の配列(Uint32Array) を受け取り、変換して符号なし 32 ビット整数の配列(Uint32Array) を返す次の二つの関数を実装しなさい。

// リトルエンディアンのバイト列として引数のデータを読み込み、ビッグエンディアンのバイト列に変換して返す関数
export function littleToBig(array: Uint32Array): Uint32Array {
    // DataViewを作成する
    let littleEndianView = new DataView(array.buffer,
        array.byteOffset,
        array.byteLength);

    // 結果を格納するバッファ
    const buffer = new ArrayBuffer(array.byteLength);
    const resultView = new DataView(buffer);

    // 4バイト（32ビット）ずつリトルエンディアンとして読み込み、ビッグエンディアンで書き込む
    for (let i = 0; i < array.length; i++) {
        const littleEndian = littleEndianView.getUint32(i * 4, true);   // リトルエンディアンで、符号なし
        resultView.setUint32(i * 4, littleEndian, false);               // ビッグエンディアン形式で結果に書きこむ。
    }

    return new Uint32Array(buffer);     // 結果を格納しているバッファを返す
}

// ビッグエンディアンのバイト列として引数のデータを読み込み、リトルエンディアンのバイト列に変換して返す関数
export function bigToLittle(array: Uint32Array): Uint32Array {
    // DataViewを作成する
    let bigEndianView = new DataView(array.buffer,
        array.byteOffset,
        array.byteLength);

    // 結果を格納するバッファ
    const buffer = new ArrayBuffer(array.byteLength);
    const resultView = new DataView(buffer);

    // 4バイト（32ビット）ずつビッグエンディアンとして読み込み、リトルエンディアンで書き込む
    for (let i = 0; i < array.length; i++) {
        const bigEndian = bigEndianView.getUint32(i * 4, false);    // ビッグエンディアンで、符号なし
        resultView.setUint32(i * 4, bigEndian, true);               // リトルエンディアン形式で結果に書きこむ。
    }

    return new Uint32Array(buffer);     // 結果を格納しているバッファを返す
}
