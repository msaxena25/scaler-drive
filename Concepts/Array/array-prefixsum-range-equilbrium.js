//! Doc link - https://drive.google.com/drive/u/0/folders/1nJoEq-b_aVbYjZ_eds4TvaAzZRWvhRka

/**
 *? Prefix array is a very vital tool in competitive programming. This helps to minimize the repeated calculation done in an array and thus reduces the time complexity of your program.

 *? Given an array arr of size n,  the prefix sum is another array (say prefixSum) of same size such that -
 *! for each index (i), prefixSum[i] denotes a[0] + a[1] .... + a[i-1] + a[i].
 */

/*
Input : a[] = {3, 2, 1, 5, 4}
Output : prefixSum[] = {3, 5, 6, 11, 15}

i	Calculation	    prefixSum[i]
0	3	                3
1	3 + 2	            5
2	3 + 2 + 1	        6
3	3 + 2 + 1 + 5	    11
4	3 + 2 + 1 + 5 + 4	15
*/

// Solution *************

//! Brute Force Approach

/**
 * For each index i compute the value of a[0] + a[1] + ... + a[i], and store the result in prefixSum[i].
*/

function prefixSum(arr) {
    const pf = [];
    for (let i = 0; i < arr.length; i++) {
        let sum = 0;
        for (let j = 0; j <= i; j++) {
            sum += arr[j];
        }
        pf[i] = sum;

    }
    console.log(pf);
}

// TC - O(n^2)
// SC - O(n)
prefixSum([1, 2, 3, 4]) //[1, 3, 6, 10]

//! Efficient Approach

/*
PF[0] = arr[0];
PF[1] = arr[0] + arr[1] = PF[0] + arr[1];
PF[i] = PF[i-1] + arr[i];
 */

function prefixSum1(arr) {
    const pf = [];
    pf[0] = arr[0];
    for (let i = 1; i < arr.length; i++) {
        pf[i] = pf[i - 1] + arr[i];

    }
    console.log(pf);
}

// TC - O(n)
// SC - O(n)
prefixSum1([1, 2, 3, 4]) //[1, 3, 6, 10]
prefixSum1([3, 2, 1, 5, 4]) // [3, 5, 6, 11, 15]

/****************************************** */

//! Given n array elements and Q range queries with pair (i, j). For each query, Calculate the sum of all elements in given range.
//! Constraints - i <= j && i >= 0 && j < n

//# Brute Force Method

function calculateRangeSum1(arr, queries) {
    const rangeSum = [];
    for (let i = 0; i < queries.length; i++) {
        let [l, r] = queries[i]; // left & right value
        let sum = 0;
        while (l <= r) {
            sum += arr[l];
            l++;
        }
        rangeSum.push(sum);
    }
    console.log(rangeSum);
}

// TC - O(Q * N)
// SC - O(Q)
calculateRangeSum1([1, 2, 3, 4, 5, 6, 7, 8], [[1, 5], [2, 6], [6, 7]]); //[20, 25, 15]

//! Lets solve above problem with Prefix sum technique.

function calculateRangeSumWithPf(arr, queries) {
    const rangeSum = [];
    let pf = [];
    pf[0] = arr[0];
    for (let i = 1; i < arr.length; i++) {
        pf[i] = pf[i - 1] + arr[i];
    }
    console.log(arr, 'pf of given array- ', pf);
    for (let i = 0; i < queries.length; i++) {
        let [l, r] = queries[i]; // left & right value
        if (l === 0) {
            rangeSum.push(pf[r]);
        } else {
            rangeSum.push(pf[r] - pf[l - 1]);
        }


    }
    console.log(rangeSum);
}
// TC - O(n)
// SC - O(n)
calculateRangeSumWithPf([1, 2, 3, 4, 5, 6, 7, 8], [[1, 5], [2, 6], [6, 7]]); //[20, 25, 15]
calculateRangeSumWithPf([1, 2, 3, 4, 5], [[0, 3], [4, 4]]); //[10, 5]
calculateRangeSumWithPf([1, 2, 3, 4, 5], [[0, 3], [4, 4]]); //[10, 5]



//@ SUM RANGE PROBLEM WITH 1 INDEXED ARRAY


