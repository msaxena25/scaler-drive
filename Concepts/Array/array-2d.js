//! Doc LInk - https://drive.google.com/drive/u/0/folders/1nJoEq-b_aVbYjZ_eds4TvaAzZRWvhRka

/*
* 2 D array declaration -

@ matrix[4][5]
4 is number of rows.
5 is number of columns. */

/*
! Traversing elements -

Very first element of matrix - [0][0]
For any element [i][j]
    - Left element - [i][j-1]
    - Right element - [i][j+1]
    - Top element - [i-1][j]
    - Bottom element - [i+1][j]
    - First element of that row - [i][0]
    - Last element of that row - [i][m-1]
    - Last element of that column - [n-1][j]
    - Very Last element of matrix - [n-1][m-1]
    - n-1 is last row
    - m-1 is last column

    */





//!  Row wise sum
/**
You are given a 2D integer matrix A, return a 1D integer array containing row-wise sums of original matrix.

Return an array containing row-wise sums of original matrix.

[
    [1,2,3,4]
    [5,6,7,8]
    [9,2,3,4]
]
{10,26,18}
 */

function rowWiseSum(A) {
    let rowSum = [];
    for (let i = 0; i < A.length; i++) {
        let sum = 0;
        for (let j = 0; j < A[0].length; j++) {
            //console.log(A[i][j]) - print matrix elements
            sum += parseInt(A[i][j]);
        }
        rowSum.push(sum)
    }
    console.log(rowSum)
    return rowSum;
}
// TC - O(n * m) where n is rows and m is columns
const arr = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 2, 3, 4]
]
rowWiseSum(arr) // [10, 26, 18]
rowWiseSum([]) // []
rowWiseSum([[1, 2], [1, 2]])


/*************************************** */

//!  Column wise sum

/**
 * You are given a 2D integer matrix A, return a 1D integer array containing column-wise sums of original matrix.
 *
 * Return an array containing column-wise sums of original matrix.
 *
[1,2,3,4]
[5,6,7,8]
[9,2,3,4]

[15,10,13,16]
 */

function columnWiseSum(A) {
    let columnSum = [];
    for (let i = 0; i < A[0].length; i++) { // column for loop
        let sum = 0;
        for (let j = 0; j < A.length; j++) { // row for loop
            //console.log(A[j][i]) //- print matrix elements
            sum += parseInt(A[j][i]);
        }
        columnSum.push(sum)
    }
    console.log(columnSum)
    return columnSum;
}

//@ TC - O(n * m) where n is rows and m is columns
const arr1 = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 2, 3, 4]
]
columnWiseSum(arr1) // [15,10,13,16]


/**
*! Diagonals elements

Left to right traversing
Right to Left traversing

If matrix is -> [3][3]
[
    [1,2,3],
    [4,5,6],
    [7,8,9]
]
*@Left to right traversing

First element - [0][0]
Next Diagonal element - [1][1]
Next Diagonal element - [2][2]

** Left to right diagonal pattern is => each step i and j are equal.

*@ Right to left traversing.

First element where we have to start - [0][2]
Next Diagonal element - [1][1]
Next Diagonal element - [2][0]

** Right to left diagonal pattern is => each step i is increasing by 1 and j is decreasing by 1.

 */

//! print main diagonally elements from left to right

function printLeftToRightDiagonalElements(A) {
    for (let i = 0; i < A[0].length; i++) {
        console.log(A[i][i]) // here we know i and j are equal, thats why no need to declare j variable.
    }
}
const arr2 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
const arr3 = [
    [1, 2],
    [4, 5],
    [7, 8]
]
printLeftToRightDiagonalElements(arr2);
printLeftToRightDiagonalElements(arr3);

// Using while loop
function printLeftToRightDiagonalElements1(A) {
    let i = 0; let j = 0;
    let n = A.length;
    while (i < n && j < n) {
        console.log(A[i][j])
        i++;
        j++;
    }
}
printLeftToRightDiagonalElements1(arr2);
printLeftToRightDiagonalElements1(arr3);

//! Right to left main diagonal element

