/**
What are Factors of any number?
Factors of a number (n) will be those numbers that exactly divide it and give a remainder as 0.
This means that the two whole numbers whose product is given number (n) are the factors of that number.

Composite numbers ?

In Mathematics, composite numbers are numbers that have more than two factors.These numbers are also called composites.
Composite numbers are just the opposite of prime numbers which have only two factors, i.e. 1 and the number itself.
All the natural numbers which are not prime numbers are composite numbers as they can be divided by more than two numbers.
For example, 6 is a composite number because it is divisible by 1, 2, 3 and even by 6.
The smallest composite number is 4.
1 only have one factor that is 1, 2 have two factors that is 1 & 2, 3 also have two factors that is 1 & 3.
4 have three factors that is 1, 2 and 4. So 4 is smallest composite number.

Prime numbers ?

Prime numbers are natural numbers that are divisible by only 1 and the number itself.
In other words, prime numbers are positive integers greater than 1 with exactly two factors, 1 and the number itself.
The first ten primes are 2, 3, 5, 7, 11, 13, 17, 19, 23, 29.
2 is the smallest prime number and is the only even prime number.

NOTE : Always remember that 1 is neither prime nor composite.

Perfect Numbers?

A Perfect Number “n”, is a positive integer which is equal to the sum of its factors, excluding “n” itself.
A Perfect Number N is defined as any positive integer where the sum of its divisors minus the number itself equals the number.
The first few of these are 6, 28, 496, and 8128.
How ? Lets find out factors of 6. These are 1 + 2 + 3 and its sum is 6. This is the smallest Perfect Number.
All the perfect numbers are even numbers.

Formula -
if 2^n - 1 is a prime number, then 2^(n-1)(2^n - 1) is a perfect number.

 */

function printPrimeOrComposite(number) {
    let count = 0;
    for (let index = 1; index * index <= number; index++) {
        if (number % index === 0) {
            if (index === number / index) {
                count++;
            } else {
                count += 2;
            }
        }
        if (count > 2) {
            console.log(number + ' is composite.');
            return;
        }
    }
    console.log(number + ' is prime.');

}

// Math.pow(2, 82589933) - this is Infinity

//printPrimeOrComposite(Math.pow(2, 82589933))
printPrimeOrComposite(Math.pow(2, 82))
// printPrimeOrComposite(5)
// printPrimeOrComposite(6)
printPrimeOrComposite(67)

// Count Factors unoptimized way

function countFactors(n) {
    let count = 0;
    for (let index = 1; index <= n; index++) {
        if (n % index === 0) {
            count++;
        }
    }
    console.log(count)
    return count;
}

//countFactors(5) // 1 5
//countFactors(10) // 1  2 5 10
countFactors(15) // 1 3 5 15



// Brute force method

// Time complexicity = O(n)

function printFactors(n) {
    let factors = '';
    for (let index = 1; index <= n; index++) {
        if (n % index === 0) {
            factors += index + ' ';
        }
    }
    console.log(factors);
    return factors;
}

printFactors(15)
printFactors(150)
printFactors(100)

/**
100 > 1 2 4 5 10 20 25 50 100
100 / 1 = 100
100 / 2 = 50
100 / 4 = 25
100 / 5 = 20
100 / 10 = 10
..
..
..

Means if i is factor of number then n/i is also a factor of that number.
So instead of running loop till n we can run that loop to SQRT(n) and read both
i and n / i numbers.
 */


// Time comp -  SQRT(n)

function printFactorsOptimized(n) {
    let factors = '';
    const sqrtOfN = Math.floor(Math.sqrt(n));
    for (let index = 1; index <= sqrtOfN; index++) {
        if (n % index === 0) {
            factors += index + ' ';
            if (index !== n / index) {
                factors += n / index + ' ';
            }
        }
    }
    console.log(factors);
    return factors;
}

// printFactorsOptimized(100);
//printFactorsOptimized(999);


// Optimized way without SQRT of given number.
// So we will terminate our iteration when i * i > n
// if n is 100 & i is 11 then 11 * 11 = 121 (> 100 , means there is no any factors above i > 10)

function printFactorsOptimized2(n) {
    let factors = '';
    for (let index = 1; index <= n; index++) {
        if (index * index > n) {
            break;
        }
        if (n % index === 0) {
            factors += index + ' ';
            if (index !== n / index) {
                factors += n / index + ' ';
            }
        }
    }
    console.log('printFactorsOptimized2 -', factors);
    return factors;
}

//printFactorsOptimized2(100);
//printFactorsOptimized2(68);

// Count number of factors with optimized way
// Time comp -  SQRT(n)

function countFactorsOptimized(n) {
    let count = 0;
    const sqrtOfN = Math.floor(Math.sqrt(n));
    for (let i = 1; i <= sqrtOfN; i++) {
        if (n % i === 0) {
            if (i === n / i) {
                count++;
            } else {
                count += 2;
            }
        }
    }
    console.log('Factor count of ' + n, count)
    return count;
}

countFactorsOptimized(100)
countFactorsOptimized(97)
countFactorsOptimized(11)


// Find all prime number till given input

// With two for loop

// Time  - O(n * sqrt(i))

function findPrimeNumbers(n) {
    let primeNumber = [];
    for (let i = 2; i <= n; i++) { // n-1 times
        let factorCount = 0;
        for (let j = 1; j * j <= i; j++) { // sqrt(i) times
            if (i % j === 0) {
                factorCount++;
                if (j !== i / j) {
                    factorCount++;
                }
            }
            if (factorCount > 2) {
                break;
            }
        }
        if (factorCount === 2) {
            primeNumber.push(i)
        }
    }
    console.log('prime Numbers from 1 to ' + n, primeNumber);
    return primeNumber;
}

