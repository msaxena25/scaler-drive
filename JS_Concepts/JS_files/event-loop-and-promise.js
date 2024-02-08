/*

 * 1. Every line of code that you wrote in your js file  -> will only execute in call stack.
 * 2. For a callback coming from WebAPIS to execute -> call stack should be empty
 * 3. Task / Message / Callback queue: As soon as task of asynchronous function is done there cb is immediately enqueued in that queue
 * 4. event loop : checks the queue and as soon as a cb arrived in the queue, it continuously check if call stack is empty or not and pushed that cb in callStack.
 *
 *
 * JS -> is a single threaded, synchronous language.
 * JS has a call stack, an event loop and a callback queue + other WEB APIs.
 * V8 is the JavaScript engine which has a call stack and a heap. The heap is used for memory allocation and the stack holds the execution context.
 * Nodejs -> is single threaded language.
 *
 * How it is able to execute async tasks -> asynchronous architecture -> Event loop , callback Queue, WebAPI
 *

*/

/*
TASK QUEUE

JavaScript can do only one thing at a time & performed in stack.
The rest are queued to the task queue waiting to be executed.
When we run setTimeout than web APIs will run a timer and push the callback function provided to setTimeout to the task queue once the timer ends.
These tasks will be pushed to the stack where they can executed.

EVENT Loop - The event loop pushes the tasks from the task queue to the call stack.

Heap

To create all Objects, javascript uses Heap to allocate memory for object. Heap is just a big memory space.
*/

console.log('I am first console and will run into call stack because at this time call stack is empty');

function fnName() {
    console.log('I am function and will execute after first console log, till now I am waiting in Task Queue');
}

// Once call stack becomes empty Event loop will move to this function to call stack.
fnName();

setTimeout(() => {
    console.log('I am part of web api. So timer will run in web api.');
    console.log('once timer finished, settimeout callback function will move to Task Queue Or message queue');
    console.log('CallStack is empty now, Event loop will move this to call stack and there this fn will execute.')
}, 2000);


//! Normal function

// Print sum of two numbers after 1 second.

const sum = function (a, b) {
    setTimeout(() => {
        console.log('sum of two numbers ', a + b);
    }, 1000);
}
sum(10, 20);

//! Callback functions

// Requirement - Sum of two numbers after some seconds and return that sum to Callee function.

// Try with direct return sum value

const sum2 = function (a, b) {
    setTimeout(() => {
        return a + b;
    }, 1000);
}
console.log('sum 2 results ', sum2(2, 3)); // sum 2 results  undefined

// try with passing callback function as a parameter

const sum3 = function (a, b, cb) {
    // sum could be done from api side as well. setTimeout is just for representing purpose of async.
    setTimeout(() => {
        cb(a + b);
    }, 1000);
}
sum3(10, 20, function (result) {
    console.log('Sum is done', result); // Sum is done 30
});


/*

 * Parallel tasks -> When there are a number of tasks that are independent so you can do those tasks simultaneously
 * Serial tasks -> When there are a number of tasks that are dependent so you can do those tasks simultaneously

? What is meaning of asynchronous?

The word 'asynchronous', aka 'async' just means 'takes some time' or 'happens in the future, not right now'.

? Which component handles the execution of asynchronous code/callbacks?

Event loop.

*/


//! Example of Serial tasks => Requirement: The output of the previous task is required for the next tasks.

// Tasks: Sum => multiply => Minus => finally return result

function calculator() {
    const sum = function (a, b, cb) {
        setTimeout(() => {
            cb(a + b);
        }, 1000);
    }
    const mul = function (sumResult, c, cb) {
        setTimeout(() => {
            cb(sumResult * c);
        }, 1000);
    }
    const minus = function (mulResult, d, cb) {
        setTimeout(() => {
            cb(mulResult - d);
        }, 1000);
    }

    function call(a, b, c, d, cb) {
        sum(a, b, function (res) {
            console.log('sum is', res); // pass this response to mul function
            mul(res, c, function (res) {
                console.log('multiply is ', res); // pass this response to minus function
                minus(res, d, function (res) {
                    console.log('Minus is ', res);
                    cb(res); // finally return result
                })
            })
        })
    }

    call(10, 10, 5, 90, function (res) {
        console.log('final output of calculator, ', res)
    });
}
calculator();


