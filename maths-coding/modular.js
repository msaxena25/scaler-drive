
// https://www.cuemath.com/dividend-divisor-quotient-remainder-formula/

/*

? a / b = c  where a is the dividend, b is the divisor, and c is the quotient.


* Dividend Divisor Quotient Remainder Formula

@ Dividend = Divisor × Quotient + Remainder

- Derivation of above formula

a/b = c

Dividend/Divisor = Quotient
Dividend = Divisor × Quotient

And if any remainder is left, after the division process, then it is written as:

Dividend = Divisor × Quotient + Remainder

  _4_
2| 9
   8
  ---
   1

2 => Divisor
9 > Dividend
4 => Quotient
1 => Remainder

This can be verified with above formula: 9 = 2 × 4 + 1

*/

//! Find the dividend when the remainder is 1, the divisor is 3, and the quotient is 31.

/**
Solution: Given, remainder = 1, divisor = 3, quotient = 31 and let the dividend be x

Using the dividend divisor quotient remainder formula:

Dividend = Divisor × Quotient + Remainder

Dividend = 3 × 31 + 1

Dividend = 94

Therefore, the dividend is 94
 */


//! Remainder
// https://www.cuemath.com/numbers/remainder/

/**
Remainder refers to the remaining part, after the completion of the division process.

If we divide 5 pens among 4 children equally, we are left with 1 pen.

This example is translated into math, the remaining 1 pen is the remainder.

Also, if you divide the number 20, with a number 3, the quotient is 6 and the remainder is 2. The remainder is always lesser than the divisor.
 */

/*

a % b = c, Here c is remainder.

Dividend = Divisor × Quotient + Remainder

Remainder = Dividend - Divisor × Quotient

Note: Divisor × Quotient = Greatest multiple of divisor that is <= Dividend

Example: divisor = 3, quotient = 31 and Dividend = 94.
        3 * 31 = 93 and that is <= 94.

* Remainder = Dividend - Greatest multiple of divisor that is <= Dividend

10 % 4 = 10 - 4 * 2 = 2 is remainder.
13 % 5 = 13 - 5 * 2 = 3 is remainder.
150 % 11 = 150 - 11 * 14 = 140 - 143 = 7.

* Lets do it same for Negative Dividend.

-40 % 7 = -40 - (7 * -6) =  -40 - (-42) = -40 + 42 = 2. // -42 is greatest multiple of divisor here.

 */

//! JS, Java, C & C++ do wrong calculation for Negative Number (dividend) while Python do correct.

/*
* JS programming -

-40 % 7 = -5
-60 % 6 = -0
-60 % 7 = -4

*Lets do same with remainder formula-

-40 % 7 = -40 - (7 * -6) =  -40 - (-42) = -40 + 42 = 2.
-60 % 6 = -60 - (6 * -10) = -60 - (-60) = 0.
-60 % 7 = -60 - (7 * -9) = -60 - (-63) = 3

@ Python Language gives correct result which we got with the above Formula. (Can try with online editor)
https://replit.com/@mohitraj10/Pyhton-programs#main.py

* NOTE - ON THE ALL ABOVE CALCULATION , IT IS CLEAR THAT REMAINDER CAN NOT BE NEGATIVE NUMBER.

*/

//! Write program to Correct Remainder in JS.

function remainder(A, B) {
    let ans = A % B;
    if (A < 0) {
        return ans == 0 ? -ans : ans + B; // 0 == -0 > true
    } else {
        return ans;
    }
}

console.log(remainder(40, 6)) // 4
console.log(remainder(-40, 7)) // 2
console.log(remainder(-60, 6)) // 0
console.log(remainder(-60, 7)) // 3

//! Range of Remainder values- (Min Max Range)

/*

375 % 10 = 5
78 % 10 = 8
81 % 10 = 1
80 % 10 = 0
89 % 10 = 9

* Range of Remainder is [0 to 9], Keep in mine that it cannot be 10 (same as diviser)

@ Formula-

A % B = C

* Range of C = [0 to C-1];

*/

//! Modular Airthmatic

/*
@ (a + b) % c =  (a % c + b % c) % c

Example-

a = 4 & b = 7 & c = 3

(a + b) % c =  5 + 8 % 3 = 13 % 3 = 1
a % c = 4 % 3 = 1
b % c = 7 % 3 = 1

(a % c + b % c) = 1 + 1 = 2. (Note that, Here range of remainder will be - [0, c - 1]) Means [0, 2]
Thats why we need to again mod with this result.

(a % c + b % c) % c = 2 % 3 = 1.

@ (a * b) % c =  (a % c * b % c) % c

@ (a - b) % c   -|
                 |=> These two formulas, we will see in ADVANCED DSA.
@ (a / b) % c   -|

@ (a % p) % p = a % p
- a % p = Range of this [0, p-1], So here result is already less then p So doing again MOD does not have any impact.


@ (a%p * b) % p = (a * b) % p
    Lets proove it.
    - (a%p * b) % p
    - (a%p % p * b % p) % p  // used multiply formula (a * b) % c
    - (a % p * b % p) % p // with formula (a % p) % p
    - (a * b) % p // used multiply formula.

*/


