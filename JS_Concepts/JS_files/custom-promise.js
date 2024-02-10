
//! Lets write Promise

// This is promise callback function
let promiseFn = (resolve, reject) => {
    setTimeout(() => {
        resolve('hello 11');
    }, 2000);
}

// Creating Promise using Promise Constructor (It takes Promise callback function as a parameter)
let p = new Promise(promiseFn)

// Promise then method (It takes success callback as a parameter)
p.then((data) => { console.log(data) });

// Promise catch method (It takes error callback as a parameter)
p.catch(console.log);


/*
* Understand Promise approach

- Promise function takes one parameter and that is a executable function.
- When we call this Promise with new keyword, it returns a promise object.
- Executable function is like a higher order function that takes two function argument named resolve and reject.
- Promise have two public methods here, then and catch.
- Then and catch method also takes callbacks which executes once promise resolved or reject.

*/


/*********************** CUSTOM PROMISE */

/*

? In Custom Promise , we will implement : Promise class, then and catch method.

@ out of scope - chaining, finally and other promise api methods like all, race etc.

*/

// These are predefined states of a promise.
const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

/* 
- Default state is Pending.
- Created a function named MyPromise which will take promise function as argument.
- This Promise executable function requires resolve and reject method as a parameter to execute.
- First Implement then method
    - We call then method of promise object with a success callback as a parameter.
    - example - p.then(() => {})
    - Create a then method with a callback argument.
    - As we know that then's callback does not execute immediately. this runs after resolve only.
    - So what can we do? we can store this callback fn in a variable named handlerCb.
    - One thing we can also do that in case Promise already resolved then we can execute this here only.
    - To check Promise resolved we can check its state. (state === RESOLVED)

- Implement Resolve method
    - It calls inside promise function, Once our task is completed then we can call resolve method with success value.
    - Create a resolve method with a parameter (success Value or response) inside our class.
    - First set state as resolved.
    - After that execute handlerCb function that we stored from then method.

- Implement Catch method
    - It also takes error callback as a parameter.
    - Follow same approach as then method.
    - If state is rejected then execute error callback immediately.
    - Else store this callback in a variable named handlerCb;

- Implement Reject method
    - Mark state a rejected.
    - Call error callback which we stored in handlerCb variable.
    - As we know that reject also throw error so we can throw error like - throw new Error(err).
    - One extra check we can add that If someone do not implement catch method then also throw error.

- And last, call that promise callback function with implemented resolve and reject method.

@ Note:

- We are executing callbacks inside public api queueMicrotask because Promise callbacks always run in async.
- To correctly emulate the behavior we have to call it inside a microtask queue so that 
    * it is called async
    * higher priority then normal async cbs
- Before calling handlerCb, do a check if it exists or not.
- Same for handlerCb.
- We can also store these callbacks in a array and can run inside forEach method.
- Promise then and catch method are only public methods so we add these in this object.
- resolve and reject are private methods.

*/
function MyPromise(promiseFn) {
    let state = PENDING;
    let successData;
    let error;
    let handlerCb = [];
    const resolve = function (response) {
        successData = response;
        state = RESOLVED;
        console.log(handlerCb);
        handlerCb.forEach(cb => {
            queueMicrotask(() => cb(response));
        });

    }

    const reject = function (err) {
        state = REJECTED;
        error = err;
        if (!handlerCb) {
            throw new Error(err);
        }
        handlerCb.forEach(cb => {
            queueMicrotask(() => cb(error));
            throw new Error(err);
        });
    }
    this.then = function (cb) {
        if (state === RESOLVED) {
            queueMicrotask(() => cb(successData));
        } else {
            handlerCb.push(cb);
        }

    }

    this.catch = function (cb) {
        if (state === REJECTED) {
            queueMicrotask(() => cb(error));
        } else {
            handlerCb.push(cb);
        }
    }

    promiseFn(resolve, reject);
}



let promiseFn1 = (resolve, reject) => {
    setTimeout(() => {
        resolve('hello');
    }, 2000);
}

const p1 = new MyPromise(promiseFn1);

p1.then((data) => { console.log('then 1', data) });

// we can add multiple then on same object thats why in polyfill we have handlerCb as an array.
p1.then((data) => { console.log('then 2', data) });

const p2 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('HI I will run after 2 seconds')
    }, 2000);
})

const p3 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject('HI I will rejected after 2 seconds')
    }, 2000);
})

p2.then(console.log)

p3.then(console.log)
p3.catch(console.log)

const p4 = new MyPromise((resolve, reject) => {
    resolve('HI I will resolved immediately seconds')
})
p4.then(console.log);


/** CLASS BASED STRUCTURE OF Promise Polyfill */

/* 

Note: Just one thing keep in mind that we need resolve and reject method before promiseFn execution, so
we have to create those inside constructor function, not outside.

*/

class MyPromise1 {
    state = PENDING;
    successData;
    error;
    handlerCb;
    constructor(promiseFn) {
        // resolve and reject must be created here only. Cannot be created outside because we need these to call promiseFn.
        const resolve = (response) => {
            this.successData = response;
            this.state = RESOLVED;
            queueMicrotask(() => this.handlerCb && this.handlerCb(this.successData));
        }
        const reject = (err) => {
            this.state = REJECTED;
            this.error = err;
            if (!this.handlerCb) {
                throw new Error(err);
            }
            queueMicrotask(() => {
                this.handlerCb && this.handlerCb(this.error);
                throw new Error(this.error);
            });
        }
        promiseFn(resolve, reject);
    }
    then(cb) {
        if (this.state === RESOLVED) {
            queueMicrotask(() => cb(this.successData));
        } else {
            this.handlerCb = cb;
        }
    }

    catch(cb) {
        if (this.state === REJECTED) {
            queueMicrotask(() => cb(this.error));
        } else {
            this.handlerCb = cb;
        }
    }
}

const c = new MyPromise1((resolve, reject) => {
    resolve('HI I will resolved immediately seconds in Class MyPromise1')
});
c.then(console.log);

const c1 = new MyPromise1((resolve, reject) => {
    setTimeout(() => {
        resolve('HI I will resolved after 3 seconds in Class MyPromise1')
    }, 3000);
});
c1.then(console.log);

const c2 = new MyPromise1((resolve, reject) => {
    setTimeout(() => {
        reject('HI I will rejected after 4 seconds in Class MyPromise1')
    }, 4000);
});
c2.catch(console.log);