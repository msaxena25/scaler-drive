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
    let evalObj = { // create a evaluation expresssion and returning function
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.round(a / b) == -0 ? 0 : Math.floor(a / b)

    }
    //? If element is operand then push into stack, If it is operator then pop two elements from stack and apply corrosponding function
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


//! Balanced Paranthesis

/*
Given an expression string A, examine whether the pairs and the orders
 of “{“,”}”, ”(“,”)”, ”[“,”]” are correct in A. */

function validParenthesis(A) {
    console.log('validParenthesis :', A);
    let map = new Map(); // create a map to store close bracket as key and open bracket as value
    map.set('}', '{');
    map.set(')', '(');
    map.set(']', '[');
    let openBracketsStack = [];
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
    let arr = [];
    for (let i = 0; i < A.length; i++) {
        if (arr[arr.length - 1] == A[i]) {
            arr.pop();
        } else {
            arr.push(A[i]);
        }
    }
    let ans = '';
    for (let i = 0; i < arr.length; i++) {
        ans = ans + arr[i];
    }
    return ans;
}
console.log(removeDoubles('accdffde'))