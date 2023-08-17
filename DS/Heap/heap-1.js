
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


/*
? What is Heapify?

Heapify is the process of rearranging the elements to form a tree that maintains the
properties of the heap data structure.




*/