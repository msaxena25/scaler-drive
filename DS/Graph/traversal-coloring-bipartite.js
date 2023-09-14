//@ https://www.scaler.com/topics/data-structures/graph-in-data-structure/

/*

Application like facebook, twitter and google maps uses Graph data structure.
MakeMyTrip or other flight booking applications also use Graph data structure.


! What is Graph in Data Structure?

A Graph in Data Structure is a non-linear data structure that consists of nodes and edges which connects them.'

In a non-linear data structure, elements are not arranged linearly or sequentially.

? A graph is a pair of sets (V, E), where V is the set of vertices and E is the set of edges, connecting the pairs of vertices. Below is the example.

V = {a, b, c, d}
E = {ab, ac, ad, bc, cd}

In the above graph, |V| = 4 because there are four nodes (vertices) and, |E| = 5 because there are five edges (lines).


!Degree of a Node:

Degree of a node is the number of edges connected to a node in the graph. A simple example would be, suppose in facebook, if you have 100 friends then the node that represents you has a degree of 100.


! Types of Graph

- Cycle graph
- Connected Graph
- Complete Graph
- Weighted Graph
- Simple Graph
- Directed Graphs
- Undirected Graphs

Read here for more details - https://www.scaler.com/topics/data-structures/graph-in-data-structure/

*/

//! Graph Representation

/*
In graph data structure, a graph representation is a technique to store graph into the memory of computer. We can represent a graph in many ways.

The following two are the most commonly used representations of a graph.

Adjacency Matrix
Adjacency List

? Adjacency Matrix

An Adjacency Matrix is a 2D array of size V x V where V is the number of nodes in a graph.
It is used to represent a "finite graph", with 0's and 1's. Since, it's size is V x V, it is a square matrix.

[1]---[2]----[3]
 |           /
 |          /
[4]------ [5]

    1   2   3   4   5
   ______________________
1   0   1   0   1   0
2   1   0   1   0   0
3   0   1   0   0   1
4   1   0   0   0   1
5   0   0   1   1   0

> We represent 1 If there is an edge between two nodes & 0 if not.

@ Adjacency Matrix for Weighted Graphs

* If the graph is weighted, then we usually call the matrix as the cost matrix.

- Here each cell at position A[i, j] holds the weight from edge i to j.
- If the edge is not present, then it stores infinity or any largest value(which cannot be the weight of any node in the graph).


? Adjacency List

- An adjacency list represents a graph as an array of linked lists.
- Each element in the linked list represents the nodes that are connected to that node by an edge.

[1]--->[2]--->[4]
[2]--->[1]--->[3]
[3]--->[2]--->[5]
[4]--->[1]--->[5]
[5]--->[3]--->[4]


* Space complexity of Matrix and List

SC of Adjacency Matrix is = O(n^2) because it has n * n
SC of Adjacency List is   = O(n + E) :: Where E is sum of all edges

*/

//! Practical Applications of Graph

/*
1. GPS systems and Google Maps use graphs to find the shortest path from one destination to another.
2. The Google Search algorithm uses graphs to determine the relevance of search results.
3. World Wide Web is the biggest graph. All the links and hyperlinks are the nodes and their
 interconnection is the edges. This is why we can open one webpage from the other.
4. Social Networks like facebook, twitter, etc. use graphs to represent connections between users.
5. The nodes we represent in our graphs can be considered as the buildings, people, group,
 landmarks or anything in general, whereas the edges are the paths connecting them.

*/

//! Cyclic and Acyclic graph

/*

[1]➝➝➝[2]↖
  ↘      ↓    ↖
    ↘    ↓      ↖
      ↘ [3]➝➝➝[4]


In the above Graph we can see Nodes 2, 3 and 4 are forming a Cycle. So it is called Cyclic graph.
Note: Its not required to involve all nodes in cycle.


[1]➝➝➝[2]↘
  ↘      ↓    ↘
    ↘    ↓      ↘
      ↘ [3]➝➝➝[4]


This is Acyclic graph. No nodes are involved in creating cycle.


*/

//! Degree / InDegree and OutDegree

/*
Degree - number of edges connected to a particular node.

InDegree - number of incoming edges on a particular node.

OutDegree - number of outing edges.

*/

//! Self loop and Multi edges

/*
    Self loop - when edge pointing to self node.

    [1]
     ↻


     Multi edges - When there are more then one edges from A node to B node.

     [1]➝➝➝➝➝➝[2]
      ↓             ↑
      ↓➝➝➝➝➝➝➝↑

      From Node 1 to Node 2 there are two path exists so this is multi edge.
      Node: If one edge from 1 to 2 and one from 2 to 1 then that will not consider as multi edge.



*/

