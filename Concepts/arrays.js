/**
 *! why array start with 0?
 *
 * There is no any specific reason of this.
 * All compiler and data structure has been created based on 0 indices.
 * In array, the index tells the distance from the starting element. So, the first
 * element is at 0 distance from the starting element. So, that's why array start from 0.
 */

//! Given an array A of N integers. Count the number of elements that have at least 1 elements greater than itself.

function countElements(arr) {
    // find max element
    let max = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    let maxCount = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === max) {
            maxCount++;
        }
    }

    console.log('max element of given array & its occurance - ', max, maxCount);
    console.log('Answer is', arr.length - maxCount)
    return arr.length - maxCount;
}
countElements([9, 4, 3, 7, -1, 0, 9, 2, 1, 6, 9])
// 8 , Number of Iteration -  2n,  TC - O(n), SC(1)

//! Same above program with Brute Force solution -

function countElementsBFSolution(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[j] > arr[i]) {
                count++;
                break;
            }

        }
    }
    console.log('countElementsBFSolution', count);
}
countElementsBFSolution([9, 4, 3, 7, -1, 0, 9, 2, 1, 6, 9])
// 8 , Number of Iteration -  n*n,  TC - O(n^2)
countElementsBFSolution([9, 2, 3, 5]) // 3

//! Lets try to solve above problem with single for loop but that will increase space complexity

function countElementsWithSingleForLoop(arr) {
    let map = {};
    let max = arr[0];
    for (let i = 0; i < arr.length; i++) {
        const ele = arr[i];
        if (ele > max) {
            max = ele;
        }
        if (map[ele]) {
            map[ele]++;
        } else {
            map[ele] = 1;
        }
    }
    console.log('countElementsWithSingleForLoop - map', map);
    console.log(arr.length - map[max]);
}
countElementsWithSingleForLoop([9, 2, 3, 5, -1, -1, 9]) // 5
countElementsWithSingleForLoop([9, 4, 3, 7, -1, 0, 9, 2, 1, 6, 9]) // 8
// Number of Iteration  -  n times
// TC - O(n)
// SC - O(n)

/***************************** */

//! Given an array A and an integer B. A pair(i, j) in the array is a good pair if i != j and (A[i] + A[j] == B).
//! Check if any good pair exist or not. Return 1 if good pair exist otherwise return 0.

//Brute force solution -
// Number of iteration - n * n
// TC - O(n^2)
function checkPairs(A, B) {
    for (let i = 0; i < A.length; i++) {
        for (let j = i + 1; j < A.length; j++) {
            if (A[i] + A[j] === B) {
                return 1;
            }
        }
    }
    return 0;
}
console.log(checkPairs([1, 2, 3, 4], 7))
console.log(checkPairs([2, 3, 4], 1))
console.log(checkPairs([9, 4, 3, 7, -1, 0, 9, 2, 1, 6, 9], 15))

/*
i = 0, j will run 1 to (n-1) times , iteration here (n - 1)
i = 1 , j will run 2 to n-1
i = 2 , j will run 3 to n-1
i = 3 , j will run 4 to n-1
i = 10 , j will run 11 to n-1
i = k , j will run k to n-1
i = (n-1) , j will run 0
*/

/* Below is the Optimized way to check pairs with single for loop using hash map
We can do three things with same program
return 1 if any pair exists.
return count of pairs.
returns pairs. */

function checkPairs1(A, B) {
    const map = {};
    //let pairs = []; // if want to return pairs , we can save all pairs into this.
    // let count = 0;
    for (let i = 0; i < A.length; i++) {
        const element = A[i];
        if (map[element]) {
            //pairs.push([element, map[element]]);
            // count++;
            return 1;
        } else {
            map[B - element] = element;
        }
    }
    return 0;

}

// TC - O(n)
// SC - O(n)

console.log(checkPairs1([9, 4, 3, 8, -1, 0, 9, 2, 1, 6, 9], 7))
console.log(checkPairs1([9], 7))
console.log(checkPairs1([1, 1, 1, 2], 2))

/***************************** */

// Reverse an array with space complexity - O(1)

function reverseArray(arr) {
    // here will use two pointer technique
    let i = 0;
    let j = arr.length - 1;
    while (i < j) {
        [arr[i], arr[j]] = [arr[j], arr[i]]; // swap smart way
        i++;
        j--;
    }
    console.log(arr);
}

// number of iteration = n / 2
// TC - O(n)

reverseArray([1, 2, 3, 4, 5, 6, 7, 8]) // [8, 7, 6, 5, 4, 3, 2, 1]
reverseArray([1, 2, 3])
reverseArray([3])

// Reverse an array in given range with space complexity - O(1)
// 0 <= s <= e <= N - 1

// Given an array A of N integers. Also given are two integers s and e. Reverse the array A in the given range [s, e]

function reverseArrayWithRange(arr, s, e) {
    let i = s;
    let j = e;
    while (i < j) {
        [arr[i], arr[j]] = [arr[j], arr[i]]; // swap smart way
        i++;
        j--;
    }
    console.log(arr);
}
reverseArrayWithRange([1, 2, 3, 4, 5, 6, 7, 8], 2, 5)
reverseArrayWithRange([1, 2, 3, 4, 5, 6, 7, 8], 6, 7)


/**
 * ! In special case, the time complexity of inserting/deleting elements at the end of dynamic array is __________.
 * In general, the time complexity of inserting or deleting elements at the end of dynamic array is O (1).
 * Elements are added at reserved space of dynamic array. If this reserved space is exceeded, then the physical size of the dynamic array is reallocated and every element is copied from original array. This will take O(n) time to add new element at the end of the array.
 *
 * ! What is the time complexity for inserting/deleting at the beginning of the array?
 * ? O(n)
 */

/********************* */

/*
! Given an integer array A of size N and an integer B, you have to return the same array after rotating it B
! times towards the right.
? 1 <= N <= 105
? 1 <= A[i] <=10^9
? 1 <= B <= 10^9
 */
function rotate(A, B) {
    reverseArrayWithRange(A, 0, A.length - 1); // reverse origional array.
    reverseArrayWithRange(A, 0, B - 1);
    reverseArrayWithRange(A, B, A.length - 1);
    console.log('rotated array ', A);
}
rotate([1, 2, 3, 4, 5], 1); //   [5, 1, 2, 3, 4]
rotate([1, 2, 3, 4, 5], 5); //  [1, 2, 3, 4, 5]

rotate([1, 2, 3, 4, 5], 6); //  [undefined, 1, 2, 3, 4, 5]

/* If B is greater than array.length then above program gives wrong result.
rotate([1, 2, 3, 4, 5], 5);  gives result ->  [1, 2, 3, 4, 5], So Now rotate one more time means 6th times
>  [5, 1, 2, 3, 4] & this result is same as first rotation.
Means we have to use modular technique here Like B = B % Array.length */

function rotate1(A, B) {
    B = B % A.length;
    reverseArrayWithRange(A, 0, A.length - 1); // reverse origional array.
    reverseArrayWithRange(A, 0, B - 1); // reverse 0 to B-1
    reverseArrayWithRange(A, B, A.length - 1); // reverse B to n-1
    console.log('rotated array ', A);
}
rotate1([1, 2, 3, 4, 5], 6); //[5, 1, 2, 3, 4]

/********************* */