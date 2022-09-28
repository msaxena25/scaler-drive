// https://www.scaler.com/academy/mentee-dashboard/class/28425/assignment/problems/4049

// LOGIC : even + even = even
// odd + odd = even
// even + odd = odd

// Means even & odd can not sit together because its result is odd. Either all even numbers OR all odd numbers can
// live there. So Eliminate whichever is lower in the numbers.

function solve(A) {
    let evenNumbers = 0;
    let oddNumbers = 0;
    A.forEach(element => {
        if (element % 2 === 0) {
            evenNumbers++;
        } else {
            oddNumbers++;
        }
    });
    return evenNumbers <= oddNumbers ? evenNumbers : oddNumbers;
}

console.log(solve([1, 2, 3, 4, 5])) //2

console.log(solve([33, 82, 75, 4, 52, 74, 79, 46, 18, 73, 1, 83, 46, 94, 44, 86, 40, 1, 46, 24, 99, 16, 88, 6, 66, 17, 1])) // 10



