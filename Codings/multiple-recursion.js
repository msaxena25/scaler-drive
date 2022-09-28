function main(x, y) {
    return foo(x, y);
}

function foo(x, y) {
    if (y === 0) return 1;
    return bar(x, foo(x, y - 1));
}

function bar(x, y) {
    if (y === 0) return 0;
    return (x + bar(x, y - 1));
}

console.log(main(3, 5));

// let try to find out recurive pattern here...
/*
bar(x, y)
 = x + bar(x, y - 1);
 = x + x + bar(x, y - 2);
 = x + x + x + bar(x, y - 3);
 // Suppose y = 3
 = x + x + x + bar(x, 0)
 = 3x + 0
 = 3x
 // Means when y is 3 , it is adding x till y times.
 // So when value is y > add x till y times.
=  x + x + x + x + x + x + ........ (until y)
= x * y

 foo(x, y)
  = bar (x, foo(x, y-1)); // and we know it return xy
  = x * foo(x, y-1);
  = x * bar (x, foo(x, y-2));
  = x * x * foo(x, y-2);
  = x * x * bar (x, foo(x, y-3));
    // suppose y = 3 here
  = x * x * bar (x, foo(x, 0));
  = x * x * bar (x, 1);
  = x * x * x * 1
  // Means when y was 3 -> x is 3 times of y.
  // So till y value -> x will be y times.
  = x * x * x * x......(until y)
  = x^y

  SO now we have input (3, 5) => 3^5 = 243.
 */

