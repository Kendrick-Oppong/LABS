// a function to
// reverse and capitalize a string, or to double all the even
// numbers in an array

// takes multiple functions as argument and return a new function

const compose =
  (...fns) =>
  (value) => {
    return fns.reduceRight((acc, fn) => fn(acc), value);
  };


// doubling all even numbers in an array
const double = (num) => num * 2;
const isEven = (num) => num % 2 === 0;

const doubleIfEven = (arr) =>
  arr.map((num) => (isEven(num) ? double(num) : num));

// compose function for processing the array
const processArr = compose(doubleIfEven);

console.log(processArr([1, 2, 3, 4, 5, 6]));
