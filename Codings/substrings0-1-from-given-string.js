// https://www.scaler.com/academy/mentee-dashboard/class/28426/assignment/problems/4758/?navref=cl_pb_nv_tb

/**
 * Given a string A, A is made up of 0's and 1's. Break A into substrings such that,
 all broken substrings have equal number of 1's and 0's.
Find and return maximum number of substrings in which A can be broken.

Input 1:
    A = "011100"
Output 1:
    2
Explanation 1:
    "01" + "1100"

Input 2:
    A = "00011011"
Output 2:
    1
Explanation 2:
    "00011011"
 */

// NOTE -

// what is exact meaning of substring ?

// A substring is a subset or part of another string,
// or it is a contiguous sequence of characters within a string.

/** Count a char in string if it has only 2 types of chars Like here 0 and 1.

const s = "001101001";
const oneCount = s.replaceAll('0', '').length; OR .replace(/0/g, '').length
// 4
 */

// Not Optimized
// O(n^2)
function solve(A) {
    let subStr = '';
    let count = 0;
    for (let i = 0; i < A.length; i++) { // O(n)
        subStr += A[i];
        if (subStr.replace(/0/g, '').length === subStr.replace(/1/g, '').length) { // O(n)
            count++;
            //console.log(subStr)
            subStr = '';
        }
    }
    return count;
}

//console.log(solve('00011011'))

const str = "10000001101000111111111100000000101100111110110110010000110000110000000100001111000110101000100110000101111010010101101000001100101111001001100011110110000000110000110000010000001100010111000000100110011100101101100010111000110111001000111000111011100111010110001100000000011101100010000110111100011111000010010101110000000010011101001000101100010111110000010110000111011110000110100001010100001010111011011101010000001100100001100111101101110100110010010000001111011010110000011001101100111110000101011111011001010011101110011000100000001010000101001000110011111000110001011001111100110010101101011011001010000101010111000101100000101001000101001110001011011100110111100101011101101000000000100011100001111110010001011101010101110100100111110010000110010011000101000010001100011011111110010100000011001011011011001000111010101001010010011110110101111011010010010010100101000101010100111010111100111110010100110001111110010101001011001000100011110110110001011011101011110010101010111100110101111111000100001001100110000111000011000110001101111000000101001001000010001010111100111110010110001100111010100101010111111101100010010101001011000101000111000100011101011011101011100101010110110011011011101000111110001011011001011011110010000101101110110101101100001101000110010001000010110100111010101010101000011110001000110100100000000010100111000111101000111100000010001110001010001101001010110100110100001111011011011010001001110110010111111110000010101100111110001110001111100001011010011100100100101110110001110001011010110110001000101001111111001010000110110101010001111100101001000111111101110000111101110000000100100010000101110110100100110110010010111110100101011000100000101101011100001011000110110100100101010001101111100011011001101110011100101000000101100111001010111011010010101001111111110011001111011010101101010010011101000110010111010011110000100101110001110110110010110010010010010010100111000001011110100101001001111000000000111111111111111111111111111111111111111111111111111111111111"

console.log(solve(str));

// Second way (Optimized)
// O(n)
function solveOne(A) {
    let strCount = 0;
    let oneCount = 0;
    let zeroCount = 0;
    for (let i = 0; i < A.length; i++) {
        if (A[i] === '0') {
            zeroCount++;
        } else {
            oneCount++;
        }
        if (oneCount === zeroCount) {
            strCount++;
            zeroCount = 0;
            oneCount = 0;
        }
    }
    return strCount;
}

console.log(solveOne(str));

// This is also a way
function solveTwo(A) {
    let strCount = 0;
    let sumCount = 0;
    for (let i = 0; i < A.length; i++) {
        if (A[i] === '0') {
            sumCount++;
        } else {
            sumCount--;
        }
        if (sumCount === 0) { // at this point, number of 0 and 1's are same.
            strCount++;
        }
    }
    return strCount;
}

console.log(solveTwo(str));

// Third way (Optimized)
function solveThree(A) {
    let strCount = 0;
    let oneStr = '';
    let zeroStr = '';
    for (let i = 0; i < A.length; i++) {
        if (A[i] === '0') {
            oneStr += '0';
        } else {
            zeroStr += '1';
        }
        if (oneStr.length === zeroStr.length) {
            strCount++;
            oneStr = 0;
            zeroStr = 0;
        }
    }
    return strCount;
}

console.log(solveThree(str));


// Custom way to Count char in given string
function countChar(str, char) {
    let i = 0;
    let count = 0;
    while (i < str.length) {
        if (str[i] === char) {
            count++;
        }
        i++;
    }
    return count;
}

console.log('countChar 0 in 0000011011', countChar('0000011011', '0'))
console.log('countChar 1 in 000110111111', countChar('000110111111', '1'))