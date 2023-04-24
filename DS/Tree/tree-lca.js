//! LCA  means - Least common ancestor

//! Morris Inorder Traversal || InOrder traversal without stack and recursion

/*
Given a binary tree, return the inorder traversal of its nodes' values.

NOTE: Using recursion and stack are not allowed.

  1
  / \
 6   2
    /
   3

output: [6, 1, 3, 2]
 */

/*
* Appraoch
            1
         /      \
       2          3
     /   \       / \
   4      11    7  8
  / \     /    / \
 5  6    12   9  10



In Order travesal = [5, 4, 6, 2, 12, 11, 1, 9, 7, 10, 3, 8]

Right Most Node => No right children of that node. => [6, 11, 10]

As we can see inorder array that we need 2 after 6, 1 after 11 and 3 after 10.
Right pointer of these nodes 6 11 and 10 are null and that is useless. So somehow we can create a temporary link between 6 and 2, 11 and 1, 3 and 10.

Temporary Right Pointer Links => 5 ---> 4, 6 ---> 2, 12 ---> 11, 11 ---> 1, 9 ---> 7, 10 ---> 3
*/

//? https://www.scaler.com/topics/morris-traversal/