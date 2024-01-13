console.log('****************** CONSOLE OUTPUT *****************************************')

let cap = {
    name: 'Js',
    printName: function () {
        console.log('My Name is ', this.name);
    }
}

// here this represent cap object
cap.printName(); // My Name is  Js

let c = cap.printName;
// Here this is window object
c();  // My Name is

//**** */

let cap1 = {
    name: 'Js',
    printName: () => {
        console.log('My Name is ', this.name);
    }
}

// here we have used arrow function, so this will be window object for both cases

cap1.printName(); // My Name is

let c1 = cap1.printName;
c1();  // My Name is

//**** */

//! Implement Array last method to return last element of array


// When you want a feature on all the children of a data types, Add that feature to Parent's prototype. 

const arr = [2, 3, 4, 5];
const arr1 = [];

Array.prototype.last = function () {
    console.log(this) // this will refer to array
    return this.length ? this[this.length - 1] : -1;
}
console.log(arr.last())
console.log(arr1.last())

/********* */

//! check call by ref

// When we take array or object as a parameters and alter these values inside function, they its update also goes in actual input arguments.
// Actual arguments only effect in case of values changes not new value assignment.

// assigning new values will not impact on actual values.
function modifier(a, b) {
    a = 10;
    b = 20;
}
let p = [1, 2, 3]; let q = [4, 5, 6];
modifier(p, q);
console.log(p, q); // [ 1, 2, 3 ] [ 4, 5, 6 ]


// altering data of input parameters
function modifier1(a, b) {
    a.push(12)
    b.pop();
}
modifier1(p, q);
console.log(p, q); // [ 1, 2, 3, 12 ] [ 4, 5 ]

// assignment
function modifier2(a) {
    a = { c: 20 };
}

let r = { q: 1 };
modifier2(r);
console.log(r); //{ q: 1 }

// alter
function modifier3(a) {
    a.d =  40;
}
modifier3(r);
console.log(r); //{ q: 1, d: 40 }