findPrimeNumbers(100);


// prime number with Sieve of Eratosthenes technique

// The solution you have made is enough , the technique Sieve is used in hard problems where you have to use quickly find the prime numbers in certain range whcih is very large.

// https://brilliant.org/wiki/sieve-of-eratosthenes/

function printPrimeNumbersWithSieves(n) {
    const numbers = [];
    for (let i = 2; i <= n; i++) { // get all whole numbers from 2 to till given number
        numbers.push(i);
    }
    let sqrtN = Math.floor(Math.sqrt(n));
    for (let i = 2; i <= sqrtN; i++) { // start from 2
        // checking i exists in number array or not, i start from 2 and numbers indices start from 0 thats why checking for index (i - 2)
        if (numbers[i - 2] == i) {
            for (let j = 1; j < numbers.length; j++) {
                if (numbers[j] % i === 0) {
                    numbers[j] = 0; // if number is divisible then replace it with 0
                }
            }
        }
    }
    const primes = numbers.filter(item => item !== 0)
    console.log(primes);
}

// printPrimeNumbersWithSieves(50);


// find prime number my own way to write logic.
// loop from 2 to given input number.
// find sqrt of given number.
// As we know prime number is a number which only devided by 1 and itself.
// So if that number is devided by any other number till sqrt of number then that is not prime.

function printPrimeNumbersWithThirdWay(n) {
    const numbers = [];
    for (let i = 2; i <= n; i++) { // start from 2 because 1 is not prime.
        let sqrtI = Math.floor(Math.sqrt(i));
        let isPrime = true;
        for (let j = 2; j <= sqrtI; j++) { // every number is devided by 1 so dont need to check that.
            if (i % j === 0) { // // every number is devided by itself so dont need to check that (i !== j).
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            numbers.push(i);
        }

    }
    console.log('printPrimeNumbersWithThirdWay', numbers);

}

printPrimeNumbersWithThirdWay(47)


// Perfect Number program

function isPerfectNumber(number) {
    //const factors = []; // commented this because we dont need to save factors here.
    let sum = 0;
    for (let i = 1; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            // factors.push(i);
            sum += i;
            if (i !== number / i) {
                // factors.push(number / i);
                sum += number / i;
            }
        }
    }
    const output = sum - number === number; // we have to exclude number itself from total sum.
    console.log(output ? number + ' is Perfect Number' : number + ' is not perfect Number');
    return;
}

// print perfect numbers list till given number.
// A Perfect Number N is defined as any positive integer where the sum of its divisors minus the number itself equals the number.

function printPerfectNumbersList(n) {
    const list = [];
    for (let i = 1; i <= n; i++) {
        let sum = 0;
        for (let j = 1; j <= Math.floor(Math.sqrt(i)); j++) {
            if (i % j === 0) {
                sum += j;
                if (j !== i / j) {
                    sum += i / j;
                }
            }
        }
        if (sum - i === i) {
            list.push(i);
        }
    }
    console.log(list);
    return list;
}

printPerfectNumbersList(500);

//  all the perfect numbers are even numbers.
// isPerfectNumber(496);
// isPerfectNumber(28);
// isPerfectNumber(282);
// isPerfectNumber(8128);

// Print all perfect number till given number (n)

/* Will Use formula here -

1. Find Math.pow(2, n) - 1 , here n is a particular number
2. If #1 says it is prime number then continue to step 3
3. Find (Math.pow(2, n-1))(Math.pow(2, n) - 1) & that will be a perfect number.

*/

function printPerfectNumbers(n) {
    const list = [];
    for (let i = 1; i <= n; i++) {
        const a = Math.pow(2, i) - 1;
        // now check a is prime or not
        let factorCount = 0;
        for (let j = 1; j * j <= a; j++) {
            if (a % j === 0) {
                factorCount++;
                if (j !== a / j) {
                    factorCount++;
                }
            }
            if (factorCount > 2) {
                break;
            }
        }

        if (factorCount === 2) {
            const perfectNum = a * Math.pow(2, i - 1);
            if (perfectNum > n) {
                console.log(list);
                return list;
            }
            list.push(perfectNum);
        }
    }
    console.log(list);
    return list;


}

printPerfectNumbers(500); // (3) [6, 28, 496]
printPerfectNumbers(6); // [6]
printPerfectNumbers(5); // []
printPerfectNumbers(1); // []


// Perfect Square number program
// A number is a perfect square if it is obtained by squaring a whole number or an integer.

function isPerfectSquareNumber(number) {
    for (let i = 0; i < number; i++) {
        if (i * i === number) {
            console.log(number + ' is perfect square number');
            return i;
        }
    }
    console.log(number + ' is not perfect square number');
    return -1;
}

isPerfectSquareNumber(25);
isPerfectSquareNumber(121);
isPerfectSquareNumber(122);
isPerfectSquareNumber(1);




// Different ways to write for loop

function someForLoop() {
    for (let i = 0; i < 10;) {
        console.log(i);
        i++;
    }

    for (let i = 0; ; i++) {
        if (i < 10) {
            break;
        }
        console.log(i);
    }

    for (let i = 0; i < 10; i++) {
        console.log(i);
    }

    let i = 0;
    for (; ;) {
        if (i > 10) {
            break;
        }
        i++
        console.log(i);
    }
}