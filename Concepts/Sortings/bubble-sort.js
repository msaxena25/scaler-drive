
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