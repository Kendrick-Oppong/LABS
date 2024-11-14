// 1 Time object basics
// Date object to represent the current time
const currentTime = new Date();

// Extracting hours, minutes, and seconds from the Date object
const hours = currentTime.getHours();
const minutes = currentTime.getMinutes();
const seconds = currentTime.getSeconds();

// Logging the current time
console.log(`Current Time: ${hours}:${minutes}:${seconds}`);

// 2 Object Oriented Clock
// Task: Design a Clock object with properties like hours, minutes, and seconds

class Clock {
  constructor() {
    // Date object to get current time
    const currentTime = new Date();

    // Setting properties for hours, minutes, and seconds
    this.hours = currentTime.getHours();
    this.minutes = currentTime.getMinutes();
    this.seconds = currentTime.getSeconds();
  }

  // Method to return time in "HH:MM:SS" format (24-hour format)
  getFormattedTime() {
    const formattedHours = this.hours.toString().padStart(2, "0");
    const formattedMinutes = this.minutes.toString().padStart(2, "0");
    const formattedSeconds = this.seconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  // Method to return time in 12-hour format with AM/PM
  get12HourTime() {
    let period = "AM";
    let hours12 = this.hours;

    // Converting 24-hour time to 12-hour time
    if (hours12 >= 12) {
      period = "PM";
      hours12 -= 12; // Subtracting 12 to convert to 12-hour format
    }

    // Handling the case for midnight (00:00), which should be 12 AM
    if (hours12 === 0) {
      hours12 = 12;
    }

    const formattedHours = hours12.toString().padStart(2, "0");
    const formattedMinutes = this.minutes.toString().padStart(2, "0");
    const formattedSeconds = this.seconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${period}`;
  }

  // Method to update time properties every second
  updateTime() {
    const currentTime = new Date();
    this.hours = currentTime.getHours();
    this.minutes = currentTime.getMinutes();
    this.seconds = currentTime.getSeconds();
  }
}

// Create an instance of the Clock object
const currentClock = new Clock();

// Outputting the formatted time in both formats
console.log("24-Hour Time:", currentClock.getFormattedTime());
console.log("12-Hour Time:", currentClock.get12HourTime());

// Function to display the clock on the webpage
function displayClock() {
  const clockElement = document.getElementById("clock");
  const myClock = new Clock(); // Creating a new clock instance

  // Updating time every second
  setInterval(() => {
    myClock.updateTime();
    const is12HourFormat = toggleClockFormat();
    clockElement.textContent = is12HourFormat
      ? myClock.get12HourTime()
      : myClock.getFormattedTime();

    // Alarm feature: Check if the current time matches the alarm time
    checkAlarm(myClock);
  }, 1000);
}

displayClock();

//  Clock with customizable color
const clockElement = document.getElementById("clock");
const textColor = document.getElementById("textColor");
const backgroundColor = document.getElementById("backgroundColor");
const _12HourToggleCheckbox = document.getElementById("formatToggle");
const alarmButton = document.getElementById("setAlarmTime");

// Event Listeners for customization
textColor.addEventListener("input", changeClockTextColor);
backgroundColor.addEventListener("input", changeClockBackgroundColor);
_12HourToggleCheckbox.addEventListener("change", toggleClockFormat);
alarmButton.addEventListener("change", setAlarmTime);

// Color change functions
function changeClockTextColor() {
  clockElement.style.color = textColor.value;
}

function changeClockBackgroundColor() {
  clockElement.style.backgroundColor = backgroundColor.value;
}

function toggleClockFormat() {
  return _12HourToggleCheckbox.checked;
}

// Alarm feature: Function to set alarm time
let alarmTime = null;

function setAlarmTime() {
  const alarmTimeInput = alarmButton.value.trim();
  if (alarmTimeInput) {
    alarmTime = alarmTimeInput;
    alert("Alarm set for: " + alarmTime);
  }
}

// Alarm checking function
function checkAlarm(clock) {
  // Format current time as HH:MM
  const currentHours = clock.hours.toString().padStart(2, "0");

  const currentMinutes = clock.minutes.toString().padStart(2, "0");

  const currentFormattedTime = `${currentHours}:${currentMinutes}`;

  // Check if current time matches the alarm time
  if (alarmTime && currentFormattedTime === alarmTime) {
    const is12HourFormat = currentHours > 12 ? currentHours - 12 : currentHours;
    alert("ALARM! The time is " + `0${is12HourFormat}:${currentMinutes} `);
    alarmTime = null;
  }
}
