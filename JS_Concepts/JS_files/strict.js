"use strict";


//! use strict


var myName = 'M S';
console.log(myName)

//* Global variable are not allowed in strict Mode. In strict mode, we can not use any variable without declaration.

/*

className = '10th';
console.log(className) // ReferenceError: className is not defined

*/

/*
* Behavior of this  non-strict	         strict

GEC                  Window	              window
Function call	    Window Object	      undefined
Method call	        Current object	      current object
Arrow function	this from outer scope	this from outer scope


@  EC created using method call then your this -> calling obj
@  EC is created using a fn call then your this -> undefined

*/



let cap = {
    // property
    firstName: "JSMount",
    // method
    sayHi : function(){
        console.log("hi from", this.firstName);
    }
}
cap.sayHi(); // hi from JSMount - because of method calling
var firstName = "Java";

let sayHiAdd = cap.sayHi;
// sayHiAdd(); // it will give an error, as in this case this is undefined in strict mode, so it will not able to read properties of this.

