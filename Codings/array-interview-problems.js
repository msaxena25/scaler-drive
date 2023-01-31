//! Merge Overlapping Intervals

// Given a collection of intervals, merge all overlapping intervals.

/*
Constraints-
1 <= Total number of intervals <= 100000.

Input Format
First argument is a list of intervals.

Output Format
Return the sorted list of intervals after merging all the overlapping intervals.

Input- [1,3],[2,6],[8,10],[15,18]
Output- [1,6],[8,10],[15,18]
*/

//* Overlapping condition- If Current interval begins before or equal to previous ends.

/*
@ Steps-

1. Sort intervals based on starting time so that we can easily check overlapping
2. Take first item and keep in a variable named 'prev'
3. Now loop over from index 1
4. If interval overlapped then update prev element with newly values. (in every iteration compare prev to current item)
   * If current item start is less then or equal to previous item end, it means interval are overlapped. 
    - Example:
        Prev = [2, 6], Current = [3, 8]
        Now Prev will be = [2, 8]
5. If item is not overlapped then push this prev item into result array & update 'prev' to current item
6. At last there will be an item into prev variable so push that as well into result array
*/

function mergeOverlappingInterval(A) {
    console.log('mergeOverlappingInterval :', A);
    // first sort interval based on starting time.
    A.sort((a, b) => a[0] - b[0]);
    let res = [];
    let prev = A[0]; // take first item
    for (let i = 1; i < A.length; i++) {
        if (A[i][0] <= prev[1]) {
            prev = [Math.min(prev[0], A[i][0]), Math.max(prev[1], A[i][1])];
        }
        else {
            res.push(prev);
            prev = A[i];
        }
    }
    res.push(prev);
    console.log(res)
    return res;
}

// TC - O(nlogn), SC- O(n)

mergeOverlappingInterval([[1, 3], [2, 6], [8, 10], [15, 18]]) // [1, 6], [8, 10], [15, 18]
mergeOverlappingInterval([[6, 100], [3, 20], [22, 50], [1, 18]]) //[1, 100]


//! . Merge Intervals

/*
Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary).

You may assume that the intervals were initially sorted according to their start times.


Input 1:
Given intervals [1, 3], [6, 9] insert and merge [2, 5] .

Output - [ [1, 5], [6, 9] ]

*/

//! TODO not working right now
function mergeNewInterval(intervals, new_interval) {
    console.log('mergeNewInterval :', new_interval);
    let res = [];
    let intervalChanged = false;
    for (let i = 0; i < intervals.length; i++) {
        if (new_interval[0] <= intervals[i][1] && new_interval[1] >= intervals[i][0]) {
            new_interval = [Math.min(new_interval[0], intervals[i][0]), Math.max(new_interval[1], intervals[i][1])];
            intervalChanged = true;
        } else {
            if (intervalChanged) {
                res.push(new_interval);
                intervalChanged = false;
            }
            res.push(intervals[i]);
        }
    }
    if (!intervalChanged) {
        res.push(new_interval);
    }
    console.log(res)
    return res;
}
mergeNewInterval([[1, 3], [6, 9]], [2, 5]) // [ [1, 5], [6, 9] ]
mergeNewInterval([[1, 3], [6, 9]], [0, 2]) // [ [0, 3], [6, 9] ]
mergeNewInterval([[1, 3], [6, 9]], [2, 6]) // [1, 9]
mergeNewInterval([[1, 2], [3, 6]], [8, 10]) // [[1, 2], [3, 6], [8, 10] ]
mergeNewInterval([[1, 2], [3, 6]], [10, 8]) // [[1, 2], [3, 6], [8, 10] ]




//!  First Missing Integer

/*
Given an unsorted integer array, A of size N. Find the first missing positive integer.

Note: Your algorithm should run in O(n) time and use constant space.

Problem Constraints
1 <= N <= 1000000
-10^9 <= A[i] <= 10^9

Input 1:
[1, 2, 0]

Input 2:
[3, 4, -1, 1]

Input 3:
[-8, -7, -6]

Output 1:
3
Output 2:
2
Output 3:
1
*/

//? TC- O(n^2) & SC- O(1)

