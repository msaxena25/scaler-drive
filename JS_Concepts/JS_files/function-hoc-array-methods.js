/*
MDN LINK -
@ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#function_parameters


- Functions are one of the fundamental building blocks in JavaScript.
- A function is similar to a procedure — a set of statements that performs a task.
- It take some input and return an output.

! Function declarations

- A function declaration also called a function definition, or function statement.
- They have function keyword followed by function name.
- Function declaration can be hoisted.

function square(number) {
  return number * number;
}


! Function expressions

- Such a function can be anonymous; it does not have to have a name. (However, a name can be provided with a function expression)

const square = function (number) {
  return number * number;
};

const factorial = function fac(n) {
  return n < 2 ? 1 : n * fac(n - 1);
};


! Nested function (Closure)

- You may nest a function within another function. 
- The nested (inner) function is private to its containing (outer) function.
- The inner function contains the scope of the outer function & can "inherit" the arguments and variables of its containing function. And that is called Closure.

*/

// The following example shows nested functions and forming a closure.

function addSquares(a, b) {
    function square(x) {
        return x * x;
    }
    return square(a) + square(b);
}

console.log(addSquares(2, 3)); // 13


// This is returning inner function.
function outside(x) {
    function inside(y) {
        return x + y;
    }
    return inside;
}

const fnInside = outside(3); // Think of it like: give me a function that adds 3 to whatever you give it
console.log(fnInside(5)); // 8


//! Closures

/*

JavaScript allows for the nesting of functions and grants the inner function full access 
to all the variables and functions defined inside the outer function.

NOTE: Also, since the inner function has access to the scope of the outer function, 
the variables and functions defined in the outer function will live longer than the duration of 
the outer function execution.

*/

//! Default Parameters

// If forgot to pass parameter b, it will return NaN.
// To solve this put extra check inside function to check parameters are defined.
function multiply(a, b) {
    return a * b;
}

console.log(multiply(10)); // NaN

//* With default parameters, a manual check in the function body is no longer necessary. You can put 1 as the default value for b in the function head.

function multiply1(a, b = 1) {
    return a * b;
}

console.log(multiply1(10)); // 10


//! Higher Order function

// Higher order functions are functions that take one or more functions as arguments, or return a function as their result.
// There are several different types of higher order functions like map and reduce.



function sum(args) {
    let result = 0;
    for (let i = 0; i < args.length; i++) {
        result += args[i];
    }
    return result;
}

function mul(args) {
    let result = 1;
    for (let i = 0; i < args.length; i++) {
        result *= args[i];
    }
    return result;
}

const res = sum([1, 2, 3, 4, 5, 6]);
console.log(res)

const res1 = mul([1, 2, 3, 4, 5, 6]);
console.log(res1)



/* 

In above, sum & mul function are doing most of same thing on input data, just one logic change.

? So by Using HOC we can simplify this code.

Create a main function like a modular function.
That function will accept all input parameter with last parameter a function (known as callback function).
Go through all input data.
Apply that passed function where operation is happening.

* Diff between Normal function and HOC function

- Functions are like set of some statement that executes one by one like a procedure and return result.
- Written operation are same for each set of input values. (we cannot change operation on fly).
- So they generally can perform a single task. Like we have seen above sum and mul functions.

- HOC functions can perform multiple operations.
- We can pass our logic or operation function to them to execute & produce result.
- This can help speed up the development process and provide legibility (clear) of code.


*/

function calculator(args, fn) {
    let result = 0;
    for (let i = 0; i < args.length; i++) {
        result = fn(args[i], result);
    }
    return result;
}

function sumFn(value, result) {
    return value + result;
}
function mulFn(value, result) {
    return value * (result || 1); // initially when result comes to 0, then take this 1.
}

console.log(calculator([1, 1, 2], sumFn))
console.log(calculator([2, 2, 3], mulFn))

//* Another example of calculate area and diameter in single code.

