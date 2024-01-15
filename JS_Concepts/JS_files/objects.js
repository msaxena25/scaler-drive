//! Object Literal (1st way to create object)

/* 
Objects are created with collection of key value pair enclosed in curly braces.

const object1 = { a: 'foo', b: 42, c: {} };

const object = {}; -- An empty object with no properties

@ Lets see output of object literal


- Object literals gives us properties and methods.
- It also give us a Parent as Prototype.

*/

const object1 = { a: 'foo', b: 42, c: {} };

console.log(object1);
console.log("👉  object1.prototype:", object1.prototype); // undefined because this is an object
console.log("👉  object1.__proto__:", object1.__proto__); // Object (because __proto__  available on object instance)
console.log("👉  object1.__proto__.a:", object1.__proto__.a);  //undefined
console.log(object1.toString()) // [object Object]
console.log(object1.hasOwnProperty('a')) // true 

/* 
Log output - 

a: "foo"
b: 42
c: {}
[[Prototype]]: Object
*/

//* duplicate property

// When using the same name for your properties, the second property will overwrite the first.

const a = { x: 1, x: 2 };
console.log(a); // {x: 2}



//! 2.  2n way of creating object.create.

let obj3 = Object.create(object1); // creating from another object
console.log("👉  obj3.prototype:", obj3.prototype); // undefined
console.log(object1 == obj3); // false
console.log(obj3.toString()); // [object Object] -- all methods works here

//* An object with a null prototype doesn't inherit any object methods from Object.prototype.

let nullObj = Object.create(null); // create an object with null as prototype
nullObj.newProp = "Hello";
console.log("👉 ~ nullObj:", nullObj);

// console.log(nullObj.toString()); // TypeError: newObj.toString is not a function
// console.log(nullObj.hasOwnProperty('newProp')) // TypeError: nullObj.hasOwnProperty is not a function


//? Declared Object with null will not inherit any methods from Object parent. so Cannot apply any method on them.
//? While creating with literal syntax, will inherit Object as prototype.


//*  Object.create method by passing object


let obj2 = Object.create({ a: 1, b: 2, c: 3 });
console.log("👉  obj2:", obj2);
console.log("👉  obj2.toString():", obj2.toString());

//! Deleting a property from an object

// one must use the delete operator.


//! Object.defineProperty

// Object.defineProperty is used to add extra details of the property.
// Object.defineProperties - add multiple properties at once.

const obj4 = {};
Object.defineProperties(obj4, {
    "key1": {
        value: "dynamic",
        enumerable: true, // default is false
        configurable: true, // default is false
        writable: true, // default is false
    },
    "key2": {
        enumerable: false,
        configurable: false,
        writable: false,
        value: "static",
    }
}
);

//@ Writable 

obj4.key1 = 'key 1 changing'; // ok
console.log("👉  obj4.key1:", obj4.key1); // key 1 changing

obj4.key2 = 'key 2 changing'; // no effect because we added writable as false.
console.log("👉   obj4.key2:", obj4.key2); //static

//@ Configurable

delete obj4.key2; // no effect because property is configurable false.
console.log("👉   obj4.key2 after delete:", obj4.key2); // static


//@ enumerable

// Enumerable properties does not become a part of Object.assign, spread operator, for..in loop and Object.keys().

const obj5 = { ...obj4 }; // key2 will not come into obj5
console.log("👉  obj5:", obj5); // {key1: 'key 1 changing'}


console.log("👉  Object.keys(obj4):", Object.keys(obj4)); // ['key1']



//! Object.freeze()
// Freezes an object. Other code cannot delete or change its properties.

//! Object.getOwnPropertyNames()
// return an array with all properties keys.
// If you want only the enumerable properties, use Object.keys()

console.log("👉  Object.getOwnPropertyNames(obj4):", Object.getOwnPropertyNames(obj4)); // ['key1', 'key2']


//! Object.hasOwn()
// Object.hasOwn() is a replacement for Object.prototype.hasOwnProperty().
// return true if property exists.

//! Object.entries()
// return key value pair as an array of enumerable properties.

console.log("👉  Object.entries(obj4):", Object.entries(obj4)); //['key1', 'key 1 changing']


//! Inheritance


/* 

JavaScript implements inheritance by using objects. 
Each object has an internal link to another object called its prototype.
The Prototype also have its own prototype and so on until an object is reached with null as its prototype.
null has no prototype and acts as the final link in this prototype chain.


? Inheritance for inbuilt types

* Non Primitives 

array - parent is Array
object - parent is Object
function - parent is Function

means array inherits all properties and method of its parent Array, same for objects.


* Primitives

string
number
boolean

Primitives does not have prototypes. Means no parent but still have some methods.

? So how methods appeared for primitives data types?

Auto-boxing is a process to covert primitive type to the type object.

Primitive is typecast as a children of there respective parent class and then that method is applied on that primitive. And because
of this boxing process, we are able to access methods on primitives types.
*/