//! Traversal

/*
? BFS

Breadth-First Search or BFS is a vertex-based algorithm used for finding the shortest path in a graph between two indices.
Queue(FIFO - First In, First Out) is used in BFS for storing the visited vertices.
It is also known as level order traversal.

? DFS

DFS, another traversal technique used for traversing graphs?
DFS (Depth First Search) has its own advantages compared to BFS traversing algorithm. The main advantage
 is that it is considered to be faster than BFS and requires less memory during execution.
Stack ( LIFO - Last In, First Out ) is used for storing the visited vertices in Depth-First Search algorithm.
DFS is an edge-based traversal and works in a recursive manner.
DFS traverse/visits each vertex exactly once and each edge is checked exactly twice as
 the algorithm involves backtracking.

*/

//! DFS Traversal algorithm

/*
@ This is given adjacencyList = [[1, 3], [0], [3, 8], [0, 2, 4, 5], [3, 6], [3], [4, 7], [6], [2]]

? How to read this?

Array index start from 0, so indices are Nodes and given values are connecting Nodes.

0 ---> 1, 3         // Node 0 is connected with Node 1 and 3.
1 ---> 0
2 ---> 3, 8
3 ---> 0, 2, 4, 5
4 ---> 3, 6
5 ---> 4
6 ---> 4, 7
7 ---> 6
8 ---> 2

*/

function DFSTraversal(list) {
    console.log('DFSTraversal :', list);
    let n = list.length;
    let visited = []; // an array to store all visited node so that don't visit same node again.
    let output = []; // keep traversed nodes and finally return this

    // Why this For loop? This outer for loop check all vertices. Most of vertices will be checked by dfs function because they are all connected but If there is any node which are totally disconnected, that can cover with this outer for loop.
    for (let i = 0; i < n; i++) {
        // This outer loop will check every node.
        if (!visited[i]) {
            // If node is not visited then call dfs function
            dfs(i);
        }
    }

    function dfs(node) {
        visited[node] = true;
        output.push(node); // or print node
        const connectedNodes = list[node]; // find all connected node.
        for (let j = 0; j < connectedNodes.length; j++) {
            if (!visited[connectedNodes[j]]) {
                // again check if node is visited or not
                dfs(connectedNodes[j]); // call again dfs function
            }
        }
    }
    return output;
}
const adjacencyList = [[1, 3], [0], [3, 8], [0, 2, 4, 5], [3, 6], [3], [4, 7], [6], [2]];

console.log(DFSTraversal(adjacencyList)); //  [0, 1, 3, 2, 8, 4, 6, 7, 5]

//! BFS Traversal

function BFSTraversal(list) {
    console.log('BFSTraversal :', list);
    let n = list.length;
    let visited = []; // an array to store all visited node.
    let output = []; // keep traversed nodes and finally return this
    let Q = []; // Queue data structure

    for (let i = 0; i < n; i++) {
        // This outer loop will check every node.
        if (!visited[i]) {
            // If node is not visited then call dfs function
            bfs(i);
        }
    }

    function bfs(node) {
        Q.push(node); // push node into Queue
        while (Q.length) {
            const el = Q.shift(); // remove element from queue
            visited[el] = true;
            output.push(el); // or print node
            const connectedNodes = list[el]; // find all connected node.

            // For loop because one Node can have multiple connected Node, But In Tree, max children are 2 so don't use for loop in Tree Level order traversal.
            for (let j = 0; j < connectedNodes.length; j++) {
                if (!visited[connectedNodes[j]]) {
                    // again check if node is visited or not
                    Q.push(connectedNodes[j]); // push node into Queue
                }
            }
        }
    }
    return output;
}

console.log(BFSTraversal(adjacencyList)); //  [0, 1, 3, 2, 8, 4, 6, 7, 5]

//@ Time and Space Complexity of BFS & DFS (for both these are same)

/*
TC = O(N + E)

N is for outer loop. total iteration will be N (number of nodes).
E is sum of all iterations on node. (sum of all out Degree of a Node). Cost of a node is out degree of that node.

SC = O(N) -- Depend on two things one is visited array and max size of Queue i.e. n.

*/

//* Note: We can see one Outer loop in both BFS and DFS. Why we need it?
//  We are using an inner for loop to read connected nodes to the visited Node. But we cannot sure that every node is connected in graph
// or not. So to make sure read all nodes we use outer for loop for that.

//! Cycle in Directed Graph

/*


[1]➝➝➝[2]↖
  ↘      ↓    ↖
    ↘    ↓      ↖
      ↘ [3]➝➝➝[4]

IDEA 1 : If a visited node is encountered again the we can assume cycle. But that is not 100% correct. Because
Graph works on backtracking and in backtracking same node can be visited more then once.

IDEA 2: If a visited node in current path is encountered again then it will form a cycle. (100% correct)

*/

