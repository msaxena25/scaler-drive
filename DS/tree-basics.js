
/*

@ What is Tree?

The tree is a hierarchical data structure that is defined as a collection of nodes.

@ What is Binary tree?

A binary tree is a tree data structure(we shall add a link to the tree article here) whose all nodes have either zero, one, or at most two children nodes. These two children are generally referred to as left and right child respectively.

@ Root node & leaf node?

The top-most node is known as the root node, while the nodes with no children are known as leaf nodes.

*/

//! Terminologies in Binary Trees

/*

1. Nodes - Nodes are the building blocks of any data structure. They majorly contain some data and link to the next/previous nodes. In the case of binary trees, they contain the address of the left and the right child respectively.

2. Root - The topmost node in a tree is known as the root node. A tree can have at most one root node.

3. Parent Node - A node (except the root) that has a succeeding node is known as a parent node.

4. Child Node - A node that has a preceding node is known as a child node. A node can be both parent and child depending on the node that is in context.

5. Leaf Node - A node with no children.

6. Internal Node - A node that has at least one child node is known as an internal node.

7. Depth of a Binary Tree - The number of edges from a node in the tree to the root node. (Top to bottom)

8. Height of a Binary Tree - The number of edges from the deepest node in the tree to the root node. (Bottom to top)

*/

//! Lets design a Node Class

class Node {
    data; // any type
    left; // type of left is also a Node
    right; // type of right is also a Node

    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }

}

//@ left contains address of Left tree. Right contains address of Right tree.


//! Tree Traversal

/*
Traversal of a tree means visiting and outputting the value of each node in a particular order.
Trees are organized through relationships or hierarchies. This allows us to traverse them in multiple ways.

*inorder traversal of binary tree
*preorder traversal of binary tree
*post order traversal of binary tree

*/

//! Pre-Order || DLR  || Data-Left-Right

/*
@ Pseudo code-

function preorder(node) {
    if(node == null) {
        return;
    }
    print(node.data);
    preorder(node.left);
    preorder(node.right);

}
*/

/*
@ arr = [1, 2, 3]

* Tree Representation-

    [1]
    /\
 [2]  [3]

If we observe carefully we can see that if the parent node is at index i in the array then
the left child of that node is at index (2*i + 1)
and the right child is at index (2*i + 2) in the array.

 */


function createTree(arr, i) {
    if(i > arr.length) {
        return;
    }

    let node = new Node(arr[i]);

    node.left = createTree(arr, 2 * i + 1);
    node.right = createTree(arr, 2 * i + 2);
    return node;


}
console.log(createTree([1, 2, 3, 4, 5, 6, 7]))

function insertNodeInTree(root, data) {


}
let rootNode = insertNodeInTree(1)
insertNodeInTree(rootNode, 2);
