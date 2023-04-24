
//! Read input in Node JS using process.stdin

//! Fibonacci series question

process.stdin.resume();
process.stdin.setEncoding("utf8");
var arr = "";
process.stdin.on("data", function (chunk) {
    arr += chunk;
});
process.stdin.on("end", function () {
    let st = +arr;
    if (st <= 1) {
        console.log(st);
        return;
    }
    let a = 0;
    let b = 1;
    let c;
    for (let i = 2; i <= st; i++) {
        c = a + b;
        a = b;
        b = c;
    }
    console.log(c);
});