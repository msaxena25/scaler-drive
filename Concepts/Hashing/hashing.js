
//! Check Sub-array with 0 sum exist or not

/*
Given an array of integers A, find and return whether the given array contains a non-empty subarray with a sum equal to 0.

If the given array contains a sub-array with sum zero return 1, else return 0.

 A = [1, 2, 3, 4, 5]
 output: 0 (No subarray has sum 0)
 */

//@ Solution 1 with prefix sum

function getSubarrayWithSumZero(A) {
    console.log('getSubarrayWithSumZero :', A);
    let pf = [];
    pf[0] = A[0];
    for (let i = 1; i < A.length; i++) {
        pf[i] = pf[i - 1] + A[i];
    }
    console.log(pf)
    /*  In Pf array, If element is 0, it means subarray exists with sum 0.
        In Pf array, If two elements are same, it means subarray exists with sum 0. */
    for (let i = 0; i < pf.length; i++) {
        for (let j = i + 1; j < pf.length; j++) {
            if (pf[j] == pf[i]) {
                return 1;
            }
            let sum = 0;
            if (i !== 0) {
                sum = pf[j] - pf[i - 1];
            } else {
                sum = pf[j];
            }
            if (sum == 0) {
                console.log(i, j)
                return 1;
            }
        }
    }
    return 0;

}

console.log(getSubarrayWithSumZero([1, -2, 2, -2, -3, -1, 4, -1]))
console.log(getSubarrayWithSumZero([1, 2, 3, 4, 5, 0]))
let arr = [190, 713, 462, 963, 993, 934, -762, -810, 261, -699, 542, 321, -549, -767, -985, 53, -253, 461, -29, -9, 221, -135, 923, -912, 979, -832, 311, 171, -437, -750, -482, 636, 370, -526, 655, 169, 607, -214, 284, -86, 418, -380, 222, 898, -822, 667, 885, 723, 707, 398, 254, 535, -878, -52, 476, -882, 475, -619, 347, -422, 862, -292, -511, 539, -244, 98, 913, 33, -483, 644, 801, 347, 661, -223, -92, -61, -647, 979, -306, 285, 818, -254, 0];
console.log(getSubarrayWithSumZero(arr))


//@ Solution 2 using prefix sum and hash map : TC - O(n) & SC - O(n)

/*
1. First create prefix sum for a given array
2. Create a map or hashmap
3. Check each element of prefix sum array
    - If element does not exists in map, then add it. Element as Key and Index as value.
    - If element exists in map means there are two same elements and that why difference of them will be 0.
    - If element is itself 0 then return 1. no further check.
*/


function getSubarrayWithSumZeroUsingHashMap(A) {
    console.log('getSubarrayWithSumZero Using HashMap :', A);
    let pf = [];
    pf[0] = A[0];
    for (let i = 1; i < A.length; i++) {
        pf[i] = pf[i - 1] + A[i];
    }
    let map = {};
    for (let i = 0; i < pf.length; i++) {
        if (pf[i] == 0 || map[pf[i]]) {
            return 1;
        } else {
            map[pf[i]] = i;
        }
    }
    return 0;

}
console.log(getSubarrayWithSumZeroUsingHashMap(arr))


//! Find maximum length of subarray that have sum 0. Question is same as above but here we have to find out length.

//? Lets solve this with hash map

/*
@ Approach

1. First create prefix sum for a given array
2. Create a map or hashmap
3. Create maxLength variable with default value 0.
3. Check each element of prefix sum array
    - If element is itself 0, means sum from 0th index to current index are 0. So length will be current Index. Check maxLength and current Length and took max value.
    - If element does not exists in map, then add it. Element as Key and Index as value.
    - If element exists in map means there are two same elements and that why difference of them will be 0. Compute length with current index - map[element] index.
4. Finally return max length

? NOTE: we have to store smallest index in map for every item. Because we have to calculate longest length of subarray and that could be optain by smallest index.
*/


function getSubarrayMaxLengthWithSumZero(A) {
    console.log('getSubarray MaxLength With Sum Zero Using HashMap :', A);
    let pf = [];
    pf[0] = A[0];
    for (let i = 1; i < A.length; i++) {
        pf[i] = pf[i - 1] + A[i];
    }
    let map = {};
    let maxLength = 0;
    //console.log(pf)
    for (let i = 0; i < pf.length; i++) {
        const el = pf[i];
        if (el == 0) {
            maxLength = Math.max(i, maxLength); // i will be length if element is 0
        }
        else if (map[el]) {
            const len = i - map[el];
            maxLength = Math.max(len, maxLength);
        } else {
            map[el] = i;
        }
    }
    return maxLength;

}
console.log(getSubarrayMaxLengthWithSumZero([1, 3, -4, 2])) //2
console.log(getSubarrayMaxLengthWithSumZero([1, -2, 2, -2, -3, -1, 4, -1])) //5



