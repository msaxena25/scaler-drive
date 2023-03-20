
//! Binary Tree Visual diagrams with algo
// https://visualgo.net/en/bst

/*

@ What is Tree?

The tree is a hierarchical non-linear data structure that is used to organize, store, and manipulated the data efficiently.

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

7. Depth of a Binary Tree (Is also called Level) - The number of edges from a node in the tree to the root node. (Top to bottom)

8. Height of a Binary Tree - The number of edges from the deepest node in the tree to the root node. (Bottom to top)

*/

//! Lets design a Node Class

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

//! There are many types of tree data structures. Some of them are:

/*
Binary Trees
Binary Search Trees
B Trees
B+ Trees
AVL Trees
Red-Black Trees
N-ary Trees
Splay Trees, etc.

*/


//! Tree Traversal

//? https://www.scaler.com/topics/tree-traversal-in-data-structures/

/*
Traversal of a tree means visiting and outputting the value of each node in a particular order.
Trees are organized through relationships or hierarchies. This allows us to traverse them in multiple ways.

* inorder traversal of binary tree
* preorder traversal of binary tree
* post order traversal of binary tree
* level order traversal
* bfs
* dfs

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


//! Create a Binary tree from a given array

function createTree(arr, i) {
    let node = null;
    if (i < arr.length) {
        node = new Node(arr[i]);

        node.left = createTree(arr, 2 * i + 1);
        node.right = createTree(arr, 2 * i + 2);
    }
    return node;
}
const tree = createTree([1, 2, 3, 4, 5, 6, 7], 0);
console.log(tree)


//! Preorder traversal

const preOrderArr = [];
function preorder(node) {
    if (node == null) {
        return;
    }
    preOrderArr.push(node.data);
    preorder(node.left);
    preorder(node.right);

}
preorder(tree);
console.log('Pre ', preOrderArr)


//! In Order traversal

const inOrderArr = [];
function inOrder(node) {
    if (node == null) {
        return;
    }
    inOrder(node.left);
    inOrderArr.push(node.data);
    inOrder(node.right);

}
inOrder(tree);
console.log('In ', inOrderArr)


//! Post Order Traversal

const postOrderArr = [];
function postOrder(node) {
    if (node == null) {
        return;
    }
    postOrder(node.left);
    postOrder(node.right);
    postOrderArr.push(node.data);
}
postOrder(tree);
console.log('Post ', postOrderArr)


//! Level Order traversal

/*
In the level order tree traversal, the level of the root node is considered to be level-0 and next levels are 1 2 etc.
Generally the level order traversal is done using a queue data structure.
Firstly we insert the root into the queue and iterate over the queue until the queue is empty. In every iteration, we will pop the front element of the queue and print its value. Then, we add its left child and right child to the end of the queue.
*/

//@ Print elements one by one in same line like 1, 2, 3, 4...

/*
                          [1]
                     /          \
                [2]               [3]
               /   \             /     \
              [5]   [8]       [10]      [13]
            /                 /  \      /
           [6]             [9]    [7]   [4]
                                  /
                                [12]
*/

// TC and Sc -  O(n)
function levelOrderTraversal1(root) {
    console.log('levelOrderTraversal  : print items in same line');
    if (root == null) {
        return;
    }
    let queue = [];
    queue.push(root); // that is called enqueue process in Queue data structure
    while (queue.length != 0) { // that is queue.empty method of Queue
        let curr = queue.shift(); // same as queue.dequeue method (pop from front side)
        console.log(curr.data);
        if (curr.left) {
            queue.push(curr.left);
        }
        if (curr.right) {
            queue.push(curr.right);
        }
    }
}

//@ Print elements of same level in one line and then break line for another level elements.

/*
1
2 3
5 8 10 13
...
...
*/

/*
To print in new line, we have to track last element of each level.
At 0 level, there is always one element and that is root. So at level 0 last will be root element.
Now remove element from start and push its children into queue.
If currently removed item is same as last element, means we are at end of level-i, so update last element as rear element of queue.
and print a new line.


*/

// TC and Sc -  O(n)
function levelOrderTraversalWithNewLine(root) {
    console.log('levelOrderTraversal With New Line');
    if (root == null) {
        return;
    }
    let Q = [];
    let last = root; // initially root element will be last element
    Q.push(root); // enqueue root element
    while (Q.length != 0) { // empty method of queue
        let curr = Q.shift(); // dequque method of queue
        console.log(curr.data);
        if (curr.left) {
            queue.push(curr.left);
        }
        if (curr.right) {
            queue.push(curr.right);
        }
        if (curr == last) {
            console.log('\n');
            last = Q[Q.length - 1]; // rear() method of queue
        }
    }

}

//! Right view of Tree - print all right most elements

// TC and Sc -  O(n)
function printRightView(root) {
    console.log('printRightView of tree');
    if (root == null) {
        return;
    }
    let Q = [];
    let last = root; // initially root element will be last element
    Q.push(root); // enqueue root element
    while (Q.length != 0) { // empty method of queue
        let curr = Q.shift(); // dequque method of queue
        if (curr.left) {
            queue.push(curr.left);
        }
        if (curr.right) {
            queue.push(curr.right);
        }
        if (curr == last) {
            console.log(curr.data) // only print last element
            last = Q[Q.length - 1]; // rear() method of queue
        }
    }

}