function fun1() {
    console.log('fun1');
}
console.log("👉  fun1.prototype:", fun1.prototype); // prototype is constructor function.

const str = 'I am string';
console.log("👉  str.prototype:", str.prototype); // undefined because primitives don't have any Prototype.

// literal string have method because of auto boxing.
console.log("👉  str.charAt(3):", str.charAt(3)); // m
console.log("👉  str.includes('am'):", str.includes('am')); // true


//* Now lets create string using String object.

const str1 = new String('I am string created with String object');
console.log("👉  str1.prototype:", str1.__proto__); // String (parent)

/*
! __proto__ vs prototype

The difference between `__proto__` and `prototype` is simple:
`__proto__` is a property of an object instance, while `prototype` is a property of a constructor function.

*/

var arr = [1, 2, 3, 4, 5];
console.log('arr.prototype', arr.prototype) // undefined
console.log('arr.proto', arr.__proto__) // Object


//! Who is parent of every object?

// Answer is null, not object.

// array > Array > Object > null


//! 3rd way - Using a constructor function

function Person(name, age) {
    this.name = name;
    this.age = age;
    this.sayHi = function () {
        console.log(`I am ${this.name} and ${this.age} years old`);
    }
}

/*
! new vs without new

- When you create an object with new, this refers to that object.
- but if create object without new, this refers to window object & and those function works like
 normal function. It returns undefined if you don't return anything from them.
*/


const person1 = new Person("Mohit", "Saxena");
const person2 = new Person("Rohit", "Saxena");
console.log("👉  person2:", person2); // Person {name: 'Rohit', age: 'Saxena', sayHi: ƒ}

const person3 = Person("John", "Kely");
console.log("👉  person3:", person3); //undefined -- because nothing is returning

//! Inheritance in constructor function

function Animal(breed) {
    this.breed = breed;
    this.getBreed = function () {
        return this.breed;
    }
}

function Dog(name, breed) {
    this.name = name;
    Animal.call(this, breed); // way of inheritance
}
const d = new Dog('tiger', 'Bulldog');
console.log("👉  d.prototype:", d.prototype); // undefined because this is an object
console.log("👉  d.getBreed():", d.getBreed()); //Bulldog


//! 4th way using Class

// Class is nothing just a syntactic sugar of constructor function.

class Person1 {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    sayHI() {
        console.log(`I am ${this.name} and ${this.age} years old`);
    }
}

//* inheritance using extend keyword

class SuperHuman extends Person1 {
    constructor(name, age) {
        // it call's constructor of the parent 
        super(name, age)
    }
    sayHI() {
        console.log(`I am super Human and ${this.name} years old`);
    }
}
const superOne = new SuperHuman("Jack", 25);
console.log(superOne);
superOne.sayHI();


//! Polyfill of Object.create

// First see flow of object.create

let obj6 = { a: 1, b: 2, getC: function () { return this.c; } };
let obj7 = Object.create(obj6);
console.log("👉  obj7.b:", obj7.b);  // 2
console.log("👉  obj7.getC():", obj7.getC()); // undefined because obj6 or obj7 both don't have property c

obj7.c = 'I am c'; // now add c property in obj7
console.log("👉  obj7.getC() after assigning value:", obj7.getC()); // I am c

console.log("👉  obj6.getC():", obj6.getC()); // undefined because c is in obj7 not in obj6.

//* now create own Object.create

// using spread operator
function myObjectCreate(proto) {
    if (!proto || typeof proto != 'object') {
        throw Error('object is incorrect');
    }
    return { ...proto };
}

//myObjectCreate(null); // objects.js:314 Uncaught Error: object is incorrect

const obj8 = myObjectCreate(obj6);
console.log("👉  obj8:", obj8);

// another way using constructor function
function myObjectCreate1(proto) {
    if (!proto || typeof proto != 'object') {
        throw Error('object is incorrect');
    }
    function F() { }
    F.prototype = proto;
    return new F();
}
const obj9 = myObjectCreate(obj6);
console.log("👉  obj9:", obj9);




/*********************** */

//! changing prototype and see output

function A() { }
function B() { }

A.prototype = B.prototype = {};
console.log(A.prototype, B.prototype);

const objA = new A();
console.log("👉  objA instanceof B:", objA instanceof B); // true

//! adding external method using prototype

function Func1(name) {
    this.name = name;
}
Func1.prototype.printName = function () {
    console.log('name', this.name);
}
const fun1Obj = new Func1('Ram');

fun1Obj.printName(); // Ram
fun1Obj.__proto__.printName(); // undefined
Object.getPrototypeOf(fun1Obj).printName(); // undefined
//fun1Obj.prototype.printName(); -- TypeError: Cannot read properties of undefined (reading 'printName') (object does not have prototype)


