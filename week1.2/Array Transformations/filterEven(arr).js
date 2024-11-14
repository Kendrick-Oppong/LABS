// Filters out even numbers from an array

const filterEven = (arr) => {
  const filteredEvenNumbers = arr.filter((num) => num % 2 === 0);
  return filteredEvenNumbers;
};

console.log(filterEven([1, 2, 3, 4, 5, 6, 7, 8]));
