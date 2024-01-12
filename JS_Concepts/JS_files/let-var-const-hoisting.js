/* 

! var

The var statement declares function-scoped or globally-scoped variables.
Default value is undefined.

Importantly, other block constructs, including block statements, try...catch, switch,
headers of one of the for statements, do not create scopes for var, and variables declared with var
inside such a block can continue to be referenced outside the block.

 A variable declared using var is added as a non-configurable property of the global object. 
 This means its property descriptor cannot be changed and it cannot be deleted using delete.
 Use the delete operator on a global variable does not have any impact.

 var statement always hoisted to the top of script block where it occurs.

 Re-declarations allowed with var. Duplicate variable declarations using var will not trigger an error, even in strict mode

 var declarations cannot be in the same scope as a let, const, class, or import declaration.

 A var declaration within a function's body can have the same name as a parameter.
*/

function fun1() {
    var name = 'js mount';
    console.log('print name inside fun1', name); // print name inside fun1 js mount
}
fun1();
// console.log('print name outside fun1', name); //ReferenceError: name is not defined


if (1 == 1) {
    var name2 = 'new js';
}
console.log('I am var from if block ', name2); // I am var from if block  new js

for (var forA = 1; forA < 3; forA++) {
}
console.log('var declared with for loop ', forA); // var declared with for loop  3

// delete operator example
function fun2() {
    var name = 'js mount';
    delete name; // no any impact
    console.log('print name inside fun2', name); // print name inside fun2 js mount
}
fun2();

// redeclare of var
function fun4() {
    var a = 1;
    var a = 2;
    console.log(a); // 2
    var a;
    console.log(a); // 2; not undefined
}

//! Hoisting

/* 
var declaration always processed before any code execution in script block.
Declaring a variable anywhere in the code is equivalent to declaring it at the top.
This also means that a variable can appear to be used before it's declared.
This behavior is called hoisting, as it appears that the variable declaration is moved to the top of the function, static initialization block, or script source in which it occurs.

Only a variable's declaration is hoisted, not its initialization.
The initialization happens only when the assignment statement is reached.
Until then the variable remains undefined (but declared).


*/

function fun3() {
    console.log('fun3 access var before declare', name3); // undefined
    name3 = 'name3';
    var name3;
    console.log('fun3 access var after declare', name3); // name3

}
fun3();

// this is exact same as above fun3 (and this is the way how js engine compile our code)
function fun3() {
    var name3;
    console.log('fun3 access var before declare', name3); // undefined
    name3 = 'name3';
    console.log('fun3 access var after declare', name3); // name3

}
fun3();

// in hoisting, initializer always comes later and overrides the value.
function fun5() {
    var a = 1;
    function a() { }
    console.log('there is a function same as var name', a); // 1
}
fun5();

// var declarations cannot be in the same scope as a let, const, class, or import declaration.

function fun6() {
    /* 
    var a = 1;
    let a = 2; // SyntaxError: Identifier 'a' has already been declared

    let b = 1;
    {
        var b = 1; // SyntaxError: Identifier 'b' has already been declared
    }
    */

    // below will work because let is in a child scope of var, not the same scope:
    var a = 1;
    {
        let a = 2;
    }
}
fun6();

//A var declaration within a function's body can have the same name as a parameter.

function fun7(a) {
    var a = 1;
    console.log('var name and parameter name is same', a);
}

fun7(2); // Logs 1

// Declaring and initializing two variables

function fun8() {
    var a = 0,
        b = 0;
    console.log(a, b);

    var a = "A";
    var b = a;
    console.log(a, b);

    var a, b = a = "A"; // this is exact same as the previous one.
    console.log(a, b);

    var x = y, y = "A";
    console.log(x, y); // undefined A :: at the of x = y; y was declare as undefined.

    var x = y = 1; // Declares x locally; declares y globally.
}
fun8();


//! let

