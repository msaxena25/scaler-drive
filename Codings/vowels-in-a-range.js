//! Find out number of vowels in given ranges in a string. Ranges are given in queries array.
// Queries array > [[0, 2], [3, 6]];
// Input A = 'interviewbit';


//param A : string
//param B : array of array of integers
//return a array of integers
function solve(A, B) {
    let ans = [];
    let pf = [];
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    if (vowels.includes(A[0])) {
        pf[0] = 1;
    } else {
        pf[0] = 0;
    }
    for (let i = 1; i < A.length; i++) {
        if (vowels.includes(A[i])) {
            pf[i] = pf[i - 1] + 1;
        } else {
            pf[i] = pf[i - 1];
        }
    }
    for (let i = 0; i < B.length; i++) {
        let [a, b] = B[i];
        let c = 0;
        if (a == 0) {
            c = pf[b];
        } else {
            c = pf[b] - pf[a - 1];
        }
        ans.push(c);
    }
    return ans;
}