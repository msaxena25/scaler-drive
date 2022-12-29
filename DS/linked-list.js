
/*
@ What is Linked List?

Linked lists are linear data structures that hold data in individual objects called nodes. These nodes hold both the data and a reference to the next node in the list.
A linked list is a dynamic data structure so it can grow and shrink at runtime by allocating and deallocating memory. So there is no need to give the initial size of the linked list.

@ Difference between Array and LinkedList?

Array stores the data elements in a contiguous memory zone. Linked List stores elements randomly, or we can say anywhere in the memory zone.
In Array, The elements are not dependent on each other. In linked list, The data elements are dependent on each other.
In array, When it comes to executing any operation like insertion, deletion, array takes more time.
In Linked list, When it comes to executing any operation like insertion, deletion, the linked list takes less time.


@ Advantages over comparable data structures such as static or dynamically expanding arrays-

1. LinkedLists does not require contiguous blocks of memory and therefore can help reduce memory fragmentation.
2. LinkedLists support efficient removal of elements (dynamic arrays usually force a shift in all of the elements).
3. LinkedLists support efficient addition of elements (dynamic arrays can cause a re-allocation + copy, if a particular add exceeds the current capacity)

@Some example of single linked list.

1. Undo button of any application like Microsoft Word, Paint, etc: A linked list of states.

2. GPS Navigation: A linked list of map data. Travelling from origin to destination is example of traversing through all nodes. Rerouting by a GPS is an example of Add and Remove operations of map data.

@ Some example of double linked list.

1. Browser's Next and Previous Button: a linked list of URLs.
2. Image Viewer's Next and Previous Button: a linked list of images
3. Undo and Redo button of Photoshop, a linked list of states.


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


//! Insertion at beginning


console.log('Insertion at start')

// TC = O(1)

function insertionAtStart(head, value) {
    let newNode = new Node(value);
    newNode.next = head;
    head = newNode;
    return head;
}

var head = new Node(1); // initial list
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

// TC = O(n)
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

// TC = O(n)
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

// TC = O(n)
function insertAtK(head, value, k) {

    if (k == 0) { // means new element will become Head
        let newNode = new Node(value);
        newNode.next = head; // assign head into next
        head = newNode;
    } else {
        let curr = head;
        let i = 0; // 0 based indexing

        // If I do (i < k) - it will reach to kth index while I have to stop at (k-1)
        while (i < k - 1 && curr.next != null) {
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

insertAtK(new Node('lion'), 'horse', 7); // As there is no any 7th index so insert at last index


//! Print Linked list items

console.log('Print Linked List items')

// TC = O(n)

// head here represents first item of list.
function printList(head) {
    let items = '';
    let curr = head;
    while (curr.next != null) {
        items = items + curr.value + ' ';
        curr = curr.next;
    }
    items = items + curr.data + ' ';
    console.log(items)
}
printList(head); // apple banana cat elephant
printList(new Node('pen')) // pen


//! Search in Linked List

/*
You are given the head of a linked list A and an integer B, check if there is any node which contains this value B.
Return 1 if such a node is present else return 0.

*/

console.log('Search item in List')

// TC = O(n)
function searchItemInList(head, value) {
    if (head == null) { // empty linked list
        return 0;
    }
    let curr = head;
    while (curr.next != null && curr.value != value) {
        curr = curr.next;
    }
    if (curr.value == value) {
        return 1;
    }
    return 0;
}
console.log(searchItemInList(head, 'rose'));
console.log(searchItemInList(head, 'elephant'));
console.log(searchItemInList(new Node('4'), '4'));
console.log(searchItemInList(new Node('4'), 5));




//! What is diff in array and linkedlist in case of insertion at kth position while both take O(n) time complexity?

/*
Insertion at kth position in Array takes O(n)
Insertion at Kth position in Linked list takes O(n)

But still Linked list is preferred.
Because In array when we add an item at kth index then we relocate all items after kth index to its next location & copy its data and that process of copying and relocation takes lot of efforts.
While in Linked list, everything is connection, means two nodes are joined with only a connection. SO when we add new item, we just update connections of before and next items. All items are still in same locations where they was. That is pretty clear.

*/


//! Delete an item in Linked List based on its value

console.log('Delete in Linked List')

/*
@ Logic

- If head is null then return null.
- Check for items with while loop and if current item value does not match with input value, continue loop
- Track of previous item as well.
- When item found, make connection between previous item and next item.
- Make current.next to prev.next.
- Finally return head

*/

// console.log(head)
function deleteInList(head, value) {
    console.log('deleteInList :', value);
    if (head == null) {
        return null;
    }
    let curr = head;
    let prev;
    while (curr.next != null && curr.value != value) {
        prev = curr;
        curr = curr.next;
    }
    if (curr.value == value) {
        if (prev) { // if no previous item, means there is only head in the list
            prev.next = curr.next;
        } else {
            head = null;
        }
    }
    console.log(head)
    return head;
}
//deleteInList(head, 'cat');
deleteInList(new Node('1'), '1');


//! Delete item based on given index (0 based indexing)

console.log(head)
function deleteItemWithIndex(head, index) {
    if (head == null) {
        return null;
    }
    if (index == 0) {
        head = head.next;
        return head;
    }
    let curr = head;
    let i = 0;
    while (i < index - 1 && curr.next != null) {
        curr = curr.next;
        i++;
    }
    if (curr.next != null) {
        curr.next = curr.next.next;
    }
    return head;
}
//deleteItemWithIndex(head, 1)
console.log(deleteItemWithIndex(head, 0))


//! Print Reverse Linked List

/*
You are given a singly linked list having head node A. You need to print the linked list in reverse order.

Note :- The node values must be space separated. You must give a newline after printing all the nodes.
*/
console.log('Print Reverse Linked List')

function reverseList(head) {
    if (head == null) {
        return null;
    }
    let curr = head;
    let result = '';
    while (curr.next != null) {
        result = curr.value + ' ' + result;
        curr = curr.next;
    }
    result = curr.value + ' ' + result; // for last node or if there is only head
    console.log(result)
    return result;
}
reverseList(head); // dog elephant cat banana apple 