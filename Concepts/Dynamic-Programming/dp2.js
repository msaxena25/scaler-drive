
//! Number of ways to traverse a matrix from (0,0) to (N-1, M-1) using right and bottom movements


/*
* Solution approach

Note: we can move only Left to Right and Top to Bottom

@ Let's take grid 2 * 2 & find ways from A to D

[A, B]
[C, D]

1 way   =>  A -> B -> D
2nd way =>  A -> C -> D

@ Let's take grid 3 * 3 & find ways to reach A to I

[A, B, C]
[D, E, F]
[G, H, I]

1st way    =>   A -> B -> C -> F -> I
2nd way    =>   A -> B -> E -> F -> I
3rd way    =>   A -> B -> E -> H -> I
4th way    =>   A -> D -> E -> F -> I
5th way    =>   A -> D -> E -> H -> I
6th way    =>   A -> D -> G -> H -> I

             I           -- We can come to I from H and F only : Last step for I are H and F.
        /        \
      H           F      -- Last step for H are G and E,  Last step for F are E and C
    /   \       /   \
   G     E     E     C   -- Last Step to reach G are D only, Last step to reach E are D and B
   |    / \   / \    |
   D   D   B  D  B   B
   |   |   |  |  |   |
   A   A   A  A  A   A

# Number of ways -

> There is only 1 way to reach D.
> There is only 1 way to reach B.
> There is only 1 way to reach G.
> There is only 1 way to reach C.
> There are 2 ways to reach E. ( 1 way of D + 1 way of B).
> There are 3 ways to reach H (2 ways of E + 1 way of G).
> There are 3 ways to reach F also (2 ways of E + 1 way of C).

So to reach I there are total 6 ways (3 ways of H + 3 ways of F)

? Above problem have characteristics of Optimal Substructure & Overlapping Sub problems. So It is a DP Problem.
*/


//@ Solution 1 : Top - Down approach OR Recursive with Memoization (because we are starting from target element)

/*
    * Very important point we should remember that in top down approach we start from target element and reach to base element. But Target element does not have any answer, Only base element have answer, So we go step by step to base element and then return answer from there step by step to target element.

    So in this question we have to reach to last element so target element will be last element.
    And base element is first element. A[0][0]

*/

// TC = O(n * m)
//SC = O(n * m ) + O(n + m) - Space why this? Because we have use n * m DP array and n + m are stack calls
function findUniquePath(A) {
    console.log('findUniquePath with Top down approach:', A);
    let dp = [];
    // Create dp with -1 values
    for (let i = 0; i < A.length; i++) {
        dp[i] = [];
        for (let j = 0; j < A[0].length; j++) {
            dp[i].push(-1);
        }
    }

    console.log(dp)
    dp[0][0] = 1;
    // This is top-down, so start from last destination column (n, m).
    function run(i, j) {
        if (i == 0 && j == 0) { // For 0th row and 0th column's node
            return 1;
        }
        if (dp[i][j] !== -1) { // If answer exists in dp
            return dp[i][j];
        }
        let x = i >= 1 ? run(i - 1, j) : 0; // move one row above
        let y = j >= 1 ? run(i, j - 1) : 0; // move one column left
        dp[i][j] = x + y;
        return dp[i][j];
    }
    return run(A.length - 1, A[0].length - 1); // start from last index
}

let arr1 = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0]
]

console.log(findUniquePath(arr1)) //6

//@ Solution 2 - Using Bottom Up approach OR Iterative way

// TC = O(n * m)  SC = O(n * m )  why this space because we have used n * m dp array
function findUniquePathWithBottomUp(A) {
    console.log('findUniquePath With BottomUp :', A);
    let n = A.length;
    let m = A[0].length;
    let dp = [];
    // Create dp with -1 values
    for (let i = 0; i < n; i++) {
        dp[i] = [];
        for (let j = 0; j < m; j++) {
            dp[i].push(-1);
        }
    }
    /* There is only 1 way to Reach (0,0) from (0, 0), There is only 1 way to Reach (0,1) from (0, 0), There is only 1 way to Reach (0,2) from (0, 0), There is only 1 way to Reach (1,0) from (0, 0).... */
    dp[0][0] = 1;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (i == 0 || j == 0) {
                dp[i][j] = 1; // answer will be 1 for all elements of 0th row & 0th column.
            } else {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1]; // on current node we can come only from top and left side.
            }
        }
    }
    return dp[n - 1][m - 1];

}

console.log(findUniquePathWithBottomUp(arr1)) //6

