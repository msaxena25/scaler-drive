
//! Print subarray that have exact length of given k.

// We have to print only k items from starting item. SO inner for loop will run only for k times.
// And when endIndex reaches to array.length terminate while loop.
function subArrayOfLengthK(A, k) {
    console.log('subArrayOfLengthK :');
    const subs = [];
    let s = 0;
    let e = k - 1;
    while (e < A.length) {
        let temp = [];
        for (let i = s; i <= e; i++) {
            temp.push(A[i]);
        }
        subs.push(temp);
        s++;
        e++;
    }
    console.log(subs)

}
// TC - O(n^2)
subArrayOfLengthK([1, 2, 3, 4, 5, 6, 7], 3);
subArrayOfLengthK([1, 2, 3, 4, 5, 6, 7], 5);

//! Return max sum of subarray of length k

// TC - O(n^2)
function maxSumOfSubArrayOfLengthK(A, k) {
    console.log('maxSumOfSubArrayOfLengthK :', A, k);
    let max = Number.MIN_SAFE_INTEGER;
    let s = 0;
    let e = k - 1;
    while (e < A.length) {
        let sum = 0;
        for (let i = s; i <= e; i++) {
            sum += A[i];
        }
        if (sum > max) {
            max = sum;
        }
        s++;
        e++;
    }
    console.log(max)

}
//maxSumOfSubArrayOfLengthK([1, 2, 3, 4, 5, 6, 7], 5);
maxSumOfSubArrayOfLengthK([1, 2, 3], 1);


//@ Same above program using Prefix sum technique

// TC - O(n) & SC - O(n)
function maxSumOfSubArrayOfLengthKUsingPF(A, k) {
    console.log('maxSumOfSubArrayOfLengthKUsingPF :', A, k);
    const pf = [];
    pf[0] = A[0];
    for (let i = 1; i < A.length; i++) {
        pf[i] = pf[i - 1] + A[i];
    }
    let max = Number.MIN_SAFE_INTEGER;
    let s = 0;
    let e = k - 1;
    while (e < A.length) {
        let sum = 0;
        if (s == 0) {
            sum = pf[e];
        } else {
            sum = pf[e] - pf[s - 1];
        }
        if (sum > max) {
            max = sum;
        }
        e++;
        s++;
    }
    console.log(max);
}
// maxSumOfSubArrayOfLengthKUsingPF([1, 2, 3, 4, 5, 6, 7], 5);
// maxSumOfSubArrayOfLengthKUsingPF([1, 2, 3], 2);
maxSumOfSubArrayOfLengthKUsingPF([1, 1, 2, 3, 1, 4, 5, 1, 5, 6], 5);


//! Lets solve same above problem with Sliding window technique where TC - O(n) but SC - O(1)


/*************************************** */

//* Sliding window technique


//? It is combination of carry forward and shift window size.

//! In Carry forward we hold one result and pass that for further element processing. Here only result is required for next opertions to get new result.

//! In Sliding window - we carry result and window as well for next operations. (Result can be sum of that window elements.) With result , one or more element of that window will be required for next calculation.


/**
 *@ EXAMPLE -

 A = [1, 2, 3, 4, 5, 6, 7, 8], K = 5;

Step1: s = 0, e = 4 (k-1) => (1,2,3,4,5) => sum -> 15
Step2: s = 1, e = 5 => (2,3,4,5,6) => sum = 15 - 1 + 6 = 20 => sum = 15 - A[0] + A[5] => sum = sum - A[s-1] + A[e]
Step3: s = 2, e = 6 => (3,4,5,6,7) => sum = 20 - 2 + 7 = 25 => sum = sum - A[s-1] + A[e]

*? So in Step 1 , result is 15 and window is (1,2,3,4,5,6)
*? In Step 2, we use result and window first element to compute next result. Now new result is 20 and new window is (2,3,4,5,6) & so on...
 */

// TC - O(n) & SC - O(1)
function maxSumOfSubArrayOfLengthKUsingSlidingWindow(A, k) {
    console.log('maxSumOfSubArrayOfLengthKUsingSlidingWindow :', A, k);

    // First calculate sum of 0 to length (k-1) Means first k element
    let sum = 0;
    for (let i = 0; i <= k - 1; i++) {
        sum += A[i];
    }
    let ans = sum;

    let s = 1; // 0th element covered in above for loop so started from 1
    let e = k;
    while (e < A.length) {
        sum = sum - A[s - 1] + A[e]; // sliding window technique
        if (sum > ans) {
            ans = sum;
        }
        e++;
        s++;
    }
    return ans;
}
console.log(maxSumOfSubArrayOfLengthKUsingSlidingWindow([1, 1, 2, 3, 1, 4, 5, 1, 5, 6], 5))



//!  Subarray with given sum and length

