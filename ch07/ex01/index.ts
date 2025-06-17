export function addMatrix(matrix1: number[][], matrix2: number[][]) {
    const row = matrix1.length;
    const col = matrix1[0].length;

    if (row != matrix2.length || col != matrix2[0].length) {
        // 2つの行列のサイズが異なる場合、エラー
        throw new Error("行列のサイズが異なるため、加算できません");
    }

    const table = new Array(row);  // 行数分のテーブルを用意
    for (let i = 0; i < row; i++) {
        table[i] = new Array(col); // 各行には列数分の列が存在する。
        for (let j = 0; j < col; j++) {
            table[i][j] = matrix1[i][j] + matrix2[i][j];
        }
    }

    return table;
}

export function productMatrix(matrix1: number[][], matrix2: number[][]) {
    if (matrix1[0].length != matrix2.length) {
        // 1つめの列数と2つめの行数が異なる場合、エラー
        throw new Error("1つめの列数と2つめの行数が異なるため、乗算できません");
    }

    const row = matrix1.length;
    const col = matrix2[0].length;
    const common = matrix1[0].length;

    const table = new Array(row);  // 1つ目の行列の行数分のテーブルを用意
    for (let i = 0; i < row; i++) {
        table[i] = new Array(col); // 各行には2つ目の行列の列数分の列が存在する。
        for (let j = 0; j < col; j++) {
            table[i][j] = 0;       // 乗算するにあたり初期化
            for (let k = 0; k < common; k++) {
                table[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }

    return table;
}