//!  Longest Consecutive Sequence
// https://www.scaler.com/academy/mentee-dashboard/class/47685/assignment/problems/152?navref=cl_tt_lst_nm


/*
Given an unsorted integer array A of size N.
Find the length of the longest set of consecutive elements from array A.

A = [100, 4, 200, 1, 3, 2]
Output: 4 (1,2,3,4)

B = [100, 4, 101, 2]
output : 2 (100, 101)
*/

//@ Solution 1 by using Sorting TC - nlog(n)

function consecutiveElementsLength1(A) {
    console.log('consecutiveElementsLength with Sorting :', A);
    const b = A.sort((a, b) => a - b);
    let length = 1; // min length will be 1 not 0
    let maxLength = 1; // min length will be 1 not 0
    for (let i = 0; i < b.length; i++) {
        if (A[i] == A[i - 1]) { // for duplicate elements
            continue;
        }
        // Elements are consecutive if it can be formed by adding 1 to the previous element.
        if (A[i] == A[i - 1] + 1) {
            length++;
            maxLength = Math.max(length, maxLength);
        } else {
            length = 1; // min length will be 1 not 0
        }
    }
    return maxLength;
}

console.log(consecutiveElementsLength1([100, 4, 200, 1, 3, 2]))
console.log(consecutiveElementsLength1([1, 3, 2]))
console.log(consecutiveElementsLength1([100, 4, 200]))

const arr1 = [97, 86, 67, 19, 107, 9, 8, 49, 23, 46, -4, 22, 72, 4, 57, 111, 20, 52, 99, 2, 113, 81, 7, 5, 21, 0, 47, 54, 76, 117, -2, 102, 34, 12, 103, 69, 36, 51, 105, -3, 33, 91, 37, 11, 48, 106, 109, 45, 58, 77, 104, 60, 75, 90, 3, 62, 16, 119, 85, 63, 87, 43, 74, 13, 95, 94, 56, 28, 55, 66, 92, 79, 27, 42, 70];

console.log(consecutiveElementsLength1(arr1))
console.log(consecutiveElementsLength1([1, 1, 1, 2, 2, 2, 3, 3, 4, 4, 5, 5]))


//@ Solution 2 by finding Min and Max element and traverse from min to max and check consecutive. TC = O(range  + n) & SC = O(n)
// To check element exists in array or not - create new Set() and check with has method.
// range means max element - min element

//@ Solution 3 by using Hashing: TC - O(n) & SC -  O(n)

// Read Javascript Map
//? https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

function consecutiveElementsLengthWithHashing(A) {
    console.log('consecutiveElementsLength With Hashing :', A);
    let map = new Map(); // create a map || we can also take simple object as well.
    let set = new Set(A); // create a set to check element exists in array or not.
    for (let i = 0; i < A.length; i++) {
        const el = A[i];
        if (set.has(el - 1)) { // if previous element exists means current el cannot be start element.
            map.set(el, false);
        } else {
            map.set(el, true);
        }
    }
    //console.log(map)
    let maxLength = 1; // min length will be 1 (Because a single element is also a part of consecutive)
    for (let i = 0; i < A.length; i++) {
        const el = A[i];
        // if element is start element, find out next consecutive elements and check if they exist in array or not
        if (map.get(el)) {
            let len = 1;
            let j = 1;
            while (set.has(el + j)) {
                len++;
                j++;
            }
            if (len > maxLength) {
                maxLength = len;
            }
        }
    }
    return maxLength;
}

console.log(consecutiveElementsLengthWithHashing([100, 4, 200, 1, 3, 2]))
console.log(consecutiveElementsLengthWithHashing(arr1))
console.log(consecutiveElementsLengthWithHashing([1, 1, 1, 2, 2, 2, 3, 3, 4, 4, 5, 5]))



//!  Shaggy and distances

/*
Shaggy has an array A consisting of N elements. We call a pair of distinct indices in that array a special if elements at those indices in the array are equal.

Shaggy wants you to find a special pair such that the distance between that pair is minimum. Distance between two indices is defined as |i-j|. If there is no special pair in the array, then return -1.

IN shorts - Find minimum possible distance between a special pair.
* where A[i] == A[j] && |i - j| is minimum.

A = [7, 1, 3, 4, 1, 7]
output: 3 (A[1] and A[4] are both 1 so (1,4) is a special pair and |1-4|=3)

*/

