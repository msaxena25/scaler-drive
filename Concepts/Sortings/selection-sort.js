//https://www.scaler.com/topics/data-structures/selection-sort/


A = [5, 8, 1, 15, 7, 6, 2];

// Find max element from a given array

function findMax(A) {
    let ans = A[0];
    for (let i = 1; i < A.length; i++) {
        if (A[i] > ans) {
            ans = A[i];
        }
    }
    return ans;
}

console.log(findMax(A))
console.log(findMax([2]))
console.log(findMax([-2, -4]))

// Find 2nd max element from an array

// ? Use same above program with two for loop sequentially. First find first max and then second.
// ? TC will be O(n)

// Find 3rd max element from an array

// ? Use same above program with three for loop sequentially. At First find 1st max, then 2nd & then 3rd.
// ? TC will be O(n)

//* Above solution approach, we can use till 3rd or 4th max element but If we have to find 100th max element then how?.



//! Find Kth max element


/*

@ Selection sort

Selection sort is a sorting algorithm. This sorting algorithm is an in-place comparison-based algorithm in which the
list is divided into two parts, the sorted part at the left end and the unsorted part at the right end. Initially,
the sorted part is empty, and the unsorted part is the entire list.

? Apporach of selection sort-

* It works on the idea of repeatedly finding the smallest / largest element and placing it at its correct sorted position.

? With each iteration of the selection sort, we –

Search for the smallest/largest element in the unsorted sublist.
Place it at the end of the sorted sublist.

* After every iteration, the size of the sorted sublist increases, and that of the unsorted sublist decreases.

*/

/*

@ A = [5, 8, 1, 15, 7, 6, 2];

k = 1 , Find max element in 0 to 6 indices = 15, swap with last element

A = [5, 8, 1, 2, 7, 6, 15]; // 15 is now its sorted position.

k = 2, Find max element in 0 to 5 indices = 8, swap with last element of remaining array 0 to 5

A = [5, 6, 1, 2, 7, 8, 15]; // 8, 15 are now their sorted positions.

k = 3, Find max element in 0 to 4 indices = 7, swap with last element of remaining array 0 to 4
as 7 is on last position already in 0 to 4 indices, so no meaning of swapping.

A = [5, 6, 1, 2, 7, 8, 15]; // 7, 8, 15 are now their sorted positions.

k = 4, Find max element in 0 to 3 indices = 6, swap with last element of remaining array 0 to 3

A = [5, 2, 1, 6, 7, 8, 15]; // 6, 7, 8, 15 are now their sorted positions.

k = 5, Find max element in 0 to 2 indices = 5, swap with last element of remaining array 0 to 2

A = [1, 2, 5, 6, 7, 8, 15]; // 5, 6, 7, 8, 15 are now their sorted positions.

k = 6, Find max element in 0 to 1 indices = 2, swap with last element of remaining array 0 to 1
as 2 is already at 1st index so no need of swap.

A = [1, 2, 5, 6, 7, 8, 15]; // 2, 5, 6, 7, 8, 15 are now their sorted positions.

So array length is 7, 6 elements are sorted so last 7th element automatically will be on its correct position.
*/

function selectionSort(A) {
    let n = A.length;
    for (let i = n - 1; i > 0; i--) { // i > 0 because last remaining element will be auto sorted. (Can also do  i >= 0)
        let maxIndex = 0;
        for (let j = 1; j <= i; j++) { // start from 1 because we consider 0th index as max index already.
            if (A[j] > A[maxIndex]) {
                maxIndex = j;
            }
        }
        [A[i], A[maxIndex]] = [A[maxIndex], A[i]]; // swap
    }
    return A;
}
console.log(selectionSort([5, 8, 1, 15, 7, 6, 2]))


// TC is - O(n^2) & SC - O(1)


//@ Now find kth largest element with same above selection sort


function findKthLargest(A, k) {
    console.log('findKthLargest :', A, k);
    let n = A.length;
    for (let i = n - 1; i > 0; i--) {
        let maxIndex = 0;
        for (let j = 1; j <= i; j++) {
            if (A[j] > A[maxIndex]) {
                maxIndex = j;
            }
        }
        [A[i], A[maxIndex]] = [A[maxIndex], A[i]]; // swap
    }
    console.log(A)
    return A[n - k];
}

console.log(findKthLargest([4, 5, 3, 6, 7, 9, 2], 2))

function findKthSmallest(A, k) {
    console.log('findKthSmallest :', A, k);
    let n = A.length;
    for (let i = n - 1; i > 0; i--) {
        let maxIndex = 0;
        for (let j = 1; j <= i; j++) {
            if (A[j] > A[maxIndex]) {
                maxIndex = j;
            }
        }
        [A[i], A[maxIndex]] = [A[maxIndex], A[i]]; // swap
    }
    console.log(A)
    return A[k - 1];
}
console.log(findKthSmallest([4, 5, 3, 6, 7, 9, 2], 2))
console.log(findKthSmallest([8, 16, 80, 55, 32, 8, 38, 40, 65, 18, 15, 45, 50, 38, 54, 52, 23, 74, 81, 42, 28, 16, 66, 35, 91, 36, 44, 9, 85, 58, 59, 49, 75, 20, 87, 60, 17, 11, 39, 62, 20, 17, 46, 26, 81, 92], 9))

