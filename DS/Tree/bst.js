//! Binary serach tree

/*
> A binary search tree (BST) is a sorted binary tree, where we can easily search for any key using the binary search algorithm.
> In BST Left sub tree nodes are smaller then parent node and  right sub tree nodes are greater then parent node.
> Binary Search Trees, as you can see, is composed of two main programming aspects; Binary Search and Trees.

     5
    / \
   3   8
  / \ / \
 1  4 7  9

* Duplicate values-

> If we want to store only unique values in our Binary Search Tree, then ignore duplicate value  if that value is being inserted..
> If we have to store duplicate value as well then insert in either the left or the right subtree but not in both.


* Complexity of binary search tree algorithm
Insertion : O(n)

Searching O(h) (h: Height of the binary search tree)
    Range of this h could be n in worst case. Below is tree structure.
    1
     \
      2
       \
        3
         \
          4
    In Balance tree, it could be O(logn).

Deletion : O(n)

Space C => O(1)
*/


/*
? Advantages of Binary Search Trees

> Unlike Binary Search, which works only for a fixed data set, Binary Search Trees can be used for dynamic data sets as well.
> It can be used to find the sorted order of a dynamic data set.
> If elements are inserted/deleted randomly, it is actually faster to do it in a binary search tree than in linked lists and arrays.

*/

//! Node Structure

class Node {
    data; // any type
    left; // type of left is also a Node
    right; // type of right is also a Node

    constructor(data) {
        this.data = data;
        this.left = null; // left contains address of Left tree.
        this.right = null; // Right contains address of Right tree.
    }

}



//! Searching

function bstSearch(root, value) {
    if (root == null) {
        return null;
    }
    let curr = root;
    // If value is less then current node then go to left else go to right.
    while (curr != null) {
        if (curr.data == value) {
            return curr;
        }
        if (value < curr.data) {
            curr = curr.left
        } else {
            curr = curr.right;
        }
    }
    return -1; // value not found

}

//! Find Min data in BST?

// Left Most Node will be Minimum data of BST. Simply go to left until there is no any left and that last left element will be minimum.

//! Find Max data in BST?

// Right most node.

//! BST Insertion

function bstInsert(root, value) {
    if (root == null) {
        let node = new Node(value);
        root = node;
        return root;
    }
    let curr = root;
    let parent; // keep track of parent element where we will finally add our new data when current become null.
    while (curr != null) {
        parent = curr;
        if (value == curr.data) {
            return; // value already exists in tree.
        }
        if (value < curr.data) {
            curr = curr.left;
        } else {
            curr = curr.right;
        }
    }
    if (value < parent.data) {
        parent.left = new Node(value);
    } else {
        parent.right = new Node(value);
    }
    return root;
}

//! Deletion BST

/*
* If X is leaf node - Simply go that node and make its parent pointer to null.
* If X has only 1 child - Then remove X and make X parent's child to X child.
* If X has 2 children - This is complicated case.
    > Search for X
    > Search for max in left sub tree & store in temp OR seach for Min in right sub tree.
    > Replace X with temp.
*/


//! Find max node in left sub tree

/*
1.First node of left sub tree which has its right pointer null, will be Max node in left sub tree.

        10                      10
       /  \                    /  \
      5    12                 5    12
     /                       / \
    4                       4   8

*/

//! Find Max node in left sub tree

function findMaxInLeftSubTree(root) {
    let curr = root.left; // first go to left node
    while (curr.right != null) {
        // Check its right node exists or not, max value could be find in right tree if exists.
        curr = curr.right; // If right node exists then move to right node to find max value.
    }
}


//! Find Min Node in right sub tree

function findMinInRightSubTree(root) {
    let curr = root.right; // first go to right node
    while (curr.left != null) {
        // Check its left node exists or not, because min value could be find in Left tree.
        curr = curr.left; // If left node exists then move to left node to find Min value.
    }
}


//! Deletion Algo

function deleteNodeInBSTWithRecursion(A, B) {
    function run(A, B) {
        if (A == null) return null; //If root is null then return null
        if (B > A.data) {
            A.right = run(A.right, B); // Go to right
        }
        else if (B < A.data) {
            A.left = run(A.left, B); // Go to left
        }
        else {
            // If A is leaf node
            if (A.left == null && A.right == null) {
                return null;
            }
            // If A has only right child
            if (A.left == null) {
                return A.right;
            }
            // If A has only left child
            if (A.right == null) {
                return A.left;
            }
            // When A have 2 children
            var temp = A.left; // finding right most node from left sub tree with below while loop
            while (temp.right != null) {
                temp = temp.right;
            }
            A.data = temp.data; // replace A.data with temp data
            A.left = run(A.left, temp.data); // call again run function and now remove that temp data from tree
        }
        return A;
    }
    return run(A, B);
}

