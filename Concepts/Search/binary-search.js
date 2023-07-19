// https://www.scaler.com/topics/data-structures/binary-search-algorithm/

//@ Binary search in Javascript - Link
// https://www.scaler.com/topics/binary-search-in-javascript/


/*
Given a sorted array A of size N and a target value B, return the index (0-based indexing) if the target is found.
If not, return the index where it would be if it were inserted in order.

NOTE: You may assume no duplicates in the array. Users are expected to solve this in O(log(N)) time.

A = [1, 3, 5, 6]
B = 5

*/


//? TC - O(n)
function searchInsert(A, B) {
    for (let i = 0; i < A.length; i++) {
        if (A[i] == B) { // element is equal, return index
            return i;
        } else if (A[i] > B) { // element is > then target means it is not in array and we can push it at ith index.
            return i;
        }
    }
    return A.length; // element is greater then all element,so will push only at last index
}

console.log(searchInsert([1, 3, 5, 6], 5)) //2
console.log(searchInsert([1, 3, 5, 7], 9)) //4
console.log(searchInsert([1, 3, 5, 6], 2)) //1 Because 1 is not in array so it would be push at 1st index.

//! Binary search

/*
* Binary Search is an algorithm that can be used to search an element in a sorted data set. By sorted, we mean that the elements will either be in a natural increasing or decreasing order.

Binary Search works on the principle of Divide and Conquer.
It divides the array into two halves and tries to find the element K in one or the other half, not both.
It keeps on doing this until we either find the element or the array is exhausted.


? We start the search at the middle of the array, and divide the array into binary, or two parts.
If the middle element is less than K, go to left side and search in to that.
If the middle element is greater than K, go to right side.
*/


function binarySearch(A, B) {
    console.log('binarySearch :', A, B);
    let n = A.length;
    let left = 0;
    let right = n - 1;
    // left > right => unable to split more & we could not find k. return -1.
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (B == A[mid]) {
            return mid;
        } else if (B < A[mid]) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return -1;
}

// console.log(binarySearch([1, 2, 3, 4, 5, 6, 8], 7)) // -1
// console.log(binarySearch([1, 2, 3, 4, 5, 6, 8], 3)) // 2
console.log(binarySearch([1, 2, 3, 5, 6, 8], 4)) //-1


//! Time Complexity of Binary search

/*
* TC = log(n) base 2

For an array of size N, it will take log(n) steps to split it into two halves until only one element is left. 

? Why base 2 ?
Because we are diving array into 2 parts =>
n -> n/2 -> n/2^2 -> n/2^3 ..... -> n/2^k

* SC = O(1)

*/

//@ Lets solve the same first problem with binary search approach. -- And only change in above algo is last return statement. return left instead of -1.



function searchInsertWithBinarySearch(A, B) {
    console.log('searchInsertWithBinarySearch :', A, B);
    let n = A.length;
    let left = 0;
    let right = n - 1;
    // left > right => unable to split more & we could not find k. return -1.
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (B == A[mid]) {
            return mid;
        } else if (B < A[mid]) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return left;
}

console.log(searchInsertWithBinarySearch([1, 3, 5, 6], 5)) //2
console.log(searchInsertWithBinarySearch([1, 3, 5, 7], 9)) //4
console.log(searchInsertWithBinarySearch([1, 3, 5, 6], 2)) //1 Because 1 is not in array so it would be push at 1st index.


//! Can we use Binary search only for Sorted array?

//? Read below article-
// https://www.scaler.com/topics/data-structures/binary-search-algorithm/

/*
If the array is sorted, binary search is the clear winner. It takes log(N) in the worst case while linear search
will take O(N) in the worst case.

* Lets see when array is not sorted.

If the array is not sorted, we won’t be able to use binary search directly. Yikes! We can always sort the array and then apply binary search 😀
But sorting itself might take O(nlogn) & then additional O(logn) for binary search. This is even worse than linear search. In that case, a linear search might be the best solution.

? But if you are given an array and you have to perform multiple Queries, let’s say Q search queries on it. Then binary search is your best friend.
 Why?
Because once we sort the array, then we can perform all the queries one by one on the sorted array.
*/

//!  Single Element in Sorted Array
// https://www.scaler.com/academy/mentee-dashboard/class/47669/assignment/problems/4131/?navref=cl_pb_nv_tb


/*
Given a sorted array of integers A where every element appears twice except for one element which appears once, find and return this single element that appears only once.

A = [1, 1, 7]
output  = 7
*/

