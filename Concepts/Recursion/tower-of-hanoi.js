
// https://www.scaler.com/academy/mentee-dashboard/class/47653/assignment/problems/15010

//* https://www.scaler.com/topics/tower-of-hanoi/

/*
In the classic problem of the Towers of Hanoi, you have 3 towers numbered from 1 to 3 (left to right) and A disks numbered from 1 to A (top to bottom) of different sizes which can slide onto any tower.
The puzzle starts with disks sorted in ascending order of size from top to bottom (i.e., each disk sits on top of an even larger one).

? You have the following constraints:

Only one disk can be moved at a time.
A disk is slid off the top of one tower onto another tower.
A disk cannot be placed on top of a smaller disk.

You have to find the solution to the Tower of Hanoi problem.

You have to return a 2D array of dimensions M x 3, where M is the minimum number of moves needed to solve the problem.
In each row, there should be 3 integers (disk, start, end), where:

disk - number of disk being moved
start - number of the tower from which the disk is being moved
stop - number of the tower to which the disk is being moved


Input > A = 2
Output >
[1 1 2 ] [2 1 3 ] [1 2 3 ]
*/

//* APPROACH-

/*

- One observation is at each step, we are moving one disk only from one tower to another and we have to repeat same for all disk while all does not placed to destination tower.
- So we can use recursion to solve the Tower of Hanoi problem.


? Algorithm: Below is the algorithm which is used for the Tower Hanoi problem.

Lets take some constraints-

N = number of disk
S = Source tower
D - destination tower
H - Helper tower

Firstly, shift the n-1 number of disks from S to H, using D.
Secondly, shift the last disk from S to D.
Third step is to shift the n-1 number of disks from H to D, using S.

? Read below article-
https://www.scaler.com/topics/tower-of-hanoi/


*/

//! Print each Movement of disk

/**
 *
 * @param {*} N - number of disks
 * @param {*} S - source tower
 * @param {*} D - destination tower
 * @param {*} H - Helper tower
 * @returns - Print each movements
 */
function towerOfHanoi(N, S, D, H) {
    if (N == 0) {
        return;
    }
    towerOfHanoi(N - 1, S, H, D); // source to helper
    console.log('Moved disk ', N, 'From ', S, 'TO ', D);
    towerOfHanoi(N - 1, H, D, S); // helper to destination
}
towerOfHanoi(3, 'S', 'D', 'H');


//! Return array that have all movements

function solve(N, S, D, H) {
    const arr = [];
    function towerOfHanoi(N, S, D, H) {
        if (N == 0) {
            return;
        }
        towerOfHanoi(N - 1, S, H, D);
        arr.push([N, S, D]);
        towerOfHanoi(N - 1, H, D, S);
        return arr;
    }
    return towerOfHanoi(N, S, D, H);
}
console.log(solve(2, 1, 3, 2)); // [1 1 2 ] [2 1 3 ] [1 2 3 ]
console.log(solve(3, 1, 3, 2)); // [1 1 3 ] [2 1 2 ] [1 3 2 ] [3 1 3 ] [1 2 1 ] [2 2 3 ] [1 1 3 ]


//! Understand time complexity

/*
* No. Of Disks    Steps       Explanation
N = 1             1       toh(1 - 1) + 1 + toh(1 - 1) = 0 + 1 + 0 = 1  (Direct will move from S to D)
N = 2             3       toh(n-1) + 1 + toh(n-1) => toh(1) + 1 + toh(1) = 1 + 1 + 1 = 3
N = 3             7       toh(2) + 1 + toh(2) = 3 + 1 + 3 = 7 => as per previos call we know toh(2) = 3
N = 4             15      toh(3) + 1 + toh(3) = 7 + 1 + 7 = 15
..
..
..

* Based on above calculation , lets see number of execution

Disks Steps Number of executions
1       1       2^1 - 1
2       3       2^2 - 1
3       7       2^3 - 1
4       15      2^4 - 1
..
..
n               2^n - 1

@ So TC is => O(2^n)

@ Space complexity: O(N)
    - Auxiliary stack space used during recursion for the Tower of Hanoi problem.

*/
/*
*  DRY RUN OF ALGORITHM

    towerOfHanoi(3, S, D, H)
        towerOfHanoi(2, S, H, D)
            towerOfHanoi(1, S, D, H)
                towerOfHanoi(0, S, D, H)
                    RETURN
            print(1, S, D)
            towerOfHanoi(0, H, D, S)
                RETURN
        print(2, S, H);
        towerOfHanoi(1, D, H, S)
            towerOfHanoi(0, D, S, H)
                RETURN
        print(1, D, H);
        towerOfHanoi(0, S, H, D)
                RETURN
    print(3, S, D)
    towerOfHanoi(2, H, D, S)
        towerOfHanoi(1, H, S, D)
            towerOfHanoi(0, H, D, S)
                RETURN
        print(1, H, S);
        towerOfHanoi(0, D, S, H)
                RETURN
    print(2, H, D);
    towerOfHanoi(1, S, D, H)
        towerOfHanoi(0, S, D, H)
            RETURN
    print(1, S, D);
    towerOfHanoi(0, H, D, S)
        RETURN

*/