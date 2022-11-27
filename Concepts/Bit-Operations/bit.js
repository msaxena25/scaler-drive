/*
1. If a&1 = 1, then a is?
ANS > odd

2. What are the values of a&a, a|a, a^a?

ANS > a&a = a , a|a = a , a^a = 0

3. Given a = 1010011 and b = 1001001, their OR, XOR and AND are -

ANS - OR = 1011011 , XOR = 0011010 , AND = 1000001

4. Which of the following is the correct conversion of 10101101(base 2) to decimal?'

ANS - 173.

5. Which of the following is a correct conversion of 76 (base 10) to binary?

ANS - 1001100

6. Given two binary numbers A = 1001011 and B = 11001001. What is their sum?

ANS - 100010100



*/


//@ (2) base 10 = (10) base 2.

/*
@ Bitwise operations-

AND &
OR |
XOR ^
NOT !
LEFT SHIFT <<
RIGHT SHIFT >>
*/

/*
 * A & B = If A and B, both are 1 then only 1 else all 0.
 * A | B = If A and B, both are 0 then only 0 else all 1.
 * A ^ B = It is same as addition but we dont care for carry over value. Like - 1 ^ 1 = 0. while 1 + 1 = 10.
 *
 */

/*

@ XOR

0 1 0 1 0 0
1 0 1 1 0 1
____________
1 1 1 0 0 1

@ AND

1 1 1 1 0 1
0 0 1 1 0 1
_____________
0 0 1 1 0 1

@ OR

1 1 1 1 0 1
0 0 1 1 0 1
_____________
1 1 1 1 0 1

*/

/*
 * PROPERTIES

*  A & 1

0 -  If last bit of A is 0.
1 -  If last bit of A is 1.

1 0 0 1        1 0 0 0
0 0 0 1        0 0 0 1
________       ________
0 0 0 1        0 0 0 0

* @ A & 0 = 0
* @ A & A = A
* @ A | 0 = A
* @ A | A = A
* @ A ^ 0 = A
* @ A ^ A = 0

 */

/*
@ Cummtative properties-

* A & B = B & A
* A | B = B | A
* A ^ B = B ^ A

@ Associative Properties-

* (A & B) & C = A & (B & C)
* (A | B) & C = A | (B | C)
* (A ^ B) ^ C = A ^ (B ^ C)


*/

/*
@ Left Shift Opeartions-

 a =      0  0  1  0  1  1  0  1  (45)
 a << 1 = 0  1  0  1  1  0  1  0  (90)
 a << 2 = 1  0  1  1  0  1  0  0  (180)
 a << 3 = 0  1  1  0  1  0  0  0


* a << n  = a * 2^n
* 1 << n = 2^n

@ Right shift operation-

a = 8        1 0 0 0 (8)
a >> 1       0 1 0 0 (4)
a >> 1       0 0 1 0 (2)
a >> 1       0 0 0 1  (1)

! On every right shift, decimal value just half of previous decimal value.

* a >> n = a / 2^n
* 1 >> n = 1 / 2^n

 */

/*
See left shift-

0 0 0 1 = 1
0 0 1 0 = 2         =  1 << 1
0 1 0 0 = 2^2 = 4   =  1 << 2
1 0 0 0 = 2^3 = 8   =  1 << 3

@ OR operation of a number and left shift

n = 45 = 1 0 1 1 0 1    n = 45 = 1 0 1 1 0 1    n = 45 = 1 0 1 1 0 1    n = 45 = 1 0 1 1 0 1
1 << 2 = 0 0 0 1 0 0    1 << 3 = 0 0 1 0 0 0    1 << 4 = 0 1 0 0 0 0    1 << 5 = 1 0 0 0 0 0
OR     = 1 0 1 1 0 1    OR     = 1 0 1 1 0 1    OR     = 1 1 1 1 0 1   OR     = 1 0 1 1 0 1
Result = 45                    = 45                     = 61                    = 45

Observation in above calculation-

* n OR (1 << i) --> n             (When ith bit is set in n, means ith position is 1 in given number)
*              --> n + (1 << i)     (When ith bit is unset in n, means ith position is 0 in given number)


@ XOR operation of a number and left shift

n = 45 = 1 0 1 1 0 1    n = 45 = 1 0 1 1 0 1    n = 45 = 1 0 1 1 0 1    n = 45 = 1 0 1 1 0 1
1 << 2 = 0 0 0 1 0 0    1 << 3 = 0 0 1 0 0 0    1 << 4 = 0 1 0 0 0 0    1 << 5 = 1 0 0 0 0 0
XOR    = 1 0 1 0 0 1    XOR    = 1 0 1 1 0 1    XOR    = 1 1 1 1 0 1    XOR    = 0 0 1 1 0 1
Result = 41                    = 37                    = 61                    = 13

* n XOR (1 << i) --> n - (1 << i)   (When ith bit is set in n, means ith position is 1 in given number)
*                --> n + (1 << i)   (When ith bit is unset in n, means ith position is 0 in given number)

* n XOR (1 << i) - One more result is here -  ith bit is flipped in result.

@ AND operation of a number and left shift

n = 45 = 1 0 1 1 0 1    n = 45 = 1 0 1 1 0 1    n = 45 = 1 0 1 1 0 1    n = 45 = 1 0 1 1 0 1
1 << 2 = 0 0 0 1 0 0    1 << 3 = 0 0 1 0 0 0    1 << 4 = 0 1 0 0 0 0    1 << 5 = 1 0 0 0 0 0
AND    = 0 0 0 1 0 0    AND    = 0 0 1 0 0 0    AND    = 0 0 0 0 0 0    AND    = 1 0 0 0 0 0
Result = 4                     = 8                     = 0                     = 32

* n AND (1 << i) --> (1 << i)   (When ith bit is set in n, means ith position is 1 in given number)
*                --> 0          (When ith bit is unset in n, means ith position is 0 in given number)

@ NOTE- By using AND operation with ith left shift, we can check that ith bit is set or unset.

*/


