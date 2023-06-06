
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

? Above problem have characteristics of Optimal Substructure & Overlapping Subproblems. So It is a DP Problem.
*/


//@ Solution 1 : Top - Down approach OR Recursive with Memoization approach

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
    console.log(dp);
    // This is top-down, so start from last destination column (n, m).
    function run(i, j) {
        if (i == 0 || j == 0) { // For start node
            return 1;
        }
        if (dp[i][j] !== -1) { // If answer exists in dp
            return dp[i][j];
        }
        let x = run(i - 1, j); // move one row above
        let y = run(i, j - 1); // move one column left
        dp[i][j] = x + y;
        return dp[i][j];
    }
    return run(A.length - 1, A[0].length - 1);
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
    dp[0][0] = 1; // It's a bottom up approach so start from base case
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (i == 0 || j == 0) {
                dp[i][j] = 1; // answer will be 1 for all elements of 0th row & 0th column.
            } else {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
    }
    return dp[n - 1][m - 1];

}

console.log(findUniquePathWithBottomUp(arr1)) //6

//* Note: Above Unique Path Algo could be solved with O(1) space as well If we allowed to change Origional array.




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
    if (A[0][0] == 1 || A[A.length - 1][A[0].length - 1] == 1) {
        return 0;
    }
    // This is top-down, so start from last destination column (n, m).
    function run(i, j) {
        if (A[i][j] == 1) { // If there is obstacles then return 1
            return 0;
        }
        if (i == 0 && j == 0) { // FOr both 0th, return 1
            return 1;
        }
        if (dp[i][j] !== -1) { // If answer exists in dp
            return dp[i][j];
        }
        let x = i >= 1 ? run(i - 1, j) : 0; // move one row above
        let y = i >= 1 ? run(i, j - 1) : 0; // move one column left
        dp[i][j] = x + y;
        return dp[i][j];
    }
    return run(A.length - 1, A[0].length - 1);
}

//console.log(findUniquePathWhenObstacles(arr1))

let arr2 = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
]
//console.log(findUniquePathWhenObstacles(arr2))

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

console.log(findUniquePathWhenObstacles(arr4))


//! Dungeon Princess
// https://www.scaler.com/academy/mentee-dashboard/class/70776/assignment/problems/17/?navref=cl_pb_nv_tb

/*
Given M * N matrix where each cell indicates the health gained. Find min health required
at 0,0 so that we can reach to (m-1,n-1).


Input:
 A = [
       [-2, -3, 3],
       [-5, -10, 1],
       [10, 30, -5]
     ]

Output: 7
*/

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