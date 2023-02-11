// https://www.scaler.com/topics/data-structures/quick-sort-algorithm/


//@ Quick sort is based on partitioning of array of data into smaller arrays.

//! What is pivot?
//? Pivot means random. Selection of a random element from an array is pivot element.

/*
! Complexity of Quick sort

* Time complexity - O(nlogn(n))
* Space complexity - O(n)
*/

/*
? What is Quick Sort?

Quick sort, also known as partition-exchange sort, is an in-place sorting algorithm.
It is a divide-and-conquer algorithm that works on the idea of selecting a pivot element
and dividing the array into two subarrays around that pivot.

* At every iteration of quick sort, the chosen pivot element is placed at its correct position that it should acquire in the sorted array. This makes sure that each chosen pivot element is at its correct sorted position.

* with each iteration of quick sort, the problem reduces by 2 steps making quick sort a faster way to sort an array.

* One interesting thing to note here is that we can choose any element as our pivot, be it the first element, last element, or any random element from the array.
*/


//! Separate the elements in two partitons that all elements smaller then x should be in Left and all elements greater then x should be in right position. It is not necessary that x is present in array. x is just a partition point.

/*
x = 4

Input  = [4, 1, 0, 3, 9, 7, 6]
Output = [1, 0, 3, 4, 9, 7, 6]
 */

/*
@ Lets see approach

    [4, 1, 0, 3, 9, 7, 6]
i =  0  1  2  3  4  5  6
j = 0

* Increase i by 1 each time (for loop)
* Increase j by 1 only when array element is less then x after swap A[i] & A[j]

A[0] < 4 => false, no any change => move only i = 1
A[1] < 4 => true, now swap A[i] vs A[j] => A[1] vs A[0]
    [1, 4, 0, 3, 9, 7, 6]
now move i = 2 and j = 1
A[2] < 4 => yes, swap A[2] vs A[1]
    [1, 0, 4, 3, 9, 7, 6]
move i = 3 and j = 2
A[3] < 4 => yes, swap A[3] vs A[2]
    [1, 0, 3, 4, 9, 7, 6]
move i = 4 and j = 3
A[4] < 4 => false, so no swap => i = 5
A[5] < 4 => false so no swap => increase i = 6
A[6] < 4 => false so no swap.

final output => [1, 0, 3, 4, 9, 7, 6]

* Time Complexity = O(n)
* SC = O(1)
*/

/*
    [9, 8, 1, 6, 5, 8]

start with  i = 0, j = 0
do the same process as above-

Output - [1, 5, 9, 6, 8, 8]

? NOTE: We can see that 9 is before 6 and looks like it is wrong but this is not the exact question requirement.
? Here is two partitions [1, 5] and [9, 6, 8, 8]
? Means elements below 6 is in left and above are in right. (does not matter of sorted etc.)
*/


//! Quick sort

function quickSort(A) {
    console.log('quickSort :', A);

    function partition(A, start, end) {
        let pivot = A[end]; //selecting the rightmost element as pivot
        let i = start; // left pointer
        for (let j = start; j < end; j++) {
            if (A[j] < pivot) {
                [A[i], A[j]] = [A[j], A[i]]; // swap when element is less then pivot element.
                i++; // increase pointer
            }
        }
        [A[i], A[end]] = [A[end], A[i]]; // swap pivot element at last
        return i;

    }
    function sort(A, start, end) {
        if (start >= end) { // when single element remains in subproblem
            return;
        }
        let pivotIndex = partition(A, start, end);
        sort(A, start, pivotIndex - 1);
        sort(A, pivotIndex + 1, end);
    }

    sort(A, 0, A.length - 1);
    return A;
}

console.log(quickSort([4, 1, 9, 3, 0, 6]))
console.log(quickSort([14, 1, 10, 3, 3, 2, 7, 3, 2, 4, 5, 6]))


//! Unique Elements
// https://www.scaler.com/academy/mentee-dashboard/class/47661/assignment/problems/1224

/*
You are given an array A of N elements. You have to make all elements unique. To do so, in one step you can increase any number by one.
Find the minimum number of steps.

A = [1, 1, 3]
ans = 1;
*/

function uniqueElements(A) {
    let map = {};
    let steps = 0;
    for (let i = 0; i < A.length; i++) {
        if (map[A[i]]) {
            map[A[i]] += 1;
            steps += 1;
        } else {
            map[A[i]] = 1;
        }
    }
    console.log(map)
    return steps;
}

// console.log(uniqueElements([1, 1, 2]))
// console.log(uniqueElements([3, 1, 2, 1, 1, 2, 3, 1]))
const arr = [51, 6, 10, 8, 22, 61, 56, 48, 88, 85, 21, 98, 81, 76, 71, 68, 18, 6, 14, 23, 72, 18, 56, 30, 97, 100, 81, 5, 99, 2, 85, 67, 46, 32, 66, 51, 76, 53, 36, 31, 81, 56, 26, 75, 69, 54, 54, 54, 83, 41, 86, 48, 7, 32, 85, 23, 47, 23, 18, 45, 79, 95, 73, 15, 55, 16, 66, 73, 13, 85, 14, 80, 39, 92, 66, 20, 22, 25, 34, 14, 51, 14, 17, 10, 100, 35, 9, 83, 31, 60, 24, 37, 69, 62];
console.log(quickSort(arr))



//! Difference between Merge sort and quick sort

/*
1. Merge sort and quick sort both divide problem into two sub problems.
2. In Merge sort we pick middle element with (start + end) / 2 while in Quick sort we pick pivot element.
3. Space Complexity of quick sort is O(n) in worst case and O(logn) in average case while SC of merge sort is O(n).
4.

*/