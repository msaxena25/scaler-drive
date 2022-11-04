// https://leetcode.com/problems/prime-number-of-set-bits-in-binary-representation/


/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var countPrimeSetBits = function (left, right) {
    let count = 0;
    const primeMap = {};

    while (left <= right) {
        const leftNumBinary = parseInt(left).toString(2);
        const rightNumBinary = parseInt(right).toString(2);
        const leftSetBits = leftNumBinary.replaceAll('0', '').length; // count 1
        const rightSetBits = rightNumBinary.replaceAll('0', '').length; // count 1

        if (primeMap[leftSetBits]) {
            count++;
        } else if (isPrime(leftSetBits)) {
            primeMap[leftSetBits] = true;
            count++;
        }

        if (left !== right) {
            if (primeMap[rightSetBits]) {
                count++;
            } else if (isPrime(rightSetBits)) {
                primeMap[rightSetBits] = true;
                count++;
            }
        }

        left++;
        right--;
    }
    return count;

};

var isPrime = function (num) {
    if (num < 2) {
        return false;
    }
    const sqrtNum = Math.floor(Math.sqrt(num));
    let prime = true;
    for (let i = 2; i <= sqrtNum; i++) {
        if (num % i === 0) {
            prime = false;
            break;
        }
    }
    return prime;

}


console.log(countPrimeSetBits(6, 10)) //4
console.log(countPrimeSetBits(10, 15)) // 5
console.log(countPrimeSetBits(32, 789)) // 407
console.log(countPrimeSetBits(842, 888)) // 23