/******************************************* */


//! For a given n, return true if ith bit is set.

function checkbitWithAND(num, i) {
    console.log('checkbitWithAND :', num, i);
    let leftShift = 1 << i; // 1 left shift by i
    if ((num & leftShift) == 0) {
        return false;
    } else {
        return true;
    }
}
// console.log(checkbitWithAND(45, 4))
// console.log(checkbitWithAND(45, 2))
//console.log(checkbitWithAND(5, 2))
//console.log(checkbitWithAND(711, 8))


function checkbitWithOR(num, i) {
    console.log('checkbitWithOR :', num, i);
    let leftShift = 1 << i; // 1 left shift by i
    if ((num | leftShift) == num) {
        return true;
    } else {
        return false;
    }
}
console.log(checkbitWithOR(711, 8))


function checkbitWithRightShift(num, i) {
    console.log('checkbitWithRightShift :', num, i);
    let rightShift = num >> i; //  num right shifted by i times
    if ((rightShift & 1) == 1) { // we know A & 1 = 1
        return true;
    } else {
        return false;
    }
}
console.log(checkbitWithRightShift(711, 8))


/******************************************* */


//! Unset ith bit of a number if it is set, else no change.

function unsetBit(num, i) {
    console.log('unsetBit :', num, i, (num).toString(2));
    // return num | Math.pow(2, i);
    return num | (1 << i);

    // above both way are same. 2^i is same as 1 << i.

}
console.log(unsetBit(45, 2));
console.log(unsetBit(45, 4));
console.log(unsetBit(8, 3));
console.log(unsetBit(8, 2));




/******************************************* */


//param A : integer
//param B : integer
//return an integer
function DecimalToAnyBase(A, B) {
    //   return (A).toString(B);

    if (A < B) { // 0 1 2
        return A;
    }
    let ans = Math.floor(A / B).toString();
    A = Math.floor(A % B);
    while (A > B) {
        A = Math.floor(A % B);
        ans += Math.floor(A / B).toString();
    }
    if (A < B) {
        ans = ans.toString() + (A).toString();
    }
    return ans;

}

//console.log(DecimalToAnyBase(6, 4))
console.log(DecimalToAnyBase(8, 2))

//! Single Number - Find unique element

/*
Given an array of integers A, every element appears twice except for one. Find that integer that occurs once.

NOTE: Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

1 <= |A| <= 2000000

0 <= A[i] <= INTMAX

Input - A = [1, 2, 2, 3, 1]
Output- 3
*/

function findUnique(A) {
    console.log('findUnique :', A);
    let ans = 0;
    for (let i = 0; i < A.length; i++) {
        ans = ans ^ A[i]; // use XOR because it works same as addition and skip carry over value.
    }
    console.log(ans)
    return ans;
}
// TC - O(n)
findUnique([1, 2, 2, 3, 1])
findUnique([6, 9, 6, 10, 9]);

//!  Any base to decimal

/*
 You are given a number A. You are also given a base B. A is a number on base B.
You are required to convert the number A into its corresponding value in decimal number system.

Input 1:
A = 1010
B = 2
Input 2:
A = 22
B = 3

Example Output
Output 1:
10
Output 2:
8
*/

function anyBaseToDecimal(A, B) {
    console.log('anyBaseToDecimal :', A, B);
    A = A.toString();
    let n = A.length;
    let sum = 0;
    for (let i = n - 1; i >= 0; i--) {
        sum = sum + (A[i] * Math.pow(B, n - i - 1));
    }
    console.log(sum)
    return sum;
}
anyBaseToDecimal(22, 3);
anyBaseToDecimal(1010, 2);