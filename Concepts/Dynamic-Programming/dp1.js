
// https://www.scaler.com/topics/data-structures/dynamic-programming/

/*
Dynamic Programming is an approach to solve problems by dividing the main complex problem int smaller parts, and then using these to build up the final solution.
In dynamic programming, we store the results of smaller sub-problems so that we do not need to re-compute the result for the same sub-problem. As we store the results of smaller sub-problems, the idea is to replace the repeated recursive calls with the stored result whenever we encounter an already solved sub-problem.

? Prefix sum technique also works on same idea to use previous result. (But keep in mind that PF is not DP)
> In Prefix sum we use previous result to calculate new result.

Arr     =       [1, 2, 3, 4]
PF      =       [1, 3, 6, 10]

Formula is => PF[i] = PF[i-1] + A[i];

* Recursion is a prerequisite for Dynamic Programming.
* Dynamic programming can reduce the time needed to perform a recursive algorithm.

*/



/*
* To understand Dynamic Programming more clearly, let us look at an example.

! Example of Fibonacci Series

Suppose we want to reconstruct the Fibonacci Series. It is a series, which starts with 0 and 1, and each consecutive term is the sum of the previous two terms in the series.

Fibonacci Series are: 0, 1, 1, 2, 3, 5, 8....

Fib(n) = Fin(n-1) + Fib(n-2);

Below two are base cases-

Fib(0) = 0
Fib(1) = 1
*/

//@ Fibonacci series with Recursion

function fibSeries(n) {
    if (n == 0 || n == 1) {
        return n;
    }
    return fibSeries(n - 1) + fibSeries(n - 2);   //Recursive Call
}

//? Time Complexity is O(2^n) and SC = O(n)

/*
At level 0  => Fib(n)                                       2^0
At level 1  => Fib(n-1)              Fib(n-2)               2^1
At level 2  => Fib(n-2) Fib(n-3)    Fib(n-3) Fib(n-4)       2^2


* We can see here that there are some sub problems which we are solving over and over that we can solve with dp.

Now if we look at the dynamic Programming approach, instead of recomputing these repeating terms again, we will just store them and use the pre-calculated values, making the solution much more efficient.


! Every Recursive problem is not DP problem ??

? There are two things required for DP problem.

1. Answer of current problem can be formed with answers of sub problems.
2. Same sub problems is calculated multiple times.

*/

/*
* Characteristics of Dynamic Programming

Two very important characteristics essential for a Dynamic Programming approach to work are:

Optimal Substructure - Answer of current problem can be formed with answers of sub problems. F(n) = F(n-1) + F(n-2)
Overlapping Sub problems -  Same sub problems is calculated multiple times.
*/

// Top down approach
function fibSeriesWithDP(n) {
    console.log('fibSeriesWithDP :', n);
    let arr = [0, 1]; // initial two values we know that is 0 and 1.
    run(n);
    function run(n) {
        if (n == 0 || n == 1) {
            return n;
        }
        if (arr[n]) { // use existing answer from buffer array
            return arr[n];
        }
        arr[n] = run(n - 1) + run(n - 2);
        return arr[n];
    }
    return arr;
}

// TC = O(n)
// SC = O(n + n) => buffer array + call stack => O(n)

console.log(fibSeriesWithDP(10)) // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]


//! Approaches to Dynamic Programming

/*

There are two types of approach that can be used to solve a problem by Dynamic Programming:

* Memoization or Top-Down Dynamic Programming or Recursive DP
* Tabulation or Bottom Up Dynamic Programming or Iterative DP


! Top-Down

we start from the most complex problem and move to sub problems. So, in this fashion, we keep moving downwards until we reach the base cases. For example, in the Fibonacci series, the base case is for the first and second term, which will be 0 and 1 respectively.
On the way, we keep storing the values of all the sub problems which are computed so they can be reused. This process of storing the values of sub problems is called Memoization.
Above solution was top-down to find Fibonacci series.

! Bottom Up

As the name suggests, to find out the solution to a problem we start from the base cases, moving up towards more complex and larger sub problems until we reach the solution we need to find.
So, in this fashion, we keep moving upwards until we reach the desired state.  On the way, we keep storing the values of all the sub problems in a table sequentially. If needed, these values are accessed directly from the table.

*/

//@ Iterative or bottom up approach - will return Fib series till nth item

