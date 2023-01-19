
//!  Max Sum Contiguous Subarray

/*
Find the contiguous non-empty subarray within an array, A of length N, with the largest sum.

Output Format-
Return an integer representing the maximum possible sum of the contiguous subarray.

 A = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
 output = 6
*/

// TC - O(n^2) With Carry Forward technique
function maxSum1(A) {
    let ans = A[0];
    for (let i = 0; i < A.length; i++) {
        let sum = A[i];
        if (sum > ans) {
            ans = sum;
        }
        for (let j = i + 1; j < A.length; j++) {
            sum = sum + A[j];
            if (sum > ans) {
                ans = sum;
            }
        }

    }
    return ans;
}
console.log(maxSum1([-2, 1, -3, 4, -1, 2, 1, -5, 4])) //6
console.log(maxSum1([-2])) // -2
console.log(maxSum1([-2, -3, -1])) // -1
console.log(maxSum1([2, 3, 4])) // 9


// TC - O(n)

/*
* Solve with Kadane’s Algorithm

@Observations-

arr = [-2, -3, -1]

? If all elements are negative numbers then max element of given array will also be Max sum of subarray.

Subarrays- [-2], [-3], [-1], [-2, -3], [-2, -3, -1], [-3, -1]

Here [-1] is the subarray that have max sum.


aa = [1, 2, 3]

? If all elements are positive numbers then sum of all elements will be max sum of subarray.

Here [1,2,3] is the subarray and that have max sum 6.


? Mix array of positive and negative elements-

arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

element     sum             ans                Comments
-2          0               -2              (Initial values)
1           0 + 1 = 1       1 > -2 = 1      (1 > -2 so new ans is 1)
-3          1 - 3 = -2      1               (Here sum is -2, so now consider sum to 0 for next operation)
4           0 + 4 = 4       4 > 1 = 4
-1          4 - 1 = 3       4
2           3 + 2 = 5       5 > 4 = 5
1           5 + 1 = 6       6 > 5 = 6
-5          6 - 5 = 1       6
4           1 + 4 = 5       6

*/


function maxSum2(A) {
    let ans = A[0];
    let sum = 0;
    for (let i = 1; i < A.length; i++) {
        sum = sum + A[i];
        if (sum > ans) {
            ans = sum;
        }
        if (sum < 0) {
            sum = 0;
        }
    }
    return ans;

}
console.log(maxSum2([-2, -3, -1]))
console.log(maxSum2([-2, 1, -3, 4, -1, 2, 1, -5, 4])) //6
console.log(maxSum1([1, 2])) //3



//! Add x

/*
Given an array where A[i] = 0. Return then final array after performing queries Q[i, x]. Add x to all element from i to n-1.
*/


/*
@ Explanation-

arr = [0, 0, 0, 0, 0, 0, 0, 0]

Query: [1, 3]
arr = [0, 3, 0, 0, 0, 0, 0, 0]

Query: [4, 2]
arr = [0, 3, 0, 0, 2, 0, 0, 0]

Query: [3, 1]
arr = [0, 3, 0, 1, 2, 0, 0, 0]

Now return prefix sum of final arr and that will be answer.

*/

// TC - O(Q + n)
function addX(A, Q) {
    for (let i = 0; i < Q.length; i++) {
        const [j, x] = Q[i];
        A[j] += x;
    }
    const pf = []
    pf[0] = A[0];
    for (let i = 1; i < A.length; i++) {
        pf[i] = pf[i - 1] + A[i];
    }
    return pf;
}

console.log(addX([0, 0, 0, 0, 0, 0, 0, 0], [[1, 3], [4, 2], [3, 1]]))


//! Continuous Sum Query

/*
Given an integer array where A[i] = 0, return the final array after performing queries Q[i, j, x].
Add x to all elements from index i to j.

Given array is 1-based indexing.
*/


// TC - O(n^2)
function addX1(A, Q) {
    for (let i = 0; i < Q.length; i++) {
        let [s, e, x] = Q[i];
        while (s <= e) {
            A[s - 1] += x; // array is 1-index based to did -1
            s++;
        }
    }
    return A;
}
console.log(addX1([0, 0, 0, 0, 0], [[1, 2, 10], [2, 3, 20], [2, 5, 25]]))

//@ Lets solve above problem with O(q + n)

function addX1Optimized(A, Q) {
    for (let i = 0; i < Q.length; i++) {
        let [s, e, x] = Q[i];
        A[s - 1] += x; // array is 1-indexed based
        if (e < A.length) {
            A[e] -= x;
        }
    }
    //console.log(A)
    const pf = []
    pf[0] = A[0];
    for (let i = 1; i < A.length; i++) {
        pf[i] = pf[i - 1] + A[i];
    }
    return pf;
}
console.log(addX1Optimized([0, 0, 0, 0, 0], [[1, 2, 10], [2, 3, 20], [2, 5, 25]]))


//!Maximum Absolute Difference


/*
You are given an array of N integers, A1, A2, .... AN.

Return the maximum value of f(i, j) for all 1 ≤ i, j ≤ N. f(i, j) is defined as |A[i] - A[j]| + |i - j|,
 where |x| denotes absolute value of x.

Input: A = [1, 3, -1]
Output: 5
 */

/*
@ Explanation-

* Absolute value of +3 and -3 are same, |3| = |-3|

?  A = [1, 3, -1]

f(i, j) = |A[i] - A[j]| + |i - j|

f(1, 1) = |1 - 1| + |1 - 1| = 0
f(1, 2) = |1 - 3| + |1 - 2| = 2 + 1 = 3
f(1, 3) = |1 - -1| + |1 - 3| = 2 + 2 = 4
f(2, 2) = |3 - 3| + |2 - 2| = 0
f(2, 3) = |3 - -1| + |2 - 3| = 4 + 1 = 5

f(3, 3) = |-1 - -1| + |3 - 3| = 0
f(2, 1) = |3 - 1| + |2 - 1| = 2 + 1 = 3
f(3, 1) = 4
f(3, 2) = 5

f(1, 1) = f(2, 2) = f(3, 3) because x - x is always be 0.
f(1, 2) = f(2, 1) because of absolute operation.
f(2, 3) = f(3, 2)
f(1, 3) = f(3, 1)


*/

// indexing-1 based array
function absoluteMaxResult(A) {
    console.log('absoluteMaxResult :', A);
    let ans = 0;
    for (let i = 1; i <= A.length; i++) {
        for (let j = i + 1; j <= A.length; j++) {
            let res = Math.abs(A[i - 1] - A[j - 1]) + Math.abs(i - j);
            if (res > ans) {
                ans = res;
            }
        }
    }
    return ans;

}
console.log(absoluteMaxResult([1, 3, -1]))
console.log(absoluteMaxResult([2]))