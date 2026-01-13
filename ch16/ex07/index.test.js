import { checkEntry } from "./index.js";

describe("checkEntry", () => {
    it("ファイルなら`file`が返ってくる", async () => {
        const PATH = "ch16/ex07/file.txt";
        const result = await checkEntry(PATH);
        expect(result).toBe("file");
    });

    it("ディレクトリなら`directory`が返ってくる", async () => {
        const DIR = "ch16/ex07/dir";
        const result = await checkEntry(DIR);
        expect(result).toBe("directory");
    });

    it("存在しないパスなら`not found`が返ってくる", async () => {
        const NONE = "ch16/ex07/none";
        const result = await checkEntry(NONE);
        expect(result).toBe("not found");
    });

    it("アクセス権がない（無効な）パスなら`no permission`が返ってくる", async () => {
        const NOACCESS = "C:\\System Volume Information";
        const result = await checkEntry(NOACCESS);
        expect(result).toBe("no permission");
    });
});