//? Was trying with while loop but we have to check node recursively so not possible with while loop
function deleteNodeInBST(root, value) {
    let curr = root;
    let parent; // keep track of parent to make connection between deleted node's child to its parent.
    //? Step 1 :: Search for that Node
    while (curr != null) {
        parent = curr;
        if (curr.data == value) {
            return curr;
        }
        if (value < curr.data) {
            curr = curr.left;
        } else {
            curr = curr.right;
        }
    }
    if (curr == null) {
        return -1; //  Node does not exists in tree
    }
    //? Step 2 :: If curr is leaf node then simply make it null;
    if (curr.left == null && curr.right == null) {
        curr = null;
        return;
    }
    //? Step 3 :: If curr have only one child.
    if (curr.left || curr.right) {
        if (curr.left) {
            parent.left = curr.left;
        }
        if (curr.right) {
            parent.right = curr.right;
        }
    }

    //? Step 4 :: If curr have 2 children, then check If left sub tree exists then Find Max node from there
    let maxNode = findMaxInLeftSubTree(curr);

    maxNode.left = curr.left;
    maxNode.right = curr.right;
    curr = maxNode;
    return root;

}



//! Sorted Array To Balanced BST


/*
Input:  A : [1, 2, 3, 5, 10]

      3
    /   \
   2     5
  /       \
 1         10
*/

// TC - O(n) and SC = O(logn)
function constructBalancedTree(arr, start, end) {
    if (start > end) {
        return null;
    }
    const mid = (start + end) / 2; // Find out mid element
    const node = new Node(arr[mid]); // Create a node based on mid element
    node.left = constructBalancedTree(arr, 0, mid - 1); // recursive call same approach
    node.right = constructBalancedTree(arr, mid + 1, end);
    return node;
}
// Space complexity is logn because we are dividing array into two parts in each iteration.



//@ https://www.scaler.com/topics/check-for-bst/
//!  Valid Binary Search Tree


/*
                3
               / \
              2   5
             / \   \
            1   4   6

? There are 2 Solutions


* 1. Traverse InOrder and create InOrder array. And If that array is sorted this tree is valid. TC - O(n) & SC - O(H)
* 2.
        Node.data < all Nodes in right sub tree
        Node.data > all nodes in left sub tree
*/

// TC = O(n) & SC - O(h)
function validBinaryTree(A) {
    let isBST = true; // Initially assueme tree is valid
    function check(A) {
        if (A == null) { // If node is null then return max value as Min Int and min value as Max Int.
            return { max: Number.MIN_SAFE_INTEGER, min: Number.MAX_SAFE_INTEGER };
        }
        let left = check(A.left); // check for left side tree
        let right = check(A.right); // once left side tree traversed then check for right sub tree

        // If Node data is less then left side maximum node OR Node data greater then right side minimum node then tree is invalid
        if (A.data <= left.max || A.data > right.min) {
            isBST = false;
        }
        let max = Math.max(left.max, right.max); // Max node value at given node
        let min = Math.min(left.min, right.min); // Min node value at given node

        return { max: Math.max(A.data, max), min: Math.min(A.data, min) } // return max value
    }
    check(A);
    if (isBST) { // Once complete tree traversed, then check for isBST variable.
        return 1;
    } else {
        return 0;
    }

}

/*
? Dry Run of above solution

    1
   /
  10
  / \
2    11

> Start from root node 1 and check for its left. Left exist so move to left until left does not null.
> So Node 2 has its left child null.
> Now when Node is null then return a object {max: Min_Value, min: Max_value};
> Now check for right side tree and Node 2 has right child null as well. So same return a object {max: Min_Value, min: Max_value};
> At Node 2, max value from left sub tree is MAX_Value & min value from right sub tree is MIN_Value.
> 2 is < Max_Value and 2 is > MIn_Value, means at this point tree is valid.
> Now node 2 will return max and min value to its parent node that is 10. Compare node value to max and min.
> And at 10, Max and Min value from left subtree is 2.
> Same as all above, at node 10, Max and Min value from right sub tree is 11.
> Now compare max values and min values and node value and find Max and Min for node 10 which will be paas to 1.
> At 1, max value is 11 and min value is 2.
> Here 1 is < then 11 and that fails attribute of BST, so here isBST is false.
> Once all node traversed, return from function and then check isBST.



*/