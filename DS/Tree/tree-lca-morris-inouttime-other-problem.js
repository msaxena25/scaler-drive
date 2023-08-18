//! Create a Binary tree from a given array (This will be used to pass tree input to solve problems)
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
function createBinaryTree(arr, i) {
    let node = null;
    if (i < arr.length && arr[i] != null) {
        node = new Node(arr[i]);

        node.left = createBinaryTree(arr, 2 * i + 1); // left side will also be a tree whose root node will be 2i + 1.
        node.right = createBinaryTree(arr, 2 * i + 2); // right side will also be a tree whose root node will be 2i + 2.
    }
    return node; // finally return node (will all children)
}

//! Morris InOrder Traversal || InOrder traversal without stack and recursion

/*
Given a binary tree, return the InOrder traversal of its nodes' values.

NOTE: Using recursion and stack are not allowed.

  1
  / \
 6   2
    /
   3

output: [6, 1, 3, 2]
 */

/*

* Approach

InOrder traversal takes O(H) Space Complexity because of its using stack data structure to store recursive calls.
Morris InOrder traversal algorithm says that we can do InOrder traversal without using any extra space. Space Complexity will be O(1). So It means there will no any recursive call.

? If there is no any recursive call then how will we come to previous visited node. Like In below tree After print 6 we have to print 2.

@ In Simple words, Morris Algo says Before moving from any Node, create a path or way or link to come back on that Node.


            1
         /      \
       2          3
     /   \       / \
   4      11    7  8
  / \     /    / \
 5  6    12   9  10



In Order traversal = [5, 4, 6, 2, 12, 11, 1, 9, 7, 10, 3, 8]

Right Most Node => No right children of that node. => [6, 11, 10]

As we can see InOrder array that we need 2 after 6, 1 after 11 and 3 after 10.
Right pointer of these nodes 6 11 and 10 are null and that is useless. So somehow we can create a temporary link between 6 and 2, 11 and 1, 3 and 10.

Temporary Right Pointer Links => 5 ---> 4, 6 ---> 2, 12 ---> 11, 11 ---> 1, 9 ---> 7, 10 ---> 3

? Why Right Most Node ?
Right Most Node is the last child of tree which traversed into Last in InOrder traversal. Means when we on Right Most Node, after read that we have to go back to ancestor Node. Thats why we added a temporary link between a node to its a Right Most Node.
*/

//? https://www.scaler.com/topics/morris-traversal/

// TC - O(n) & SC - O(1)
function morrisTraversal(A) {
    let curr = A;
    let out = [];
    while (curr != null) {
        if (curr.left == null) {
            out.push(curr.data); // print data
            curr = curr.right; // move to right side. (right also may be artificial link)
        } else {
            // If Left sub tree is available then Find Right Most Node into left sub tree.
            let r = rightMostNode(curr);
            // Right Most Node is a node whose right child is null.
            if (r.right == null) {
                r.right = curr; // Attached artificial Link
                curr = curr.left; // Now after attaching Link we can move to Left child.
            } else {
                /* As we know, Right most node is a node whose right child is null.
                 But If we found right of Right Most Node, it clears there is an artificial link available to that
                 node which we have added previously. It means we came to a Node from artificial link. */
                out.push(curr.data);
                r.right = null;
                curr = curr.right;
            }
        }
    }

    function rightMostNode(curr) {
        let temp = curr.left; // we have to find Right Most Node into Left side so first move to left side of tree.
        // move to right until it is null. Might be there is an artificial link found so it can move and move so added a check for that.
        // temp.right != curr => temp node right should not be current Node.
        while (temp.right != null && temp.right != curr) {
            temp = temp.right;
        }
        return temp;
    }
}

//! LCA  means - Least common ancestor

//@ https://www.scaler.com/topics/lca-of-a-binary-tree/

//* Finding LCA in Binary search tree and Binary tree have different approach. Finding LCA in BST is simple compare to BT.

//? LCA in Binary Search Tree?

/*
 @ Below is Binary search tree.

                6
               / \
              2   7
             / \   \
            1   4   8
                 \
                  5



LCA (1, 4) = 2
LCA (7, 8) = 7
LCA (1, 7) = 6

When X < node and Y < node means we have to search now in Left side.
When X > node and Y > node means we have to search in right side.
At the point when above two conditions not matched, means that is node from where, X and Y are in left and right subtree.
So that Node will be our answer.

*/

// TC  - O(h) and SC = O(1)
function lcaInBST(A, X, Y) {
    let curr = A;
    while (curr != null) {
        if (X > curr.data && Y > curr.data) {
            curr = curr.right;
        } else if (X < curr.data && Y < curr.data) {
            curr = curr.left;
        } else {
            return curr.data; // that is the node where X and Y are now in separate side
        }
    }
}