function fibSeriesWithBottomUPApproach(n) {
    console.log('fibSeriesWithBottomUPApproach :', n);
    let F = [];
    F[0] = 0;
    F[1] = 1;
    for (let i = 2; i <= n; i++) {
        F[i] = F[i - 1] + F[i - 2];
    }
    return F; // If you want nth item then simply return F[n]
}

console.log(fibSeriesWithBottomUPApproach(5)) // [0, 1, 1, 2, 3, 5]
console.log(fibSeriesWithBottomUPApproach(7)) //[0, 1, 1, 2, 3, 5, 8, 13]

// TC  = O(n) and SC = O(n) :: Sometimes it possible to optimize SC to O(1) in Iterative approach



//! nth item of Fib series in SC = O(1) using three variables

function fibSeriesWithThreeVariables(n) {
    console.log('fibSeriesWithThreeVariables :', n);
    let a = 0;
    let b = 1;
    let c;
    for (let i = 2; i <= n; i++) {
        c = a + b;
        a = b;
        b = c;
    }
    return c;
}

console.log(fibSeriesWithThreeVariables(5)) // 5
console.log(fibSeriesWithThreeVariables(7)) //13 (Fib series: 0 1 1 2 3 5 8 13)




//! Climb Stairs

/*
You are climbing a staircase and it takes A steps to reach the top.
Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
Return the number of distinct ways modulo 1000000007 */

/*
* Understand problem

N = 1
Ans  = 1

N = 2 [A, B] -- Where A and B are stairs name.
- You can go from Ground to A and then A to B.
- You can direct go from Ground to B.
So Ans  = 2

N = 3 [A, B, C]

- One way : Ground -> A -> B -> C
- 2nd way : Ground -> B -> C
- 3nd way : Ground -> A -> C

N = 4 [A, B, C, D]

- One way : Ground -> A -> B -> C -> D
- 2nd way : Ground -> A -> B -> D
- 3rd way : Ground -> A -> C -> D
- 4th way : Ground -> B -> C -> D
- 5th way : Ground -> B -> D

? Stairs = [1, 2, 3, ........, n-3, n-2, n-1, n];

- We can reach to n only from 2 stairs and that are n-2 and n-1;
- Suppose X is number of ways to reach n-2;
- Suppose Y is number of ways to reach n-1;

#ways(N) = #ways(n-1) + #ways(n-2);    => X + Y

@ Little confused how X + Y ?

Reaching on n-2 has X ways and If we take 2 more steps then we can reach to N; So here we are adding steps but way are same and that is X;
Same as n-1. If we take one more step then we can reach to N, So here also way are same and that is Y;
SO total is X + Y;

* Please keep in mind that we have to find number of ways, not number of steps;
Example - If there are 1000 stairs and we are climbing one one stair then it will be only 1 way.

*/


//@ Climb stair with Iterative approach (Bottom Up) :: start with 1 to n (Almost same as Fib series algo)

