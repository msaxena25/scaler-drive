//! Doc link https://drive.google.com/drive/u/0/folders/1nJoEq-b_aVbYjZ_eds4TvaAzZRWvhRka

//! Leaders in an array

/**
Given an integer array A containing N distinct integers, you have to find all the leaders in array A.
An element is a leader if it is strictly greater than all the elements to its right side.
NOTE:The rightmost element is always a leader.

1 <= N <= 105
1 <= A[i] <= 108

Return an integer array denoting all the leader elements of the array.
NOTE: Ordering in the output doesn't matter.

 A = [16, 17, 4, 3, 5, 2]
 [17, 2, 5]
 */

//? O(n) solution -

//* Problem statement clearly shown that we have to traverse array from right to left.

function findLeaders(A) {
    let max = A[A.length - 1];
    let leaders = [max]; // last element is always a leader.
    let i = A.length - 2; // so now start from second last element.
    while (i >= 0) {
        if (A[i] > max) {
            leaders.push(A[i]);
            max = A[i];
        }
        i--;
    }
    console.log(leaders);
    return leaders;

}
findLeaders([16, 17, 4, 3, 5, 2]) // [2, 5, 17]
findLeaders([2, 5]) //[5]
findLeaders([5, 2]) // [2, 5]
findLeaders([5]) // [5]
findLeaders([0, 5, -1, 2, -3, 4]) // [4, 5]
findLeaders([93, 57, 83, 41, 100, 10, 79, 27, 94, 22, 4, 96, 48, 18, 89, 37, 21, 5, 46, 81, 15, 30, 47, 23, 34, 65, 55, 9, 36, 20, 54, 17, 7, 56, 78, 84, 87, 97, 16, 69, 28, 11, 44, 49, 8, 25, 98, 75, 53, 62, 19, 24, 80, 68, 50, 91, 1, 86, 77, 14, 72, 66, 42, 63, 73, 45, 31, 61, 85, 64, 35, 32, 92, 71, 74, 3, 99, 52, 90, 43, 6, 40, 38, 2, 12, 59, 29, 82, 76, 60, 67, 13, 70, 58, 39, 33, 95, 88, 51, 26])

//! How is it Carry Forward?
//? We have one element in our hand and forward this element for further calculation (checking max in this program).
// We have last item as max element. SO now this element will carry forward until next max element.


/**************************************************** */


//! Special Subsequences "AG"

/**
You have given a string A having Uppercase English letters.
You have to find how many times subsequence "AG" is there in the given string.

*?NOTE: Return the answer modulo 10^9 + 7 as the answer can be very large.

1 <= length(A) <= 10^5

Return an integer denoting the answer.

 A = "ABCGAG"
 3

 VDGA
 0
 AAGGA
 4
 */

//* Traversing string from left to right  - O(n)
function findAG(str) {
    countA = 0;
    let totalAG = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === 'A') {
            countA++;
        }
        if (str[i] === 'G') {
            totalAG += countA;
        }
    }
    console.log(totalAG % (Math.pow(10, 9) + 7)); //Return the answer modulo 10^9 + 7
    return totalAG % (Math.pow(10, 9) + 7);

}
findAG('AAGGA')
findAG('GA')
findAG('ABCGAG')
findAG('AGGA')
findAG('ABCDGAGGG')

findAG('AAAGG');

//* Traversing string from right to left - O(n)
function findAG1(str) {
    let gCount = 0;
    let totalCount = 0;
    let i = str.length - 1;
    while (i >= 0) {
        if (str[i] === 'G') {
            gCount++;
        }
        if (str[i] === 'A') {
            totalCount += gCount;
        }
        i--;
    }
    console.log(totalCount % (Math.pow(10, 9) + 7)); //Return the answer modulo 10^9 + 7
    return totalCount % (Math.pow(10, 9) + 7);
}

findAG1('ADGAGAGFG')

findAG(`AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG`);


findAG1(`AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG`);


/**************************************************** */

//!  Closest MinMax

/**
 * Given an array A, find the size of the smallest subarray such that it contains at least one
occurrence of the maximum value of the array and at least one occurrence of the minimum value of the array.

1 <= |A| <= 2000

Return the length of the smallest subarray which has at least one occurrence of minimum and maximum element of the array
.1
.
*/

/**
** STEPS -
1. Find MAX AND MIN value from array
2. If they are same means every items of the array are same then return 1.
3. In worst case - answer could be array.length (means first element and last element are only min or max value)
4. Take two variables minIndex and maxIndex. Initially they are -1.
5. Loop over the items from last to first. (n-1 to 0)
6. If ith element are min or max value then only calculate minIndex & maxIndex, Don't do anything for rest items.
7. If arr[i] is maxValue then maxI = i;
8. If arr[i] is minValue then minI  = i;
9. For ith item max or min - calculate subarray length based on min & max Index. And If it is less then answer then assign this
length into answer.

 */