// a reusable function to calculate area, diameter, etc
const calculate = function (radiusArr, logicFn) {
    const output = [];
    for (let i = 0; i < radiusArr.length; i++) {
        output.push(logicFn(radiusArr[i]))
    }
    return output;
}
// logic to calculate area
const areaFn = function (radius) {
    return Math.PI * radius * radius;
}
// logic to calculate diameter
const diameterFn = function (radius) {
    return 2 * radius;
}
const radius = [1, 2, 3];
console.log(calculate(radius, areaFn));
console.log(calculate(radius, diameterFn));


//! Array.prototype.reduce()  - also a Higher Order function


/*

- reduce method of array takes a callback function (reducer function) and executes this on each element of array.
- Final result of running the reducer across all elements of the array is a single value.


Syntax : reduce(callbackFn, initialValue)

Callback function or reducer function have  - 

@ (previousValue: number, currentValue: number, currentIndex: number, array: number[]) => number

@ initialValue ->

If we don't pass initialValue, the array element at index 0 is used as the initial value
and iteration starts from the next element (index 1 instead of index 0).

*/

let arr1 = [2, 3, 4, 5];

const output = arr1.reduce((previousValue, currentValue) => {
    console.log(previousValue, currentValue)
    return previousValue + currentValue;
});
console.log('sum by reduce', output)

/*
Logs -  (total iteration are 3 because we did not pass initial value.)

2 3
5 4
9 5
sum by reduce 14

*/

const output1 = arr1.reduce((previousValue, currentValue) => {
    console.log(previousValue, currentValue)
    return previousValue * currentValue;
}, 1);

console.log('mul by reduce', output1)

/*
Logs -  (total iteration are 4 because we passed initial value as 1.)

1 2
2 3
6 4
24 5
mul by reduce 120
*/

//@ Simplify of above reduce function in one line

arr1.reduce((previousValue, currentValue) => previousValue * currentValue, 1);



//! Polyfill of reduce method :: Our own custom reduce method

Array.prototype.myReduce = function (callbackFn, initialValue) {
    const startIndex = initialValue ? 0 : 1; // start index of array depend on initial value passed or not.
    let result = initialValue || this[0]; // this will represent array.
    for (let i = startIndex; i < this.length; i++) {
        result = callbackFn(result, this[i]);
    }
    return result;
}

const a = [2, 3, 4];
const aRes = a.myReduce((previousValue, currentValue) => previousValue + currentValue);
console.log('check custom reduce method ', aRes);


//! Array sort method with custom sort function

/*

- The default sort order is ascending, built upon converting the elements into strings, 
  then comparing their sequences of UTF-16 code units values.
- It mutate or change the original array.

sort()
sort(compareFn)

? compareFn

- A function that defines the sort order.
- The return value should be a number whose sign indicates the relative order of the two elements.
- negative if a is less than b.
- positive if a is greater than b.
- and zero if they are equal.

* Pseudo code

function compareFn(a, b) {
  if (a is less than b by some ordering criterion) {
    return -1;
  } else if (a is greater than b by the ordering criterion) {
    return 1;
  }
  return 0; //a must be equal to b
}


*/




function sortLibrary(library) {
    // sort by name
    library.sort((a, b) => {
        const titleA = a.title.toUpperCase(); // ignore upper and lowercase
        const titleB = b.title.toUpperCase(); // ignore upper and lowercase
        if (titleA < titleB) {
            return -1;
        }
        if (titleA > titleB) {
            return 1;
        }
        // titles must be equal
        return 0;
    });
}

const input = [
    { author: 'Bill Gates', title: 'The Road Ahead', libraryID: 1254 },
    { author: 'Steve Jobs', title: 'Walter Isaacson', libraryID: 4264 },
    { author: 'Suzanne Collins', title: 'Mockingjay: The Final Book of The Hunger Games', libraryID: 3245 }
]

sortLibrary(input);
console.log(input)


//! Array toSorted() method

// This is also a sorting method.
// It returns a new array with the elements sorted in ascending order.
// It creates shallow copy of real array.

const months = ["Mar", "Jan", "Feb", "Dec"];
const sortedMonths = months.toSorted();
console.log(sortedMonths); // ['Dec', 'Feb', 'Jan', 'Mar']
console.log(months); // ['Mar', 'Jan', 'Feb', 'Dec']