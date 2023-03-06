// https://www.scaler.com/topics/detect-loop-in-linked-list/

// https://www.scaler.com/topics/middle-element-of-linked-list/

// https://www.scaler.com/topics/merge-sort-for-linked-lists/

// Same as linked-list-2.js :: Created Node class
class Node {
    next;
    data;
    constructor(value) {
        this.data = value;
        this.next = null; // initially next is null
    }
}

// Same as linked-list-2.js :: Created Linked List class to run below algorithms
class LinkedList {
    head;
    constructor() {
        this.head = null;
    }
    insert_node(pos, value) {
        var node = new Node(value);
        if (this.head == null) {     // if list is empty
            this.head = node;
        } else {
            if (pos == 1) { // want to add at start
                node.next = this.head;
                this.head = node; // mark new node as Head
            } else {        // want to add at kth position
                let curr = this.head;
                for (let i = 1; i < pos - 1; i++) {
                    if (curr == null) {
                        return;
                    }
                    curr = curr.next;
                }
                node.next = curr.next;
                curr.next = node;
            }
        }
    }
    get_node(value) {
        let curr = this.head;
        if (curr != null) {
            while (curr != null) {
                if (curr.data == value) {
                    return curr;
                }
                curr = curr.next;
            }
        }
        return null; //  in case of empty list or item not found
    }
}



//! Middle element of linked list

/*
Given a linked list of integers, find and return the middle element of the linked list.
NOTE: If there are N nodes in the linked list and N is even then return the (N/2 + 1)th element.

1 <= length of the linked list <= 100000
1 <= Node value <= 109

*/

//@ Solution 1 :: First find size of list by loop and then length / 2 will be middle element. For middle use for loop till n/2;

/*
    If List size is Odd
        example : list size = 3 then midd = Math.floor(3 / 2) = 1. Add 1 here because indexing start from 1. So for size 3, midd will be 2nd element.
    If List size is Even
        example: list size  = 4 then midd = 4 / 2 = 2, & as per question it will be 2 + 1 = 3
*/

// TC =  O(n)
function middleElement(head) {
    let length = 0;
    let curr = head;
    while (curr != null) {
        length++;
        curr = curr.next;
    }
    let midLength = Math.floor(length / 2) + 1;
    curr = head;
    for (let i = 1; i <= midLength; i++) {
        curr = curr.next;
    }
    return curr; // this will be middle
}

//@ Solution 2 :: Efficient Approach - Using Slow and Fast Pointers

/*
The efficient approach is to traverse through the linked list using two-pointers i.e slow pointer and fast pointer.
Increment slow_ptr by 1 step and fast_ptr by 2 steps, As a result, the fast pointer will travel double than that of the slow pointer.
So When the fast pointer will reach to the end of the linked list, slow pointer would still be at the middle of the linked list.
*/

function middleElementWithSlowAndFastAlgo(head) {
    console.log('middleElement With SlowAndFast Algo :');
    let curr = head;
    let slow = curr;
    let fast = curr;
    while (fast != null && fast.next != null) { // checking only fast pointer here because fast will reach first to end.
        slow = slow.next; // move one step
        fast = fast.next.next; // move 2 step ahead
    }
    return slow.data; // when fast will be on end, slow will exactly on the middle. because slow is running just half of fast pointer.
}


//! Merge Two Sorted Lists

/*
Merge two sorted linked lists, A and B, and return it as a new list.
The new list should be made by splicing together the nodes of the first two lists and should also be sorted.
Note: Dont create new separate list, Just Update existing ones.

 A = 5 -> 8 -> 20
 B = 4 -> 11 -> 15

 output : 4 -> 5 -> 8 -> 11 -> 15 -> 20

*/


//? TC  = O(n + m)
// A and B are head of two sorted list.
function mergeList(A, B) {
    let head = null;
    // If List A is empty, then return List B (Individual list is already sorted)
    if (A == null) {
        return B;
    }
    // If List B is empty, then return List A
    if (B == null) {
        return A;
    }

    // At First, Find head of merged list. (smaller head of A and B will be Head of merged list.)
    if (A.data < B.data) {
        head = A;
        A = A.next; // If First element visited then move to next
    } else {
        head = B;
        B = B.next; // If First element visited then move to next
    }

    // Loop until both list have nodes
    let curr = head;
    while (A != null && B != null) {
        if (A.data < B.data) {
            curr.next = A;
            A = A.next; // move A pointer
        } else {
            curr.next = B;
            B = B.next; // move B pointer
        }
        curr = curr.next;
    }
    if (A == null) {
        curr.next = B; // pull all remaining elements of B in case List A becomes empty
    }
    if (B == null) {
        curr.next = A; // pull all remaining elements of A in case List B becomes empty
    }
    return head;
}





