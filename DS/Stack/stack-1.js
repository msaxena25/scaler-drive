
/*
  @  Stack data structure works on LIFO (last in first out)

*/

//! Implementation of Stack Using array

/*

- To create stack DS, we are going to use array.
- Array also have methods like push and pop but here we can not use any predefined methods.
- We have to create our own methods for each operations.
- What push do?
    - Push method check last index and then increase it by 1. And on that new index, add value.
    - How can we manage that last index?
        - We can create a variable like top = -1.
        - Every time when push occurs, it will increase top and then add value on top.
    - pop method?
        - pop actually remove last element and make last Index pointer to its previous one.
        - Actually we don't have anything like remove element.
        - So what we will do? We can get top pointer element and return it. And then also remove top with -1.
        - So for next push, again top will increase & value which was on top before doing minus, will override with new value.
            = arr = [1, 2, 3]
            = current top value is 2 (element is 3).
            = now do pop(), top will become 1 (means element 2).
            = now do push(4), top will increase and now top value is 2.
            = on 2nd top pointer, value is still 3. but after doing arr[top] = value, that will override.
            = arr = [1, 2, 4]


*/

class Stack {
    top = -1; // top pointer initialize with -1
    arr = [];
    push(v) {
        top++; // First increase top pointer
        arr[top] = v;
    }
    pop() {
        // we have to remove last element
        // If there is no any element then return -1
        if (top == -1) {
            return -1;
        }
        let lastEl = arr[top]; // get last element
        top--; // reduce top pointer by -1
        return lastEl;
    }
    peek() {
        // return peek element means last element
        if (top == -1) {
            return -1;
        }
        return arr[top];
    }
    empty() {
        return top == -1;
    }
}


//! Reverse Polish Notation || postfix notation

/*
Reverse Polish notation (RPN) is a method for representing expressions in which the operator symbol is placed after the arguments being operated on.

*As an example, the arithmetic expression (3+4)×5 can be expressed in RPN as 3 4 + 5 ×.

Reverse Polish notation, also known as postfix notation, contrasts with the "infix notation" of standard arithmetic expressions in which the operator symbol appears between the operands.

RPN has the property that brackets are not required to represent the order of evaluation or grouping of the terms.

RPN expressions are simply evaluated from left to right and this greatly simplifies the computation of the expression within computer programs.
*/


//!  Evaluate Expression, RPN

//? Leet code link
//https://leetcode.com/problems/evaluate-reverse-polish-notation/

/*
An arithmetic expression is given by a string array A of size N. Evaluate the value of an arithmetic expression in Reverse Polish Notation.
Valid operators are +, -, *, /. Each string may be an integer or an operator.
*/


function evaluateExpression(A) {
    console.log('evaluateExpression :', A);
    let stack = []; // create a stack to store all operands
    let evalObj = { // create a evaluation expression and returning function
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.round(a / b) == -0 ? 0 : Math.floor(a / b)

    }
    //? If element is operand then push into stack, If it is operator then pop two elements from stack and apply corresponding function
    for (let i = 0; i < A.length; i++) {
        if (evalObj[A[i]]) { // A[i] == '*' || A[i] == '+' || A[i] == '/' || A[i] == '-'
            let second = stack.pop();
            let first = stack.pop();
            // read from left to right in RPN. so second pop will be first element as per expression statement.
            let result = evalObj[A[i]](Number(first), Number(second));
            stack.push(result);
        } else {
            stack.push(A[i]); // if it is operands then push it
        }
    }
    return stack.pop(); // pop last result
}

console.log(evaluateExpression(["4", "13", "5", "/", "+"])) //6
console.log(evaluateExpression(["-1"])) // -1
console.log(evaluateExpression(["-500", "-10", "/"])) // 50
console.log(evaluateExpression(["4", "-2", "/", "2", "-3", "-", "-"])) // -7
console.log(evaluateExpression(["1", "2", "-2", "2", "-", "-2", "-", "+", "*"])) //0
console.log(evaluateExpression(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]))


//! Balanced Parenthesis

/*
Given an expression string A, examine whether the pairs and the orders
 of “{“,”}”, ”(“,”)”, ”[“,”]” are correct in A. */