function missingInteger1(A) {
    console.log('missingInteger1 :', A);
    for (let i = 1; i <= A.length; i++) {
        if (!A.includes(i)) {
            return i;
        }
    }
    return A.length + 1;
}
console.log(missingInteger1([-8, -7, -6])) // 1
console.log(missingInteger1([1, 2, 3])) //4
console.log(missingInteger1([1, 2, 0])) // 3
console.log(missingInteger1([3, 4, -1, 1])) //2


//? TC - O(n) & SC - O(n)

/*
@ STEPS-

1. As we know, min positive integer is 1 and max positive integer will be n+1.
2. Example - [1,2,0] => answer will be 3 (first missing positive integer)
3. Take a array named visited of length n + 1 with all initial values False. This array is based on indexing 1.
4. Start loop from 0 to < Array length
5. If array item exists in visited indices then mark that to true.
    example -
        arr = [1,2,0] and visited = [f, f, f, f];
        arr[0] = 1 => visited[1 - 1] = visited[0] exists so mark that true => [t, f, f, f]
        arr[1] = 2 => visited[2 - 1] = visited[1] exists so mark that true => [t, t, f, f]
        arr[2] = 0 => visited[0 - 1] = visited[-1] does not exist so no changes => [t, t, f, f]
6. Finally loop over visited array and return index of first false based on 1 indexing. In the above example ans is 3.

*/

function missingInteger2(A) {
    console.log('missingInteger2 :', A);
    let visited = new Array(A.length + 1).fill(false);
    for (let i = 0; i < A.length; i++) {
        if (visited[A[i] - 1] == false) {
            visited[A[i] - 1] = true;
        }
    }
    //console.log('visited :', visited);
    for (let i = 0; i < visited.length; i++) {
        if (!visited[i]) {
            return i + 1; // 1 indexing
        }
    }

}
console.log(missingInteger2([-8, -7, -6])) // 1
console.log(missingInteger2([1, 2, 3])) //4
console.log(missingInteger2([1, 2, 0])) // 3
console.log(missingInteger2([3, 4, -1, 1])) //2
console.log(missingInteger2([0])) //1


//! Understanding of indexing 1 array concept-


/*
@ Understanding of indexing 1 array concept-

Suppose we have array with values 1 to 8

arr = [1, 2, 3, 4, 5, 6, 7, 8]
i   =  0  1  2  3  4  5  6  7

Means If i = 0 then value is 1
      If i = 1 then value is 2
      If i = 7 then value is 8.

      If value is 1 then i will be 0
      If value is 2 then i will be 1
      If value is 8 then i will be 7

*/

//* Solved same above problem in TC - O(n) & SC - O(1) using SWAP technique

/*
@ Explanation of swap technique-

arr =           [8, 3, -2, 7, 1, 6, 2]
indices =        0  1   2  3  4  5  6

i = 0 , A[0] = 8, A[8-1] = A[7] does not exist so no change at index 0. (did 8 - 1 because array start from 0)

i = 1, A[1] = 3, A[2] = -2 , so lets do swap
                [8, -2, 3, 7, 1, 6, 2]

After performing swap operation we have to check that ith element again so did i--

Again check for i = 1, A[1] = -2 => that is not in range of 1 to n so no change here.

i = 2, A[2] = 3, A[3-1] = 3, so here values are same so no change

i = 3, A[3] = 7, A[7-1] = A[6] = 2, lets swap and check again for i = 3
                [8, -2, 3, 2, 1, 6, 7]

i = 3, A[3] = 2, A[2- 1] = A[1] = -2 so lets swap and chek for i = 3 again
                [8, 2, 3, -2, 1, 6, 7]
i = 3 and A[3] = -2, so value is less then 0 so no change , move i to next.

i = 4 and A[4] = 1 , A[1 - 1] = A[0] = 8 , lets swap and again check for same ith value
                [1, 2, 3, -2, 8, 6, 7]
i = 4, A[4] = 8, that is greater then array.length so no change

i = 5, A[5] = 6, A[6-1] = A[5] = 6, so values are same then no change, continue i value to next

i = 6, A[6] = 7, A[7 - 1] = A[6] = 7 so again values are same so no change.

loop end.

Final arr is => [1, 2, 3, -2, 8, 6, 7]

Now loop over this array and check each index with condition A[i] != (i + 1) // i + 1 because array start from 0 & values are from 1.
return i + 1 where above condition is true.

So here ans is 4.

*/

