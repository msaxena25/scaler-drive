
/*
@ Merge Sort Algorithm

Merge Sort uses the Divide and Conquer Algorithm where a problem is solved by dividing it into numerous sub-problems,
conquering each of the sub-problems individually, and then combining it to form the end result.
*/

//?https://www.scaler.com/topics/data-structures/merge-sort-algorithm/

//! Merge Two Sorted Arrays

/*
Given two sorted integer arrays A and B, merge B and A as one sorted array and return it as an output.

Input:
A = [4, 7, 9 ]
B = [2, 11, 19 ]
Output:
[2, 4, 7, 9, 11, 19]
*/

//* NOTE: Two pointer technique is best one to merge two sorted array.

//? TC  = O(n + m) // n is Array One length and m is Array two length
// SC = O(1)

function mergeArrays(A, B) {
    const res = [];
    let len = A.length + B.length; // length of final merged array
    let i = 0; // initial pointer value
    let j = 0;
    for (let k = 0; k < len; k++) {
        if (i == A.length) { // If all elements of A are taken then only copy B's items
            res.push(B[j]);
            j++;
        }
        else if (j == B.length) { // If all elements of B are taken then only copy A's items
            res.push(A[i])
            i++;

        }
        else if (A[i] <= B[j]) { // If A's item <= B's item, took A's item
            res.push(A[i])
            i++;

        } else if (A[i] >= B[j]) { // If B's item <= A's item, took B's item
            res.push(B[j]);
            j++;
        }
    }
    return res;
}

console.log(mergeArrays([4, 7, 9], [2, 11, 19]))


//! Given an array where all Odd elements are sorted and all even numbers are sorted. Sort full array.

/*
A = [3, 9, 2, 4, 15, 10, 19]

3, 9, 15, 19 are Odd numbers and they are sorted.
2, 4, 10 are Even numbers and they are also sorted form.

So final output array will be:

[2, 3, 4, 9, 10, 15, 19]

*/

// Divide given array into two arrays and then use algorithm of merge two sorted array explained above.

//? TC  = O(n) -- n is Array of length & SC = O(n)

function sortArray(A) {
    let even = [];
    let odd = [];
    for (let i = 0; i < A.length; i++) {
        if (A[i] % 2 == 0) {
            even.push(A[i])
        } else {
            odd.push(A[i])
        }

    }
    // now we have two sorted array Even and Odd
    return mergeArrays(even, odd); // call same above algo to merged two sorted array
}
console.log(sortArray([3, 9, 2, 4, 15, 10, 19]))


//! Merge Sort - Divide and Conquer algorithm

//? https://www.scaler.com/topics/data-structures/merge-sort-algorithm/

/*
@ Complexity of Merge sort

Time complexity - O(nlog(n))
Space complexity - O(n)

* The concept of merge sort involves breaking down an array of n elements into n individual elements. As each element can be considered as a sorted array consisting of one element. Then we start to combine these individual single array elements into one final sorted array.

*/


/*
@ Divide and Conquer approach

 ? A = [9, 8, 7, 3, 6, 4, 1, 5, 0, 10]

To devide a list into parts, we need a mid point from where we will break.
& mid = (start + end) / 2

array length = 10, mid = 5, two subarrays indices => [0, 4] & [5, 9]

    [9, 8, 7, 3, 6]                             [4, 1, 5, 0, 10]

mid = Math.floor(5 / 2) = 2                   mid = Math.floor(5 / 2) = 2

[9, 8]      [7, 3, 6]                           [4, 1]        [5, 0, 10]

[9] [8]     [7] [3, 6]                         [4] [1]       [5]   [0, 10]

[9] [8]     [7] [3] [6]                        [4] [1]       [5]   [0] [10]

? Now all items are individual sorted & divide process is completed. And its time to combine these
? For combining we already seen above how to merge two sorted array.


Compare 9 & 8   7 is single so no merge             same do compare and merge for rest.
& merge them    here at this step.
                Comapre 3 & 6 & merge them.

[8, 9]              [7]  [3, 6]                   [1, 4]         [5], [0, 10]

[8, 9]                [3, 6, 7]                   [1, 4]          [0, 5, 10]

[3, 6, 7, 8, 9 ]                                    [0, 1, 4, 5, 10]

                    [0, 1, 3, 4, 5, 6, 7, 8, 9, 10]


*/