/**
 * ! In the below problem, we have to consider PF array from index 1 as mentioned in question statement.
 * ? So We need to apply Formulas like -
 * ? Sum[l, r]
 * ? If l = 0 then Sum[0, r] = PF[r-1]
 * ? if l > 0 then Sum[l, r] = PF[r-1] - PF[l-1-1]
 *
 *
 * You are given an integer array A of length N.
You are also given a 2D integer array B with dimensions M x 2, where each row denotes a [L, R] query.
For each query, you have to find the sum of all elements from L to R indices in A (1 - indexed).
More formally, find A[L] + A[L + 1] + A[L + 2] +... + A[R - 1] + A[R] for each query.

1 <= N, M <= 105
1 <= A[i] <= 109
1 <= L <= R <= N

Return an integer array of length M where ith element is the answer for ith query in B.

A = [1, 2, 3, 4, 5]
B = [[1, 4], [2, 3]]
> [10, 5]

A = [2, 2, 2]
B = [[1, 1], [2, 3]]
> [2, 4]

A = [7, 3, 1, 5, 5, 5, 1, 2, 4, 5]
B = [[7, 10],[3, 10],[3, 5],[1, 10]]
>  12 28 11 38
 */

function calculateRangeSumWithPf1(A, B) {
    const rangeSum = [];
    let pf = [];
    pf[0] = A[0];
    for (let i = 1; i < A.length; i++) {
        pf[i] = pf[i - 1] + A[i];
    }
    console.log(A, 'pf of given array- ', pf);
    for (let i = 0; i < B.length; i++) {
        let [l, r] = B[i];
        if (l === 1) { // min value given of l is 1 not 0
            rangeSum.push(pf[r - 1]);
        } else {
            rangeSum.push(pf[r - 1] - pf[l - 1 - 1]);
        }


    }
    console.log(rangeSum);
}
calculateRangeSumWithPf1([2, 2, 2], [[1, 1], [2, 3]]); // [2, 4]
calculateRangeSumWithPf1([7, 3, 1, 5, 5, 5, 1, 2, 4, 5], [[7, 10], [3, 10], [3, 5], [1, 10]]); // 12 28 11 38

/****************************************** */

//@ Equilibrium index of an array

//* The equilibrium index can be defined as the index in the array such that the sum of elements of lower indices is equal to the sum of elements of higher indices.

//? If ith index is equilibrium index of an array then -
//? leftSum = [0,i-1] & rightSum = [i+1, n-1] & leftSum === rightSum.


//! Brute Force approach

// Return first ith index that is equilibrium index.
function equilibriumIndex(arr) {
    for (let i = 0; i < arr.length; i++) {
        let leftSum = 0;
        let rightSum = 0;
        for (let j = 0; j < arr.length; j++) {
            if (j < i) {
                leftSum += arr[j];
            } else if (j > i) {
                rightSum += arr[j]
            }
        }
        if (leftSum === rightSum) {
            return i;
        }
    }
    return -1;
}
// TC - O(N^2)
// SC - O(1)
console.log(equilibriumIndex([-7, 1, 5, 2, -4, 3, 0])) //3
console.log(equilibriumIndex([1, 2, 3])) //-1

//! O(n) approach

//@ This below program will count total number of equilibrium indices & return that.
//@ You can also return first ith index that is equilibrium index.

function equilibriumIndexWithPF(arr) {
    let countEquiliBriumIndices = 0;
    let pf = [];
    pf[0] = arr[0];
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        pf[i] = pf[i - 1] + arr[i];
    }
    console.log(arr, 'pf of given array- ', pf);
    for (let i = 0; i < n; i++) {
        const leftSum = pf[i - 1] || 0; //leftSum = [0, i-1], for i === 0, OR condition will run.
        const rightSum = pf[n - 1] - pf[(i + 1) - 1]; // [i+1, n-1]
        console.log('index- ', i, 'leftsum = ', leftSum, 'rightsum = ', rightSum)
        if (leftSum === rightSum) {
            countEquiliBriumIndices++;
        }
    }
    return countEquiliBriumIndices;
}
console.log(equilibriumIndexWithPF([-7, 1, 5, 2, -4, 3, 0]))
console.log(equilibriumIndexWithPF([1, 2, 1]))
console.log(equilibriumIndexWithPF([1]))
console.log(equilibriumIndexWithPF([1]))

/*********************************************** */


//! Even numbers in a range

