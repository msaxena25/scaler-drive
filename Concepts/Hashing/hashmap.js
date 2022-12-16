
//@ Set JavaScript
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set


//! Check Pair Sum

/*
Given an Array of integers B, and a target sum A.
Check if there exists a pair (i,j) such that Bi + Bj = A and i!=j.

B = 21   A = [9, 10, 7, 10, 9, 1, 5, 1, 5]
Output:
0

B = 3   A = [6, 5, 4, 6, 1, 2]
Output
1
*/

//@ done with hashmap: new Map()
//? TC & SC - O(n)
function isPairSumExist(A, B) {
    console.log('isPairSumExist :', A);
    let map = {};
    for (let i = 0; i < A.length; i++) {
        let diff = B - A[i];
        if (map[diff]) {
            return 1;
        } else {
            map[A[i]] = true;
        }
    }
    return 0;
}
console.log(isPairSumExist([6, 5, 4, 1, 2], 12));
console.log(isPairSumExist([9, 10, 7, 10, 9, 1, 5, 1, 5], 21))


//@ done with hashSet: new Set()
//? TC & SC - O(n)
function isPairSumExistWithHS(A, B) {
    console.log('isPairSumExistWithHS :', A, B);
    let hs = new Set();
    for (let i = 0; i < A.length; i++) {
        let diff = B - A[i];
        if (hs.has(diff)) {
            return 1;
        } else {
            hs.add(A[i]);
        }
    }
    return 0;

}
console.log(isPairSumExistWithHS([6, 5, 4, 1, 5, 1, 2, 1], 9)); //1
console.log(isPairSumExistWithHS([6, 5, 4, 1, 5, 1, 2, 1], 12)); // 0


//! Find pair sum

function findPairSum(A, B) {
    console.log('findPairSum :', A, B);
    let map = {};
    let pairs = [];
    for (let i = 0; i < A.length; i++) {
        let diff = B - A[i];
        if (map[diff]) {
            pairs.push([A[i], diff])
        } else {
            map[A[i]] = true;
        }
    }
    return pairs;
}
console.log(findPairSum([6, 5, 4, 6, 1, 3], 9));



//! Longest Subarray Zero Sum


/*
Given an array A of N integers.
Find the length of the longest subarray in the array which sums to zero.

 Input: A = [1, -2, 1, 2]
 output: 3

 [1, -2, 1] is the largest subarray which sums up to 0.
*/

//@ TC - O(n^2)  SC - O(n) because of prefix sum
function longestSubarrayZeroSum(A) {
    console.log('longestSubarrayZeroSum :', A);
    let pf = [];
    pf[0] = A[0];
    for (let i = 1; i < A.length; i++) {
        pf[i] = pf[i - 1] + A[i];
    }
    console.log(pf)
    let ans = 0;
    for (let i = 0; i < A.length; i++) {
        for (let j = i + 1; j < A.length; j++) {
            let sum = 0;
            if (i == 0) {
                sum = pf[j];
            } else {
                sum = pf[j] - pf[i - 1];
            }
            if (sum == 0) {
                let numberOfElements = j - i + 1;
                if (numberOfElements > ans) {
                    ans = numberOfElements;
                }
            }
        }
    }
    console.log(ans)
    return ans;

}
longestSubarrayZeroSum([1, -2, 1, 2])
longestSubarrayZeroSum([1, -2, 1, 2, 3, -6, 1])
longestSubarrayZeroSum([1, -2, 2])
var arr = [190, 713, 462, 963, 993, 934, -762, -810, 261, -699, 542, 321, -549, -767, -985, 53, -253, 461, -29, -9, 221, -135, 923, -912, 979, -832, 311, 171, -437, -750, -482, 636, 370, -526, 655, 169, 607, -214, 284, -86, 418, -380, 222, 898, -822, 667, 885, 723, 707, 398, 254, 535, -878, -52, 476, -882, 475, -619, 347, -422, 862, -292, -511, 539, -244, 98, 913, 33, -483, 644, 801, 347, 661, -223, -92, -61, -647, 979, -306, 285, 818, -254, 0];
longestSubarrayZeroSum(arr);

//@ Lets refactor above code

/*
 @Refactor the above Logic

- If at any point, pf is 0 - it means a subarray exists from 0th index to that element index which have sum 0.
- If two indices have same sum or pf it means difference will be 0 for those two indices.
    example -
        i = 1 have pf 5 & j = 6 have pf 5
        pf[i] == pf[j] => len = j - (i+1) - 1;
 */

function longestSubarrayZeroSum1(A) {
    console.log('longestSubarrayZeroSum1:', A);
    let pf = [];
    pf[0] = A[0];
    for (let i = 1; i < A.length; i++) {
        pf[i] = pf[i - 1] + A[i];
    }
    console.log(pf)
    let ans = 0;
    for (let i = 0; i < A.length; i++) {
        let len = 0;
        for (let j = i + 1; j < A.length; j++) {
            if (pf[j] == 0) {
                len = j + 1;
            }
            if (pf[i] == pf[j]) {
                len = j - (i + 1) + 1;
            }
            if (len > ans) {
                ans = len;
            }
        }
    }
    console.log(ans)
    return ans;

}
longestSubarrayZeroSum1([1, -2, 1, 2])
longestSubarrayZeroSum1([1, -2, 1, 2, 3, -6, 1])
longestSubarrayZeroSum1([1, -2, 2])
longestSubarrayZeroSum1(arr);


//! Count distinct elements

/*
You are given an array A of N integers. You will have to return number of distinct elements of the array.

A = [3, 4, 3, 6, 6]
Output: 3 // The distinct elements of the array are 3, 4 and 6.
*/