function missingInteger3(A) {
    console.log('missingInteger3 :', A);
    for (let i = 0; i < A.length; i++) {
        let el = A[i];
        if (el > 0 && el <= A.length) { // can be - min value 1 and max value n + 1
            let position = el - 1;
            if (A[position] == el) continue; // means element placed at right position.
            [A[i], A[position]] = [A[position], A[i]]; // swap
            i--; // after swapping , recheck ith value again so did i--.
        }
    }
    console.log(A)
    for (let i = 0; i < A.length; i++) {
        if (A[i] != i + 1) {
            return i + 1;
        }
    }
    return A.length + 1; // if all items exists from 1 to n then n + 1 will be answer.
}
console.log(missingInteger3([-5, 3, 10, 8, 1, 2, 4, -3]))
console.log(missingInteger3([8, 3, -2, 7, 1, 6, 2])); //4
console.log(missingInteger3([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 20])) //18

const arr = [699, 2, 690, 936, 319, 784, 562, 35, 151, 698, 126, 730, 587, 157, 201, 761, 956, 359, 198, 986, 915, 7, 703, 324, 814, 382, 294, 204, 120, 731, 615, 330, 486, 52, 223, 376, 649, 458, 564, 971, 72, 605, 177, 20, 461, 790, 872, 363, 916, 435, 991, 184, 410, 320, 16, 480, 768, 801, 117, 338, 650, 786, 17, 369, 979, 304, 445, 688, 862, 229, 311, 351, 985, 697, 135, 299, 310, 3, 643, 221, 831, 196, 887, 679, 484, 209, 824, 292, 588, 721, 140, 675, 827, 913, 271, 170, 812, 552, 334, 860, 981, 550, 308, 584, 442, 328, 251, 456, 976, 31, 507, 954, 982, 742, 45, 727, 794, 309, 527, 623, 56, 843, 436, 681, 143, 130, 689, 870, 362, 580, 560, 474, 385, 525, 881, 51, 890, 917, 820, 826, 139, 443, 978, 144, 512, 205, 682, 188, 344, 429, 497, 181, 749, 864, 664, 145, 621, 629, 886, 572, 89, 725, 945, 29, 553, 977, 783, 590, 236, 728, 125, 90, 492, 261, 543, 259, 662, 622, 285, 392, 561, 670, 200, 504, 246, 513, 910, 583, 460, 179, 207, 709, 127, 926, 816, 426, 520, 174, 464, 883, 780, 5, 268, 606, 1, 109, 704, 391, 661, 924, 516, 241, 477, 952, 405, 522, 247, 335, 356, 839, 423, 779, 4, 43, 720, 238, 965, 951, 914, 10, 496, 775, 651, 788, 373, 491, 746, 799, 518, 93, 86, 774, 652, 955, 494, 252, 781, 946, 412, 202, 741, 719, 612, 673, 896, 1000, 289, 554, 69, 424, 980, 506, 593, 889, 25, 959, 28, 736, 8, 969, 865, 657, 567, 434, 9, 167, 357, 929, 645, 250, 565, 94, 928, 473, 509, 823, 313, 762, -1, 208, 903, 922, 655, 948, 326, 485, 150, 73, 505, 225, 122, 129, 648, 838, 811, 972, 735, 78, 428, 740, 782, 632, 316, 440, 737, 297, 873, 281, 479, 654, 0, 633, 212, 152, 154, 470, 866, 79, 722, 958, 732, 900, 832, 278, 58, 842, 745, 540, 169, 347, 592, 438, 882, 462, 53, 34, 519, 489, 85, 757, 919, 701, 15, 211, 667, 637, 74, 573, 240, 559, -2, 472, 203, 112, 162, 776, -4, 155, 837, 99, 98, 64, 101, 983, 366, 853, 970, 482, 40, 921, 374, 758, 413, 339, 705, 771, 360, 734, 282, 219, 766, 535, 133, 532, 254]

//arr.sort((a, b) => a - b);
//console.log(arr)


console.log(missingInteger3(arr))