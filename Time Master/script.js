// 1. Object-Oriented Clock
class Clock {
  constructor() {
    this.currentTime = new Date(); // Initialize the current time when the object is created
    this.hours = this.currentTime.getHours();
    this.minutes = this.currentTime.getMinutes();
    this.seconds = this.currentTime.getSeconds();
  }

  formatTime(hours, minutes, seconds) {
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  getFormattedTime() {
    return this.formatTime(this.hours, this.minutes, this.seconds);
  }

  get12HourTime() {
    let period = "AM";
    let hours12 = this.hours;

    if (hours12 >= 12) {
      period = "PM";
      hours12 -= 12;
    }
    if (hours12 === 0) {
      hours12 = 12;
    }

    return `${this.formatTime(hours12, this.minutes, this.seconds)} ${period}`;
  }

  updateTime() {
    this.currentTime = new Date(); // Update current time every time this is called
    this.hours = this.currentTime.getHours();
    this.minutes = this.currentTime.getMinutes();
    this.seconds = this.currentTime.getSeconds();
  }

  getTimeForTimezone(timezone) {
    let offset = 0; // Default is Local Time
    switch (timezone) {
      case "utc":
        offset = 0;
        break;
      case "gmt":
        offset = 0;
        break;
      case "est":
        offset = -5;
        break;
      case "pst":
        offset = -8;
        break;

      default:
        offset = new Date().getTimezoneOffset() / 60;
        break;
    }

    const adjustedTime = new Date(
      this.currentTime.getTime() + offset * 60 * 60 * 1000
    );
    return this.formatTime(
      adjustedTime.getHours(),
      adjustedTime.getMinutes(),
      adjustedTime.getSeconds()
    );
  }
}

function displayClock() {
  const clockElement = document.getElementById("clock");
  const myClock = new Clock(); 

  setInterval(() => {
    myClock.updateTime(); 
    const is12HourFormat = toggleClockFormat();
    const selectedTimezone = getSelectedTimezone();

    clockElement.textContent = is12HourFormat
      ? myClock.get12HourTime()
      : myClock.getTimeForTimezone(selectedTimezone);

    checkAlarm(myClock); 
  }, 1000);
}

displayClock();

// Customization and alarm elements
const clockElement = document.getElementById("clock");
const textColor = document.getElementById("textColor");
const backgroundColor = document.getElementById("backgroundColor");
const _12HourToggleCheckbox = document.getElementById("formatToggle");
const timezoneSelect = document.getElementById("timezoneSelect");
const alarmButton = document.getElementById("setAlarmTime");
const alarmSound = document.getElementById("alarmSound");

// Event Listeners
textColor.addEventListener("input", changeClockTextColor);
backgroundColor.addEventListener("input", changeClockBackgroundColor);
_12HourToggleCheckbox.addEventListener("change", toggleClockFormat);
timezoneSelect.addEventListener("change", displayClock);
alarmButton.addEventListener("change", setAlarmTime);

function changeClockTextColor() {
  clockElement.style.color = textColor.value;
}

function changeClockBackgroundColor() {
  clockElement.style.backgroundColor = backgroundColor.value;
}

function toggleClockFormat() {
  return _12HourToggleCheckbox.checked;
}

function getSelectedTimezone() {
  return timezoneSelect.value;
}

// Alarm feature
let alarmTime = null;

function setAlarmTime() {
  const alarmTimeInput = alarmButton.value.trim();
  if (alarmTimeInput) {
    alarmTime = alarmTimeInput;
    alert("Alarm set for: " + alarmTime);
  }
}

function checkAlarm(clock) {
  const currentUTC = new Date(
    Date.UTC(
      clock.currentTime.getUTCFullYear(),
      clock.currentTime.getUTCMonth(),
      clock.currentTime.getUTCDate(),
      clock.hours,
      clock.minutes,
      clock.seconds
    )
  );

  const [alarmHour, alarmMinute] = alarmTime
    .split(":")
    .map((num) => parseInt(num, 10));

  const alarmUTC = new Date(
    Date.UTC(
      currentUTC.getUTCFullYear(),
      currentUTC.getUTCMonth(),
      currentUTC.getUTCDate(),
      alarmHour,
      alarmMinute
    )
  );

  if (
    currentUTC.getHours() === alarmUTC.getHours() &&
    currentUTC.getMinutes() === alarmUTC.getMinutes()
  ) {
    triggerAlarm();
  }
}

function triggerAlarm() {
  alert("ALARM! Time to wake up!");
  alarmSound.play();
  alarmTime = null;
}
