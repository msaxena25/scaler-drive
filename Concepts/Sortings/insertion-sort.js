// https://www.scaler.com/topics/data-structures/insertion-sort/

//! lexicographical order sorting

/*
Consider a case of a school where we want to assign roll numbers to the students. We can sort them by their names and
assign roll numbers in an increasing manner. It would be a lexicographical order sorting, where we are sorting by words.

On the same hand, to find top N students with highest marks in some subject, we can basically sort the students by their marks to find top N amongst them. This would be numerical order sorting.

*/

//! Insertion Sort Algorithm

/*
Insertion Sort is one of the simplest sorting techniques which you might have used in your daily lives while
arranging a deck of cards.

Basically we pick a random card first (Ex: 7) and place it in our hand.
Then we would pick another random card (Ex: 2) and place this 2 in the correct position on your hand before 7.
Then again we pick 5, which we place between 2 & 7. And this way we know we are able to sort our deck of cards.

* Since we insert one element at a time in its correct position, hence its name “Insertion Sort”.
*/

/*
@ number of shifts -

Min number of shifts = 0
Max number of shifts = n

Input arr = 9 8 3 1

pick 9 : number of shifts = 0 (single element always sorted)
pick 8:  number of shifts = 1 => array 8 9 3 1
pick 3:  number of shifts = 2 => array 3 8 9 1
pick 1:  number of shifts = 3 => array 1 3 8 9

So total number of shifts (max) =  0 + 1 + 2 + 3 = 6

max total no. of shifts =  0 + 1 + 2 + 3 + 4 ...... + (n-1)
                       =  n(n-1) / 2
                       =  n^2

* Time Complexity: O(n^2)
* Space: O(1)

*/

function insertionSort(A) {
    console.log('insertionSort :', A);
    // Start from 1 as A[0] is always sorted
    for (let i = 1; i < A.length; i++) {
        const element = A[i];
        let k = i;
        for (let j = i - 1; j >= 0; j--) {
            if (element < A[j]) {
                // shift
                A[k] = A[j];
                k--;
            } else {
                break;
            }
        }
        A[k] = element;
    }
    return A;

}
//console.log(insertionSort([8, 3, 9, 1]))
console.log(insertionSort([5, 2, 10, 9, 1, 3]))
// insertionSortWithWhile is also in this file.

//@ This code is good compare to above one.
function insertionSortWithWhile(A) {
    console.log('insertionSort With While :', A);
    // Single element is itself sorted. So A[0] is in sorted order.
    for (let i = 1; i < A.length; i++) {
        const currElement = A[i];
        let j = i - 1; // start from left to currElement of ith index
        while (j >= 0 && A[j] > currElement) { // if true, do shift
            A[j + 1] = A[j];
            j--;
        }
        A[j + 1] = element;
    }
    return A;
}

console.log(insertionSortWithWhile([5, 2, 10, 9, 1, 3]))

/*
* DRY RUN

Sort Below array step by step.

Arr  = [10, 9, 1, 3]

Single element is itself sorted. If we take element 10 only then it is already
in sorted order because no any other elements to compare in it's Left side.

> I start from 1 to 3 (3 is last index)
> Current Element is 9
> Now Compare 9 with all previous elements. If current element is less than
 the any previous element stop comparing at that point.

> I  is 1 so J will start from 0

> Compare 9 to 10 => 9 < 10 => So We need to shift 10 at one place to its next.

Arr  = [10, 10, 1, 3]

> Now J = -1 and I = 1

> No any further elements remained to compare so stop comparison.

> We have to place current element 9 to its correct position and that is J + 1.

Arr  = [9, 10, 1, 3]

> I = 2 that is A[2] = 1

> Current element is 1.

> J will go from 1 to 0 because I is 2.

> A[2] < A[1] => YES => So Shift Jth element means 10 to one position next.

Arr  = [9, 10, 10, 3]

> Now J = 0

> Compare 1 to 9 => 1 < 9 => YES => Again move 9 to one position next.

Arr  = [9, 9, 10, 3]

> Now J = -1. Stop comparing.

> Place current element to J + 1 position.

Arr  = [1, 9, 10, 3]

> Now I = 3 => A[3] = 3

> Current Element = 3

> J will start from 2 to 0 because i is 3.

> 3 < 10 => YES => Shift 10 to next.

> Arr  = [1, 9, 10, 10]

> J is now 1.

> 3 < 9 => YES => Shift 9 to next.

> Arr  = [1, 9, 9, 10]

> J is now 0.

> Compare 1 to 3 and 3 < 1 => FALSE => stop comparing.

> At this time J is 0 and Now its time to place current element to
 correct position and that will be J + 1.

> Arr  = [1, 3, 9, 10]

> Finished Algo.
*/