// Reusable Component with Closure and this

// Create a function createTimer(duration, elementId) that

// Takes a duration in seconds and an elementId as input

// o Starts a timer that counts down from duration to 0.

// o Updates the content of the element with the given elementId to display the remaining time every second.

// o When the timer reaches 0, logs a message to the console.

// o Uses closures to store the timer’s state (remaining time) 

function createTimer(duration, elementId) {
  // Private variable to store the remaining time
  let remainingTime = duration;

  // Referencing the element by its id
  const element = document.getElementById(elementId);

  // Function to start the timer
  function updateTimer() {
    if (remainingTime > 0) {
      // Updating the element content with the remaining time
      element.textContent = remainingTime;
      remainingTime--;
    } else {
      clearInterval(timer);
      console.log("Timer finished");
    }
  }

  // Start the timer, call updateTimer every second (1000ms)
  const timer = setInterval(updateTimer, 1000);
}

createTimer(30, "timerDisplay");
