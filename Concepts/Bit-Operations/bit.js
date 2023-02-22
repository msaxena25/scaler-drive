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

*  A & 1 (Mostly Used to Check number is even or odd)

0 -  If last bit of A is 0.
1 -  If last bit of A is 1.

1 0 0 1        1 0 0 0
0 0 0 1        0 0 0 1
________       ________
0 0 0 1        0 0 0 0

* @ A & 0 = 0 // You can memorize by taking example of 10 and do &, | and ^
* @ A & A = A
* @ A | 0 = A
* @ A | A = A
* @ A ^ 0 = A
* @ A ^ A = 0

    10 & 00 = 00
    10 & 10 = 10
    10 | 00 = 10
    10 | 10 = 10
    10 ^ 00 = 10
    10 ^ 10 = 00

 */

/*
@ Cummtative properties-

* A & B = B & A
* A | B = B | A
* A ^ B = B ^ A

@ Associative Properties-

* (A & B) & C = A & (B & C)
* (A | B) | C = A | (B | C)
* (A ^ B) ^ C = A ^ (B ^ C)


*/

/*
@ Left Shift Operations-

 a =      0  0  1  0  1  1  0  1  (45)
 a << 1 = 0  1  0  1  1  0  1  0  (90)
 a << 2 = 1  0  1  1  0  1  0  0  (180)
 a << 3 = 0  1  1  0  1  0  0  0


     = a * 2^n
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
Result = 45                    = 45                    = 61                   = 45

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


//! Set ith bit of a number if it is unset, else no change. (0 to 1)

//? Used OR here Because 1 | 1 = 1 , 0 | 1 = 1, Means if bit is 1 then no change and if 0 then changed to 1.
function changeUnsetToSet(num, i) {
    console.log('changeUnsetToSet :', num, i, (num).toString(2));
    // return num | Math.pow(2, i);
    return num | (1 << i);

    // above both way are same. 2^i is same as 1 << i.

}
// console.log(changeUnsetToSet(45, 2));
// console.log(changeUnsetToSet(45, 4));
console.log(changeUnsetToSet(8, 3));
console.log(changeUnsetToSet(8, 2));
//console.log(changeUnsetToSet(4, 1));

//! Unset ith bit if it is set- (1 to 0)

function changeSetToUnsetBit(num, i) {
    console.log('changeSetToUnsetBit :', num, i, (num).toString(2));
    if ((num & (1 << i)) != 0) { // it it is not 0, means ith bit is 1
        return num ^ (1 << i); // If ith bit is 1 change it to 0 by using XOR. 1 ^ 1 = 0
    } else {
        return num;
    }
}
console.log(changeSetToUnsetBit(8, 3))
console.log(changeSetToUnsetBit(8, 2))





/******************************************* */

//! What is the size of int?
//@ In 16-bit operating systems, the int type is usually 16 bits, or 2 bytes. In 32-bit operating systems, the int type is usually 32 bits, or 4 bytes.

//! 64-bit UNIX applications
/*
1 byte  = 8 bits

Name    Length

char	1 byte
short	2 bytes
int	    4 bytes
long	8 bytes
float	4 bytes
double	8 bytes
long double	16 bytes
 */



//! Count the number of set bits in given number.

function countSetbits(num) {
    console.log('countSetbits :', num, (num).toString(2));
    let count = 0;
    while (num > 0) {
        if (num & 1 == 1) { // A & 1 == 1 if A's last bit is 1.
            count++;
        }
        num = num >> 1; // one by one do right shift
    }
    console.log(count);
    return count;

}
countSetbits(45);
countSetbits(256);



/********************************** */

//! negative numbers -

/*
A geometric progression, GP is generally represented in form a, ar, ar2.... where 'a' is the first term and
'r' is the common ratio of the progression.

geometric progression a, ar, ar^2, ar^3, ...
nth term: a(n) = ar^(n - 1)
* Sum of the first n terms: Sn = a(r^n - 1) / (r - 1) when r ≠ 1
*/

//!  Most Significant Bit

