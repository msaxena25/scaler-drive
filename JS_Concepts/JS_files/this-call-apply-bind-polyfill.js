/*

! Method call and function call ?

When we call a method with prepend calling object (using dot . operator) then it is called method call.
And when we call without any prepend object, then it is function call.
*/

const hello = {
    name: 'I am JS',
    printName: function () {
        console.log('Hey! ', this.name);
    }
}

// This is method call because we are calling printName with hello object.
hello.printName();

// Here we are storing address of printName into some variable.
// And we are calling h without any prepend object so this is function call.
const h = hello.printName;
h();

/*

! Rules for this

For Global Execution context (GEC) this will be a window object.
For Execution context (EC) created with method call(calling with object), this will be that object.
For Execution context created with a function call(calling without object), this will be window object.
*/

/*

!Host objects

Objects that are provided by the environment are known as host objects. Examples of host objects in the browser are window, document, local storage, etc.
Examples of host objects in nodejs are global, os, process, etc. Host objects are dependent on the environment.

!Native objects

Objects that are provided by the language are known as host objects. Examples of native objects are date, JSON, etc.

*/

//! Understand memory allocation for let and var

let var1 = "I am let";
var var2 = "I am var";
console.log("Test me ", this);
// this.var2 ==>   I am var
// this.var1 ==>   undefined

// In the global execution context, var will go to the global object. And let will go script object.

//! method call / function call with normal function and arrow function

let cap = {
    firstName: "JSMount",
    sayHi: function () {
        console.log("sayHi ", this.firstName);
        const iAmInner = function () {
            console.log("iAmInner ", this.firstName);
        }
        iAmInner();
    }
}
cap.sayHi(); // sayHi JSMount iAmInner undefined

// We are calling sayHi() with cap object, so this is method call. So 'this' will be cap object.
// Now inside 'this' when iAmInner() is called. Then this will be a window object as it is a function call.


//@ Check with arrow function

//! Arrow function does not have its own this. Arrow function uses this from outside.

let cap1 = {
    firstName: "Mohit",
    sayHi: function () {
        console.log("sayHi ", this.firstName);
        const iAmInner = () => { // this is arrow function
            console.log("iAmInner arrow fn ", this.firstName);
        }
        iAmInner();
    }
}
cap1.sayHi(); // sayHi Mohit iAmInner arrow fn Mohit

// cap1.sayHi() is method call so 'this' will be cap object.
// Inside sayHi, iAmInner is arrow function and does not have its own this. So it will go to sayHi() to get their this.

//@ Another example

let cap3 = {
    firstName: "JSMount",
    sayHi: () => {
        console.log("sayHi is arrow ", this.firstName);
        const iAmInner = () => {
            console.log("isAmInner is arrow ", this.firstName);
        }
        iAmInner();
    }
}
cap3.sayHi();
// sayHi is arrow  undefined
// isAmInner is arrow  undefined

// cap3.sayHi() is method call but sayHi is arrow function that does not have its own this. So it will move outer to access this. And outer is window.
// iAmInner is also arrow function so it will move outer to get this. Outer is sayHi for iAmInner and sayHi also is arrow function so will move again to outer side and that is window scope.


//! Understand call, apply and bind

//@ call - Borrowing a method from the object & use for another object.

let animal = {
    prefix: 'Animal name is ',
    printAnimal: function (animalName) {
        console.log(this.prefix, animalName);
    }
}

animal.printAnimal('Elephant')
animal.printAnimal('Horse');

// This is another object which has only prefix and no any printAnimal method. So to print animal name, it will borrow method from animal object using call.
let prefix = {
    prefix: 'This is my Pet animal '
}

animal.printAnimal.call(prefix, 'Dog');
animal.printAnimal.call(prefix, 'Cow');


//@ apply - Apply is also used to borrow function but for n number of parameters.

// In Apply we pass parameters in the form of an array.

//Use-case - When we are not aware of a number of parameters then we use apply.

let animal1 = {
    prefix: 'Animal name is ',
    printAnimal: function (...animalName) {
        console.log(this.prefix, ...animalName);
    }
}

animal1.printAnimal('Lion', 'Tiger', 'Elephant', 'Monkey');

animal1.printAnimal.apply(prefix, ['Dog', 'Cat', 'Cow', 'Rabbit']);


/*
! Difference between Rest parameter and spread operator

* Both syntax are same and that is ...

Rest -> when you are collecting the parameters, is used as function parameter.

function (...animalName) ==> This is rest parameter.

Spread -> when you are spreading an array/obj in individual elements , when you use it inside a fn.

console.log(...animalName); ===> This is spread operator.

*/


//@ bind

/*
Copies the function that you call later with the same this.
When we want to use the method multiple times.
 */

const animalBoundFn = animal.printAnimal.bind(prefix);

// bind return a function and that is called bound function.
// we can call this bound function several times with different parameters and with same this object.

animalBoundFn('Deer');
animalBoundFn('Crocodile');


/*
! OOPS followed by JS

JS follows prototypal OOPS.

let arr = [1, 2, 3, 4];

console.log(typeof arr); //print object

As the type of arr is an object, it has some parent object also.
arr has parent - Array.
Array has all the methods required by every array. Parent of Array is Object.

* So everything starts from an Object and it has children like Array which will inherit all the properties of Object, and it can have its property.

* When we create an array [], then it has all the properties of its parent i.e. Array and grandparent i.e. Object.

@ toString() method of object class.

let arr = [1, 2, 3, 4];
console.log(arr.toString()); // prints 1,2,3,4


*/

//! How to check given variable is array or not?

console.log(Array.isArray([1, 2])); // true

console.log(Array.isArray({})); // false



//! Polyfill of call, apply and bind.

// Means Create custom own call, apply & bind method.

// This house object have its own method createHouse.
const house = {
    address: 'Mumbai',
    createHouse: function (owner) {
        console.log('my house in', this.address, ' and Owner of this house is', owner);
    }
}

house.createHouse('John');

// This house1 object have address property but does not have any method to create house.
// So this can borrow method from house object to create house using 'call'.
const house1 = {
    address: 'Delhi'
}

// house.createHouse.call(house1); // my house in Delhi

//* Now create same own 'call' method

/**
 * 
 * @param {*} obj - An object that does not have method and want to borrow it from other object.
 * @param  {...any} args - these are arguments which are required in that method.
 */
Function.prototype.myCall = function (obj, ...args) {
    //console.log(this); // 'this' will represent that method on which call is applied. Here createHouse is that method.

    // So now we can add temp method into our object.
    obj.temp = this;
    obj.temp(...args); // finally call our method.
    delete obj.temp; // at last delete that newly added method. If we don't delete this, it will persist.
}

house.createHouse.myCall(house1, 'Jack');



//* Create own apply method

Function.prototype.myApply = function (obj, args) {
    obj.temp = this;
    obj.temp(...args); // finally call our method.
    delete obj.temp;
}
const h1 = { address: 'London' };
house.createHouse.myApply(h1, ['Mack']);

// h1.temp('stark'); --- h1.temp is not a function (But If we don't delete temp from object then this will be available here.)


//* Create own bind method

// bind method returns a bound function.

Function.prototype.myBind = function (obj) {
    // we have to keep 'this' inside a variable. Because inside boundFn this will be different (window).
    let tempMethod = this;

    function boundFn(...args) {
        // console.log(this); // this is window not same as above this.
        obj.temp = tempMethod;
        obj.temp(...args); // finally call our method.
        delete obj.temp;
    }
    return boundFn;
}
let h3 = { address: 'London' };
const bound = house.createHouse.myBind(h3);
bound('Mike');