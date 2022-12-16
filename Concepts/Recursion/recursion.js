
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
    if (A <= 1) {
        return A;
    }
    return fab(A - 1) + fab(A - 2);
}
console.log(fab(1));




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