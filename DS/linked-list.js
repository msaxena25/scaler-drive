
/*
@ What is Linked List?

Linked lists are linear data structures that hold data in individual objects called nodes. These nodes hold both the data and a reference to the next node in the list.
A linked list is a dynamic data structure so it can grow and shrink at runtime by allocating and deallocating memory. So there is no need to give the initial size of the linked list.

@ Difference between Array and LinkedList?

Array stores the data elements in a contiguous memory zone. Linked List stores elements randomly, or we can say anywhere in the memory zone.
In Array, The elements are not dependent on each other. In linked list, The data elements are dependent on each other.
In array, When it comes to executing any operation like insertion, deletion, array takes more time.
In Linked list, When it comes to executing any operation like insertion, deletion, the linked list takes less time.

*/

//* Structure: [1, next] -> [2, next] -> [3, next] -> null


// Create a Node Class

class Node {
    value;
    next;
    constructor(value) {
        this.value = value;
        this.next = null; // initially next is null
    }
}

var head = new Node(1);
head.next = new Node(2);
console.log(head) // Node {value: 1, next: Node}


//! Insertion at begining


console.log('Insertion at start')
function insertionAtStart(head, value) {
    let newNode = new Node(value);
    newNode.next = head;
    head = newNode;
    return head;
}

var head = new Node(1); // list
let list1 = insertionAtStart(head, 2);
console.log(list1)

let list2 = insertionAtStart(head, 3);
console.log(list2)

/* {
    "value": 3,
    "next": {
        "value": 1,
        "next": {
            "value": 2,
            "next": null
        }
    }
} */

//! Insertion at End


console.log('Insertion at end')
function insertionAtEnd(head, value) {
    let current = head;
    while (current.next != null) { // finding last element
        current = current.next;
    }
    current.next = new Node(value); // assign new node to the last element next.
    return head;
}

var head = new Node(1);
console.log(insertionAtEnd(head, 2))
console.log(insertionAtEnd(head, 3))
console.log(insertionAtEnd(head, 4))

/*
{
    "value": 1,
        "next": {
        "value": 2,
            "next": {
            "value": 3,
                "next": {
                "value": 4,
                    "next": null
            }
        }
    }
} */

var head = new Node('apple');
console.log(insertionAtEnd(head, 'banana'))
console.log(insertionAtEnd(head, 'cat'))
console.log(insertionAtEnd(head, 'dog'))

/* {
    "value": "apple",
        "next": {
        "value": "banana",
            "next": {
            "value": "cat",
                "next": {
                "value": "dog",
                    "next": null
            }
        }
    }
} */

//! Insertion a element at start or end in empty linked list

function insert(head, value) {
    if (!head) {
        head = new Node(value);
    }
    return head;
}
insert(null, 1);

//! Complete program of insertion at end

function insertAtEnd(head, value) {
    if (!head) {
        head = new Node(value);
    } else {
        let current = head;
        while (current.next != null) { // finding last element
            current = current.next;
        }
        current.next = new Node(value); // assign new node to the last element next.
    }
    return head;
}


//! Insert at kth position

console.log('Insert at Kth position: k >= 0')

function insertAtK(head, value, k) {

    if (k == 0) {
        let newNode = new Node(value);
        newNode.next = head;
        head = newNode;
    } else {
        let curr = head;
        let i = 0; // 0 based indexing

        // If I do (i < k) - it will reach to kth index while I have to stop at (k-1)
        while (i < k - 1) {
            curr = curr.next;
            i++;
        }
        let newNode = new Node(value);
        newNode.next = curr.next;
        curr.next = newNode;
    }
    console.log(head); // head means list
}

insertAtK(head, 'elephant', 3); // insert at 3rd position
/* {
    "value": "apple",
        "next": {
        "value": "banana",
            "next": {
*            "value": "cat", -- This is (k - 1) position
                "next": {
*                "value": "elephant",    -- // this is newly added item at kth position
                    "next": {
                    "value": "dog",
                        "next": null
                }
            }
        }
    }
} */

insertAtK(new Node('tiger'), 'lion', 0); // insert at 0th index

/* {
    "value": "lion",
        "next": {
        "value": "tiger",
            "next": null
    }
} */


//! Print Linked list items

console.log('Print Linked List items')

// head here represents first item of list.
function printList(head) {
    let items = '';
    let curr = head;
    if (curr.next == null) {
        items = curr.value;
    }
    while (curr.next != null) {
        items = items + curr.value + ' ';
        curr = curr.next;
    }
    console.log(items)
}
printList(head); // apple banana cat elephant
printList(new Node('pen')) // pen