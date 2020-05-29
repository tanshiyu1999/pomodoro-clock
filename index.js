//default values
let time = 5; // time = 1500
let setTime = 5; // setTime = 1500
let restTime = 10; //  restTime = 300
let running = false; // whether clock is running
let cycleLeft = 2; // number of cycles
let processing = false; //whether the app is running

//computed values

//placeholders
const clock_p = document.getElementById('clock');
const button_button = document.getElementById('start-pause');
const cycleLeft_p = document.getElementById('cycle-left');
const time_span = document.getElementById('pomo-timer');
const rest_span = document.getElementById('rest-timer');
let myCountdown;
let SHORT_BREAK = "SHORT BREAK";
let LONG_BREAK = "LONG BREAK";
let POMODORO_TIME = "POMODORO TIME"
let nextActivity = "SHORT BREAK";

// Userinput Next Schedule

//clock that prc
const clockTimer = time => {
  let seconds = time % 60;
  let secondsInMinutes = (time - seconds) / 60;
  let minutes = secondsInMinutes % 60;
  let hours = (secondsInMinutes - minutes) / 60;
  let secondsStr = seconds.toString().padStart(2, '0');
  let minutesStr = minutes.toString().padStart(2, '0');
  return `${minutesStr}:${secondsStr}`;
}

// starting the timer -> goes into checker
const run = () => {
  processing = true;
  running = true;
  button_button.innerHTML = "Pause"
  myCountdown = window.setInterval(countdown, 1000);

  // The code to display the time.
  function countdown() {
    --time;
    clock_p.innerHTML = clockTimer(time);

    // Check whether still have cycles left.
    if (time <= 0) {
      clearInterval(myCountdown);
      checkNext();
    }
  }
}

// pausing the pomodoro clock
const stopRunning = () => {
  running = false;
  button_button.innerHTML = "Resume"
  clearInterval(myCountdown);
}

// determine whether to run the code again based on cycle left
const cycle = () => {
  if (cycleLeft == 1) {
    cycleLeft--;
    cycleLeft_p.innerHTML = cycleLeft;
    clearInterval(myCountdown);
    running = false;
    processing = false;
  } else {
    cycleLeft--;
    time = 6;
    cycleLeft_p.innerHTML = cycleLeft;
    time = setTime;
    run();
  }
}

//short break
const shortBreak = () => {
  clock_p.innerHTML = clockTimer(restTime);
  myBreak = window.setInterval(breakCountdown, 1000);
  function breakCountdown() {
    --restTime;
    clock_p.innerHTML = clockTimer(restTime);
    if (restTime <= 0) {
      clearInterval(breakCountdown);
      checkNext();
    }
  }
}

//long break
const longBreak = () => {
  return;
}

// Check what is gonna happen next
const checkNext = () => {
  switch (nextActivity) {
    case SHORT_BREAK:
      shortBreak();
      break;
    case LONG_BREAK:
      longBreak();
      break;
    case POMODORO_TIME:
      cycle();
      break;
    default:
      console.log("No more things")
  }

}

// run at the start
const main = () => {
  clock_p.innerHTML;
  if (running == false) {
    run();
  } else if (running == true) {
    stopRunning();
  }
}

//Cycle up & Cycle down
const cycleUp = () => {
  cycleLeft++;
  cycleLeft_p.innerHTML = cycleLeft;
}
const cycleDown = () => {
  cycleLeft--;
  cycleLeft_p.innerHTML = cycleLeft;
}

// Pomo up & Pomo down
const pomoUp = () => {
  setTime+=60;
  time_span.innerHTML = clockTimer(setTime);
  (processing == false) ? time = setTime: {};
  clock_p.innerHTML = clockTimer(time);
}
const pomoDown = () => {
  let check = setTime - 60;
  if (check <= 60) {
    setTime = 60;
    time_span.innerHTML = clockTimer(setTime);
    (processing == false) ? time = setTime: {};
    clock_p.innerHTML = clockTimer(time);
    return;
  }
  setTime-=60;
  time_span.innerHTML = clockTimer(setTime);
  (processing == false) ? time = setTime: {};
  clock_p.innerHTML = clockTimer(time);
}

// Rest up & rest Down
const restUp = () => {
  restTime+=60;
  rest_span.innerHTML = clockTimer(restTime);
}

const restDown = () => {
  let check = restTime - 60;
  if (check <= 60) {
    restTime = 60;
    rest_span.innerHTML = clockTimer(restTime);
    return;
  }
  restTime -= 60;
  rest_span.innerHTML = clockTimer(restTime);
}
