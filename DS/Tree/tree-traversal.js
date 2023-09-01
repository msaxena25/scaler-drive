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
Parent of a Node = (i - 1) / 2

 */

//! Create a Binary tree from a given array

function createTree(arr, i) {
    let node = null;
    if (i < arr.length && arr[i] != null) {
        node = new Node(arr[i]);

        node.left = createTree(arr, 2 * i + 1); // left side will also be a tree whose root node will be 2i + 1.
        node.right = createTree(arr, 2 * i + 2); // right side will also be a tree whose root node will be 2i + 2.
    }
    return node; // finally return node (will all children)
}
const tree = createTree([1, 2, 3, 4, 5, 6, 7], 0);
console.log(tree);

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
console.log('Pre ', preOrderMap);

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
console.log('In ', inOrderMap);

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
console.log('Post ', postOrderMap);

//! Level Order traversal

/*
In the level order tree traversal, the level of the root node is considered to be level-0 and next levels are 1 2 etc.
Generally the level order traversal is done using a queue data structure.
Firstly we insert the root into the queue and iterate over the queue until the queue is empty. In every iteration, we will pop the front element of the queue and print its value. Then, we add its left child and right child to the end of the queue.

? Why Queue ?
We can use array as well because pushing element in queue or array are same. But in array, we pop from last and as per our need we need pop from first. We can also pop first from array (using shift operator) but that takes O(n) time. And In Queue element pop from first takes O(1) time. So Queue data structure is better use here.

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
    while (queue.length != 0) {
        // that is queue.empty method of Queue
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

console.log(levelOrderTraversal1(tree));

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
    while (Q.length != 0) {
        // empty method of queue
        let curr = Q.shift(); // dequeue method of queue
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

console.log(levelOrderTraversalWithNewLine(tree));

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
    while (Q.length != 0) {
        // empty method of queue
        let curr = Q.shift(); // dequeue method of queue
        if (curr.left) {
            queue.push(curr.left);
        }
        if (curr.right) {
            queue.push(curr.right);
        }
        if (curr == last) {
            console.log(curr.data); // only print last element
            last = Q[Q.length - 1]; // rear() method of queue
        }
    }
}

//! Left view of tree

function printLeftView(node) {
    if (node == null) {
        return;
    }
    let q = [node];
    let temp = []; // to store only one level elements
    let last = node; // initially node is last node.
    let ans = [];
    while (q.length > 0) {
        const el = q.shift(); // pop first element
        temp.push(el);
        if (el.left) {
            q.push(el.left);
        }
        if (el.right) {
            q.push(el.right);
        }
        if (el == last) {
            ans.push(temp[0].data); // we have to pick only first item of one level's elements.
            last = q[q.length - 1]; // again update last element
            temp = []; // empty temp array to store next level elements
        }
    }
    return ans;
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

/*
@ High level approach

Any How If we can create a map based on these order values then we can print elements. Like

0 : [6, 5]
1 : [7]
-1: [3]
-2: [2]
1 : [7]
2 : [9]

Now we will see min value to max value and using a loop we can print all values of that order.

So to make  this order map, we need to traverse tree. And what type of traversal is best fit here?
We need elements from top to bottom and that is only possible with Level order traversal.


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
        ans.push(orderMap[i]); // push all elements of ith index of orderMap to ans.
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

//@ I have used here array to store node, but actually we have to store data in Queue.
function topViewOfBT(root) {
    console.log('topViewOfBT :', root);
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

    /*
     @Every first item of same order will be seen from top. How?
      Suppose there are 3 nodes at 3rd order. So 2nd and 3rd node are lying on same path so, those cannot be visible from top. Only first node will be visible from top.
    */
    let ans = [];
    for (let i = minDistance; i <= maxDistance; i++) {
        ans.push(orderMap[i][0]); //* This is only change here in top view case compare to vertical traversal code
    }
    return ans;
}
console.log(topViewOfBT(tree));




//! Max depth of binary tree :: can solve with level order traversal

function maxDepth(A) {
    if (A == null) {
        return null;
    }
    let last = A;
    let Q = []; // queue
    Q.push(A);
    let depth = 0;
    while (Q.length != 0) {
        let curr = Q.shift(); // remove first element
        if (curr.left) {
            Q.push(curr.left);
        }
        if (curr.right) {
            Q.push(curr.right);
        }
        if (curr == last) {
            depth++;
            last = Q[Q.length - 1];
        }
    }
    return depth;
}

//! Height balanced tree

// ProblemImagesView\height-balanced-tree.jpg

/*
A Binary Search Tree is considered to be balanced if any two sibling subtrees have height diff <= 1.
The difference between the height of the left and the height of the right subtree for all the nodes of the tree should not exceed 1.

* For all node => | height(LT) - height(RT) | <= 1

* height = max(LT, RT) + 1

* Leaf Node have height 0 because it does not have any children.

? Calculate Leaf node height-
    Leaf node have left and right null. In case of null just return -1. So max of -1, -1 is -1 and when we add 1 it become 0.
*/

