//! Recurrsion is ->

// @ Function call itself.
//@ Solve a problem by solving subproblems.

// ! Steps to solve Recursion problems.

/*
1. Determine what the function should do.
2. Build the logic on how to use subproblems to solve current problem
3. Base case - smallest subproblem for which we know answer.


*/

//! Sum of First n natural numbers

// TC - O(n) & SC - O(n)
function sumOfNaturalNumbers(n) {
    if (n == 1) {
        return 1; // base case
    }
    return n + sum(n - 1);
}


//! Find Factorial!

/* Write a program to find the factorial of the given number A.

Problem Constraints
0 <= A <= 12
*/

/*
Fact(4) = Fact(3) * 4
Fact(3) = Fact(2) * 3
Fact(2) = Fact(1) * 2
Fact(1) = 1

*/

console.log('factorial :');
function factorial(A) {
    if (A <= 0) {
        return 1;
    }
    return factorial(A - 1) * A;

}
console.log(factorial(4))

//!  Print 1 to A function (Increasing Order)

// You are given an integer A, print 1 to A using using recursion.

//@ We can do this with simple For loop

//@ Lets do this Using recursion

let ans = '';
function onetoA(A) {
    if (A < 1) {
        return ans; // final return ans
    }
    ans = A + ' ' + ans;
    return onetoA(A - 1);
}
//console.log(onetoA(10)) // 1 2 3 4 5 6 7 8 9 10
ans = '';
console.log(onetoA(16))


/*
@ How to console / print output on Online Editor-

module.exports = {
    solve: function (A) {
        let ans = '';
        function onetoA(A) {
            if (A < 1) {
                return ans; // final return ans
            }
            ans = A + ' ' + ans;
            return onetoA(A - 1);
        }
        console.log(onetoA(A))
    }
};
*/


//! Print A to 1 function (decreasing order)

ans = '';
function ATo1(A) {
    if (A < 1) {
        return ans; // final return ans
    }
    ans = ans + A + ' ';
    return ATo1(A - 1);
}
console.log(ATo1(20)) //20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1


//!  Find Fibonacci Ath element - II

/*
The Fibonacci numbers are the numbers in the following integer sequence.

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ……..

Fn = Fn-1 + Fn-2

Given a number A, find and return the Ath Fibonacci Number.

Problem Constraints
0 <= A <= 20

Input A = 9
Output: 34
f(9) = f(8) + f(7) = 21 + 13  = 34
 */
console.log('Ath Fibonacci Number')
function fab(A) {
    if (A < 2) {
        return A;
    }
    return fab(A - 1) + fab(A - 2);
}
console.log(fab(1));

//* Time complexity of Fibonacci series. - O(2^n)

/*
@ Explanation-


                  fib(n)                    ----------  1 = 2^0
        fib(n-1)           fib(n-2)         ----------  2 = 2^1
fib(n-2) + fib(n-3)     fib(n-3) + fin(n-4) ----------  4 = 2^2


* Space Complexity - O(n) Because only n stack is required to execute function.

*/




// ans = '';
// function printFab(A) {
//     if (A <= 1) {
//         return A;
//     }
//     let sum = printFab(A - 1) + printFab(A - 2);
//     console.log(sum)
//     return printFab(A - 1) + printFab(A - 2);
// }
// console.log(printFab(4));


//! Check Palindrome

/*
Write a recursive function that checks whether string A is a palindrome or Not.
Return 1 if the string A is a palindrome, else return 0.
*/

//@ Using recursion
function checkPalindrome(A, s, e) {
    if (s >= e) {
        return true;
    }
    if (A[s] == A[e]) {
        return checkPalindrome(A, s + 1, e - 1);
    }
    return false;
}
console.log(checkPalindrome('naman', 0, 4))
console.log(checkPalindrome('pencil', 0, 5))


//! Given a and n Find a^n Using recursion. (It should not be overflow)

/*
@ Recursive manner -

@ Lets devide a problem into a subproblem

2^5  = 2 * 2 * 2 * 2 * 2 = 32
2^5  = 2^4 * 2 (I can also do this)
2^n  = 2^n-1 * 2
..
..
a^n = a^n-1 * a

pow(a, n) = pow(a, n-1) * a;


*/