// Using while loop, here i and j are different values.
function printRightToLeftDiagonalElements(A) {
    let i = 0;
    let j = A[0].length - 1; // column length -1
    let n = A.length;
    while (i < n && j >= 0) {
        console.log(A[i][j])
        i++;
        j--;
    }
}
printRightToLeftDiagonalElements(arr2);
printRightToLeftDiagonalElements(arr3);

//? Below solution is not readable thats why better to keep two variable i and j.
function printRightToLeftDiagonalElements1(A) {
    const n = A[0].length;
    for (let i = 0; i < n; i++) {
        console.log(A[i][n - 1 - i])
    }
}
printRightToLeftDiagonalElements1(arr2);
printRightToLeftDiagonalElements1(arr3);


//! . Main Diagonal Sum

/**
 * You are given a N X N integer matrix. You have to find the sum of all the main diagonal elements of A.
 * Main diagonal of a matrix A is a collection of elements A[i, j] such that i = j.
 *
 * 3 3 1 -2 -3 -4 5 -6 -7 -8 9
 * output > 15
 *
 * A[1][1] + A[2][2] + A[3][3] = 1 + 5 + 9 = 15
 */

function mainDiagonalSum(A) {
    console.log('mainDiagonalSum program')
    let sum = 0;
    for (let i = 0; i < A[0].length; i++) { // we have to traverse column wise
        console.log(A[i][i])
        sum += A[i][i];
    }
    console.log('mainDiagonalSum', sum);
    return sum;
}
//mainDiagonalSum([3, 3, 1, -2, -3, -4, 5, -6, -7, -8, 9])
mainDiagonalSum([[1, -2, -3], [-4, 5, -6], [-7, -8, 9]])

//* With while loop
function mainDiagonalSumWithWhile(A) {
    console.log('mainDiagonalSumWithWhile program');
    let sum = 0;
    let i = 0;
    let j = 0;
    const n = A[0].length;
    while (i < n && j < n) {
        sum += A[i][j];
        i++;
        j++;
    }
    console.log('mainDiagonalSumWithWhile', sum)
    return sum;
}
mainDiagonalSumWithWhile([[1, -2, -3], [-4, 5, -6], [-7, -8, 9]])


/****************************************** */

//! Print all diagonals Going from Right to left. Note - Diagonals starting from 0th row OR m-1 column.

/*  [
     [1,   2,  3,  4,  5],
     [6,   7,  8,  9, 10],
     [11, 12, 13, 14, 15],
     [16, 17, 18, 19, 20]
    ]
 */

function allDiagonalsFromRToL(A) {
    const ans = [];
    let n = A.length;
    let m = A[0].length;

    //* this while loop will print diagonals starting from first row.
    let c = m - 1; //last column
    while (c >= 0) {
        let i = 0;  // first row
        let j = c;
        while (i < n && j >= 0) {
            ans.push(A[i][j])
            i++; // increasing row as we know that in R to L i increases and j decreases.
            j--; // decreasing column
        }
        c--;
    }
    //* this while loop will print diagonals starting from last column.
    let r = 1; // it will start from 1 because 0th row already covered in upper while loop
    while (r < n) {
        let i = r;
        let j = m - 1; // last column
        while (i < n && j >= 0) {
            ans.push(A[i][j])
            i++; // increasing row
            j--; // decreasing column
        }
        r++;
    }
    console.log(ans);
}
const arr4 = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20]

]
// TC  - O(n * m) > rows * column
allDiagonalsFromRToL(arr4) // [5, 9, 13, 17, 4, 8, 12, 16, 3, 7, 11, 2, 6, 1, 10, 14, 18, 15, 19, 20]


/************************************** */

//! Transpose Matrix of [n][n] ( Lets do this first in SQUARE MATRIX )

