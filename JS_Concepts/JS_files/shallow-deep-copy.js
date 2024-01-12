function createCopyWithAssignment() {
    const obj1 = {
        name: 'hello',
    }

    const obj2 = obj1;

    console.log(obj1 === obj2); // true  -- means both are same. 

    const obj3 = {
        name: 'hello'
    }

    console.log(obj1 === obj3); // false --- both are different object

    obj2.name = 'sir';

    console.log(obj1); // {name: 'sir'}
    console.log(obj2); // {name: 'sir'}

    obj2.age = 20;

    console.log(obj1); // {name: 'sir', age: 20}
    console.log(obj2); // {name: 'sir', age: 20}


    let arr1 = [1, 2, 3, 4];

    let arr2 = arr1;

    console.log(arr1 === arr2); // true

    arr1.push(5);

    console.log(arr2); // [1, 2, 3, 4, 5]


    let a = 10;

    let b = a;

    console.log(a === b); // true

    b = 30;

    console.log(a); // 10 -- Here changing value of b don't have impact on value of a.
}


//! Shallow copy

/*

A shallow copy of an object is a copy whose properties share the same references.

when you change either the source or the copy, changes reflects into both places.


* In JavaScript, all standard built-in object-copy operations
* (spread syntax, Array.prototype.concat(), Array.prototype.slice(), Array.from(),
* Object.assign(), and Object.create()) create shallow copies rather than deep copies.

? For shallow copies, only the top-level properties are copied, not the values of nested objects.

Re-assigning top-level properties of the copy does not affect the source object.
Re-assigning nested object properties of the copy does affect the source object.

*/


//* Understand Object.assign :: Way to create shallow copy.

//? The assign method creates a new object. It takes two arguments. One is an empty object {} called target, and the second is some object.

function assign() {
    const obj4 = Object.assign(obj1); // here target is itself obj1 thats why changes are showing both places
    console.log(obj4 === obj1); // true;
    obj4.name = 'object 4';
    console.log(obj1, obj4); // changes both places.

    //? Correct way to use object.assign method

    const obj8 = { a: 1 };
    const obj9 = Object.assign({}, obj8);
    console.log(obj8 === obj9); // false;
    obj9.a = 10;
    console.log(obj8, obj9);
}
assign();

//* Shallow copy using spread operator 

// The spread operator(…) creates a new object. 

function shallowCopyWithSpread() {
    console.log('shallowCopyWithSpread');
    const a = {
        name: 'hi'
    }
    const b = { ...a };
    console.log(a === b); // false
}
shallowCopyWithSpread();


//* Understand Object.create method

// The Object.create() static method creates a new object, using an existing object.
function objectCreate() {
    const obj5 = {
        number: '9898989'
    }
    const obj6 = Object.create(obj5);
    console.log(obj6 === obj5); // false;
    console.log(obj6.number); // 9898989

    obj6.number = 1010101;

    // changing obj6 does not have impact on obj5.
    console.log(obj5, obj6); // {number: '9898989'}  {number: 1010101}

    obj5.number = 9999;
    console.log(obj5, obj6); // will not impact on obj6;
}
objectCreate();


//! Shallow copy does not work correctly with nested objects. 
//? To handle such cases we use deep copy.

function shallowWithNested() {
    console.log('shallowWithNested')
    const obj1 = {
        a: 1,
        b: { c: 2 }
    }
    const obj2 = Object.assign({}, obj1);

    console.log(obj1 === obj2); // false

    obj2.a = 10;
    obj2.b.c = 15;

    console.log(obj1, obj2); // both object have value of c is 15.
}
shallowWithNested();


//! deep copy

/*

A deep copy of an object is a copy whose properties do not share the same references.

when you change either the source or the copy, will not change each other.

One way to make a deep copy of a JavaScript object, if it can be serialized, is to use JSON.stringify()
to convert the object to a JSON string, and then JSON.parse() to convert the string back into a
(completely new) JavaScript object:

*/

function deepCopyWithNested() {
    console.log('deepCopyWithNested')
    const obj1 = { a: 10, b: { c: 20 } };
    const obj2 = JSON.parse(JSON.stringify(obj1));

    console.log(obj1 === obj2); // false

    obj2.b.c = 100;
    console.log(obj1, obj2); // working perfect. value of c only changed in obj2.
}
deepCopyWithNested();