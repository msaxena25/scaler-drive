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