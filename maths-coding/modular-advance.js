/*

* A % B => Mod value will always be in 0 to B-1

10 % 3 = 1
100 % 3 = 1
10 % 7 = 3
20 % 7 = 6

@ Repeated Subtraction Approach to calculate MOD value.

? 10 % 3 = 10 - 3 = 7 - 3 = 4 - 3 = 1 (we can stop subtraction now because, answer is in o to 3 range)

@ Some Properties-

* X % 1 = 0 , X % X = 0, X % Y = X (If X < Y)

* -X % Y => (X % Y + Y) % Y (Here we add Y again into the result)  :: MOdular value never be negative number.

* (a / b) % m = (a % m * b^-1 % m ) % m; :: Here b^-1 is called Inverse Mod of b w.r.t m.

? Lets undertand Inverse

a / b = a * b^-1

(a / b) % m = (a * b^-1) % m -- If we have Mod value m

If a = b; then

b / b % m = b * b^-1 % m

1 = b * b^-1 % m

* It tells that If we multiply a to the b, then take Mod m & result is 1. Then that a is called Inverse value. In this example  b^-1 is Inverse value.

? Lets take an example if Inverse value

@ 5^-1 % 7 ?

As per above explanation, If we apply 5 into this, the result will be 1.

5 * 5^-1 % 7 = 1

5 * 1 % 7 = 5
5 * 2 % 7 = 3
5 * 3 % 7 = 1

Here we can see that If we multiply 5 by 3 and Mod by 7 then result is 1 so 3 is called Inverse value for this question.

5^-1 % 7 = 3

@ 3^-1 % 13 ? ==> (3 * X) % 13 = 1 :: So we have to find value of X.

3 * 1 % 13 = 3
3 * 2 % 13 = 6
3 * 3 % 13 = 9
3 * 4 % 13 = 12
3 * 5 % 13 = 2
3 * 6 % 13 = 5
3 * 7 % 13 = 8
3 * 8 % 13 = 11
3 * 9 % 13 = 1

So ans is 9 => 3^-1 % 13 = 9.

* Time Complexity of Finding value of X^-1 % M with above approach is O(M).

*/

//! Fermat Theorem

/*

* a^(p-1) % p ≅ 1 % p     :: Where p is a prime number.

a^(p-1) % p = 1 % p = 1
a^(p-1) * a^-1 % p = 1 * a^-1 % p  :: Multiply a^-1 into both sides.
a^(p-2) % p = a^-1 % p

@ Fermat Formula to calculate minus (-) power is => a^-1 % p => a^(p-2) % p

@ a^b % p => a^(p-1) % p = 1       :: Where p is prime.

! 3^1002 % 11 ?

As 11 is prime number so
3^(11 - 1) % 11 = 1
3^10 % 11 = 1

3^1002 % 11 = (3^10 * 3^10 * ....... * 3^10 * 3^2) % 11
            = 3^10 % 11 * 3^10 % 11 * 3^10 % 11 * ....... * 3^2 % 11
            = 1 * 1 * 1 * 1..........* 9 % 11
            = 9

! 3^963 % 11 ?

3^963 % 11
11 is prime number so: 3^10 % 11 = 1
Here we will conver 963 to the multiple of 10.

3^963 % 11 = 3^900 % 11 * 3^63 % 11
           = (3^10 * 3^10 * 3^10....till 90 times) % 11 * 3^60 % 11 * 3^3 % 11
           = 1 * 1 * 27 % 11
           = 5
*/

//!  Very Large Power

// https://www.scaler.com/academy/mentee-dashboard/class/47637/assignment/problems/1072?navref=cl_tt_lst_nm

/*
Given two Integers A, B. You have to calculate (A ^ (B!)) % (1e9 + 7).

"^" means power,

"%" means "mod", and

"!" means factorial.
 */

/*
@ Approach to solve big power umbers

? Let's break power into small power by dividing 2 every time.

Even Power case: 2^4 = (2^2)^2 = 4^2 = 4 * 4 = 16.

Odd Power case:  2^5 =  2 * (2^2)^2 = 2 * 4^2 = 2 * 4 * 4 = 32.

Odd Power case:  2^7 = 2 * (2^2)^3 = 2 * 4^3 = 2 * (4 * 4^2) = 2 * 4 * 4 * 4 = 128.


? By above we can generate a formula to calculate a^b.

* If b is Even number => (a^2)^(b/2)

* If b is Odd number => a * (a^2)^(b/2)

? If you are given a modular value m & have to find a^b % m.

* If b is Even number => (a^2 % m)^(b/2) % m

* If b is Odd number => a * (a^2 % m)^(b/2) % m

? Time Complexity of this - O(log(b))

*/

//! Fast Power algorithm to calculate a^b % m

