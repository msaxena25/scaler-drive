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

* Approach

PreOrder traversal takes O(H) Space Complexity because of its using stack data structure to store recursive calls.
Morris InOrder traversal algorithm says that we can do PreOrder traversal without using any extra space. Space Complexity will be O(1). So It means there will no any recursive call.

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
Right Most Node is the last child of tree which traversed into Last in PreOrder traversal. Means when we on Right Most Node, after read that we have to go back to ancestor Node. Thats why we added a temporary link between a node to its a Right Most Node. 
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