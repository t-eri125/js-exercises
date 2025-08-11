type Resource = {
    doA?(): void;
    doB?(): void;
    close(): void;
}

// 引数はResource型、closeメソッドを持つ
// 解放処理の呼び出し忘れによるリソースのリークにを防ぐため、終了時に必ず close が呼ばれるようにする
// export function withResource(resource: Resource, fn: (resource: any) => void): void {
//     try {
//         fn(resource);
//     } finally {
//         resource.close();   // 終了時に resource.close が自動で呼ばれ、
//     }
// }

export function withResource(resource: any, fn: (resource: any) => void): void {
    try {
        fn(resource);
    } finally {
        resource.close();   // 終了時に resource.close が自動で呼ばれ、
    }
}
