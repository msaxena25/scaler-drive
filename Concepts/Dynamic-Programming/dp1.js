
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
- You can go to Ground to A and then A to B.
- You can direct go Ground to B.
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

@ Little consfused how X + Y ?

Reaching on n-2 has X ways and If we take 2 more steps then we can reach to N; So here we are adding steps but way are same and that is X;
Same as n-1. If we take one more step then we can reach to N, So here also way are same and that is Y;
SO total is X + Y;

* Please keep in mind that we have to find number of ways, not number of steps;
Example - If there are 1000 stairs and we are climbing one one stair then it will be only 1 way.

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
2. Same subproblems is calculated multiple times.

*/

/*
* Characteristics of Dynamic Programming

Two very important characteristics essential for a Dynamic Programming approach to work are:

Optimal Substructure - Answer of current problem can be formed with answers of sub problems. F(n) = F(n-1) + F(n-2)
Overlapping Subproblems -  Same subproblems is calculated multiple times.
*/

function fibSeriesWithDP(n) {
    let arr = [];
    arr[n] = -1;
    run(n);
    function run(n) {
        if (n == 0 || n == 1) {
            return n;
        }
        if (arr[n] != 1) { // use existing answer from buffer array
            return arr[n];
        }
        arr[n] = run(n - 1) + run(n - 2);
        return arr[n];

    }
}

// TC = O(n)
// SC = O(n + n) => buffer array + call stack => O(n)


//! Approaches to Dynamic Programming

/*

There are two types of approach that can be used to solve a problem by Dynamic Programming:

* Memoization or Top-Down Dynamic Programming or Recursive DP
* Tabulation or Bottom Up Dynamic Programming or Iterative DP


! Top-Down

we start from the most complex problem and move to subproblems. So, in this fashion, we keep moving downwards until we reach the base cases. For example, in the Fibonacci series, the base case is for the first and second term, which will be 0 and 1 respectively.
On the way, we keep storing the values of all the subproblems which are computed so they can be reused. This process of storing the values of subproblems is called Memoization.
Above solution was top-down to find Fibonacci series.

! Bottom Up

As the name suggests, to find out the solution to a problem we start from the base cases, moving up towards more complex and larger subproblems until we reach the solution we need to find.
So, in this fashion, we keep moving upwards until we reach the desired state.  On the way, we keep storing the values of all the subproblems in a table sequentially. If needed, these values are accessed directly from the table.

*/

//@ Iteractive approach
function fibSeriesWithBottomUPApproach(n) {
    let F = [];
    F[0] = 0;
    F[1] = 1;
    for (let i = 2; i <= n; i++) {
        F[n] = F[n - 1] + F[n - 2];
    }
    return F[n];
}

// TC  = O(n) and SC = O(n) :: Sometimes it possible to optimize SC to O(1) in Iteractive approach

//! Fib series in SC = O(1) using three variables

function fibSeriesWithThreeVariables(n) {
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


//! Minimum Number of Squares :: Perfect Squares

/*
Given an integer A. Return minimum count of numbers, sum of whose squares is equal to A.

Input A = 6

 Possible combinations are : (1^2 + 1^2 + 1^2 + 1^2 + 1^2 + 1^2) and (1^2 + 1^2 + 2^2).
 Minimum count of numbers, sum of whose squares is 6 is 3.

*/

/*
N = 2   => 1^2 + 1^2  = 2       :: ans = 2;
N = 4   => 2^2                  :: ans  = 1;

N = 50  => 7^2 + 1^2 OR 5^2 + 5^2  both are possible ways. ans = 2;

N = 12;

Greedy approach => Nearest perfect square is 9 => 3^2
                => 12 - 3^2 = 3 - 1^2 =  2 - 1^2 = 1 - 1^2 = 0  :: total count 4.
While 12 => 2^2 + 2^2 + 2^2 = 12    :: so total count is 3.

So direct greedy approach can not give min count. We have to check all possible solutions.

*/

// Bottom-up approach OR Iteartive approach

//? ProblemImagesView\min-number-of-square-problem.jpg

// TC - O(n√n) and SC - O(n)
function minNumOfSquares(n) {
    let dp = [];
    dp[0] = 0;
    // Its a bottom up approach so start from 1 to N
    for (let i = 1; i < n; i++) {
        dp[i] = Number.MAX_SAFE_INTEGER; // We have to find min value so initially initialize with max
        for (let j = 1; j * j <= i; j++) {
            // Now check each value from from 1 to i that could be perfect square
            const remainingI = i - (j * j); // after decreasing j * j from i
            dp[i] = Math.min(dp[i], dp[remainingI] + 1);
        }
    }
    return dp[n];
}

console.log(minNumOfSquares(6))


//! Climb stair with Iteartive approach :: start with 1 to n

// TC - O(n) SC - O(n)
function findWaystoClimbStairs(n) {
    let dp = [];
    dp[0] = 1;
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

//* Top down approach OR recursive approach to find ways to climb stairs

// TC - O(n) SC - O(n)
function findWaystoClimbStairsRecrusive(n) {
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
}

//! Max Sum Without Adjacent Elements

/*
Given a 2 x N grid of integer, A, choose numbers such that the sum of the numbers is maximum and no two chosen numbers are adjacent horizontally, vertically or diagonally, and return it.

Note: You can choose more than 2 numbers.
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