//@ hashSet is created with new Set() in JavaScript and only contains unique elements (no duplicate).
//? new Set([1,1,2,3,4,4,5]) ==> Set(5) {1, 2, 3, 4, 5}
//@ If we add duplicate elements, Set do not perform any action for such elements.

function distinctElement(A) {
    console.log('distinctElement :', A);
    var hashSet = new Set(A);
    console.log(hashSet.size)
    return hashSet.size;
}
distinctElement([3, 4, 3, 6, 6]);
distinctElement([3, 3, 3, 9, 0, 1, 0])


//! First Repeating element

/*
Given an integer array A of size N, find the first repeating element in it.
We need to find the element that occurs more than once and whose index of the first occurrence is the smallest.

If there is no repeating element, return -1.

A = [10, 5, 3, 4, 3, 5, 6]
output: 5
*/

//@ done with hashMap  TC & SC - O(n)
function firstRepeatingElement(A) {
    console.log('firstRepeatingElement :', A);
    let hm = {};
    for (let i = 0; i < A.length; i++) {
        if (hm[A[i]]) {
            hm[A[i]] += 1;
        } else {
            hm[A[i]] = 1;
        }
    }
    for (let i = 0; i < A.length; i++) { // loop again on array items and check frequency
        if (hm[A[i]] > 1) {
            return A[i];
        }
    }
    return -1;

}
console.log(firstRepeatingElement([10, 5, 3, 4, 3, 5, 6]))
console.log(firstRepeatingElement([10, 5, 3, 4]))
console.log(firstRepeatingElement([10, 5, 3, 4, 5, 1, 7, 5]))



//!  Frequency of element query

/*
Given an array A. You have some queries given by the array B.
For the i-th query, find the frequency of B[i] in the array A.

A = [1, 2, 1, 1]
B = [1, 2]

output: [3, 1]

*/

function frequencyOfElements(A, B) {
    console.log('frequencyOfElements :', A);
    let hm = {};
    for (let i = 0; i < A.length; i++) {
        if (hm[A[i]]) {
            hm[A[i]] += 1;
        } else {
            hm[A[i]] = 1;
        }
    }
    let ans = [];
    for (let i = 0; i < B.length; i++) {
        ans.push(hm[B[i]] || 0);
    }
    return ans;

}
console.log(frequencyOfElements([1, 2, 1, 1], [1, 2]))
console.log(frequencyOfElements([6, 3, 3, 6, 7, 8, 7, 3, 7], [10, 9, 8])) // [0, 0, 1]



//! Distinct Numbers in Window

/*
You are given an array of N integers, A1, A2 ,..., AN
and an integer B. Return the of count of distinct numbers in all windows of size B.

Formally, return an array of size N-B+1 where i'th element in this array contains number
of distinct elements in sequence Ai, Ai+1 ,..., Ai+B-1.

NOTE: if B > N, return an empty array.

 A = [1, 2, 1, 3, 4, 3]
 B = 3

 Output:
 [2, 3, 3, 2]
*/

//@ Number of total subarrays of size k is = N - k + 1.

//? Not possible with Set.
function distinctNumberInWindow(A, B) {
    console.log('distinctNumberInWindow :', A, B);
    let ans = [];
    let set = new Set();
    for (let i = 0; i < B; i++) { // O(1)
        set.add(A[i]);
    }
    let s = 1;
    let e = B;
    ans.push(set.size);
    while (e < A.length) { //  using sliding window concept
        set.delete(A[s - 1]);
        set.add(A[e]);
        ans.push(set.size);
        s++;
        e++;
    }
    console.log(ans)
    return ans;
}
distinctNumberInWindow([1, 2, 1, 3, 4, 3], 3); // not working above solution



//@ Solve the above with hash map : new Map();

//@ First see how to set data in Map();
function setDataInMap(A) {
    console.log('setDataInMap new Map():', A);
    let hm = new Map();
    for (let i = 0; i < A.length; i++) {
        if (hm.has(A[i])) {
            hm.set(A[i], hm.get(A[i]) + 1);
        } else {
            hm.set(A[i], 1);
        }
    }
    console.log(hm)
}
setDataInMap([1, 1, 2, 3, 4, 4, 2, 2, 3, 4, 6, 7])


//@ done with hashmap
function distinctNumberInWindowWithHM(A, B) {
    console.log('distinctNumberInWindowWithHM :', A, B);
    let hm = new Map(); // create a map
    let ans = [];
    for (let i = 0; i < B; i++) { // push B items into map
        if (hm.has(A[i])) {
            hm.set(A[i], hm.get(A[i]) + 1);
        } else {
            hm.set(A[i], 1);
        }
    }
    ans.push(hm.size); // get map size
    let s = 1; // start from 1st element because 0th already covered in the above loop.
    let e = B;
    while (e < A.length) { // used sliding window technique
        let startItem = hm.get(A[s - 1]); // check if start element exists
        if (startItem > 1) { // if frequency more then 1
            hm.set(A[s - 1], startItem - 1); // remove frq by 1
        } else {
            hm.delete(A[s - 1]); // if freq is exactly 1 then remove item
        }

        if (hm.has(A[e])) { // check newly coming index item
            hm.set(A[e], hm.get(A[e]) + 1); // if that exists then increase freq by 1
        } else {
            hm.set(A[e], 1); // if not exists then set it
        }
        ans.push(hm.size); //push size
        s++;
        e++;
    }
    console.log(ans);

}
distinctNumberInWindowWithHM([1, 2, 1, 3, 4, 3], 3); //[2, 3, 3, 2]
distinctNumberInWindowWithHM([1, 1, 2, 2], 1) //[1, 1, 1, 1]