/*

? What are callbacks?

There isn't a special thing called a 'callback' in the JavaScript language, it's just a convention. Instead of immediately returning some result like most functions, functions that use callbacks take some time to produce a result.

? What are callback hell ?

 - When there are nested of callbacks.
 - Nested things inside of each other because they all depend on the previous callback.
 - Callback hell is also called pyramid of doom.
 - Callback hell code is also known as 'Christmas tree' code because of how indented the code is sideways.
 - The above calculator program is example of nested callbacks.


 ? What is Inversion of controls?
 - Give a control to some class to drive your way but safely.

Callback have a problem that they are passed to async function or third parties and they can use these callbacks any times. 
So here is TRUST issue. Because of that, output of code may be hamper. 
We can not trust to that third party library or any library (either we created) that they will use these callbacks only when required. 
And that is known as inversion of controls principle.
In Callback hell, there is also issue of this principle.

* Callback hell is not a software problem or JS problem, its a problem of bad Code writing. 
* Unstructured Code, Nested Code and non- modular code creates this issue and that can easily solve to use good code practice.

? Why Promise come into picture?

- Promise is used to solve callback hell problem. that is very simple use case.
- Promise came to action to solve callback access issue to anywhere in anyway. Or it is used to implement inversion of control principle correctly.
- Instead of immediately returning the final value, the asynchronous method returns a promise to supply the value at some point in the future. 
This is same as real use case like when You order food on counter, then they give you a token and this token will work like future food for you. Once your token number food become ready, it is served you.


*/


//! Inversion of control

// Create a method that returns sum from api (ASYNC call)

function printSumFromAPI(a, b, cb) {
    setTimeout(() => {
        cb(a + b);
        cb(); // misuse of callback function
        cb(); // again misuse of callback function
    }, 2000);
}

// callback
const myFun = function (res) {
    console.log('Sum of two numbers returned from API is ', res);
}

// call of async method
printSumFromAPI(10, 20, myFun);

// Here 3 times callback function is called and thats why three different outputs are returned.



//! You can run JS file with NODE JS as well. require module also work there. But require will give error in Browser.
//@ Go to file directory > node event-loop.js

/* 
let fs = require('fs');

//@ synchronous

console.log("Before fs.readFileSync");
const content = fs.readFileSync("./f1.txt", "utf-8");
console.log(content)
console.log("After fs.readFileSync ")

//@ asynchronous

console.log("Before fs.readFile");
// read File is an asynchronous method.
fs.readFile("./f1.txt", "utf-8", function (err, content) {
    if (err) {
        console.log(err);
    } else {
        console.log(content)
    }
});

console.log("I am placed after fs.readFile but that is asynchronous method, so I will call before file read");

 */

//! Promise

console.log('Understand Promise')

let p = new Promise((resolve, reject) => { console.log('I am promise inside') });
console.log(p); // Promise { <pending> }

/*
The initial state of Promise is pending. When it is neither resolved nor rejected then the state is Pending.
Promise returns a promise object immediately and returns serial operations output that are not async.

Promise has three main states -
pending: initial state.
fulfilled: the operation was completed successfully or can say Resolved.
rejected: operation failed.

One more state we have and that is called settled. (means promise is either resolve or reject but not in pending)

@ Resolve have then listener and Reject have catch listener.


 */

//! Check promise after some milliseconds (without then or catch method)

let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('I will be resolved automatically after 2 seconds')
    }, 2000);
});

console.log(p1); // Promise { <pending> }

// If you check this promise after 2 seconds, till that time it will be resolved.
setTimeout(() => {
    console.log(p1); // Promise { 'I will be resolved automatically after 2 seconds' }
}, 3000);


//! then and catch

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Call then method.');
    }, 2000);
});

console.log(p2); // Promise { <pending> }

p2.then((res) => {
    console.log('Output with then method ', res);
}).catch((err) => {
    console.log('Error with catch method ', err);
})


/* const p3 = fs.promises.readFile('./f3.txt');

p3.catch((res) => {
    console.log(res); // no such file or directory
})
 */



//! Test with 2 resolve methods


/* 

Note: Promise only returns one state at a time which comes first. 
If a Promise is resolved first then it will marked as fulfilled. 
If Promise rejects first then marked as rejected. 

Using multiple times resolve or reject one after another will not hamper your output. Means we can trust to promise.
And thats why Promise authenticate inversion of control principle. 

*/


const p4 = new Promise((resolve, reject) => {
    resolve(1);
    resolve(2); // this will not run. resolve only called once at a time.
})
console.log(p4); // Promise { 1 }

