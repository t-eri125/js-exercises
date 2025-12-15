const worker = new Worker("./worker.js", { type: "module" }); // import宣言が使えるようにする

let filteredCtx = null;

// worker から結果を受信
worker.onmessage = (event) => {
  const { width, height, buffer } = event.data;   // 15-14 でも buffer を使っている

  // 元々 for ループ外でやっていたメイン処理
  const outputData = new Uint8ClampedArray(buffer);
  const outputImageData = new ImageData(outputData, width, height);

  filteredCtx.putImageData(outputImageData, 0, 0);
};

document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.onload = (e) => {    // 1回しか使わないので、onload へ変更
    img.src = e.target.result;
  };

  img.onload = () => {   // 1回しか使わないので、onload へ変更
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    filteredCtx = filteredCanvas.getContext("2d");

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);

    // worker に画像データ object を送信（複製された値が「message」イベントを介してワーカーに送信される）
    worker.postMessage(
      {
        width: img.width,
        height: img.height,
        buffer: imageData.data.buffer
      },
      [imageData.data.buffer] // 15-14 でも buffer を転送
      // 所有権を渡すだけなのでこの方が早いが、中身が空になるため注意
    );
  };

  reader.readAsDataURL(file); // 画像を読み込む
});
