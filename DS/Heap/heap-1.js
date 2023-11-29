
//! https://www.scaler.com/topics/data-structures/heap-data-structure/

/*

* heap data structure are a special kind of tree data structure that follow the under-given conditions:

1. The given tree should be a complete binary tree.

2. It should satisfy the heap property. It means that all the children of a given node must be greater
 than the parent node, or all the children must be smaller than the parent node.


? What are Complete Binary Trees?

A complete binary tree is a binary tree in which all the elements are arranged without missing any sequence.
In a complete binary tree –
All the levels are completely filled except the last level that may or may not be completely filled.
Elements are filled from left to right.


* Min-Heap − Where the value of the root node is less than or equal to either of its children.

* Max-Heap − Where the value of the root node is greater than or equal to either of its children.

*/

/*
@ Complexity of Heap Data Structure

 Get Max or Min Element - O(1)

Remove Max or Min Element - O(Log n)

Insert an Element - O(Log n)

*/

/*
 ! How to know that given binary tree is Complete or Not?

        A
     /     \
    B       C
          /   \
         D    E


Let's represent this tree as an array.

[A, B, C, -, -, D, E]     (-) it means empty space.


In the above-given diagram of the array, there are empty spaces in between the elements.
Therefore, according to the definition of a complete binary tree, we can say that
the above-given tree is not a complete binary tree.

*/

/*
          3
        /    \
      5       10
    /   \    /  \
   6     8  12  13
  / \  /  \
 10 12 15 11

@ array representation of the above tree

[3, 5, 10, 6, 8, 12, 13, 10, 12, 15, 11]

* Left Child of a Node = 2*i + 1

* Right Child of a Node = 2*i + 2

* Parent of a Node = (i - 1) / 2



*/



//! Heap Data Structure Operations

// Insertion in Heap

/*
Let us take an example and we have an array like [ 10, 8, 5, 15, 6 ]

1. Take first element (10) and insert into tree.
2. Now take second element (8) and make it left child of 10. Why left child because we have to maintain complete binary tree property.
3. Now take third element (5) and make it right child of 10.
4. Till now, max element is 10 and that is on root level so it is following max heap property.
5. Now take 15, and make left child of 8.
6. Here 15 is greater then its parent node (8) that is breaking rule of max heap. So to maintain it we have to swap 8 with 15.
7. So now 15 is parent and 8 is its left child.
8.But still 15 is greater then (10) so again swap 15 with 10.
9. Now 15 will reach to root level and 10 will becomes its left child.
10 we have to follow this swap process using recursion until elements are arranged in max heap.
11. Now pick last element 6 and make it right child of 10.

@ important note -

One thing to note here is that a comparison is done each time an element is added.
The number of comparisons also depends on the height of the tree. In the above case, a total of 5 comparisons were made.
This results in a time complexity of O(nlog(n)) since the height of a binary tree is log(n).

*/


/*
? What is Heapify?

Heapify is the process of rearranging the elements to form a tree that maintains the properties of the heap data structure.

In the above insertion process, we have seen that insert took O(nlog(n)) time. Because we were taking element one by one, adding into tree & checking elements each time when new added.
In Heapify, We directly started processing given array. We treat given array as complete binary tree. We start comparison from leaf nodes to its parent node using recursion until all elements arranged in max heap or min heap.
*/


function maxHeap(arr) {
    let size = arr.length;
    for (let j = size - 1; j >= 0; j--) {
        heapify(arr, j);
    }

    function swap(arr, a, b) {
        [arr[a], arr[b]] = [arr[b], arr[a]];
    }

    function heapify(arr, i) {
        let p = Math.floor((i - 1) / 2);
        if (p) {
            if (arr[p] < arr[i]) {
                // swap
                swap(arr, p, i);
                heapify(arr, p);
            }
        }

    }

    return arr;

}

console.log((maxHeap([10, 8, 5, 15, 6])))