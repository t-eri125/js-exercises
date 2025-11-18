document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    // グレースケールへの変換 (RGB を足して平均を取っている)
    //
    // ガウシアンフィルタを実装する場合はこの周辺のコードを変更しなさい
    // imageData の中身はそのままに別の配列に結果を格納するとよい

    /* カーネルの生成 */
    const size = 10;     // カーネルのサイズ
    const sigma = 10.0;  // 標準偏差
    const kernel = [];  // カーネル：重み付けされた係数の集まり（行列） 
    const origin = Math.floor(size / 2); // カーネルの中心座標
    let sum = 0;

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

    const outputData = new Uint8ClampedArray(imageData.data.length);

    // TODO: ここで imageData.data を参照して outputData に結果を格納
    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        let sumR = 0;
        let sumG = 0;
        let sumB = 0;

        for (let kernelY = 0; kernelY < size; kernelY++) {
          for (let kernelX = 0; kernelX < size; kernelX++) {
            // カーネルの中心分ズラす
            // 画像からはみ出る部分は丸める（0以上、縦横幅未満）
            const originX = Math.min(img.width - 1, Math.max(0, x + kernelX - origin));
            const originY = Math.min(img.height - 1, Math.max(0, y + kernelY - origin));

            const i = (originY * img.width + originX) * 4;
            sumR += data[i] * kernel[kernelX][kernelY];
            sumG += data[i + 1] * kernel[kernelX][kernelY];
            sumB += data[i + 2] * kernel[kernelX][kernelY];
          }
        }

        const i = (y * img.width + x) * 4;
        outputData[i] = sumR;
        outputData[i + 1] = sumG;
        outputData[i + 2] = sumB;
        outputData[i + 3] = data[i + 3];  // 透明度は変化なし
      }
    }

    const outputImageData = new ImageData(outputData, img.width, img.height);
    filteredCtx.putImageData(outputImageData, 0, 0);
  });

  reader.readAsDataURL(file);
});
