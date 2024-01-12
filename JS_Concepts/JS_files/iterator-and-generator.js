
let arr = ['A', 'B', 'C', 'D'];

// * for of loop works with array not with objects

for (const item of arr) {
    console.log(item)
}

let obj = {
    A: 'A', B: 'B'
}

/*
* Uncaught TypeError: obj is not iterable

for (const item of obj) {
    console.log(item)
}
*/

const str = "JSMount";
// Iterator works on String.

for (const value of str) {
    console.log(value);
}

/*
for of loop works only with Iterable Objects. Iterable objects include instances of built-ins such as Array, String, TypedArray, Map, Set, NodeList.
Array have inbuilt prototype method Symbol(Symbol.iterator) and because of that for of loop works on this. and object does not have this method.

? What is Iterator?
Iterator is an object that return next method. And when we call that next method it returns two properties
value and done.
example: {value: 1, done: false}, {value: undefined, done: true}

Iterator can handle Stream of data.

You can Pause Iterator in middle and resume when you need next value. While you can not do this with simple for of loop.

? What is @@iterator?

The Symbol.iterator static data property represents the well-known symbol @@iterator. In order for an object to be iterable, it must have an @@iterator key.




*/

function createIterator(arr) {
    let index = 0; // took initial index value as 0
    function next() {

        // When index reaches to array length means all values of array are emitted.
        if (index === arr.length) {
            return { value: undefined, done: true };
        }
        const obj = { value: arr[index], done: false };
        index++;
        return obj;
    }
    return { next };
}

const iteratorObj = createIterator(['A', 'B', 'C']);
iteratorObj.next()
console.log('iteratorObj.next() :', iteratorObj.next());

console.log('...Between Iteration, PROCESSING Other task....');

console.log('iteratorObj.next() :', iteratorObj.next());
console.log('iteratorObj.next() :', iteratorObj.next());
console.log('iteratorObj.next() :', iteratorObj.next());



const iteratorObj1 = createIterator('HAPPY');

console.log('iteratorObj1.next() :', iteratorObj1.next());
console.log('iteratorObj1.next() :', iteratorObj1.next());
console.log('iteratorObj1.next() :', iteratorObj1.next());
console.log('iteratorObj1.next() :', iteratorObj1.next());
console.log('iteratorObj1.next() :', iteratorObj1.next());
console.log('iteratorObj1.next() :', iteratorObj1.next());


//! Generator functions

/*
Instead of writing above custom Iterators, Generator functions allow you to define an iterative algorithm
by writing a single function whose execution is not continuous.
Generator functions are written using the function* syntax.

Generator function do not execute immediately when called, they return a special type of iterator called a Generator.
When Generator next method is called, then Generator function executes until it reaches the yield keyword.

yield expression specifies the value to be returned from the iterator.

yield*, delegates to another generator function.

*/

function* makeIterator() {
    yield 1;
    yield 2;
}

const it = makeIterator();
console.log('it.next() :', it.next());
console.log('Process anything else then again call next method to fetch Next value......');
console.log('it.next() :', it.next());
console.log('it.next() :', it.next());


function* makeRangeIterator(start = 0, end = Infinity, step = 1) {
    let iterationCount = 0;
    for (let i = start; i < end; i += step) {
        iterationCount++;
        yield i;
    }
    return iterationCount;
}

const it1 = makeRangeIterator();
console.log('it1.next() :', it1.next());
console.log('it1.next() :', it1.next());
console.log('it1.next() :', it1.next());

const it2 = makeRangeIterator(10, 25, 5);
console.log('it2.next() :', it2.next());
console.log('it2.next() :', it2.next());
console.log('it2.next() :', it2.next());
console.log('it2.next() :', it2.next()); // {value: 3, done: true}


function* Generator1() {
    console.log('Generator1');
}

//@ Nothing will print until you do not call next method of generator function

const gen1 = Generator1();

console.log(gen1.next()) // it will log 'Generator1' and will return done true with value undefined
console.log(gen1.next()) // will not log 'Generator1' again. Will return only {value: undefined, done: true}


//@ A return statement in a generator, when executed, will make the generator finish. Means It makes done to true.

function* Generator2() {
    yield 'Hi I am first yield of Generator2';
    yield 'Hi I am second yield of Generator2';
    return 'Hi I am return';
}

const gen2 = Generator2();
console.log(gen2.next()) // {value: 'Hi I am first yield of Generator2', done: false}
console.log(gen2.next()) // {value: 'Hi I am second yield of Generator2', done: false}
console.log(gen2.next()) // {value: 'Hi I am return', done: true}
console.log(gen2.next())  // {value: undefined, done: true}

//@ Another example of return. Return finish Generator.

function* Generator3() {
    return 'Hi I am returning before yield';
    yield 'Hi I am yield';
}

const gen3 = Generator3();
console.log(gen3.next()) // {value: 'Hi I am returning before yield', done: true}
console.log(gen3.next()) // {value: undefined, done: true}


//* yield* - Inner Generator function

function* Generator4() {
    yield 'I am first';
    yield* Generator2();
    yield 'I am third';
}

const gen4 = Generator4();
console.log(gen4.next()) //{value: 'I am first', done: false}
console.log(gen4.next()) // {value: 'Hi I am first yield of Generator2', done: false}
console.log(gen4.next()) // {value: 'Hi I am second yield of Generator2', done: false}

//  -- return statement of Generator2 is not called because of yield read.
console.log(gen4.next()) // {value: 'I am third', done: false}
console.log(gen4.next()) // {value: undefined, done: true}


//! The next() method also accepts a value, which can be used to modify the internal state of Generator. A value passed to next() will be received by yield.

function* Generator5() {
    const value = yield 'Generator5';
    if(value) {
        yield 'Argument working';
    }
}

const gen5 = Generator5();
console.log(gen5.next()) // {value: 'Generator5', done: false}
console.log(gen5.next(true)) // {value: 'Argument working', done: false}
console.log(gen5.next()) // Here passing value inside next don't have any impact. Because generator is already finished.

//! Create Fibonacci Series Using Function generator
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]

function fibSeries(n) {
    function* fib() {
        let current = 0;
        let next = 1;
        while (current < Number.POSITIVE_INFINITY) {
            yield current; // return current value then change current & next
            [current, next] = [next, next + current];
        }

    }
    const gen = fib();
    const series = [];
    for (let i = 0; i <= n; i++) {
        series.push(gen.next().value)
    }
    console.log(series)
}

fibSeries(10);