/*
let are block-scoped local variables. (curly-brace scope)
let declarations cannot be re-declared in the same scope.
let variables can only be accessed after declaration.
You can reassign let variables.
let declarations are commonly regarded as non-hoisted.
let never be a part of global variables when declared at the top level of a script.
A let declaration within a function's body cannot have the same name as a parameter.


* temporal dead zone

A variable declared with let, const, or class is said to be in a "temporal dead zone" (TDZ) until
code execution reaches the place where the variable is declared and initialized.

The term "temporal" is used because the zone depends on the order of execution (time) rather than
the order in which the code is written (position).

*/


// code below works because, even though the function that uses the let variable appears before the variable is declared, the function is called outside the TDZ.
function fun9() {
    function a() {
        console.log(letVar); // letVar
    }
    let letVar = 'letVar';
    a();
}
fun9();

//* Understand temporal dead zone with lexical scoping

// outside variable 'a' is not available inside if because of lexical scoping (let a is present there already).
// The expression a + 10 throws a ReferenceError because initialization of let a has not completed — it is still in the temporal dead zone.
function fun10() {
    var a = 10;
    if (a) {
        let a = a + 10;
    }

}
// fun10(); // ReferenceError: Cannot access 'a' before initialization


//! Understand Shadowing (Legal shadowing)

/* Variable shadowing occurs when an inner scope declares a variable with the same name
 as an outer scope. This results in the inner scope's variable overriding the outer scope's
  variable and shadowing it. */

function fun12() {
    let a = 1;
    if (true) {
        let a = 2; // variable shadowing
        console.log('fun12', a); //2
    }
}
fun12();

//! Illegal Shadowing

// So, if we try to shadow let variable by var variable, it is known as Illegal Shadowing and it will give the error as “variable is already defined.”

function fun13() {
    /* 
    var a = 'I am var';
    let b = 'I am let';
     
    if (true) {
        let a = 'I changed to let'; // Legal Shadowing
        var b = 'I changed to var'; // Illegal Shadowing -- Identifier 'b' has already been declared
        console.log(a);
        console.log(b); // It will print error
    }
    
    */
}
fun13();  // This code will give compile errors thats why put all in commented.


//! const

/* 

The const declaration declares block-scoped local variables.
It also does not part of global variables.
const cannot be re-declared.
const value only available after its declaration.
It cannot be re-assign using assignment operator. 
Note: if a constant is an object, its properties can be added, updated, or removed.
const declarations are commonly regarded as non-hoisted.

An initializer for a constant is required. You must specify its value in the same declaration. (Why ? Because we cannot change its value further.)


@ Keep In mind:

The const declaration creates an immutable reference to a value. But it does not mean the value it holds is immutable — just that the variable identifier cannot be reassigned.

It means, const declarations is whose identity remains constant not "whose value remains constant".
*/

function fun11() {
    // const name; // SyntaxError: Missing initializer in const declaration

    const name1 = 'mohit';

    // name1 = 'Rohit'; -- TypeError: Assignment to constant variable.

    //const name1 = 'Rohit'; -- SyntaxError: Identifier 'name1' has already been declared

    const a = { name: 'john' };
    console.log(a);
    a.name = 'jack';
    console.log(a);
    a.id = '10101';
    console.log(a); // {name: 'jack', id: '10101'}

    // a = {}; -- TypeError: Assignment to constant variable.

    const b = 'I am b';
    if (true) {
        const b = 'I am b inside if'; //  Same const b declare again inside a if block
        console.log(b); // I am b inside if
    }
    console.log(b); // I am b

}
fun11();


function fun14() {

    // output will be 0 1 2
    for (var i = 0; i < 3; i++) {
        console.log('printing simple var I using for loop ', i);
    }

    // output will be 0 1 2
    for (let i = 0; i < 3; i++) {
        console.log('printing simple let I using for loop ', i);
    }

    // output will be 3 (3 times)
    // settimeout is async function, so this will be called 3 times after for loop finish.
    // last value of var i was 3 and same will be taken by settimeout each time.
    for (var i = 0; i < 3; i++) {
        setTimeout(() => {
            console.log('printing var using for loop inside settimeout', i);
        });
    }

    // output will be 0 1 2
    // here let have block level scope, so settimeout will take 0 1 and 2 value of i.
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            console.log('printing let using for loop inside settimeout', i);
        });
    }
}
fun14();