//@ Solution 1 with XOR

//? This is one of the solution to use XOR and TC = O(n)
function findSingleElement(A) {
    let xor = 0;
    for (let i = 0; i < A.length; i++) {
        xor = xor ^ A[i];
    }
    return xor;
}
console.log(findSingleElement([1, 1, 7]))


//@ Solution 2 with simple Linear search

function findSingleElementWithLinearSearch(A) {
    console.log('findSingleElementWithLinearSearch :', A);
    for (let i = 1; i < A.length; i++) {
        if (A[i] != A[i - 1] && A[i] != A[i + 1]) {
            return A[i]
        }
    }
    return -1;
}

console.log(findSingleElementWithLinearSearch([1, 1, 2, 2, 3]))


//@ Solution 3 with Binary search

/*
* Lets discuss approach to solve with Binary search (tricky one)

Arr =     [2, 2, 5, 5, 8, 10, 10, 13, 13, 18, 18]
Index=     0  1  2  3  4  5    6   7   8   9  10

* Here Unique element is 8 and that is on index 4th.

? There are only three possibilities for position of single element-

[1, 2, 2, 3, 3] => Here single element is at start and that is even index 0.

[1, 1, 2, 2, 3] => Here single element is at end and that is even.

[1, 1, 2, 3, 3] => Here single element is in middle position and that is also even.

? In all three cases, There are some observations-

1. Single element always be on Even index position.
2. Left side from single element has (EVEN - ODD) indexing.
3. Right side from single element has (ODD - EVEN) indexing.


1. Find middle index and If it not same as previous and next element, then middle is our Single element.
2. If #1 is not the case then there are two cases, either it will be same as previous element Or next element.
3. If Mid == Previous Element
    -> mid index is even it means mid - 1 will be Odd. Pattern is Odd-Even. It means we are in Right side of single element and we have to move left side for next search.
    -> mid index is odd it means mid - 1 will be even. Pattern is Even-Odd. It means we are in Left side of single element and we have to move Right side for next search.
4. If Mid == Next Element
    -> Follow same above even odd things.


*/

