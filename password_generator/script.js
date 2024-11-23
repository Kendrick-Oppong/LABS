// DOM Elements
const rangeInput = document.getElementById("rangeInput");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const passwordDisplay = document.querySelector(".password");
const lengthDisplay = document.querySelector(".length");
const generateButton = document.querySelector("button");
const strengthBars = document.querySelectorAll(".password-strength-bars div");
const copyIcon = document.querySelector(".password-result img");
const copiedTooltip = document.querySelector(".copied-tooltip");

// Character sets
const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
const NUMERIC_CHARS = "0123456789";
const SYMBOL_CHARS = "!@#$%^&*()_+[]{}|;:,.<>?";

function generatePassword(
  length,
  hasUppercase,
  hasLowercase,
  hasNumbers,
  hasSymbols
) {
  let availableChars = "";
  let password = "";

  if (hasUppercase) availableChars += UPPERCASE_CHARS;
  if (hasLowercase) availableChars += LOWERCASE_CHARS;
  if (hasNumbers) availableChars += NUMERIC_CHARS;
  if (hasSymbols) availableChars += SYMBOL_CHARS;

  if (availableChars.length === 0) return ""; // Return empty string if no options are selected

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    password += availableChars[randomIndex];
  }

  return password;
}

// Update password strength based on length and selected options
function updateStrength(
  length,
  hasUppercase,
  hasLowercase,
  hasNumbers,
  hasSymbols
) {
  let strength = 0;
  let strengthMessage = "";

  // Count how many character types are selected
  const typesCount = [
    hasUppercase,
    hasLowercase,
    hasNumbers,
    hasSymbols,
  ].filter(Boolean).length;

  // Determining strength based on length and character types
  if (length < 8) {
    strengthMessage = "TOO WEAK";
    strength = 1;
  } else if (length >= 8 && typesCount === 1) {
  
    strengthMessage = "WEAK";
    strength = 2;
  } else if (length >= 8 && typesCount >= 2 && length < 12) {
    
    strengthMessage = "MEDIUM";
    strength = 3;
  } else if (length >= 12 && typesCount >= 3) {
   
    strengthMessage = "STRONG";
    strength = 4;
  } else {
   
    strengthMessage = "TOO WEAK";
    strength = 1;
  }

  // Resetting bar styles
  strengthBars.forEach((bar) => (bar.style.backgroundColor = "transparent"));

  // Setting strength message and bar colors
  const colors = {
    "TOO WEAK": "var(--red)",
    WEAK: "var(--orange)",
    MEDIUM: "var(--yellow)",
    STRONG: "var(--neon-green)",
  };

  // Showing strength message
  document.querySelector(
    ".password-strength-wrapper p"
  ).textContent = `${strengthMessage}`;

  // Applying color to bars based on strength
  for (let i = 0; i < strength; i++) {
    strengthBars[i].style.backgroundColor = colors[strengthMessage];
  }
}

// Update password length display
rangeInput.addEventListener("input", (e) => {
  const length = e.target.value;
  lengthDisplay.textContent = length;
});

// Generate password when the button is clicked
generateButton.addEventListener("click", () => {
  const length = rangeInput.value;
  const hasUppercase = uppercaseCheckbox.checked;
  const hasLowercase = lowercaseCheckbox.checked;
  const hasNumbers = numbersCheckbox.checked;
  const hasSymbols = symbolsCheckbox.checked;

  // Validation check: Ensuring at least one character type is selected and the length is valid
  if (
    length < 1 ||
    length > 20 ||
    (!hasUppercase && !hasLowercase && !hasNumbers && !hasSymbols)
  ) {
    alert(
      "Please select at least one character type and set a valid character length."
    );
    return;
  }

  const password = generatePassword(
    length,
    hasUppercase,
    hasLowercase,
    hasNumbers,
    hasSymbols
  );
  passwordDisplay.style.color = `var(--almost-white)`;
  passwordDisplay.textContent = password;

  // Update strength
  updateStrength(length, hasUppercase, hasLowercase, hasNumbers, hasSymbols);
});

copyIcon.addEventListener("click", () => {
  const password = passwordDisplay.textContent;

  if (password !== "Select Options") {
    navigator.clipboard.writeText(password).then(() => {
      copiedTooltip.style.display = "block";
      setTimeout(() => {
        copiedTooltip.style.display = "none";
      }, 2000);
    });
  }
});
