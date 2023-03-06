
//!  Linked-List - Design and implement a Linked List data structure.

/*
A node in a linked list should have the following attributes - an integer value and a pointer to the next node. It should support the following operations:

insert_node(position, value) - To insert the input value at the given position in the linked list.
delete_node(position) - Delete the value at the given position from the linked list.
print_ll() - Print the entire linked list, such that each element is followed by a single space (no trailing spaces).

Input:
5
i 1 23
i 2 24
p
d 1
p

Output:
23 24
24

*/

class Node {
    next;
    data;
    random; // will use only in Random pointer problem. (See last problem to understand)
    constructor(value) {
        this.data = value;
        this.next = null; // initially next is null
        this.random = null; // will use only in Random pointer problem.
    }
}


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

    delete_node(pos) {
        if (pos == 1) {
            this.head = this.head.next;
        } else {
            let curr = this.head;
            for (let i = 1; i < pos - 1; i++) {
                // This if condition means given position is not in list so simple return.
                if (curr == null || curr.next == null || curr.next.next == null) {
                    return;
                }
                curr = curr.next;
            }
            curr.next = curr.next.next;
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

    print_ll() {
        let curr = this.head;
        let elements;
        if (curr != null) {
            elements = curr.data;
            while (curr.next != null) {
                elements += ' ' + curr.next.data;
                curr = curr.next;
            }
        }
        console.log(elements)
    }
}

var list = new LinkedList();

list.insert_node(1, 23);
list.insert_node(2, 24);
list.print_ll();
list.insert_node(3, 25);
list.insert_node(4, 26);
list.insert_node(5, 27);
list.insert_node(6, 28);
list.insert_node(7, 29);
list.print_ll();
list.delete_node(2);
list.print_ll();
list.delete_node(10);

console.log('Head', list.head);

//! Reverse Linked List - return the head node in the linked list

/*
You are given a singly linked list having head node A. You have to reverse the linked list and return the head node of that reversed list.

NOTE: You have to do it in-place and in one-pass.

Input:  A = 1 -> 2 -> 3 -> 4 -> 5 -> NULL
output:  5 -> 4 -> 3 -> 2 -> 1 -> NULL

 */

function reverseList(head) {
    console.log('reverseList :', head);

    if (head == null) {
        return;
    }
    let prev = null; // initialize previous as null because at very first begining there will be no previous.
    let curr = head; // initially current will be first element and that is head
    while (curr != null) {
        let next = curr.next;
        curr.next = prev;
        prev = curr; // this prev will use in next iteration
        curr = next; // this curr will use in next iteration
    }
    head = prev; // finally make prev as head.
    return head;

}

/*
@ Solution discussion

List =  a     b      c

* Head Node - which has prev null.
* Last Node - which has next null.

1. Prev of a is null, so null will be next for a.
2. Prev of b is a, so a will be next for b.
3. prev of c is b, so b will be next for c.
4. Next of c is null that will be prev for c.
5. And a Node which have previous null called Head.
6. Now c does not have prev so c will become Head.

List =  a     b      c

head = a (First node & it does not have any previous item)
curr = a; (start processing)
prev = null;

? 1st Iteration : curr item is a -
    a.next = null; (Here prev is null)
    prev = a;  (current node will be prev now)
    curr = b; (next of a, becasue we have to process 'b' now so make it current.)
list structure => a -> null

? 2nd Iteration : curr item is b -
    b.next = a; (Here prev is a)
    prev = b; (current node will be prev now)
    curr = c; (next of b)
list structure => b -> a -> null

? 3rd Iteration : curr item is c -
    c.next = b; (Here prev is b)
    prev = c; (current node will be prev now)
    curr = null; (next of c and that is null)
list structure => c -> b -> a -> null

Now loop end because no further elements remains for traversing.

? Assinging Head
In starting Head was 'a' and we know that Head is a node whoes prev is null. Here c have prev null, so mark head to 'c'.
head = c;
return head;

*/

var list1 = new LinkedList();
list1.insert_node(1, 1);
list1.insert_node(2, 2)
list1.insert_node(3, 3);
list1.insert_node(4, 4)
console.log(reverseList(list1.head));


//! Create another list by reversing Origional list (Dont update origional list)

// SC = O(n)
function reverseList2(head) {
    console.log('reverseList without updating origional:', head);
    if (head == null || head.next == null) { // Either List is empty or only have head.
        return head;
    }
    let curr = head;
    let head2 = new Node(head.data); // create new head of new list
    while (curr.next != null) {
        let curr2 = new Node(curr.next.data); // create new node with next data and make it current of another list
        curr2.next = head2; // current element next => current head
        head2 = curr2; // update head
        curr = curr.next; // move next
    }
    return head2;
}

var list1 = new LinkedList();
list1.insert_node(1, 1);
list1.insert_node(2, 2)
list1.insert_node(3, 3);
list1.insert_node(4, 4)
console.log(reverseList2(list1.head));

//! Shallow copy and Deep Copy

/*
@ Shallow copy example- In Shallow copy, two object points same address in memory.

var nodeX = new Node(5); -- Created a new Node and suppose that have address A1 in memory.
var nodeY = nodeX;       -- Here we are assigning nodeX into nodeY, so it also points same address 'A1'.

print(nodeX.data) // 5

* When we change data of nodeY, it also impact on nodeX because of shallow copy or we can say both node pointing to same address.
nodeY.data = 10;

print(nodeY.data) // 10
print(nodeX.data) // 10


@ Deep copy example- In Deep copy, two object points different address in memory.

var nodeX = new Node(5);  -- Created a new Node and suppose that have address A1 in memory.
var nodeY = new Node(nodeX.data); -- Created a new node nodeY and it has address 'A2' in memory. Here we just used nodeX data and that is integer which is primitive type.

* As there are two diff addresses so changing one data will not impact to other. And it is called Deep copy.

nodeY.data = 10;

print(nodeX.data) // 5
print(nodeY.data) // 10

*/


//! Copy List - Random Pointer problem

/*
A linked list A is given such that each node contains an additional random pointer which could point to any node in the list or NULL.
Return a deep copy of the list.
You should return a deep copy of the list. The returned answer should not contain the same node as the original list, but a copy of them. The pointers in the returned list should not link to any node in the original input list.

List is => [A] -> [B] -> [C] -> [D] -> null
Random pointers are =>
    [A] -> [C]
    [B] -> [A]
    [C] -> [B]
    [D] -> [B]

Output: we have to create same NEW linked list structure.

*/

/*
    Node {
        int data;
        Node next;
        Node random;
    }
*/

console.log('***** Random Linked List ********')

//? This method is used to assign random pointer.

LinkedList.prototype.assignRandomPointer = function (first, second) {
    let fNode = this.get_node(first);
    let sNode = this.get_node(second);
    fNode.random = sNode;
    return this.head;
}

//? Below method used to print all element & its random pointers.

LinkedList.prototype.printNodesWithRandomPointer = function () {
    let elements = '';
    let randomPointers = '';
    let curr = this.head;
    elements = curr.data;
    randomPointers = curr.data;
    while (curr.next != null) {
        elements = elements + ' -> ' + curr.next.data;
        randomPointers = randomPointers + ' => ' + curr.random?.data + ', ' + curr.next.data;
        curr = curr.next;
    }
    if (curr.random) { // for last node
        randomPointers += ' => ' + curr.random?.data;
    }
    return { elements, randomPointers };
}

var list2 = new LinkedList();
list2.insert_node(1, 'A');
list2.insert_node(2, 'B');
list2.insert_node(3, 'C');
list2.insert_node(4, 'D');
list2.insert_node(5, 'E');
console.log('print list', list2.head);
console.log('get_node(B)', list2.get_node('B')) // here argument 'B' is value of node.


list2.assignRandomPointer('A', 'C'); // here A and C are values
list2.assignRandomPointer('B', 'A');
list2.assignRandomPointer('C', 'B');
list2.assignRandomPointer('E', 'B');


console.log('List after Assigning Random pointer', list2.printNodesWithRandomPointer());



/*

@ Lets come to deep copy solution-

*/

//@ Solution 1 with Hashing - TC and SC - O(n)

/*
    Origional List =>  [A] -> [B] -> [C] -> [D]
    Deep Copy List =>  [A`] -> [B`] -> [C`] -> [D`]

     [A`] is called A prime.

    Mapping of Nodes => Creating a hash map to store prime nodes of every origional node.
    Key : Origional Node and Value : Prime Node (Deep copy list node)

    [A] => [A`]
    [B] => [B`]
    [C] => [C`]
    [D] => [D`]

*/


function copyRandomList1(head) {
    console.log('copyRandomList1 :');
    primeHead = null; // new list head
    if (head == null) {
        return null;
    }
    let node = new Node(head.data); // creating new Node by using origional Node data.
    primeHead = node; // marking first node as Head of copying List

    let map = new Map(); // store node and its random pointer here

    // Maintain hashing for corrosponding deep copy list Nodes
    map.set(head.data, primeHead); // for first element

    //? Step 1 :: Creating same deep copy list without random pointer, We cannot assign random pointer here because we dont have complete deep list. And put deep copy list nodes into a Map for further pointer assignments.
    let curr = head;
    let currentPrime = primeHead; // deep copy list node
    while (curr.next != null) {
        let node = new Node(curr.next.data); // creating new Node by using origional Node data.
        currentPrime.next = node;

        // Maintain map for random pointer Nodes
        map.set(curr.next.data, currentPrime.next);

        curr = curr.next; // move to next in origional list
        currentPrime = currentPrime.next; // move to next in Copying list
    }
    //console.log(map);

    //? Step 2 :: Assign Random pointer by using Map storage
    curr = head;
    currentPrime = primeHead;
    while (curr != null) {
        if (curr.random && map.has(curr.random.data)) {
            currentPrime.random = map.get(curr.random.data);
        }
        curr = curr.next;
        currentPrime = currentPrime.next;
    }
    return primeHead;
}

console.log(copyRandomList1(list2.head));


//@ Solution 2 without any extra memory - TC = O(n) & SC - O(1)


/*
 ? Instead of creating a separate memory for random nodes, we will add those random nodes as next in the list.

 [A] -> [A`] -> [B] -> [B`] -> [C] -> [C`] -> [D] --> [D`]

Where > [A] is node of Origional list and [A`] is node of deepy copy list

*/
function copyRandomList2(head) {
    console.log('copyRandomList without using extra memory :');
    if (head == null) {
        return null;
    }

    let curr = head;
    //? Step 1 :: Create Prime Nodes and fit them into origional list. Like  [A] -> [A`] -> [B] -> [B`] -> [C] -> [C`] -> [D] --> [D`]
    while (curr != null) {
        let newNode = new Node(curr.data); // creating new Node (prime node) by using origional Node data.
        newNode.next = curr.next; // make origional list next node to new node next
        curr.next = newNode; // new node will be next of origional list next node.
        curr = newNode.next; // now move pointer to next origional list node.
    }

    //? Step 2 || assign random pointers

    curr = head;
    while (curr != null) {
        if (curr.next && curr.random) {
            curr.next.random = curr.random.next; // curr.next is prime node.
        }
        curr = curr.next.next; // curr.next.next is now origional node.
    }

    //? Step 3 :: Now retrive deep copy list from above list and that will be our output.

    let primeHead = head.next; // First element's next is start of deep copy list, so mark that as primeHead.
    curr = head;
    let currentPrime = primeHead;
    while (curr != null) {
        curr.next = curr.next.next; // curr.next cannot be null because that is not the last element now.
        if (currentPrime.next) { // currentPrime is last element of present list so it can be null.
            currentPrime.next = currentPrime.next.next;
        }
        curr = curr.next; // move to next element
        currentPrime = currentPrime.next; // move to next prime element
    }
    return primeHead;
}
console.log(copyRandomList2(list2.head));


//! Check number of nodes are even or odd by using slow pointer and fast pointer.

function checkEvenOrOdd(head) {
    console.log('checkEvenOrOdd :', head);
    let slow = head;
    let fast = head;
    while (fast != null && fast.next != null) {
        fast = fast.next.next; // move two steps
        slow = slow.next; // move one step
    }
    // after travering complete list, if fast pointer goes to null, means list have Even number of Nodes.
    if (fast == null) {
        return 'list is even';
    } else {
        return 'list is odd';
    }
}
var list5 = new LinkedList();
list5.insert_node(1, 1);
list5.insert_node(2, 2);
//list5.insert_node(3, 3);
console.log(checkEvenOrOdd(list5.head))





//! Palindrome List

/*
Given a singly linked list A, determine if it's a palindrome. Return 1 or 0, denoting if it's a palindrome or not,
respectively.

1 -> 2 -> 2 -> 1  = this is Palindrome.
 */

//@ Solution 1 :: Reverse entire list and match one by one element => TC and SC = O(n)

function checkPalindromeList(head) {
    console.log('checkPalindromeList :', head);
    if (head == null || head.next == null) { // Either List is empty or only have head.
        return true;
    }
    // Step 1 :: First reverse entire list and create new list
    let curr = head;
    let head2 = new Node(head.data); // reverse list of origional list
    while (curr.next != null) {
        let curr2 = new Node(curr.next.data);
        curr2.next = head2;
        head2 = curr2;
        curr = curr.next;
    }
    // Step 2 :: Compare both list (Origional vs Reverse) and check each node
    curr = head;
    let curr2 = head2;
    while (curr != null && curr2 != null) {
        if (curr.data != curr2.data) {
            return false;
        }
        curr = curr.next;
        curr2 = curr2.next;
    }
    return true;
}
var list4 = new LinkedList();
list4.insert_node(1, '1');
list4.insert_node(2, '2');
list4.insert_node(3, '2');
list4.insert_node(4, '1');
//list4.insert_node(5, '1');

console.log(checkPalindromeList(list4.head));



//@ Solution 2 :: Without Using any extra memory => TC = O(n) and SC = O(1)

function checkPalindromeList1(head) {
    console.log('checkPalindromeList1 by finding middle element and reverse half list :', head);
    if (head == null || head.next == null) { // Either List is empty or only have head.
        return 1;
    }
    // Step 1 :: Finding middle element of the list
    let slow = head; // last position of slow will be middle.
    let fast = head;
    let previousOfSlow = null; // this will hold previous node of slow pointer (Will use for even length)
    while (fast != null && fast.next != null) {
        previousOfSlow = slow;
        slow = slow.next;
        fast = fast.next.next;
    }

    // Step 2 :: Reverse second half of the list
    let curr = fast == null ? slow : slow.next; // For even list, take slow as current and for Odd list take next of it.
    let prev = null;
    while (curr != null) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    if (fast == null) {
        previousOfSlow.next = prev; // for even length, add reversed list into next of previousOfSlow
    } else {
        slow.next = prev; // for odd length, add reversed list into next of slow pointer.
    }

    //Step 3 :: Now Compare element before middle and after middle and if they are same means list is palindrome.
    curr = head;
    let curr2 = fast == null ? previousOfSlow.next : slow.next;
    while (curr2 != null) {
        if (curr.data != curr2.data) {
            return 0;
        }
        curr = curr.next;
        curr2 = curr2.next;

    }
    return 1;
}
console.log(checkPalindromeList1(list4.head));


//! Longest Palidrome Odd Length in given list

//? Take every node as mid and traverse left and right. Compare left node to right node.

function longestPalindromicOddLength(head) {
    console.log('longest Palindromic Odd Length :', head);
    let curr = head; // curr will represent as mid for each iteraraion
    let prev = null; // initially previous is null
    let ans = 0;
    while (curr != null) {
        let count = 0;
        let next = curr.next;

        let left = prev; // left list
        let right = curr.next; // right list
        while (left != null && right != null) {
            if (left.data == right.data) {
                count++; // counting length of one side only, in final answer, we will multiply by 2.
            } else {
                break;
            }
            left = left.next;
            right = right.next;
        }
        ans = Math.max(ans, count * 2 + 1); // total length will be count * 2 + 1
        curr.next = prev; // Change next pointer of prev elements. (Because of this we are able to do left.next in comparison)
        prev = curr;
        curr = next;
    }
    head = prev;
    console.log(head) // Here head will be completly reversed format.
    return ans;
}

var list5 = new LinkedList();

//@ Odd palindrome example - max length here is 5
list5.insert_node(1, 5);
list5.insert_node(2, 4);
list5.insert_node(3, 5);
list5.insert_node(4, 8);
list5.insert_node(5, 5);
list5.insert_node(6, 4);
list5.insert_node(7, 3);
list5.insert_node(8, 4);



console.log(longestPalindromicOddLength(list5.head));


//! Longest Palindromic Length (Odd or Even) - List may contain odd or even any length of palindrome.

function longestPalindromeLength(head) {
    console.log('longestPalindrome Odd or Even Length :', head);
    function compareLeftRight(left, right) {
        let count = 0;
        while (left != null && right != null) {
            if (left.data == right.data) {
                count++; // counting length of one side only, in final answer, we will multiply by 2.
            } else {
                break;
            }
            left = left.next;
            right = right.next;
        }
        return count;
    }
    let curr = head; // curr will represent as mid for each iteraraion
    let prev = null; // initially previous is null
    let ans = 0;

    //? Step 1 :: Check for Odd length palindrome. Here we take single node as middle and compare left and right.
    while (curr != null) {
        let next = curr.next;
        let count = compareLeftRight(prev, next);
        ans = Math.max(ans, count * 2 + 1); // total length will be count * 2 + 1
        curr.next = prev; // Change next pointer of prev elements. (Because of this we are able to do left.next in comparison)
        prev = curr;
        curr = next;
    }
    //? Step 2 :: Reverse list after first traversing because after first traversing, list has been reversed so tranform again to original form.
    head = reverseList(prev);

    //? Step 3 :: List may contain even length of palindrome, so check for even length as well. We know If palindromic is Even length means middle two nodes will be same. So here we will consider two nodes as middle and then compare left and right. If one node is ith then another node will be taken as (i-1)th node.

    prev = null;
    curr = head;
    while (curr != null) {
        let next = curr.next;
        if (prev && prev.data == curr.data) { // check two nearest node, they should be same for further matching
            let count = compareLeftRight(prev.next, curr.next);
            ans = Math.max(ans, count * 2 + 2); // total length will be count * 2 + 2 (add 2 because two nodes are mid)
        }
        curr.next = prev; // Change next pointer of prev elements. (Because of this we are able to do left.next in comparison)
        prev = curr;
        curr = next;
    }
    //console.log(prev) // Here head will be completely reversed format.
    return ans;
}

var list6 = new LinkedList();

/* //@ Odd palindrome example - max length here is 5
list6.insert_node(1, 5);
list6.insert_node(2, 4);
list6.insert_node(3, 5);
list6.insert_node(4, 8);
list6.insert_node(5, 5);
list6.insert_node(6, 4);
list6.insert_node(7, 3);
list6.insert_node(8, 4); */

// @ even palindrome exists of length 4
list6.insert_node(1, 5);
list6.insert_node(2, 4);
list6.insert_node(3, 5);
list6.insert_node(4, 5);
list6.insert_node(5, 4);
list6.insert_node(6, 8);

console.log(longestPalindromeLength(list6.head));



//! Longest Palindromic List

/*
Given a linked list of integers. Find and return the length of the longest palindrome list that exists in that linked list.
A palindrome list is a list that reads the same backward and forward.

Expected memory complexity : O(1)

2 -> 1 -> 2 -> 1 ->  2 -> 2 -> 1 -> 3 -> 2 -> 2
=  2 -> 1 -> 2 -> 1 -> 2 is largest palindromic sublist.

*/
