// 以下のコードが Web サービスの一部で使われており、引数の input には Web サービスの利用者が入力した文字列が渡されるものとする。

function f(input: any) {
    const f = new Function(`return "Hello, " + ${input}`);
    console.log(f());
}

// このコードには重大な問題が含まれている。何が問題と考えられるか記述しなさい。
// また問題を実証できるコードも記載しなさい。

f('"; alert("Hacked!"); "');