/*
    If we take a look decimal number, 231, the most significant digit is the leading 2. Compared to the other two digits, the leading 2 determines the greatest part of the number's numerical value, as it signifies the hundreds in the number.

If we take, for example, the binary number 11100111 (231 in decimal), and send it as a string of data of a network, we can send it in two ways: starting from left to right, or starting right to left. These two orderings are commonly called
Most Significant Bit First, and Least Significant Bit First, respectively.

*/

//! MSB as signed Bit

/* The msb can also be used to denote the sign bit of a binary number in it's one's or two's complement notation, with 1 meaning it's a negative number, and 0 meaning it's a positive number. */

//! One's complement & two's complement

/* One's complement of a binary number is obtained by simply inverting (flipping) all of it digits.
In order to calculate a binary number's two's complement, we first determine it's one's complement (by swapping it's digits like before), and then adding 1 to it.
In basic calculus, this two's complement will behave like the negative number of the starting bit sequence.
 */

//! The least significant bit

/* The least significant bit is the right-most bit in a string. It is called that because it has the least effect on the value of the binary number, in the same way as the unit digit in a decimal number has the least effect on the number's value. The lsb also determines whether the given number is odd or even. The number 11100111 is an odd number, since it's lsb (1) is an odd number.
 */

//! Return negative number of given number.
/*
number = 45      1 0 1 1 0 1
This is Int and int have 4 bytes (4 * 8 = 32 bit).

Lets represent 45 in 8 bits = 0 0 1 0 1 1 0 1
Flip all values             = 1 1 0 1 0 0 1 0      (1's Complement)
Now add 1                   = 0 0 0 0 0 0 0 1
                            ____________________
                              1 1 0 1 0 0 1 1      (2's complement)
Decimal result              = 211


Now we know If MSB is 1 means it is - signed and if 0 then it + signed.

*     1   1   0   1   0   0   1   1
?    -128 64  32  16  8   4   2   1
=   -45 */



//! Range of Integer

/*
* Int = 32 bit

    Min value = 1  0   0   0 ... .. 0   0   0         = -2^31 (why - because MSB is 1)
?               31 30  29  28       2   1   0

    Max value = 0  1   1   1 ... .. 1   1   1         = 2^31 - 1 (+ value, thats why we have written MSB as 0)
?               31 30  29  28       2   1   0

@  -2^31       = -2147483648   =  -2 * 10^9
@  2^31 - 1    =  2147483647   =   2 * 10^9

*/

//! Create an array of 32 bit & If We will add all values result will be 2147483647 as mentioned above.
function createArrayOfSize32() {
    console.log('createArray :');
    let arr = []
    // loop will run from 0 to 30 for positive values because when last bit is 1, it consider as negative number.
    for (let i = 0; i < 31; i++) {
        arr.push(1 << i)
    }
    console.log(arr)
    return arr;
}
//createArrayOfSize32();


//! Range of Long

/*
* Long  = 64 bit

Min Value   = -2^63      = -9 * 10^18
Max Value   = 2^63 - 1   =  9 * 10^18

*/


//! Calculate sum of all given number in an array

/**
Constraints-
1 <= N >= 10^5
1 <= A[i] >= 10^6
*/

function sum(A) {
    console.log('sum :', A);
    let sum = 0;
    for (let i = 0; i < A.length; i++) {
        sum += A[i];
    }
    console.log(sum);
}
sum([1, 2, 3, 4, 5, 6, 7, 8, 9])
sum([1 << 2, 1 << 3, 1 << 4, 1 << 5, 1 << 6]) // 1 << 2 means Math.pow(2, 2)

//sum(createArrayOfSize32()) // 2147483647




//! Lets Understand INT Overflow

/**
Constraints-
1 <= N >= 10^5
1 <= A[i] >= 10^6
*/

//! create an Array Of Size 10^5, With each value 10^6 as per constraints


function createArrayWithMaxConstraintsValues() {
    console.log('createArrayOfSize32WithMaxElements :');
    let arr = [];
    let value = Math.pow(10, 6); // max value of one element as per above Constraints.
    let arrayRange = Math.pow(10, 5) // max length of array as per above constraints
    // loop will run from 0 to 30 for positive values because when last bit is 1, it consider as negative number.
    for (let i = 0; i < arrayRange; i++) {
        arr.push(value)
    }
    //console.log(arr)
    return arr;
}
//createArrayWithMaxConstraintsValues(); // [10^6, 10^6, 10^6, 10^6.. .........]
sum(createArrayWithMaxConstraintsValues()); // 100000000000 = 10^11