// TC - O(log(n))
function findSingleElementWithBinarySearch(A) {
    console.log('findSingleElementWithBinarySearch :', A);
    let n = A.length;
    let left = 0;
    let right = n - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (A[mid] != A[mid - 1] && A[mid] != A[mid + 1]) {
            // unique element finds when A[mid] is not same as next and previous element.
            return A[mid];
        }
        const midIndexEven = mid % 2 === 0;
        if (A[mid] == A[mid - 1]) {
            // If middle is same as previous & mid is even, it means mid-1 will be odd. So pattern is Odd-Even.
            // We know that If pattern is Odd-Even Means we are on right side and for next search we must go to Left.
            if (midIndexEven) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // If middle is same as next & mid is even, it means mid+1 will be odd. So pattern is Even-Odd.
            // We know that If pattern is Even-Odd Means we are on left side and for next search we must go to Right.
            if (midIndexEven) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}
console.log(findSingleElementWithBinarySearch([1, 2, 2, 3, 3])); // 1
console.log(findSingleElementWithBinarySearch([1, 1, 2, 2, 3]));// 3
console.log(findSingleElementWithBinarySearch([1, 1, 2, 2, 3, 4, 4])); // 3


//! Search for a Range
// https://www.scaler.com/academy/mentee-dashboard/class/47669/assignment/problems/199?navref=cl_tt_lst_nm

/*
Given a sorted array of integers A (0-indexed) of size N, find the starting and the ending position of a given integer B in array A.

Your algorithm's runtime complexity must be in the order of O(log n).

Return an array of size 2, such that the first element = starting position of B in A and the second element = ending position of B in A, if B is not found in A return [-1, -1].

A = [5, 7, 7, 8, 8, 10]
B = 8

output:  [3, 4]

 */

//@ Solution 1 with Linear search

function findFirstAndLastIndex(A, B) {
    console.log('findFirstAndLastIndex :', A, B);
    let ans = [-1, -1]; // default values
    for (let i = 0; i < A.length; i++) {
        if (A[i] == B) {
            if (ans[0] == -1) { // Update 0th index only one time
                ans[0] = i;
            }
            ans[1] = i; // update 1st index each time so that last matching index will be stored here.
        }
    }
    return ans;
}
console.log(findFirstAndLastIndex([5, 7, 7, 8, 8, 10], 8)) //[3, 4]
console.log(findFirstAndLastIndex([5, 17, 100, 111], 8)) // [-1, -1]
console.log(findFirstAndLastIndex([2, 3, 4, 5, 5, 5, 6, 6, 6, 7, 7], 5)) //[3, 5]
console.log(findFirstAndLastIndex([2], 2)) //[0, 0]

//@ Solution 2 with Binary search

function findFirstAndLastIndexWithBinarySearch(A, B) {
    console.log('findFirstAndLastIndexWithBinarySearch :', A, B);
    let ans = [-1, -1];
    let n = A.length;
    let left = 0;
    let right = n - 1;
    // First while loop will trace First Index
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        // If target is equal to Mid and not Equal to Left element, It means it is First Index
        if (B == A[mid] && B != A[mid - 1]) {
            ans[0] = mid;
            break;
        }
        // Else If target is equal to or less then Mid element then move to Left side
        // If target is > then Mid element then move to Right side
        if (B <= A[mid]) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    left = ans[0]; // Last element will always be same or greater then first index.
    right = n - 1;
    // Second while loop will trace the last index
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        // If target is same as Mid element and Not Equal to next element then return mid
        if (B == A[mid] && B != A[mid + 1]) {
            ans[1] = mid;
            break;
        }
        if (B >= A[mid]) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return ans;
}
console.log(findFirstAndLastIndexWithBinarySearch([5, 7, 7, 8, 8, 10], 8))
console.log(findFirstAndLastIndexWithBinarySearch([2, 3, 4, 5, 5, 5, 6, 6, 6, 7, 7], 5))
console.log(findFirstAndLastIndexWithBinarySearch([5, 5, 5, 5, 5], 4))
console.log(findFirstAndLastIndexWithBinarySearch([5], 5)) // [0,0]



//! Find a peak element
// https://www.scaler.com/academy/mentee-dashboard/class/47669/assignment/problems/4132?navref=cl_tt_lst_nm

/*
Given an array of integers A, find and return the peak element in it. An array element is peak if it is NOT smaller than its neighbors.

For corner elements, we need to consider only one neighbor. We ensure that answer will be unique.

Input:  [1, 2, 3, 4, 5]
Output: 5

Input: [5, 17, 100, 11]
Output: 100
 */

//@ Solution 1 with Linear search

function findPeak(A) {
    console.log('findPeak :', A);
    for (let i = 0; i < A.length; i++) {
        /*
        ? Possibilities of Peak element-
        If element is greater then previous and next element.
        If it is First element & > then next element
        If it is Last element &  > then previous element
        Only one element in array
        */
        if ((i == 0 || A[i] >= A[i - 1]) && (i == A.length - 1 || A[i] >= A[i + 1])) {
            return A[i];
        }
    }
}

console.log(findPeak([1, 2, 3, 4, 5]))
console.log(findPeak([5, 17, 100, 11]))
console.log(findPeak([1, 2, 2, 3, 4]))
console.log(findPeak([1, 1000000000, 1000000000]))

//@ Solution 2 with Binary search

// It will return First matching element
function findPeakWithBinarySearch(A) {
    console.log('findPeak With BinarySearch :', A);
    let l = 0;
    let n = A.length;
    let r = n - 1;
    while (l <= r) {
        let mid = Math.floor((l + r) / 2);
        if ((mid == 0 || A[mid] >= A[mid - 1]) && (mid == n - 1 || A[mid] >= A[mid + 1])) {
            return A[mid];
        }
        /*
            If mid is 0 (First element), so nothing in on left side so move to right side.
            If mid element > previous element then move to right side
            If mid element < previous element then move to left side
        */
        if (mid == 0 || A[mid] > A[mid - 1]) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
}
console.log(findPeakWithBinarySearch([1, 2, 3])) //3
console.log(findPeakWithBinarySearch([9, 1, 7, 2])) //9
console.log(findPeakWithBinarySearch([17, 18, 21, 12])) //21
console.log(findPeakWithBinarySearch([1, 9, 9, 9, 11])) //9


//! Find local minimum element - that is smaller then previous and next elements.

function findLocalMinimum(A) {
    console.log('find LocalMinimum With BinarySearch :', A);
    let l = 0;
    let n = A.length;
    let r = n - 1;
    while (l <= r) {
        let mid = Math.floor((l + r) / 2);
        if ((mid == 0 || A[mid] <= A[mid - 1]) && (mid == n - 1 || A[mid] <= A[mid + 1])) {
            return A[mid];
        }
        if (mid != 0 && A[mid] > A[mid - 1]) {
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
}
console.log(findLocalMinimum([4, 3, 2, 5]))
console.log(findLocalMinimum([1, 2, 1, 2, 1, 2]))
console.log(findLocalMinimum([3, 2]))



//! Given an Increasing and Decreasing array with distinct elements. Find max element.

/*
    A = [1,4,7,9,5,3,2]
    output: 9 => 1 4 7 9 are in increasing order and 5 3 2 are in decreasing order.
*/

function findMax(A) {
    console.log('findMax :', A);
    let l = 0;
    let n = A.length;
    let r = n - 1;
    while (l <= r) {
        let mid = Math.floor((l + r) / 2);
        // Mid element is greater then previous and next element. So that will be max element.
        if ((mid == 0 || A[mid] >= A[mid - 1]) && (mid == n - 1 || A[mid] >= A[mid + 1])) {
            return A[mid];
        }
        // If Mid element > previous one it means move right
        // If Mid is First element then there is nothing to Left side so move to Right side. Will Occur this with elements only
        if (mid == 0 || A[mid] > A[mid - 1]) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return -1;
}

console.log(findMax([1, 5, 8, 10, 7, 6]))
console.log(findMax([7, 6]))
console.log(findMax([6]))
console.log(findMax([1, 5, 8]))



//! Find Square Root Of given element in O(log(n)).

//@ Solution 1 In Linear Time

function sqrt(n) {
    console.log('sqrt :', n);
    for (let i = 1; i < n; i++) {
        if (i * i == n) {
            return i;
        } else if (i * i > n) {
            return i - 1;
        }
    }
}
console.log(sqrt(49)) // 7
console.log(sqrt(50)) // 7

//@ Solution 2 with Binary search = O(logn)

//* NOTE: To Solve a problem with binary search, you should know the Return statement in Linear search. That return statement and binary search return statement is same.
/*
    SQRT in Linear search - Return statement => i * i == n
    Binary search - Return statement =>         mid * mid == n
*/


function sqrtWihBinarySearch(num) {
    console.log('sqrtWihBinarySearch :', num);
    let l = 1;
    let r = num;
    while (l <= r) {
        let mid = Math.floor((l + r) / 2);
        if (mid * mid == num) {
            return mid;
        }
        // Move Left or Right now
        // mid == 0 means If mid is first element then we also have to move to the right side.
        if (mid == 0 || mid * mid < num) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
}
console.log(sqrtWihBinarySearch(49))
console.log(sqrtWihBinarySearch(50));


//! TODO
function findAthSmallest(A, B, C) {
    let out = [];
    for (let i = 1; i <= A; i++) {
        out.push(B * i);
        out.push(C * i);
    }
    out.sort((a, b) => a - b);
    console.log(out);
    let ans = 0;
    let k = 0;
    for (let i = 0; i <= A; i++) {
        if (k == A) {
            return ans;
        }
        if (out[i] != ans) {
            ans = out[i];
            k++;
        }
    }
    return ans;
}

console.log(findAthSmallest(19, 11, 13))
console.log(findAthSmallest(14, 10, 12))
//findAthSmallest(17, 5, 16)



//! Median of Array
// https://www.scaler.com/academy/mentee-dashboard/class/47673/assignment/problems/198/?navref=cl_pb_nv_tb

/*
There are two sorted arrays A and B of sizes N and M respectively.

Find the median of the two sorted arrays ( The median of the array formed by merging both the arrays ). */

// TC - O(A + B)
function findMedian(A, B) {
    console.log('findMedian :', A, B);
    let len = A.length + B.length; // length of final merged array
    let i = 0; // initial pointer value
    let j = 0;
    let first, second;
    let median = Math.floor(len / 2);
    for (let k = 0; k <= median; k++) { // we dont need element more then median
        let el;
        if (i == A.length) {
            el = B[j];
            j++;
        }
        else if (j == B.length) {
            el = A[i]
            i++;

        }
        else if (A[i] <= B[j]) {
            el = A[i]
            i++;

        } else if (A[i] >= B[j]) {
            el = B[j];
            j++;
        }
        if (k == median) { // exact middle element
            first = el;
        }
        if (k == median - 1) { // middle - 1 element (for even  length)
            second = el;
        }
    }
    //console.log(first, second)
    if (len % 2 == 0) {
        return ((first + second) / 2).toFixed(1);
    } else {
        return first.toFixed(1);
    }
}

console.log(findMedian([], [-10])) // -10.0
console.log(findMedian([-50, -41, -40, -19, 5, 21, 28], [-50, -21, -10])) // -20.0