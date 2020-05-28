//default values
let time = 5;
let running = false;
let cycleLeft = 2;

//computed values

//placeholders
const clock_p = document.getElementById('clock');
const button_button = document.getElementById('start-pause');
const cycleLeft_p = document.getElementById('cycle-left');
let myCountdown;
let nextActivity; //SHORT BREAK, LONG BREAK, POMODORO TIME

// starting the timer -> goes into checker
const run = () => {
  button_button.innerHTML = "Pause"
  running = true;
  myCountdown = window.setInterval(countdown, 1000);
  nextActivity = "SHORT BREAK";

  // The code to display the time.
  function countdown() {
    --time;
    let seconds = time % 60;
    let secondsInMinutes = (time - seconds) / 60;
    let minutes = secondsInMinutes % 60;
    let hours = (secondsInMinutes - minutes) / 60;
    let secondsStr = seconds.toString().padStart(2, '0');
    let minutesStr = minutes.toString().padStart(2, '0');
    clock_p.innerHTML = `${minutesStr}:${secondsStr}`;

    // Check whether still have cycles left.
    if (time == 0) {
      window.clearInterval(myCountdown)
      cycle();
    }
  }
}

// pausing the pomodoro clock
const stopRunning = () => {
  button_button.innerHTML = "Resume"
  running = false;
  window.clearInterval(myCountdown);
}

// determine whether to run the code again ->
const cycle = () => {
  if (cycleLeft == 1) {
    console.log('bye')
    window.clearInterval(myCountdown);
  }
  cycleLeft--;
  time = 6;
  cycleLeft_p.innerHTML = cycleLeft;
  run();
}

// Taking a break
const rest = () => {
  nextActivity = "POMODORO TIME"

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

//Cycle up
const cycleUp = () => {
  cycleLeft++;
  cycleLeft_p.innerHTML = cycleLeft;
}

const cycleDown = () => {
  cycleLeft--;
  cycleLeft_p.innerHTML = cycleLeft;
}
