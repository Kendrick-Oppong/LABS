  // Reverses a string

const reverseString = (str) => {
  const reversedWord = str.trim().split("").reverse().join("");
  return reversedWord;
};

console.log(reverseString("kendrick"));
