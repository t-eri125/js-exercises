import path from "path";

export default {
    mode: "development",
    devtool: "source-map", // ここを変更
    entry: "./ex06/src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(process.cwd(), "ex06/dist"),
        clean: true,
    },
};
