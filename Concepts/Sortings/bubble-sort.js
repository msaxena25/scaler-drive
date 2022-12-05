
//! Noble Integer

/*
Given an integer array A, find if an integer p exists in the array such that the number of integers greater than p in the array equals p.
Output Format
Return Count of noble Integer.

A = [3, 2, 1, 3]
Output
1

 For integer 2, there are 2 greater elements in the array..
*/

//@ TODO - Need to refactor below code
function nobleInteger(A) {
    console.log('nobleInteger :', A);
    let count = 0;
    A.sort((a, b) => b - a) // descending order
    if (A[0] == 0) {
        count++;
    }
    let biggerElements = 0;
    for (let i = 1; i < A.length; i++) {
        if (A[i] != A[i - 1]) {
            biggerElements = i;
        }
        if (biggerElements == A[i]) {
            count++;
        }
    }
    return count;
}
console.log(nobleInteger([3, 2, 1, 3, 3])) // sorted array- [3, 3, 2, 1]
console.log(nobleInteger([7, 6, 5, 2, 3, 2])) // sorted array- [3, 3, 2, 1]
console.log(nobleInteger([8, 7, 4, 3, 2, 2, 1])) // sorted array- [3, 3, 2, 1]


//! bubble sort

/*
This algorithm works by examining each set of adjacent elements in the string, from left to right, switching their positions if they are out of order.
Bubble sort starts with very first two elements, comparing them to check which one is greater.

*/

// @ Ascending order 1, 2, 3, 4.... Swap when A[i] > A[j]
// @ Descending order 4, 3, 2, 1... Swap when A[i] < A[j]


// O(N²)
function bubbleSort(A) {
    console.log('bubbleSort :', A);
    for (let i = 0; i < A.length; i++) {
        let j = 0; // start from first element
        let k = j + 1; // next element
        while (j < A.length - 1) { // check till last element
            if (A[j] > A[k]) {   // swap element
                [A[j], A[k]] = [A[k], A[j]];
            }
            j++;
            k++;
        }
    }
    console.log(A)
    return A;
}
bubbleSort([4, 5, 9, 6, 3, 2, 8, 6, 7, 1, 2])
//bubbleSort([3, 1, 2])

/*
 * Why is bubble sort more efficient?

The bubble sort has a space complexity of O(1). The number of swaps in bubble sort equals the number of
 inversion pairs in the given array. When the array elements are few and the array is nearly sorted,
 bubble sort is effective and efficient.

* Which sorting algorithm is best?

Quicksort is one of the most efficient sorting algorithms, and this makes of it one of the most used as well.

* Why is it called bubble?

With each pass in bubble sort, adjacent elements that are not in the correct order get swapped. Basically,
elements greater than their adjacent elements “bubble up” or move towards their proper position with each pass.
Hence the name “bubble” sort.

* Why is bubble sort the slowest?

The algorithm traverses a list and compares adjacent values, swapping them if they are not in the correct order.
With a worst-case complexity of O(n^2), bubble sort is very slow compared to other sorting algorithms like quicksort.
 */


//! Sort element based on its Factor :  Factors sort

/*
You are given an array A of N elements. Sort the given array in increasing order of number of distinct
factors of each element. If 2 elements have same number of factors, then number with less value should come first.

Note: You cannot use any extra space.

A = [6, 8, 9]
output: [9, 6, 8]
The number 9 has 3 factors, 6 has 4 factors and 8 has 4 factors.
 */

//@ using bubble sort approach

function sortArrayBasedOnFactors(A) {
    console.log('sortArrayBasedOnFactors :', A);
    for (let i = 0; i < A.length; i++) {
        let j = 0; // start from first element
        let k = j + 1; // next element
        while (j < A.length - 1) { // check till last element
            let f1 = getFactorsCount(A[j]);
            let f2 = getFactorsCount(A[k]);
            if (f1 > f2) {   // swap element
                [A[j], A[k]] = [A[k], A[j]];
            } else if (f1 == f2 && A[j] > A[k]) {
                [A[j], A[k]] = [A[k], A[j]];
            }
            j++;
            k++;
        }
    }
    console.log(A)
    return A;
}

function getFactorsCount(num) {
    let sqrtNum = Math.floor(Math.sqrt(num));
    let count = 0;
    for (let i = 1; i <= sqrtNum; i++) {
        if (num % i == 0) {
            count++;
            if (i != num / i) {
                count++;
            }
        }
    }
    return count;
}
//console.log(getFactorsCount(100))

//sortArrayBasedOnFactors([6, 8, 9])
sortArrayBasedOnFactors([6, 8, 9, 6])


//@ using inbuilt js method sort. TC - O(nlogn)

function sortArrayBasedOnFactorsUsingInbuiltMethod(A) {
    console.log('sortArrayBasedOnFactorsUsingInbuiltMethod :', A);
    A.sort((a, b) => {
        let f1 = getFactorsCount(a);
        let f2 = getFactorsCount(b);
        if (f1 < f2) {
            return -1;
        } else if (f1 == f2 && a < b) {
            return -1;
        } else {
            return 1;
        }
    })
    console.log(A)

}
sortArrayBasedOnFactorsUsingInbuiltMethod([6, 8, 9, 6])
sortArrayBasedOnFactorsUsingInbuiltMethod([8, 7, 53, 2, 31, 0, 97, 5, 6, 4]) //  [0, 2, 5, 7, 31, 53, 97, 4, 6, 8]


