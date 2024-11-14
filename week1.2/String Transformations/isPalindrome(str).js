// Checks if a string is a palindrome (reads the same
// backward as forward)

const isPalindrome = (word) => {
  const reversedWord = word.trim().split("").reverse().join("");
  return word.trim() === reversedWord.trim();
};

console.log(isPalindrome("kendrick"));
