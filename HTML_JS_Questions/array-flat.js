
/*

Question -  Given array, write a code to flat this array into 1-d array.

let inputArr = [1, 2, 3, [4, 5], [6, 7, 8, [9, 10, 11, [12, [13, 14, [15]]]]]];

output - 


[
    1, 2, 3, 4, 5, 6,
    7, 8, 9, 10, 11, 12,
    13, 14, 15
] 


array can have n number of nested arrays.

*/

let inputArr = [1, 2, 3, [4, 5], [6, 7, 8, [9, 10, 11, [12, [13, 14, [15]]]]]];

function flatArray(arr) {
    if (!arr || !arr.length) {
        return arr;
    }
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        const el = arr[i];
        // now check if element is also an array
        if (Array.isArray(el)) {
            let nestedResult = flatArray(el); // recursive call
            result = [...result, ...nestedResult]; // contact current result with nested result
        } else {
            result.push(el); // if that is simple a value then push it.
        }
    }
    return result;

}

const output = flatArray(inputArr);
console.log(output);

console.log(flatArray([]));

console.log(flatArray());

// Check output to run this file.

// CMD > node filename.js

// OR Run on browser.

//! Array.prototype.flat()


// The flat() method of Array instances creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.


const arr1 = [0, 1, 2, [3, 4]];

console.log(arr1.flat());