//? LCA in Binary Tree?

/* Given a binary tree, and two values v1 and v2, find the lowest common ancestor of nodes with their values as v1 and v2.

Where the lowest common ancestor of two nodes (Node1 and Node2) is the deepest node of which Node1 and Node2 are descendants. Note that here we consider that a node is the descendant of itself also.

        1
       / \
      /   \
     2     3
    / \     \
   /   \     \
  4     5     6
    \         / \
     \       /   \
      7     8     9



LCA Queries -

LCA (4, 5)
LCA (7, 4)
LCA (5, 8)
Output -

LCA of 4 and 5 is 2
LCA of 7 and 4 is 4 // note - node is the descendant of itself also.
LCA of 5 and 8 is 1

*/

//@ IN-OUT Algorithm (Very useful to solve LCA problem in BT)

/*

- For Every Node, we will keep InTime and OutTime of Node.
- InTime - During Traversing, when first time a Node was visited & OutTime is a time of last time node visited.
- We can also say that InTime means when subtree starts and OutTime means when subtree ends.
- Time will start from 0 and in every move , it will increase by 1.
- Use PreOrder traversal and create two arrays of In and Out OR can create a single object of time and push both in and out there for a node.
- Check If X is ancestor of a Node? X.inTime < node.inTime && X.outTime > node.outTime
- Traverse again and now check each Node and compare timing of B and C. Start from root node.
- If left child timing is valid for B and C, no need to go right side. In, Out Time of left tree will be smaller then right tree. And once left side timing matches, means right side timing cannot be in range of that Node.
- If right child timing is valid for B and C, it means no need to visit left side.
- If target element beyond then range of tree Nodes then return -1.


*/

function lcaWithInOutAlgo(A, B, C) {
    let t = 0; // initial time
    /* We can create two separate object for in and out time OR can create a single object to push both in and out time.
      let inTime = {};
      let outTime = {}; */

    let time = {};

    function traverse(A) {
        if (A == null) {
            return;
        }
        time[A.data] = [t]; //  log time when first visited
        t++;
        traverse(A.left);
        traverse(A.right);

        // log time when finally visited or end.
        time[A.data].push(t); // here A.data surely will be in object because node could be exist only if entered.
        t++;
    }
    traverse(A);
    console.log(time);

    // Check If X is ancestor of a Node?
    // X.inTime < node.inTime && X.outTime > node.outTime

    function checkAncestor(curr, target) {
        const currTime = time[curr.data]; // time of left side data
        return time[target] && currTime[0] <= time[target][0] && currTime[1] >= time[target][1];
    }

    // Now Traverse again
    let curr = A;
    while (curr != null) {
        // curr.left is ancestor of B and C?
        if (curr.left && checkAncestor(curr.left, B) && checkAncestor(curr.left, C)) {
            curr = curr.left;
            // curr.right is ancestor of B and C?
        } else if (curr.right && checkAncestor(curr.right, B) && checkAncestor(curr.right, C)) {
            curr = curr.right;
        } else {
            // We can directly return curr.data but also checked timing of current. And Incase timing is not matched with curr then return -1 (means target node is beyond of tree)
            if (curr && checkAncestor(curr, B) && checkAncestor(curr, C)) {
                return curr.data;
            } else {
                return -1;
            }
        }
    }
}

const t2 = createBinaryTree([1, 2, 3, 4, 5, null, 6, null, 7, null, null, null, null, 8, 9], 0);
console.log(lcaWithInOutAlgo(t2, 15, 8)); //-1
console.log(lcaWithInOutAlgo(t2, 4, 5)); //2
console.log(lcaWithInOutAlgo(t2, 7, 4)); //4

// Below is also a way to find LCA but solution is not fully completed
function lcaInBT(A, B, C) {
    console.log('lcaInBT :', A, B, C);
    let path1 = [];
    let path2 = [];
    function preOrder(A, target, path) {
        if (A == null) {
            return false;
        }
        path.push(A.data);
        if (A.data == target) {
            return true;
        }

        // Generally we call both sides but Here we have to stop when target found so Call with OR condition
        // preOrder(A.left, target, path);
        // preOrder(A.right, target, path);

        // First check on Left side then go to right side If target not found in left.
        if (preOrder(A.left, target, path) || preOrder(A.right, target, path)) {
            return true;
        }

        return false;
    }
    preOrder(A, B, path1);
    preOrder(A, C, path2);
    console.log(path1, path2);

    let lastNotMatchingIndex;
    for (let i = 0; i < path1.length; i++) {
        if ((path1[i] != path2[i] && path1[i] != B) || path2[i] != C) {
            lastNotMatchingIndex = i;
            break;
        }
    }
    return path1[lastNotMatchingIndex - 1];
}