/*
Number of nodes  => A = 5
Connection list of nodes =>
 B  = [  [1, 2],
        [4, 1],
        [2, 4],
        [3, 4],
        [5, 2],
        [1, 3] ]

Output =>  The given graph contain cycle 1 -> 3 -> 4 -> 1 or the cycle 1 -> 2 -> 4 -> 1
        */

// TC  = O(n + E) and SC = O(n)
function isCyclicGraph(n, edgeList) {
    console.log('isCyclicGraph :', edgeList);
    let visited = {};
    let currPath = {};
    for (let i = 1; i <= n; i++) {
        // Node start from 1.
        if (!visited[i] && dfs(i)) {
            console.log(currPath);
            return 1; // cycle
        }
    }
    return 0; // cycle not exists
    function dfs(node) {
        visited[node] = true;
        currPath[node] = true;
        for (let j = 0; j < edgeList.length; j++) {
            if (edgeList[j][0] == node) {
                if (currPath[edgeList[j][1]]) {
                    return true; // return to main call, no need to process further for current path because cycle exists
                }
                // If node is not visited then only call dfs for that node.
                if (!visited[edgeList[j][1]] && dfs(edgeList[j][1])) {
                    return true; // if DFS return true then return true to main caller.
                }
            }
        }
        currPath[node] = false; // update Node in current path with false for other fresh traversal from that node.
        return false; // return false to main call.
    }
}

/*
@ Understand Code

- create an object named visited to store visited nodes. ( No need to traverse same node again )
- create an object named currPath to store current path.
- Iterate on all nodes
- Now see dfs function
    - First mark node to visited
    - put that node into current path
    - Now loop over edge List given in question statement.
    - Find connected node to the current node. (current node will find like edgeList[j][0] == node) & edgeList[j][1] this will be
        connected node.
    - Now we have to check if connected node is already in current path or not. If it is in, means a visited node is traversing again in CURRENT PATH. so it is cycle.
    - If node is not in current path then check it is visited or not. If is not visited then only call dfs for that node.
    - And if dfs function return result true then return true to main caller.
    - When all connected node visited and cycle not found then at last update Current Node value to false in current path to fresh traversal of other node.
    - And return false.
- If dfs function returns false means no cycle.
- If dfs function returns true means cycle exists.

*/

let B2 = [[1, 2]];
console.log(isCyclicGraph(2, B2));

let B = [
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
];
console.log(isCyclicGraph(5, B));

let B1 = [
    [1, 5],
    [4, 1],
    [2, 4],
    [3, 4],
    [5, 2],
    [1, 3],
];

console.log(isCyclicGraph(5, B1));

//! Path in Directed Graph - From Node 1 to given Node 'A'

/*
 A = 5
 B = [  [1, 2]
        [4, 1],
        [2, 4],
        [3, 4],
        [5, 2],
        [1, 3] ]

 The given doesn't contain any path from node 1 to node 5 so we will return 0.

 A = 5
 B = [  [1, 2]
        [2, 3],
        [3, 4],
        [4, 5] ]

 Path from node 1 to node 5 is ( 1 -> 2 -> 3 -> 4 -> 5 ) so we will return 1.

*/

function isPathExists(A, edgeList) {
    console.log('isPathExists :', edgeList);
    let visited = {};

    const adjList = {}; // Instead of iterating edgeList again and again for each node, simple is to create adjacency list.
    for (let i = 0; i < edgeList.length; i++) {
        const [nodeA, nodeB] = edgeList[i];
        if (adjList[nodeA]) {
            adjList[nodeA].push(nodeB);
        } else {
            adjList[nodeA] = [nodeB];
        }
    }

    // We have to find path from node '1' to given node A. So only call traversal for node 1.
    if (dfs(1)) {
        return 1;
    }
    return 0;

    function dfs(node) {
        visited[node] = true;
        const connectedNodes = adjList[node] || []; // get connected node. In case there is no any connected node for any node then make it empty array.
        for (let j = 0; j < connectedNodes.length; j++) {
            if (!visited[connectedNodes[j]] && connectedNodes[j] == A) {
                return true; // path exists from 1 to A
            }
            // If node is not visited then only call dfs for that node.
            if (!visited[connectedNodes[j]] && dfs(connectedNodes[j])) {
                return true; // if DFS return true then return true to main caller.
            }
        }
        return false;
    }
}

let B5 = [
    [1, 2],
    [2, 3],
    [4, 3],
];

console.log(isPathExists(4, B5));

const A = 5;
let B3 = [
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
];

