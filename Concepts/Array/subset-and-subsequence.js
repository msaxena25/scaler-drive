/*
@ What is array?

An array is a linear collection of values stored at contiguous memory locations.

@ What is subarray?

A subarray is nothing but a slice of these contiguous memory locations of the actual array. In simpler terms, a subarray is nothing but any contiguous part of a given array.
The subarray has the same sequence of elements (order of the elements) as it is in the array.

* Example: Let the array be: arr = [1, 2, 3, 4, 5]
- All subarrays -

[1]
[2]
[3]
[1, 2]
[1, 3]
[2, 3]
[1, 2, 3]

@ What is subset?

Subset is nothing but any possible combination of the original array (or a set).

For example, the subsets of array arr = [1, 2, 3, 4, 5] can be:

[3, 1]
[2, 5]
[1, 2], etc.

@ What is subsequence?

A subsequence is a sequence of the elements of the array but not contiguous.

* For example, the subsequences of the array arr : [1, 2, 3, 4] can be:

[1, 3]
[1, 3, 4]
[1, 4]
[2, 4]
[1, 2, 3, 4], etc.

* NOTE: All subarrays are Subsequences. But not all subsequences are subarrays.

*/

/*
@ Array = [4, 1, 9, 2, 3, -1, 6]

                Subarray    SubSet  Subsequence
[4, 1]             ✔️       ✔️      ✔️
[1, 9, 2]          ✔️	    ✔️      ✔️
[4, 2, 6]          ❌       ✔️      ✔️
[3, 2, 9]          ❌       ✔️      ❌

* NOTE:  All subsequences are subset. But not all subsets are subsequences.


* = number of subsets > number of subsequences If subset elements are not distinct then-

*/

/*

* Two subsets that have same elements are known as Same subset.

@ arr = [1, 2, 3]

Subset -> [2, 3] & [3, 2] are same because both have same elements.

Subset => [1, 3] & [3, 1] are same.

Subset => [1, 2, 3] & [3, 2, 1] are same.

? Some subsets from above array-

[1, 2, 3]
[1, 3, 2]
[2, 1, 3]
[2, 3, 1]
[3, 1, 2]
[3, 2, 1]

But Actually they are all same subset with same elements,
so all will count as 1 and We will consider a subset [1,2,3] only.

*/

/*
* For Distinct elements => no. of subsets = no. of subsequences.

@ Arr  = [1, 2, 3]

SubSequence         SubSet
[]                    []
[1]                   [1]
[2]                   [2]
[3]                   [3]
[1,2]                 [1,2]
[1,3]                 [1,3]
[2,3]                 [2,3]
[1,2,3]               [1,2,3]

Subsets like [3,1], [3, 2] or [3,2,1] will not consider because they have same elements from one of above subset, just order change.

* So total number of subsequences are subset = 2^n

Here n = 3 , so 2^3 = 8.

? IF empty subsequence does not consider then no of subsequences are 2^n - 1.

*/

/*
*Type            Continuity  Order   Count

Subarray            Yes     Yes     n*(n+1) / 2
Subsequence         Yes     No      2^n
Subset              No      No      2^n

*/


