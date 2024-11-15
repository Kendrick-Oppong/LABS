// Task 1
// Object representing a superhero with properties like name, secretIdentity, powers, and weakness.
const superhero = {
  name: "Iron Hawk",
  secretIdentity: "James Falcon",
  powers: ["Flight", "Laser Vision", "Super Strength"],
  weakness: "Kryptonite",
};

console.log(superhero); // Display superhero object

// Task 2
// Object representing methods to allow the superhero to use powers and reveal their identity.
superhero.usePower = function (powerName) {
  // Method that logs a message when the superhero uses a specific power
  return `${this.name} is using ${powerName}!`;
};

superhero.revealIdentity = function () {
  // Method that logs the superhero's secret identity
  return `${this.name}'s secret identity is ${this.secretIdentity}.`;
};

// Test the methods
console.log(superhero.usePower("Laser Vision"));
console.log(superhero.revealIdentity());

// Task 3
// Object representing a constructor function for creating multiple superhero objects with specific properties.
function Superhero(name, secretIdentity, powers, weakness) {
  this.name = name;
  this.secretIdentity = secretIdentity;
  this.powers = powers;
  this.weakness = weakness;

  // Method that logs a message when the superhero uses a specific power
  this.usePower = function (powerName) {
    return `${this.name} is using ${powerName}!`;
  };

  // Method that logs the superhero's secret identity
  this.revealIdentity = function () {
    return `${this.name}'s secret identity is ${this.secretIdentity}`;
  };
}

// Task 4
// Object representing superheroes created using the constructor function.
const hero1 = new Superhero(
  "Iron Hawk",
  "James Falcon",
  ["Flight", "Laser Vision", "Super Strength"],
  "Kryptonite"
);

const hero2 = new Superhero(
  "Shadow Blade",
  "Liam Knight",
  ["Invisibility", "Sword Mastery"],
  "Bright Light"
);

// Testing the constructor by using the methods.
console.log(hero1.usePower("Laser Vision"));
console.log(hero2.revealIdentity());

// Task 5
// Object representing prototypal inheritance by adding the fightVillain method to the Superhero constructor.
Superhero.prototype.fightVillain = function (villainName) {
  // Method that logs a message when the superhero fights a villain
  return `${this.name} is fighting the villain: ${villainName}!`;
};

// Testing the prototype method with the superheroes.
hero1.fightVillain("Doctor Doom");
hero2.fightVillain("The Phantom");

// Task 6
// Object representing an array of superheroes created using the constructor function.
const superheroes = [
  {
    name: "Iron Hawk",
    secretIdentity: "James Falcon",
    powers: ["Flight", "Laser Vision", "Super Strength"],
    weakness: "Kryptonite",
  },
  {
    name: "Shadow Blade",
    secretIdentity: "Liam Knight",
    powers: ["Invisibility", "Sword Mastery"],
    weakness: "Bright Light",
  },
  {
    name: "Aqua Shield",
    secretIdentity: "Mira Waters",
    powers: ["Water Manipulation", "Healing"],
    weakness: "Electricity",
  },
];

// Object representing an operation to log a message for each superhero in the array
superheroes.forEach((hero) => {
  console.log(`${hero.name} is ready for action!`);
});

// Object representing the transformation of superhero names into a new array using map.
const superheroNames = superheroes.map((hero) => hero.name);
console.log("Superhero Names: ", superheroNames);

// Task 7 - Superhero Battle Simulator
//  DOM elements
const startBattleBtn = document.getElementById("startBattleBtn");
const hero1Select = document.getElementById("hero1");
const hero2Select = document.getElementById("hero2");
const battleResultDiv = document.getElementById("battleResult");

// Function to start the battle between two superheroes
function startBattle(hero1, hero2) {
  console.log(`🔥 The battle begins between ${hero1.name} and ${hero2.name}!`);

  // Determine the winner based on the number of powers each hero has
  const winner = hero1.powers.length > hero2.powers.length ? hero1 : hero2;

  // Displaying battle outcome
  console.log(`🏆 The winner is... ${winner.name}!`);
  console.log(`${hero1.name} uses: ${hero1.powers.join(", ")}`);
  console.log(`${hero2.name} uses: ${hero2.powers.join(", ")}`);
}

// Task 8 - Battle Simulation UI Integration
startBattleBtn.addEventListener("click", function () {
  const hero1Name = hero1Select.value;
  const hero2Name = hero2Select.value;

  // Find the corresponding superhero objects from the array
  const hero1 = superheroes.find((hero) => hero.name === hero1Name);
  const hero2 = superheroes.find((hero) => hero.name === hero2Name);

  // Preventing empty options
  if (!hero1 || !hero2) {
    alert("Invalid superheroes selected. Please choose valid heroes.");
    return;
  }

  // Preventing battle between the same superhero
  if (hero1 === hero2) {
    alert("You cannot choose the same superhero for both players.");
    return;
  }

  // Start the battle and display the result
  startBattle(hero1, hero2);

  // Display the battle result in the HTML
  const result = `
    <h3>Battle Result:</h3>
    <p>The battle begins between <strong>${hero1.name}</strong> and <strong>${
    hero2.name
  }</strong>!</p>
    <p>The winner is: <strong>${
      hero1.powers.length > hero2.powers.length ? hero1.name : hero2.name
    }</strong></p>
    <p>${hero1.name} powers: ${hero1.powers.join(", ")}</p>
    <p>${hero2.name} powers: ${hero2.powers.join(", ")}</p>
  `;

  battleResultDiv.innerHTML = result;
});
