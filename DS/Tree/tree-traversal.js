
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

const preOrderMap = [];
function preorder(node) {
    if (node == null) {
        return;
    }
    preOrderMap.push(node.data);
    preorder(node.left);
    preorder(node.right);

}
preorder(tree);
console.log('Pre ', preOrderMap)


//! In Order traversal

const inOrderMap = [];
function inOrder(node) {
    if (node == null) {
        return;
    }
    inOrder(node.left);
    inOrderMap.push(node.data);
    inOrder(node.right);

}
inOrder(tree);
console.log('In ', inOrderMap)


//! Post Order Traversal

const postOrderMap = [];
function postOrder(node) {
    if (node == null) {
        return;
    }
    postOrder(node.left);
    postOrder(node.right);
    postOrderMap.push(node.data);
}
postOrder(tree);
console.log('Post ', postOrderMap)


//! Level Order traversal

/*
In the level order tree traversal, the level of the root node is considered to be level-0 and next levels are 1 2 etc.
Generally the level order traversal is done using a queue data structure.
Firstly we insert the root into the queue and iterate over the queue until the queue is empty. In every iteration, we will pop the front element of the queue and print its value. Then, we add its left child and right child to the end of the queue.
*/

//@ Print elements one by one in same line like 1, 2, 3, 5 8 10...

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
    let ans = [];
    queue.push(root); // that is called enqueue process in Queue data structure
    while (queue.length != 0) { // that is queue.empty method of Queue
        let curr = queue.shift(); // same as queue.dequeue method (pop from front side)
        ans.push(curr.data);
        if (curr.left) {
            queue.push(curr.left);
        }
        if (curr.right) {
            queue.push(curr.right);
        }
    }
    return ans;
}

console.log(levelOrderTraversal1(tree))

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
    console.log('levelOrderTraversal With New Line', root);
    if (root == null) {
        return;
    }
    let ans = [];
    let Q = [];
    let last = root; // initially root element will be last element
    Q.push(root); // enqueue root element
    let temp = []; // to save same level elements
    while (Q.length != 0) { // empty method of queue
        let curr = Q.shift(); // dequque method of queue
        temp.push(curr.data);
        if (curr.left) {
            Q.push(curr.left);
        }
        if (curr.right) {
            Q.push(curr.right);
        }
        if (curr == last) {
            ans.push(temp); // push same level all elements into final array
            temp = []; // empty temp arr
            last = Q[Q.length - 1]; // rear() method of queue
        }
    }
    return ans;

}

console.log(levelOrderTraversalWithNewLine(tree))



//! Right view of Tree - print all right most elements || Almost same as above solution with one change

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


//! Vertical Order traversal, Left to Right and Top to Bottom

//? ProblemImagesView\vertical-order-traversal.png

/*
Input:
      6
    /   \
   3     7
  / \     \
 2   5     9

Output:
[
    [2],
    [3],
    [6, 5],
    [7],
    [9]
 ]

*/


/*
@ Approach

? To read nodes from left to right, we need some column wise order information from first left to last right.
    Assign Root node as Order 0. All Left edge will cost -1 and right edge will cost +1.
    6 is 0. So 3 have -1 (because it is on left) & 7 have 1 (because it is on right).
    3 have Ordering -1, 2 is its left child so -1 - 1 = -2, 5 is its right child so -1 + 1 = 0.
? Create a Queue with node and its distance (distance from root node)
? Create a map to contain nodes distance wise.

      6 (0)
     /     \
(-1) 3     7 (1)
  /   \     \
 2     5     9 (2)
(-2)   (0)

*/

