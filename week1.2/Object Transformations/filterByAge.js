// Filters an array of person objects to keep
// only those at least minAge years old

const peopleArr = [
  { name: "Kojo", age: 12 },
  { name: "Brian", age: 22 },
  { name: "Kate", age: 18 },
  { name: "Mike", age: 32 },
];

const filterByAge = (people, age) => {
  const filteredPeople = people.filter((person) => person.age >= age.minAge);
  return filteredPeople;
};

console.log(filterByAge(peopleArr, { minAge: 20 }));
