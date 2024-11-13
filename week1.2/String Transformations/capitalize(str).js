// Capitalizes the first letter of a string

const capitalize = (str) => {
  //trim and split word into array
  const words = str.trim().toLowerCase().split(" ");
  //map over word array and capitalize first letter, then join into string
  const capitalized = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
  return capitalized;
};

console.log(capitalize("kendrick"));
