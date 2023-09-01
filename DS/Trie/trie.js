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

// TC = O(length of word), If there are n words in array then it will be O(n * avg. len)

function insertTrie(root, str) {
    console.log('insertTrie :', str);
    if (!root) {
        root = new Node();
    }
    let curr = root; // every operation we have to perform on curr children
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
    let curr = root; // every operation we have to perform on curr children
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



//! Frequency

// Frequency means how many times a nodes has been appeared.
// We set each Node frequency while inserting a word.
// In Node structure, we have a frequency property.

class FrequencyNode {
    isWordEnd = false;
    frequency = 0;
    children = new Array(26);
}

// Assumed all words are in lower case.
// This is exactly same as insert trie, additionally we are updating frequency of each Node
function createTrieWithFrequency(wordsArr, root) {
    console.log('createTrieWithFrequency :', wordsArr);
    if (!root) {
        root = new FrequencyNode();
    }

    let a = 97; // Char code of char 'a'
    for (let i = 0; i < wordsArr.length; i++) {
        let curr = root; // every words will start from root.
        const str = wordsArr[i];
        for (let j = 0; j < str.length; j++) {
            let index = str[j].charCodeAt() - a;
            if (!curr.children[index]) {
                let node = new FrequencyNode();
                curr.children[index] = node;
            }
            curr.children[index].frequency++; // increase frequency each time when node comes.
            curr = curr.children[index];
        }
        curr.isWordEnd = true;
    }

    return root;
}

var words = ['try', 'play', 'art', 'trim', 'plate', 'part', 'player', 'arm', 'trap'];

console.log(createTrieWithFrequency(words));


//!  Shortest Unique Prefix

/* Given a list of N words, find the shortest unique prefix to represent each word in the list.

NOTE: Assume that no word is the prefix of another. In other words, the representation is always possible


A = ["zebra", "dog", "duck", "dove"]

Output -
 ["z", "dog", "du", "dov"]
 */


// To get shortest Prefix we need Frequency trie.
function shortestUniquePrefix(A) {
    console.log('shortestUniquePrefix :', A);
    const root = createTrieWithFrequency(A); // First we have to create trie with frequency
    let prefixOutput = [];
    let a = 97; // Char code of char 'a'
    for (let i = 0; i < A.length; i++) {
        const word = A[i];
        let curr = root;
        let prefix = '';
        for (let j = 0; j < word.length; j++) {
            let index = word[j].charCodeAt() - a;
            prefix += word[j];
            // When a character have frequency 1 in path, means from that point, there is only single word.
            if (curr.children[index].frequency == 1) {
                prefixOutput.push(prefix);
                break;
            }
            curr = curr.children[index];
        }
    }

    return prefixOutput;

}

// TC = O(sum of all words length)
// SC = O(sum of all words length) in worse case when all words are exactly different. But most of time same node is shared among multiple words. So Space complexity will be less then O(sum of all words length)

console.log(shortestUniquePrefix(["zebra", "dog", "duck", "dove"]))
console.log(shortestUniquePrefix(["apple", "banana", "cat"]))
console.log(shortestUniquePrefix(["car", "cat", "camera", 'chico', 'tiger', 'time']))



//! Auto Complete

/* There is a dictionary A of N words, and ith word has a unique weight Wi.

Another string array B of size M contains the prefixes. For every prefix B[i], output at most 5 words from the dictionary A that start with the same prefix.

Output the words in decreasing order of their weight.

NOTE: If there is no word that starts with the given prefix output -1.

Input:
words = ['abcd', 'aecd', 'abaa', 'abef', 'acdcc', 'acbcc']
Weight = [2    ,   1,       3,     4,      6,        5]

Prefix =  ab abc a

Output

 abef abaa abcd
 abcd
 acdcc acbcc abef abaa abcd

*/

class AutoCompleteNode {
    order = []; // store higher weight word index one by one into this order
    isWordEnd = false;
    children = new Array(26)
}

/*

@ Brute Force way-

1. First we have to create Trie data structure based on given words in array.
2. As per questions we also set weight of each words.
3. By the given search prefix array, we have to display top 5 weighted words.
4. So we also need a count of words that start from given search prefix.
5. After reaching to last char of search-prefix and simply count no. of non-null children can give number of possible words. So that is not a solution.
        [a]-->[b]--->[c]---->[d]
                      |_____> [e]
    - If we see just above example, and search words on prefix 'ab'. Now char b have only one child but we can see that there are two words possible.
6. So to count words on search-prefix, we also need Frequency of each Node.
7. Now check all its children and wordEnd true , save all words start from prefix in array with its weight and at last take only top 5.


* Above Brute force way is complicated one and having big time complexity, so that is not a way to do this.


@ Optimized & Correct Way -

- We have designed a class AutoCompleteNode() that contains a unique property called Order of array types.
- In Question we have two separated array of words and weight. And we return output of top 5 results only.
- Top 5 means whose weight is higher should show first in result string.
- For that we have to sort words array based on weight array. But these are two diff arrays, so to sort them, first we will create collective array of both words and weight. like['word', weight] => ['Tiger', 7]
- After sort words data, we will create Trie data structure.
- Now what is Order in AutoComplete Class?
    - Order is an empty array at each Node.
    - During adding a word in to trie, each Char of that word will contain index of that word into this Order array. Because that Char will be a prefix for that word.
    - At each node, we will push index of that word into Order array.
- After completing Trie, we will loop over our search queries.
- Reach to prefix last char and at that point get Order values.
- Check that order values and get words corresponding to that index.


    Example => We have below sorted array based on weights.
    ['cat', 'car', 'tom']
       0      1     2

                                 []
                            /         \
                           /           \
                [c, order = [0, 1]]     [t, order = [2]]
                /                          \
               /                            \
    [a, order = [0, 1]]                     [o, order = [2]]
            /       \                          \
           /         \                          \
          /           \                          \
[t, order = [0],       [r, order = [1],         [m, order = [2],
isWordEnd = true]       isWordEnd = true]        isWordEnd = true]


- c could be prefix of two words cat and car. So order array have their indices.
- ca also a possible prefix of two words cat and car.
- cat could be prefix for only one word that is cat so order have single index 0.
- t could be prefix for single word that is tom so t also have one index 2.


*/

function createTrieWithWeightOrder(wordsAndWeightArr) {
    let root = new AutoCompleteNode();

    // Create Trie based on given words array
    let a = 97; // char code of a
    for (let i = 0; i < wordsAndWeightArr.length; i++) {
        let curr = root; // every operation we have to perform on curr children
        const w = wordsAndWeightArr[i][0];
        for (let j = 0; j < w.length; j++) {
            let idx = w[j].charCodeAt() - a;
            if (!curr.children[idx]) {
                curr.children[idx] = new AutoCompleteNode();
            }
            curr.children[idx].order.push(i); // index of word from sorted array wordsAndWeightArr
            curr = curr.children[idx];
        }
        curr.isWordEnd = true;
    }
    return root;
}

function autocomplete(words, weights, searchPrefix) {

    let wordsAndWeightArr = [];

    // Create a collective array of words and weights both.
    for (let i = 0; i < words.length; i++) {
        wordsAndWeightArr.push([words[i], weights[i]]);
    }

    // Now Sort that collective array based on Weight value
    wordsAndWeightArr.sort((a, b) => b[1] - a[1]);
    console.log('Auto Complete :', wordsAndWeightArr);

    let a = 97; // char code of a
    const root = createTrieWithWeightOrder(wordsAndWeightArr);
    // console.log('root :', root);

    // Now loop over on given search prefix
    for (let i = 0; i < searchPrefix.length; i++) {
        const txt = searchPrefix[i];
        let curr = root;

        for (let j = 0; j < txt.length; j++) {
            let idx = txt[j].charCodeAt() - a;
            if (!curr.children[idx]) {
                break;
            }
            curr = curr.children[idx];
        }

        let out = '';
        if (curr.order.length) {
            // we have to take only top 5 values so apply for loop.
            // Instead of this for, We can also store top 5 indices in our Trie but that will not be best way. Because If we need top 10 words then have to change our trie structure.
            for (let i = 0; i < 5; i++) {
                if (curr.order[i] > -1) {
                    out += wordsAndWeightArr[curr.order[i]][0] + ' ';
                }
            }
        }
        else {
            out = -1 + ' '; // to make format same for all output adding blank space
        }
        console.log(out.trim());

    }

}




const w2 = ['tom', 'tiger', 'time', 'car', 'carrom', 'cat', 't'];
const weights = [7, 1, 3, 4, 6, 5, 2];
const searchPrefix1 = ['ca', 't', 'ti', 'y', 't', 'carrom']

autocomplete(w2, weights, searchPrefix1)

/* Output-
carrom cat car
tom time t tiger
time tiger
-1
tom time t tiger
carrom
*/



//! Contact Finder

/*
Given two array A and B.  A contains 0 or 1. B contains words and searchPrefix.
If A[i] is 0 means push B[i] element in to Trie.
If A[i] is 1 means find occurrence that prefix in Trie.



Input:
A = [0, 0, 1, 1]
B = ["hack", "hacker", "hac", "hak"]

Output
[2, 0]
*/

function contactFinder(A, B) {
    let root = new FrequencyNode();
    let a = 97; // char code of a
    let output = [];

    function findWord(prefix) {
        let curr = root;
        for (let j = 0; j < prefix.length; j++) {
            let idx = prefix[j].charCodeAt() - a;
            if (curr.children[idx] == null) {
                curr = null;
                break
            }
            curr = curr.children[idx];

        }
        output.push(curr ? curr.frequency : 0);
    }

    for (let i = 0; i < A.length; i++) {
        if (A[i] == 0) {
            root = createTrieWithFrequency(B[i], root);
        } else if (A[i] == 1) {
            findWord(B[i])
        }
    }
    return output;
}

console.log(contactFinder([0, 0, 1, 1], ["hack", "hacker", "hac", "hak"]))