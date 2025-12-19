/* カーネルの生成 */
const size = 10;     // カーネルのサイズ
const sigma = 10.0;  // 標準偏差
const kernel = [];  // カーネル：重み付けされた係数の集まり（行列） 
const origin = Math.floor(size / 2); // カーネルの中心座標
let sum = 0;

self.addEventListener("message", (event) => {
    // index.js から送られてきたデータを受け取る
    const { width, height, buffer } = event.data;

    // 元画像データ
    const data = new Uint8ClampedArray(buffer);

    // 出力用配列（元コードと同じ）
    const outputData = new Uint8ClampedArray(data.length);

    /**
     * 元のまま
     */
    /* ------------------------ここから------------------------ */
    // グレースケールへの変換 (RGB を足して平均を取っている)
    //
    // ガウシアンフィルタを実装する場合はこの周辺のコードを変更しなさい
    // imageData の中身はそのままに別の配列に結果を格納するとよい

    // カーネルを求める式の実装
    for (let x = 0; x < size; x++) {
        kernel[x] = [];
        for (let y = 0; y < size; y++) {
            const adjustedX = x - origin;
            const adjustedY = y - origin;
            const pixelValue = Math.exp(-(adjustedX ** 2 + adjustedY ** 2) / (2 * sigma ** 2)) / (2 * Math.PI * sigma ** 2);
            kernel[x][y] = pixelValue;
            sum += pixelValue;
        }
    }

    // 正規化（元の明るさを維持するためには必要）
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            kernel[x][y] /= sum;
        }
    }

    // TODO: ここで imageData.data を参照して outputData に結果を格納
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let sumR = 0;
            let sumG = 0;
            let sumB = 0;

            for (let kernelY = 0; kernelY < size; kernelY++) {
                for (let kernelX = 0; kernelX < size; kernelX++) {
                    // カーネルの中心分ズラす
                    // 画像からはみ出る部分は丸める（0以上、縦横幅未満）
                    const originX = Math.min(width - 1, Math.max(0, x + kernelX - origin));
                    const originY = Math.min(height - 1, Math.max(0, y + kernelY - origin));

                    const i = (originY * width + originX) * 4;
                    sumR += data[i] * kernel[kernelX][kernelY];
                    sumG += data[i + 1] * kernel[kernelX][kernelY];
                    sumB += data[i + 2] * kernel[kernelX][kernelY];
                }
            }

            const i = (y * width + x) * 4;
            outputData[i] = sumR;
            outputData[i + 1] = sumG;
            outputData[i + 2] = sumB;
            outputData[i + 3] = data[i + 3];  // 透明度は変化なし
        }
    }

    /* ------------------------ここまで------------------------ */

    // メインスレッド（index.js）に結果を返す
    self.postMessage(
        { width, height, buffer: outputData.buffer },
        [outputData.buffer] // 転送
    );
});
