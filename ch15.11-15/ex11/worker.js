onmessage = function (message) {
    const { tile, order } = message.data;
    const { width, height } = tile;

    // 教材15.14と同じ
    const imageData = new ImageData(width, height);
    const iterations = new Uint32Array(imageData.data.buffer);

    // 描画範囲を設定（中央80%）
    let segments = [[0, width]];

    // 上から順に描く
    for (let n = 0; n <= order; n++) {
        // 縦は均等に配置
        const lineHeight = Math.floor(height / (order + 2));    // 上と下に余白
        const y = (n + 1) * lineHeight;

        // 線の太さを決める
        const lineWeight = 5;

        // 今のステップ (n) の線分を描く
        for (let s = 0; s < segments.length; s++) {
            const x1 = segments[s][0];
            const x2 = segments[s][1];

            for (let x = x1; x <= x2; x++) {
                for (let dy = -lineWeight; dy <= lineWeight; dy++) {
                    const yy = y + dy;
                    if (0 <= x && x < width && 0 <= yy && yy < height) {
                        iterations[yy * width + x] = 1; // 1次元配列としてピクセル情報を格納
                    }
                }
            }
        }

        // 次のステップ (n + 1) 用の線分を作る
        const separatedLines = [];
        for (let s = 0; s < segments.length; s++) {
            const x1 = segments[s][0];
            const x2 = segments[s][1];
            const third = Math.floor((x2 - x1) / 3);

            // 3 等分した部分のうち、中央を飛ばして両端を追加
            separatedLines.push([x1, x1 + third]);
            separatedLines.push([x2 - third, x2]);
        }
        segments = separatedLines;
    }

    postMessage({ tile, imageData }, [imageData.data.buffer]);
};