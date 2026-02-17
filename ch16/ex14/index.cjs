const fs = require("fs");
const threads = require("worker_threads");

/* カーネルの生成 */
const SIZE = 10;     // カーネルのサイズ
const SIGMA = 10.0;  // 標準偏差
const ORIGIN = Math.floor(SIZE / 2); // カーネルの中心座標

if (threads.isMainThread) {
  // ********** メインスレッド ********** //
  const bmp = fs.readFileSync("Parrots.bmp");
  const header = bmp.slice(0, 54);   // BMP ヘッダ
  const buffer = bmp.slice(54); // ピクセル部

  const width = 256;
  const height = 256;

  const worker = new threads.Worker(__filename, {
    workerData: { width: width, height: height, buffer: buffer }
  });

  worker.on("message", (result) => {
    // 外したヘッダを再結合
    const outputBmp = Buffer.concat([header, Buffer.from(result)]);

    fs.writeFileSync("output.bmp", outputBmp);
    console.log("変換完了");
  });

} else {
  // ********** ワーカースレッド ********** //
  const { width, height, buffer } = threads.workerData;   // 15-14 でも buffer

  // 元々 for ループ外でやっていたメイン処理
  const data = new Uint8ClampedArray(buffer);         // 元画像データ
  const outputData = new Uint8ClampedArray(data.length);  // 出力用配列（元コードと同じ）

  /**
   * ********** ガウシアンフィルタ処理（前のまま） *************
   */

  const kernel = [];  // カーネル：重み付けされた係数の集まり（行列） 
  let sum = 0;

  // カーネルを求める式の実装
  for (let x = 0; x < SIZE; x++) {
    kernel[x] = [];
    for (let y = 0; y < SIZE; y++) {
      const adjustedX = x - ORIGIN;
      const adjustedY = y - ORIGIN;
      const pixelValue = Math.exp(-(adjustedX ** 2 + adjustedY ** 2) / (2 * SIGMA ** 2)) / (2 * Math.PI * SIGMA ** 2);
      kernel[x][y] = pixelValue;
      sum += pixelValue;
    }
  }

  // 正規化（元の明るさを維持するためには必要）
  for (let x = 0; x < SIZE; x++) {
    for (let y = 0; y < SIZE; y++) {
      kernel[x][y] /= sum;
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sumR = 0;
      let sumG = 0;
      let sumB = 0;

      for (let kernelY = 0; kernelY < SIZE; kernelY++) {
        for (let kernelX = 0; kernelX < SIZE; kernelX++) {
          // カーネルの中心分ズラす
          // 画像からはみ出る部分は丸める（0以上、縦横幅未満）
          const ORIGIN_X = Math.min(width - 1, Math.max(0, x + kernelX - ORIGIN));
          const ORIGIN_Y = Math.min(height - 1, Math.max(0, y + kernelY - ORIGIN));

          const rowSize = Math.ceil((width * 3) / 4) * 4; // ★修正
          const i = ORIGIN_Y * rowSize + ORIGIN_X * 3;    // ★修正
          sumR += data[i] * kernel[kernelX][kernelY];
          sumG += data[i + 1] * kernel[kernelX][kernelY];
          sumB += data[i + 2] * kernel[kernelX][kernelY];
        }
      }

      const rowSize = Math.ceil((width * 3) / 4) * 4;      // ★修正
      const i = y * rowSize + x * 3;                       // ★修正
      outputData[i] = sumR;
      outputData[i + 1] = sumG;
      outputData[i + 2] = sumB;
      outputData[i + 3] = data[i + 3];  // 透明度は変化なし
    }
  }
  /**
    * ********** ガウシアンフィルタ処理（前のまま） *************
    */

  threads.parentPort.postMessage(outputData.buffer);
}