const t1 = createBinaryTree([1, 2, 3, 4, 5, null, 6, null, 7, null, null, null, null, 8, 9], 0);
//console.log(lcaInBT(t1, 5, 8)); // 2


//! Common Nodes in Two BST

/* Given two BST's A and B, return the (sum of all common nodes in both A and B) % (109 +7) .
In case there is no common node, return 0.

NOTE:
Try to do it one pass through the trees.

 */

// TC = O(n) and SC = O(n)
function sumOfCommonNodes(A, B) {
    const map = {}; // create a map to store one tree Nodes

    // traverse tree A and keep its Node into Map
    function preOrderA(A) {
        if (A == null) {
            return;
        }
        preOrderA(A.left);
        map[A.data] = true;
        preOrderA(A.right);
    }
    preOrderA(A);

    let sum = 0;

    // Traverse Tree B and Check If B node exists in map. (If exists then add into sum.)
    function preOrderB(B) {
        if (B == null) {
            return;
        }
        preOrderB(B.left);
        if (map[B.data]) {
            sum += B.data;
        }
        preOrderB(B.right);

    }

    preOrderB(B);

    return sum % (Math.pow(10, 9) + 7);
}


//! Distance between Nodes of BST

/*
Given a binary search tree.
Return the distance between two nodes with given two keys B and C. It may be assumed that both keys exist in BST.

NOTE: Distance between two nodes is number of edges between them.
 */

//TC = O(h) -- because we are moving level by level either left or right (not every node)
function distanceBetweenTwoNodes(A, B, C) {

    let curr = A;
    // First traverse tree and find least common ancestor. Why lca ? Because We have to recognize From which Nodes, B and C are in separate directions. So We will calculate distance from that common node and finally add distance.
    let ancestorNode;
    while (curr != null) {
        if (B < curr.data && C < curr.data) {
            curr = curr.left;
        }
        else if (B > curr.data && C > curr.data) {
            curr = curr.right;
        } else {
            ancestorNode = curr;
            break;
        }
    }

    // Now calculate distance for each target from that ancestor Node. (Ancestor node will be common root for both nodes)
    function findTarget(curr, target) {
        let temp = curr;
        let distance = 0;
        while (temp != null) {
            if (temp.data == target) {
                return distance;
            }
            distance++;
            if (target <= temp.data) {
                temp = temp.left;
            } else {
                temp = temp.right;
            }
        }

    }

    let d1 = findTarget(ancestorNode, B);
    let d2 = findTarget(ancestorNode, C);
    return Math.abs(d1 + d2);
}



//! Recover binary search tree. (not completed)


function recoverBinarySearchTree(A) {
    console.log('recoverBinarySearchTree :', A);
    let inOrderArr = [];
    function check(A) {
        if (A == null) {
            return;
        }
        check(A.left);
        inOrderArr.push(A.data)
        check(A.right);
    }
    check(A);

    let arr = [];
    for (let i = 1; i < inOrderArr.length; i++) {
        if (inOrderArr[i] < inOrderArr[i - 1]) {
            arr.push(inOrderArr[i - 1], inOrderArr[i]);
        }
    }
    console.log(inOrderArr)
    // const sort = arr.sort();
    // console.log(sort)
    // return [sort[0], sort[sort.length - 1]];
}

const t3 = createBinaryTree([150, 113, 165, 76, 142, 158, 175, 65, 84, 139, 143, 156, 160, 168, 191, 62, 74, 82, 86, 120, 141, null, 147, 154, 157, 159, 162, 167, 172, 188, 192, 59, 63, 66, 75, 80, 83, 85, 89, 111, 128, 140, null, 145, 148, 153, 155, null, null, null, null, 161, 164, 166, null, 171, 173, 182, 189, null, 195, 43, 60, null, 64, null, 73, null, null, 78, 81, null, null, null, null, 88, 90, 109, 94, 126, 132, null, null, 144, 146, null, 149, 151, null, null, null, null, null, 163, null, null, null, 170, null, null, 174, 178, 186, null, 190, 194, 196, null, 49, null, 61, null, null, 70, null, 77, 79, null, null, 87, null, null, 92, 101, 110, 112, 119, 122, 127, 129, 136, null, null, null, null, null, null, null, 152, null, null, 169, null, null, null, 177, 179, 185, 187, null, null, 193, null, null, null, 45, 58, null, null, 69, 71, null, null, null, null, null, null, 91, 93, 97, 107, null, null, null, null, 116, null, 121, 125, null, null, null, 131, 134, 138, null, null, null, null, 176, null, null, 180, 183, null, null, null, null, null, 44, 47, 53, null, 67, null, null, 72, null, null, null, null, 96, 99, 104, 108, 115, 117, null, null, 123, null, 130, null, 133, 135, 137, null, null, null, null, 181, null, 184, null, null, 46, 48, 51, 57, null, 68, null, null, 95, null, 98, 100, 102, 106, null, null, 114, null, null, 118, null, 124, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 50, 52, 54, null, null, null, null, null, null, null, null, null, null, 103, 105, null, null, null, null, null, null, null, null, null, null, null, null, 56, null, null, null, null, 55, null, null, null], 0);