function mergeSort(A) {
    console.log('mergeSort :', A);

    function divide(A, start, end) {
        if (start == end) {
            return;
        }
        let mid = Math.floor((start + end) / 2); // find mid
        divide(A, start, mid); // recursive call to divide left array
        divide(A, mid + 1, end); // recursive call to divide right array
        conquer(A, start, mid, end);  // at last merge all individual items
    }

    function conquer(A, start, mid, end) {
        let arr1 = [];
        let arr2 = [];
        // Create two arrays based on given start, mid and end.
        for (let i = start; i <= mid; i++) {
            arr1.push(A[i]);
        }
        for (let i = mid + 1; i <= end; i++) {
            arr2.push(A[i]);
        }
        //console.log(arr1, arr2)
        let n = arr1.length;
        let m = arr2.length;

        // two pointer technique to merge two sorted arrays
        let i = 0;
        let j = 0;
        for (let k = start; k <= end; k++) {
            // took arr2 item when all arr1 items are read OR arr2 item <= arr1 item
            // took arr1 item when all arr2 items are read OR arr1 item <= arr2 item
            // Update A's kth index item
            if (i == n || arr2[j] <= arr1[i]) {
                A[k] = arr2[j];
                j++;
            } else if (j == m || arr1[i] <= arr2[j]) {
                A[k] = arr1[i];
                i++;
            }
        }
    }

    divide(A, 0, A.length - 1);
    return A;



}
console.log(mergeSort([7, 2, 9, 5, 1])) //[1, 2, 5, 7, 9]
console.log(mergeSort([-7, -2, 9, 5, 1, 0, 2, 8, 12, 6])) // [-7, -2, 0, 1, 2, 5, 6, 8, 9, 12]


//! Calculate Time / Space Complexity of Merge sort

//? As we know, in Merge sort, array is divided into two parts in every iteration until it reaches to 1.

/*
                    n
                /       \
        n/2                      n/2
        / \                       /\
    n/4      n/4             n/4        n/4
    /\        /\              /\         /\
n/8  n/8   n/8 n/8       n/8  n/8     n/8  n/8
..     ..           ..              ..
..      ..          ..              ..

At each step n is divinding  by 2 and values are : 2^1, 2^2, 2^3, 2 ^4......
So to reach 1, Suppose steps are required is k. It means we can write-

n / 2^k = 1

k = log(n) base 2.

log(n) is require for dividing array into single elements.

Then to merge all the subarrays into a final sorted array, it takes us O(n) time, at max, as we need to traverse all elements of the array to determine the sorted order.

? So TC = O(nlog(n))

* Merge Sort’s time complexity is O(n*Log n) in worst case, average case, and best case, because it always divides the array into two halves and merges the two halves in linear time.

* Space Complexity-

For diving we need log(n) space in stack to storing all recursive functions and O(n) space for merging.

? SC = O(log(n) + n) = O(n)

*/


//!  Inversion count in an array

//* https://www.scaler.com/topics/inversion-count/

/*
Given an array of integers A. If i < j and A[i] > A[j], then the pair (i, j) is called an inversion of A.
Find the total number of inversions of A modulo (10^9 + 7).

input:

A = [8, 3, 4]

pair => i < j =>  (0, 1) => A[0] > A[1] => 8 > 3
pari => i < j =>  (0, 2) => A[0] > A[2] => 8 > 4

So output is: 2

Input: [4, 4, 4, 4]
Output: 0 (number of inversions)

*/

//? One solution is to use two nested for loop and that have TC - O(n^2).

//? Optimized way to use merge sort approach.


// Dividing step are exactly same as merge sort, we will find Inversion pairs in Conquer Step.