//! Divisibility Rules

// Read here- https://www.cuemath.com/numbers/divisibility-rules/

//@ Is 2475 divisible by 3 or not?
// 2475 % 3 = (2 + 4 + 7 + 5) % 3 = 18 % 3 = 0
// Yes It is divisible.

/*
* Some Rules-

Divisible by 3	- The sum of all the digits of the number should be divisible by 3.
Divisible by 9	The sum of all the digits of the number should be divisible by 9.
Divisible by 4	Last two digits of the number should be divisible by 4 or should be 00.
Divisible by 8	Last three digits of the number should be divisible by 8 or should be 000.
Divisible by 2	A number whose last digit is an even number i.e. 0, 2, 4, 6, and 8.
Divisible by 5	Last digit should be 0 or 5.
Divisible by 6	A number that is divisible by both 2 and 3.
Divisible by 7  Multiply last digit by 2 and subtract it from the remaining digits. That result should be multiple of 7.
Divisible by 10	- Any number whose one's place digit is 0.
*/



/*
* EXAMPLES

> 357 is divisible by 7 as when we subtract the twice of the ones place digit, 7 × 2 = 14, and subtract it from the remaining digits 35, we get 35 -14 = 21, which is divisible by 7. So, 357 is divisible by 7.

> Is 450 divisible by 4? No, 450 is not divisible by 4 as the number formed by the last two digits starting from the right, i.e 50 is not divisible by 4.

> Is 350 divisible by 6? The sum of all the digits of 350 is 8, so it is not divisible by 3. Hence it cannot be divisible by 6, as a number needs to be a common multiple of both 2 and 3 to be a multiple of 6.

> Is 3900 divisible by 5? Yes, 3900 is divisible by 5 as the digit at the unit's place is 0 which satisfies the divisibility rule of 5.
*/




//! Divisibility by 3

/*
Given a number in the form of an array A of size N. Each of the digits of the number is represented by A[i]. Check if the number is divisible by 3.

A = [1, 2, 3]
Output > 1 // The number 123 is divisible by 3.
*/
function checkDivisibilityBy3(A) {
    let sum = 0;
    for (let i = 0; i < A.length; i++) {
        sum += parseInt(A[i]);
    }
    if (sum % 3 == 0) {
        return 1;
    }
    return 0;
}
console.log(checkDivisibilityBy3([1, 2, 3]))



//! Mod Array

/*
You are given a large number in the form of a array A of size N where each element denotes a digit of the number.
You are also given a number B. You have to find out the value of A % B and return it.

1 <= N <= 10^5
0 <= A[i] <= 9
1 <= B <= 10^9


A = [4, 3, 5, 3, 5, 3, 2, 1]
B = 47

43535321 % 47 = 20
 */





//!  Power with Modules


/*
You are given A, B and C .
Calculate the value of (A ^ B) % C

1 <= A <= 10^9
0 <= B <= 10^5
1 <= C <= 10^9


Input 1:
A = 2
B = 3
C = 3

output - 2

(2 ^ 3) % 3 = 8 % 3 = 2
*/

//? Brute force - Will not work for very large values (give NaN )
function powerWithModules(A, B, C) {
    console.log('powerWithModules :', A, B, C);
    return Math.pow(A, B) % C;
}
console.log(powerWithModules(2, 3, 5))
console.log(powerWithModules(211111111, 31111, 51111)); //NaN
//console.log(powerWithModules((Math.pow(10, 9)), Math.pow(10, 5), Math.pow(10, 9)));

//? Brute force - Range Error For very long values (will give NaN)
function powerWithModules1(A, B, C) {
    console.log('powerWithModules1 :', A, B, C);
    let power = 1;
    for (let i = 1; i <= B; i++) {
        power = power * A;
    }

    return power % C;
}
console.log(powerWithModules1(2, 3, 5));
console.log(powerWithModules1(211111111, 31111, 51111)); //NaN
//console.log(powerWithModules1((Math.pow(10, 9)), Math.pow(10, 5), Math.pow(10, 9)));


//@ Optimized way - at each iteration Mod with C to reduce size of answer & use BigInt.

//! BigInt - BigInt values represent numeric values which are too large to be represented by the number primitive.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt


function powerWithModules2(A, B, C) {
    console.log('powerWithModules2 :', A, B, C);
    let ans = BigInt(1);
    A = BigInt(A);
    B = BigInt(B);
    C = BigInt(C);
    for (let i = 0; i < B; i++) {
        ans = (ans * A) % C; // at every step mod with C
    }

    return Number(ans);
}
console.log(powerWithModules2(2, 3, 5));
console.log(powerWithModules2(9, 0, 7));
console.log(powerWithModules2(211111111, 31111, 51111)); //18793
console.log(powerWithModules2(637759701, 48998, 296839866)); //36291
console.log(powerWithModules2(71045970, 41535484, 64735492)) //20805472
//console.log(powerWithModules2((Math.pow(10, 9)), Math.pow(10, 5), Math.pow(10, 9)));