function validParenthesis(A) {
    console.log('validParenthesis :', A);
    let map = new Map(); // create a map to store close bracket as key and open bracket as value
    map.set('}', '{');
    map.set(')', '(');
    map.set(']', '[');
    let openBracketsStack = []; // stack data structure
    for (let i = 0; i < A.length; i++) {
        if (A[i] == '{' || A[i] == '(' || A[i] == '[') { //If open bracket then push it
            openBracketsStack.push(A[i]);
        } else {
            let popBracket = openBracketsStack.pop(); // if close bracket then pop from open stack
            if (map.get(A[i]) != popBracket) { // match parenthesis
                return 0; // if not matched, return 0
            }
        }
    }
    // If string is valid then stack will become empty at last
    if (openBracketsStack.length == 0) { // if all brackets matched
        return 1;
    }
    return 0;

}
console.log(validParenthesis('{[()]}'));


//!  Double Character Trouble

/*
You are given a string A.

An operation on the string is defined as follows:
Remove the first occurrence of the same consecutive characters. eg for a string "abbcd", the first occurrence of same consecutive characters is "bb".
Therefore the string after this operation will be "acd".
Keep performing this operation on the string until there are no more occurrences of the same consecutive characters and return the final string.
 */

function removeDoubles(A) {
    console.log('removeDoubles :', A);
    let arr = []; // stack
    for (let i = 0; i < A.length; i++) {
        if (arr[arr.length - 1] == A[i]) { // when last element is same as current Ith element then pop that.
            arr.pop();
        } else {
            arr.push(A[i]); // push new Ith element
        }
    }

    // Finally process stack and append all values and return
    let ans = '';
    for (let i = 0; i < arr.length; i++) {
        ans = ans + arr[i];
    }
    return ans;
}
console.log(removeDoubles('accdffde'))


//! Redundant Braces

/* Given a string A denoting an expression. It contains the following operators '+', '-', '*', '/'.
Check whether A has redundant braces or not.

NOTE: A will be always a valid expression and will not contain any white spaces. */

/*
@ Approach

- Once any opening bracket OR any operator comes, push it into stack.
- Once any closing bracket comes. Check stack last element and if that is not operator then return false.
- If last element is operator then pop element until reached to open bracket. And after that also remove open bracket.
- If all okie then return true at last.

(a) => [(] => Now we see closing bracket but no any operator at last, so that is redundant.
((a*b)) => [((*] => Now closing bracket at 5h index. And last element of stack is a operator. So pop all elements till open bracket.

*/

function checkRedundantBraces(A) {
    console.log('checkRedundantBraces :', A);
    let stack = [];

    for (let i = 0; i < A.length; i++) {
        if (A[i] == '+' || A[i] == '-' || A[i] == '*' || A[i] == '/' || A[i] == '(') {
            stack.push(A[i]);
        } else if (A[i] == ')') {
            const top = stack[stack.length - 1];
            /* Most important condition is below If only. For Valid - top element should be any operator.
              IF expression given is valid expression means, in stack, before operator, there will be open bracket.
              So we can only do pop two times. Means remove that operator and remove open bracket.
              But We have used while loop here and that will also work for Invalid expression. */
            if (top == '+' || top == '-' || top == '*' || top == '/') {
                let j = stack.length - 1;
                while (stack[j] != '(') {
                    stack.pop();
                    j--;
                }
                stack.pop(); // remove open bracket as well
            } else {
                return true;
            }

        }
    }
    return false;
}
console.log(checkRedundantBraces('(a)'))
console.log(checkRedundantBraces('((a*b))'))
console.log(checkRedundantBraces('(a*b)+(c)'))
console.log(checkRedundantBraces('(a+*/C)')) // false ::  This expression is invalid but we are only checking redundant brackets.
console.log(checkRedundantBraces('1+(*2)')) // false :: This expression is invalid but we are only checking redundant brackets.



//! Check two bracket expressions (good question)

/*
Given two strings A and B. Each string represents an expression consisting of lowercase English alphabets, '+', '-', '(' and ')'.
The task is to compare them and check if they are similar. If they are identical, return 1 else, return 0.

NOTE: It may be assumed that there are at most 26 operands from ‘a’ to ‘z’, and every operand appears only once.

 A = "-(a+b+c)"
 B = "-a-b-c"

 output: 1
*/