console.log(isPathExists(A, B3));

let B4 = [
    [1, 2],
    [4, 1],
    [2, 4],
    [3, 4],
    [5, 2],
    [1, 3],
];

console.log(isPathExists(5, B4));

//! Number of islands
//Question link - https://www.scaler.com/academy/mentee-dashboard/class/70800/assignment/problems/4702/?navref=cl_pb_nv_tb

/*
Given a matrix of integer A[i][j] contains 1 (land) and 0 (water).
Island is a group of connected of 1's. Find the number of Islands.
From (i, j) you can move to any direction up, down, left right and diagonally.


1 0 1
1 0 1
1 1 1

Here all 1's are connected so formed Island is 1.

1 1 0 0 0
0 1 0 1 0
1 0 0 1 1
0 0 0 0 0
1 0 1 1 1

Here total islands are 4.

*/

/*
* Solution-

@ We can move to 8 directions from any Node. 4 Diagonals and up down, left right.

From a Node (i, j), column coordinates where we can go are -

   [i-1, j-1]       [i-1, j]        [i-1, j+1]

    [i, j-1]          [i, j]         [i, j+1]

   [i+1, j-1]       [i+1, j]        [i+1, j+1]


0 => Top Left
1 => Top
2 => Top Right
3 => Left
4 => Right
5 => Bottom Left
6 => Bottom
7 => Bottom Right

Lets create an direction array of only additional values which are using to get a column.


          0   1   2   3   4   5   6   7
d(i) = [ -1  -1  -1   0   0  +1  +1  +1  ]
d(j) = [ -1   0  +1  -1  +1  -1   0  +1  ]


@ When we traverse a matrix we also need a visited matrix of same rows and columns to store info of column is visited or not.


*/

// A is input  2*2 matrix
function islands(A) {
    console.log('islands :', A);
    let v = []; // v is visited matrix same row and column of A
    let numberOfIslands = 0;

    // Belows are directions values which will use to find next columns.
    // By seeing matrix and a Node, we can write down these values easily.
    let dI = [-1, -1, -1, 0, 0, +1, +1, +1];
    let dJ = [-1, 0, +1, -1, +1, -1, 0, +1];

    // Step 1 :: Create visited array
    for (let i = 0; i < A.length; i++) {
        v.push([]);
        for (let j = 0; j < A[0].length; j++) {
            v[i].push(false);
        }
    }

    // Step 2 :: Outer loop on all row and columns

    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[0].length; j++) {
            // Step 3 :: If value is 1 and that is not visited, call traversal
            if (A[i][j] == 1 && !v[i][j]) {
                // If there is single 1 or connected 1s, island will be counted 1 thats why increased value here.
                numberOfIslands++;
                // Purpose of dfs function is only to mark visited all connected node only. nothing to return from there.
                dfs(i, j);
            }
        }
    }

    function dfs(i, j) {
        v[i][j] = true; // mark that node to visited

        // Step 4 :: loop over all direction for a node. (we have total 8 directions)
        for (let k = 0; k < 8; k++) {
            const newI = i + dI[k]; // by adding dI values we can get new I index.
            const newJ = j + dJ[k];

            // Step 5 :: Check if Node is in matrix Boundaries or not

            if (newI >= 0 && newI < A.length && newJ >= 0 && newJ < A[0].length) {
                // Step 6 :: check new node is 1 and not visited then traverse again
                if (A[newI][newJ] == 1 && !v[newI][newJ]) {
                    dfs(newI, newJ);
                }
            }
        }
    }
    return numberOfIslands;
}

const a = [
    [0, 1, 0],
    [0, 0, 1],
    [1, 0, 0],
]; // 3 * 3 matrix

console.log(islands(a)); //2

