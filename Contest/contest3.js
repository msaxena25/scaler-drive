
//? Drive doc link- https://drive.google.com/drive/u/0/folders/1nJoEq-b_aVbYjZ_eds4TvaAzZRWvhRka


//! Contigous Characters problems

/*
Given a string A, tell how many maximum contiguous character C  you can get in a given string? You are allowed to do at most B  number of changes in the string.
A change is defined as changing a character at any index in the given string.


Input : oyorooms
B = 1 & C = 'o'
output : 4

Input: abacus
B = 2;
C = a;
output: 4
*/

/*
@ Explanation-

A =      o y o r o o m s

1. If we replace index 1 (char y) with o. Then index 0 1 2 will make contigous chars 'ooo'. => Max Length = 3
2. If we replace index 3 (char r) with o then index 2 3 4 5 will make contigous chars 'oooo'. => Max Length = 4

So answe is 4.
*/

function getMaxContigousChars(A, B, C) {
    console.log('getMaxContigousChars :', A, B, C);
    let p1 = 0; // pointer 1
    let p2 = 0; // pointer 2
    let maxCount = 0;
    let undesireCharCount = 0;
    for (let i = 0; i < A.length; i++) {
        p2 = i;
        if (A[i] != C) {
            undesireCharCount++;
        }
        if (B == undesireCharCount) {
            let count = p2 - p1 + 1;
            maxCount = Math.max(count, maxCount);
            undesireCharCount = 0;
        }

    }

}


//! Given a binary string in the form of 0 and 1's. how many substrings are there of the given string  which start and end with 1.

/*
 Input
 A = "10001"
 output : 3
 explnation-  The substrings are: "1", "1", "10001".

*/


//! Ball Magician

/*
Given N balls on the X-axis, where i-th ball is on position A[i]. Call a ball an EndPoint Ball if it has the smallest or largest position.
Each turn, you pick up an endpoint ball and move it to an unoccupied position so that it is no longer an EndPoint Ball.
The game ends when you cannot make any more moves, i.e., the balls are in consecutive positions.
When the game ends, what is the min and max number of moves that you could have made?
Output format is [min moves, max moves]

Input A = [1, 3, 5, 7]
Output: [2, 2]

*/


//! Little pony and string period

/*
Rearranage the letters such that period of the string is minimum. A period of string is a prefix that can be used to generate the whole string by repeating the prefix.

A = 'abacbc'
output: 3 // can be rearranged like = abcabc so it means after minimum period 3, string is repeating itself.
*/


//! String queries

/*
Given an array A of N string, a character B and Q queries. Queries is consisting of two integers X and Y.
X =  represents maximum length of substring whose characters occur in consecutive alphabetical order.
Y = represents number of occurence of the given character B in a string.

For each query, you have to find first string which has X as the maximum alphabetical substring length and Y  as the number of occurrences of the given character. If  no string that satify query parameter then return 'NULL'.
*/