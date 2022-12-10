
/*
! What is ASCII?

ASCII is a standard data-encoding format for electronic communication between computers.
ASCII assigns standard numeric values to letters, numerals, punctuation marks, and
other characters used in computers.

! What is the purpose of ASCII codes?


Computer doesn't understand English or Hindi or any language. But computer do understand only 0 and 1.
0 means False & 1 means true.
So every chars have a ascii code, that further covert to binary number (0, 1 format) and that Computer use for processing.

! What happens When we press a number key?

If you press 4 from keyboard, then keyboard send the value 100 (binary format of 4) to the main memory which will further be evaluated in secondary memory and then the output will be 4 in monitor.

! What happens when we press a char key?

Similarly if you press "a", the ASCII value will be 097 which is equivalent to 01100001 that is processed by Computer memory.

/


*/


//@ NOTE- ASCII Code is of Single character only.

//? Like - code of a, code of z, code of 'A', code of '1', code of '9'
//? Not Of - code of 'ab', code of '12', code of '100'

// '1'  - this is string & 1 - this is number.

//! NOTE- Numbers dont have ASCII value, only Characters have ASCII value.


function asciiValuesOfCapsChar() {
    console.log('ascii Values Of Capital Letters:');
    let ans = '';
    let alphabets = 'ABCDEFGHIJKLMNOPQUERSTUVWXYZ';
    for (let i = 0; i < alphabets.length; i++) {
        //console.log(alphabets[i], alphabets.charCodeAt(i));
        ans = ans + alphabets[i] + ' ' + alphabets.charCodeAt(i) + ', ';
    }
    console.log(ans)
}
asciiValuesOfCapsChar()


function asciiValuesOfSmallChar() {
    console.log('ascii Values Of Small Letters:');
    let alphabets = 'abcdefghijklmnopquerstuvwxyz';
    let ans = '';
    for (let i = 0; i < alphabets.length; i++) {
        //console.log(alphabets[i], alphabets.charCodeAt(i));
        ans = ans + alphabets[i] + ' ' + alphabets.charCodeAt(i) + ', ';
    }
    console.log(ans)
}
asciiValuesOfSmallChar();


//* 'a', 'b', 'E', 'Z'.....

function findAsciiOfChar() {
    console.log('findAsciiOfChar :');
    console.log('z', 'z'.charCodeAt())
    console.log("a", 'a'.charCodeAt())
    console.log('1', '1'.charCodeAt())
}
findAsciiOfChar();


//* '0', '1', '2'.....'9'

function asciiCodeOfNumberChars() {
    console.log('asciiCodeOfNumberChars :');
    let ans = '';
    for (let i = 0; i < 10; i++) {
        //console.log(i, i.toString().charCodeAt())
        ans = `${ans} '${i}' ${i.toString().charCodeAt()}, `;
        //ans = ans +  + ' ' + i.toString().charCodeAt() + ', ';
    }
    console.log(ans)
}
asciiCodeOfNumberChars();


//! Difference is from 'A' to 'a' is 32. Means every Capital Letter and Small Letter have differene of 32.

console.log('Diff between A and a', 'A'.charCodeAt(), 'a'.charCodeAt(), 'A'.charCodeAt() - 'a'.charCodeAt());

// z = 122 & Z = 90

//! How to represent character into binary?

/* char ch = '9';

ASCII Code of '9' = 57

Char takes 1 Byte means 8 bits. So binary representaiton of '9' is 00111001 */


/*

* Lets join two chars.

We have to calcualte: '9' + 8

As '9' is a char, so we have to take care of its ascii value. ASCII Code of '9' = 57

= 57 + 8 = 65

 */


//! What is string?

//? String is array of charecters.


//! Toggle every char of string, Cap to small and small to caps Without using any lowercase or uppercase method.

function toggleStringUsingAsciiRange(str) {
    console.log('toggleString :', str);
    let ans = '';
    for (let i = 0; i < str.length; i++) {
        let code = str[i].charCodeAt();

        // If char in range of Captial Letter's ascii values.
        if (code >= 65 && code <= 90) { // A = 65 & Z = 90
            code += 32; // convert to small
        } else {
            code -= 32; // convert to capital
        }
        // Will not work like this: str[i] = String.fromCharCode(code); Because string is primitive data type.
        ans += String.fromCharCode(code)
    }
    console.log(ans);
    return ans;
}
toggleStringUsingAsciiRange('MOHITSaxenA');



//! Toggle string without using Range approach.