//! Test with 2 reject methods

const p5 = new Promise((resolve, reject) => {
    reject('error - 1');
    reject('error - 2'); // this will not run. reject only called once at a time.
})
console.log(p5); // Promise { <rejected> 'error - 1' }
p5.catch((error) => { console.log(error) })

//! Test with resolve and reject method both sequently

const p6 = new Promise((resolve, reject) => {
    reject('error - 1 p6');
    resolve('resolve - 2'); // this will not run. Promise only return one state (first state which read).
})
console.log(p6); //Promise { <rejected> 'error - 1 p6' }
p6.catch((error) => { console.log(error) })


const p8 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('p 8 rejected');
    }, 2000);
    //resolve('p 8 success')
})
// p8.then(null, (res) => {
//     console.log('err from then', res)
// })
// p8.then((res) => {
//     console.log(res)
// })
p8.catch((res) => {
    console.log('catch', res)
})

// p8.finally((res) => {
//     console.log('p 8 finally', res)
// })




//! Chained Promises
//@ then, catch and finally method returns promises so they can be chained.

const p7 = new Promise((resolve, reject) => {
    resolve(1);
});

p7.then((value) => console.log('I am first', value))
    .then((value) => console.log('I am second', value))
    .then((value) => new Promise((resolve, reject) => resolve(2)))
    .catch(value => console.log('I am catch', value))
    .then((value) => console.log('I am fourth', value))

// I am first 1
// I am second undefined
// I am fourth 2


/*
* PROMISE METHODS

! then method

Promise then method takes up to two arguments: callback functions for the fulfilled and rejected cases of the Promise.
The first parameter is used for the fulfilled state and the second parameter is used for the reject state that works the same as the catch method.
Then method also returns a promise & that's why you can chain other promise methods.

! catch method

@ Called when the promise is rejected. It is a shortcut for Promise.prototype.then(undefined, onRejected).

promise.then((success) => {}, (rejected) => {});

! finally

@ Called when promise settled (either fulfilled or rejected). It does not return any output like success or error.
@ The finally() method can be useful to do some cleanup once the promise is settled, regardless of its outcome.

! Promise.all()

The Promise.all() static method takes an iterable of promises and returns a single Promise with an array of the fulfillment values, when all of the input's promises are fulfilled.
It rejects when any one of the input's promises is rejected, with this first rejection reason.
It works like transaction. If all pass then success and if anyone failed then rejected.

! Promise.allSettled()

It returns a promise fulfilled when all of the input's promises settle with an array of objects that describe the outcome of each promise.
Promise.allSettled() is used when tasks are not dependent on each other OR you'd always like to know the result of each promise.
Promise.all() may be more appropriate if the tasks are dependent on each other, or if you'd like to immediately reject any of them.

! Promise.any()

It returns a promise fulfilled when any of the input's promises are fulfilled, with this first fulfillment value.
It rejects when all of the input's promises are rejected.

! Promise.race()

The method name itself clarifies that whoever wins the race, will return as output. Here win does not mean to resolve. it may be resolved or rejected.
It returns the promise fulfilled with the first promise settled. The Promise.race() method is one of the promised concurrency methods.
It's useful when you want the first async task to complete but do not care about its eventual state (i.e. it can either succeed or fail).

! Read more on Promise type

@ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise


*/

//! Use case of Promise.any

const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));

const promises = [promise1, promise2, promise3];

Promise.any(promises)
    .then((value) => console.log(value))
    .catch((err) => console.log(err));
// Expected output: "quick"


//! Convert Callback to Promise

//! What is promisify?

//@ Promisify is a function that can turn any given function into a promisified version of itself.
//@ The objective is to convert a function that uses traditional callback-based asynchronous programming into a function that returns a promise.

const myCallback = function (cb) {
    setTimeout(() => {
        console.log('I am running');
        cb(); // callback which you have to execute after async call.
    }, 2000);
}
myCallback(function () {
    console.log('I am running in callback function')
})

//@ Conversion

const myCallbackAsPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('I am running');
        resolve();
    }, 2000);
})
myCallbackAsPromise.then(function () {
    console.log('I am running in callback function using Promise then')
});

/*
callback-based methods takes callback as an parameter and run itself after async process completes.
Promise does not take callback from you, they are resolved once async process completes.

You can not trust to callback based methods because they can misuse your passed callback function.
You can trust on Promise because then can only emit resolve or reject single time only.

In callback type methods, you don't have control to execute your function.
In Promise type, you only have control to execute your function.

*/


