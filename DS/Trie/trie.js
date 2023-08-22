/*

! What is Trie data structure?

- Trie is Tree like data structure we store data in top to bottom way.
- Trie data structure is an advanced data structure used for storing and searching strings efficiently.
- Trie comes from the word reTRIEval which means to find or get something back.
- Dictionaries can be implemented efficiently using a Trie data structure and Tries are also used for the autocomplete features that we see in the search engines.
- Trie data structure is faster than binary search trees and hash tables for storing and retrieving data.
- Trie data structure is also known as a Prefix Tree or a Digital Tree. We can do prefix-based searching easily with the help of a Trie.
- Trie data structure has many applications, including 'prefix-based searching', 'sorting strings lexicographically' etc.

@ Time complexity of insertion, deletion and searching for a string of length 'k' in the Trie data structure is:
Insert - O(k)
Delete - O(k)
Search - O(k)

@ The time complexity for building a Trie data structure is O(N * avgL), where 'N' is the number of strings we want to insert in Trie and 'avgL' is the average length of 'N' strings.


- Trie data structure is a tree-based data structure used for storing collections of strings.
- If two strings have a common prefix then they will have the same ancestor in the trie.
- In a trie data structure, we can store a large number of strings and can do search operations on it in an efficient way.
- A trie can be used to sort a collection of strings alphabetically as well as search whether a string with a given prefix is present in the trie or not.
- Each trie consists of a root node. The root node branches into various child nodes having multiple edges.
- The root node is an empty string.

@ Trie  is of 2 types-

1. Trie of Characters
2. Trie of bits

*/


//! Node Structure of Trie Node

// Trie is also a tree data structure so it also have Node. but Structure of node is different from binary tree.

class Node {
    isWordEnd = false;
    children = new Array(26); // every child will also be a Node.
}

/*

> isWordEnd : isWordEnd value will be true on that Node, where any valid word found from root.
> children = It is fixed size array of 26 length to contain words other alphabets.
> In Binary Tree, Node direct contains data but in Trie, Node does not contain directly alphabet value but it is stored in its children array.

                        [Root]

        [0][1][2][3][4][5][6][7]...............[25]


@ Lets Insert a word 'Toy'

'a'.charCodeAt() = 97
't'.charCodeAt() = 116
'o'.charCodeAt() = 111
'y'.charCodeAt() = 121

So among 0 to 25 space -
 - t will be on place = 116 - 97 = 19
 - o will be on place = 111 - 97 = 14
 - y will be on place = 121 - 97 = 24

                [] root
                /
               /
        isWordEnd = false;
        [][][]...[ 19 ]....[]
                  |
                  |
        isWordEnd = false;
        [][][]...[ 14 ]....[]
                /
               /
    isWordEnd = true;
    [][][][]]....[ 24 ][]

*/



//@ Most Important thing to remember is that we don't insert Character in trie data structure, We insert a new Node on that Char Code index in its children.

/*
    var curr = node;
    var str = 't';
    curr.children[code of 't'] = new Node();
*/




var root = new Node();

// TC = O(length of word)

function insertTrie(root, str) {
    console.log('insertTrie :', str);
    if (!root) {
        root = new Node();
    }
    let curr = root;
    let a = 97; // Char code of char 'a'
    for (let i = 0; i < str.length; i++) {
        let index = str[i].toLowerCase().charCodeAt() - a;
        if (!curr.children[index]) {
            let node = new Node();
            curr.children[index] = node;
        }
        curr = curr.children[index];
    }
    curr.isWordEnd = true;
    return root;

}

console.log(insertTrie(root, 'toy'))
console.log(insertTrie(root, 'tea'))


//* Structure of Trie

var structure =
{
    "isWordEnd": false,
    "children": [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
        {
            "isWordEnd": false,
            "children": [null, null, null, null,
                {
                    "isWordEnd": false,
                    "children": [
                        {
                            "isWordEnd": true,
                            "children": [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
                        }, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
                }, null, null, null, null, null, null, null, null, null,
                {
                    "isWordEnd": false,
                    "children": [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
                        {
                            "isWordEnd": true,
                            "children": [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
                        }, null]
                }, null, null, null, null, null, null, null, null, null, null, null]
        }, null, null, null, null, null, null]
}


console.log(insertTrie(root, 'teaser'))

console.log(insertTrie(root, 'mohitsaxena'))


// TC = O(length of word)
function searchTrie(root, str) {
    console.log('searchTrie :', str);
    let curr = root;
    let a = 97; // Char code of char 'a'
    for (let i = 0; i < str.length; i++) {
        let index = str[i].toLowerCase().charCodeAt() - a;
        if (!curr.children[index]) {
            return false;
        }
        curr = curr.children[index];
    }
    return curr.isWordEnd;

}


console.log(searchTrie(root, 'toy')) // true
console.log(searchTrie(root, 'tea')) // true
console.log(searchTrie(root, 'tease')) // false
console.log(searchTrie(root, 'Mohitsaxena')) // true
console.log(searchTrie(root, 'mohit')) // false


function deleteWord(root, str) {
    console.log('deleteWord :', str);
    let curr = root;
    let a = 97; // Char code of char 'a'
    for (let i = 0; i < str.length; i++) {
        let index = str[i].toLowerCase().charCodeAt() - a;
        if (!curr.children[index]) { // word does not exists
            return false;
        }
        curr = curr.children[index];
    }
    curr.isWordEnd = false; // update isWordEnd property false.
    return true;
}

console.log(deleteWord(root, 'tea')) // true

console.log(searchTrie(root, 'tea')) // false