/**
Given an array A of length N. Also given are integers B and C.
Return 1 if there exists a subarray with length B having sum C and 0 otherwise.

A = [4, 3, 2, 6]
B = 2
C = 5
output > 1
 */

//@ Done with using Prefix sum technique

function subarrayExistOfGivenSumAndLength(A, B, C) {
    console.log('subarrayExistOfGivenSumAndLength :', A, B, C);
    const pf = [];
    pf[0] = A[0];
    for (let i = 1; i < A.length; i++) {
        pf[i] = pf[i - 1] + A[i];
    }
    let s = 0;
    let e = B - 1;
    while (e < A.length) {
        let sum = 0;
        if (s == 0) {
            sum = pf[e];
        } else {
            sum = pf[e] - pf[s - 1];
        }
        if (sum == C) {
            return 1;
        }
        e++;
        s++;
    }
    return 0;
}
// console.log(subarrayExistOfGivenSumAndLength([4, 3, 2, 6], 2, 5))
// console.log(subarrayExistOfGivenSumAndLength([4, 2, 2], 2, 8))
// console.log(subarrayExistOfGivenSumAndLength([4], 1, 4))
console.log(subarrayExistOfGivenSumAndLength([6, 3, 3, 6, 7, 8, 7, 3, 7], 2, 10))



/********************************* */

//!  Minimum Swaps

/**
Given an array of integers A and an integer B, find and return the minimum number of swaps required to bring all the numbers less than or equal to B together.
Note: It is possible to swap any two elements, not necessarily consecutive.

 A = [1, 12, 10, 3, 14, 10, 5] B = 8
 output > 2
 */

//@ Hint - Count elements in array < 8 (B), and that is 3. So now we have to check each subarray of length 3.
// @ In each subarray of length 3, element which are greater then 8 needs to swap out to make all numbers of that subarray < B.


function minSwap(A, B) {
    console.log('minSwap :', A, B);
    let count = 0; // count numbers <= B
    for (let i = 0; i < A.length; i++) {
        if (A[i] <= B) {
            count++;
        }
    }
    //console.log(count);
    let s = 0;
    let e = count - 1; // end index
    let minSwap = A.length;
    while (e < A.length) {
        let swap = 0;
        for (let i = s; i <= e; i++) {
            // if A[i] > B means we need to swap this element
            if (A[i] > B) {
                swap++;
            }
        }
        if (swap < minSwap) {
            minSwap = swap;
        }
        s++;
        e++;
    }
    console.log(minSwap);

}
// TC - O(n^2)

// minSwap([1, 12, 10, 3, 14, 10, 5], 8) //2
// minSwap([5, 17, 100, 11], 20); //1
// minSwap([1], 1); //0
// minSwap([1, 5, 2, 3, 2], 3); //1
// minSwap([2, 3, 2, 2, 2], 3); //1
minSwap([10, 12, 11, 2, 14, 3, 10, 5], 8) //1
const C = [31, 98, 58, 86, 36, 31, 3, 22, 4, 17, 51, 33, 56, 7, 91, 17, 59, 66, 54, 67, 55, 41, 58, 24, 100, 1, 98, 68, 21, 33, 27, 67, 20, 66, 20, 100, 36, 89, 20, 15, 13, 26, 11, 29, 99, 36, 39, 49, 74, 77, 54, 66, 30, 21, 14, 18, 83, 72, 10, 22, 53, 83, 60, 9, 68, 56, 9, 21, 77, 44, 45, 61, 97, 82, 35, 16, 38, 95, 55, 11, 46, 77, 25, 3, 44];
minSwap(C, 18);

//! Lets solve same above problem with Sliding window technique. - TC - O(n) & SC - O(1)


/**
 A = [10, 12, 11, 2, 14, 3, 10, 5] B = 8

Step 1: Count numbers  < B => 3
Logic: In each subarray of length 3, element which are greater then 8 (B) needs to swap out to make all numbers of that subarray < B.
Step 2: Find no. of max elements in first 3 elements starts from 0 index => max elements = 3 from (10, 12, 11)
        So now atleast minswap are 3 and current window is (10, 12, 11)
Step 3: Now check in next window (12, 11, 2) that starts from index 1.
        s =  1 and e = 3, First check A[s-1] > B then ans--;; and then check A[e] > B then ans = ans + 1;


 output > 2
 */

function minSwapWithSlidingWindow(A, B) {
    console.log('minSwapWithSlidingWindow :', A, B);
    let k = 0; // count numbers <= B
    for (let i = 0; i < A.length; i++) {
        if (A[i] <= B) {
            k++;
        }
    }
    let swap = 0;
    for (let i = 0; i <= k - 1; i++) {
        if (A[i] > B) {
            swap++;
        }
    }
    let minSwap = swap;
    let s = 1; // started from index 1, index 0 already covered in above for loop
    let e = k;
    while (e < A.length) {
        if (A[s - 1] > B) { //* Explained after this program
            swap--;
        }
        if (A[e] > B) {
            swap++;
        }
        if (swap < minSwap) {
            minSwap = swap;
        }
        s++;
        e++;
    }
    console.log(minSwap)
}
minSwapWithSlidingWindow([10, 12, 11, 2, 14, 3, 10, 5], 8) //1
minSwapWithSlidingWindow([3, 3, 1, 4, 2], 3) //1

