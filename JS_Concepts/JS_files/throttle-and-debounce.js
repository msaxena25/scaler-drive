/*

When you want an event to happen only once in an interval and only first event is used.

- Throttle function takes two arguments, first is function and second is a delay time.
- It returns a function, means it forms a Closure.
- Inner function takes arguments which are required to execute callback.
- Now run passed function and set wait variable as true.
- Apply a check for wait variable and if it is true then stop next all calling same event.
- mark this wait variable to false inside settimeout web api with passed delay time.
- And once its become false, it is ready to take next event.

*/


/* 
We can not make this as normal function, it must be form of closure means we need to create inner function.
We can do our algo inside this inner function only.
Wait variable should persist for all calling events. So to make it available for all calling, we will take this outside inner function.


function throttleFn(innerFn, interval) {
    let wait = false;
    if (wait) {
        return;
    }
    innerFn();
    wait = true;
    setTimeout(() => {
        wait = false;
    }, interval);
} */

function throttleFn(innerFn, delay) {
    let wait = false;
    return function (...args) {
        if (wait) {
            console.log('waiting stage, cannot process further events.');
            return;
        }
        innerFn(...args);
        wait = true;
        setTimeout(() => {
            wait = false;
            console.log('wait over, I am ready to process new event');
        }, delay);
    }
}

// Requirement - User can apply coupon one time only in a specific time interval. 

let productValue = 100;
function apply20Coupon(discount) {
    console.log("New price", productValue - (productValue * discount) / 100);
}


// coupon function is first parameter and timer is second parameter.
const fn = throttleFn(apply20Coupon, 2000);

fn(20); // will print new price
setTimeout(() => {
    fn(20); // waiting stage, cannot process further events.
}, 1000);
setTimeout(() => {
    fn(20); // waiting stage, cannot process further events. // wait over, I am ready to process new event
}, 1500);
setTimeout(() => {
    fn(30); // will print new price
}, 2000);

/******************************** Debounce ******************************************************* */

/*

- debounce function makes sure that your code is only triggered once per user input.
- debounce limits the rate at which a function gets invoked.
- It ensure that time-consuming tasks do not fire so often.
- When we want limit the key strokes for which We have to call some action.

In simple words Debounce is When we have a event or api calling on every key press or user input, then it hits that event only when User stops typing.

Diff between Debounce & Throttle -  

Debounce process last event and Throttle process first event.
Debounce wait till User stops providing input & then hit event, Throttle first hit event and then wait till provided wait period.

*/

function debounce(fn, delay) {
    let timerId = null;
    return function (...args) {
        if (timerId) {
            clearInterval(timerId);
        }
        timerId = setTimeout(() => {
            fn(...args);
        }, delay);
    }
}

function printHello() {
    const d = new Date();
    console.log("hello, I am debouncing, time is - ", d.getMilliseconds());
}
const debouncedPrintHello = debounce(printHello, 1000);

// Here we are firing events constantly so only last one will be fired, rest all will be ignored.
debouncedPrintHello();
debouncedPrintHello();
debouncedPrintHello();

// This event is fired after some delay so it will consider.
setTimeout(() => {
    debouncedPrintHello();
}, 1000);
