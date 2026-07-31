let minutes = 20;
let seconds = 0;

let currentTime = minutes * 60 + seconds;

let timer = null;
let running = false;

const time = document.getElementById("time");
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

    sessionValue.textContent = minutes + " min";
    breakValue.textContent = seconds + " sec";
}

function disableButtons(value) {

    sessionPlus.disabled = value;
    sessionMinus.disabled = value;

    breakPlus.disabled = value;
    breakMinus.disabled = value;
}

sessionPlus.onclick = function () {

    if (!running) {

        minutes++;
        currentTime = minutes * 60 + seconds;

        updateDisplay();
    }

};

sessionMinus.onclick = function () {

    if (!running && minutes > 0) {

        minutes--;
        currentTime = minutes * 60 + seconds;

        updateDisplay();
    }

};

breakPlus.onclick = function () {

    if (!running) {

        if (seconds < 59) {
            seconds++;
        } else {
            seconds = 0;
            minutes++;
        }

        currentTime = minutes * 60 + seconds;

        updateDisplay();
    }

};

breakMinus.onclick = function () {

    if (!running) {

        if (seconds > 0) {
            seconds--;
        }
        else if (minutes > 0) {
            minutes--;
            seconds = 59;
        }

        currentTime = minutes * 60 + seconds;

        updateDisplay();
    }

};

function tick() {

    if (currentTime > 0) {

        currentTime--;

        updateDisplay();

    } else {

        clearInterval(timer);

        running = false;

        startBtn.textContent = "Start";

        disableButtons(false);

        alert("Time's Up!");

    }

}

startBtn.onclick = function () {

    if (!running) {

        timer = setInterval(tick, 1000);

        running = true;

        startBtn.textContent = "Pause";

        disableButtons(true);

    } else {

        clearInterval(timer);

        running = false;

        startBtn.textContent = "Start";

        disableButtons(false);

    }

};

resetBtn.onclick = function () {

    clearInterval(timer);

    running = false;

    currentTime = minutes * 60 + seconds;

    startBtn.textContent = "Start";

    disableButtons(false);

    updateDisplay();

};

updateDisplay();