/*

* Approach- * 8 bit representation of Character
             32                          32
A = 65 = 0 1 0 0 0 0 0 1    a = 97 = 0 1 1 0 0 0 0 1
B = 66 = 0 1 0 0 0 0 1 0    b = 98 = 0 1 1 0 0 0 1 0
C = 67 = 0 1 0 0 0 0 1 1    c = 99 = 0 1 1 0 0 0 1 1
...
..
Z = 90 = 0 1 0 1 1 0 1 0   z = 122 = 0 1 1 1 1 0 1 0

? Observation-

1. All bits of Capital Letter and Small Letter have same bit at their respective position instead of 2^5 (32) position.
2. In Capital letter 2^5 position have 0.
3. In Small letter 2^5 position have 1.
4. So If we have to convert Capital to Small or viceversa then we have to toggle 2^5 bit.
5. Capital to Small > 0 to 1
6. Small to Capital > 1 to 0

* Toggle we can easily obtain by XOR opeartion with 1.

1 ^ 1 = 0       0 ^ 1 = 0
11 ^ 11 = 00    00 ^ 11 = 00

* And we have to toggle 2^5 bit position so we will do XOR with 10000

*/

function toggleStringUsingXOR(str) {
    console.log('toggleStringUsingXOR :', str);
    let ans = '';
    for (let i = 0; i < str.length; i++) {
        let code = str[i].charCodeAt();
        ans += String.fromCharCode(code ^ 32); // Or we can write same: code ^ (1 << 5)
    }
    console.log(ans);

}
toggleStringUsingXOR('ABCDabcd')


//! Given char array, contains lowercase alphabets. Return sorted array.

// used inbuilt method
function sortedChar(A) {
    console.log('sortedChar :', A);
    A.sort((a, b) => a < b ? -1 : 1);
    console.log(A);

}
// TC - O( nlog(n) )
sortedChar(['d', 'b', 'd', 'c', 'a']);



//! Comparator in JavaScript

/*
* Comparing a < b

1. If you want a to come before b, return -1.
2. If you want a and b both have same rank, return 0
3. If you want b to come before a, return 1

*/



/*
* O(n) solution-


1. As we know that small letters are 26. So in given input, letters will be from these 26 only.
2. First we will compute frequency of each char.
3. Store that frequency in a defiend 26 length array.
4. We have to store a at 0, b at 1, c at 2....., z = 25;
5. To Get Index -
    We know char code of a = 97  (0)
                         b = 98  (b - a) = 98 - 97 = 1
                         c = 99  (c - a) = 99 - 97 = 2
6. Now loop over frequency array.
7. We have to return char based on frequency.
8. Final output -
    If at Index 0, freq  is 3, it means char 'a' is 3 times.
    If at Index 1, freq  is 2, it means char 'b' is 2 times.
    If at Index 2, freq  is 1, it means char 'c' is 1 times.
    ...
    ...
7. How will we know that index 0 is 'a' and index 1 is 'b'.........
8. To get again char by index value -
    index 0 - add charCodeOf a that is 97 = 0 + 97 = 97 (a)
    index 1 -> add 97 -> 1 + 97 = 98 (b)
    index 2 -> add 97 -> 2 + 97 = 99 (c)
    ..
    ..

*/
function sortedCharOptimizedWay(A) {
    console.log('sortedCharOptimizedWay :', A);
    let arr = new Array(26).fill(0); // create fixed length array
    let aCode = 'a'.charCodeAt(); // 97

    for (let i = 0; i < A.length; i++) {
        let code = A[i].charCodeAt();
        arr[code - aCode] += 1;
    }

    let k = 0;
    for (let i = 0; i < arr.length; i++) {
        let j = 0;
        while (j < arr[i]) { // loop over frequency
            A[k] = String.fromCharCode(i + aCode);
            j++;
            k++;
        }
    }
    console.log(A)


}
// TC  = O(n)
sortedCharOptimizedWay(['d', 'b', 'd', 'c', 'a']);


//! Return uppercase array

function toUpper(A) {
    console.log('toUpper :', A);
    for (let i = 0; i < A.length; i++) {
        let code = A[i].charCodeAt();
        if (code >= 97 && code <= 122) { // char code of a = 97  and z = 122.
            code -= 32; // capital letters have -32 char code from upper case letter.
        }
        A[i] = String.fromCharCode(code);
    }
    console.log(A)
    return A;
}

toUpper(['Z', '*', 'z', ':', 'a', 'A']); // ['Z', '*', 'Z', ':', 'A', 'A']



//! Substring

