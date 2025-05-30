//! Doc Link - https://drive.google.com/drive/u/0/folders/1nJoEq-b_aVbYjZ_eds4TvaAzZRWvhRka


//! Generate all subarrays

/**
A subarray is commonly defined as a continuous part or section of an array.

 */

//? TC = O(n^3)
function printAllSubarrays(a) {
    const ans = [];
    for (let i = 0; i < a.length; i++) {
        // pick ith element
        ans.push([a[i]]);
        for (let j = i + 1; j < a.length; j++) {
            // pick last added subarray and add new element.
            ans.push([...ans[ans.length - 1], a[j]]) //! spread also takes O(n)
        }
    }
    console.log(ans)
}
printAllSubarrays([1, 2, 3]);

//printAllSubarrays([36, 63, 63, 26, 87, 28, 77, 93, 7])

//! Print all subarrays - same as above, Here j started from i.
function printAllSubarrays1(A) {
    let subarrays = [];
    for (let i = 0; i < A.length; i++) {
        for (let j = i; j < A.length; j++) {
            if (i == j) {
                subarrays.push([A[j]]);
            } else {
                subarrays.push([...subarrays.at(-1), A[j]]) // .at(-1) return last element.
            }
        }
    }
    log(subarrays)
}
printAllSubarrays1([1, 2, 3, 4, 5]);

// TC - O(n^3)
//! print elements of all subarrays. done with using three nested for loop.
function printAllSubarraysElements(a) {
    console.log('printAllSubarraysElements :', a);
    const out = [];
    for (let i = 0; i < a.length; i++) {
        for (let j = i; j < a.length; j++) {
            for (let k = i; k <= j; k++) {
                //console.log(a[k])
                out.push(a[k])

            }
        }
    }
    console.log(out)
}
printAllSubarraysElements([1, 2, 3]);


//! Check impact on variable len after pushing more elements into array

function run1() {
    const arr = [1, 2];
    const len = arr.length;
    arr.push(4, 5);
    console.log(len);
    console.log(arr.length)
}
run1();

//! What is complexity of spread syntax of ES6?

/**
 Spread calls the [Symbol.iterator] property on the object. For arrays, this will iterate through every item in the array, calling the array iterator's .next() until the iterator is exhausted, resulting in complexity of O(N).

For the exact same reason, for..of (which also calls [Symbol.iterator]) loops are also O(N):
const arr = [1, 2, 3];
for (const item of arr) {
  console.log(item);
}
 */


//! Run below code and check time taken by spread operator.

// It takes some time to print result. Means spread operator complexity is not O(1). It is O(n).
function run2() {
    const arr = new Array(Math.pow(10, 7)).fill(null);
    const t0 = performance.now();
    const arr2 = [...arr];
    console.log(t0, performance.now(), performance.now() - t0);
}
// run2();

/********************************************* */

//! Subarray in given range

/**
 * Given an array A of length N, return the subarray from B to C.

1 <= N <= 105
1 <= A[i] <= 109
0 <= B <= C < N

A = [4, 3, 2, 6]
B = 1
C = 3

[3, 2, 6]
 */

function getSubarraysInRange(A, B, C) {
    const sub = [];
    let i = B;
    let j = C;
    while (i <= j) {
        sub.push(A[i]);
        i++;
    }
    console.log(sub);
    return sub;
}
getSubarraysInRange([4, 3, 2, 6], 1, 3)
getSubarraysInRange([1, 2, 3, 4, 5, 6, 7], 2, 6)

/********************************** */

//! Total Number of Subarrays

// Given an array of size 21, find the total number of subarrays of the array.

function totalNumberOfSubarrays(size) {
    let count = 0;
    for (let i = 0; i < size; i++) {
        for (let j = i; j < size; j++) {
            count++;
        }
    }
    console.log(count);
}
// totalNumberOfSubarrays(1) // 1
// totalNumberOfSubarrays(2) // 3
// totalNumberOfSubarrays(3) // 6
// totalNumberOfSubarrays(4) // 10
// totalNumberOfSubarrays(5) // 15

// *It is completely clear that total number of subarrays is sum of first n natural number.
// *Like > 1 + 2 + 3 + 4 + ..........
// *And that is => n(n + 1) / 2

// * If size is 21 then 21 * 22 / 2 = 231.

totalNumberOfSubarrays(21) // 231.



