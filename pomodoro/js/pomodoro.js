let sessionTime = 20;
let breakTime = 5;

let currentTime = sessionTime * 60;
let isSession = true;
let timer = null;
let running = false;

const time = document.getElementById("time");
const mode = document.getElementById("mode");

const sessionValue = document.getElementById("sessionValue");
const breakValue = document.getElementById("breakValue");

const sessionPlus = document.getElementById("sessionPlus");
const sessionMinus = document.getElementById("sessionMinus");

const breakPlus = document.getElementById("breakPlus");
const breakMinus = document.getElementById("breakMinus");

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

function updateDisplay() {

    let min = Math.floor(currentTime / 60);
    let sec = currentTime % 60;

    time.textContent =
        String(min).padStart(2, "0") + ":" +
        String(sec).padStart(2, "0");

    sessionValue.textContent = sessionTime + " min";
    breakValue.textContent = breakTime + " min";

    mode.textContent = isSession ? "Session" : "Break";
}

function disableButtons(value) {

    sessionPlus.disabled = value;
    sessionMinus.disabled = value;

    breakPlus.disabled = value;
    breakMinus.disabled = value;
}

sessionPlus.onclick = function () {
    sessionTime++;

    if (isSession && !running)
        currentTime = sessionTime * 60;
    updateDisplay();
}

sessionMinus.onclick = function () {

    if (sessionTime > 0)
        sessionTime--;

    if (isSession && !running)
        currentTime = sessionTime * 60;
    updateDisplay();
}

breakPlus.onclick = function () {
    breakTime++;
    if (!isSession && !running)
        currentTime = breakTime * 60;
    updateDisplay();
}

breakMinus.onclick = function () {
    if (breakTime > 0)
        breakTime--;
    if (!isSession && !running)
        currentTime = breakTime * 60;
    updateDisplay();
}

function tick() {
    if (currentTime > 0) {
        currentTime--;
    } 
    else {

        if (isSession) {
            isSession = false;
            currentTime = breakTime * 60;
        }
        else {
            isSession = true;
            currentTime = sessionTime * 60;
        }
    }
    updateDisplay();
}

startBtn.onclick = function () {
    if (!running) {
        timer = setInterval(tick, 1000);
        running = true;
        startBtn.textContent = "Pause";
        disableButtons(true);
    } 
    else {
        clearInterval(timer);
        running = false;
        startBtn.textContent = "Start";
        disableButtons(false);
    }
}

resetBtn.onclick = function () {
    clearInterval(timer);
    running = false;
    isSession = true;
    currentTime = sessionTime * 60;
    startBtn.textContent = "Start";
    disableButtons(false);
    updateDisplay();
}
updateDisplay();