/**
You are given an array A of length N and Q queries given by the 2D array B of size Q*2.
Each query consists of two integers B[i][0] and B[i][1].
For every query, the task is to find the count of even numbers in the range A[B[i][0]…B[i][1]].

1 <= N <= 10^5
1 <= Q <= 10^5
1 <= A[i] <= 10^9
0 <= B[i][0] <= B[i][1] < N

Return an array of integers.

A = [1, 2, 3, 4, 5]
B = [   [0,2], [1,4]   ]
output - [1, 2]

A = [2, 1, 8, 3, 9]
B = [   [0,3], [2,4]   ]
output - [2, 1]
 */


//@ Brute force approach

function evenNumberInRange(A, B) {
    const even = [];
    for (let i = 0; i < B.length; i++) {
        let [l, r] = B[i];
        let count = 0;
        while (l <= r) {
            if (A[l] % 2 === 0) {
                count++;
            }
            l++;
        }
        even.push(count);
    }
    console.log(even);
}
//evenNumberInRange([2, 1, 8, 3, 9], [[0, 3], [2, 4]])

//@ O(n) approach

/* 1. Check each number of array even or odd.
2. If that is even number then update A[i] to 1 else 0.
3. Based on 1 & 0, create PrefixSum array */

function evenNumberInRange1(A, B) {
    const evenPf = [];
    const evenCount = [];
    for (let i = 0; i < A.length; i++) {
        if (A[i] % 2 === 0) {
            A[i] = 1;
        } else {
            A[i] = 0;
        }
        if (i === 0) {
            evenPf[0] = A[0];
        } else {
            evenPf[i] = evenPf[i - 1] + A[i];
        }

    }
    console.log(evenPf)
    for (let i = 0; i < B.length; i++) {
        let [l, r] = B[i];
        if (l === 0) {
            evenCount.push(evenPf[r])
        } else {
            evenCount.push(evenPf[r] - evenPf[l - 1])
        }
    }
    console.log(evenCount);
}
//evenNumberInRange1([2, 1, 8, 3, 9], [[0, 3], [2, 4]])

//* Refactor version of the above program

function evenNumberInRangeRefactor(A, B) {
    const evenPf = [];
    const evenCount = [];
    evenPf[0] = 1 - (A[0] % 2); // For even number, second part is 0 so it will assign 1 else 0.
    for (let i = 1; i < A.length; i++) {
        evenPf[i] = evenPf[i - 1] + (1 - (A[i] % 2));

    }
    for (let i = 0; i < B.length; i++) {
        const [l, r] = B[i];
        if (l === 0) {
            evenCount.push(evenPf[r])
        } else {
            evenCount.push(evenPf[r] - evenPf[l - 1])
        }
    }
    console.log(evenCount);
}
evenNumberInRangeRefactor([2, 1, 8, 3, 9], [[0, 3], [2, 4]])
evenNumberInRangeRefactor([1, 2, 3, 4, 5], [[0, 2], [2, 4]])

//! Some times on Online editor we get an error in Modular operation & that is -
//* Error - TypeError: Cannot mix BigInt and other types, use explicit conversions on  A[0] % 2;
//? Solution -  (parseInt(A[0]) % 2);

/************************ */

//! Array prefix sum with Space C -  O(1)
// https://leetcode.com/problems/running-sum-of-1d-array/description/

// Updating original array
var runningSum = function (nums) {
    for (let i = 1; i < nums.length; i++) {
        nums[i] = nums[i - 1] + nums[i];
    }
    return nums;

};


//! Return prefix sum array of even and odd indices elements

function findPFOfEvenOddIndices(A) {
    console.log('findPFOfEvenOddIndices :', A);
    const evenPf = [];
    const oddPf = [];

    evenPf[0] = A[0]; // first even index is 0.
    oddPf[0] = 0; // first odd index is 1. So assign 0 at 0th index.

    for (let i = 1; i < A.length; i++) {
        if (i % 2 == 0) {
            evenPf[i] = evenPf[i - 1] + A[i];
            oddPf[i] = oddPf[i - 1];
        } else {
            evenPf[i] = evenPf[i - 1];
            oddPf[i] = oddPf[i - 1] + A[i];
        }
    }
    console.log(evenPf, oddPf)

}
findPFOfEvenOddIndices([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
// evenPf - [1, 1, 4, 4, 9, 9, 16, 16, 25, 25]
// oddPf - [0, 2, 2, 6, 6, 12, 12, 20, 20, 30]