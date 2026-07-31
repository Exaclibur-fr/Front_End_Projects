let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;

let timer = null;
let running = false;

const time = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

function updateDisplay() {

    let h = String(hours).padStart(2, "0");
    let m = String(minutes).padStart(2, "0");
    let s = String(seconds).padStart(2, "0");
    let ms = String(milliseconds).padStart(2, "0");

    time.textContent = `${h}:${m}:${s}:${ms}`;
}

function tick() {

    milliseconds++;

    if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;
    }

    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    if (minutes === 60) {
        minutes = 0;
        hours++;
    }

    updateDisplay();
}

startBtn.onclick = function () {

    if (!running) {

        timer = setInterval(tick, 10); // 10 milliseconds

        running = true;

        startBtn.textContent = "Stop";
        startBtn.classList.add("stop");

        lapBtn.textContent = "Lap";

    } else {

        clearInterval(timer);

        running = false;

        startBtn.textContent = "Start";
        startBtn.classList.remove("stop");

        lapBtn.textContent = "Reset";

    }

};

lapBtn.onclick = function () {

    if (running) {

        let li = document.createElement("li");

        let left = document.createElement("span");
        left.textContent = "Lap " + (laps.children.length + 1);

        let right = document.createElement("span");
        right.textContent = time.textContent;

        li.appendChild(left);
        li.appendChild(right);

        laps.prepend(li);

    } else {

        clearInterval(timer);

        running = false;

        hours = 0;
        minutes = 0;
        seconds = 0;
        milliseconds = 0;

        updateDisplay();

        laps.innerHTML = "";

    }

};

updateDisplay();