// O(log(B))
function fastPower(A, B, C) {
    if (B == 0) {
        return 1;
    }
    if (B % 2 == 0) {
        return fastPower((A * A) % C, Math.floor(B / 2), C) % C;
    } else {
        return (A * fastPower((A * A) % C, Math.floor(B / 2), C)) % C;
    }
}
console.log('Fast Power');
console.log(fastPower(2, 5, 1e9 + 7));
console.log(fastPower(2, 10, 1e9 + 7));
console.log(fastPower(2, 100, 1e9 + 7));
console.log(fastPower(2, 329, 1e9 + 7));

//@ Fast Power Refactor above code

function fastPowerOptimized(A, B, C) {
    if (B == 0) {
        return 1;
    }
    const fun = fastPower((A * A) % C, Math.floor(B / 2), C) % C;
    if (B % 2 == 0) {
        return fun;
    } else {
        return (A * fun) % C; // We are multipling by A here so taking MOD C again.
    }
}
console.log('Fast Power Optimized');
console.log(fastPowerOptimized(2, 5, 1e9 + 7));
console.log(fastPowerOptimized(2, 10, 1e9 + 7));
console.log(fastPowerOptimized(10, 1, 3));
console.log(fastPowerOptimized(3, 963, 11));

//@ Now solve given problem of very large number A ^ (B!) % C

// TODO: not working for large value, need assistant on this.
function getLargePower(A, B) {
    console.log('getLargePower :', A, B);
    let C = 1e9 + 7;
    function fact(B) {
        if (B == 1) {
            return 1;
        }
        return B * fact(B - 1);
    }
    const F = fact(B) % C;
    console.log('F :', F);
    return fastPower(A, F, C);
}
console.log(getLargePower(2, 27)); //666348826




//!  Prime Modulo Inverse - Based on Fermat theorem.

/*
Given two integers A and B. Find the value of A^-1 mod B where B is a prime number and gcd(A, B) = 1.
A^-1 mod B is also known as modular multiplicative inverse of A under modulo B.

1 <= A <= 10^9
1<= B <= 10^9
B is a prime number
*/

//?  // A^-1 % B == A^B-2 % B (B is prime number) - Fermat theory
// Note: Range is given till 10^9, so used BigInt here.

function primeModuloInverse(A, B) {
    console.log('primeModuloInverse :', A, B);
    function fastPower(A, B, C) {
        if (Number(B) == 0) {
            return 1;
        }
        const fun = BigInt(fastPower((A * A) % C, BigInt(Math.floor(Number(B) / 2)), C)) % C;
        if (Number(B) % 2 == 0) {
            return fun;
        } else {
            return (A * fun) % C;
        }
    }
    return Number(fastPower(BigInt(A), BigInt(B - 2), BigInt(B)));
}

console.log(primeModuloInverse(10, 3)); //1
console.log(primeModuloInverse(1525, 999996223)); //451145837



//! Pair Sum divisible by M

/*
Given an array of integers A and an integer B, find and return the number of pairs in A whose sum is divisible by B.
Since the answer may be large, return the answer modulo (109 + 7).

1 <= length of the array <= 100000
1 <= A[i] <= 10^9
1 <= B <= 10^6

A = [5, 17, 100, 11]
B = 28
output: 1 (17, 11)

*/

//? ( A[i] + A[j] ) % m = ( A[i] % m + A[j] % m ) % m;

/*
    @ Approach-

* Arr =  [2, 7, 5, 10, 4, 6, 8, 11],  AND Mod = 5

Crete a hashMap

2 % 5 = 2
7 % 5 = 2
5 % 5 = 0
10 % 5 = 0
4 % 5 = 4
6 % 5 = 1
8 % 5 = 3
11 % 5 = 1

? Map based on these remainders (Remainder is key and element is its value)

2 : [2, 7],
0 : [5, 10],
4 : [4],
1 : [6, 11],
3 : [8]

2 & 3 will be clubbed because 2 + 3 = 5 (which is Mod value)
4 & 1 will be clubbed because 4 + 1 = 5 (which is Mod value)
0 elements itself clubbed because 0 + 5 = 5.

If Remainder is 0, it means member of this group could be clubbed eachother and create pair.
And If there are n elements then count will be n * (n-1) / 2;
If Remainder and (Mod - Remainder) is same, it also means members of this group can make pairs.

Here ans is =>

Count = Map[2].length * Map[3].length + Map[4].length * Map[1].length + Map[0].length * (Map[0].length - 1) / 2;

* Arr = [1, 2, 3, 4, 5] AND Mod = 2

1 : [1, 3, 5]
0 : [2, 4]

0 Remainder elements will be clubbed eachother so here count is 1.
1 Remainder and Mod - Remainder => 2 - 1 = 1, so these element will also be clubbed, so here count is 3.

*/

