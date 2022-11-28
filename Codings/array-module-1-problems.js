
//! return true if all elements of array are 1 or 0.

const arr1 = [1, 1, 1, 1, 1, 1, 1, 1] // true
const arr2 = [0, 0, 0, 0, 0, 0, 0] // true
const arr3 = [1, 1, 1, 0, 0, 0, 1] // false,
const arr4 = [1, 2, 0, 3, 4] // false


function checkOnesOrZero(A) {
    console.log('checkOnesOrZero :', A);
    let sum = 0;
    for (let i = 0; i < A.length; i++) {
        sum += A[i];
    }
    if (sum == A.length) { // if sum is equal to array.length means all are 1
        return true;
    }
    if (sum == 0) { // if sum is 0 means all are 0
        return true;
    }
    return false;
}
console.log(checkOnesOrZero(arr1))
// console.log(checkOnesOrZero(arr2))
// console.log(checkOnesOrZero(arr3))
// console.log(checkOnesOrZero(arr4));


/****************************************** */

//! Length of longest consecutive 1's by only one replacement

/* Given a binary array a[], we can at most replace a single 0 with 1. Find the maximum consecutive 1's
we can get in that array a. */


const arr5 = [1, 1, 0, 1, 1, 0, 1, 1]; // ans = 5

function consecutive1(A) {
    let sum = 0; //
    for (let i = 0; i < A.length; i++) {
        sum += A[i];
    }
    if (sum == A.length) {
        return A.length;
    }
    if (sum == 0) {
        return 1;
    }
    let ans = 0;
    for (let i = 0; i < A.length; i++) {
        let left1 = 0; let right1 = 0; // count 1 at left and right from 0
        // Once 0 comes, we have to count 1 at left and right side.
        if (A[i] == 0) {
            let j = i - 1; // start from i-1
            while (j >= 0) {
                if (A[j] == 1) {
                    left1 += 1;
                } else {
                    break; // once 0 appears break loop.
                }
                j--;
            }
            let k = i + 1; // start from i+1
            while (k < A.length) {
                if (A[k] == 1) {
                    right1 += 1;
                } else {
                    break; // once 0 appears break loop.
                }
                k++;
            }
            const count1 = left1 + right1 + 1;
            if (count1 > ans) {
                ans = count1;
            }
        }
    }
    return ans;
}

// TC - O(n)  -- not O(n^2). because we have break statement inside inner loops. - Check lecture notes for more details.
// * drive link - https://drive.google.com/file/d/1oHqGshe1faVh2FJ9YaHW9f9klAAay2ck/view?usp=share_link
console.log(consecutive1(arr5))
console.log(consecutive1([1, 1, 1]))
console.log(consecutive1([1, 0]))
console.log(consecutive1([0, 0]))
console.log(consecutive1([0, 0, 0, 1, 0, 1, 0, 0, 1, 1]))


/****************************************** */

//!  Length of longest consecutive 1's by only one swap


/* Given a binary string A. It is allowed to do at most one swap between any 0 and 1. Find and return the length of the longest consecutive 1’s that can be achieved.

Output Format

Return the length of the longest consecutive 1’s that can be achieved.

Input 1:
    A = "111000"
Output 1:
    3

Input 2:
    A = "111011101"
Output 2:
    7 */

function consecutiveSwap(A) {
    console.log('consecutiveSwap :', A);
    let totalCount1 = 0;
    for (let i = 0; i < A.length; i++) {
        totalCount1 += A[i];
    }
    if (totalCount1 == A.length) {
        return A.length;
    }
    let ans = 0;
    for (let i = 0; i < A.length; i++) {
        let left1 = 0; let right1 = 0; // count 1 at left and right from 0
        // Once 0 comes, we have to count 1 at left and right side.
        if (A[i] == 0) {
            let j = i - 1; // start from i-1
            while (j >= 0) {
                if (A[j] == 1) {
                    left1 += 1;
                } else {
                    break; // once 0 appears break loop.
                }
                j--;
            }
            let k = i + 1; // start from i+1
            while (k < A.length) {
                if (A[k] == 1) {
                    right1 += 1;
                } else {
                    break; // once 0 appears break loop.
                }
                k++;
            }
            let count1 = left1 + right1;
            if (count1 < totalCount1) { // this condition true means we have extra 1 avaiable with which we can swap.
                count1 += 1;
            }
            if (count1 > ans) {
                ans = count1;
            }
        }
    }
    return ans;
}
// TC - O(n)  -- not O(n^2).
// console.log(consecutiveSwap([1, 1, 1]))
// console.log(consecutiveSwap([1, 0]))
// console.log(consecutiveSwap([0, 0]))
// console.log(consecutiveSwap([0, 0, 0, 1, 0, 1, 0, 0, 1, 1]))
console.log(consecutiveSwap([0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1]))


