import { readdir, stat } from 'fs/promises';
import { join } from 'path';

export async function newFetchSumOfFileSizes(path: string): Promise<number> {
    try {
        // ディレクトリ内の全ファイル名を取得
        const files: string[] = await readdir(path);

        // 各ファイルのサイズ取得を非同期で準備
        const sizePromises: Promise<number>[] = files.map(async (file) => {
            // ファイルの情報を取得
            const stats = await stat(join(path, file));
            return stats.size;  // サイズだけ返す
        });

        // すべてのサイズ取得が終わるのを待つ
        // 結果は元のファイル順で配列で返ってくる
        const sizes: number[] = await Promise.all(sizePromises);

        // 合計サイズを計算
        const total: number = sizes.reduce((sum, size) => sum + size, 0);
        return total;
    } catch (err) {
        throw err;
    }
}