console.log(recoverBinarySearchTree(t3));




//! Kth Smallest Element In BST


/* Given a binary search tree represented by root A, write a function to find the Bth smallest element in the tree. */

/*

- TO Find Out Kth smallest or largest we have to use InOrder traversal.
- Why InOrder traversal - Because it is in sorted order.
- Create InOrder traversal array and then search kth smallest element from start.

*/

function kthSmallestInBST(A) {
    console.log('kthSmallestInBST :', A);
    const arr = [];

    function inOrder(A) {
        if (A == null) {
            return;
        }
        inOrder(A.left);
        arr.push(A.data);
        inOrder(A.right);
    }
    inOrder(A);
    return arr[k - 1]; // why k -1 because we have to find 2nd smallest and array start from 0 index.
}


//! Path Sum in Binary Tree - Root to Leaf


/* Given a binary tree and a sum, determine if the tree has a root-to-leaf path such that adding up all the values along the path equals the given sum.

Tree:     5
         / \
        4   8
       /   / \
      11  13  4
     /  \      \
    7    2      1

 B = 22

 There exist a root-to-leaf path 5 -> 4 -> 11 -> 2 which has sum 22. So, return 1.
*/

/*

- Start from root node.
- Check root value and do (B - root value) and pass that remaining amount to its both child.
- If at any side Leaf, node data is equal to that remaining sum , means path exists.
- If path found from left side then no need to traverse right side. We can use OR condition to validate this.

*/

function rootToLeaf(A, B) {
    console.log('rootToLeaf :', A, B);

    function check(A, remainingSum) {
        if (A == null) {
            return 0;
        }
        if (A.left == null && A.right == null) { // leaf node
            if (A.data == remainingSum) { // we have to find path till leaf that why this is inside above If condition.
                return 1; // path exists
            } else {
                return 0;
            }
        }

        // First check in left side, then check into Right side. If nothing found then return 0.
        return check(A.left, remainingSum - A.data) || check(A.right, remainingSum - A.data);
    }

    return check(A, B);
}

const t4 = createBinaryTree([1000, 2000, null, -3001], 0);
// console.log(rootToLeaf(t4, -1));
console.log(rootToLeaf(t4, 100));


//!  Invert the Binary Tree

/* Given a binary tree A, invert the binary tree and return it.
Inverting refers to making the left child the right child and vice versa.

Input-

     1
   /   \
  2     3
 / \   / \
4   5 6   7

Output-

     1
   /   \
  3     2
 / \   / \
7   6 5   4

*/

/*

- Inversion means for every tree, we have to swap lift child to right child and vice versa.
- How swap perform generally on two values like a and b?
    - We keep a into temp. like temp = a;
    - then we do a = b;
    - and last we do b = temp;
- Same above concept we will use here for tree as well.
- Store left child node into temp.
- Assign left child into right child.
- Assign right child to that temp Node.

*/

// TC - O(n) and SC = O(h)
function invertBinaryTree(A) {

    function invert(A) {
        if (A == null) {
            return;
        }
        let tempLeftNode = invert(A.left); // first store left node into temp
        A.left = invert(A.right); // make right node to left node
        A.right = tempLeftNode; // now assign temp node into right node
        return A;
    }
    return invert(A);
}


//! Symmetric Binary Tree (use of InOrder traversal)


/* Given a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

    1
   / \
  2   2
 / \ / \
3  4 4  3

output : 1(yes it is.)
*/

