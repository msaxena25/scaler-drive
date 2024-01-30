function sum(a, b) {
    return a + b;
}

var key = 9090;



// export sum;  -- wrong syntax

export { sum, key };  // You can export multiple things using object