// 1. Time object basics
// Date object to represent the current time
const currentTime = new Date();

// Extracting hours, minutes, and seconds from the Date object
const hours = currentTime.getHours();
const minutes = currentTime.getMinutes();
const seconds = currentTime.getSeconds();

// 2. Object-Oriented Clock
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

  // Helper method to format time
  formatTime(hours, minutes, seconds) {
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  // Method to return time in "HH:MM:SS" format (24-hour format)
  getFormattedTime() {
    return this.formatTime(this.hours, this.minutes, this.seconds);
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

    const formattedTime = this.formatTime(hours12, this.minutes, this.seconds);
    return `${formattedTime} ${period}`;
  }

  // Method to update time properties every second
  updateTime() {
    // new Date() is needed to get the real-time values for hours, minutes, and seconds
    // and keeps the clock in sync with the actual system time.
    const currentTime = new Date();
    this.hours = currentTime.getHours();
    this.minutes = currentTime.getMinutes();
    this.seconds = currentTime.getSeconds();
  }
}

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

// Clock with customizable color
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
    alert("ALARM! The time is " + currentFormattedTime);
    alarmTime = null;
  }
}