//@ Here input is string

function consecutiveSwapInString(A) {
    console.log('consecutiveSwapInString :');
    let count1 = 0;
    for (let i = 0; i < A.length; i++) {
        count1 += parseInt(A[i]); // covert string to number
    }
    if (count1 == A.length) {
        return count1;
    }
    console.log(count1)
    let ans = 0;
    for (let i = 0; i < A.length; i++) {
        let leftRightCount1 = 0;
        if (A[i] == 0) {
            let j = i - 1;
            while (j >= 0) {
                if (A[j] == 1) {
                    leftRightCount1++;
                } else {
                    break;
                }
                j--;
            }
            let k = i + 1;
            while (k < A.length) {
                if (A[k] == 1) {
                    leftRightCount1++;
                } else {
                    break;
                }
                k++;
            }
            if (count1 > leftRightCount1) { // swap is possible if extra one is there.
                leftRightCount1++;
            }
            if (leftRightCount1 > ans) {
                ans = leftRightCount1;
            }

        }
    }
    return ans;

}
console.log(consecutiveSwapInString('00000011111111')) // 8


/****************************************** */


//! Count Increasing Triplets
/*
You are given an array A of N elements. Find the number of triplets i, j and k such that i < j < k and A[i]<A[j]<A[k]

Output Format
Return an integer.

Example Input
Input 1:
A = [1, 2, 4, 3]
Input 2:
A = [2, 1, 2, 3]


Example Output
Output 1:
2
Output 2:
1
 */

function triplets(A) {
    console.log('triplets :', A);
    const ans = [];
    let count = 0;
    for (let i = 0; i < A.length; i++) {
        for (let j = i + 1; j < A.length; j++) { //  j > i
            for (let k = j + 1; k < A.length; k++) { // k > j
                if (A[i] < A[j] && A[j] < A[k]) {
                    ans.push([A[i], A[j], A[k]]); // if you need triplets
                    count++;
                }
            }
        }
    }
    console.log(ans);
    return count;
}
// TC - O(n^3)
triplets([1, 2, 3])
triplets([2, 1, 3])
triplets([2, 1, 3, 4, 5, 1, 6])


//* Optimized version of triplets - O(n^2)
/*
1. As given in problem statement that index i < j < k.
2. So If we see a index as a middle index (j) and find out no. of elements < j and > j in the Array.
3. Then for that index - number of triplets will be - no of left elements * no of right elements.

@ Example is - [2, 3, 1, 4, 5]
middleindex (j) | left elements < j | right elements > j | triplets
    2                   0                       3              0
    3                   1                       2              2
    1                   0                       2              0
    4                   3                       1              3
    5                   4                       0              0

Total triplets = 5.

 */

//@ Optimized way
function tripletsCount(A) {
    console.log('tripletsCount :', A);
    let count = 0;
    for (let j = 0; j < A.length; j++) {
        let leftCount = 0, rightCount = 0;
        let i = j - 1;
        while (i >= 0) {
            if (A[i] < A[j]) {
                leftCount++;
            }
            i--;
        }
        let k = j + 1;
        while (k < A.length) {
            if (A[k] > A[j]) {
                rightCount++;
            }
            k++;
        }
        count += leftCount * rightCount;

    }
    console.log(count);
    return count;
}

// TC = O(n^2)
tripletsCount([2, 3, 1, 4, 5]) //5
tripletsCount([2, 1, 3, 4, 5, 1, 6]) //16


/****************************************** */


//!  Majority element


/*
Given an array of size N, find the majority element. The majority element is the element that appears more than floor(n/2) times.
You may assume that the array is non-empty and the majority element always exists in the array.

1 <= N <= 5*10^5
1 <= num[i] <= 10^9

Example Input
[2, 1, 2]

Example Output
2 // 2 occurs 2 times which is greater than 3/2.

 */