// @ Solution 1 with Brute Force : TC -  O(n^2)

function findMinDistance(A) {
    console.log('findMinDistance :', A);
    let ans = A.length; // initialize with max value
    let isPairExists = false;
    for (let i = 0; i < A.length; i++) {
        for (let j = i + 1; j < A.length; j++) {
            if (A[i] == A[j] && Math.abs(i - j) < ans) {
                isPairExists = true;
                ans = Math.abs(i - j);
            }
        }
    }
    return isPairExists ? ans : -1;
}
console.log(findMinDistance([7, 1, 3, 4, 1, 7]))
console.log(findMinDistance([7, 2, 3, 4, 1, 5]))


//@ Solution 2 with Hashing : TC & SC - O(n)

function findMinDistanceWithHashmap(A) {
    console.log('findMinDistanceWith Hashmap :', A);
    let map = {}; // create map or you can take hashmap with (new Map())
    let ans = A.length;  // initialize with max value
    let isPairExists = false;
    for (let i = 0; i < A.length; i++) {
        let el = A[i];
        if (map[el] > -1) { // check element exists in map or not. Index will also be 0 thats why checked condition of  > -1
            let distance = Math.abs(i - map[el]);
            if (distance < ans) {
                isPairExists = true;
                ans = distance;
            }
        }
        map[el] = i; // Update current index each time because we have to store maximum index to get minimum distance between two same elements.

    }
    return isPairExists ? ans : -1;
}
console.log(findMinDistanceWithHashmap([7, 1, 3, 4, 1, 7]))
console.log(findMinDistanceWithHashmap([7, 2, 3, 4, 1, 5]))
console.log(findMinDistanceWithHashmap([1, 1]))


//! Flip and Find Nearest

/*
Given a binary string A of size N. There are Q queries given by the array B of size Q*2.

Each query is given by :-

[1 X] :- Flip the bit of the X-th position in A
[2 X] :- Find the index of the nearest '1' from X. If there are multiple such indexes, return the one with the lower index. Return -1 if there are no '1's in A

Note :- We use 1-based indexing.

A = "010000100"
B = [[2, 5]
     [1, 7]
     [2, 9]]

Output: [7, 2]
*/

//@ Solution 1: Brute Force approach TC - O(n^2) and SC - O(n)

/* 
 * Approach

1. Loop over each query
2. As per question we have to change string character and that is possible only when we will convert string to array. Direct update into string is not possible.
3. Now If query first value is 1 means we have to flip value and if first value is 2 means we have to find nearest 1 from that char.
4. If query is [1, 7] means flip 7th value. To flip from 0 to 1 OR 1 to 0, XOR is best operation.  arr[b - 1] = arr[b - 1] ^ 1;  // b-1 because of 1 based indexing.
5. If query is [2, 5] means find nearest 1 from 5th char. There are three possibilities here-
    a. If 5th index is already 1 then that will be closest index of 5th char.
    b. If not a, then traverse left and right both side using while loop from 5th char and find nearest 1.
    c. May be there is no any 1 exist. So closest index will be -1.

*/

function flipAndFind(A, B) {
    console.log('flipAndFind :', A);
    let arr = [...A]; // spread string to array
    let ans = [];
    for (let i = 0; i < B.length; i++) {
        const [a, b] = B[i];
        if (a == 1) { // 1 means flip index value
            arr[b - 1] = arr[b - 1] ^ 1; // 0 to 1 OR 1 to 0
        } else if (a == 2) { // 2 means find index value
            let closestIndex = -1; // initialize with -1 as per question statement
            if (arr[b - 1] == 1) { // if current item is 1, that will be closest index else traverse array.
                closestIndex = b;
            } else {
                let p = b - 1; // current element index
                let l = p - 1; // left pointer
                let r = p + 1; // right pointer
                while (l >= 0 || r < arr.length) {
                    if (arr[l] == 1) { // If left is 1, that will be closest else check right.
                        closestIndex = l + 1; // 1 based indexing
                    }
                    else if (arr[r] == 1) { // check right only if not finding in Left index Because we have to take care for lower index.
                        closestIndex = r + 1;
                    }
                    if (closestIndex > -1) { // When find closest index, break while loop
                        break;
                    }
                    l--;
                    r++
                }
            }
            ans.push(closestIndex);
        }
    }
    return ans;
}
const queries = [
    [1, 2],
    [2, 7],
    [1, 7],
    [2, 5],
    [1, 2],
    [1, 9],
    [2, 7],
    [2, 7],
    [2, 5]
]
console.log(flipAndFind('101110100', queries));