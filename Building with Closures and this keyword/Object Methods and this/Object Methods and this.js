/* Object Methods and this:
• Create a Person object with the following properties:
    o name (string)
    o age (number)
• Add a method greet() to the Person object that logs a message like "Hello, 
my name is [name] and I'm [age] years old."
• Experiment with calling greet() directly on the Person object, using call(), 
apply(), and bind(). Observe how the value of this changes in each 
context */

const Person = {
  name: "John Doe",
  age: 30,
  greet() {
    alert(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
  },
};

Person.greet();

const anotherPerson = { name: "Mike", age: 25 };

Person.greet.call(anotherPerson);

Person.greet.apply(anotherPerson);

const boundGreet = Person.greet.bind(anotherPerson);
boundGreet();