//* Note: Above Unique Path Algo could be solved with O(1) space as well If we allowed to change Original array.

//@ Refactor Code - No need two for loops

function findUniquePathWithBottomUpRefactor(A) {
    console.log('findUniquePath With BottomUp Refactor:', A);
    let n = A.length;
    let m = A[0].length;
    let dp = [];
    /* There is only 1 way to Reach (0,0) from (0, 0), There is only 1 way to Reach (0,1) from (0, 0), There is only 1 way to Reach (0,2) from (0, 0), There is only 1 way to Reach (1,0) from (0, 0)....
    So put 1 on place where i is 0 or j is 0.
    and for rest indices  simply add (left side value and top side value)
    */
    for (let i = 0; i < n; i++) {
        dp[i] = [];
        for (let j = 0; j < m; j++) {
            if (i == 0 || j == 0) {
                dp[i].push(1);
            } else {
                dp[i].push(dp[i - 1][j] + dp[i][j - 1]);
            }
        }
    }
    return dp[n - 1][m - 1];

}

console.log(findUniquePathWithBottomUpRefactor(arr1)) //6



//! Unique Path when there are some obstacles in Grid

/*
Given a grid of size n * m, lets assume you are starting at (1,1) and your goal is to reach (n, m). At any instance, if you are on (x, y), you can either go to (x, y + 1) or (x + 1, y).

Now consider if some obstacles are added to the grids. How many unique paths would there be? An obstacle and empty space is marked as 1 and 0 respectively in the grid.

Input:

 A = [
        [0, 0, 0]
        [0, 1, 0]
        [0, 0, 0]
     ]

 Possible paths to reach (n, m): {(1, 1), (1, 2), (1, 3), (2, 3), (3, 3)} and {(1 ,1), (2, 1), (3, 1), (3, 2), (3, 3)}
 So, the total number of unique paths is 2.
*/


// TC = O(n * m)
//SC = O(n * m ) + O(n + m) - Space why this? Because we have use n * m DP array and n + m are stack calls
function findUniquePathWhenObstacles(A) {
    console.log('findUniquePath When Obstacles with Top down approach:', A);
    let dp = [];
    // Create dp with -1 values
    for (let i = 0; i < A.length; i++) {
        dp[i] = [];
        for (let j = 0; j < A[0].length; j++) {
            dp[i].push(-1);
        }
    }

    // IF starting or target element have obstacles then there will be no path exists.
    if (A[0][0] == 1 || A[A.length - 1][A[0].length - 1] == 1) {
        return 0;
    }
    // This is top-down, so start from last destination column (n, m).
    function run(i, j) {
        if (A[i][j] == 1) { // If there is obstacles then return 0 from that Node
            return 0;
        }
        if (i == 0 && j == 0) { // For start Node (0, 0)
            return 1;
        }

        if (dp[i][j] !== -1) { // If answer exists in dp
            return dp[i][j];
        }
        let x = (i >= 1) ? run(i - 1, j) : 0; // move one row above
        let y = (j >= 1) ? run(i, j - 1) : 0; // move one column left
        dp[i][j] = x + y;
        return dp[i][j];
    }
    return run(A.length - 1, A[0].length - 1);
}

console.log(findUniquePathWhenObstacles(arr1))

let arr2 = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
]
console.log(findUniquePathWhenObstacles(arr2))

let arr3 = [
    [0, 0],
    [0, 0],
    [0, 0],
    [1, 0],
    [0, 0]
]
//console.log(findUniquePathWhenObstacles(arr3))

let arr4 = [
    [0, 1]
]

//console.log(findUniquePathWhenObstacles(arr4))


//! Dungeon Princess
// https://www.scaler.com/academy/mentee-dashboard/class/70776/assignment/problems/17/?navref=cl_pb_nv_tb

/*
Given M * N matrix where each cell indicates the health gained. Find min health required
at 0, 0 so that we can reach to (m-1, n-1).

You will loss health if go to negative value cell. And if go to positive cell then health will increase by that cell value.
If at any point his health point drops to 0 or below, he dies immediately.

You can move rightward or downward in each step.

Input:
 A = [
       [-2, -3, 3],
       [-5, -10, 1],
       [10, 30, -5]
     ]

Output: 7 (path will be : -2, -3, 3, 1, -5)
*/

//@ Top down approach or recursive approach (But here base cell is last cell so will start from 0,0 and reach to base cell)
// Bottom up approach can not be fit here because we know the value of last cell, not first cell. And last cell is dependent on left    and top cells whose values are not yet. Top down approach works recursively so we will go to last cell then come back from there till first cell.