//! Sort List - Using merge sort

//* https://www.scaler.com/topics/merge-sort-for-linked-lists/

// Sort a linked list, A in O(n log n) time using constant space complexity.

/*
    [3] -> [1] -> [9] -> [4]

Find Mid => [9] as per middle element algorithm mentioned above.
Now divide this list into two separate list based on mid element.

? List H1 = head to mid element (notice that mid has next pointer and we know list last element point to null so make mid.next = null here)
? List H2 = mid + 1 to end element (mid + 1 will be head of H2 list)

    H1                              H2
    [3] -> [1] -> [9]               [4]

    [3] -> [1]    [9]               [4]

    [3]    [1]    [9]               [4]

Now Merge 3 and 1 first and then 9

    [1] -> [3] -> [9]               [4]

    Now merge with 4

    [1] -> [3] -> [4] -> [9]


*/

function sortList(head) {
    console.log('sortList using Merge sort:');

    function getMid(head) { // using slow & fast pointer
        let slow = head;
        let fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next; // move one step
            fast = fast.next.next; // move 2 step ahead
        }
        return slow;
    }
    function merge(h1, h2) { // merge two lists into one
        if (h1 == null) {
            return h2;
        }
        // If List h2 is empty, then return List h1
        if (h2 == null) {
            return h1;
        }
        let head = null;
        if (h1.data < h2.data) {
            head = h1;
            h1 = h1.next; // If First element visited then move to next
        } else {
            head = h2;
            h2 = h2.next; // If First element visited then move to next
        }
        let curr = head;
        while (h1 != null && h2 != null) {
            if (h1.data < h2.data) {
                curr.next = h1;
                h1 = h1.next;
            } else {
                curr.next = h2;
                h2 = h2.next;
            }
            curr = curr.next;
        }
        if (h1 == null) {
            curr.next = h2;
        }
        if (h2 == null) {
            curr.next = h1;
        }
        return head;
    }
    function divide(head) {
        // If list is empty or there is only one element in the list
        if (head == null || head.next == null) {
            return head;
        }
        let mid = getMid(head);
        let h1 = head;
        let h2 = mid.next; // next element of mid
        // Below If is edge case: when there are only 2 elements remaining in the list
        // Then 2nd element will be mid and that have next as null
        if (mid.next == null) {
            h1.next = null;
            h2 = mid;
        }
        mid.next = null; // make mid next to null for left side list.
        h1 = divide(head);
        h2 = divide(h2);
        // once complete list will be divided into single nodes then start merging.
        return merge(h1, h2);
    }

    return divide(head); // start from here.
}

var list = new LinkedList();

list.insert_node(1, 23);
list.insert_node(2, 10);
list.insert_node(3, 3);
list.insert_node(4, 6);
//console.log(sortList(list.head));

var list1 = new LinkedList();

list1.insert_node(1, 10);
list1.insert_node(2, 1);

console.log(sortList(list1.head));



//! Why Other Sorting Algorithms are Inefficient on Linked Lists?

/*
? Let's try to understand this using an example. For example let the list be 2 --> 3 --> 1 --> 5 --> 4 --> null

And we have access only to the head node of the list therefore if we use any other algorithm (say quickSort)
then we need to access some random elements many times. Since we have access to the head node only therefore it would require O(n) time just to access nodes.

*/



//! Circular Linked List - Detect Cycle in Linked List

// https://www.scaler.com/topics/detect-loop-in-linked-list/

/*
Given a linked list, check whether the linked list is having a loop or not(detect loop in linked list). A cycle exists in a linked list if it contains a node that may be accessed again by following the next pointer.

*/

//@ Solution 1 :: Use HashSet

// This method will change next pointer of a node. :: Purpose of this method to create a cycle in list so that we can test below cycle algorithm.
LinkedList.prototype.changeNextPointer = function (first, second) {
    let fNode = this.get_node(first);
    let sNode = this.get_node(second);
    fNode.next = sNode;
    return this.head;
}

// TC and SC = O(n)
function detectCycle(head) {
    console.log('detectCycle with hashSet :');
    let set = new Set(); // create a set to store all node
    let curr = head;
    while (curr != null) {
        if (set.has(curr)) { // if current node is already in Set, means it is revisiting and forming cycle.
            return true;
        }
        set.add(curr); // add node to Set
        curr = curr.next;
    }
    return false;
}


var list2 = new LinkedList();

list2.insert_node(1, 2);
list2.insert_node(2, 10);
list2.insert_node(3, 3);
list2.insert_node(4, 6);
//list2.insert_node(5, 6); //-- duplicate element
list2.changeNextPointer(6, 10); // we are pointing next of 6 to 2 and that is a cycle.

console.log(detectCycle(list2.head)); // true


