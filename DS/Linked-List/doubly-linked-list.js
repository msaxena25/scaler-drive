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

//! Create Doubly Linked List data structure

class Node {
    previous;
    next;
    data;
    constructor(value) {
        this.data = value;
        this.previous = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    head = null;
    insert(value) {
        let node = new Node(value);
        if (this.head == null) {
            this.head = node;
        } else {
            let curr = this.head;
            while (curr.next != null) {
                curr = curr.next;
            }
            node.previous = curr;
            curr.next = node;
        }
    }
    print() {
        return this.head;
    }
}

var dll1 = new DoublyLinkedList();
dll1.insert('A')
dll1.insert('B')
dll1.insert('C')
dll1.insert('A')
dll1.insert('D')

console.log(dll1.print())

//! Delete the first occurance of X in DLL (Doubly linked list), If not present X, do nothing.

/*
List is = A ⇆ B ⇆ C ⇆ D ⇆ C ⇆ F     & X = C
Output =  A ⇆ B ⇆ D ⇆ C ⇆ F

*/

function deleteFirstOccurance(head, X) {
    console.log('deleteFirstOccurance :', head);
    let curr = head;
    while (curr != null) {
        if (curr.data == X) {
            let prev = curr.previous;
            let next = curr.next;
            if (prev) {
                prev.next = next;
            }
            if (next) {
                next.previous = prev;
            }
            break;
        }
        curr = curr.next;
    }
    return head;
}

console.log(deleteFirstOccurance(dll1.head, 'A'))





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

//@ Solution 1 :: Used two hash map for storing data and its order. (not recommended this solution)

class LRUCache {
    storage = new Map(); // hash map to store all elements
    order = new Map(); // hashmap to maintain element processing order based on get and set.
    sequence = 0; // provide sequence to each element in Order map
    capacity;
    constructor(capacity) {
        console.log('LRU Cache having capacity', capacity)
        this.capacity = capacity;
    }
    get(key) {
        if (this.storage.has(key)) {
            this.order.set(key, ++this.sequence);
            return this.storage.get(key);
        } else {
            return -1;
        }
    }
    set(key, value) {
        if (this.storage.size >= this.capacity) {
            // remove least used item
            const lruKey = this.getLruKey();
            this.storage.delete(lruKey);
            this.order.delete(lruKey);
        }
        this.storage.set(key, value); // If key does not exists then this will add else will update value on exist key
        this.order.set(key, ++this.sequence);
    }
    getLruKey() {
        // find out key of least value in order map
        let lru = this.sequence; // initialize with max value
        let lruKey;
        for (const [key, value] of this.order) { //* Iterating map with for..of
            if (value <= lru) {
                lru = value;
                lruKey = key;
            }
        }
        return +lruKey;
    }
}

/* const cache = new LRUCache(3);
cache.set(1, 10);
cache.set(2, 20);
cache.set(3, 30);
cache.get(1);
cache.get(2);
cache.set(4, 40);
cache.get(2);
cache.set(5, 50);
console.log('cache.get(10)', cache.get(10))
console.log(cache.storage); */

/* const cache1 = new LRUCache(1);
cache1.set(2, 1);
cache1.set(2, 2);
console.log('cache1.get(2) :', cache1.get(2)); // 2
cache1.set(1, 1);
cache1.set(4, 1);
console.log('cache1.get(2) :', cache1.get(2)); // -1
console.log(cache1.storage); */

// 6 2 S 2 1 S 1 1 S 2 3 S 4 1 G 1 G 2
const cache2 = new LRUCache(2);
cache2.set(2, 1);
cache2.set(1, 1);
cache2.set(2, 3);
cache2.set(4, 1);
console.log('cache2.get(1) :', cache2.get(1)); // -1
console.log('cache2.get(2) :', cache2.get(2)); // 3
console.log(cache2.storage, cache2.order);


//@ Solution 2 :: Use hashmap for element storage and doubly linked list for order maintainence. Cost of each opeartion is O(1)

class LRUCacheWithDLL {
    capacity;
    storage = new Map(); // hash map for element storage
    head = null; // DLL head initialize with null
    tail = null; // DLL tail to maintain last item of list
    constructor(capacity) {
        //console.log('LRUCache With DLL :', capacity);
        this.capacity = capacity;
    }
    insertNode(key) {
        // If head is empty then new node will be head of list else add into last. As we already keep last node in tail variable so simply can set new node as next to tail.
        const node = new Node(key);
        if (this.head == null) {
            this.head = node;
            this.tail = node; // if there is only one element then head & tail will point same.
        } else {
            this.tail.next = node;
            node.previous = this.tail;
            this.tail = node;
        }
    }
    updatePointers(key) {
        /*
        If there is only one node in list, so dont need to update any connection.
        If key already exists in list then simply update connection. Make that element to last element of list to maintain order of opeartion.
         If Performing GET opeartion then also update connection of fetching node. move that node to last.
        */
        if (this.head.next == null) {
            return;
        }
        if (this.head.data == key) {
            let curr = this.head; // take head into current variable
            const next = curr.next; // take head next to a next variable
            curr.next = null; // now make next of curr null. (because we have to move curr to last)
            this.tail.next = curr; // push current node to tail next means at last.
            curr.previous = this.tail; // now tail will be current element previous.
            this.head = next; // now make next element as head
            this.head.previous = null; // head does not have previous so make it null.
            this.tail = curr; // at last main current element as tail element.
        }
        else {
            let curr = this.head;
            while (curr && curr.data != key) {
                curr = curr.next;
            }
            if (curr.previous) {
                curr.previous.next = curr.next;
            }
            if (curr.next) {
                curr.next.previous = curr.previous;
            }
            this.tail.next = curr;
            curr.previous = this.tail;
            curr.next = null;
            this.tail = curr;
        }
    }
    deleteHeadNode() {
        /*  If capacity is over then delete least used node and that is head of list.
         If there is only a single node then simply make head and tail to null.
         If there is more then one element then make next element to head. */
        if (this.head.next == null) {
            this.head = null;
            this.tail = null;
        }
        else {
            this.head.next.previous = null;
            this.head = this.head.next;
        }
    }
    get(key) {
        if (this.storage.has(key)) {
            // maintain dll wiring for node which we just fetched
            this.updatePointers(key);
            return this.storage.get(key);
        } else {
            return -1;
        }
    }
    set(key, value) {
        if (this.storage.size >= this.capacity) {
            // DLL head will be least recently used item so will always delete that one.
            this.storage.delete(this.head.data); // delete least used key
            this.deleteHeadNode();
        }
        if (this.storage.has(key)) {
            this.updatePointers(key);
        } else {
            this.insertNode(key);
        }
        this.storage.set(key, value); // If key does not exists then this will add else will update value on exist key

    }
}

/* const cache3 = new LRUCacheWithDLL(2);
cache3.set(2, 1);
cache3.set(1, 1);
cache3.set(2, 3);
cache3.set(4, 1);
console.log('cache3.get(1) :', cache3.get(1)); // -1
console.log('cache3.get(2) :', cache3.get(2)); // 3
console.log(cache3.storage, cache3.head); */

/* const cache4 = new LRUCacheWithDLL(2);
cache4.set(1, 10);
cache4.set(2, 20);
cache4.set(3, 30);
console.log('cache4.get(1) :', cache4.get(1));
console.log('cache4.get(2) :', cache4.get(2));
cache4.set(4, 40);
console.log('cache4.get(2) :', cache4.get(2));
cache4.set(5, 50);
console.log('cache4.get(10)', cache4.get(10))
console.log(cache4.head); */



const cache6 = new LRUCacheWithDLL(1);
cache6.set(2, 1);
cache6.set(2, 2);
console.log('cache6.get(2) :', cache6.get(2)); // 2
cache6.set(1, 1);
cache6.set(4, 1);
cache6.set(1, 1);
cache6.set(4, 3);
cache6.get(1);
cache6.get(4);
console.log('cache6.get(2) :', cache6.get(2)); // -1
console.log(cache6.head);