/*
@ arr = [1, 2, 3]

In every subsequence, either element will be there or not, means each item has only two states 0 or 1.
1 means - item is presented in subsequence array & 0 means not.

[1, 2] => 3 is not present so put 0 on that index, In Bit Form we can say this [1, 1, 0]
[1, 3] => 2 is not present so put 0 on that index, In Bit Form we can say this [1, 0, 1]

* Lets represent element by 0 and 1

? arr = [1, 2, 3]
index    0  1  2

[0, 0, 0]   []
[1, 0, 0]   [1]
[1, 1, 0]   [1, 2]
[1, 0, 1]   [1, 3]
[1, 1, 1]   [1,2,3]
[0, 1, 0]   [2]
[0, 1, 1]   [2, 3]
[0, 0, 1]   [3]

? These Bit representation actually numbers from 0 to 7. Like-

[0, 0, 0]  = 0
[1, 0, 0]  = 4
[1, 1, 0]  = 6
[1, 0, 1]  = 5
[1, 1, 1]  = 7
[0, 1, 0]  = 2
[0, 1, 1]  = 3
[0, 0, 1]  = 1

? Lets write above in sequence from 0 to 7-

[0, 0, 0]  = 0  => []
[0, 0, 1]  = 1  => [3]
[0, 1, 0]  = 2  => [2]
[0, 1, 1]  = 3  => [2, 3]
[1, 0, 0]  = 4  => [1]
[1, 0, 1]  = 5  => [1, 3]
[1, 1, 0]  = 6  => [1, 2]
[1, 1, 1]  = 7  => [1,2,3]

? Numbers are from 0 to 7, Means total 8 subsequences and that is 2^n.

* So now big thing is to pick an element for subsequence from these numbers & bits.

@ Arr  = [1,2,3]

? Challenge is- In any how, we have to get these array indices (0, 1, 2) from bits and numbers (0 to 7).

For each index 0 1 & 2, Lets do left shift of 1 with 0, 1 and 2-

Index 0:    1 << 0 = 001 << 0 = 001
Index 1:    1 << 1 = 001 << 1 = 010
Index 2:    1 << 2 = 001 << 2 = 100

Now Calculate ith subsequence based on above left shift value by doing AND operation with i-
And if resulting value is not 0 then take that index element.

1st => [arr[0]]
    index 0    i = 1 => 001 & 001 = 1
    index 1    i = 1 => 010 & 001 = 0
    index 2    i = 1 => 100 & 001 = 0

2nd => [arr[1]]
    index 0    i = 2 => 001 & 010 = 0
    index 1    i = 2 => 010 & 010 = 1
    index 2    i = 2 => 100 & 010 = 0

4th => [arr[2]]
    index 0    i = 4 => 001 & 100 = 0
    index 1    i = 4 => 010 & 100 = 0
    index 2    i = 4 => 100 & 100 = 4


5th => [arr[0], arr[2]]
    index 0    i = 5 => 001 & 101 = 1
    index 1    i = 5 => 010 & 101 = 0
    index 2    i = 5 => 100 & 101 = 4

6th => [arr[1], arr[2]]
    index 0    i = 6 => 001 & 110 = 0
    index 1    i = 6 => 010 & 110 = 2
    index 2    i = 6 => 100 & 110 = 4

*/


//! Return all subsequences from given array

function printSubsequences(A) {
    console.log('printSubsequences :', A);
    const ans = [];
    const len = A.length;
    const total = Math.pow(2, len); // total subsequences
    for (let i = 0; i < total; i++) {
        // loop over indices
        let temp = [];
        for (let j = 0; j < len; j++) {
            if ((1 << j & i) != 0) {
                temp.push(A[j])
            }
        }
        ans.push(temp);
    }
    console.log(ans)
    return ans;

}
printSubsequences([12, 13]);
//printSubsequences([1, 2]);



//! Subset - return all possible subsets.

/*
Elements in a subset must be in non-descending order.
The solution set must not contain duplicate subsets.
Also, the subsets should be sorted in ascending ( lexicographic ) order.
The list is not necessarily sorted.
 */

function printAllSubset(A) {

}



function countSubsequencesHaveSumK(A, k) {
    console.log('countSubsequencesHaveSumK :', A, k);
    let count = 0;
    const len = A.length;
    const total = Math.pow(2, len); // total subsequences
    for (let i = 0; i < total; i++) {
        // loop over indices
        let sum = 0;
        for (let j = 0; j < len; j++) {
            if ((1 << j & i) != 0) {
                sum = sum + A[j];
            }
        }
        if (sum == k) {
            count++;
        }
    }
    console.log(count)
    return count;

}
countSubsequencesHaveSumK([1, 2, 3], 3)
countSubsequencesHaveSumK([-1, 4, 6, 3, 7, 2], 10)


//! SUBARRAY OR

/*
You are given an array of integers A of size N.
The value of a subarray is defined as BITWISE OR of all elements in it.
Return the sum of value of all subarrays of A % 10^9 + 7.
 */

function subArrayOR(A) {
    console.log('subArrayOR :', A);
    let sum = 0;
    for (let i = 0; i < A.length; i++) {
        sum = sum + A[i];
        let or = A[i];
        for (let j = i + 1; j < A.length; j++) {
            or = or | A[j];
            sum = sum + or;
        }
    }
    console.log(sum)
    return sum % (Math.pow(10, 9) + 7);
}
subArrayOR([1, 2, 3, 4, 5]) //71
subArrayOR([2]) //2

