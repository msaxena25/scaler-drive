//! Cycle in Directed Graph

/*
Number of nodes  => A = 5

 B = [  [1, 2],
        [4, 1],
        [2, 4],
        [3, 4],
        [5, 2],
        [1, 3] ]

Output =>  The given graph contain cycle 1 -> 3 -> 4 -> 1 or the cycle 1 -> 2 -> 4 -> 1
        */

function findCycleInGraph(A, B) {
    console.log('findCycleInGraph :', A);
    let visited = {};
    let path = {};
    for (let i = 0; i < A; i++) {
        if (!visited[i + 1]) { // Node value start from 1 & indices are from 0.
            const isCycle = dfs(i + 1, B);
            if (isCycle) {
                return 1;
            }
        }
    }
    return 0; // If cycle does not exist

    function dfs(node, B) {
        visited[node] = true;
        path[node] = true;
        const adjacent = B[node - 1];
        if (adjacent) {
            for (let j = 0; j < adjacent.length; j++) {
                let adjacentNode = adjacent[j];
                if ( path[adjacentNode]) {
                    return true; // cycle exists in current path
                }
                if (!visited[adjacentNode]) {
                    const isCycle = dfs(adjacentNode, B);
                    if (isCycle) {
                        return true;
                    }
                }
            }
        }
        path[node] = false;
        return false;
    }
}

let B2 = [[1, 2]]
console.log(findCycleInGraph(2, B2))

let B = [[1, 2],
[2, 3],
[3, 4],
[4, 5]]
console.log(findCycleInGraph(5, B))

let B1 = [[1, 2],
[4, 1],
[2, 4],
[3, 4],
[5, 2],
[1, 3]]

console.log(findCycleInGraph(5, B1))