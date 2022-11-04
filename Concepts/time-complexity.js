function run1() {
    for (let i = 1; i <= 100; i *= 2) {
        for (let j = 1; j <= n; j++) {
            console.log(i + j);
        }
    }
}
// O(n^2)
// O(n)
// 0(nlogn)
// O(1)

function run2() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            console.log(i + j);

        }
    }
}
// O(n^2)
// O(n)
// O(nlogn)
// O(n^3)


function run3() {
    let j = 0;
    for (let i = 0; i < n; i++) {
        while (j <= i) {
            console.log(i + j);
            j++;

        }
    }
}
// O(n^2)
// O(nlogn)
// O(n)
// O(1)


function run4() {
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= Math.pow(3, i); j++) {
            console.count(i * j)
            //console.log(i + j);
        }
    }
}
// O(n^2)
// O(nlogn)
// O(2^n)
// O(3^n)' ✔️


function run5() {
    let a = 0, i = N;
    while (i > 0) {
        a += i;
        i /= 2;
    }
}
// O(N)
// O(Sqrt(N))
// O(N / 2)
// O(log N)  ✔️


// If for an algorithm time complexity is given by O(log2n) then complexity will:
// constant
// polynomial
// exponential
// none of the mentioned  ✔️


/*
What is meant by log n?

Logarithmic time complexity log(n): Represented in Big O notation as O(log n), when an algorithm has O(log n)
running time, it means that as the input size grows, the number of operations grows very slowly.
*/

/**
 *
Polynomial examples: n^2, n^3, n^100, 5n^7, etc….

Exponential examples: 2^n, 3^n, 100^n, 5^(7n), etc….
 */

/**
O(1) - constant time - When time complexity is constant (notated as “O(1)”), the size of the input (n) doesn’t matter.
O(log(n)) - logarithmic time - if time execution is proportional to the logarithm of the input size. When the input size grows, the number of operations grows very slowly.
O((log(n))c) - polylogarithmic time
O(n) - linear time - When time complexity grows in direct proportion to the size of the input,
O(n2) - quadratic time - the time it takes to run grows directly proportional to the square of the size of the input
O(n^c) - polynomial time - same as quadtraic time but here we have taken constant value as c.
O(c^n) - exponential time - the growth rate doubles with each addition to the input (n),
O(n!) - factorial time
 */

/* If for an algorithm time complexity is given by O((3/2)^n) then complexity will:

constant
quardratic
exponential
none of the mentioned */

// https://towardsdatascience.com/essential-programming-time-complexity-a95bb2608cac


function run6(n) {
    let s = 0;
    for (let i = 1; i * i * i <= n; i++) {
        s = s + i;
    }
    return s;
}
// O(n^(1/4))
// O(n^(1/3)) ✔️
// O(n^(1/2))
// O(n)



function run7() {
    let count = 0;
    while (N) {
        count++;
        N /= 3;
    }
}
// O(N)
// O(N*N)
// O(Nlog(N))
// O(log(N)) {Base 3} ✔️
// O(log(N)) {Base 2}'

function solve(n) {
    let i = 1;
    while (i < n) {
        let x = i;
        while (x--) {
            console.count('while')
            //O(1) operation
        }
        i++;
    }
}
//solve(10)
// O(nlogn)
// O(n)
// O(n sqrt(n))
// O(n^2) ✔️
// None of the above


function run8(N) {
    let a = 0;
    for (i = 0; i < N; i++) {
        console.count('outer')
        for (j = N; j > i; j--) {
            console.count('run8')
            a = a + i + j;
        }
    }
}
//run8(10);
// O(N)
// O(N*log(N))
// O(N * Sqrt(N))
// O(N*N) ✔️


// Spaces after i and ++ does not have any impact. Below both for loop output are same.
function run9(n) {
    for (let i = 0; i <= n; i ++) {
        console.log(i);
    }
    for (let i = 0; i <= n; i++) {
        console.log(i);
    }
    for (let i = 0; i <= n; i    ++) {
        console.log(i);
    }
}
//run9(5)

function run10(N) {
    let sum = 0;
    for (let i = 0; i <= N; i++) {
        console.count('outer')
        for (let j = i; j <= N && j > i; j++) {
            sum += i;
            console.count('inner')
        }
    }
}
//run10(5)

// inner for loop will never run because middle condition results false.
// And once middle condition becomes false, loop terminates.

// O(N^2)
// O(N) ✔️
// O(NlogN)
// None of these

function run11(n) {
    while(n > 0) {
        console.count('while')
        n++;
        n-= 2;
    }
}

//run11(5);

// Infinite loop
// O(n)✔️
// O(nlogn)
// O(logn)
// None of the above


function run12(N) {
    for (let i = 0; i < Math.pow(2, N); i++) {
        let j = i;
        console.count('outer')
        while (j > 0) {
            console.count('inner for i = ' + i)
            j -= 1;
        }
    }
}
run12(2)

// O(N * N)
// O(2^N)
// O(N * (2^N))
// O(3^N)
// O(4^N) ✔️