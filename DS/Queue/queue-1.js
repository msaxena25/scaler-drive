
//! Implement Queue using Linked List

//  The queue rule says that insertion takes place at one end and deletion takes place at the other end, i.e., First In, First Out(FIFO).

/*

* A queue is a linear data structure that follows the First in, First out principle(FIFO)
* It can be implemented using an array and linked list. The benefit of implementing a queue using a linked list over arrays is that it allows to grow the queue as per the requirements, i.e., memory can be allocated dynamically.
* A good example of Queue is Ticket window, where the customer who comes first will be served first.

 Queue =        [4, 5, 3, 1, 9, 6]
            -> Entry            -> Exit
            (Front)                (Rear)
            (Enqueue)              (Dequeue)

? Operations on Queue-

1. enqueue(x) = Insert element at rear end
2. dequeue() = Remove element from front side
3. isEmpty() = Check queue is empty or not
4. front() = Get front element
5. rear()  = Get rear element

? Linked List Implementation :: We will track head and tail both node for processing.

enqueue(2)
enqueue(4)
enqueue(7)
dequeue()
dequeue()
enqueue(5)

[2]
head / tail

[2] => [4]
head    tail

[2] => [4] => [7]
head            tail

[4] => [7]
head    tail

[7]
head / tail

[7] => [5]
head    tail

*/

class Node {
    data;
    next;
    constructor(value) {
        this.data = value;
        this.next = null;
    }
}

// * All operation takes only O(1) time & SC = O(1).
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

const q = new Queue();
q.enqueue(3);
q.enqueue(7);
q.enqueue(9);
q.enqueue(11);
q.enqueue(13);


console.log(q.head)
console.log(q.front());
console.log(q.rear())
console.log(q.isEmpty())

q.dequeue(11);
q.dequeue(3);
q.dequeue(13);

console.log(q.head)

const qu2 = new Queue();
qu2.enqueue([3, 0]);
qu2.enqueue([2, 1]);
qu2.enqueue([9, 2]);
console.log('qu2.dequeue([3, 0])', qu2.dequeue([3, 0]))
//console.log(qu2.head)
console.log(qu2.front());
console.log(qu2.rear())
console.log(qu2.isEmpty())
