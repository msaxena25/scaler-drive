//! Doc link - https://drive.google.com/drive/u/0/folders/1nJoEq-b_aVbYjZ_eds4TvaAzZRWvhRka

//@ https://www.scaler.com/topics/data-structures/greedy-algorithm/

/*

Greedy algorithm is an approach to solve optimization problems (such as minimizing loss and and maximizing profit)

* What is meaning of Greedy?

Greedy means locally optimal choice or selection at a moment that can give you best result but not assured.

* Characteristics of the Greedy Algorithm

1. Any greedy algorithm consists of a sequence of choices/ decisions (for the problem we're solving) and each choice made should be the best possible one at the moment.

2. The choice made at any point cannot be altered later.

3. The greedy algorithm may not always yield the globally optimal solution and may even result in the worst global solution (such as in the Traveling Salesman Problem).

4. Greedy algorithms are very fast as compared to their alternatives, such as dynamic programming. This is because dynamic programming has to consider all possible cases locally at all times, while the greedy approach goes ahead with only one optimal choice.

5. Greedy algorithms are very intuitive (सहज), but it is very hard to prove mathematically the correctness of the algorithm.

6. The greedy algorithm may lead to a solution that is very close to the optimal solution in problems where there is no efficient solution. It is to be noted that the obtained solution in such cases is not an exact one, rather an approximate one.

* Some common algorithms and protocols that use a greedy approach are:

Prim-Jarnik's and Kruskal's Minimal Spanning Tree (MST) algorithms
Djikstra's Shortest Path algorithm
Activity selection problem
Huffman Coding (used for lossless data compression)
Open-Shortest-Path-First routing protocol (it uses Djikstra's algorithm)

*/


//!  Free Cars

/*
Given two arrays, A and B of size N. A[i] represents the time by which you can buy the ith car without paying any money.

B[i] represents the profit you can earn by buying the ith car. It takes 1 minute to buy a car, so you can only buy the ith car when the current time <= A[i] - 1.

Your task is to find the maximum profit one can earn by buying cars considering that you can only buy one car at a time.

NOTE:

You can start buying from time = 0.
Return your answer modulo 10^9 + 7.

Input -
 A = [1, 3, 2, 3, 3]
 B = [5, 6, 1, 3, 9]

 Output- 20

 Explanation-

 At time 0, buy car with profit 5.
 At time 1, buy car with profit 6.
 At time 2, buy car with profit 9.
 At time = 3 or after, you can't buy any car, as there is no car with deadline >= 4.
 So, total profit that one can earn is 20.

*/


/*
* Approach

A       =   [1, 3, 3, 3, 5, 5, 5, 8] // Assume given array is sorted but that is not in actual problem.

B       =   [5, 2, 7, 1, 4, 3, 8, 1]


@ Step 1 :: First sort given array based on Time value (A)

@ Step 2 :: Process each element of given array

    -   T = 0 (Initially start time is 0 given in problem notes)
    -   T < A[0] => We can choose A[0]
    -   Profit = 5, Increase T by 1
    -   T < A[1] => YES => We can choose A[1]
    -   Profit = 5 + 2 = 7, Now T = 2
    -   T < A[2] => Profit = 5 + 2 + 7 = 14, Now T = 3
    -   T < A[3] => NO => We cannot choose A[3].
    -   T < A[4] => YES => Profit = 5 + 2 + 7 + 4 = 18, Now T = 4
    -   T < A[5] => YES => Profit = 5 + 2 + 7 + 4 + 3 = 21, Now T = 5
    -   T < A[6] => 5 < 8 => NO => We cannot choose A[6].
    -   T < A[7] => YES => Profit = 5 + 2 + 7 + 4 + 3 + 1 = 22, Now T = 6

    -   All Array element processed. End Loop and We have profit 22.

@ But this 22 is not the maximum profit. Actual Maximum profit is 28. 22 is near to 28 but not exact.
@ Step 3 :: We can also alter our choice with previous selection incase time A[i] has issue with current time.
    - For a ith time, Find minimum selected profit and compare with current profit, If current profit is higher, we can replace that value  with ith value.
    - To store all previous choice, we use a MIN HEAP Data Structure. Why Min heap? Because we have to get minimum value to replace.
*/


function maxProfit(A, B) {
    console.log('maxProfit :', A, B);

    // Step 1 :: Create Pair array (Combined array) of A & B. So That when we will sort Time array,
    // B items should also aligned with A's ith index.
    let pair = [];
    for (let i = 0; i < A.length; i++) {
        pair.push({ A: A[i], B: B[i] });
    }
    pair.sort((a, b) => a.A - b.A); // Sort Pair array with JS existing sort function
    //console.log(pair);


    let maxProfit = 0;
    let currTime = 0;
    let store = [];
    for (let i = 0; i < pair.length; i++) {
        if (currTime < pair[i].A) {
            maxProfit += pair[i].B; // B array shows profit
            currTime++;
            store.push(pair[i].B);
        }
        else {
            // find min value from store
            store.sort((a, b) => b - a); // sort descending order
            if (pair[i].B > store[store.length - 1]) { // compare last value with current profit value
                const poppedValue = store.pop();
                maxProfit -= poppedValue;
                maxProfit += pair[i].B; // B array shows profit
                currTime++;
                store.push(pair[i].B);
            }

        }

    }
    return maxProfit % (Math.pow(10, 9) + 7);

}

function partitionAndSort(arr, start, end) {
    let p = arr[end]; // p means pivot element and that is end element in quick sort
    let j = start; // pointer to read only swaps
    let i = start; // pointer to read all elements of array
    while (i < end) {
        if (arr[i] < p) {
            [arr[j], arr[i]] = [arr[i], arr[j]];
            j++;
        }
        i++;
    }
    [arr[j], arr[end]] = [arr[end], arr[j]];
    return j;

}
function quickSort(arr, start, end) {
    if (start >= end) {
        return;
    }
    let pI = partitionAndSort(arr, start, end); // pI means pivot Index or partition Index
    quickSort(arr, start, pI - 1); // call for left side
    quickSort(arr, pI + 1, end); // call for right side

}

//console.log(maxProfit([1, 3, 3, 3, 5, 5, 5, 8], [5, 2, 7, 1, 4, 3, 8, 1]));

console.log(maxProfit([1, 7, 6, 2, 8, 4, 4, 6, 8, 2], [8, 11, 7, 7, 10, 8, 7, 5, 4, 9]));