function findPairSum(A, B) {
    console.log('findPairSum :', A, B);
    const map = new Map();
    // create a map where key will be remainder of elements and value will be array type that contains elements.
    for (let i = 0; i < A.length; i++) {
        const mod = A[i] % B;
        if (map.has(mod)) {
            const obj = map.get(mod);
            obj.push(A[i])
            map.set(mod, obj);
        } else {
            map.set(mod, [A[i]]);
        }
    }
    //console.log(map)
    let count = 0;
    for (const [key, value] of map) {
        let len = value.length;
        let clubWithKey = (B - key);

        /*
            If Remainder is 0, it means member of this group could be clubbed eachother and create pair.
            And If there are n elements then count will be n * (n-1) / 2;
            If Remainder and (Mod - Remainder) is same, it also means members of this group can make pairs.
        */
        if (key == 0 || clubWithKey == key) {
            count += len * (len - 1) / 2;
        } else {
            if (clubWithKey != key && map.has(clubWithKey)) {
                count += len * map.get(clubWithKey).length;
                map.delete(clubWithKey) // remove key from map when it clubbed with anyone.
            }
        }
    }
    return count % 1e9 + 7;
}
console.log(findPairSum([2, 7, 5, 10, 4, 6, 8, 11], 5)) // 5
console.log(findPairSum([1, 2, 3, 4, 5], 2)) // 4



//!  Trailing Zeros in Factorial

/*
Given an integer A, return the number of trailing zeroes in A! i.e., factorial of A.
Note: Your solution should run in logarithmic time complexity.

Input: A = 6
6! = 720
 Number of trailing zeros = 1. So, return 1.
*/

/*
@ Solution approach

4! = 1 * 2 * 3 * 4 = 24
5! = 1 * 2 * 3 * 4 * 5 = 120
7! = 1 * 2 * 3 * 4 * 5 * 6 * 7 = 5040
10! = 10 × 9 × 8 × 7 × 6 × 5 × 4 × 3 × 2 × 1 = 3,628,800

* Trailing 0 will occurr only if you multiply by 10 to a number.

2 * 10 = 20 (one trailing space)

* 10 have 2 factors and that is 2 * 5, So it means we can count trailing 0 based on MULTIPLES of 5.

4! does not have 5 => so no trailing 0.
5! have one 5 so there is 1 trailing 0.
10! have two 5 so there is 2 trailing 0.


@ What is multiples of X from 1 to N?

X = 3, N  = 10

* We can calculate this by N / X = 10 / 3 = 3

X = 5 , N = 10

N / X = 10 / 5 = 2

x = 5, N = 100

N / X = 100 / 5 = 20


@ Trailing 0 in 30!?

30! = 1 * 2 * 3 * 4 * 5 * ..10 *.. * 15 * .. * 20 * .. * 25..* 30.

# multiples of 5 from 1 to 30 = 30 / 5 = 6

? Let see this-
Number    Factors
    5  = 1 * 5
    10 = 2 * 5
    15 = 3 * 5
    20 = 4 * 5
    25 = 5 * 5
    30 = 6 * 5
_________________

So total 5 in 1 to 30 are => 6

25 is a multiple of 5 so we have to consider number of 25 , 125.. as well.

30 / 25 = 1

* So total trailing 0's in 30! = 6 + 1 = 7

@ Trailing 0's in 300! ?

# multiples of 5 in 1 to 300 = 300 / 5 = 60
# multiples of 25 in 1 to 300 = 300 / 25 = 12
# multiples of 125 in 1 to 300 = 300 / 125 = 2

Total 0's are = 72.

* TC = log(n) base 5 -- Because problem is dividing by 5 each time.

*/

function trailingZeroes(A) {
    console.log('trailingZeroes :', A);
    let ans = 0;
    for (let i = 5; i <= A; i = i * 5) {
        ans += Math.floor(A / i);
    }
    return ans;
}
console.log(trailingZeroes(11));

function solve() {
    const obj = [
        {
            ships: [
                { id: 1, name: '1' },
                { id: 2, name: 'b' },
                { id: 3, name: 'c' },
            ],
            title: 'hello 1',
        },
        {
            ships: [
                { id: 4, name: '1' },
                { id: 5, name: 'b' },
                { id: 6, name: 'c' },
            ],
            title: 'hello 2',
        },
        {
            ships: [
                { id: 7, name: '1' },
                { id: 8, name: 'b' },
                { id: 9, name: 'c' },
            ],
            title: 'hello 3',
        },
    ];
    console.log(obj);
    let ships = [];
    obj.forEach((item) => {
        ships.push(item.ships);
    });
    console.log(ships);
    const value = ships.find((item) => item.id == 7);
    console.log('value :', value);
}
solve();
