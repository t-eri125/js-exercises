setTimeout(() => console.log("Hello, world!"), 2000);

async function longA() {
    let count = 0;
    while (true) {
        if ((++count % 100000) === 0) { console.log("A"); }
        await Promise.resolve({})
    }
}

async function longB() {
    let count = 0;
    while (true) {
        if ((++count % 100000) === 0) { console.log("B"); }
        await Promise.resolve({})
    }
}

longA();
longB();
