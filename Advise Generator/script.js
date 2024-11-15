// DOM elements
const adviceElement = document.getElementById("advice");
const adviceNumberElement = document.getElementById("advice-number");
const loadingIndicator = document.getElementById("loading-indicator");
const generateButton = document.getElementById("generate-button");
const retryButton = document.getElementById("retry-button");

// Function to fetch advice from the API
async function fetchAdvice() {
  try {
    // Showing loading indicator
    loadingIndicator.style.display = "block";
    retryButton.style.display = "none"; // Hiding retry button if request is successful

    // Fetch advice from the API
    const response = await fetch("https://api.adviceslip.com/advice");

    if (!response.ok) {
      throw new Error("Failed to fetch advice");
    }

    // Parse the JSON response
    const data = await response.json();

    // Extract the advice and advice ID
    const advice = data.slip.advice;
    const adviceNumber = data.slip.id;

    // Updating the UI with the fetched advice
    adviceElement.innerText = `"${advice}"`;
    adviceNumberElement.innerText = `ADVICE #${adviceNumber}`;
  } catch (error) {
    console.error("Error fetching advice:", error);
    adviceElement.innerText = "Failed to fetch advice. Please try again.";
    retryButton.style.display = "block"; // Showing retry button on error
  } finally {
    // Hide the loading indicator
    loadingIndicator.style.display = "none";
  }
}

// Button click handler for generating advice
generateButton.addEventListener("click", fetchAdvice);

// Retry button click handler for retrying the API request
retryButton.addEventListener("click", fetchAdvice);

// Initially fetch advice when the page loads
fetchAdvice();