//@ Using hashMap - TC- O(n) and SC- O(n)
function majorityElementsWithHashmap(A) {
    console.log('majorityElementsWithHashmap :', A);
    const n = A.length;
    const majorityCondition = Math.floor(n / 2); // '>' then this.
    const map = {};
    for (let i = 0; i < n; i++) {
        if (map[A[i]]) {
            map[A[i]] += 1;
        } else {
            map[A[i]] = 1;
        }
    }
    //console.log(map);
    for (let i in map) {
        if (map[i] > majorityCondition) {
            return i;
        }
    }
    return -1;
}

console.log(majorityElementsWithHashmap([4, 4, 1, 4, 4, 6, 1, 4, 1, 4]))
console.log(majorityElementsWithHashmap([2, 2, 1, 1]))
console.log(majorityElementsWithHashmap([1, 1, 2]))



//@ Using sorting way - TC - O(nlogn) and SC - O(1) -- best sorting algo has nlogn tc.

function majorityElementsWithSort(A) {
    console.log('majorityElementsWithSort :', A);
    const n = A.length;
    const majorityCondition = Math.floor(n / 2); // '>' then this.
    A.sort((a, b) => a - b);
    //console.log('A :', A);

    let count = 1;
    for (let i = 1; i < n; i++) {
        if (A[i] == A[i - 1]) {
            count++;
        } else {
            count = 1;
        }
        if (count > majorityCondition) {
            return A[i];
        }
    }
    return -1;
}
console.log(majorityElementsWithSort([4, 4, 1, 4, 4, 6, 1, 4, 1, 4]))
console.log(majorityElementsWithSort([2, 2, 1, 1]))
console.log(majorityElementsWithSort([1, 1, 2]))

//! Moore's Voting Algorithm
// https://www.programming9.com/tutorials/competitive-programming/428-moore-s-voting-algorithm


//@ Majority problem with TC -  O(n) & SC - O(1)
function majorityFinal(A) {
    console.log('majorityFinal :', A);
    const n = A.length;
    let activeElement = A[0];
    let freq = 1; // first element freq
    for (let i = 1; i < n; i++) {
        if (freq == 0) {
            activeElement = A[i]; // assign new element
            freq = 1;
        }
        else if (A[i] == activeElement) { // increase freq
            freq++;
        } else {
            freq--; // decrease freq
        }
    }
    // now check majority of last active element
    let count = 0;
    for (let j = 0; j < n; j++) {
        if (A[j] == activeElement) {
            count++;
        }
    }
    if (count > Math.floor(n / 2)) {
        return activeElement;
    }
    return -1;
}
console.log(majorityFinal([4, 4, 1, 4, 4, 6, 1, 4, 1, 4]))
console.log(majorityFinal([2, 2, 1, 1]))
console.log(majorityFinal([1, 1, 2]))


/******************************************************* */

//! Special Index
/*
Given an array, arr[] of size N, the task is to find the count of array indices such that removing an element from these indices makes the sum of even-indexed and odd-indexed array elements equal.

Input Format
First argument contains an array A of integers of size N

Output Format
Return the count of array indices such that removing an element from these indices makes the sum of even-indexed and odd-indexed array elements equal.

Example Input
Input 1:
A=[2, 1, 6, 4]
Input 2:
A=[1, 1, 1]

Example Output
Output 1:
1
Output 2:
3

Explanation 1:
Removing arr[1] from the array modifies arr[] to { 2, 6, 4 } such that, arr[0] + arr[2] = arr[1].
Therefore, the required output is 1.
Explanation 2:

Removing arr[0] from the given array modifies arr[] to { 1, 1 } such that arr[0] = arr[1]
Removing arr[1] from the given array modifies arr[] to { 1, 1 } such that arr[0] = arr[1]
Removing arr[2] from the given array modifies arr[] to { 1, 1 } such that arr[0] = arr[1]
Therefore, the required output is 3.
 */

//! Brute force solution

//@ TC - O(n^2) & SC - O(1)
function specialIndex(A) {
    console.log('specialIndex :', A);
    let countSpecialIndex = 0;
    for (let i = 0; i < A.length; i++) {
        let evenSum = 0; let oddSum = 0;
        for (let j = 0; j < A.length; j++) {
            let index = -1;
            if (j < i) { // dont need to run for j == i
                index = j;
            } else if (j > i) { // as we have to remove jth index thats why did -1 from j and assign into index.
                index = j - 1;
            }
            if (index > -1) {
                if ((index) % 2 == 0) { // even index
                    evenSum = evenSum + A[j];
                } else {          // odd index
                    oddSum = oddSum + A[j];
                }
            }
        }
        console.log(evenSum, oddSum)
        if (evenSum == oddSum) {
            countSpecialIndex++;
            console.log('special index -', i)
        }
    }
    return countSpecialIndex;

}
console.log(specialIndex([4, 3, 2, 7, 6, -2]))

