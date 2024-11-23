// DOM elements
const darkModeToggle = document.getElementById("darkModeToggle");
const fontFamilySelector = document.getElementById("fontFamily");
const loadingSpinner = document.getElementById("loadingSpinner");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.querySelector(".results-container");
const sourceContainer = document.querySelector(".source-container");
const mainContent = document.querySelector(".main");
const emptySearchInputMessage = document.querySelector(
  ".empty-search-field-msg"
);

// Dark Mode Toggle
darkModeToggle.addEventListener("change", (e) => {
  if (e.target.checked) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
});

// Event listener for font family change
fontFamilySelector.addEventListener("change", (e) => {
  const selectedFont = e.target.value;
  switch (selectedFont) {
    case "Sans Serif":
      document.body.style.fontFamily = "sans-serif";
      break;
    case "Serif":
      document.body.style.fontFamily = "serif";
      break;
    case "Mono":
      document.body.style.fontFamily = "monospace";
      break;
    default:
      document.body.style.fontFamily = "sans-serif";
  }
});

let debounceTimeout;

searchInput.addEventListener("input", (e) => {
  const word = searchInput.value.trim();

  if (!word.length) {
    searchInput.style.border = "1px solid var(--color-red)";
    emptySearchInputMessage.classList.remove("hidden");
    return;
  } else {
    searchInput.style.border = "1px solid var(--color-light-gray-1)";
    emptySearchInputMessage.classList.add("hidden");
  }

  clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(() => {
    fetchWordData(word); 
  }, 500); 

});

// Function to fetch dictionary data
async function fetchWordData(word) {
  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  // Show spinner, hide content
  loadingSpinner.classList.remove("hidden");
  mainContent.classList.add("hidden");

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (!response.ok) {
      displayErrorMessage(data);
      throw new Error(data);
    }
    displayFetchedWordData(data[0]);
  } catch (error) {
    console.error("Error fetching word data:", error);
  } finally {
    // Hide spinner, show content after fetching is complete
    loadingSpinner.classList.add("hidden");
    mainContent.classList.remove("hidden");
  }
}

function displayFetchedWordData(data) {
  const { word, phonetic, meanings, phonetics, sourceUrls } = data;

  // Find the first available audio URL from phonetics
  const audioUrl = phonetics.find((phonetic) => phonetic.audio)?.audio || "";

  // Clear previous results
  resultsContainer.innerHTML = "";

  const headerHTML = `
    <div class="header-play-container">
      <header class="title">
        <h1>${word}</h1>
        <p>${phonetic ? phonetic : ""}</p>
      </header>
      <div>
        <img id="playIcon" src="./assets/images/icon-play.svg" alt="play icon" style="cursor: pointer;" />
      </div>
    </div>
  `;
  resultsContainer.insertAdjacentHTML("beforeend", headerHTML);

  // Add event listener to play audio if available
  const playIcon = document.getElementById("playIcon");
  if (audioUrl) {
    playIcon.addEventListener("click", () => playAudio(audioUrl));
  } else {
    playIcon.style.opacity = "0.5";
    playIcon.style.cursor = "not-allowed";
  }

  // Display meanings
  meanings.forEach((meaning) => {
    const meaningHTML = `
      <div class="definition-container">
        <p>${meaning.partOfSpeech}</p>
        <hr />
      </div>
      <div class="meaning-container">
        <p>Meaning</p>
        <ul>
          ${meaning.definitions
            .map((def) => `<li>${def.definition}</li>`)
            .join("")}
        </ul>
      </div>
      ${
        meaning.synonyms && meaning.synonyms.length
          ? `<div class="synonyms-container">
          <p>Synonyms</p>
          <p>${meaning.synonyms.join(", ")}</p>
        </div>`
          : ""
      }
    `;
    resultsContainer.insertAdjacentHTML("beforeend", meaningHTML);
  });

  // Display source link
  const sourceHTML = `
    <p>Source</p>
    <p>
      <a href="${sourceUrls[0]}" target="_blank">${sourceUrls[0]}
        <img src="./assets/images/icon-new-window.svg" alt="source link" />
      </a>
    </p>
  `;
  sourceContainer.innerHTML = sourceHTML;
}

// Function to play audio
function playAudio(audioUrl) {
  const audio = new Audio(audioUrl);
  audio.play();
}

function displayErrorMessage(error) {
  resultsContainer.innerHTML = `<section class="error-container">
        <h1>😕</h1>
        <h1 class="title">${error.title}</h1>
        <p>
         ${error.message} ${error.resolution}
        </p>
      </section>`;
  sourceContainer.innerHTML = "";
}
