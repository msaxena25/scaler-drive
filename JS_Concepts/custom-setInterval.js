//! Create Custom set interval with the help of set timeout

//! Polyfill of setInterval with the help of setTimeout

console.log('Understand custom set interval');

/*
1. SetInterval method takes two arguments, First is Callback and second is timer.
2. So on same pattern we will create a custom method.
3. Our approach is to call settimeout inside function in recursive manner.
4. Create inner function and inside that execute cb(), and then call again same inner function with in settimeout.
5. For first time execution call settimeout direct with inner function as a callback.
6. Also add config object to clear interval.
7. You can customize with more feature to add into this config object.
8. return config object from main method.


*/


function customInterval(cb, interval) {
    let config = {
        flag: true
    }
    function innerFn() {
        if (config.flag) {
            cb();
            setTimeout(innerFn, interval);
        }
    }
    setTimeout(innerFn, interval);
    return config;
}
function clearCustomInterval(timerId) {
    timerId.flag = false;
}

const callback = function () {
    console.log('Hi I am callback of custom set interval', Date.now());
}

const timer = customInterval(callback, 1000);


setTimeout(() => {
    console.log('timer cleared')
    clearCustomInterval(timer);
}, 8000);