//@ right to left traversing

function closestMinMax(arr) {
    const minValue = Math.min(...arr);
    const maxValue = Math.max(...arr);
    if (maxValue === minValue) { // it means every element is same in the array
        console.log(arr, 1);
        return 1;
    }
    let ans = arr.length; // smallestSubarrayCount - default we have taken array length
    let minI = -1;
    let maxI = -1;
    let i = arr.length - 1;

    while (i >= 0) {
        if (arr[i] === maxValue) {
            maxI = i;
            if (minI > -1) {
                // Did here minI - maxI because we already have minI value thats why If condition become true & maxI we just got.
                const len = minI - (maxI - 1);
                ans = Math.min(ans, len);
            }
        }
        if (arr[i] === minValue) {
            minI = i;
            if (maxI > -1) {
                // Did here maxI - minI because if condition become true once we have maxI value. It means maxI is greater than minI.
                const len = maxI - (minI - 1);
                ans = Math.min(ans, len);
            }
        }
        i--;
    }
    console.log(arr, ans);
    return ans;

}
// TC - O(n)
closestMinMax([3, 1, 0])
closestMinMax([1, 3])
closestMinMax([1, 3, 4, 8, 8, 1])
closestMinMax([4, 5, 2, 4, 3, 2, 6, 2, 6])
closestMinMax([4, 1, 2, 4, 3, 2, 8, 8, 8])
closestMinMax([4, 4, 4])
closestMinMax([])

//@ Left to right traversing

function closestMinMax1(arr) {
    const minValue = Math.min(...arr);
    const maxValue = Math.max(...arr);
    if (maxValue === minValue) {
        console.log(arr, 1);
        return 1;
    }
    let ans = arr.length;
    let minI = -1;
    let maxI = -1;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === maxValue) {
            maxI = i;
            if (minI > -1) {
                const len = maxI - (minI - 1); // maxIndex will be higher
                ans = Math.min(ans, len);
            }
        }
        if (arr[i] === minValue) {
            minI = i;
            if (maxI > -1) {
                const len = minI - (maxI - 1); // minIndex will be higher
                ans = Math.min(ans, len);
            }
        }

    }
    console.log(arr, ans);
    return ans;
}

closestMinMax1([1, 3, 4, 8, 8, 1])
closestMinMax1([4, 5, 2, 4, 3, 2, 6, 2, 6])
closestMinMax1([4, 1, 2, 4, 3, 2, 8, 8, 8])
closestMinMax1([4, 4, 4])


/****************************** */

//!  Even Sub arrays

/* You are given an integer array A.

Decide whether it is possible to divide the array into one or more subarrays of even length such that the first and last element of all element of sub array will be even.

Return "YES" if it is possible; otherwise, return "NO" (without quotes).

Input 1:
 A = [2, 4, 8, 6]
Output >  "YES" ( We can divide A into [2, 4] and [8, 6].)

A = [2, 4, 8, 7, 6]
 "NO"
 There is no way to divide the array into even length subarrays.

*/

//@ HINT -  1. If array length is not even, then we can not create subarray of even length. 2. Check array first and last element, they should be even number as per problem statement.

function evenSubarrays(A) {
    console.log('evenSubarrays :', A);
    if (A.length % 2 != 0) {
        return 'NO'
    } else {
        if (A[0] % 2 != 0 || A[A.length - 1] % 2 != 0) {
            return 'NO';
        } else {
            return 'YES';
        }
    }
}

console.log(evenSubarrays([2, 4, 8, 7, 6]));
console.log(evenSubarrays([2, 4, 5, 6]));
// console.log(evenSubarrays([2]));
// console.log(evenSubarrays([2, 4, 4, 6]));
// console.log(evenSubarrays([2, 4, 3, 4, 3, 4, 1]));



/*********************************************** */


//! Pick from both sides!


// https://www.scaler.com/academy/mentee-dashboard/class/40873/homework/problems/9900


/*
You are given an integer array A of size N.

You have to pick B elements. Some or 0 elements from left end and some or 0 from the right end
of array A to get the maximum sum.

Find and return this maximum possible sum.

Output Format
Return an integer denoting the maximum possible sum of elements you picked.

Example Input

Input 1:
A = [5, -2, 3, 1, 2]
B = 3
Input 2:
A = [1, 2]
B = 1

Example Output
Output 1:
8

Output 2:
2

Example Explanation
Explanation 1:
Pick element 5 from front and element(1, 2) from back so we get 5 + 1 + 2 = 8

Explanation 2:
Pick element 2 from end as this is the maximum we can get
 */

/*
@ Approach-

1. As per question requirement, we have to find out sum of array elements so prefix sum is nice way to do that.
2. We have to pick some elements from left and some from right. OR pick all B elements from left or all from right.
3. So we created two prefix sum array first is left to right and second is right to left.

*/

