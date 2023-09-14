
//! Topological Sorting

//@ https://www.scaler.com/topics/data-structures/topological-sort-algorithm/


/*
If we have a --> b, a must appear before b in the topological order.

Topological order or sort is a Linear ordering of Nodes such that all the edges of the graph go from left to right.

Its main usage is to detect cycles in directed graphs since no topological order is possible for a graph that contains a cycle. Some of its uses are deadlock detection in OS, Course schedule problems, etc.

Essentially, topological sort is an algorithm which sorts a directed graph by returning an array or a vector, or a list, that consists of nodes where each node appears before all the nodes it points to.


@ why Directed Graph?

Topological order is possible for directed graph only. Because We mentioned that we must perform a particular action before going to the next action. Basically, we have an order that must be followed, so it surely makes sense if the graph is directed, with each node's content being a particular action.



[1]-----→[2]----->[5]
    ↘       ↘     ↗
      ↘       ↘ ↗
       [3]---> [4]


Topological Order > Multiple Orders are possible.

[1, 2, 3, 4, 5]

[1, 3, 2, 4, 5]

Invalid Order => [3, 4, 5, 2, 1]


* Directed Cyclic graphs do not have a topologically sorted order.

[1]------>[2] <------[4]
            ↘         ↗
              ↘     ↗
                [3]

[1, 2, 3, 4] - Invalid because 4 is dependent on 2 so should come before 2.

[3, 4, 2, 1] - 3 is dependent on 2 so should come first before 2.

So simply means because of cycle present in graph, unable to find out which Node should come first in Topological sort.
*/

//! Algorithms to Find Topological Sorting


/*

To find the topologically sorted order of any graph, we have 2 algorithms that can be used -

Kahn's Algorithm, Depth-first search. In this article, we'll discuss the Kahn's algorithm in detail.

*/


/*
@ Kahn's Algorithm


? A Nodes is dependent on 3 other Nodes. How we know that?

That is called In-degree of that Node. If In-degree of a node is 3 means 3 edges are pointing to that particular Node.

  [1]----->[2]<-----[3]

  In above graph, Node 2 have 2 indegree.

? What is the meaning of Indegree 0 ?

- 0 indegree means that Node is not dependent on any other Node. SO In topological order, such node we can consider first who have indegree 0.


*/

//! Given directed graph Edges List and number of Nodes. Find out Indegree of vertices.

// First create adj List
function createAdjacencyList(B) {
    let adjList = {};

    // Code to create adjacency List :: Graph is Directed graph so only consider left to right side.
    for (let i = 0; i < B.length; i++) {
        let [first, second] = B[i];
        if (adjList[first]) {
            adjList[first].push(second);
        } else {
            adjList[first] = [second];
        }
    }
    return adjList
}

// TC  - O(N + E)
function findIndegree(A, B) {
    // console.log('find Indegree of Vertices :', A);
    let adjList = createAdjacencyList(B);
    // Initialize indegree of each vertices with 0.
    let indegree = [];
    for (let i = 1; i <= A; i++) {
        indegree[i] = 0;
    }
    for (let i = 1; i <= A; i++) {
        const adjacencyNodes = adjList[i] || [];
        adjacencyNodes.forEach(node => {
            indegree[node]++; // every time, when node appears, increase its indegree count.
        });
    }
    return indegree;
}


const B1 = [
    [1, 3],
    [1, 4],
    [3, 2],
    [3, 5],
    [2, 5],
    [4, 5],
    [3, 4],
    [6, 3]
]

console.log(findIndegree(6, B1)); //[0, 1, 1, 2, 3]


//! Topological Order (Kahn's Algorithm)

/*
- First create adjacency list from given set of edge list
- Create indegree of each vertices
- Push all indegree 0 vertices into Queue
- loop over on Queue which it does not be empty
- Shift a Node and add into answer array.
- Find all adjacent Nodes and decrease degree by 1.
- Once degree reaches to 0 then push it into queue. Reaching indegree 0 means, that Node is not dependent on any other Node now.

*/
function topologicalOrder(A, B) {
    console.log('topologicalOrder :', A);
    let adjList = createAdjacencyList(B);
    //console.log('adjList :', adjList);
    const inDegree = findIndegree(A, B);
    //console.log('inDegree :', inDegree);

    let q = [];

    for (let i = 1; i <= inDegree.length; i++) {
        if (inDegree[i] == 0) {
            q.push(i);
        }
    }
    let orderAns = [];
    // console.log(q)

    while (q.length > 0) {
        let node = q.shift();
        orderAns.push(node);
        const adjacencyNodes = adjList[node] || [];
        adjacencyNodes.forEach(node => {
            inDegree[node]--; // every time, when node appears, decrease its indegree count.
            if (inDegree[node] == 0) {
                q.push(node);
            }
        });
    }
    // If all Nodes are not part of topological order, it means somewhere cycle exists in graph then return []
    return orderAns.length == A ? orderAns : [];

}

console.log(topologicalOrder(6, B1)); // [1, 6, 3, 2, 4, 5]


const B2 = [
    [1, 3],
    [1, 4],
    [3, 2],
    [2, 4],
    [4, 3]
]

//console.log(topologicalOrder(4, B2)); //[0, 1, 1, 2, 3]


const B3 = [[6, 3],
[6, 1],
[5, 1],
[5, 2],
[3, 4],
[4, 2]]

//console.log(topologicalOrder(6, B3));

const B4 = [[1, 4], [1, 2], [4, 2], [4, 3], [3, 2], [5, 2], [3, 5], [8, 2], [8, 6]];

//console.log(topologicalOrder(8, B4)); //1 4 3 5 7 8 2 6


//! Topological Order (DFS Algorithm) -- todo


function topologicalOrderDFS(A, B) {
    console.log('topologicalOrderDFS :', A);
    const list = createAdjacencyList(B);
    console.log('list :', list);
    let v = []; // vertices visited array
    let ans = [];
    for (let i = 1; i <= A; i++) {
        v[i] = false;
    }

    for (let i = 1; i <= A; i++) {
        if (!v[i]) {
            dfs(i);
        }
    }

    function dfs(node) {
        v[node] = true;
        const adjacent = list[node];
        if (adjacent) {
            adjacent.forEach(element => {
                if (!v[element]) {
                    dfs(element);
                }
            });
        }
        console.log(node)
    }
    return ans;
}

console.log(topologicalOrderDFS(8, B4)); //1 4 3 5 7 8 2 6