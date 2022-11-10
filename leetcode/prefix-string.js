// https://leetcode.com/problems/check-if-string-is-a-prefix-of-array/description/

/**
 * @param {string} s
 * @param {string[]} words
 * @return {boolean}
 */
var isPrefixString1 = function (s, words) {
    let a = '';
    for (let i = 0; i < words.length; i++) {
        a += words[i];
        const substring = s.substring(0, a.length);
        console.log(a, substring);

        if (substring != a) {
            return false;
        }
        else if (substring === s) {
            return true;
        }

    }
    return false;

};

// Done with indexOf method
var isPrefixString = function (s, words) {
    let a = '';
    for (let i = 0; i < words.length; i++) {
        a += words[i];
        console.log(a, s.indexOf(a))
        if (s.indexOf(a) != 0) {
            return false;
        }
        if (s === a) {
            return true;
        }

    }
    return false;

};

console.log(isPrefixString('iloveleetcode', ["i", "love", "leetcode", "apples"]))

console.log(isPrefixString('iloveleetcode', ["apples", "i", "love", "leetcode", ""]))

console.log(isPrefixString('iloveleetcode', ["love", "leetcode", "i"]))

console.log(isPrefixString('iloveleetcode', ["i", "love"]))