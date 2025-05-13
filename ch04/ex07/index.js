// このような関数は絶対に書いてはならない。
function set42(key) {
    eval(`${key} = 42;`);
}

// 例:
// set42("hello");
// console.log(hello); // 42

// 通る
set42("for (let i = 0; i < 43; i++) i");
// 通らない
// set42("for (let i = 0; i < 44; i++) i");