// SC and TC = O(n)
function heightBalancedTree(root) {
    let isBalanced = true; // initially assumed that tree is balanced
    function balanced(node) {
        if (node == null) {
            return -1; // if node is null , means return -1
        }
        let left = balanced(node.left); // traverse left sub tree
        let right = balanced(node.right); // traverse right sub tree
        if (Math.abs(left - right) > 1) {
            // In case diff > 1 means tree is not balanced
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
console.log(heightBalancedTree(tree));

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

@ In Order is required to create binary tree with One another order Pre or Post. We can not construct with Pre and Post only.


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
In sub tree [3, 2] Check Post order and as per that 2 wil be parent node. And If 2 is parent then as per In-order 3 will be Left child.

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

//* Linear way => TC -> O(n) , SC -> O(h) = O(h), in worst case it will be O(n)
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
        if (element == postOrderArr[endPost]) {
            // we can also do (element == node.data)
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
                   => startPost = startPost, endPost = startPost + countLeft - 1; // did -1 because index start from 0
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
console.log('constructBinaryTree from InOrder and PostOrder');
console.log(constructBinaryTree([2, 1, 3], [2, 3, 1], 0, 2, 0, 2));

console.log(constructBinaryTree([8, 4, 2, 5, 1, 6, 3, 7], [8, 4, 5, 2, 6, 7, 3, 1], 0, 7, 0, 7));
/*

            1
          /   \
         2    3
        / \  / \
       4   5 6  7
      /
     8
*/

//!  Diameter of binary tree

/*
Given a Binary Tree A consisting of N integer nodes, you need to find the diameter of the tree.

The diameter of a tree is the number of edges on the longest path between two nodes in the tree.

*/

/*
 * Approach

For a single Node diameter will be 0.
Diameter is based on left path and right path.

Let's calculate diameter for a single Node with below algorithm.

1. First check Node is null or not, so Node is not null.
2. Go to its left with recursive call.
3. Left is null so return -1.
4. Go to right and that is also null so return -1.
5. diameter for that Node = ( left + 1 ) + (right + 1) = -1 + 1 - 1 + 1 = 0.
6. No more nodes to visits. So return 0.



            1
          /   \
         2    3
        / \  / \
       4   5 6  7
      /
     8


1. Diameter of 8 is 0 because there is no any left or right child.
2. Now see Node 4.
    - 4 have left child 8 and from there value will return left + 1 and that is 1.
    - 4 does not have right child so will return 0.
    - diameter of 4 is = 1 + 0 = 1.
3. Now see Node 2.
    - 4 have left 1 and right 0 and it will return Max value from left + 1 and right + 1 to its parent node.
    - From left sub tree 2 have value now 2.
    - From right side 2 have value 1.
    - So diameter at Node 2 is 2 + 1 = 3.
4. Now see Node 1.
    - 2 will return Max value from left + 1 and right + 1 to its parent. So max is left + 1 (2 + 1) = 3.
    - Left subtree have max path is 3.
    - Right subtree have 2.
    - so total is 3 + 2 = 5 and that is max.
*/

function calculateDiameter(node) {
    let maxDiameter = 0;
    function diameterOfBT(node) {
        if (node == null) {
            return -1;
        }
        let left = diameterOfBT(node.left);
        let right = diameterOfBT(node.right);

        let d = left + 1 + (right + 1); // Calculate diameter at each Node and compare with Max value.
        if (d > maxDiameter) {
            maxDiameter = d;
        }
        return Math.max(left + 1, right + 1); // return Only Max path between left and right to parent node.
    }
    diameterOfBT(node);
    return maxDiameter;
}

//!  Sum of Left Leaves

/*
Given a binary tree, find and return the sum of node value of all left leaves in it.
*/

function sumOfLeftLeaves(A) {
    let sum = 0;
    function preOrder(A) {
        if (A == null) {
            return;
        }
        // We have to pick Left node and only leaf node means whose left and right are null.
        if (A.left && A.left.left == null && A.left.right == null) {
            sum += A.left.data;
        }
        preOrder(A.left);
        preOrder(A.right);
    }
    preOrder(A);
    return sum;
}

//! Counting the Nodes with more value than all its ancestors

function countingNodes(A) {
    let count = 1; // Assuming there wil be at least one Node. (Because root node always considered)

    // Why Pre Order - Because we have to process first Node data so pre order is best fit.
    function preOrder(A, maxValue) {
        if (A == null) {
            return;
        }
        if (A.data > maxValue) {
            count++; // If Node data is greater than max value coming from its parent then increase count.
        }
        preOrder(A.left, Math.max(A.data, maxValue)); // Pass Math.max(A.data, maxValue) to its child tree
        preOrder(A.right, Math.max(A.data, maxValue));
    }
    preOrder(A, A.data); // initially root data is max value
    return count;
}

//! Odd and Even Levels

/*

Given a binary tree of integers. Find the difference between the sum of nodes at odd level and sum of nodes at
even level.
NOTE: Consider the level of root node as 1.

*/

function oddAndEvenLevelDifference(A) {
    if (A == null) {
        return;
    }
    let oddSum = 0;
    let evenSum = 0;
    let q = [A];
    let sameLevelElementsSum = 0; // to store only same level elements sum
    let last = A; // initially
    let level = 1; // as per question root is at level 1.
    while (q.length > 0) {
        const el = q.shift(); // pop first element
        sameLevelElementsSum += el.data; // add node data into sameLevelElementsSum
        if (el.left) {
            q.push(el.left);
        }
        if (el.right) {
            q.push(el.right);
        }
        if (el == last) {
            if (level % 2 == 0) {
                // check level is odd or even
                evenSum += sameLevelElementsSum;
            } else {
                oddSum += sameLevelElementsSum;
            }
            level++; // at this point one level is completely traversed so we can increase level value
            last = q[q.length - 1]; // update last item
            sameLevelElementsSum = 0; // reset sum of sameLevelElementsSum
        }
    }
    return oddSum - evenSum; // finally return. Mentioned in question that output should be odd - even.
}

//! Boundary Traversal Of Binary Tree -- uncompleted

function boundaryTraversal(A) {
    let q = [A];
    let last = A;
    let temp = [];
    let levelElements = [];
    let leftEls = [];
    let rightEls = [];

    while (q.length > 0) {
        let node = q.shift();
        temp.push(node.data);
        if (A.left) {
            q.push(A.left);
        }
        if (A.right) {
            q.push(A.right);
        }
        if (node == last) {
            leftEls.push(temp[0]);
            rightEls.push(temp[temp.length - 1]);
            levelElements = temp;
            temp = [];
        }
    }
    let ans = leftEls;
    for (let i = 1; i < levelElements.length - 1; i++) {
        ans.push(levelElements[i]);
    }
    for (let i = rightEls.length - 1; i >= 0; i--) {
        ans.push(rightEls[i]);
    }
    return ans;
}

//!  Max Sum Path in Binary Tree
// https://www.scaler.com/academy/mentee-dashboard/class/70728/homework/problems/15/?navref=cl_pb_nv_tb

/*
Given a binary tree T, find the maximum path sum.
The path may start and end at any node in the tree.

Note: A maximum sum path is any path which has the maximum sum of the nodes lying on the path. Node can have negative values as well.*/

function maxSumPath(A) {
    console.log('maxSumPath :', A);
    let maxSumValue = -1001; // min value : we can take Number.MIN_Safe_Integer as well.
    function run(A) {
        if (A == null) {
            return 0;
        }
        let left = run(A.left);
        let right = run(A.right);

        // Max path on a particular Node will be
        const max = Math.max(left + A.data, right + A.data, left + right + A.data, A.data);
        if (max > maxSumValue) {
            maxSumValue = max;
        }
        return Math.max(left + A.data, right + A.data, A.data); // return to parent max among left + data , right + data or data
    }
    run(A);
    return maxSumValue;
}

const tree0 = createTree([1, 2, 3], 0);
console.log(maxSumPath(tree0)); // 6

const tree1 = createTree([1, 2, 3, 4, 5, 6, 7, 8], 0);
console.log(maxSumPath(tree1)); // 25

const tree2 = createTree([20, -10, 20, null, null, -10, -50], 0); // null means no child at that place
console.log(maxSumPath(tree2)); // 40






//! Flatten Binary Tree to Linked List

/* Given a binary tree A, flatten it to a linked list in-place.

@ note: in-place means we have to do this in O(1) space complexity.

The left child of all nodes should be NULL.

input:

         1
        / \
       2   5
      / \   \
     3   4   6

output:

1
 \
  2
   \
    3
     \
      4
       \
        5
         \
          6
*/

/*
@ Approach

Linked List structure does not have left and right child. It must have next child only.

Output is like : 1-->2-->3-->4-->5-->6

So if we see Output, we can observe that Root node of tree is first element of list.
Just think in which traversal, Root comes first and that is Pre Order traversal. (N L R)

As per question, we cannot use extra space, means we have to modify Existing Binary tree. And Left child should be null.

So any how we have to move all left children of tree to right side.
But Problem is that If we make left child of Node's to right child then we will loose right child Nodes.
And we cannot store right child nodes to somewhere before moving because we must do this in SC O(1).

- So to solve this problem, we will use Morris Traversal algorithm concept.
- Output tree is in Pre order traversal. left tree are first then right child.
- So to move from left tree to right tree, we will attach a link from right most node of left sub tree to Node right child. 

*/

//TC  = O(n)
function FlattenBinaryTree(A) {
    console.log('FlattenBinaryTree :', A);
    let curr = A;
    while (curr != null) {
        if (curr.left == null) {
            curr = curr.right; // No left tree, great. directly move to right tree.
        } else {
            // find right most Node First in left sub tree
            let temp = curr.left;
            while (temp.right != null) {
                temp = temp.right;
            }
            temp.right = curr.right; // Created Artificial Link
            curr.right = curr.left;  // Now make left tree to current right tree.
            curr.left = null; // We have moved curr.left into right so now make it null;
            curr = curr.right; // Nothing on left side now, so move to right.
        }
    }
    return A;

}