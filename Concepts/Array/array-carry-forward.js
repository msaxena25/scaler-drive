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

A = [1, 3]
2
*/

/**
** STEPS -
1. Find MAX AND MIN value from aray
2. If they are same means every items of the array are same then return 1.
3. In worst case - answer could be array.length (means first element and last element are only min or max value)
4. Take two variables minIndex and maxIndex. Initially they are -1.
5. Loop over the items from last to first. (n-1 to 0)
6. If ith element are min or maxvalue then only calculate minIndex & maxIndex, Dont do anything for rest items.
7. If arr[i] is maxValue then maxI = i;
8. If arr[i] is minValue then minI  = i;
9. For ith item max or min - calculate subarray length based on min & max Index. And If it is less then answer then assign this
length into answer.

 */


//@ right to left travering

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
                const len = minI - (maxI - 1); // minIndex will be higher because travering is right to left
                ans = Math.min(ans, len);
            }
        }
        if (arr[i] === minValue) {
            minI = i;
            if (maxI > -1) {
                const len = maxI - (minI - 1); // maxIndex will be higher because travering is right to left
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

//!  Even Subarrays

/* You are given an integer array A.

Decide whether it is possible to divide the array into one or more subarrays of even length such that the first and last element of all subarrays will be even.

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