import path from "path";

export default {
    mode: "development",
    devtool: false, // 比較しづらいのでeval()削除
    entry: "./ex05/src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(process.cwd(), "ex05/dist"),
        clean: true,
    },
};
