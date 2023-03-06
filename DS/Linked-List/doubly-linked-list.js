// https://www.scaler.com/topics/data-structures/doubly-linked-list/

/*
Doubly Linked List is a Data Structure, which is a variation of the Linked List, in which the transversal is possible in both the directions, forward and backward.


So if a Linked List ⇒ A → B → C
* Then a Doubly Linked List ⇒ A ⇆ B ⇆ C

*/

//@ What are downsides of DLL over SLL ?

/*
- It takes extra memory to store this extra pointer, over the Singly Linked list.
- Every operation(insert/delete etc.) has an extra overhead of managing the previous pointer as well.

*/

//@ Examples of DLL where we can see this?

/*
1. To implement undo and redo operations where all the operations are represented using doubly linked list, an undo can be done by iterating backwards and redo by iterating forward.
2. Browsers like Google Chrome have a “go Forward” and “Go backward” button, to transverse back the visited websites, which are represented using doubly Linked list.
3. It finds its usage in navigation systems which need forward and backward navigation.


*/

/* class Node {
    Node previous;  // Pointer to the Previous Element
    int value;      // Value stored in this element.
    Node next;      // Pointer to the Next Element
} */

//! LRU Cache

//? Leet code link
// https://leetcode.com/problems/lru-cache/

// https://www.scaler.com/academy/mentee-dashboard/class/47709/assignment/problems/239?navref=cl_tt_lst_nm

/*

Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and set.

get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
set(key, value) - Set or insert the value if the key is not already present. When the cache reaches its capacity, it should invalidate the least recently used item before inserting the new item.

The LRUCache will be initialized with an integer corresponding to its capacity. Capacity indicates the maximum number of unique keys it can hold at a time.

Definition of "least recently used" : An access to an item is defined as a get or a set operation of the item. "Least recently used" item is the one with the oldest access time.

*/