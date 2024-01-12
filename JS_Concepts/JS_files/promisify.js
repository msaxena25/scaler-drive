/*

!What is Promisification?

Promisification means transformation. It’s a conversion of a function that accepts a callback into a function returning a promise.

! What are callbacks?


A JavaScript callback is a function that is supposed to run after another function's completion. These are the functions that are passed to another function as arguments that are invoked inside that main function to complete some kind of operation.
 

! Why do we need to convert callbacks to promises?

With callbacks, you have no control over when it's called, under what context, or how many times it's being called, which can lead to memory leaks.

Using promises, we control these factors (especially error handling) so the code is more readable and maintainable.

With callbacks, if you want to do something sequentially you will have to specify an err argument in each callback, which is redundant. In promises or async-await, you can just add a .catch method or block which will catch any errors that occurred in the promise chain.

*/

function printTable(number, cb) {
    cb(number);
}

printTable(2, (result) => {
    printTable(result * 2, (result) => {
        printTable(result * 2, (result) => {

        })
    })
})

//! Callback based programming

function getSum(a, b, cb) {
    if (!a || !b) {
        cb(new Error('Please provide inputs'));
    }
    return cb(null, a + b); // First parameter refers to Error
}

getSum(10, 10, (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log('output with callback based fn ', result);
    }
})
// output with callback based fn  20

//@ Promisify version of it.

//! Own Promisify function

/*
    * Steps

- Create a outer function named promisify (any name which you want) with one parameter only that is any async function which you want to covert.
- This outer function will also return a function that contains Promise.
- This inner function will take list of arguments from Callee which are required to execute async function.
- This async function is written in callback based code so will take callback function as last parameter.
- Execute async function inside Promise with last parameter as callback.
- If return error, reject promise and if returns result, resolve promise.
- Finally you can use then and catch to print output.

*/


// return a promise
function promisify(asyncFn) {
    return function (...inputs) {
        return new Promise((resolve, reject) => {
            // This If is extra safety check for validate number of input parameters which required to async function
            // Reject Promise incase sufficient parameters are not passed
            if (inputs.length !== asyncFn.length - 1) {
                reject('Please validate number of inputs parameters')
            }
            // Call async function and pass callback function as last parameter
            asyncFn(...inputs, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        })
    }
}

const p = promisify(getSum);

p(10, 10).then((res) => {
    console.log('output with promisify', res);
}).catch(console.error)
// output with callback based fn  20

p(10).then((res) => {
    console.log('output with promisify', res);
}).catch(console.error)
// Please validate number of inputs parameters

p().then((res) => {
    console.log('output with promisify', res);
}).catch(console.error)
//Please validate number of inputs parameters

p(1, 2, 3, 4).then((res) => {
    console.log('output with promisify', res);
}).catch(console.error)
// Please validate number of inputs parameters




//! Output of below Generator program?

function* f(...a) {
    let s = new Set();
    for (x in a) {
        s.add(a[x]);
        yield a[x];
    }
    yield s;
}
let f1 = f(3, 2, 1);

let yv = f1.next().value;


while (true) {
    let yv = f1.next().value;
    if (typeof yv == "object") {
        console.log(yv);
        yv.add(3);
        console.log(yv);
        break;
    }
}
// Set(3) {3, 2, 1}
// Set(3) {3, 2, 1}