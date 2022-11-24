
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


//@ Marority problem with TC -  O(n) & SC - O(n)
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
