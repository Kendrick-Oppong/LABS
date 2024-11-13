// Double every number in an array

const doubleNumber = (arr) => {
    const numArr = arr.map((num) => Number(num) * 2);
    return numArr
};

console.log(doubleNumber([2, 4, 6, 8]));
