//  Calculates the average of all numbers in an array.

const getAverage = (arr) => {
  const sum = arr.reduce((accu, num) => accu + num, 0);
  const average = sum / arr.length;
  return average;
};

console.log(getAverage([1, 2, 3, 4, 5]));