/* 4 * 4 matrix
[
    [1,   2,  3,  4],
    [5,   6,  7,  8],
    [9,  10, 11, 12],
    [13, 14, 15, 16]
]

@ Transpose of matrix - row becomes column and column becomes row
row[0] <=> column[0]
row[1] <=> column[1]
row[2] <=> column[2]
row[3] <=> column[3]
.....
row[i] <=> column[i]

[
   [1, 5,   9,  13],
   [2, 6,  10,  14],
   [3, 7,  11,  15],
   [4, 8,  12,  16]
]

@ Observations -

? Left to Right main diagonal elements are still in same position. (1, 6, 11 , 16)
[0][1] <=> [1][0]
[0][2] <=> [2][0]
[0][3] <=> [3][0]
[1][1] <=> [1][1] -- main diagonal elements
[1][2] <=> [2][1]
..
[2][3] <=> [3][2]
[3][1] <=> [1][3]
..
..

? [i][j] <=> [j][i]  (PATTERN) - ** Means i and j swapped.

*/

//@ Check this program output in console. Here we are swapping each & every elements of matrix that's why, at last we get
//@ the same original matrix (which is not transpose).
function transposeSquareMatrix(A) {
    console.log('swapping each & every elements (This is not transpose)');
    const n = A.length;
    const m = A[0].length;
    for (let i = 0; i < n; i++) { // row
        for (let j = 0; j < m; j++) { // column
            //log(A[i][j])
            [A[i][j], A[j][i]] = [A[j][i], A[i][j]]; // swap
        }
    }
    log(A);
}
const arr5 = [
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [4, 8, 12, 16]
]
transposeSquareMatrix(arr5)

//@ Here j index will not start from 0 every time. It will start from ith element.
//@ Hint - Once A[0][1] will swap with A[1][0], then no need to read A[1][0] again so will start from A[1][1].

function transposeSquareMatrixFinal(A) {
    console.log('transpose');
    const n = A.length;
    const m = A[0].length;
    for (let i = 0; i < n; i++) { // row
        for (let j = i; j < m; j++) { // j will start from i because we don't need to swap which already swapped.
            [A[i][j], A[j][i]] = [A[j][i], A[i][j]]; // swap
        }
    }
    log(A);
}
transposeSquareMatrixFinal(arr5)




//! Transpose Rectangle matrix (Not Square) Means n and m are not same.

//* We can transpose a Square matrix with SC O(1) by using same original matrix space. But We can not do same with Rectangle matrix.
//* Square matrix -> mat[n][n] Here number of rows and columns are same. So after transposing these will be same.
//* But Rectangle matrix -> mat[n][m] Example mat[3][5], Here number of rows and columns are different.
//* So after transposing, we need 5 rows and 3 columns that is not same as original. Thats why we can not do this with SC - O(1)
//* In this case, We need separate space for transpose matrix.

function transposeMatrix(A) {
    console.log('transpose rectangle matrix');
    const ans = [];
    const n = A.length;
    const m = A[0].length;
    for (let i = 0; i < m; i++) { // column will become rows, so outer loop will be run on column size.
        ans.push([]);
        for (let j = 0; j < n; j++) { // column, Here j starts from 0 because here is no swap concept.
            ans[i].push(A[j][i]); // Be clear on this, [j][i] => j is row and i is column.
        }
    }
    log(ans);
    return ans;
}
const arr7 = [
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [4, 8, 12, 16]
]
//transposeMatrix(arr7)

const arr6 = [
    [21, 62, 16, 44, 55, 100, 16, 86, 29],
    [62, 72, 85, 35, 14, 1, 89, 15, 73],
    [42, 44, 30, 56, 25, 52, 61, 23, 54],
    [5, 35, 12, 35, 55, 74, 50, 50, 80],
    [2, 65, 65, 82, 26, 36, 66, 60, 1],
    [18, 1, 16, 91, 42, 11, 72, 97, 35],
    [23, 57, 9, 28, 13, 44, 40, 47, 98]
]
//transposeMatrix(arr6)

const arr8 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [11, 12, 13],
    [15, 16, 17],
    [18, 19, 20]
]
transposeMatrix(arr8)


/****************************************************** */


//! Rotate matrix 90 degree clockwise.