const a1 = [
    [1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [1, 0, 0, 1, 1],
    [0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1],
];

console.log(islands(a1)); //4

//! Shortest Distance in a Maze - its incomplete - Hard problem

// A is given matrix, B is source and C is destination
function shortestPath(A, B, C) {
    console.log('shortestPath :', A);
    let v = []; // v is visited matrix
    let shortestPath = -1; // initialize with -1 means there is no way to reach destination
    let tempPath = -1;

    // Belows are directions (Top, Right, Bottom and Left) values which will use to find next columns.
    // By seeing matrix and a Node, we can write down these values easily.
    // As per question statement we cannot go to diagonally.

    // 0 - top, 1 - right, 2 - bottom, 3 - left
    let dI = [-1, 0, +1, 0];
    let dJ = [0, +1, 0, -1];
    let landingDir = [2, 3, 0, 1];

    // Step 1 :: Create visited array
    for (let i = 0; i < A.length; i++) {
        v.push([]);
        for (let j = 0; j < A[0].length; j++) {
            v[i].push({});
        }
    }

    console.log(v)

    // Check destination valid - to stop ball, destination must have at least one neighbor wall Or should be with boundaries wall.

    let isValid = false;
    if (C[0] == 0 || C[0] == A.length - 1 || C[1] == 0 || C[1] == A[0].length - 1) {
        isValid = true;
    }
    for (let k = 0; k < 4; k++) {
        let I = C[0] + dI[k];
        let J = C[1] + dJ[k];
        if (A[I] && A[I][J] && A[I][J] == 1) {
            isValid = true;
            break;
        }
    }

    if (!isValid) {
        return -1;
    }

    // Step 2 :: Outer loop on all row and columns

    for (let i = B[0]; i < A.length; i++) {
        for (let j = B[1]; j < A[0].length; j++) {
            if (B[0] == i && B[1] == j && A[i][j] == 0 && !v[i][j][0]) {
                tempPath = -1;
                dfs(i, j, 0);
            }
        }
    }
    return shortestPath;

    function dfs(i, j, dir) {
        v[i][j][dir] = true;
        for (let k = 0; k < 4; k++) {
            let newI = i + dI[k];
            let newJ = j + dJ[k];
            if (newI >= 0 && newI < A.length && newJ >= 0 && newJ < A[0].length) {
                if (C[0] == newI && C[1] == newJ && A[newI][newJ] == 0 && !v[newI][newJ][landingDir[k]]) {
                    tempPath++;
                    shortestPath = shortestPath < 0 ? tempPath : Math.min(shortestPath, tempPath);
                    tempPath = 0;
                }
                // Step 6 :: check new node is 1 and not visited then traverse again
                if (A[newI][newJ] == 0 && !v[newI][newJ][landingDir[k]]) {
                    tempPath++;
                    dfs(newI, newJ, landingDir[k]);
                }
            }
        }
    }
}

const e1 = [
    [0, 1, 0],
    [0, 0, 1],
    [1, 0, 0],
];
const e2 = [0, 0];
const e3 = [2, 2];

console.log(shortestPath(e1, e2, e3)); // 4

// const c1 = [
//   [0, 0],
//   [0, 0],
// ];
// const c2 = [0, 0];
// const c3 = [0, 1];

// console.log(shortestPath(c1, c2, c3)); // 1

const d1 = [
    [0, 1],
    [1, 0],
];
const d2 = [0, 0];
const d3 = [1, 1];

//console.log(shortestPath(d1, d2, d3)); // -1

const f1 = [
    [1, 1, 0, 1],
    [0, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 0, 1, 0],
];
console.log(shortestPath(f1, [1, 1], [2, 1])); //3

const g1 = [
    [0, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 1, 0, 1, 1, 0],
    [1, 1, 0, 1, 1, 1],
    [1, 0, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 1, 0], //7
    [0, 1, 0, 0, 0, 0], //8
    [0, 0, 0, 0, 0, 0],
];

//console.log(shortestPath(g1, [7, 5], [8, 3])); //-1



//! Rotten Oranges

/* Given a matrix of integers A of size N x M consisting of 0, 1 or 2.

Each cell can have three values:

The value 0 representing an empty cell.
The value 1 representing a fresh orange.
The value 2 representing a rotten orange.

Every minute, any fresh orange that is adjacent (Left, Right, Top, or Bottom) to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1 instead.

Input:

A = [   [2, 1, 1]
        [1, 1, 0]
        [0, 1, 1]   ]

output: 4

*/

/*
@ Approach

- Every unit of time, all direct adjacent (Left, Right, Top, or Bottom) of a rotten orange become rotten.
- First find out all locations of rotten oranges because rotten process will start from those cells parallel.
- Most important thing is that generally we have one source Node but in this problem we have multiple source nodes. Thats why such problems called MULTI SOURCE problems.
- We have to traverse all adjacent of Nodes so will use here BFS. (Queue data structure will be used here)

- Initially traverse matrix and put all rotten oranges in Queue with initial time 0.
- Now loop over on Queue.
- One important thing to note is that time of all direct adjacent will be same & that will be greater than its parent cell.
- Direction where user can move: [[-1, 0], [1, 0], [0, -1], [0, 1]]; // top, bottom, left, right
- During traverse once any adjacent item is found 1 then change it to rotten (value 2) and insert into Queue with time increment.


- At last again traverse matrix to check for fresh oranges. If any one is left then simply return -1.


*/

// TC = O(n * m) and SC = O(number of items in queue -- max n * m)
function rottenOranges(A) {
    console.log('rottenOranges :', A);
    let q = []; // Queue data structure
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[0].length; j++) {
            if (A[i][j] == 2) { // only push rotten oranges from Queue First, process will start from those.
                q.push([i, j, 0]); //[i, j, time] -- Initially time is 0
            }
        }
    }
    let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // top, bottom, left, right
    let requiredTime = 0;
    while (q.length > 0) {
        let [x, y, t] = q.shift(); // have to use Queue pop method
        requiredTime = t;

        // 0, 1, 2, 3 - there are four directions where we can move
        for (let i = 0; i < 4; i++) {
            let newI = x + directions[i][0];
            let newJ = y + directions[i][1];
            if (newI >= 0 && newI < A.length && newJ >= 0 && newJ < A[0].length) {
                if (A[newI][newJ] == 1) {
                    A[newI][newJ] = 2; // update value 1 to 2 in original array
                    q.push([newI, newJ, t + 1]);
                }
            }

        }
    }
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[0].length; j++) {
            if (A[i][j] == 1) {
                return -1; // Traverse again and check if any 1 value is left. (Means all oranges did not rotten.)
            }
        }
    }
    //console.log(A)
    return requiredTime;
}