// SC and TC - O(n)
function verticalTraversal(root) {
    console.log('verticalTraversal :');
    if (root == null) {
        return;
    }
    let orderMap = {}; // map to contains nodes with its order (distance from root node)
    let Q = []; // queue for level order traversal
    // Step 1 :: Do level order traversal and store elements in Q & orderMap with its coordinates or distance from root.
    // Why do Level order - because we have to traverse from top to bottom as per question requirement

    Q.push([root, 0]); // initial node is root and it has distance 0
    orderMap[0] = [root.data];

    let minDistance = 0; // track min left distance
    let maxDistance = 0; // track max right distance

    while (Q.length != 0) {
        let [currNode, currDistance] = Q.shift();
        if (currDistance < minDistance) {
            minDistance = currDistance;
        }
        if (currDistance > maxDistance) {
            maxDistance = currDistance;
        }
        if (currNode.left) {
            Q.push([currNode.left, currDistance - 1]); // moving left side so did -1 here.
            if (orderMap[currDistance - 1]) {
                orderMap[currDistance - 1].push(currNode.left.data);
            } else {
                orderMap[currDistance - 1] = [currNode.left.data];
            }

        }
        if (currNode.right) {
            Q.push([currNode.right, currDistance + 1]); // moving right side so did +1 here.
            if (orderMap[currDistance + 1]) {
                orderMap[currDistance + 1].push(currNode.right.data);
            } else {
                orderMap[currDistance + 1] = [currNode.right.data];
            }

        }
    }
    console.log(orderMap, minDistance, maxDistance);
    let ans = [];
    for (let i = minDistance; i <= maxDistance; i++) {
        ans.push(orderMap[i])
    }
    return ans;

}
console.log(verticalTraversal(tree));



//! Top View of Binary Tree

//? This is completely same as Vertical traversal, Just we have to pick first element of each distance

/*
            1
          /   \
         2    3
        / \  / \
       4   5 6  7
      /
     8

Output: [1, 2, 4, 8, 3, 7]
*/

//@ I have used here array to store node, but actually we have to store data in Queque.
function topViewofBT(root) {
    console.log('topViewofBT :', root);
    if (root == null) {
        return;
    }
    let orderMap = {}; // map to contains nodes with its order (distance from root node)
    let Q = []; // queue for level order traversal
    // Step 1 :: Do level order traversal and store elements in Q & orderMap with its coordinates or distance from root.
    // Why do Level order - because we have to traverse from top to bottom as per question requirement

    Q.push([root, 0]); // initial node is root and it has distance 0
    orderMap[0] = [root.data];

    let minDistance = 0; // track min left distance
    let maxDistance = 0; // track max right distance

    while (Q.length != 0) {
        let [currNode, currDistance] = Q.shift(); // use Queue data structure
        if (currDistance < minDistance) {
            minDistance = currDistance;
        }
        if (currDistance > maxDistance) {
            maxDistance = currDistance;
        }
        if (currNode.left) {
            Q.push([currNode.left, currDistance - 1]); // moving left side so did -1 here.
            if (orderMap[currDistance - 1]) {
                orderMap[currDistance - 1].push(currNode.left.data);
            } else {
                orderMap[currDistance - 1] = [currNode.left.data];
            }

        }
        if (currNode.right) {
            Q.push([currNode.right, currDistance + 1]); // moving right side so did +1 here.
            if (orderMap[currDistance + 1]) {
                orderMap[currDistance + 1].push(currNode.right.data);
            } else {
                orderMap[currDistance + 1] = [currNode.right.data];
            }

        }
    }
    //console.log(orderMap);
    let ans = [];
    for (let i = minDistance; i <= maxDistance; i++) {
        ans.push(orderMap[i][0]) //* This is only change here in top view case compare to vertical traversal code
    }
    return ans;

}
console.log(topViewofBT(tree));



//! Height balanced tree

// ProblemImagesView\height-balanced-tree.jpg

/*
A Binary Search Tree is considered to be balanced if any two sibling subtrees have height diff <= 1.
The difference between the height of the left and the height of the right subtree for all the nodes of the tree should not exceed 1.

* For all node => | height(LT) - height(RT) | <= 1

* height = max(LT, RT) + 1

* Leaf Node have height 0 because it does not have any children.

? Calculate Leaf node height-
    Leaf node have left and right null. In case of null just return -1. So max of -1 and -1 is -1 and when we add 1 it become 0.
*/

// SC and TC = O(n)
function heightBalancedTree(root) {
    let isBalanced = true; // initially assumed that tree is balaced
    function balanced(root) {
        if (root == null) {
            return -1; // if node is null , means return -1
        }
        let left = balanced(root.left); // traverse left sub tree
        let right = balanced(root.right); // traverse right sub tree
        if (Math.abs(left - right) > 1) { // In case diff > 1 means tree is not balaced
            isBalanced = false; // tree is not balanced
        }
        return Math.max(left, right) + 1; // calculate height

    }
    balanced(root);
    if (isBalanced) {
        return 1;
    } else {
        return 0;
    }
}
console.log(heightBalancedTree(tree))