/* 4 * 4 matrix
[
    [1,   2,  3,  4],
    [5,   6,  7,  8],
    [9,  10, 11, 12],
    [13, 14, 15, 16]
]

* Rotation of the above matrix - 90 degree clockwise
[
   [13, 9,   5,  1],
   [14, 10,  6,  2],
   [15, 11,  7,  3],
   [16, 12,  8,  4]
]

* Observations -

row[0] => column[3]
row[1] => column[2]
row[2] => column[1]
row[3] => column[0]

* Lets transpose of given input matrix and then observe final output matrix and transposed matrix -

@Original input matrix -
[
    [1,   2,  3,  4],
    [5,   6,  7,  8],
    [9,  10, 11, 12],
    [13, 14, 15, 16]
]
@ transposed matrix -
[
   [1, 5,   9,  13],
   [2, 6,  10,  14],
   [3, 7,  11,  15],
   [4, 8,  12,  16]
]
@ Final rotated matrix -
[
   [13, 9,   5,  1],
   [14, 10,  6,  2],
   [15, 11,  7,  3],
   [16, 12,  8,  4]
]

*Observation of transposed matrix and rotated matrix If we see row wise data -
- elements of each row are in reverse order.

*/

function rotate90(A) {
    console.log('rotate90 :');
    const ans = [];
    const n = A.length;
    const m = A[0].length;
    // This for loop will create transpose matrix
    for (let i = 0; i < m; i++) { // row becomes column in transpose
        ans.push([]);
        for (let j = 0; j < n; j++) { // column becomes rows
            ans[i][j] = A[j][i];
        }
    }
    //This for loop will swap row elements
    for (let i = 0; i < ans.length; i++) { // This for loop will traverse all rows
        let j = 0;
        let k = ans[0].length - 1;
        while (j < k) { // This while loop will traverse all items of a row
            [ans[i][j], ans[i][k]] = [ans[i][k], ans[i][j]];
            j++;
            k--;
        }
    }
    log(ans);
    return ans;
}

const arr9 = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
]
rotate90(arr9)

const arr10 = [
    [1, 2],
    [3, 4]
]
rotate90(arr10)


/******************************************************************** */

//! Minor Diagonal Sum

/**
You are given a N X N integer matrix. You have to find the sum of all the minor diagonal elements of A.
Minor diagonal of a M X M matrix A is a collection of elements A[i, j] such that i + j = M + 1 (where i, j are 1-based).

A = [[1, -2, -3],
      [-4, 5, -6],
      [-7, -8, 9]]
output >  -5
 */

//? we have to take care of 1-indexed as per the problem statement
// TC = O(n^2)
function minorDiagonals(A) {
    console.log('minorDiagonals', A);
    let sum = 0;
    const m = A.length;
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[0].length; j++) {
            if (i + 1 + j + 1 === m + 1) { // did i+1  & j+1 because of 1 indexed
                //log(A[i][j])
                sum += A[i][j];
            }
        }

    }
    console.log(sum)
    return sum;
}
const arr11 = [[1, -2, -3],
[-4, 5, -6],
[-7, -8, 9]]
minorDiagonals(arr11)
const arr12 = [[3, 2],
[2, 3]];
minorDiagonals(arr12)

/*
    @ Approach of Optimized solution.

    > We have given diagonal rule and that is  i + j = M + 1.
    > So if m = 3 then rule is m + 1 = 4
    > Means we have to take only those indices whose sum is 4.
    > Those indices are = 1 + 3, 2 + 2, 3 + 1.
    > So we only pick these values and sum those.
*/


// TC  = O(n)
function minorDiagonalsOptimized(A) {
    console.log('minorDiagonalsOptimized', A);
    let sum = 0;
    const m = A.length;
    const diagonalRule = m + 1;
    for (let i = 1; i < diagonalRule; i++) {
        sum += A[i - 1][diagonalRule - i - 1];
    }
    console.log(sum)
    return sum;
}
minorDiagonalsOptimized(arr11)

/******************************************* */
//! Anti Diagonals  (problem based on right to left diagonal matrix)