function substring(str) {
    console.log('substring :', str);
    let ans = [];
    for (let i = 0; i < str.length; i++) {
        ans.push(str[i]);
        let temp = str[i];
        for (let j = i + 1; j < str.length; j++) {
            temp += str[j];
            ans.push(temp);
        }
    }
    console.log(ans);

}
// O(n^2)
substring('abcd');


//! Palindrome

//? use of two pointer technique.

function isPalindrome(str) {
    console.log('isPalindrome :', str);
    let i = 0;
    let j = str.length - 1;
    while (i < j) {
        if (str[i] != str[j]) {
            return false;
        }
        i++;
        j--;
    }
    return true;
}
console.log(isPalindrome('madam'))
console.log(isPalindrome('abcdcba'))
console.log(isPalindrome('abba'))


//! Given a string, return true if any substring of minimum two length is palindrome else return false.

//? one length of string is always a palindrome.

// str = 'mydadiscool;'  output - true because dad substring is palindrome.

function substringPalindrome(str) {
    console.log('substringPalindrome :', str);
    for (let i = 0; i < str.length; i++) {
        let temp = str[i];
        for (let j = i + 1; j < str.length; j++) {
            temp += str[j];
            let s = 0;
            let e = temp.length - 1;
            while (s < e) {
                if (temp[s] != temp[e]) {
                    break;
                }
                s++;
                e--;
            }
            if (s == e) {
                return true; // means a substring is palindrome
            }
        }
    }
    return false;
}
console.log(substringPalindrome('mydadiscool'))
console.log(substringPalindrome('myxyzzyxiscool'))



//! Return all palindrome substrings

function palindromeSubstrings(str) {
    console.log('palindromeSubstrings :', str);
    let ans = [];
    for (let i = 0; i < str.length; i++) {
        let temp = str[i];
        for (let j = i + 1; j < str.length; j++) {
            temp += str[j];
            let s = 0;
            let e = temp.length - 1;
            while (s < e) {
                if (temp[s] != temp[e]) {
                    break;
                }
                s++;
                e--;
            }
            if (s == e || s > e) { // s == e : if substring is odd length and s > e for even length of substring.
                ans.push(temp);
            }
        }
    }
    return ans;
}
console.log(palindromeSubstrings('xbdyzzydbdyzydx'));
console.log(palindromeSubstrings('abbada'));

//! Given a string, return length of longest substring palindrome.


/*
Input = abacab

palindrome substring = aba, bacab, aca
Longest substring length = 5
 */

//@ Idea 1 - Use the above same substringPalindrome() approach and calculate max length of palindrome substring.

//@ Lets Implement Idea 2

/*
* Approach

1. Take every char as a center and move left and right. Check and compare left and right characters.
2. If left and right characters are same, move one more step.
3. Continue step 2 until left and right are not equal or reach to start or end.
*/


function longestPalindromeLength(str) {
    console.log('longestPalindromeLength :', str);
    let ans = 0;

    // This loop will check only for Odd number substring
    for (let i = 0; i < str.length; i++) {
        let l = i - 1;
        let r = i + 1;
        while (l >= 0 && r < str.length) {
            if (str[l] != str[r]) {
                break;
            }
            l--;
            r++;
        }
        let len = (r - 1) - (l + 1) + 1; // take the previous value of r and l.
        if (len > ans) {
            ans = len;
        }
    }

    /*   This loop will check even number of substring
      Assume two chars as a middle and then traverse left and right.
      So start from index 1.
      For index 1 - index 0 & 1 assume two char as middle.
      For index 2 - index 1 & 2 assume two char as middle.
      thats why l will be: i-2;
      If Middle two chars are not same then no need to continue inner while loop.
      */
    for (let i = 1; i < str.length; i++) {
        let l = i - 2;
        let r = i + 1;
        if (str[i] != str[i - 1]) {
            continue;
        }
        while (l >= 0 && r < str.length) {
            if (str[l] != str[r]) {
                break;
            }
            l--;
            r++;
        }
        let len = (r - 1) - (l + 1) + 1;
        if (len > ans) {
            ans = len;
        }
    }
    return ans;
}
console.log(longestPalindromeLength('abbada'))
console.log(longestPalindromeLength('xbdyzzydbdyzydx'))
console.log(longestPalindromeLength('aaaabaaa'))


//! Longest Palindrome