// TC  - O(n * m) , SC = O(n * m) + O(n+m)
function calculateMinimumHP(A) {
    console.log('calculateMinimumHP :', A);
    let m = A.length; // rows
    let n = A[0].length; // columns
    let dp = [];
    // Create dp with -1 values
    for (let i = 0; i < m; i++) {
        dp[i] = [];
        for (let j = 0; j < n; j++) {
            dp[i].push(-1);
        }
    }
    function run(A, i, j) {
        if (i >= m || j >= n) { // When cross limit
            return Number.MAX_SAFE_INTEGER; // We actually need min value when compare with this, so take this as Max.
        }
        /*
        Step 1 :: BASE CASE = When i and j reaches to last column (princes colum) then return health from there
        If value is -5 then minimum required health is 6, If value is -7 then min health required is 8.
        If value is positive then min required health is 1 only because we are not loosing any health into that column.
        */
        if (i == m - 1 && j == n - 1) {
            if (A[i][i] < 0) {
                return 1 - A[i][j];
            } else {
                return 1;
            }
        }
        if (dp[i][j] != -1) { // We will also visit same node multiple times, use result from dp
            return dp[i][j];
        }
        let a = run(A, i + 1, j) // move one row
        let b = run(A, i, j + 1); // move one column
        let minOfAb = Math.min(a, b); // We are calculating for Min health so take Min value from a and b

        // If node value is 10, minOfAb = 1 => 1 - 10 = -9 So, required health for i, j column is 1. max(-9, 1);
        // If node is -5, minOfAb = 1 => 1 - (-5) = 6, max(6, 1) => 6.
        dp[i][j] = Math.max(minOfAb - A[i][j], 1);
        return dp[i][j];

    }
    console.log(dp)
    return run(A, 0, 0);

}

//ProblemImagesView\Dungeon-Princess-dry-run.jpg

let arr5 = [
    [-2, -3, 3],
    [-5, -10, 1],
    [10, 30, -5]
];
console.log(calculateMinimumHP(arr5)); // 7



//!  Min Sum Path in Triangle

/* Given a triangle, find the minimum path sum from top to bottom. Each step you may move to adjacent numbers on the row below.

Adjacent numbers for jth column of ith row is jth and (j+1)th column of (i + 1)th row

Input:
A = [
         [2],
        [3, 4],
       [6, 5, 7],
      [4, 1, 8, 3]
    ]

Output
 11 ( The minimum path sum from top to bottom is 11 (i.e., 2 + 3 + 5 + 1 = 11))

  [2],
    [3, 4],
    [6, 5, 7],
    [4, 1, 8, 3]
*/

// TC =  O(n * m) If m is length of last row
function minPathInTriangle(A) {
    console.log('minPathInTriangle :', A);
    let m = A.length; // rows
    let dp = [];
    let minPath = A[0][0];
    for (let i = 0; i < m; i++) {
        dp[i] = [];
        let min = Number.MAX_SAFE_INTEGER; // Find local min value for row only
        for (let j = 0; j < A[i].length; j++) {
            if (i == 0 && j == 0) {
                dp[i].push(A[i][j]);
                min = dp[i];
            } else {
                let first = dp[i - 1][j - 1] >= 0 ? dp[i - 1][j - 1] : Number.MAX_SAFE_INTEGER;
                let second = dp[i - 1][j] >= 0 ? dp[i - 1][j] : Number.MAX_SAFE_INTEGER;
                dp[i][j] = A[i][j] + Math.min(first, second);
                min = Math.min(min, dp[i][j]);
            }
        }
        minPath = min; // update current row minimum value into minPath variable
    }
    console.log(dp)
    return minPath;
}

const A = [
    [2],
    [3, 4],
    [6, 0, 7],
    [4, 1, 8, 3]
]
console.log(minPathInTriangle(A)) //1

console.log(minPathInTriangle([[4]])) // 14

const B = [
    [0],
    [0, 5],
    [6, 7, 8],
    [0, 6, 5, 7],
    [3, 4, 3, 0, 4],
    [8, 7, 5, 9, 5, 3],
    [2, 7, 3, 9, 7, 7, 9],
    [5, 3, 3, 3, 8, 5, 8, 9]

]
console.log(minPathInTriangle(B)) // 21