const A = [52, 7, 93, 47, 68, 26, 51, 44, 5, 41, 88, 19, 78, 38, 17, 13, 24, 74, 92, 5, 84, 27, 48, 49, 37, 59, 3, 56, 79, 26, 55, 60, 16, 83, 63, 40, 55, 9, 96, 29, 7, 22, 27, 74, 78, 38, 11, 65, 29, 52, 36, 21, 94, 46, 52, 47, 87, 33, 87, 70];
minSwapWithSlidingWindow(A, 19);

const B = [31, 98, 58, 86, 36, 31, 3, 22, 4, 17, 51, 33, 56, 7, 91, 17, 59, 66, 54, 67, 55, 41, 58, 24, 100, 1, 98, 68, 21, 33, 27, 67, 20, 66, 20, 100, 36, 89, 20, 15, 13, 26, 11, 29, 99, 36, 39, 49, 74, 77, 54, 66, 30, 21, 14, 18, 83, 72, 10, 22, 53, 83, 60, 9, 68, 56, 9, 21, 77, 44, 45, 61, 97, 82, 35, 16, 38, 95, 55, 11, 46, 77, 25, 3, 44];
minSwapWithSlidingWindow(B, 18);

/*
* Understand A[s - 1] > B condition.

A = [5, 6, 1, 4, 2, 0] & B = 3(check numbers less then 3)
Step 1: Count elements less then B and that is 3 => k = 3
Step 2: s = 0, e = 2 => 5, 6, 1
Step 3: s = 1, e = 3 => 6, 1, 4

In Step 2, elements > 3 are 2. So ans = 2;
In Step 3, 6 and 1 was also in previous window (in step 2) and 4 is added new element now.
In sliding window , we check first element from previous window that is 5 in our case and newly added element that is 4.
So if 5 > 3 (B) => ans--; means there is only 1 element greater then B from remaining two elements (6, 1).
& 4 > 3 (B) means newly added element is > B then ans++;  So now again ans = 2;
...
..

*/



/****************************************** */

//! print boundries element of 2d array (order does not matter).

/*
? Input-
[
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
]

Output > [1, 2, 3, 4, 5, 8, 9, 12, 13, 14, 15, 16]
*/

//? Hint -  In (n * m) matrix, A[i][j] is Boundry element if-
//? i == 0 OR i == n-1 OR j == 0 OR j == m-1


function printBoundries(A) {
    console.log('printBoundries :', A);
    const ans = [];
    for (let i = 0; i < A.length; i++) { // there are 4 boundries
        for (let j = 0; j < A[0].length; j++) {
            if (i == 0 || j == 0 || j == A[0].length - 1 || i == A.length - 1) {
                ans.push(A[i][j])
            }
        }
    }
    console.log(ans)
}
const arr1 = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
]
printBoundries(arr1) // [1, 2, 3, 4, 5, 8, 9, 12, 13, 14, 15, 16]

/*************************************** */

//! Print boundries elements of 2 d array (n*n) clockwise.

/*
? Input -
[
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
]

?Output > [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5]

*/

/*
* Solution -
- We have to print boundries elements top row, right column, bottom row and left column.
- For this we will use 4 for or while loop.
- In each loop, we will read n-1 elements, so that in next loop, we could start from corner element.
- In first while loop - we read  1 2 3
- In Second while loop - we read  4 8 12
- In third while loop - we read  16 15 14
- In fourth while loop - we read  13 9 5

*/

//* Best approach-
function printBoundriesClockWise(A) {
    console.log('printBoundriesClockWise :', A);
    let n = A.length;
    const ans = [];

    let i = 0;
    let j = 0;

    for (let k = 1; k < n; k++) {
        ans.push(A[i][j]);
        j++;
    }
    for (let k = 1; k < n; k++) {
        ans.push(A[i][j]);
        i++;
    }
    for (let k = 1; k < n; k++) {
        ans.push(A[i][j]);
        j--;
    }
    for (let k = 1; k < n; k++) {
        ans.push(A[i][j]);
        i--;
    }
    console.log(ans);
    return ans;
}


//@ Solution with while loop if we dont use another variable k - we have used i and j updated values every time.

