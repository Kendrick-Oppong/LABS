// Returns the full name of a person object (given
// properties firstName and lastName).

const getfullName = (person) => {
  return `Your full name is ${person.firstName} ${person.lastName}`;
};

console.log(
    getfullName({ firstName: "kendrick", lastName: "Oppong" })
);
