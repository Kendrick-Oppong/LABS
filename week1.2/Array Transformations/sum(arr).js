// Calculates the sum of all numbers in an array

const sumAll = (arr) => {
  const sum = arr.reduce((accu, num) => accu + num, 0);
  return sum;
};

console.log(sumAll([1, 2, 3, 4, 5]));
