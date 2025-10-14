### index1.html
defer <= domcontentloaded <= load <<<<<< 何もなし

index1 は外部ライブラリに依存している
defer が一番速い
async では、ライブラリがまだ読み込まれていない状態で index1.js が実行されるリスクがある


### index2.html
defer,domcontentloaded,load < async <<<<<< 何もなし

index2 は外部ライブラリに依存していない
defer,domcontentloaded,load の違いはほぼ分からなかった。
async では、async は順序・DOM が未保証のためたまにほんの少し遅いことがあった