const a4 = [
    [2, 1, 1],
    [1, 1, 0],
    [0, 1, 1]
]

const a5 = [
    [2, 1, 1],
    [0, 1, 1],
    [1, 0, 1]]

console.log(rottenOranges(a4));

console.log(rottenOranges(a5));


//! Coloring graph

/*
* There are total 3 Special cases on coloring graphs.

1. Trees
                   [1]                             --- level 1
                /       \           \
          [2]             [3]           [4]        --- level 2
      [5]     [6]     [7]      [8]                 --- level 3



Node [1] will be one Color. Lets say Color of Node [1] is 'A'.
Node [2], [3], [4] are adjacent of Node [1] so they will be of different color. So color of these are 'B'.
Node [5] and [6] are adjacent of Node [2], so we can give them a color 'A'.
Node [7] and [8] are adjacent of Node [3] so we can assign color 'A to these Nodes.


Total Color required is 2.

IF there is single Node is tree then required color is 1 Else required color will be 2 for any level of tree.


2 Cycle Graph

- If Number of Nodes are even then required min color will be 2.
- If Number of Nodes are Odd then required min color will be 3.


[1]-----[2]
 |       |
 |       |
 |       |
[3]-----[4]


Number of Nodes are Even here so color required is 2.
Node [1] & [4] will be of same color and Nodes [3], [2] will be of same color.

        [1]
      /     \
     [2]    [3]
      |      |
      |      |
     [4]----[5]

Number of Nodes are Odd here so required color are 3.


3. Bipartite Graph

Nodes of graph can be divided in to two sets such that there is no edge between the nodes in the same set.


[1]----[2]-----[3]
 |      |       |
[4]----[5]-----[6]
    \        /
     \      /
        [7]


[1]----[2], [4]

[3]----[2], [6]

[5]----[4], [6]

[7]---[4], [6]

So there are two sets formed [1, 3, 5, 7] and [2, 4, 6].

Min Required color = 2.  (it is also called Chromatic number)

Chromatic number means  - distinct minimum number.


        [1]
      /     \
     [2]    [3]
      |      |
      |      |
     [4]----[5]

 [1]----[2], [3]

 [2]---[4], [1]

 [4]----[5], [2]

 [3]---[5], [1]

 There was possible 2 sets [1, 4, 3] and [2, 5] but  3 is also connected with 1. So that is not bipartite graph.



*/

//! Coloring graph question based on cycle graph

/* Given the number of vertices A in a Cyclic Graph.
Your task is to determine the minimum number of colors required to color the graph so that no two Adjacent vertices
have the same color.
*/

// A is number of vertices.
function coloringGraph(A) {
    console.log('coloringGraph :', A);

    /*
    - If Number of Nodes are even in Cyclic graph then chromatic number will be 2.
    - If Number of Nodes are Odd then then chromatic number will be 3.
 */
    if (A % 2 == 0) {
        return 2;
    }
    else {
        return 3;
    }

}


//! Check Bipartite Graph Question

/*
Given a undirected graph having A nodes. A matrix B of size M x 2 is given which represents the edges.

A graph is bipartite if we can split it's set of nodes into two independent subsets A and B such that every edge in the graph has one node in A and another node in B.

Input:
A = 2 (number of nodes)
B = [ [0, 1] ]  (edges connection)

Output: 1 (it is bipartite graph)
*/

