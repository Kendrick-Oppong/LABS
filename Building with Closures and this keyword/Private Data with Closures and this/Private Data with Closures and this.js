// Private Data with Closures and this:
// • Create a function createCounter() that:
// o Has a private variable count initialized to 0.
// o Returns an object with two methods:
// 1. increment(): Increments the count and logs the new value
// to the console using this.count.
// 2. getCount(): Returns the current value of count.

function createCounter() {
  let count = 0;

  let obj = {
    increment() {
      count++;
      console.log(this.count);
    },

    getCount() {
      return count;
    },
  };

  return obj;
}