/*

! We can solve problem in one For loop statement while creating DP, if choose Iterative approach. No need to create first DP array with -1 values then again iterate over array for calculation.

! If you have answer for base cell (0, 0), and can move from (0, 0) to last cell, then Iterative is best. You can also use recursive here.

!  Whenever we apply || operator , take care of value 0.  If 0 is valid value then use ternary operator.
    - A = 0; B = A || 1000; So here B will become 1000 but I need 0.
    - B = A < 0 ? 1000 : 0;  (Correct condition)

! If you have answer of last cell ( target value ), then recursive is best. Start your algo from (0, 0), reach to target cell and return value one by one step t0 (0, 0). Iterative is tough here.

*/


//!  N digit numbers (Hard)

/* Find out the number of A digit positive numbers, whose digits on being added equals to a given number B.

Note that a valid number starts from digits 1-9 except the number 0 itself. i.e. leading zeroes are not allowed.

Since the answer can be large, output answer modulo 1000000007

A = 2
B = 4

Valid numbers are {22, 31, 13, 40}
Hence output 4.
 */



/*

@ Approach

- This problem is based on top down approach, Recursive approach. At every point, We have 0 to 9 digits. So it can not be done with using only for loop (means iterative approach).

Given Digits = 3 & Sum should be 4.
At every iteration we will choose one digit from 0 to 9 and will calculate remaining sum. (Sum = Sum - chosen digit)

                        [3, 4]-----------------------------------------------------
        (choose digit 1) / (remaining digit is 2 and remaining sum is 3)           |(2)
                        /                                                         [2, 2]
                 [2, 3]------------------------------------------------             | (1)
              /(1)                                  (2)|           (3)|            [1, 1]
        [1, 2]----------------------------          [1, 1]         [1, 0]           For this we already calculated
        / (1)        (2)|              (3)|           |             return 0        so get value from DP and return.
      [0, 1]         [0, 0]            [0, -1]        |(1)
(No digits             Sum achieved     sum is -1     [0, 0]
but sum is still 1)    and no digits    return 0     return 1
return 0                return 1

*/


/**
 *
 * @param {*} A - Number of digits available
 * @param {*} sum - Sum of digits which we output
 */
function nDigitsNumber(A, sum) {
    console.log('nDigitsNumber :', A, sum);
    let ans = 0;
    let dp = [];
    const mod = 1000000007;
    for (let i = 1; i <= 9; i++) {
        ans += run(A - 1, sum - i) // reduce digit count by 1 and reduce sum
        ans %= mod;
    }

    function run(digits, sum) {
        if (digits == 0 && sum == 0) { // no digits remaining and sum has been achieved then return 1 (means 1 possible way)
            return 1;
        }
        if (digits == 0 || sum < 0) { // no digits remaining OR sum did not achieved then return 0
            return 0;
        }

        // We created Dp array based on digit and sum value. How many numbers possible by given digit and sum will be value of that index.
        if (dp[digits] && dp[digits][sum] >= 0) {
            return dp[digits][sum];
        }

        let ans = 0;
        for (let j = 0; j <= 9; j++) {
            ans += run(digits - 1, sum - j); // reduce digit count by 1 and reduce sum
            ans %= mod;
        }
        if (!dp[digits]) {
            dp[digits] = [];
        }
        dp[digits][sum] = ans;
        return ans;
    }
    console.log(dp)
    return ans;
}

// console.log(nDigitsNumber(75, 22)) //478432066
console.log(nDigitsNumber(3, 4)) // 10

//! Not completed

function minCost(A, B) {
    console.log('minCost :', A, B);
    let dp = [];
    // dp[0] = [];
    // dp[0][0] = 0;
    for (let i = 0; i < A.length; i++) {
        if (!dp[i]) {
            dp[i] = [];
        }
        for (let j = 0; j < B.length; j++) {

            if (i == 0 && j == 0 && A[i] == B[j]) {
                dp[i][j] = 0;
            }
            if (i == 0) {
                dp[i][j] = j;
            }
            else if (j == 0) {
                dp[i][j] = i;
            }
            else if (A[i] == B[j]) {
                dp[i][j] = (dp[i - 1] && dp[i - 1][j - 1] || 0);
            }
            else {
                const insertCost = 1 + (dp[i][j - 1] || 0);
                const updateCost = 1 + (dp[i - 1] && dp[i - 1][j - 1] || 0);
                const deleteCost = 1 + (dp[i - 1] && dp[i - 1][j] || 0);

                dp[i][j] = Math.min(insertCost, updateCost, deleteCost);
            }
        }

    }
    console.log(dp)
    return dp[A.length - 1][B.length - 1];
}

console.log(minCost('A', 'B'));