// TC & SC - O(n)
function maxSumWhenPickFromBothSides(A, B) {
    console.log('maxSumWhenPickFromBothSides :', A, B);
    let pfFromLToR = [];
    pfFromLToR.push(A[0]);
    let pfFromRToL = [];
    let len = A.length;
    pfFromRToL.push(A[len - 1]);

    // Prefix sum from left to right
    for (let i = 1; i < len; i++) {
        pfFromLToR[i] = pfFromLToR[i - 1] + A[i];
    }

    // Prefix sum from right to left :: A[len - 1 - i] => pick element from last.
    for (let i = 1; i < len; i++) {
        pfFromRToL[i] = pfFromRToL[i - 1] + A[len - 1 - i];
    }
    console.log(pfFromLToR, pfFromRToL);
    let maxAns = Number.MIN_SAFE_INTEGER;

    /*
        We have to choose only B values so loop over till B.
        When i is 0 means we will pick all B values from right. And when i reaches to B, means we will
        pick all B values from left.
    */
    for (let i = 0; i <= B; i++) {
        let sum = pfFromLToR[i - 1] || 0; // when i is < 0 then take 0
        sum += pfFromRToL[B - i - 1] || 0; // when i is < 0 then take 0
        maxAns = Math.max(sum, maxAns);
    }
    return maxAns;

}

console.log(maxSumWhenPickFromBothSides([2, 3, -1, 4, 2, 1], 4)) //9



//!  Amazing Subarrays


/*
You are given a string S, and you have to find all the amazing substrings of S.
An amazing Substring is one that starts with a vowel (a, e, i, o, u, A, E, I, O, U).

Example

Input
    ABEC

Output
    6
*/

/*
 @ approach

Given string is = ABECEU

Lets indexing each char =>  A B E C E U
                        =>  0 1 2 3 4 5
Index 0 have vowel, so substring with index 0 are A, AB, ABE, ABEC, ABECE, ABECEU
Same check for other indexing as well.

Short way to count number of substrings from any index is => String.length - i
So from index 0 , substring are = 6 - 0 = 6
Substrings from index 2 = 6 - 2 = 4
Substrings from index 4 = 6 - 4 = 2
Substrings from index 5 = 6 - 5 = 1
*/

// TC  - O(n^2) because we have to use array includes method here.
// Compare directly using if condition to reduce it to O(n)
function countSubStringStartFromVowels(str) {
    console.log('countSubStringStartFromVowels :', str);
    let count = 0;
    let vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
    for (let i = 0; i < str.length; i++) {
        if (vowels.includes(str[i])) {
            count += (str.length - i);
        }
    }
    console.log(count);
    return count;
}

countSubStringStartFromVowels('ABECEU'); //13


//! Best Time to Buy and Sell Stocks I

/*
Say you have an array, A, for which the ith element is the price of a given stock on day i.
If you were only permitted to complete at most one transaction (ie, buy one and sell one share of the stock), design an algorithm to find the maximum profit.

Return the maximum possible profit.

Problem Constraints
0 <= A.size() <= 700000
1 <= A[i] <= 10^7

Input = A = [1, 4, 5, 2, 4]
Output = 4 :: Buy the stock on day 0, and sell it on day 2.
*/

// TC - O(n^2 ) Brute Force way
function maxProfitInStock(A) {
    console.log('maxProfitInStock :', A);
    let maxProfit = 0;
    for (let i = 0; i < A.length; i++) {
        for (let j = i + 1; j < A.length; j++) {
            if (A[j] > A[i]) {
                maxProfit = Math.max(A[j] - A[i], maxProfit);
            }
        }
    }
    return maxProfit;
}
console.log(maxProfitInStock([1, 4, 5, 2, 4])) // 4
console.log(maxProfitInStock([1, 9, 2, 15, 3])) // 14

// TC  = O(n) & SC = O(n)
function maxProfitInStockOptimized(A) {
    console.log('maxProfitInStockOptimized :', A);
    let maxProfit = 0;
    let maxElementArr = []; // For every element, find max element in right side and store here.
    let len = A.length;
    let tempMax = 0;
    for (let i = len - 1; i >= 0; i--) {
        tempMax = Math.max(A[i], tempMax);
        maxElementArr[i] = tempMax; // maxElementArr will fill from last index to first index.
    }
    //console.log(maxElementArr)

    // Now we have max element array of each element in right side of that element. So simply do maxElement[i] - A[i]
    for (let i = 0; i < A.length; i++) {
        maxProfit = Math.max(maxElementArr[i] - A[i], maxProfit);
    }
    return maxProfit;
}
console.log(maxProfitInStockOptimized([1, 4, 5, 2, 4])) // 4
console.log(maxProfitInStockOptimized([1, 9, 2, 15, 3])) // 14