//! Optimized solution using prefix sum technique.

/*

Origional array arr = [3, 2, 6, 8, 2, 9, 7, 6, 4, 12]
? Indices are          0  1  2  3  4  5  6  7  8   9

    > Lets remove index 4.

new array temp =      [3, 2, 6, 8, 9, 7, 6, 4, 12]
? Indices are          0  1  2  3  4  5  6  7  8

3, 2, 6, 8 values are still on the same position (index). It means there is no any changes in indices before index 4.
9, 7, 6, 4, 12 values's indices are now decreased by 1.
Before 9 was on index 5 and now it is on 4th.
Before 7 was on index 6 and now it is on 5th.
Before 6 was on index 7 and now it is on 6th.

? Lets use prefix sum and find sum of elements-

From new TEMP ARRAYS, Sum of all elements = pf[0, 3] + pf[4, 8]
From Origional arrys, We will get same sum with = pf[0, 3] + pf[5, 9] // ignored index 4

From temp arrays >
@ Sum of even indices = evenPf[0, 3] + evenPf[4, 8]
@ Sum of odd indices = oddPf[0, 3] + oddPf[4, 8]

Rewrite the above same formula with Origional array ->

@ Sum of even indices = evenPf[0, 3] + oddPf[5, 9]
-- In resulting temp array - values on even indices 4 to 8 are 9, 6, 12.
-- In Origional array -      values on odd indices 5 to 9 are  9, 6, 12. That's why we did  + oddPf[5, 9]

@ Sum of odd indices = oddPf[0, 3] + evenpf[5, 9]


*/


//! Return prefix sum array of even and odd indices elements

function findPFOfEvenOddIndices(A) {
    console.log('findPFOfEvenOddIndices :', A);
    const evenPf = [];
    const oddPf = [];

    evenPf[0] = A[0]; // first even index is 0.
    oddPf[0] = 0; // first odd index is 1. So assign 0 at 0th index.

    for (let i = 1; i < A.length; i++) {
        if (i % 2 == 0) {
            evenPf[i] = evenPf[i - 1] + A[i];
            oddPf[i] = oddPf[i - 1];
        } else {
            evenPf[i] = evenPf[i - 1];
            oddPf[i] = oddPf[i - 1] + A[i];
        }
    }
    console.log(evenPf, oddPf)

}
findPFOfEvenOddIndices([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])


//@ Special index problem with prefix sum.

function specialIndexWithPF(A) {
    console.log('specialIndexWithPF :', A);
    const evenPf = [];
    const oddPf = [];
    const n = A.length;

    evenPf[0] = A[0]; // first even index is 0.
    oddPf[0] = 0; // first odd index is 1. So assign 0 at 0th index.

    for (let i = 1; i < n; i++) {
        if (i % 2 == 0) {
            evenPf[i] = evenPf[i - 1] + A[i];
            oddPf[i] = oddPf[i - 1];
        } else {
            evenPf[i] = evenPf[i - 1];
            oddPf[i] = oddPf[i - 1] + A[i];
        }
    }
    //console.log(evenPf, oddPf)
    let specialIndexCount = 0;
    for (let i = 0; i < n; i++) {
        let evenSum = 0; let oddSum = 0;
        if (i > 0) { // if i > 0 means, calculate left portion
            evenSum = evenPf[i - 1]; // evenPf[0, i - 1] + oddPf[i + 1, n - 1];
            oddSum = oddPf[i - 1]; // oddPf[0, i - 1] + evenPf[i + 1, n - 1];
        }
        evenSum += oddPf[n - 1] - oddPf[i] // oddPf[i + 1, n - 1]
        oddSum += evenPf[n - 1] - evenPf[i]; // evenPf[i + 1, n - 1]
        console.log(evenSum, oddSum);
        if (evenSum == oddSum) {
            specialIndexCount++;
        }
    }
    return specialIndexCount;
}
console.log(specialIndexWithPF([4, 3, 2, 7, 6, -2]))


/************************************* */