/********************************************** */

//! return subarray that have length 3 , you can print any length subarray with same program.

function subArrayWithLength3(A) {
    log('subArrayWithLength3 :');
    let subarrays = []; // will contain only subarrays that have length 3
    for (let i = 0; i < A.length; i++) {
        let lastSB; // temp variable for last subarray
        for (let j = i; j < A.length; j++) {
            if (i == j) {
                lastSB = [A[j]];
            } else {
                lastSB = [...lastSB, A[j]]; // spread previous lastSB and add A[j]
            }
            if (lastSB.length == 3) { // check length
                subarrays.push(lastSB);
            }
        }
    }
    log(subarrays)
}
// subArrayWithLength3([1, 2])
// subArrayWithLength3([2])
// subArrayWithLength3([1, 2, 3])
subArrayWithLength3([1, 2, 3, 4, 5, 6, 7])

//! Sum of All Subarrays

// A = [1, 2, 3]
//  [1], [2], [3], [1, 2], [2, 3], [1, 2, 3].
// output - 20



// TC - O(n^2)
//@ done with a temp variable.  carry forward way
function sumOfAllSubarrays(A) {
    console.log('sumOfAllSubarrays :', A);
    let total = 0;
    for (let i = 0; i < A.length; i++) {
        total += A[i];
        let temp = A[i]; // first element
        for (let j = i + 1; j < A.length; j++) {
            temp += A[j];
            total += temp;
        }
    }
    console.log(total);
}
sumOfAllSubarrays([1, 2, 3])
// sumOfAllSubarrays([0, 1, 2, 3, 4, 5])
// sumOfAllSubarrays([-1, -1, 1])
// sumOfAllSubarrays([771682316, 941109598, 576418705, 577696440, 540309450, 809680924, 509204729, 17284079, 323527868, 973170623])



// TC - O(n^3)
//@ done with three nested for loop
function sumAllSubarraysElements(A) {
    console.log('sumAllSubarraysElements :', A);
    let total = 0;
    //const out = [];
    for (let i = 0; i < A.length; i++) {
        for (let j = i; j < A.length; j++) {
            for (let k = i; k <= j; k++) {
                //out.push(A[k]); // if need to store then do this else remove.
                total += A[k];

            }
        }
    }
    console.log(total)
}
sumAllSubarraysElements([0, 1, 2, 3, 4, 5]);
// sumAllSubarraysElements([-1, -1, 1])
// sumAllSubarraysElements([771682316, 941109598, 576418705, 577696440, 540309450, 809680924, 509204729, 17284079, 323527868, 973170623])




//@ Done with Prefix sum technique
function sumOfAllSubarraysUsingPF(A) {
    console.log('sumOfAllSubarraysUsingPF :', A);
    const pf = [];
    pf[0] = A[0];
    for (let i = 1; i < A.length; i++) {
        pf[i] = pf[i - 1] + A[i];
    }
    let total = 0;
    for (let i = 0; i < A.length; i++) {
        total += A[i];
        for (let j = i + 1; j < A.length; j++) {
            if (i != 0) {
                total += pf[j] - pf[i - 1];
            } else {
                total += pf[j];
            }
        }
    }
    console.log(total);
    return total;

}
sumOfAllSubarraysUsingPF([1, 2, 3])

/******************************************** */


//!  Maximum Subarray Easy

/**
 * You are given an integer array C of size A. Now you need to find a subarray (contiguous elements) so that
 * the sum of contiguous elements is maximum.
But the sum must not exceed B.

Return a single integer which denotes the maximum sum.

A = 5
B = 12
C = [2, 1, 3, 4, 5]
output > 12
 */