/*
* Approach =>

Some operators execution

-  - = +
-  + = -
+  - = -
+  + = +

@ If both operators are same then result will be +.
@ If operators are not same then result will be -.

Operator Just before open bracket is called global operator.
Global operator effects all operators inside open and it's close brackets. -(a - b) => - a + b
Local operator are those who appears just before a character. (-a) => -a
As per question statement there are unique letters only from a to z lowercase.
We will create two maps for A and B & store local operators of that chars into these maps.
If map A and map B are same then strings are identical.

To store Global operator, Use stack data structure.
Once any open bracket appears, store adjacent operator into stack.
IF there are global operator exists in stack then last operator will also impact upcoming global operator as well.
Default operator is '+'. So incase any operator not found then we will take + operator. => stack[stack.length - 1] || '+';
Change Characters local operator based on Latest global operator until close bracket do not come.
Once close operator appears then we remove latest global operator from stack. means one open and close bracket has been performed.


*/
function checkTwoBracketsExpressions(A, B) {
    console.log('checkTwoBracketsExpressions :', A, B);

    let mapA = {};
    let mapB = {};
    function createMap(str, map) {
        let stack = []; // for only global operator (that come just before open bracket)
        for (let i = 0; i < str.length; i++) {
            let latestGlobalSign = stack[stack.length - 1] || '+';
            let adjOperator = str[i - 1] == '-' ? '-' : '+';
            if (str[i] == '(') {
                if (latestGlobalSign == adjOperator) {
                    stack.push('+');
                } else {
                    stack.push('-');
                }
            } else if (str[i] == ')') {
                stack.pop();
            } else if (str[i] != '+' && str[i] != '-') {
                if (latestGlobalSign == adjOperator) {
                    map[str[i]] = '+';
                } else {
                    map[str[i]] = '-';
                }
            }
        }
    }
    createMap(A, mapA);
    createMap(B, mapB);
    // console.log(mapA, mapB)

    // Loop over small letter 'a' to 'z' using ASCII value
    // ASCII value of 'a' is 97 and 'z' = 122.
    // get char from ascii value => String.fromCharCode(index)
    for (let index = 97; index <= 122; index++) {
        let char = String.fromCharCode(index);
        if (mapA[char] != mapB[char]) {
            return 0;
        }
    }
    return 1;
}

console.log(checkTwoBracketsExpressions('-(a+((b-c)-(d+e)))', '-(a+b-c-d-e)')) //1
console.log(checkTwoBracketsExpressions('-(-(-(-a+b)-d+c)-q)', 'a-b-d+c+q')) //1
console.log(checkTwoBracketsExpressions('(a+b-c-d+e-f+g+h+i)', 'a+b-c-d+e-f+g+h+i')) //1



//! Min Stack
/*
Design a stack that supports push, pop, top, and retrieve the minimum element in constant time.
push(x) -- Push element x onto stack.
pop() -- Removes the element on top of the stack.
top() -- Get the top element.
getMin() -- Retrieve the minimum element in the stack.

All the operations have to be constant time operations.
getMin() should return -1 if the stack is empty.
pop() should return nothing if the stack is empty.
top() should return -1 if the stack is empty.



*/

/*
@ key points-

- When we design our Stack data structure, we never use array predefined methods of push and pop.
- We use array data types to store all elements.
- Take one variable like topIndex, initial value -1.
- Based on this topIndex value we push and pop elements from arr.
- Whenever we push value in array, First increase topIndex then add value on that topIndex like arr[topIndex] = value;
- Whenever we pop value, We return value that is on topIndex and then decrease topIndex by -1.
- When topIndex = -1 , means no elements in array. Then return '' in pop operation.
- We have taken one more array to store minimum values.
- If newly pushed item in array is less then min array last value then we push newly added value into min array as well.
- Initially min array will be empty. So First value that will be added in array, also considered as min value.
- We can compare that value with Number.MAX_SAFE_INTEGER when min array empty. (e < (min.length ? min[min.length - 1] : Number.MAX_SAFE_INTEGER))
- When we pop a value & that is also min array last value (means minimum value) then we remove last value from min array as well.
- 0 is also a valid value. thats why we use ternary operators in code instead of OR operator.
- return  arr[topIndex] || -1; (INVALID),  return arr.length ? arr[topIndex] : -1; (VALID)

*/

function MinStack() {
    // Initialize your variables here
    topIndex = -1;
    arr = []; // empty array
    // We have taken min array instead of min variable to store min element. Because If we remove a value and that is a min value as well, then we have to change min value to previous min value.
    min = []; // descending order min element
};
MinStack.prototype.push = function (e) {
    topIndex = topIndex + 1;
    arr[topIndex] = e;
    if (e < (min.length ? min[min.length - 1] : Number.MAX_SAFE_INTEGER)) {
        min.push(e);
    }
};
MinStack.prototype.pop = function () {
    if (topIndex == -1) {
        return '';
    }
    let x = arr[topIndex];
    if (x == min[min.length - 1]) {
        min.pop();
    }
    topIndex--;
    return x;
};
MinStack.prototype.top = function () {
    // return top
    return arr.length ? arr[topIndex] : -1;
};
MinStack.prototype.getMin = function () {
    // return minimum
    return min.length ? min[min.length - 1] : -1;
};
console.log('Stack function using prototype')
const s = new MinStack();
s.push(0)
s.push(2)
s.push(7)
s.push(1)
s.push(10)
console.log('min', s.getMin())
console.log('pop', s.pop())
console.log('pop', s.pop())
console.log('min', s.getMin())
console.log('pop', s.pop())
console.log('pop', s.pop())
console.log('min', s.getMin())
console.log('top', s.top())


