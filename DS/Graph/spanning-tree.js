
//@ https://www.scaler.com/topics/data-structures/spanning-tree/

/*
? What is Spanning Tree?

A spanning tree is a sub-graph that connects all the vertices of a graph with the minimum possible number of edges.
It may or may not be weighted and does not have cycles.
The Spanning tree has a minimal set of edges.
A single connected graph can have multiple spanning trees.
A minimum spanning tree would be one with the lowest total cost.
The cost of the spanning tree is the sum of the weights of all the edges in the tree.

* A Spanning tree always contains n-1 edges, where n is the total number of vertices in the graph G.

* The total number of spanning trees that a complete graph of n vertices can have is n^(n-2).

Below is a Graph that have three Nodes A, B and C.
Cost of A to B = 4
Cost of A to C = 5
Cost of B to C = 7

             [A]
          4 /   \ 5
           /     \
         [B]----[C]
             7

--- There are three possible Spanning Tree of above graph.

        [A]----[B]-----[C]         [C]-----[A]----[B]     [A]-----[C]-----[B]
            4      7                    5       4              5        7

Cost            11                         9                      12

@ Minimum Spanning Tree is second one that have lowest cost (9).

*/


//! Minimum Spanning Tree Algorithm

/* Let us study the minimum spanning tree algorithm. So there are two famous algorithms
for finding the Minimum Spanning Tree:

* Prim's and Kruskal's Algorithm

*/