/*
            [4, 5, 1, 2, 6, 3]

         [4,5,1]             [2,6,3]

        [4] [5,1]           [2] [6,3]

       [4] [5] [1]          [2] [6] [3]

Dividing step are over, now time to merge them.

    First merge > [5] & [1]
    as per two pointer technique:
    [5]     [1]
    i=0     j=0
    right array value is smaller then left array ith value so we will take right array element first in merged array.
    [1, 5]
    Key point:
        Left array indices will be always smaller then right array indices.
        If Right array element is smaller then Left array, So we pick right array element, It means all values from ith index of left array are greater then right array.
        So one inversion pair is => (5, 1)

    Same merge for [6] & [3] > [3, 6] and inversion pair is (6, 3)

    Now array will be-
    [4] [1, 5]      [2] [3, 6]

    Now merge [4] & [1, 5] with same approach 2 pointer technique
    [4]     [1, 5]
    i=0     j=0
    jth index element is < ith index so 1 will be come first & j will increase by 1. Now compare ith vs jth. 4  < 5 so 4 will taken and finally 5 will be taken.
    [1, 4, 5]
    And Inversion pairs are => (4, 1) because only 1 from second array taken first.

    Now merge [2] & [3, 6] and here ith element is smaller and will taken first so no any inversion pair exits.
    [2, 3, 6]

    And now array are-

    [1, 4, 5]       [2, 3, 6]
    i=0             j=0

    1 < 2 so 1 will come first, so no pair exists with 1. Increase i.
    4 > 2 so 2 will come first, it means all elements from ith index will be greater then 4. So inversion pair are (4, 2), (5, 2), Increase j by 1.
    4 > 3, so 3 will come first, And pair are = (4, 3), (5, 3) , Increase j by 1.
    4 < 6 so 4 will come first, no pair. Increase i.
    5 < 6 , so 5 will come first, no pair.

* Now conclusion is => consider only one condition and that is jth element < ith element. If condition true incresae pair count by First array length - ith index. (N-i)
* (n-i) represents count of elements from ith index.

*/

function findInversionPairs(A) {
    console.log('findInversionPairs :', A);
    let pairCount = 0;
    function divide(A, start, end) {
        if (start == end) {
            return;
        }
        let mid = Math.floor((start + end) / 2); // find mid
        divide(A, start, mid); // recursive call to divide left array
        divide(A, mid + 1, end); // recursive call to divide right array
        conquer(A, start, mid, end);  // at last merge all individual items
    }

    function conquer(A, start, mid, end) {
        let arr1 = [];
        let arr2 = [];
        // Create two arrays based on given start, mid and end.
        for (let i = start; i <= mid; i++) {
            arr1.push(A[i]);
        }
        for (let i = mid + 1; i <= end; i++) {
            arr2.push(A[i]);
        }
        console.log(arr1, arr2)
        let n = arr1.length;
        let m = arr2.length;

        // two pointer technique to merge two sorted arrays
        let i = 0;
        let j = 0;
        for (let k = start; k <= end; k++) {
            // took arr2 item when all arr1 items are read OR arr2 item <= arr1 item
            // took arr1 item when all arr2 items are read OR arr1 item <= arr2 item
            // Update A's kth index item
            if (i == n) {
                A[k] = arr2[j];
                j++;
            } else if (j == m) {
                A[k] = arr1[i];
                i++;
            } else if (arr1[i] <= arr2[j]) {
                A[k] = arr1[i];
                i++;
            } else if (arr2[j] <= arr1[i]) {
                A[k] = arr2[j];
                pairCount += (n - i); // only this is the Change, rest are all same with merge sort.
                j++;
            }
        }
    }

    divide(A, 0, A.length - 1);
    return pairCount % (Math.pow(10, 9) + 7);;
}

console.log(findInversionPairs([4, 5, 1, 2, 6, 3]))



//! Stability in array Concept.

//? Relative order of equal elements should not change.
// Two elements are equal based on value or weightage or with any other condition.

[1, 2, 3, 4, 5, 6, 7]

// Suppose 2 5 and 7 have exact same preferences and have higher pref over 1 as well. So they should come togther but in retive order.

[2, 5, 7, 1, 3, 4, 6]

//@ So how to maintain stability in array -> If element have same value or same preference then Compare Index.