//!  Infix to Postfix

/*
Given string A denoting an infix expression. Convert the infix expression into a postfix expression.

String A consists of ^, /, *, +, -, (, ) and lowercase English alphabets where lowercase English alphabets are operands and ^, /, *, +, - are operators.

Find and return the postfix expression of A.

NOTE:

^ has the highest precedence.
/ and * have equal precedence but greater than + and -.
+ and - have equal precedence and lowest precedence among given operators.


 A = "a+b*(c^d-e)^(f+g*h)-i"
 output:  "abcd^e-fgh*+^*+i-"
*/

/*
* Approach-

> ( , ) open and close brackets always have hightest precedence in string.  Means that is on number 1.
> ^ caret have second priority but highest among all other operator. ^ = 2
> / and * have equal precedence.  /, * = 3
> + and - have equal precedence. +, - = 4.

? + and - are on equal precedence then how they will compute?
They will execute based on Associativity concept. Left to right way. So which come first, will execute first.
Same for / and * operator.


? Why PostFix Notation are important?

Lets see an example, Suppose we have this string =>  "a+b*(c^d-e)^(f+g*h)-i"

Any Higher precedence operator can come to last or before or anywhere in the string. Now think How will Machine give right result of this string?
If Machine will directly execute given InFix notation string then output wil be wrong.
So before executing, Machine scan complete string and convert this into Postfix notation and check operator precedence and based on that perform operation.


* Solution-

- Traverse string with for loop.
- If an operand come, directly add that into answer.
- When any operator comes, add that into Stack if stack is empty.
-After that when operator comes, then we have to perform an action-
    - Stack pop out element from top. So any lower operator cannot be at top of Stack.
    - We have to check newly operator with currently top operator of stack and compare its precedence.
    - If newly operator have higher precedence then simply add it.
    - If not, then we have to pop all higher precedence operator from stack and add it to our answer.
    - During pop If there is any equal precedence operator, also pop that one. Because that has been added fist so will execute first.
    - Stop popping once lower precedence operator occurred.
- Open / Close bracket case
    - When an open bracket comes. app that into stack.
    - After open bracket, if any operator comes, add it simply. No matter that is higher or lower. We don't need to compare anything because on top of stack currently is Open bracket.
    - But after that if lower operator comes then simply pop all higher operator until reached to lower precedence till last open bracket.
    - When close bracket comes then pop all operators until open bracket and at last also pop open bracket.
- Once full string scanned then whatever is in stack, pop all items and add into answer string.

*/

function infixToPostFix(A) {
    console.log('infixToPostFix :', A);
    let ans = '';
    let stack = [];
    const precedence = { '^': 3, '*': 2, '/': 2, '+': 1, '-': 1 }; // operators Precedence
    const operators = new Set(['^', '*', '/', '+', '-']);
    for (let i = 0; i < A.length; i++) {

        if (operators.has(A[i])) {
            if (stack.length > 0) { // If operators are there in stack, then check precedence before adding new operator.
                let top = stack[stack.length - 1]; // top operator
                if (precedence[A[i]] <= precedence[top]) { // if lower or equal precedence of newly added operator
                    let j = stack.length - 1;
                    // we cannot go beyond open bracket.
                    while (stack[j] != '(' && precedence[stack[j]] >= precedence[A[i]]) {
                        ans += stack.pop();
                        j--;
                    }
                }
            }
            stack.push(A[i]);
        }
        else if (A[i] == '(') { // If open bracket then simply push
            stack.push(A[i]);
        }
        else if (A[i] == ')') { // If close bracket then pop operators till '('.
            let j = stack.length - 1;
            while (stack[j] != '(') {
                ans += stack.pop();
                j--;
            }
            stack.pop(); // remove open bracket as well.
        } else {
            ans += A[i];
        }
    }
    // at last If operators are there in stack then pop all one by one and add in to ans.
    if (stack.length) {
        let j = stack.length - 1;
        while (j > -1) {
            ans += stack.pop();
            j--;
        }
    }
    return ans;

}

console.log(infixToPostFix('a+b*(c^d-e)^(f+g*h)-i')) //'abcd^e-fgh*+^*+i-'