//! Sum of even indices
/*
You are given an array A of length N and Q queries given by the 2D array B of size Q * 2.
Each query consists of two integers B[i][0] and B[i][1].
For every query, the task is to calculate the sum of all even indices in the range A[B[i][0]…B[i][1]].

Output Format
Return an array of integers.

Input 1:
A = [1, 2, 3, 4, 5]
B = [[0, 2]
[1, 4]]

Output 1:
[4, 8]
 */

function sumOfEvenIndicesElements(A, B) {
    console.log('sumOfEvenIndicesElements :', A);
    let pf = [];
    pf[0] = A[0]; // 0 is even index
    for (let i = 1; i < A.length; i++) {
        if (i % 2 == 0) {
            pf[i] = pf[i - 1] + A[i];
        } else {
            pf[i] = pf[i - 1];
        }
    }
    let ans = [];
    for (let i = 0; i < B.length; i++) {
        let [a, b] = B[i];
        if (a == 0) {
            ans.push(pf[b]);
        } else {
            ans.push(pf[b] - pf[a - 1]);
        }
    }
    return ans;
}
console.log(sumOfEvenIndicesElements([1, 2, 3, 4, 5], [[0, 2], [1, 4]]))


/***************************************** */


//! Josephus Problem - 2 (Knife problem)

/*
There are A people standing in a circle. Person 1 kills their immediate clockwise neighbour and pass the knife to the next person standing in circle. This process continues till there is only 1 person remaining. Find the last person standing in the circle. 

Example Input
Input 1:
A = 4
Input 2:
A = 5


Example Output
Output 1:
1
Output 2:
3

*/


/*
 * Let's understand some values first when 1 always start the game. (Try with pen and paper)

n = 2 (1, 2) => 1 will win. (because 1 have knife & will kill to 2)
n = 3 (1,2,3) => 3 will win.
n = 4 (1,2,3,4) => 1 will win.
n = 5 (1,2,3,4,5) => 3 will win.
n = 6 (1,2,3,4,5,6) => 5 will win.
n = 7 (1,2,3,4,5,6,7) => 7 will win.
n = 8 (1,2,3,4,5,6,7,8) => 1 will win.
n = 9 (1,2,3,4,5,6,7,8,9) => 3 will win.
n = 10 (1,2,3,4,5,6,7,8,9, 10) => 5 will win.
n = 11 (1,2,3,4,5,6,7,8,9, 10, 11) => 7 will win.
..
..
n = 16 (1,2,3,4,5,6,7,8,9,... 16)  => 1 will win.


@ OBSERVATIONS-

* 1. If 1 starts the game then Odd number will always win, because all even numbers will be killed in the first round.
* When n = 2 (2^1) or 4 (2^2) or 8 (2^3) or 16 (2^4) or (2^5)..... in this case, who has knife, he is winner.
* If 1 starts the game-
    - After 1 kill who have knife - 3
    - After 2 kills who have knife - 5
    - After 3 kill who have knife - 7
    - After 4 kill who have knife - 9
    - After 5 kill who have knife - 11
    ..
    ..
    - After k kill who have knife - 1 + 2 * k
    - After 20 kills who have knife - 1 + 2 * 20 = 41.
    - After 36 kill who have knife - 1 + 2 * 36 = 73.

* If n = 5, 3 is winner.
    - We know that if n is 4 & if 1 have knife then 1 wins.
    - So If there are 5 person and lets kill 1 then remaining are 4 and currently 3 has knife, so 3 will win.
* If n is 7, 7 is winner.
    - Nearest 7, 4 comes in 2 to the power. (2^2)
    - To reach 4, we need to kills 3 persons (7 - 3 = 4).
    - After 3 kills , who have knife = 1 + 2 * k = 1 + 2 * 3 = 7 will win.
* If n is 11, 7 is winner.
     - Nearest 11, 8 comes in 2 to the power. (2^3)
    - To reach 8, we need to kills 3 persons (11 - 3 = 8).
    - After 3 kills , who have knife = 1 + 2 * k = 1 + 2 * 3 = 7 will win.

* If n is 40, who is winner?
     - Nearest 40, 32 comes in 2 to the power. (2^5)
    - To reach 32, we need to kills 8 persons (40 - 8 = 32).
    - After 8 kills , who have knife = 1 + 2 * k = 1 + 2 * 8 = 17 will win.

 */

function winner(A) {
    console.log('winner :', A);
    let logOfA = Math.floor(Math.log2(A));
    let requiredKills = A - Math.pow(2, logOfA);
    return 1 + 2 * requiredKills;


}
console.log(winner(40))
console.log(winner(100))