// We can calculate with simple maths = 10^6 * 10^5 = 10^11.


//@ Integer has max limit of 10^9 only. But here total sum of 10^11 so it can not store in Integer & Will raise error as INT OVERFLOW when called sum of each value.

// * NOTE - Locally In JavaScript we can not see any error because, in Javascript there is VAR, no int or long. But we can see this error on Online editor platforms like Leetcode Or In other languages like Java and C.

//? SOLUTION OF INT OVERFLOW - take sum variable as LONG.




//! INT OVERFLOW WHEN DOING MULTIPLICATION OF 2 MAX VALUES
/*
Constraints -

    a >= 2 * 10 ^ 9;
b >= 2 * 10 ^ 9;

var c = a * b; // 4 * 10^18  (INT OVERFLOW)

var c = a * b;
parseInt(c); // Still same problem because overlow will happen during multiplication step.

var c = parseInt(a) * b; // will work.
 */



//param A : integer
//param B : integer
//return an integer
function DecimalToAnyBase(A, B) {
    console.log('DecimalToAnyBase :', A, B);
    return (A).toString(B);

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

//@ NOTE: this solution will work if all elements are given in Even times except one element.
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
    // return parseInt(A, B); // smallest way
}
anyBaseToDecimal(22, 3);
anyBaseToDecimal(1010, 2);


//! You are given two integers A and B. Set the A-th bit and B-th bit in 0, and return output in decimal.

/*
Example Input
Input 1:
A = 3
B = 5
Input 2:
A = 4
B = 4


Example Output
Output 1:
40
Output 2:
16
*/

function setBit(A, B) {
    console.log('setBit :', A, B);
    return (1 << A) | (1 << B); // smallest way

    // A = 3, 2^3 = 8  =   1000
    // B = 5, 2^5 = 32 = 100000
}
console.log(setBit(3, 5))

//! XOR Sum

/* Given two integers A and B. Find the minimum value (A ⊕ X) + (B ⊕ X) that can be achieved for any X.

where P ⊕ Q is the bitwise XOR operation of the two numbers P and Q.

Example Input
Input 1:-
A = 6
B = 12
Input 2:-
A = 4
B = 9

Example Output
Output 1:-
10
output 2:-
13

Example Explanation
Explanation 1:-
X ^ A + X ^ B = 10 when X = 8
Explanation 2:-
X ^ A + X ^ B = 13 when X = 1
*/


function xorSum(A, B) {
    console.log('xorSum :', A, B);
    if (A == B) return 0;
    let andAB = A & B;
    return (A ^ andAB) + (B ^ andAB);
}
console.log(xorSum(6, 12))
console.log(xorSum(4, 9))
console.log(xorSum(967654297, 437680754)) //599474667
console.log(xorSum(77136780, 840287549)) //915195569


//! Subarrays with Bitwise OR 1

/*
Given an array B of length A with elements 1 or 0. Find the number of subarrays such that the bitwise OR of all the elements present in the subarray is 1.

A = 3
B = [1, 0, 1]
Output
5

The subarrays are :- [1], [0], [1], [1, 0], [0, 1], [1, 0, 1]
Except the subarray [0] all the other subarrays has a Bitwise OR = 1

*/

//@ Giving TLE error for large set of data..............
//!TODO
function subarraysWithBitwise(B) {
    console.log('subarraysWithBitwise :', B);
    let count = 0;
    for (let i = 0; i < B.length; i++) {
        if (B[i] == 1) {
            count++;
        }
        let orResult = B[i];
        for (let j = i + 1; j < B.length; j++) {
            orResult = orResult | B[j];
            if (orResult) {
                count++;
            }
        }
    }
    return count;
}
console.log((subarraysWithBitwise([1, 0, 1])))
console.log((subarraysWithBitwise([1, 0])))
console.log((subarraysWithBitwise([1, 0, 0])))