//! Create Binary tree by given In-Order and Post Order array.

/*

 A = [6, 1, 3, 2]
 B = [6, 3, 2, 1]

  1
  / \
 6   2
    /
   3

*/


/*
 * Approach

? Is it possible to create Binary tree with only one traversal given?

@ Assume Only In order given- [1, 2, 3]

   2     1          1
  / \      \         \
 1   3      2          3
             \        /
              3      2


So we can see that with single Inorder there are many possible tree and we can get Unique binary tree. thats why we need two orders.

@ In Order is required to create binary tree with One another order Pre or Post. We can not construct with Pre and Post.


 In - Order      A = [6, 1, 3, 2]       L N R
 Post Order      B = [6, 3, 2, 1]       L R N


In Post Order, Node comes at last. So Last element of Post order will be Root node surely.
1 Will be root node.
Now check In-Order and we know Node comes in middle, so just find 1 into pre order traversal and all elements left to 1 will be part of left sub tree and all right elements will become part of right sub tree.
Left element is only 6 that will be part of left sub tree.
3 and 2 are right elements in In-Order so that will be part of right sub tree.
In-Order    =>  [6] [1] [3, 2]
Post-Order  =>  [6] [3, 2]  [1]

Now follow same algo in recursive manner.
6 is only element so no further process.
In sub tree [3, 2] Check Post order and as per that 2 wil be node. And If 2 is node then as per In-order 3 will be Left child.

? ProblemImagesView\binary-tree-construct.jpg

*/

/**
 *
 * @param {*} inOrderArr - In order traversal array
 * @param {*} postOrderArr Post order traversal array
 * @param {*} startIn - start index of In order
 * @param {*} endIn  - end index of In order
 * @param {*} startPost - start index of post order
 * @param {*} endPost  - end index of post order
 */

//* Linear way => TC -> O(n) , SC -> O(h) = O(h) in worst case it will be O(n)
//* HashMap => If we use hashMap then SC => O(n) + O(h) = O(n)
function constructBinaryTree(inOrderArr, postOrderArr, startIn, endIn, startPost, endPost) {

    if (startIn > endIn) {
        return null;
    }

    // Step 1 :: Last element of Post order is always Node.
    let node = new Node(postOrderArr[endPost]); // create a new node based on end Index

    // Step 2 :: Find above node Index from In Order array
    let nodeIndex;
    for (let startIn = 0; startIn <= endIn; startIn++) {
        const element = inOrderArr[startIn];
        if (element == postOrderArr[endPost]) { // we can also do (element == node.data)
            nodeIndex = startIn;
            break;
        }
    }
    /*  Step 3 :: Now elements before nodeIndex will become part of Left sub tree.
        Left sub tree indices ->
             Inorder array indices    => start will be startIn and end index will be nodeIndex - 1
             Postorder array indices  => count number of elements left side in In-Order and based on that we will find index in post order
                 => nodeIndex = 1;
                 => countLeft = nodeIndex - startIn
                 => startPost = startPost, endPost = startPost + countLeft - 1;
        Right sub tree indices ->
             Inorder array indices    => start will be nodeIndex + 1 and end index will be endIn
             Postorder array indices  => count number of elements right side in In-Order and based on that we will find index in post order
                 => nodeIndex = 1;
                 => countRight = endIn - nodeIndex
                 => startPost = startPost + countLeft, endPost = endPost - 1;
     */
    let countLeft = nodeIndex - startIn;
    let countRight = endIn - nodeIndex; // this is not in use.
    node.left = constructBinaryTree(inOrderArr, postOrderArr, startIn, nodeIndex - 1, startPost, startPost + countLeft - 1);
    node.right = constructBinaryTree(inOrderArr, postOrderArr, nodeIndex + 1, endIn, startPost + countLeft, endPost - 1);
    return node;
}
console.log('constructBinaryTree from Inorder and PostOrder');
console.log(constructBinaryTree([2, 1, 3], [2, 3, 1], 0, 2, 0, 2));
