// jsの場合こちらを使う
// const acorn = require("acorn");
// const fs = require("fs");

import * as acorn from "acorn";
import { writeFile } from "fs/promises";

// p.22のコード1
const code1: string = `let a
a
=
3
console.log(a)`;

// p.22のコード2
const code2: string = 'let a; a = 3; console.log(a);';

// ASTを生成
const ast1 = acorn.parse(code1, {ecmaVersion: 2020});
const ast2 = acorn.parse(code2, {ecmaVersion: 2020});

// JSON に書き出す
writeFile("./ch02/ex08/ast1.json", JSON.stringify(ast1, null, 2), "utf-8");
writeFile("./ch02/ex08/ast2.json", JSON.stringify(ast2, null, 2), "utf-8");

// JSONとして出力
// console.log(`★★ast1★★\n${JSON.stringify(ast1, null, 2)}`);
// console.log(`★★ast2★★\n${JSON.stringify(ast2, null, 2)}`);