// We will create InOrder traversal and then verify nodes left and right side of root node. If they are not same at any point means tree is not symmetric.
function checkSymmetricBinaryTree(A) {
    const arr = [];
    function inOrder(A) {
        if (A == null) {
            return;
        }
        inOrder(A.left);
        arr.push(A.data);
        inOrder(A.right);
    }
    inOrder(A);

    // To by Symmetric total nodes should be even. Because If length is Odd means number of nodes left and right side are not same.
    if (arr.length % 2 == 0) {
        return 0;
    }

    // To be symmetric, Middle element of in order array must be root node.
    let midIndex = Math.floor(arr.length / 2);
    if (arr[midIndex] != A.data) {
        return 0;
    }

    // If above both are true then check each node left and right side. If at any index , they are not same return 0.
    let i = midIndex;
    let j = midIndex;
    while (i >= 0 || j < arr.length) {
        if (arr[i] != arr[j]) {
            return 0;
        }
        i--;
        j++;
    }
    return 1;
}


//! Sum binary tree or not

/* Given a binary tree. Check whether the given tree is a Sum-binary Tree or not.

Sum-binary Tree is a Binary Tree where the value of a every node is equal to sum of the nodes present in its left
subtree and right subtree.
A leaf node is also considered as SumTree.

       26
     /    \
    10     3
   /  \     \
  4   6      3

output: 1(yes)

 */

function sumBinaryTree(A) {

    let isSumTree = 1; // initially takes value as 1
    function check(A) {
        if (A == null) {
            return null;
        }

        let left = check(A.left);
        let right = check(A.right);

        // left and right both are null means leaf Node. And as per question, leaf node is sum binary tree so return a.data;
        // If left and right sum are not same as parent data, mark isSumTree as 0.
        if (left == null && right == null) {
            return A.data;
        } else if (left + right !== A.data) {
            isSumTree = 0;
        }
        return left + right + A.data; // return sum of left, right and parent node to its parent Node.

    }
    check(A);
    return isSumTree;
}


//! Next Pointer Binary Tree (Use of level order traversal with Queue data structure)

/* Given a binary tree,
Populate each next pointer to point to its next right node. If there is no next right node,
the next pointer should be set to NULL.
Initially, all next pointers are set to NULL.

Assume perfect binary tree.

        1
       /  \
      2    5
     / \  / \
    3  4  6  7

    output -

         1 -> NULL
       /  \
      2 -> 5 -> NULL
     / \  / \
    3->4->6->7 -> NULL

*/


/*

- We have to traverse here level by level so will apply here Level Order traversal.
- We use Queue data structure.
- Time complexity is O(n)
- Space Complexity is O(n) : Calculation is below =>

- If Tree is Perfect binary tree (given in question) means every node have two children instead of leaf node.

- Level 0 => number of nodes 1 => 2^0
- Level 1 => number of nodes 2 => 2^1
- Level 2 => number of nodes 4 => 2^2
- Level 3 => number of nodes 8 => 2^3
..
..
- Level h => number of nodes  => 2^h

Total Nodes => 2^0 + 2^1 + 2^2 + ... + 2^h = N (number of nodes)

@ In Level Order traversal question we have used array instead of proper Queue data structure. But there was no any error of time limit exceeded. But Here I tried with same on online editor and it gives TLE Error.  So we will implement Queue data structure first.
*/

// Node structure of Queue :: We are using linked list to implement Queue
class QNode {
    data;
    next;
    constructor(value) {
        this.data = value;
        this.next = null;
    }
}
class Queue {
    head = null;
    tail = null;
    constructor() { }
    enqueue(value) {
        const node = new Node(value);
        if (this.head == null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node; // make new node to current tail next element
            this.tail = node; // now make tail to last newly added element
        }
    }
    dequeue() {
        if (this.head == null) {
            return null;
        }
        // we know that we have to remove node from front :: And front is head so just make head.next to head
        let node = this.head;
        if (this.head.next == null) { // means there is only one element
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
        }
        return node.data;

    }
    isEmpty() {
        return this.head == null;
    }
    front() {
        return this.head ? this.head.data : -1;
    }
    rear() {
        return this.tail ? this.tail.data : -1;
    }
}


function nextPointerBinaryTree(A) {
    let q = new Queue();
    q.enqueue(A);
    let last = A; // take last variable to trace level finish
    let prev = null; // track previous node to assign next

    while (!q.isEmpty()) {
        let node = q.dequeue();

        // If prev exists then make prev.next as current node. and then make current node as prev.
        if (prev) {
            prev.next = node;
        }
        prev = node;

        if (node.left) {
            q.enqueue(node.left);
        }

        if (node.right) {
            q.enqueue(node.right);
        }

        if (node == last) { // check when last element will process of same level
            node.next = null; // last node next will be null as per question
            last = q.rear();
            prev = null; // assign prev as null for next level processing.
        }

    }
}