/*
@ Approach

- We create two subsets to check Bipartite.
- Lets say that first subset is 0 (named) and second subset is 1 (named).
- Now one by one we will assign subset name to each Node.
- We are given a matrix of edges, so first we will create adjacency list based on the given input.
- Initially for each Node assign subset value -1.
- We have to call dfs only if node is not in any subset means its value is -1.
- Before start on graph problems, we always first create adjacency List.
- Most important things is that, If in problem, directed graph is mentioned then only create one side Adj list
 else create both side Adj list.


*/

/**
 *
 * @param {*} A - number of nodes
 * @param {*} B - edges matrix
 */
function checkBipartite(A, B) {
    console.log('checkBipartite :', A);
    let adjList = {};

    // Code to create adjacency List for both directions :: List is a type of Map
    // In problem statement nothing is mentioned like directed graph thats why created adj list for both directions.
    for (let i = 0; i < B.length; i++) {
        let [first, second] = B[i];
        if (adjList[first]) {
            adjList[first].push(second);
        } else {
            adjList[first] = [second];
        }

        if (adjList[second]) {
            adjList[second].push(first);
        } else {
            adjList[second] = [first];
        }

    }
    console.log(adjList);
    let subset = []; // Chromatic number array

    for (let i = 0; i < A; i++) {
        subset[i] = -1;
    }

    for (let i = 0; i < A; i++) {
        if (subset[i] == -1) {
            subset[i] = 0; // Assign subset 0 to Node 0
            if (!dfs(i)) {
                console.log(subset)
                return 0;
            }
        }
    }
    console.log(subset)
    return 1;

    function dfs(node) {
        let connectedNodes = adjList[node]; // get all adjacent Nodes
        if (connectedNodes) {
            for (let i = 0; i < connectedNodes.length; i++) {
                if (subset[connectedNodes[i]] == subset[node]) { // If source and adjacent have same subset value means that is bipartite
                    return false;
                }
                else if (subset[connectedNodes[i]] == -1) { // If adjacent Node is not in any subset
                    subset[connectedNodes[i]] = 1 - subset[node]; // If source is 1 then adjacent will be 0 and vice versa
                    if (!dfs(connectedNodes[i])) { // again call dfs for adjacent Node
                        return false;
                    }
                }
            }
        }
        return true;
    }


}

console.log(checkBipartite(10, [[7, 8], [1, 2], [0, 9], [1, 3], [6, 7], [0, 3], [2, 5], [3, 8], [4, 8]])) //1
console.log(checkBipartite(2, [[0, 1]])) // 1
console.log(checkBipartite(2, [[0, 1], [0, 2], [1, 2]])) // 0



//! Construct Roads (Bipartite graph is given)

/* A country consist of N cities connected by N - 1 roads. King of that country want to construct maximum number of roads such that the new country formed remains bipartite country.


Input:

 A = 5
 B = [
       [1, 3]
       [1, 4]
       [3, 2]
       [3, 5]
     ]

Output:
2

*/


function createBipartiteSubsets(A, B) {
    console.log('createBipartiteSubsets :', A);
    let adjList = {};

    // Code to create adjacency List for both directions :: List is a type of Map
    for (let i = 0; i < B.length; i++) {
        let [first, second] = B[i];
        if (adjList[first]) {
            adjList[first].push(second);
        } else {
            adjList[first] = [second];
        }

        if (adjList[second]) {
            adjList[second].push(first);
        } else {
            adjList[second] = [first];
        }

    }

    console.log('adjList :', adjList);
    let subset = []; // Chromatic number array

    // Nodes are started from Value 1 to A.
    for (let i = 1; i <= A; i++) {
        subset[i] = -1; // initialize Nodes subset to -1
    }

    for (let i = 1; i <= A; i++) {
        if (subset[i] == -1) {
            subset[i] = 0; // Assign subset 0 to Node 0
            dfs(i);
        }
    }

    function dfs(node) {
        let connectedNodes = adjList[node]; // get all adjacent Nodes
        if (connectedNodes) {
            for (let i = 0; i < connectedNodes.length; i++) {
                if (subset[connectedNodes[i]] == -1) { // If adjacent Node is not in any subset
                    subset[connectedNodes[i]] = 1 - subset[node]; // If source is 1 then adjacent will be 0 and vice versa
                    dfs(connectedNodes[i]);
                }
            }
        }
    }

    let countA = 0; // count element of subset 0
    let countB = 0; // count elements of subset 1

    for (let i = 1; i <= A; i++) {
        if (subset[i] == 0) {
            countA++;
        } else {
            countB++;
        }
    }
    console.log(subset)
    // First calculate total possible edges among Nodes : so that are a * b
    // In problem statement already given that A - 1 road is already constructed.
    // So simply remove that A - 1 from total to get more roads.
    return ((countA * countB) - (A - 1)) % 1000000007;
}
const B6 = [
    [1, 3],
    [1, 4],
    [3, 2],
    [3, 5]
]

