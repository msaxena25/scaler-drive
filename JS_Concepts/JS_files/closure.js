/*


! Lexical scoping


For every code block, a lexical environment is created which keeps local variable data and 
a reference to parent's lexical environment. 


In JavaScript, lexical scope determines the scope of a variable based on its declaration, not by the block of code in which it is used.


function func1() {
    var name = 'hello';
    console.log('access var within scope', name); // ok
}
console.log('access var outside scope', name); // Will give error

-- we are trying to use name variable outside function but it gives error because scope of a variable is determined by the block of code in which it is declared.


! Closure

JavaScript allows for the nesting of functions and grants the inner function full access 
to all the variables and functions defined inside the outer function.

NOTE: Also, since the inner function has access to the scope of the outer function, 
the variables and functions defined in the outer function will live longer than the duration of 
the outer function execution.

*/

//* Accessing outer function variable in inner function - 

/* 
function init have a local variable 'name' that creates lexical env.
function displayName have local variable 'secondName' that also creates its own lexical env. 
But inner function displayName also have reference of its parent lexical env.
Thats why it is able to access variable of its parent function.

So that is known lexical scoping.

*/

function init() {
    var name = "I am var of init"; // name is a local variable created by init
    function displayName() {
        // displayName() is the inner function, that forms the closure
        var secondName = 'I am var of displayName';
        console.log(name + ' ' + secondName); // use variable declared in the parent function
    }
    displayName();
}
init();


//! Function returns function

function makeAdder(x) {
    return function (y) { // returning inner function.
        return x + y;
    };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(2)); // 7
console.log(add10(2)); // 12

/* 
We can call makeAdder function as factory function because it creates function. 
add5 and add10 both form closures. 
They share the same function body definition, but store different lexical environments. 
In add5's lexical environment, x is 5, while in the lexical environment for add10, x is 10.
*/

//? Closures are useful because they let you associate data (the lexical environment) with a function that operates on that data. 


//! Closures - useful to Private variables and methods.

function counter() {
    let value = 0; // private variable (not accessible outside)
    function changeValue(newValue) { // private method (not accessible outside)
        value += newValue;
    }

    const increment = function () {
        changeValue(10);
    }
    const decrement = function () {
        changeValue(-1);
    }

    const finalValue = function () {
        return value;
    }

    // exposing required methods only.
    return {
        increment, decrement, finalValue
    }
}

const c = counter();
console.log('starting value', c.value); // undefined
// c.changeValue(); // TypeError: c.changeValue is not a function
c.increment();
c.decrement();
console.log(c.finalValue()); // 9

/*

In previous example of makeAdder function, each closure had its own lexical environment.

Here is a single lexical environment that is shared by the three functions: c.increment, c.decrement, and c.finalValue.

The lexical environment contains two private items: a variable called value, and a function called changeValue. 
You can't access either of these private members from outside the anonymous function.


Those three public functions form closures that share the same lexical environment. 
Thanks to JavaScript's lexical scoping, they each have access to the value variable and the changeValue function.

*/


//! Output of below program?

function outer() {
    let arrFn = [];
    let i;
    for (i = 0; i < 3; i++) {
        arrFn.push(function fn() {
            console.log(i);
        })
    }
    return arrFn;
}
let arrFn = outer();
arrFn[0]();
arrFn[1]();
arrFn[2]();

/* 
 In the above program, we have created let i variable outside of For loop.
 Means same i will be shared throughout every iteration of for loop.
 We are executing inner functions after for loop, and at that time i was 3.
 so every function will print 3 only.

 To print 0 1 and 2, we need to create let i inside for loop. Like - 

 for (let i = 0);
*/



//! Function currying : Closure function chain

/* 
creating a function fn that allows for function chaining and keeps track of the number of function calls made. 
Each time the function is called, it returns another function, and the count of function calls is incremented.
The function chain can be terminated by passing 0.
*/

function countFunctionCall() {
    let count = 1;
    return function innerFn(stopper) {
        if (stopper == 0) {
            return count;
        }
        count++;
        return innerFn;

    }
}

console.log(countFunctionCall()()()()(0)); // 4

console.log(countFunctionCall()(0)); // 1

console.log(countFunctionCall()()()()()()()(0)); // 7