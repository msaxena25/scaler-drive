
//! Balanced Paranthesis

/*
Given an expression string A, examine whether the pairs and the orders
 of “{“,”}”, ”(“,”)”, ”[“,”]” are correct in A. */

function validParenthesis(A) {
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




function evaluateExpression(A) {
    let stack = [];
    for (let i = 0; i < A.length; i++) {
        if (A[i] == '*' || A[i] == '+' || A[i] == '/' || A[i] == '-') {
            let first = stack.pop();
            let second = stack.pop();
            let result = Math.floor(eval(second + ' ' + A[i] + ' ' + first));
            stack.push(result);
        } else {
            stack.push(A[i]); // if it is operands then push it
        }
    }
    return Math.abs(stack.pop());
}

console.log(evaluateExpression(["4", "13", "5", "/", "+"]))