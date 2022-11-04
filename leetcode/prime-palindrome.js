// https://leetcode.com/problems/prime-palindrome/

// /**
//  * @param {number} n
//  * @return {number}
//  */
// var primePalindrome = function (n) {
//     if (n <= 2) {
//         return 2;
//     }
//     let i = n;
//     while (i >= n) {
//         let isPrime = true;
//         const sqrtI = Math.floor(Math.sqrt(i));
//         for (let j = 2; j <= sqrtI; j++) {
//             if(i === 97) {
//                 console.count('for')
//             }
//             if (i % j === 0) {
//                 isPrime = false;
//                 break;
//             }
//         }
//         if (isPrime) {
//             const str = i.toString();
//             if (str.charAt(0) === str.charAt(str.length - 1)) {
//                 console.log(i);
//                 const reverseNumber = +str.split('').reverse().join('');
//                 if (reverseNumber === i) {
//                     return i;
//                 }
//             }
//         }
//         i++;
//     }
// };

// // console.log(primePalindrome(6)); // 7
// // console.log(primePalindrome(1)) // 2
// console.log(primePalindrome(13)) // 101
// // console.log(primePalindrome(0))
// //console.log(primePalindrome(9989900))
// //console.log(primePalindrome(998))


// In the above code, first we are finding prime number and then check for palindrome.
// In the below code, first we are finding palindrome number and then check for prime. This one is better.

/**
 * @param {number} n
 * @return {number}
 */
var primePalindrome = function (n) {
    if (n <= 2) {
        return 2;
    }
    let i = n;
    while (i >= n) {
        console.count('while')
        let isPalindrome = false;
        const str = i.toString();
        if (str.charAt(0) === str.charAt(str.length - 1)) {
            const str = i.toString();
            let reverseStr = '';
            for (let j = str.length - 1; j >= 0; j--) {
                reverseStr += str[j];
            }
            if (str == reverseStr) {
                console.log(str);
            }
        }
        if (isPalindrome) {
            console.log(i);
            let isPrime = true;
            const sqrtI = Math.floor(Math.sqrt(i));
            for (let j = 2; j <= sqrtI; j++) {
                if (i % j === 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
                return i;
            }
        }
        i++;
    }
};

// console.log(primePalindrome(6)); // 7
// console.log(primePalindrome(1)) // 2
//console.log(primePalindrome(13)) // 101
// console.log(primePalindrome(0))
//console.log(primePalindrome(9989900))
//console.log(primePalindrome(9999))


function printPalidrome(n) {
    for (let i = 1; i <= n; i++) {
        // console.count('for');
        const str = i.toString();
        let reverseStr = '';
        for (let j = str.length - 1; j >= 0; j--) {
            reverseStr += str[j];
        }
        if (str == reverseStr) {
            console.log(str);
        }

    }
}

printPalidrome(2000);