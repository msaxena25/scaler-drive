
//! queueMicrotask global function

/*

We all know that Promise resolved in web apis and its callback goes to microtask queue.
Microtask queue has priority over task queue.
So If we want to put any function into micro task queue then we can use queueMicrotask global function.

NOTE: every piece of code first go to Call stack and after that based on its type, it moves to web apis or microtask queue.

? How setTimeout process?

settimeout first go to call stack and then it moves to web api and once it reaches to its time, then its callback
move to task queue. And when call-stack become empty, event loop throw this callback from task queue to call stack. 


*/

function understandExecutionSequence() {

    const p = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('I am resolved using promise with settimeout')
        }, 0);
    })


    queueMicrotask(() => {
        console.log('I am queue micro tasks 1');
    })

    p.then((res) => {
        console.log(res);
    })

    Promise.resolve().then(() => {
        console.log('I am resolved with simple Promise')
    })

    queueMicrotask(() => {
        console.log('I am queue micro tasks 2 ');
    })

    setTimeout(() => {
        console.log('I am set timeout ');
    });

    console.log('I am simple log')
}

// understandExecutionSequence();

/* OUTPUT

I am simple log
I am queue micro tasks 1
I am resolved with simple Promise
I am queue micro tasks 2 
I am resolved using promise with settimeout
I am set timeout 

*/



//! Promise finally method

/*
- finally does not take any parameter -> reject or resolve doesn't matter.
- If finally block throw any error then that error is picked into Catch block & rejected value of promise is ignored.
- If finally block return a resolved promise or a simple value, then that value will be ignored and main promise resolved value will be forwarded to then block.
- If finally return a rejected promise then its rejected value will be forwarded to catch block and parent value will be ignored.

*/


Promise.resolve(1).
    finally((data) => {
        console.log('finally block 1', data); // undefined
    })

// reject promise must be include catch method.
Promise.reject(2).
    finally((data) => {
        console.log('finally block 2', data); // undefined
    })
    .catch(err => {
        console.log("👉  err:", err);
    })


// rejected value 3 will be ignored because finally block is throwing error.
Promise.reject(3)
    .finally(() => {
        throw new Error('3 - Promise rejected and Error throwing from finally block');
    })
    .catch(err => {
        console.log("👉  err:", err);
    })


// resolved value 4 will be ignored because finally block is throwing error & then method will not execute.
Promise.resolve(4)
    .finally(() => {
        throw new Error('4 - Promise resolved but Error throwing from finally block');
    }).then(value => console.log(value))
    .catch(err => {
        console.log("👉  err:", err);
    })

// rejected value 5 will be forwarded to catch block.
Promise.reject(5)
    .finally(() => {
        return Promise.resolve('5 - I am new promise and resolved inside finally')
    })
    .then(value => console.log(value))
    .catch(err => {
        console.log("👉  err:", err);
    })

// resolved value 6 will be forwarded to then block.
Promise.resolve(6)
    .finally(() => {
        return Promise.resolve('I am new promise and resolved inside finally')
    })
    .then(value => console.log(value))
    .catch(err => {
        console.log("👉  err:", err);
    })

// resolved value 7 will be ignored here because finally block returned a rejected promise.
Promise.resolve(7)
    .finally(() => {
        return Promise.reject('7 - I am new promise and resolved inside finally')
    })
    .then(value => console.log(value))
    .catch(err => {
        console.log("👉  err:", err);
    })

// throw error from then block and catch block.
Promise.resolve(8)
    .then(d => {
        console.log(d); //8
        throw new Error('8 - Some error'); //rejected promise
    })
    .catch((err) => {
        console.log(err); // 8 - Some error
        throw new Error(err.message); //Uncaught (in promise) Error: 8 - Some error  (logged after finally)
    }).finally((d) => {
        console.log("came to finally", d);
        return d;
    })


/********************** */

//! Proxy

/*

You can create Proxy with two parameters.

target: the original object which you want to proxy.
handler: an object that defines which operations will be intercepted 
         and how to redefine intercepted operations.


The Proxy object enables you to create a proxy for another object, 
which can intercept and redefine fundamental operations for that object.

*/

const target = {
    message1: "hello",
    message2: "everyone",
};

const handler2 = {
    get(target, prop, receiver) {
        return "world";
    },
};

const proxy2 = new Proxy(target, handler2);

console.log(proxy2.message1); // world
console.log(proxy2.message2); // world



// Create Proxy function


function createProxy(obj) {
    let handler = {
        get(target, prop) {
            console.log("get", target, prop);
            return target[prop].toUpperCase(); // redefine value to upper case
        },
        // stop adding new property, If we omit this setter then we can add new property.
        set(target, prop, receiver) {
            if (prop in target) {
                target[prop] = receiver;
                return true;
            } else {
                throw new Error("Cannot add new property");
            }
        }
    }
    let proxyObj = new Proxy(obj, handler);
    return proxyObj;
}

// directly pass the object without having any references 
let obj = createProxy({ eng: "Hello", eng2: "hi" });

console.log(obj.eng2);
console.log(obj.eng);

obj.eng = 'I am changed object';

console.log(obj.eng);

// obj.eng3 = 'I am eng3'; // Uncaught Error: Cannot add new property



//! Write a program to return value 1 if property not found in object.

let obj1 = {
    key: 2,
    name: 'Jammy'
}
console.log(obj1.name) // Jammy
console.log(obj1.code); // undefined but we need here answer as 1.

// To implement this we have to use Proxy object.

function createProxy1(obj) {
    let handler = {
        get(target, prop) {
            if (!target[prop]) {
                return 1;
            }
        }
    }

    let p = new Proxy(obj, handler);
    return p;
}

let obj2 = createProxy1(obj1);

console.log(obj2.code); // 1