function maxSumOfSubarray(B, C) {
    console.log('maxSumOfSubarray :', B, C);
    let maxSum = 0;
    for (let i = 0; i < C.length; i++) {
        let singleSubarraySum = C[i]; // single element also a subarray
        // Check If single element is <= B and might be maximum value compare to current maxSum
        if (singleSubarraySum <= B && singleSubarraySum > maxSum) {
            maxSum = singleSubarraySum;
        }
        for (let j = i + 1; j < C.length; j++) {
            singleSubarraySum += C[j];
            // Check single subarray sum is <= B and have sum maximum to maxSUm of previous subarrays
            if (singleSubarraySum <= B && singleSubarraySum > maxSum) {
                maxSum = singleSubarraySum;
            }
        }

    }
    console.log(maxSum)
    return maxSum;
}
maxSumOfSubarray(1, [2, 2, 2]);
maxSumOfSubarray(14, [1, 2, 4, 4, 5, 5, 5, 7, 5]);
//printAllSubarrays([1, 2, 4, 4, 5, 5, 5, 7, 5])
maxSumOfSubarray(75, [4])
maxSumOfSubarray(7, [])
maxSumOfSubarray(7, [1, 2])
maxSumOfSubarray(7, [3, 8, 8, 9, 7])
maxSumOfSubarray(11, [7, 10, 3, 1])

/****************************************************************** */


//! Return sum of individual subarray

function sumOfIndividualSubarray(A) {
    console.log('sumOfIndividualSubarray :', A);
    const pf = [];
    pf[0] = A[0];
    for (let i = 1; i < A.length; i++) {
        pf[i] = pf[i - 1] + A[i];
    }
    const sums = [];
    for (let i = 0; i < A.length; i++) {
        sums.push(A[i]); // single element is also a subarray
        for (let j = i + 1; j < A.length; j++) {
            let total = 0;
            if (i == 0) {
                total += pf[j];
            } else {
                total += pf[j] - pf[i - 1];
            }
            sums.push(total);
        }

    }
    console.log(sums);
    return sums;

}
sumOfIndividualSubarray([1, 2, 3, 4, 5])




/****************************************************************************** */

//! Good subarray -
/**
Given an array of integers A, a subarray of an array is said to be good if it fulfills any one of the criteria:
1. Length of the subarray is be even, and the sum of all the elements of the subarray must be less than B.
2. Length of the subarray is be odd, and the sum of all the elements of the subarray must be greater than B.
Your task is to find the count of good subarrays in A.

A = [1, 2, 3, 4, 5]
B = 4

Even length good subarrays = {1, 2}
Odd length good subarrays = {1, 2, 3}, {1, 2, 3, 4, 5}, {2, 3, 4}, {3, 4, 5}, {5}

//6
 */
function goodSubarray(A, B) {
    console.log('goodSubarray :', A, B);
    const pf = [];
    pf[0] = A[0];
    for (let i = 1; i < A.length; i++) {
        pf[i] = pf[i - 1] + A[i];
    }
    let count = 0;
    for (let i = 0; i < A.length; i++) {
        if (A[i] > B) { // single element is Odd length so simply check value > B
            count++;
        }
        for (let j = i + 1; j < A.length; j++) {
            let total = 0;
            if (i != 0) {
                total += pf[j] - pf[i - 1];
            } else {
                total += pf[j];
            }
            // Now we have total and next is to find length of current sub array.
            // So if i = 1 and j = 4 then length will be j - i + 1 = 4 - 1 + 1 = 4 & than check length is even or odd.
            if ((j - i + 1) % 2 === 0) { // (j - i + 1)  is number of elements in a subarray
                if (total < B) {
                    count++;
                }
            } else {
                if (total > B) {
                    count++;
                }
            }
        }

    }
    console.log(count)
    return count;

}
goodSubarray([1, 2, 3, 4, 5], 4)


/*************************************************** */

//! Counting Subarrays that have sum less then given number (B)

/**
 * Given an array A of N non-negative numbers and a non-negative number B,
you need to find the number of subarrays in A with a sum less than B.

A = [1, 11, 2, 3, 15] B = 10
output > 4
The subarrays with sum less than B are {1}, {2}, {3} and {2, 3}
 */

function countSubarrayHaveSumLessThenB(A, B) {
    console.log('countSubarrayHaveSumLessThenB :', A, B);
    const pf = [];
    pf[0] = A[0];
    for (let i = 1; i < A.length; i++) {
        pf[i] = pf[i - 1] + A[i];
    }
    let ans = 0;
    for (let i = 0; i < A.length; i++) {
        let j = i;
        let sum = 0;
        while (j < A.length) { // we can do this with For loop as well, see above questions
            if (i == 0) {
                sum = pf[j];
            } else {
                sum = pf[j] - pf[i - 1];
            }
            if (sum < B) {
                ans++;
            }
            j++;
        }
    }
    // log('count Subarray that have sum Less Then B ', ans);
    return ans;
}
console.log(countSubarrayHaveSumLessThenB([1, 11, 2, 3, 15], 10))
console.log(countSubarrayHaveSumLessThenB([2, 5, 6], 10))