//! How Promise handles in Event Loop? -- Microtask queue

// In JavaScript engine, there is a special Queue for Promises and that is called MicroTask Queue. Promise executes in Microtask queue and once they become fulfill then moves to Task Queue. And after that event loop moves these to call stack to return output, only when call-stack is empty.


//! Promise.resolve()

/*
The Promise.resolve() static method "resolves" a given value to a Promise.

*/

const promise6 = Promise.resolve(123);

promise6.then((value) => {
    console.log(value);
    // Expected output: 123
});


//! Create Custom Promise.all method

/*
 * Input : it takes an array of promise
 * Output : it returns a single promise with all fulfilled values
    * Behavior:
    *     1.  if all of the input promises get resolved then -> promise returned by Promise.all
    *             state also get resolved -> you get array of resolved values of all the resp promises.
    *     2. if any of the input promise get's rejected ->  promise returned by Promise.all
    *             state also get rejected -> you get that rejected promise
 */

Promise.customAll = function (arrayOfPromises) {
    let fulfilledValues = [];
    return new Promise((resolve, reject) => {
        // If array is empty, simply resolve state.
        if (!arrayOfPromises || !arrayOfPromises.length) {
            resolve([]);
        }
        // As an Input we are given promise array so we can apply forEach and then method.
        // Once all promise checked then finally resolve with values.
        // If any promise reject, then finally reject with error.
        arrayOfPromises.forEach(promise => {
            promise.then((value) => {
                fulfilledValues.push(value);
                if (fulfilledValues.length === arrayOfPromises.length) {
                    resolve(fulfilledValues);
                }
            }).catch((err) => {
                reject(err);
            })
        });
    })

}

const p11 = Promise.resolve('Hi I am p11');
const p12 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('HI I am p12 promise');
    }, 1000);
});
const p13 = Promise.resolve('Hi I am p13')

Promise.customAll([p11, p12, p13])
    .then((arrOfValues) => {
        console.log('test customAll with all resolve', arrOfValues);
    }).catch((err) => {
        console.log(err);
    });

Promise.customAll([])
    .then((arrOfValues) => {
        console.log('test customAll with blank arr', arrOfValues);
    }).catch((err) => {
        console.log(err);
    });

Promise.customAll([p12, p13, Promise.reject('I am rejecting promise')])
    .then((arrOfValues) => {
        console.log('test customAll ', arrOfValues);
    }).catch((err) => {
        console.log('test customAll with reject', err);
    });


//! async await
/*

- Async await is just a cleaner way to write promise based behavior.
- It avoids promise chaining.
- The await keyword is only valid inside async functions.
- To handle promise errors, we use try and catch here.

try / catch

- If first promise rejected then it will immediately move to catch block and will not execute further promises.
- If first promise resolved then it will move to second promise.

*/

// A function that is returning promise.
function resolveAfter2Seconds() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });
}

// async await way to utilize above promise.
async function asyncCall() {
    console.log('calling');
    const result = await resolveAfter2Seconds(); // execution will stop for 2 seconds.
    console.log(result);
    // Expected output: "resolved"
}

const promise7 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('resolved after 4 seconds');
    }, 4000);
})

const promise8 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('rejected after 0 seconds');
    });
})


// promise 7 is resolved thats why it moves to next promise 8 and catch error for promise8.
async function handleError() {
    try {
        const p = await promise7;
        console.log("👉  promise7  p:", p); // ok
        const p1 = await promise8;
        console.log("👉  promise8  p:", p1); // will go to catch

    } catch (e) {
        console.log("👉  error  e:", e); // ok

    }
}

// order of promise8 is first, so it will go to catch error for promise8 & will not run promise7.
async function handleError() {
    try {
        const p1 = await promise8;
        console.log("👉  promise8  p:", p1); // will go to catch
        const p = await promise7;
        console.log("👉  promise7  p:", p); // will not execute 
    } catch (e) {
        console.log("👉  error  e:", e); // ok

    }
}

// Such code will handle both separately.
async function handleError1() {
    try {
        const p1 = await promise8;
        console.log("👉  promise8  p:", p1);
    } catch (e) {
        console.log("👉  error  promise8:", e);

    }
    try {
        const p = await promise7;
        console.log("👉  promise7  p:", p);
    } catch (e) {
        console.log("👉  error  promise7:", e);

    }
}
handleError1();