// TC - O(n) SC - O(n)
function findWaysToClimbStairs(n) {
    console.log('findWaysToClimbStairs :', n);
    let dp = [];
    dp[0] = 1;
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

console.log(findWaysToClimbStairs(2)) //2
console.log(findWaysToClimbStairs(5)) //8

//@ Top down approach OR recursive approach to find ways to climb stairs

// TC - O(n) SC - O(n)
function findWaysToClimbStairsRecursive(n) {
    console.log('findWaysToClimbStairsRecursive :', n);
    let dp = [];
    run(n);
    function run(n) {
        if (n <= 1) {
            return 1;
        }
        if (dp[n]) {
            return dp[n];
        }
        dp[n] = run(n - 1) + run(n - 2);
        return dp[n];
    }
    return dp[n];
}

console.log(findWaysToClimbStairsRecursive(3)) //3




//! Minimum Number of Squares :: Perfect Squares

/*
Given an integer A. Return minimum count of numbers, sum of whose squares is equal to A.

Input A = 6

 Possible combinations are : (1^2 + 1^2 + 1^2 + 1^2 + 1^2 + 1^2) and (1^2 + 1^2 + 2^2).
 Minimum count of numbers, sum of whose squares is 6 is 3.

*/

/*
@ Understand approach-

N = 2   => 1^2 + 1^2  = 2,  min count is 2.
N = 4   => 2^2 ||   (1^2 + 1^2 + 1^2 + 1^2) so min count is 1 because in second way there are 4 counts;

N = 50  => 7^2 + 1^2 OR 5^2 + 5^2  both are possible ways. ans = 2;

N = 12;

? Lets try to find out min count with Greedy approach =>
- Greedy says choose best result at a time.

Nearest perfect square of 12 is 9 => 3^2

12 - 3^2 = 3

Now we have remaining 3. So nearest perfect square of 3 is 1.

3 - 1^2 =  2

Now 2 is remaining. Nearest perfect Square of 2 is again 1.

2 - 1^2 = 1

Now 1 is remaining. Nearest perfect Square of 1 is again 1.

1 - 1^2 = 0.

:: So total count 4.(With above greedy approach)

* While 12 => 2^2 + 2^2 + 2^2 = 12    :: so total count is 3.

So here greedy approach did not give min count. We have to check all possible solutions.

*/

// Bottom-up approach OR Iterative approach

//? ProblemImagesView\min-number-of-square-problem.jpg

// TC - O(n√n) and SC - O(n)
function minNumOfSquares(n) {
    console.log('minNumOfSquares :', n);
    let dp = [];
    dp[0] = 0; // why because minimum count of perfect square will be 0
    // Its a bottom up approach so start from 1 to N
    for (let i = 1; i <= n; i++) {
        dp[i] = Number.MAX_SAFE_INTEGER; // We have to find min value so initially initialize with max
        for (let j = 1; j * j <= i; j++) {
            // Now check each value from 1 to i that could be perfect square
            const remainingI = i - (j * j); // after decreasing j * j from i
            dp[i] = Math.min(dp[i], dp[remainingI] + 1);
        }
    }
    return dp[n];
}

console.log(minNumOfSquares(6)) //2
console.log(minNumOfSquares(12)) //3
console.log(minNumOfSquares(25)) //1



//! Max Sum Without Adjacent Elements

/*
Given a 2 x N grid of integer, A, choose numbers such that the sum of the numbers is maximum and no two chosen numbers are adjacent horizontally, vertically or diagonally, and return it.

Note: You can choose more than 2 numbers.

input:
  [1, 2, 3, 4]
  [2, 3, 4, 5]

  Output - 8  We will choose 3 (From 2nd row 2nd column) and 5 (From 2nd row 4th column).
 */

// Bottom - UP approach OR Iterative approach

// TC - O(n) & SC - O(n)
function maxSumWithoutAdjacentElements(A) {
    let sum = 0; // Initially sum will be 0
    let dp = [];

    // A is 2 * n matrix means number of rows are fixed and that is 2.
    let j = A[0].length; // number of columns

    dp[0] = Math.max(A[0][0], A[1][0]); // For 1 column
    sum = dp[0];
    if (j > 1) {
        dp[1] = Math.max(dp[0], A[0][1], A[1][1]); // For 2 columns
        sum = dp[1];
    }

    // Calculate for k columns :: start from 3 to j
    for (let k = 2; k < j; k++) {
        const maxElementAtKColumn = Math.max(A[0][k], A[1][k]); // find max element of kth column
        // Now check sum of kth-2 column. Why -2 because we can not take sum of k-1 as it is adjacent.
        sum = Math.max(sum, dp[k - 2] + maxElementAtKColumn);
        dp[k] = sum;
    }
    console.log(dp)
    return sum;

}

const arr1 = [
    [2, 6, 6, 1, 16, 6, 15],
    [9, 16, 5, 4, 20, 3, 3]
]

console.log(maxSumWithoutAdjacentElements(arr1));



//!  Maximum Sum Value -- TODO (Not completed)

/*
We cannot sort an array because its given in question that 0 <= i <= j <= k =<= N

Case 1 : If B, C and D integer are positive integers then its simple to calculate this. Just Find out Max value of array
and apply in given formula => A[i] * B + A[j] * C + A[k] * D , it will give always max result.

Case 2 : If B C D are all negative number then find Min value of array and that can product max sum result.

Case 2 : If B C and D are positive or negative any number.

*/


function maxSumValue(A, B, C, D) {
    console.log('maxSumValue :', A);
    let maxSum = Number.MIN_SAFE_INTEGER;
    let firstIndex = -1;
    let tempSum = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < A.length; i++) {
        let sum = A[i] * B;
        if (sum > tempSum) {
            firstIndex = i;
            tempSum = sum;
        }
    }
    maxSum = tempSum;
    tempSum = Number.MIN_SAFE_INTEGER;
    let secondIndex = firstIndex;
    for (let i = firstIndex; i < A.length; i++) {
        let sum = A[i] * C;
        if (sum > tempSum) {
            secondIndex = i;
            tempSum = sum;
        }
    }
    maxSum += tempSum;
    tempSum = Number.MIN_SAFE_INTEGER;
    let thirdIndex = secondIndex;
    for (let i = secondIndex; i < A.length; i++) {
        let sum = A[i] * D;
        if (sum > tempSum) {
            thirdIndex = i;
            tempSum = sum;
        }
    }
    maxSum += tempSum;
    return maxSum;
}

