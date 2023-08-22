

//! Nearest Smaller Element


/* Given an array A, find the nearest smaller element in Left side for every element.

j < i       => smaller element index should be less then element
A[j] < A[i]

Input => [1, 3, 15, 10, 3, 2 ]

Output = [-1, 1, 3, 3,  1, 1 ];

*/

// TC  - O(n^2) and SC =  O(1)
function findNearestSmaller(A) {
    console.log('findNearestSmaller :', A);
    let min = A[0];
    let out = [];
    out.push(-1); // there is nothing left side for First element of array,  so put -1.
    for (let i = 1; i < A.length; i++) {
        // If ith element is greater then min value means, at least smaller value exits.
        if (A[i] > min) {
            let j = i - 1;
            // Find nearest smaller using while loop
            while (A[j] >= A[i]) {
                j--;
            }
            out.push(A[j]);
        } else {
            min = A[i]; // update min value
            out.push(-1);
        }
    }
    return out;
}

console.log(findNearestSmaller([1, 3, 15, 10, 3, 2])) //[-1, 1, 3, 3,  1, 1 ];
console.log(findNearestSmaller([1, 3, 3, 3, 3, 3])) //[-1, 1, 1, 1,  1, 1 ];


/*
* Optimized Approach Using Stack in O(1) time.

Why Stack? Because Here we need nearest smaller value. We can also say like most recent smaller value. Right.
And stack is a data structure that pop always most recent value.

- First item does not have any smaller so push -1 for that in output.
- Push first value in stack as well. Because that can be a smaller value for next items.
- Start a For loop from index 1 to length.
- If stack last item is less the the current ith item.
    - means stack last item will be answer for that ith value.
    - Now push ith item into stack because that can be smaller for any next large value.
- If stack last item is greater then current ith item.
    - then stack last value will not be answer for that ith item.
    - Now We have to pop that value from stack and check next nearest value.
    - Pop from stack until you find smaller value then the ith item.
    - Once you find smaller then stop popping and add that value into answer.
    - In case no value smaller and stack become empty then push -1 in answer for that ith item.
    - Last push ith item to stack because that can be answer for next larger value.

@ Key point-

Lets take an arr =     [3, 5, 10, 5, 11, 4]
Final answer will be = [-1, 3, 5, 3, 5, 3]

Understand for 3rd index. A[3] = 5.
Till now values will be in stack =  [3, 5, 10]

Now stack[top] > A[3] - remove 10 from stack.

? But before removing 10, How can we sure that 10 will not be answer for any next larger value?

- So we just compared stack top item with current ith item that is 5.
- And we can see that 5 is less then 10.
- Means for any larger value by 10, answer will be 5 because 5 is already smaller then 10.
- So for next larger values, we have 5, then no meaning of value 10. thats why we are sure and remove it.


@ This code also have internal while loop, but that will take only O(1) time. Because that is running on stack, not on array.length.
Suppose for any ith value, all values pop out from stack. that will run for nth time but For next i+1 value that will now run only for 1 time.
Example : suppose at a point we have stack = [1,2,3,4,5,6]
And now ith value comes that is 1.
So all values from stack will be popped out. It will run till stack length.
But for next i+1 value there will be only a single value in stack that will be ith value 1.
*/




// TC  - O(n) and SC =  O(n)
function findNearestSmallerUsingStack(A) {
    console.log('findNearestSmallerUsingStack :', A);
    let s = []; // stack
    let out = [];
    s.push(A[0]);
    out.push(-1);
    for (let i = 1; i < A.length; i++) {
        if (s[s.length - 1] < A[i]) {
            out.push(s[s.length - 1]);
            s.push(A[i]);
        } else {
            let j = s.length - 1;
            while (s.length >= 0 && s[j] >= A[i]) {
                s.pop();
                j--;
            }
            s.length ? out.push(s[s.length - 1]) : out.push(-1);
            s.push(A[i]);
        }

    }
    return out;
}

console.log(findNearestSmallerUsingStack([1, 3, 15, 10, 3, 2])) //[-1, 1, 3, 3,  1, 1 ];
console.log(findNearestSmallerUsingStack([1, 3, 3, 3, 3, 3])) //[-1, 1, 1, 1,  1, 1 ];
console.log(findNearestSmallerUsingStack([3, 5, 10, 5, 11, 4])) //[-1, 3, 5, 3, 5, 3]


//! Largest Rectangle in Histogram

/* Given an array of integers A.
A represents a histogram i.e A[i] denotes the height of the ith histogram's bar. Width of each bar is 1.

Find the area of the largest rectangle formed by the histogram.

A = [2, 1, 5, 6, 2, 3]
output: 10
*/

//@ ProblemImagesView\rectangle-Histogram.jpg

