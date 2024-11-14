// Counts the number of words in a string

const wordCount = (str) => {
    const word = str.trim().split("").length;   
    return word
}

console.log(wordCount("Hello"))