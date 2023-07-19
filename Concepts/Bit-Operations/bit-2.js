
//! How to Check number is Odd or Even?

/*
    A & 1
          = 1 (number is odd)
          = 0 (number is even)
*/

//! Left & Right Shift Operator

/*
Lets take a 8 bit number

A = 5        0 0 0 0 0 1 0 1  = 5
A << 1       0 0 0 0 1 0 1 0  = 10
A << 2       0 0 0 1 0 1 0 0  = 20

..

By seeing above patterns its looks like -

* A << n = A * 2^n // But Here is some limitation-

A = 5 and n = 6 => 5 * 2^6 = 320. (Expectation)

? But Lets see maximum number of 8 bit integer = 1 1 1 1 1 1 1 = 255

A = 5        0 0 0 0 0 1 0 1  = 5
A << 1       0 0 0 0 1 0 1 0  = 10
A << 2       0 0 0 1 0 1 0 0  = 20
..
..
A << 5       1 0 1 0 0 0 0 0  = 160
A << 6       0 1 0 0 0 0 0 0  = 64

@ As per formula A << 6 was 320 but Here A << 6 is 64  WHY ?
? Because of Integer Overflow.


* A >> n = A / 2^n
*/

//! Check ith bit is set or not with Right shift?

//?  DO Right shift operator by ith time and then do AND by 1. If it is 1 means bit it set else unset.

/*
* (N >> i) & 1
        => If it is 1 means bit is set.
        => If it is 0 means bit is not set


A = 5 =>
Binary form => 1 0 1
Check 2nd bit is set or Not

5 >> 2 = 0 0 1
& 1      0 0 1
        ______
         0 0 1   => This is 1 means bit is set.

*/

//! Check ith bit is set or unset with Left shift ?

/*
* n AND (1 << i) --> (1 << i)   (When ith bit is set in n, means ith position is 1 in given number)
*                --> 0          (When ith bit is unset in n, means ith position is 0 in given number)

*/

//! XOR problems

/*
    * A ^ A = 0
    * A ^ 0 = A
*/

//! Find Unique element where other element are twice.
//? XOR of all elements => will return that single element.

/*
    ans = 0; // why take 0 because number ^ 0 is number.
    for => 0 to A.length
        ans = ans ^ A[i]
    return ans;
*/

function findUniqueWhenOtherAreTwice(A) {
    let ans = BigInt(0);
    for (let i = 0; i < A.length; i++) {
        ans = ans ^ BigInt(A[i]);
    }
    return Number(ans);
}

//! Find Unique element where other element are thrice.
// [2 2 2 3 4 4 4 5 5 5]
// ans is 3

/*
* For this question XOR operation will not work.  WHY?
2 2 2 => Here two 2's will give 0 but one 2 will left.
4 4 4 => same here. one 4 will left.
5 5 5 => same here. one 5 will left.

So at last total remaining items = 2 3 4 5
And XOR of all these will not give correct answer.

*/

/*
@ Lets explain approach (bit by bit processing)

A   =   [2, 3, 2, 2]

-- Write binary form of each element

2   =   1 0 0
3   =   1 0 1
2   =   1 0 0
2   =   1 0 0

-- Now Count number of Set bit at each index

    =   4 0 1

- At 0th position, there is 1 set bit and that < 3, means it will be in answer.
- At 1st position, - there is no any 1 at this index so same will be answer.
- At 2nd position, there are 4 set bits - 3 from 2 and 1 from 3. If we take 4 % 3 , it wil give 1. Means 1 bit is remaining and that will part of ans.

SO ans =  1 0 1 = 3.


*/

function findUniqueWhenOtherAreThrice(A) {
    let ans = 0;
    for (let i = 0; i < 32; i++) {
        let countSetBit = 0;
        for (let j = 0; j < A.length; j++) {
            // count number of set bits at ith index
            countSetBit += (A[j] >> i) & 1; // check ith bit is 1 or not.
        }
        if (countSetBit % 3 == 1) { // it means there are 1 bit available which we will set in ans.
            // set ith bit in answer
            ans = (1 << i) | ans;
        }
    }
    return ans;
}
console.log(findUniqueWhenOtherAreThrice([2, 2, 2, 3, 4, 4, 4, 5, 5, 5])) //3


//! All elements appears K times instead of one single element. Find that unique element.

/*
    @ If K is even => We can use XOR processing of each element.
    @ If k is Odd => Use bit by bit processing.
*/


//! Number of 1 Bits
/*
Write a function that takes an integer and returns the number of 1 bits it has.

*/

function countSetBits(num) {
    let countSetBit = 0;
    // number is 32 bit.
    for (let i = 0; i < 32; i++) {
        // count number of set bits at ith index
        countSetBit += (num >> i) & 1; // check ith bit is 1 or not.
    }
    return countSetBit;
}
console.log(countSetBits(11)) //3


//! Single Number III
// https://www.scaler.com/academy/mentee-dashboard/class/47633/assignment/problems/9184?navref=cl_tt_lst_nm

/*
Given an array of positive integers A, two integers appear only once, and all the other integers appear twice.
Find the two integers that appear only once.

Note: Return the two numbers in ascending order.

A = [1, 2, 3, 1, 2, 4]
output: [3, 4]

*/

function findUniqueThrice(A) {

    // Compute XOR of each element
    let xor = 0;  // initial value
    for (let i = 0; i < A.length; i++) {
        xor = A[i] ^ xor;
    }

    /*
     Now find at least one index position in this xor result where Bit is Set to seperate array elements into two groups.
     You can take any index where bit is set BUT generally we take LSB (Least significant bit).
     Example: If index position is 2 where bit is set in xor. Then Check each element of array again and divide them into X and Y groups. X will contains all elements where bit will be 1 at the same location 2nd index. Y will contains other element where bit will be 0 at the same location 2nd index.
     ?WHY ? Why we are considering set bit in this xor result ?
     Because at least one bit should be Set to get XOR result. If all bits are 0 then result will also be 0.
      */

    // loop over 0 to 31
    let setBitIndex = -1; // initially location is -1.
    for (let i = 0; i < 32; i++) {
        if ((xor >> i) & 1 == 1) { // check bit is set or not
            setBitIndex = i;
            break; // we need only one bit that is 1 thats why break loop.
        }
    }

    // Now take two groups
    let x = 0; let y = 0;

    // Check each element on the basis of setBitIndex and find out x and y value separately.
    for (let i = 0; i < A.length; i++) {
        if ((A[i] >> setBitIndex) & 1 == 1) {
            x = A[i] ^ x;
        } else {
            y = A[i] ^ y;
        }
    }
    return x < y ? [x, y] : [y, x];
}

//console.log(findUniqueThrice([1, 2, 3, 1, 2, 4])) //[3, 4]
console.log(findUniqueThrice([2308, 1447, 1918, 1391, 2308, 216, 1391, 410, 1021, 537, 1825, 1021, 1729, 669, 216, 1825, 537, 1995, 805, 410, 805, 602, 1918, 1447, 90, 1995, 90, 1540, 1161, 1540, 2160, 1235, 1161, 602, 880, 2160, 1235, 669])) //880 1729


//!  Maximum AND Pair

/*
Given an array A. For every pair of indices i and j (i != j), find the maximum A[i] & A[j]. */