console.log('Find a to the power n')

function power1(a, n) {
    if (n == 0) {
        return 1;
    }
    return power1(a, n - 1) * a;
}
console.log(power1(2, 5));
console.log(power1(2, 50)); //1125899906842624
//console.log(power1(2, 5000)); //Infinity

//console.log(power1(2, 50000)); //Uncaught RangeError: Maximum call stack size exceeded

//? It means the above solution is not perfect because its giving call stack error for a very large value.

//@ NOTE: Keep in mind that a problem can be devided into multiple sub problems.

/*
@ Multiple subproblems

2^5 = 2^4 * 2 (devide into a single subproblem)

2^5 = 2^2 * 2^2 * 2 (devide into two subproblems)

2^64 = 2^32 * 2^32
2^65 = 2^32 * 2^32 * 2

a^n = a^(n/2) * a^(n/2)         -- If n is Even
a^n = a^(n/2) * a^(n/2) * a     -- If n is Odd

*/

function power2(a, n) {
    if (n <= 0) {
        return 1;
    }
    if (n % 2 == 0) { // even case
        return power2(a, Math.floor(n / 2)) * power2(a, Math.floor(n / 2));
    } else {
        return power2(a, Math.floor(n / 2)) * power2(a, Math.floor(n / 2)) * a;
    }
}

console.log(power2(2, 50000)); //Infinity (Not getting any maximum call stack error)

//@ Optimized version of above code

function power3(a, n) {
    if (n <= 0) {
        return 1;
    }
    let p = power2(a, Math.floor(n / 2)); // store power function call result into a variable and use that
    if (n % 2 == 0) { // even case
        return p * p;
    } else {
        return p * p * a;
    }
}
console.log(power3(2, 50000)); //Infinity


//! Understanding of recursion Time complexity


//@ Recursive Cost Formula of function power2-

/*
? a^n = a^(n/2) * a^(n/2)         -- If n is Even
? a^n = a^(n/2) * a^(n/2) * a     -- If n is Odd


* f(n) = f(n/2) + f(n/2) + 1;

Why we added 1 at last because
    - We are doing multiplication operation of n/2 * n/2 and that airthmatic operation takes O(1)
    - n/2 * n/2 * a - It also cost O(1)


f(n) = 2 * f(n/2) + 1;

f(n/2) = 2 * f(n/4) + 1; // calculate for n/2

then

f(n) = 2 * 2(f(n/4) + 1) + 1;
     = 4f(n/4) + 3;
     = 2^2 f(n / 2^2) + 2^2 - 1; // we can also write this in power of 2.


f(n/4) = 2 * f(n/8) + 1; // calculate for n/4

f(n) = 4 (2 * f(n/8) + 1) + 3;
     = 8 f(n/8) + 7;
     = 2^3 f(n / 2^3) + 2^3 - 1;

-- After k steps

In first step when n/2,  2 to the power 1
In second step when n/4, 2 to the power 2
In third step when n/8 2 to the power 3
In kth step when n/k, 2 to the power k

* f(n) = 2^k f(n / (2^k)) + 2^k - 1;

* base case was f(0) = 1;   -- it means for n = 0, cost is only O(1)

? To make n/2^k to its base case, we can do

n / 2^k = 1
n = 2^k

k = logn


Lets put logn in place of k

f(n) = 2^(logn) f (n / 2^logn) + 2^logn - 1;
f(n) = n f( n/ n) + n - 1;
f(n) = n f(1) + n - 1;

* and for the above equation, TC is O(n)

*/


//@ Recursive Cost Formula of function power3 -


