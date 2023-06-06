//! Fractional Knapsack

/*
Given two integer arrays A and B of size N each which represent values and weights associated with N items respectively.
Also given an integer C which represents knapsack capacity.

Find out the maximum total value that we can fit in the knapsack. If the maximum total value is ans, then return ⌊ans × 100⌋ , i.e., floor of (ans × 100).

NOTE:
You can break an item for maximizing the total value of the knapsack

Input:

A = [60, 100, 120]
 B = [10, 20, 30]
 C = 50

Output: 24000
*/

function fractional(A, B, C) {
    let arr = [];
    for (let i = 0; i < A.length; i++) {
        arr.push(A[i] / B[i]);
    }
    A.sort((a, b) => )
    //arr.sort();
    console.log(arr);
    let totalValue = 0;
    let capacity = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] <= C) {
            totalValue += A[i];
        }
    }
}

console.log(fractional([60, 100, 120], [10, 20, 30], 50));