/*
A = [2, 1, 5, 6, 2, 3]

Graphical representation of given array -

 |          ___
6|      ___|   |
5|     |   |   |
4|     |   |   |    ___
3|__   |   |   |___|   |
2|  |__|   |   |   |   |
1|__|__|___|___|___|___|__
  0  1   2   3   4   5

* We have to find every possible rectangle on ith item and then found max of all.

- Lets find rectangle at 2nd index
    - In left side, Can 0th and 1st index item be part of rectangle with item 2nd. = NO because 0th and 1st wall height are small then 2nd, so that can not be part of rectangle formed on item 2nd.
    - In Right side, item 3rd can form rectangle with item 2nd. Because wall height of item 3rd are greater then 2nd. Means there is a top base available to create rectangle shape.
    - 4th and 5th on right side will not be option because they are small then 2nd.
    - Area => Height on 2nd index = 5 and total bar width = 2 (2 bar included 2nd and 3rd) = 5 * 2 = 10

- With same above algorithm, find area at each index by checking left and ride side.
*/

// TC  = O(n^2) :: We can optimize this by using findNearestSmallerUsingStack way.
function largestRectangleArea(A) {
    console.log('largestRectangleArea :', A);
    let maxArea = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < A.length; i++) {

        let l = i - 1;
        let r = i + 1;
        while (l >= 0 && A[l] >= A[i]) {
            l--;
        }
        while (r < A.length && A[r] >= A[i]) {
            r++;
        }
        let area = A[i] * (r - l - 1);
        if (area > maxArea) {
            maxArea = area;
        }
    }
    return maxArea;

}
console.log(largestRectangleArea([2, 1, 5, 6, 2, 3])) // 10
console.log(largestRectangleArea([8, 6, 2, 5, 6, 5, 7, 4])) // 20
console.log(largestRectangleArea([1, 3, 3, 2])) // 20



//! Sort stack using another stack

/* Given a stack of integers A, sort it using another stack.

Return the array of integers after sorting the stack using another stack.

 A = [5, 17, 100, 11]

 Output
 [5, 11, 17, 100]
*/

// TC  - O(n^2)
function sortStackUsingStack(A) {
    console.log('sortStackUsingStack :', A);
    let stack = []; // another stack

    while (A.length > 0) {
        let topA = A.pop();
        if (!stack.length) {
            stack.push(topA);
        } else {
            // If stack top value is less then current value then push current value.
            // If current value is less then stack top value, then pop items from stack and push into input stack until found equal or less value.
            let stackTop = stack[stack.length - 1];
            if (topA >= stackTop) {
                stack.push(topA);
            } else {
                let j = stack.length - 1;
                while (j >= 0 && stack[j] > topA) {
                    A.push(stack.pop());
                    j--;
                }
                stack.push(topA);
            }
        }
    }
    return stack;
}
console.log(sortStackUsingStack([5, 17, 100, 11]))


//! Maximum Rectangle

/*
Given a 2D binary matrix of integers A containing 0's and 1's of size N x M.

Find the largest rectangle containing only 1's and return its area.

Note: Rows are numbered from top to bottom and columns are numbered from left to right.

Input 1:
    A = [   [0, 0, 1]
            [0, 1, 1]
            [1, 1, 1]   ]
Output 1:
    4
*/

// TC  = O(n * m) :: First for loop taking n * m time, and second for loop to calculate area also taking n * m time. 
function maximumRectangles(A) {
    console.log('maximumRectangles :', A);
    let n = A.length;
    let m = A[0].length;
    let maxArea = 0;
    let heights = [];
    // For each rows - at any element, width is like number of continuous 1's in the row.
    // For each rows - at any element, height is like number of continuous 1's towards top of that element.
    // So we will calculate height of each element and save that into heights array.
    for (let i = 0; i < n; i++) {
        heights.push([]);
        for (let j = 0; j < m; j++) {

            if (A[i][j] == 1) {
                let h = 1;
                if (i > 0) {
                    h = heights[i - 1][j] + 1; // adding previous top height on same element
                }
                heights[i][j] = h;
            } else {
                heights[i][j] = 0; // make height 0 for item 0
            }
        }
    }

    //console.log(heights);

    // process area based on received heights of each row.
    //[1, 2, 2, 1, 1]

    for (let i = 0; i < heights.length; i++) {
        const row = heights[i];
        for (let j = 0; j < row.length; j++) {
            if (row[j] == 0) {
                continue;
            }
            // Find nearest smaller in left and pick just its previous element
            let l = j - 1;
            while (l >= 0 && row[l] >= row[j]) {
                l--;
            }
            let LeftIndex = l + 1; // increase l by 1 for correct index

            // Find nearest smaller in right side
            let r = j + 1;
            while (j < row.length && row[r] >= row[j]) {
                r++;
            }
            let rightIndex = r - 1; // decrease by 1 for correct index

            // Area  = height * weight
            // height = Element value, Width - Diff of right and left index values
            let area = row[j] * (rightIndex - LeftIndex + 1);
            if (area > maxArea) {
                maxArea = area;
            }
        }

    }
    return maxArea;
}

const a = [
    [0, 0, 1],
    [0, 1, 1],
    [1, 1, 1]
]

console.log(maximumRectangles(a))

const b = [[0, 1, 0, 1],
[1, 0, 1, 0]]

console.log(maximumRectangles(b))
/* 
if (s[s.length - 1] < heights[i][j]) {
                s.push(heights[i][j]);
                out.push(s.length - 1);
            } else {
                let j = s[s.length - 1];
                while (j >= 0 && s[j] >= heights[i][j]) {
                    s.pop();
                    j--;
                }
                s.length ? out.push(s.length - 1) : out.push(-1);
                s.push(heights[i][j]);
            } */