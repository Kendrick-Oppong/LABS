// Task 1
// Object representing a superhero with properties like name, secretIdentity, powers, and weakness.
const superhero = {
  name: "Iron Hawk",
  secretIdentity: "James Falcon",
  powers: ["Flight", "Laser Vision", "Super Strength"],
  weakness: "Kryptonite",
};



// Task 2
// Add methods to allow the superhero to use powers and reveal their identity.
superhero.usePower = function (powerName) {
  return `${this.name} is using ${powerName}!`;
};

superhero.revealIdentity = function () {
  return `${this.name}'s secret identity is ${this.secretIdentity}.`;
};

superhero.usePower("Laser Vision");
superhero.revealIdentity();

// Task 3
// Create a Superhero constructor function to streamline the creation of multiple superheroes.

function Superhero(name, secretIdentity, powers, weakness) {
  this.name = name;
  this.secretIdentity = secretIdentity;
  this.powers = powers;
  this.weakness = weakness;

  this.usePower = function (powerName) {
    return `${this.name} is using ${powerName}!`;
  };

  this.revealIdentity = function () {
    return `${this.name}'s secret identity is ${this.secretIdentity}`;
  };
}

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

hero1.usePower("Laser Vision");
hero2.revealIdentity();

// Task 4
//  Extend the functionality of your superheroes using prototypal inheritance

Superhero.prototype.fightVillain = function (villainName) {
  return `${this.name} is fighting the villain: ${villainName}!`;
};

hero1.fightVillain("Doctor Doom");
hero2.fightVillain("The Phantom");

// Task 5
//  Use forEach, map, or filter to manipulate an array of superheroes and supervillains.
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

superheroes.forEach((hero) => {
  console.log(`${hero.name} is ready for action!`);
});

const superheroNames = superheroes.map((hero) => hero.name);
console.log("Superhero Names: ", superheroNames);

// Task 7 - Superhero Battle Simulator
//  DOM elements
const startBattleBtn = document.getElementById("startBattleBtn");
const hero1Select = document.getElementById("hero1");
const hero2Select = document.getElementById("hero2");
const battleResultDiv = document.getElementById("battleResult");



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