/********************************************* */

//! Alternating Subarrays

/**
 * You are given an integer array A of length N comprising of 0's & 1's, and an integer B.
You have to tell all the indices of array A that can act as a center of 2 * B + 1 length 0-1 alternating subarray.

A 0-1 alternating array is an array containing only 0's & 1's, and having no adjacent 0's or 1's. For e.g. arrays [0, 1, 0, 1], [1, 0] and [1] are 0-1 alternating, while [1, 1] and [0, 1, 0, 0, 1] are not.

Return an integer array containing indices(0-based) in sorted order. If no such index exists, return an empty integer array.

Problem Constraints
1 <= N <= 10^3
A[i] equals to 0 or 1.
0 <= B <= (N - 1) / 2


 A = [1, 0, 1, 0, 1]
 B = 1
 output >  [1, 2, 3] // these are indices.
 */

 // TC - n * B  because inner loop only be run for 2 * B + 1 times and SC = O(1) 
function alternatingSubarrays(A, B) {
    log('alternatingSubarrays', A, B)
    const subArrayLength = 2 * B + 1; //we have to look only this length subarray & can skip rest all subarrays.
    const mid = Math.floor(subArrayLength / 2); // we have to find middle index of each subarray
    const indices = []; //output array
    const lastIndexToTraverse = A.length - subArrayLength;

    /*   A.length - subArrayLength => No need to traverse last remaining elements if they are not in given subarray length
      Eg. array len = 9, i = 7, subarrayLength = 3 => it will only read 7th and 8th index which is not useful for us. */

    for (let i = 0; i <= lastIndexToTraverse; i++) { // traverse only valid elements
        let prev = A[i]; // make current ith element as prev element by default for further process
        let centerIndex = i + mid; // for every subarray find center index
        let isValid01Subarray = true;

        /* i + subArrayLength => we have to look only next subArrayLength elements.
            Eg. i = 4 and subArrayLength = 3, than we have to read only 4th, 5th and 6th index
        */
        for (let j = i + 1; j < i + subArrayLength; j++) {
            if (prev == A[j]) { // We need only 0 - 1 sequences, so two same elements cannot be there.
                isValid01Subarray = false;
                break;
            }
            prev = A[j];
        }
        // If subarray is valid 0-1 sequencing then only push centerIndex to final indices array
        if (isValid01Subarray) {
            indices.push(centerIndex);
        }

    }
    log(indices);
    return indices;
}
alternatingSubarrays([1, 0, 1, 0, 1], 1) //[1, 2, 3]
alternatingSubarrays([0, 0, 0, 1, 1, 0, 1], 0) //[0, 1, 2, 3, 4, 5, 6]
alternatingSubarrays([1], 1) //[]
alternatingSubarrays([1, 2], 1) // this is not valid input as per question Constraints
alternatingSubarrays([0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1], 1) //3 7 8



//! Contribution technique

/*
arr = [1, 2, 3]

Subarrays-
[1] [1,2] [1,2,3] [2] [2,3] [3]

total sum of all subarrays elements = 20.

@ Observations-

? Contribution of Individual element in subarray-
1 came 3 times.
2 came 4 times.
3 came 3 times.

* => 1 * 3 + 2 * 4 + 3 * 3 = 3 + 8 + 9 = 20

Formula-
* Every elements comes exactly (i+1)*(n-i) times.

array   =     [1, 2, 3]
i       =      0  1  2
i+1     =      1  2  3
n-i     =      3  2  1

*/

// Find total sum of all subarrays.

// TC - O(n)
function sumOfAllSubarraysWithContributionTech(A) {
    console.log('sumOfAllSubarraysWithContributionTech :', A);
    let sum = BigInt(0);
    let n = A.length;
    for (let i = 0; i < n; i++) {
        // contribution rule : (i + 1)*(n-i)
        let freq = BigInt((i + 1) * (n - i));
        sum = (freq * BigInt(A[i])) + sum;
    }
    return Number(sum);
}

console.log(sumOfAllSubarraysWithContributionTech([1, 2, 3])) //20
console.log(sumOfAllSubarraysWithContributionTech([0, 1, 2, 3, 4, 5])) //140