const worker = new Worker("./worker.js", { type: "module" });

const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

// 描画解像度を指定
canvas.width = Math.floor(window.innerWidth * 0.9);
canvas.height = Math.floor(window.innerHeight * 0.9);

worker.onmessage = (e) => {
  // 描画
  const imageData = e.data.imageData;
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    if (data[i] !== 0) {   // iterations が 1 のところ
      data[i] = 0;     // R
      data[i + 1] = 0;     // G
      data[i + 2] = 0;     // B
      data[i + 3] = 255;   // A ← これが超重要
    }
  }

  ctx.putImageData(imageData, 0, 0);
};

document.getElementById("draw").onclick = () => {
  worker.postMessage({
    tile: {
      width: canvas.width,
      height: canvas.height
    },
    order: 10 // 再帰の深さ
  });
};

