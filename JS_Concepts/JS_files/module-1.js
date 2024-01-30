/*

In HTML we can add module JS file like below 

<script src="./JS_files/module-1.js" type="module"></script>

Giving type = 'module' is important.

You can add both module-1 and module-2 file in html script or only main file.


? What is Scope Pollution?

Scope pollution is when we have too many global variables that exist in the global namespace, or
when we reuse variables across different scopes. Scope pollution makes it difficult to keep track
of our different variables and sets us up for potential accidents.

*/

import * as module2 from './module-2.js';
var name = 'John';

console.log(name);

// use module2 sum function
console.log("👉  module2.sum(2, 3):", module2.sum(2, 3));

// use variable key from module 2 file
function getCode(name) {
    return name + module2.key;
}

console.log("👉  getCode('Jack'):", getCode('Jack'));