/*
? let p = power2(a, Math.floor(n / 2));
 if (n % 2 == 0) { // even case
        return p * p;
    } else {
        return p * p * a;
 }

* f(n) = f(n/2) + 1; // Here we are doing recursive call only 1 time, so no need of multiply by 2.

f(n/2) = f(n/4) + 1; // value of n/2

f(n) = f(n/4) + 2; ==> f(n) = f(n/2^2) + 2;

f(n/4) = f(n/8) + 1; // value of n/4

f(n) = f(n/8) + 3 ==> f(n) = f(n/2^3) + 3;

f(n/8) = f(n/16) + 1; // value of n/8

f(n) = f(n/16) + 4 ==> f(n) = f(n/2^4) + 4;

-- After kth step

f(n) = f(n/2^k) + k;

* base case was f(0) = 1;   -- it means for n = 0, cost is only O(1)

? To reach n/2^k to its base case

k = logn (as explained in above example)

f(n) = f(n/2^logn) + logn;
f(n) = f(n/n) + logn;
f(n) = f(1) + logn;
f(n) = 1 + logn  = logn

* Time Complexity is O(logn)


*/


//! Understanding of Space Complexity of recursion

//@ Nice example of Space complexity by diagrams
//https://jarednielsen.com/big-o-recursive-space-complexity/


//? Find sum of First n natual numbers

console.log('Space complexity')
function sum(n) {
    if (n == 1) {
        return 1;
    }
    return sum(n - 1) + n;
}
console.log(sum(5)); // 15
console.log(sum(10)); // 55

/*
@ Lets check the SC for sum(5)

? Iteration flow: sum(5) => sum(4) => sum(3) => sum(2) => sum(1) => 1

* Sum(n) = n + (n-1) + (n-2) + (n-3) + ...... + 1

* Sum(n) = n + Sum(n-1) ------ // Sum(n-1) is one of the subproblem.

* How to store in RAM?

4 index: sum(1)
3 index: sum(2)
2 index: sum(3)
1 index: sum(4)
0 index: sum(5)

After index 4, sum(1) will return 1 and pop out from memory.
Then sum(2) will execute and return some value and removed from memory and so on........

In such way There is only n block required to process complete program.

* It means SC - O(n)
*/




//!  Implement Power Function using recursion
//? (We have done same in modular.js file 'powerWithModules2' using for loop)

/*
Implement pow(A, B) % C.
In other words, given A, B and C, Find (AB % C).

Note: The remainders on division cannot be negative. In other words, make sure the answer you return is non-negative.

-10^9 <= A <= 10^9
0 <= B <= 10^9
1 <= C <= 10^9
*/
console.log('power function  pow(A, B) % C:');

function mainPowerFun(A, B, C) {
    function powerFun(A, B, C) {
        if (B == 0) {
            return 1 % Number(C); // 1 is number so convert C to number
        }
        let p = powerFun(A, (Math.floor(B / 2)), C); // returning number
        let p1 = BigInt(p) * BigInt(p); // bigint
        let p2 = p1 % C; // bigint
        let p3 = (BigInt(p1) * A) % C; // bigint
        if (B % 2 == 0) {
            return p2 < 0 ? Number(p2 + C) : Number(p2);
        } else {
            return p3 < 0 ? Number(p3 + C) : Number(p3);
        }
    }
    return powerFun(BigInt(A), (B), BigInt(C));
}

//@ Understand BigInt usecase here-

/*
? powerFun(BigInt(A), (B), BigInt(C));

Converted A to BigInt because in program A is multipling by itself so it will become a bigger value.
Converted C to BigInt because we are doing A % C and A is BigInt so C will also be a BigInt Value.
Dont need to Convert B to BigInt because B value is reducing by B / 2 in every call.

1 % Number(C) => Here 1 is Number and C is BigInt. Cannot perform direct operation, so converted C to number first.

let p1 = BigInt(p) * BigInt(p); => powerFun finally returning a number so here need to convert again result into BigInt value.

Once all done, then return result as Number.

*/


console.log(mainPowerFun(0, 0, 1)) // 0
console.log(mainPowerFun(2, 3, 3)) //2
console.log(mainPowerFun(-1, 1, 20)) // 19
// console.log(mainPowerFun(2, 1000, 100))
console.log(mainPowerFun(71045970, 41535484, 64735492)) // 20805472
console.log(mainPowerFun(67790475, 13522204, 98794224)) // 38615985


//! Reverse an array using recursion with SC - O(1)

function reverseArray(A) {

    function reverse(A, s, e) {
        if (s >= e) {
            return A;
        }
        [A[s], A[e]] = [A[e], A[s]]; // swap
        return reverse(A, s + 1, e - 1);

    }
    console.log(reverse(A, 0, A.length - 1))

}
reverseArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])