console.log(createBipartiteSubsets(2, [[2, 1]])) // 0

console.log(createBipartiteSubsets(5, B6)) //2

console.log(createBipartiteSubsets(10, [[7, 8], [1, 2], [0, 9], [1, 3], [6, 7], [0, 3], [2, 5], [3, 8], [4, 8]]))  // 16




//!  Distance of nearest cell

/* Given a matrix of integers A of size N x M consisting of 0 or 1.
For each cell of the matrix find the distance of nearest 1 in the matrix.
Distance between two cells (x1, y1) and (x2, y2) is defined as |x1 - x2| + |y1 - y2|.
Find and return a matrix B of size N x M which defines for each cell in A distance of nearest 1 in the matrix A.

NOTE: There is at least one 1 is present in the matrix.

Input:

A = [
      [0, 0, 0, 1],
      [0, 0, 1, 1],
      [0, 1, 1, 0]
    ]

Output:

[
  [3, 2, 1, 0],
  [2, 1, 0, 0],
  [1, 0, 0, 1]
]
*/

function nearestCell(A) {
    console.log('nearestCell Brute force:', A);

    let onesPositions = [];

    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[0].length; j++) {
            if (A[i][j] == 1) {
                onesPositions.push([i, j]);
            }
        }
    }
    //console.log(onesPositions)

    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[0].length; j++) {
            if (A[i][j] == 0) {
                let distance = Number.MAX_SAFE_INTEGER;
                onesPositions.forEach(element => {
                    let d = Math.abs(i - element[0]) + Math.abs(j - element[1]);
                    if (d < distance) {
                        distance = d;
                    }
                });
                A[i][j] = distance;
            } else {
                A[i][j] = 0;
            }
        }
    }
    return A;

}

const c1 = [
    [0, 0, 0, 1],
    [0, 1, 1, 1],
    [0, 1, 1, 0]
]


console.log(nearestCell(c1));

/*
@Approach

- This is like multi source BFS problem. Because here we have to find distance from 1 to each cell.
- Means Source are 1, from where we have to calculate distance.
- Matrix is also a graph and best way to solve multi source problem is using bfs technique.
- First create a Queue and push all 1's position into that with initial distance 0 because 1 have distance 0.
- There are 4 directions where we can move. [[-1, 0], [1, 0], [0, -1], [0, 1]]; // top, bottom, left, right
- Also create Queue data structure here else it will give time limit exceed error.

*/

class Node {
    data;
    next;
    constructor(value) {
        this.data = value;
        this.next = null;
    }
}

// Based on linked list
class Queue {
    head;
    tail;
    constructor() {
        this.head = null;
        this.tail = null;
    }
    enqueue(value) {
        const node = new Node(value);
        if (this.head == null) {
            this.head = node;
            this.tail = node;
        } else {
            // If we do not track tail then to reach last node, we will use while loop
            this.tail.next = node; // make new node to current tail next element
            this.tail = node; // now make tail to last newly added element
        }
    }
    dequeue() {
        if (this.head == null) {
            return null;
        }
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
}

function nearestCellUsingBFS(A) {
    console.log('nearestCell Using BFS :', A);
    let q = new Queue(); // Queue data structure
    let ans = [];
    for (let i = 0; i < A.length; i++) {
        ans.push([]);
        for (let j = 0; j < A[0].length; j++) {
            if (A[i][j] == 1) { // only push 1 in Queue First, process will start from those.
                q.enqueue([i, j, 0]); //[i, j, distance] -- Initially distance is 0 because for 1, distance is 0
                ans[i][j] = 0;
            } else {
                ans[i][j] = -1;
            }

        }
    }
    // console.log(ans);
    let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // top, bottom, left, right
    while (!q.isEmpty()) {
        let [x, y, d] = q.dequeue(); // have to use Queue pop method

        // 0, 1, 2, 3 - there are four directions where we can move
        for (let i = 0; i < 4; i++) {
            let newI = x + directions[i][0];
            let newJ = y + directions[i][1];
            if (newI >= 0 && newI < A.length && newJ >= 0 && newJ < A[0].length) {
                if (A[newI][newJ] == 0 && ans[newI][newJ] == -1) {
                    ans[newI][newJ] = d + 1;
                    q.enqueue([newI, newJ, d + 1]);
                }
            }
        }
    }
    return ans;

}
const c2 = [
    [0, 0, 0, 1],
    [0, 1, 1, 1],
    [0, 1, 1, 0]
]

console.log(nearestCellUsingBFS(c2));

const c3 = [
    [0, 0, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0]
]
console.log(nearestCellUsingBFS(c3));