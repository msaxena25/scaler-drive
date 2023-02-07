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
* Space: O(n)

*/

function insertionSort(A) {
    console.log('insertionSort :', A);
    // Start from 1 as A[0] is always sorted
    for (let i = 1; i < A.length; i++) {
        const element = A[i];
        let k = i;
        for (let j = i - 1; j >= 0; j--) {
            if (A[j] > element) {
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

/*
@ Dry run

[5, 2, 10, 9, 1, 3]

arr[0] is already sorted because of single element, so leave it as it is.
Start from index 1 to array length ->  for (let i = 1; i < A.length; i++)
Now compare ith element to all its previous elements; -> for (let j = i - 1; j >= 0; j--)
If ith element is less then jth element, shift jth element to next position.

? We have taken a extra variable k to store ith value why?
- Because once shift occurres we do k--; So if we take i and do i--, outer loop will call again for same ith value. 

Process 2:

k = 1;
Compare 2 to 5 => 2 < 5 => 5 will move to index 1 (kth index) and do k--;
Now no any elements in left side so put 2 at 0 index (k = 0)

Arr = [2, 5, 10, 9, 1, 3]

Process 10:

k = 2;
Compare 10 to 5 => 10 > 5 so no change
Compare 2 to 10 => 10 > 2 so no change

Arr = [2, 5, 10, 9, 1, 3]

Process 9:

k = 3;
Comapre 9 to 10 => 9 < 10 => 10 will shift right at 3rd index
k-- => k = 2;
Compare 9 to 5 => 9  > 5 so no change
Compare 9 to 2 => 9 > 2 so no change
end of inner for loop.
place 9 to kth position now and that is 2.

[2, 5, 9, 10, 1, 3]

process: 1

i = 4 & k = 4;
 1 < 10 => 10 will move to 4th index => k = 3
 1 < 9 => 9 will move to 3rd index => k = 2
 1 < 5 => 5 will move to 2nd index => k = 1
 1 < 2 => 2 will move to 1st index => k = 0
 inner for loop end and kth value is 0;
 So now place 1 to kth position means at 0 index.

 [1, 2, 5, 9, 10, 3]

 Same do for last element 3.

 And final array is ->

 [1, 2, 3, 5, 9, 10]

*/

function insertionSortWithWhile(A) {
    console.log('insertionSort With While :', A);
    // Start from 1 as A[0] is always sorted
    for (let i = 1; i < A.length; i++) {
        const element = A[i];
        let k = i;
        let j = i - 1; // start from left element of ith index
        while (j >= 0 && A[j] > element) { // if true , do shift
            A[k] = A[j];
            j--;
            k--;
        }
        A[k] = element;
    }
    return A;

}

console.log(insertionSortWithWhile([5, 2, 10, 9, 1, 3]))