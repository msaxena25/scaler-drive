
function run(A) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let output = '';
    let i = 0;
    while (i <= A.length - 1) {
        console.count('while')
        if (vowels.includes(A[i])) {
            output += A[i];
        }
        if (vowels.includes(A[i + 1])) {
            output += A[i + 1];
        }
        i += 2;
    }
    console.log(output);
    return output;
}

run('interviewbitapplication');


function runwithFor(A) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let output = '';
    for (let index = 0; index < A.length; index++) {
        console.count('for')
        if (vowels.includes(A[index])) {
            output += A[index];
        }
    }
    console.log(output);
    return output;
}

runwithFor('interviewbitapplication')


// Both have Time complexity O(n)
// Space compleity O(5)