//? Above solution is giving TLE for large set of data.

//@ Lets solve same above Subarray Bitwise OR problem with O(n) using Contribution technique

/*
* LOGIC
arr = [1, 2, 3, 4]

Lets write every element as BIT value-

subarrays- total number of subarrays =  n * (n+1) / 2 = 4 * 5/2 = 10

subarray            OR of each elements         Covert each result into Bit

[1]             =   1                               0 0 1
[1, 2]          =   3   (1 | 2)                     0 1 1
[1, 2, 3]       =   3   (1 | 2 | 3)                 0 1 1
[1, 2, 3, 4]    =   7   (1 | 2 | 3 | 4)             1 1 1
[2]             =   2                               0 1 0
[2, 3]          =   3                               0 1 1
[2, 3, 4]       =   7                               1 1 1
[3]             =   3                               0 1 1
[3, 4]          =   7                               1 1 1
[4]             =   4                               1 0 0
________________________
                =  40               Count 1 at each position 0 1 and 2
                                    =  4 * 2^2  + 8 * 2^1 + 8 * 2^0
                                    =  16 + 16 + 8
                                    = 40

? Now our target is to count 1 at each bit position from given array numbers.
* Why counting 1 => Because OR will give result 1, if any bit is 1. => 1|1 = 1, 1|0 = 1, 0|1=1

1 =  0 0 1
2 =  0 1 0
3 =  0 1 1
4 =  1 0 0

? Integer is 32 bit, so we will check for every bit from 0 to 31.

0th bit = 1 0 1 0 = subarray that will contain only 0 => 2 , total subarray = 10, subarray that have 1 => 10 - 2 = 8
1st bit = 0 1 1 0 = subarray contains only 0 => 2, total subarray = 10, subarray that have 1 => 10 - 2 = 8
2nd bit = 0 0 0 1 = 3 continuous 0, subarray that have only 0 => 3 * (3+1) /2 = 6 => subarray with 1s = 10 - 6 = 4
3rd bit = 0 0 0 0 => subarray with 1's => 0
4th bit = 0 0 0 0 => subarray with 1's => 0
..
..
31th bit = 0 0 0 0 => subarray with 1's => 0

So Sum  = 8 * 2^0 + 8 * 2^1 + 4 * 2^2 + 0 * 2^3 + 0 * 2^4 + ..... = 40

* To check 0 at ith position, we do AND operation with (1 << i) with that number

Check 2nd bit of 4 is 0 or 1 => 100 & (1 << 2) => 100 & 100 = 100 , It means 2nd bit is 1.
Check 3rd bit of 7 is 0 or 1 => 0111 & (1 << 3) => 111 & 1000 = 0000, It means 3rd bit is 0.

1 << 0 = 2^0 = 1
1 << 1 = 2^1 = 10
1 << 2 = 2^2 = 100
1 << 3 = 2^3 = 1000
1 << 10 = 2^10 = 1000000000
*/

// used BigInt here for very large Integer value.
function subArrayORWithContributionTech(A) {
    console.log('subArrayORWithContributionTech :', A);
    let ans = BigInt(0);
    let mod = BigInt(1000000007);
    let n = A.length;
    let total = n * (n + 1) / 2;
    for (let i = 0; i < 32; i++) { // Integer is 32 bit
        let count0 = 0;
        let zsub = BigInt(0); // zero subarray
        for (let j = 0; j < n; j++) { //check ith bit of every element
            if ((A[j] & (1 << i)) == 0) { // check ith bit is 0 or not
                count0++; // checking how many contiuous 0s are there
            }
            else {
                zsub += BigInt(count0) * BigInt(count0 + 1) / BigInt(2); // calculate subarrays that have only 0
                zsub = zsub % mod;
                count0 = 0;

            }
        }
        zsub += BigInt(count0) * BigInt(count0 + 1) / BigInt(2); //in case, count0 > 0 then calculate subarray here as well.
        zsub = zsub % mod;
        count0 = 0;
        ans += (BigInt(total) - zsub) % mod * BigInt((1 << i)) % mod;
        ans = ans % mod;
    }
    return Number(ans % mod);

}
console.log(subArrayORWithContributionTech([1, 2, 3, 4]))
console.log(subArrayORWithContributionTech([1, 2, 3, 4, 5]))