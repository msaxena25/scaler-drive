console.log('****************** CONSOLE OUTPUT *****************************************')

let cap = {
    name: 'Js',
    printName: function() {
        console.log('My Name is ', this.name);
    }
}

// Calling like this, here this represent cap object
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

const arr = [2,3,4,5];
const arr1 = [];

Array.prototype.last = function() {
    console.log(this) // this will refer to array
    return this.length ? this[this.length - 1] : -1;
}
console.log(arr.last())
console.log(arr1.last())