//console.log(maxSumValue([1, 5, -3, 4, -2], 2, 1, -1))

console.log(maxSumValue([-21, 34, 3, 46, 8, -47, -47], -13, 10, 9))



//! Ways to Decode


/*
@ Approach

S = '1'

- From String of length 1, possible ways to decode is 1.

S = '12';

- Can 2 Chars give an decode value? YES
    - If value is less then or equal to 26. Like decode value of 25 is Y and decode value of 26 is Z.

- 12 is of length 2, and we know that by single length of string, there is one way.
    - (1, 2) is one way => Decode value is AB
    - 12 is also a valid value so that is 2nd way. 12 => L
    - So total ways are 2.

- Now we know that for single char, ways are 1 and for 2 chars ways are 2. So we can store these values into an array or called dp array based on length.

dp[1] = 1;  // means for length 1, only 1 way is there.
dp[2] = 2; //  There are 2 ways for string '12'. (length is 2)

But If string is '79' then dp[2] = 1; :: Because 79 cannot be decoded.

S = '123';
    - (1, 2, 3) is one way.
    - (12, 3) is second way.
    - (1, 23) is third way.

S = '1234'; -- ways are 3.
     - (1, 2, 3, 4)
     - (12, 3, 4)
     - (1, 23, 4)

S  = '1221';
     - (1, 2, 2, 1)
     - (12, 2, 1)
     - (1, 22, 1)
     - (1, 2, 21)
     - (12, 21)

                                        [1221]
i = 1                          [1, 221]                 
i = 2     [1, 2, 21]                [1, 2, 21]                     
        [1, 2, 2, 1]                [1, 2, 2, 1]
        [1, 2, 2, 1]                [1, 2, 2, 1]




*/

function wayToDecode(s) {
    console.log('wayToDecode :', s);
    const MOD = 1e9 + 7;

    if (s == null || s.length === 0) return 0;
    if (s[0] === "0") return 0; // If First Char of string is 0 then return 0 because we do not have decode value of 0.

    /* created dp array of s.length + 1.
     Array start from 0 and 0 is no any length value. If string length is 4 then valid indices will be 1 to 4
      of dp array. Thats why created dp array with s.length + 1. */
    const dp = new Array(s.length + 1).fill(0);

    dp[0] = 1; // Now we know that 0 is no length value so initial its value with 1. Because 1 will be our minimum answer.

    // Start from index 1 and go to s.length.
    // For string length 1, this for loop will also work because To value is less then or equal to length.
    // Not started from 0, because dp[0] is already initialized.
    for (let i = 1; i <= s.length; i++) {
        const a = s[i - 1]; // index started for 1 so do -1 here to get previous index value.

        // Check single single Char
        if (a >= 1 && a <= 9) {
            if (dp[[i - 1]]) {
                dp[i] += dp[i - 1]; // if previous dp value exists then add it.
            } else {
                dp[i] = 1;
            }
            dp[i] %= MOD;
        }

        // Check double Chars
        const b = s[i - 2] + s[i - 1]; // join 2 char. (previous + current)
        if (b >= 10 && b <= 26) {
            if (dp[i - 2]) {
                dp[i] += dp[i - 2]; // If dp value exists then update it.
            }
            dp[i] %= MOD;
        }
    }
    return dp[s.length] % MOD;

}

console.log(wayToDecode('123'));
console.log(wayToDecode('789'));
console.log(wayToDecode('1221')); // 5
console.log(wayToDecode('10011')); // 2
console.log(wayToDecode('0011')); // 0