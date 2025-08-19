## 問11.4
ch11/ex04/index.js の実装を完成させ型付き配列と通常の配列で行列の乗算の速度を比較してみなさい。また実行する前にどのような結果になるか予測しなさい。

### 予想
p.305 で「Array() の代わりにUint8Array() を使った場合、筆者の環境ではコードの実行速度が4 倍速くなり、メモリ使用量は8 分の1 になりました。」と記述があった。
<br>今回は要素数が`20,000 + 60,000 + 30,000`で計算量はfillとmapの2回ずつなのに対し、型付き配列は64ビットも要しているため初期化は若干時間がかかる。
<br>また、処理に時間がかかる関数の3重ループに関しては型付き配列の方が処理が早いが、今回はそこまで要素数が多くはないため差はほとんどないと予想する。
<br>結果として、そこまで差はないか型付き配列の方が時間がかかると予想する。Float32なら型付き配列の方が時間が早いと予想する。

### 実行結果
型付き配列の方が1.3~1.4倍程度時間がかかる。
これは今回の行列のサイズが小さいためと考える。
Float32Array とFloat64Arrayでは、JavaScript エンジンは 64bit → 32bit への変換 を行う必要があるため、Float32Arrayの方が余計に時間がかかっている。

Float64Array
```powershell
arrayMultiply: 353.68600000000015
typedArrayMultiply: 436.9789999999998

arrayMultiply: 344.0322000000001
typedArrayMultiply: 443.2279000000001

arrayMultiply: 364.2177999999999
typedArrayMultiply: 576.5624999999998
```

Float32Array
```powershell
arrayMultiply: 346.8424
typedArrayMultiply: 477.91599999999994

arrayMultiply: 350.2040999999999
typedArrayMultiply: 501.0702000000001

arrayMultiply: 370.0053999999998
typedArrayMultiply: 746.5401999999999
```

Uint32Array
```powershell
arrayMultiply: 342.99070000000006
typedArrayMultiply: 534.5245000000002

arrayMultiply: 352.7726
typedArrayMultiply: 540.8100999999999

arrayMultiply: 338.5495999999998
typedArrayMultiply: 551.4076000000002
```

Int32Array
```powershell
arrayMultiply: 350.4538
typedArrayMultiply: 506.3290000000002

arrayMultiply: 356.40319999999997
typedArrayMultiply: 469.95349999999985

arrayMultiply: 345.08979999999997
typedArrayMultiply: 472.8924999999999
```