//@ Solution 2 :: Floyd’s algorithm - This is the fastest method for detecting a loop in a linked list:

/*
1. Traverse the linked list using two pointers, a fast pointer, and a slow pointer starting from the first node.
2. Now in a loop move the fast pointer by 2 nodes and the slow pointer by 1 node.
3. At any point, If both pointers meet on same Node, it means there is a cycle.
*/

//? TC = O(n) & SC = O(1)
function detectCycleWithTwoPointer(head) {
    console.log('detectCycle With Two Pointer : Floyd’s algorithm');
    let slow = head;
    let fast = head;
    while (fast != null && fast.next != null) { // check condition for fast pointer only
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) { // meeting point
            return true;
        }
    }
    return false;

}
console.log(detectCycleWithTwoPointer(list2.head)); //true

var list3 = new LinkedList();

// list with duplicate elements.
list3.insert_node(1, 1);
list3.insert_node(2, 2);
list3.insert_node(3, 1);
list3.insert_node(4, 2);
list3.insert_node(5, 1);
list3.insert_node(6, 3);
//list3.changeNextPointer(3, 1); // if you create cycle here then result will be true.

console.log(detectCycleWithTwoPointer(list3.head)); // false
console.log(detectCycle(list3.head)); // false


//! Find start of cycle in cicular linked list.

/*
Input:
3 -> 2 -> 4 -> 5 -> 6
          ^         |
          |         |
          - - - - - -

Output: 4 (4 is start of cycle)

*/

/*
@ Lets understand Start of cycle solution Approach with below Cicucular list.

A -> B -> C -> D -> E -> F
          ^              |
          |              |
          - - - - - ------

1. If we find meeting point in above list using slow and fast pointer technique, that will be 'E'.
2. E is meeting point but not start of cycle. We can see that 'C' is start of cycle.

? Lets compute travelled distance by slow and fast pointer

     Suppose X = distance from Head (A) to start of Cycle (C)
             Y = distance from Start of Cycle (C) to Meeting Point (E)
             Z = distance from Meeting point (E) to start of cycle (C)

As per slow and fast algo, we know that fast pointer runs twice of slow.

?   distance travelled by Slow * 2 = distance travelled by Fast

    (X + Y) * 2 = X + (Y + Z) + Y           -- (Y + Z) is cycle distance
    X + Y + X + Y = X + Y + Z + Y
?   X = Z (this will happen )

X == Z when fast will meet to slow in first cycle. But It is possible that fast can cover many cycles and then any kth cycle he meet with slow.

Let see when Fast will cover 2 cycle and meet with slow.

(X + Y) * 2 = X + 2(Y + Z )+ Y
X + Y + X + Y = X + 2Y + 2Z + Y
X = 2Z + Y
X = Z + Z + Y
X = (Y + Z) + Z
X = (2-1)(Y + Z) + Z // we can write above equation like this.

Same If Fast cover K cycle then X will be

* X = (K-1)(Y+Z) + Z;

? Distance of Head to start of Cycle = Distance of Meeting point to Start of Cycle.

If Two Other Pointers (P1, P2) start their journey on same pace (First 'P1' start from Head and Second 'P2' start from Meeting point)
So we know that distance travelled by P1 from head to node C and by P2 from 'E' to 'C' will be same. Or we can say that P1 and P2 where they meet , will be the start of cycle.




*/

function findStart(head) {
    // Step 1 :: Find meeting point
    let slow = head;
    let fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) {
            break;
        }
    }
    // fast is not null after while loop means there is a loop exist.
    // step 2 :: Take two pointers p1 and p2 and start them from head and meeting point respectively.
    // Where p1 and p2 will meet, that will be start of cycle.
    if (fast != null) {
        let p1 = head;
        let p2 = fast; // meeting point
        while (p1 !== p2) {
            p1 = p1.next;
            p2 = p2.next;
        }
        p1.next = null;
        //return p1; // you can return p2 as well because after while loop both will be on same.
    }
    return head;
}



//! Remove Loop from Linked List

/*
You are given a linked list that contains a loop.
You need to find the node, which creates a loop and break it by making the node point to NULL.

Input:
3 -> 2 -> 4 -> 5 -> 6
          ^         |
          |         |
          - - - - - -
Output:  3 -> 2 -> 4 -> 5 -> 6 -> NULL

*/

// TODO : not completed
function removeCycle(head) {
    console.log('Remove cycle With Two Pointer');


}
var list4 = new LinkedList();

// list with duplicate elements.
list4.insert_node(1, 1);
list4.insert_node(2, 2);
list4.insert_node(3, 1);
list4.insert_node(4, 2);
list4.insert_node(5, 1);
list4.insert_node(6, 3);
list4.changeNextPointer(3, 1);

console.log(removeCycle(list4.head)); // false