// 実部と虚部をプロパティとして持つ2 つの複素数オブジェクトを引数として四則演算の結果を返す関数
// 複素数の四則演算式の実部と虚部の計算をそれぞれ行う

// 加算：(a+bi)+(c+di)=(a+c)+(b+d)i
export function add(z1: any, z2: any) {
  // 実部と虚部を持つ結果
  const z3 = {
    real: z1.real + z2.real,
    imaginary: z1.imaginary + z2.imaginary
  };
  return z3;
}

// 減算：(a+bi)−(c+di)=(a−c)+(b−d)i
export function sub(z1: any, z2: any) {
  // 実部と虚部を持つ結果
  const z3 = {
    real: z1.real - z2.real,
    imaginary: z1.imaginary - z2.imaginary
  };
  return z3;
}

// 乗算：(a+bi)(c+di)=(ac−bd)+(ad+bc)i
export function mul(z1: any, z2: any) {
  // 実部と虚部を持つ結果
  const z3 = {
    real: z1.real * z2.real - z1.imaginary * z2.imaginary,
    imaginary: z1.real * z2.imaginary + z1.imaginary * z2.real
  };
  return z3;
}

// 除算：(a+bi)/(c+di)={(ac+bd)+(bc−ad)i}/(c^2+d^2)
export function div(z1: any, z2: any) {
  // 実部と虚部を持つ結果
  const z3 = {
    real: (z1.real * z2.real + z1.imaginary * z2.imaginary) / (z2.real ** 2 + z2.imaginary ** 2),
    imaginary: (z1.imaginary * z2.real - z1.real * z2.imaginary) / (z2.real ** 2 + z2.imaginary ** 2)
  };
  return z3;
}