//! Print reverse string using recursion

/*
Write a recursive function that, given a string S, prints the characters of S in reverse order.

Input:
 scaleracademy

Output: ymedacarelacs

*/

//! TLE Error - need to optimize this
function reverseString(A) {
    let ans = '';
    function reverse(A, e) {
        if (e < 0) {
            console.log(ans);
            return;
        }
        ans = ans + A.charAt(e);
        return reverse(A, e - 1);
    }
    reverse(A, A.length - 1);
}
reverseString('scaleracademy') // ymedacarelacs


//!  Sum of Digits!

/*
Given a number A, we need to find the sum of its digits using recursion.

Input: A = 46 output: 10
*/
console.log('sum of digits.');
function mainSumDigit(A) {
    A = (A).toString();
    let sum = 0;
    function sumDigit(A, s, e) {
        if (s > e) {
            return sum;
        }
        if (s == e) {
            sum += Number(A[s]);
            return sum;
        }
        sum += Number(A[s]) + Number(A[e]);
        return sumDigit(A, s + 1, e - 1);
    }
    console.log(sumDigit(A, 0, (A).length - 1))

}
mainSumDigit(1234567);
mainSumDigit(46);
mainSumDigit(4);


//! Output of below program?

function output(x, n) {
    if (n == 0) {
        return 1;
    }
    else if (n % 2 == 0) {
        return output(x * x, n / 2);
    } else {
        return x * output(x * x, (n - 1) / 2);
    }
}
console.log(output(2, 10)) //1024


//! print n to 1

function solve(n) {
    if (n == 0) {
        return;
    }
    console.log(n);
    solve(n - 1);
}
solve(10); // 10 9 8....1

//! print 1 to n

function solve(n) {
    if (n == 0) {
        return;
    }
    solve(n - 1);
    console.log(n);
}
solve(10); // 1 2 3 4...10



//! Recurison relationship

//@ Lets generate Time complexity recursion formula for Sum of n natural number based on TC of subproblems

function sum(n) {
    if (n == 1) {
        return 1;
    }
    return n + sum(n - 1);
}

// T(n) = T(n - 1) + O(1)

// @ Write TC recursive formula of below program

function program1(n) {
    if (n <= 1) {
        return;
    }
    program1(n / 2);
    for (let i = 0; i < n; i++) {
        console.log(i);
    }
    program1(n / 2);
}

// T(n) = 2 * T(n/2) + O(n)  -- we have two subproblems so multiplied by 2 and one for loop.


//! Master theorem

// https://www.scaler.com/topics/data-structures/masters-theorem/

/*
Master's Theorem is the best method to quickly find the algorithm's time complexity from its
recurrence relation.

We can apply Master's Theorem for:

@ Dividing functions
@ Decreasing Functions


! Master's Method for Dividing Functions

* T(n) = a * T(n / b) + O(n^d)

where

n = input size (or the size of the problem)
a = number of subprobems
n/b = size of each subproblem (Assuming size of each subproblem is same)
O(n^d) = cost of breaking down origional problem

? Examples-

T(n) = 2 T(n / 2) + n^2

T(n) = T(n / 4) + nlogn

? where the constants a, b, and k are constants and follow the following conditions:

a >= 1
b > 1
d >= 0

? Master's Theorem states that:

* Case 1 : a > b^d  => TC = O(n log a base b)

* Case 2 : a = b^d  => TC = O( n^d log n base b )

* Case 3 : a < b^d  => TC = O(n^d)

! Master's Theorem for Decreasing Functions

T(n) = a * T(n - b) + O(n^d)

? Examples-

T(n) = T(n - 2) + 1;
T(n) = 2 * T(n - 1) + n^2;

Here a, b, and d are constants that satisfy the following conditions:

a > 0, b > 0, d >= 0

* Case 1 : a > 1  => TC = O(n^(n/b) * f(n))

* Case 2 : a = 1  => TC = O( n^d log n base b )

* Case 3 : a < 1  => TC = O(n^d)

 */