/**
 * Give a N * N square matrix A, return an array of its anti-diagonals.
 *
 * Return a 2D integer array of size (2*N - 1) * N, representing the anti-diagonals of input array A.
The vacant spaces in the grid should be assigned to 0.

1 2 3
4 5 6
7 8 9

output is >
1 0 0
2 4 0
3 5 7
6 8 0
9 0 0
 */

//* Explanation  -

/*
1. As given in problem statement, anti diagonal matrix is of size (2*n - 1) * n.
2. So if matrix is [3][3] then anti diagonal matrix will be [5][3]
3. When we traverse Diagonals from Right to Left then row increases by 1 and column will decrease by 1 at each step.
4. Each diagonals of original matrix will become a row of anti-diagonal matrix.
    For example -
        start from first row -
            1 is diagonal then first row of anti-diagonal matrix will be 1 0 0
            2 and 4 are diagonals then next row of anti-diagonal matrix will 2 4 0
            3 5 7 are diagonals then next (third)  row of anti-diagonal matrix will 3 5 7
        start from last columns -
            3 5 7 already added in previous operation
            6 8 are diagonals then next  row of anti-diagonal matrix will 6 8  0
            9 is diagonal then next  row of anti-diagonal matrix will 9 0 0
*/

// Here A is square matrix
function antiDiagonal(A) {
    console.log('antiDiagonal :');
    const ans = [];
    const n = A.length; // number of rows
    for (let i = 0; i < n; i++) {
        let r = 0; // first row
        let c = i;
        ans.push([]); // n rows will be inserted into output array by this for loop
        // row will increase by 1 and column will decrease by 1 to move next step
        while (r < n && c >= 0) {
            ans.at(-1).push(A[r][c]); // ans.at(-1) pick last item
            r++;
            c--;
        }
    }

    // get diagonals from last column, here i started from 1 because first row already covered in upper loop.
    for (let i = 1; i < n; i++) {
        let c = A[0].length - 1; // last column
        let r = i;
        ans.push([]); // n-1 will be inserted into output array by this for loop
        while (r < n && c >= 0) {
            ans.at(-1).push(A[r][c]); // check
            r++;
            c--;
        }
    }

    //The vacant spaces in the grid should be assigned to 0.
    for (let i = 0; i < ans.length; i++) {
        let m = ans[i].length;
        let j = m;
        while (j < n) {
            ans[i].push(0); // If ith element have
            j++;
        }
    }
    console.log(ans)
}

// TC - O(n * n) = O(n^2)
const arr13 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
antiDiagonal(arr13)

const arr14 = [
    [1, 2],
    [3, 4]
]
antiDiagonal(arr14)


// This is another way but out array element indexing is different. check by running
function antiDiagonalSecondWay(A) {
    console.log('antiDiagonalSecondWay :', A);
    let out = [];
    let n = A.length; // number of rows
    let outArrayRows = 2 * n - 1; // new output array size will be  (2*n - 1) * n.
    for (let i = 0; i < outArrayRows; i++) {
        out.push([]);
        for (let j = 0; j < n; j++) { // push n items and initialize with 0
            out[i].push(0);
        }
    }

    let m = A[0].length; // number of columns
    // Fill first m rows of out array
    for (let k = 0; k < m; k++) {
        let i = 0;
        let j = k;
        while (i < n && j >= 0) {
            out[k][j] = A[i][j];
            j--;
            i++;
        }
    }
    // Fill next rows of out array.
    for (let k = 1; k < n; k++) {
        let i = k;
        let j = m - 1;
        while (i < n && j >= 0) {
            out[k + m - 1][j] = A[i][j];
            j--;
            i++;
        }
    }
    console.log(out);

}

console.log(antiDiagonalSecondWay(arr13))



/***************************** */

//! Rotate matrix 90 degree anticlockwise - TODO

/**
 * [ [1, 2], [3, 4] ]
 * Rotated matrix anticlockwise - [ [2, 4], [1, 3] ]
 */

//! Reverse Matrix - TODO

/**
 * [ [1, 2], [3, 4] ]
 * Reverse matrix Output > [ [2, 1], [4, 3] ]
 */