// TC - O(n^3)
//@ This give error of 'Time Limit exceeded'
function longestPalindrome1(str) {
    console.log('longestPalindrome :', str);
    let ans = '';
    for (let i = 0; i < str.length; i++) {
        let temp = str[i];
        if (temp.length > ans.length) {
            ans = temp;
        }
        for (let j = i + 1; j < str.length; j++) {
            temp += str[j];
            let s = 0;
            let e = temp.length - 1;
            while (s < e) {
                if (temp[s] != temp[e]) {
                    break;
                }
                s++;
                e--;
            }
            if (s == e || s > e) {
                if (temp.length > ans.length) {
                    ans = temp;
                }

            }
        }
    }
    return ans;
}

// TC - O(n^2) , SC - O(n)
//@ This gives error 'Memory Limit Exceeded' when run on Online editor platform
function longestPalindrome2(str) {
    console.log('longestPalindrome :', str);
    let ans = '';
    let subs = [];
    for (let i = 0; i < str.length; i++) {
        let temp = str[i];
        subs.push(temp);
        for (let j = i + 1; j < str.length; j++) {
            temp += str[j];
            subs.push(temp);
        }
    }
    for (let i = 0; i < subs.length; i++) {
        let s = 0;
        let el = subs[i];
        let e = el.length - 1;
        while (s < e) {
            if (el[s] != el[e]) {
                break;
            }
            s++;
            e--;
        }
        if (s == e || s > e) {
            if (el.length > ans.length) {
                ans = el;
            }

        }

    }
    return ans;
}
console.log(longestPalindrome2('abbada'))
console.log(longestPalindrome2('ac'))
console.log(longestPalindrome2('a'))
let bigStr = "abcdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab";
//console.log(longestPalindrome(bigStr))



//@ Optimized way with O(n^2)

function longestPalindrome3(str) {
    console.log('longestPalindrome3 :');
    let ans = '';
    for (let i = 0; i < str.length; i++) {
        let l = i - 1;
        let r = i + 1;
        let leftStr = '';
        let rightStr = '';
        while (l >= 0 && r < str.length) {
            if (str[l] != str[r]) {
                break;
            }
            leftStr = str[l] + leftStr;
            rightStr += str[r];
            l--;
            r++;
        }
        // In case left and right str is blank, it means there is single char str(i) and that is always a palidrome.
        let pal = leftStr + str[i] + rightStr;
        if (pal.length > ans.length) {
            ans = pal;
        }
    }

    // Taking two chars as middle.
    for (let i = 1; i < str.length; i++) {
        let l = i - 2;
        let r = i + 1;
        let leftStr = '';
        let rightStr = '';

        // If two chars are not same then no need to proceed further while code.
        if (str[i] != str[i - 1]) {
            continue;
        }
        while (l >= 0 && r < str.length) {
            if (str[l] != str[r]) {
                break;
            }
            leftStr = str[l] + leftStr;
            rightStr += str[r];
            l--;
            r++;
        }
        // If left and right str is blank, it means there are two chars only so we have to check for that.
        // If those two chars are same then only considered as palindrome.
        let pal = leftStr + str[i - 1] + str[i] + rightStr;
        if (pal.length > ans.length) {
            ans = pal;
        }
    }
    console.log(ans);
    return ans;
}
longestPalindrome3('abb');
longestPalindrome3('abbccbb');
longestPalindrome3('aaaabaaa');
longestPalindrome3(bigStr)


//!  Simple Reverse

/*
Given a string A, you are asked to reverse the string and return the reversed string.

 A = "academy"
 output- "ymedaca"
*/

function reverseSimple(str) {
    console.log('reverseSimple :', str);
    let i = str.length - 1;
    let ans = '';
    while (i >= 0) {
        ans += str[i];
        i--;
    }
    console.log(ans);
}
reverseSimple('academy')
reverseSimple('My Name is Mohit');


//!  Reverse the String


/*
You are given a string A of size N.
Return the string A after reversing the string word by word.

"the sky is blue" // output -  "blue is sky the"
*/

function reverseString(str) {
    let arr = str.split(' ');
    let i = arr.length - 1;
    let ans = [];
    while (i >= 0) {
        ans.push(arr[i]);
        i--;
    }
    return ans.join(' ');
}

console.log(reverseString('the sky is blue'))


//@ TC - O(n)
function reverseString1(str) {
    let ans = '';
    let temp = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i] != ' ') {
            temp += str[i];
        }
        // when char is space, append temp with ans.
        // Ignore multiple spaces arround words
        if (str[i] == ' ' && str[i - 1] != ' ') {
            ans = ' ' + temp + ans;
            temp = '';
        }
        // when we reach last index.
        if (i == str.length - 1) {
            ans = temp + ans;
        }
    }
    return ans;
}
console.log(reverseString1('My   name is   mohit')) //mohit is name My
console.log(reverseString1('the sky     is blue')) //blue is sky the