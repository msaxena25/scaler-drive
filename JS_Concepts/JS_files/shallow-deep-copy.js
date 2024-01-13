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
    const obj1 = { name: 'object 1' };
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

Deep copy creates an exact copy of the original object, including all its nested objects,
while shallow copy only creates copies of the top-level properties.


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


//! Polyfill of deep copy :: Write custom function to create deep copy.


// Taken one object that have primitive & non primitive both type of values.
// Primitive - number, string, boolean
// Non Primitive - object, array and function 

let person = {
    firstName: 'John',
    lastName: 'Doe',
    address: {
        street: 'North 1st street',
        city: 'San Jose',
        state: 'CA',
        country: 'USA',
    },
    sayHi: function () {
        console.log("cap, say's Hi");
    },
    friends: ["peter", "tony"],
    weapons: [
        { toolName: "myolnoer", origin: "Asgard" },
        { toolName: "shield", origin: "wakanda" }
    ],
    coordinates: [
        [2, 3],
        [7, 11]
    ]
};

// source will be either array type or object type.
function deepCopy(source) {
    const isArray = Array.isArray(source); // find type of given source 
    let target = isArray ? [] : {}; // based on type, create a target variable.

    // for in works for both object and arrays
    for (const key in source) {

        if (Array.isArray(source[key])) {
            // If source value is array type.
            let newArr = [...source[key]]; // create new array using spread

            // check each element of array
            // Now this can also contains nested objects, function, array etc..
            // so will call deep copy for this one.
            newArr.forEach((element, i) => {
                if (typeof element === 'object') {
                    newArr[i] = deepCopy(element); // recursive call for array, objects and update result in newArr
                }
            });
            target[key] = newArr;
        } else if (typeof source[key] === 'object') {
            target[key] = deepCopy(source[key]);

        } else {
            // If source value are function and primitive
            target[key] = source[key];
        }
    }
    return target;
}

const output = deepCopy(person);
console.log(output);


let comments = [
    { id: 1, text: 'I am first' },
    { id: 2, text: 'I am second' },
    { id: 3, text: 'I am third' },
    { id: 4, text: 'I am fourth' }
]

const output2 = deepCopy(comments);

output2.push({ id: 5, text: 'I am part of only output 2' });

console.log(comments);

console.log(output2); // its different from comments array

const emp = {
    name: 'Peter'
}

const emp1 = deepCopy(emp);
emp1.name = 'I am emp1';

console.log(emp); //{name: 'Peter'} -- name only changed in emp1 object

const school = {
    name: 'SVM',
    class: [
        { id: 1, className: '10th', subjects: ['Hindi', 'Math'] },
        { id: 2, className: '12th', subjects: ['English', 'Art'] }
    ],
    students: {
        1: { age: 20, name: 'Amit' },
        2: { age: 17, name: 'Rahul' }
    }
}

const school1 = deepCopy(school);
school.students[3] = { age: 22, name: 'Karan' };
school.class[1].subjects.push('Science');
school1.class[0].className = '11th';

console.log('school', school);
console.log('school1', school1);