function printBoundriesClockWiseWhileLoop(A) {
    console.log('printBoundriesClockWiseWhileLoop :', A);
    const n = A.length;
    const ans = [];

    let i = 0;
    let j = 0;
    while (j < n - 1) { // L to R
        ans.push(A[i][j])
        j++;
    }
    console.log(i, j) // 0 3
    while (i < n - 1) { // T to B
        ans.push(A[i][j])
        i++;
    }
    console.log(i, j) // 3 3
    while (j > 0) { // R to L
        ans.push(A[i][j])
        j--;
    }
    console.log(i, j) // 3 0
    while (i > 0) { // B to T
        ans.push(A[i][j])
        i--;
    }
    console.log(i, j) // 0 0
    console.log(ans);
    return ans;
}
printBoundriesClockWiseWhileLoop(arr1); // [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 1]




//@ Below program is same as above , Just one difference is starting element. in while loop
// - In first while loop - we read  1 2 3 4
// - In Second while loop - we read  8 12 16
// - In third while loop - we read   15 14 13
// - In fourth while loop - we read  9 5


/* // TC  = O(n)
function printBoundriesClockWise1(A) {
    console.log('printBoundriesClockWise1 :', A);
    const n = A.length;
    const m = A[0].length;
    const ans = [];
    let i = 0;
    let j = 0;

    while (j < m) {
        ans.push(A[i][j]);
        j++;
    };
    i = 1; //  first row
    j = m - 1; // last column is fixed
    while (i < n) {
        ans.push(A[i][j]);
        i++;
    };
    i = n - 1; // last row is fixed
    j = m - 2; // start from second last column
    while (j >= 0) {
        ans.push(A[i][j]);
        j--;
    };
    i = n - 2; // start from second last row
    j = 0; // first column fixed
    while (i > 0) {
        ans.push(A[i][j]);
        i--;
    }
    console.log(ans)

}
printBoundriesClockWise1(arr1); // [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 1] */




/*************************************************** */

//! Array Spiral printing of elements in Clockwise direction -

//* Using boundries program approach and run that approach for each elements using while loop.

function spiral(A) {
    console.log('spiral :', A);
    let n = A.length;
    const ans = [];

    let i = 0;
    let j = 0;

    while (n > 0) {
        for (let k = 1; k < n; k++) { // Top row
            ans.push(A[i][j]);
            j++;
        }
        for (let k = 1; k < n; k++) { // Right column
            ans.push(A[i][j]);
            i++;
        }
        for (let k = 1; k < n; k++) { // Bottom row
            ans.push(A[i][j]);
            j--;
        }
        for (let k = 1; k < n; k++) { // Left column
            ans.push(A[i][j]);
            i--;
        }
        if (n == 1) { // in case n == 1, means only 1 item left.
            ans.push(A[i][j]);
        }
        n = n - 2; // after every round, n-2 elements remains in a row or column.
        i++;
        j++;
    }
    console.log(ans);
}
const arr2 = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
]
spiral(arr2); // [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]

const arr3 = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25]
]
spiral(arr3); // [1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6, 7, 8, 9, 14, 19, 18, 17, 12, 13]

const arr4 = [
    [1, 2, 3, 4, 5, 26],
    [6, 7, 8, 9, 10, 27],
    [11, 12, 13, 14, 15, 28],
    [16, 17, 18, 19, 20, 29],
    [21, 22, 23, 24, 25, 30],
    [31, 32, 33, 34, 35, 36]
]
spiral(arr4);

const arr5 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
spiral(arr5); //  [1, 2, 3, 6, 9, 8, 7, 4, 5]


/*********************************************** */

//! Return Spiral matrix -

/* Given an integer A, generate a square matrix filled with elements from 1 to A2 in spiral order and 
return the generated square matrix.

Input > 5
Output >
[ [1, 2, 3, 4, 5], [16, 17, 18, 19, 6], [15, 24, 25, 20, 7], [14, 23, 22, 21, 8], [13, 12, 11, 10, 9] ] */


function spiralMatrix(A) {
    console.log('spiralMatrix :', A);
    let n = A;
    const ans = [];
    let num = 1;

    // create n rows to store spiral elements
    for (let i = 0; i < n; i++) {
        ans.push([])
    }
    let i = 0;
    let j = 0;

    while (n > 0) {
        for (let k = 1; k < n; k++) { // Top row
            ans[i][j] = num++;
            j++;
        }
        for (let k = 1; k < n; k++) { // Right column
            ans[i][j] = num++;
            i++;
        }
        for (let k = 1; k < n; k++) { // Bottom row
            ans[i][j] = num++;
            j--;
        }
        for (let k = 1; k < n; k++) { // Left column
            ans[i][j] = num++;
            i--;
        }
        if (n == 1) { // in case n == 1, means only 1 item left.
            ans[i][j] = num++;
        }
        n = n - 2; // after every round, n-2 elements remains in a row or column.
        i++;
        j++;
    }
    console.log(ans);
    return ans;
}
spiralMatrix(5);