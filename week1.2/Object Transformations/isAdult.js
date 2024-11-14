// Checks if a person is 18 or older (given property age).

const isAdult = (person) => {
  return person.age >= 18;
};

console.log(isAdult({ age: 10 }));
