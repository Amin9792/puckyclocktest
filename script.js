
let mode = 'stopwatch';
let running = false;
let interval;
let hours = 0;
let minutes = 0;
let seconds = 0;
let totalSeconds = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const dialog = document.getElementById('dialog');
const setTimerBtn = document.getElementById('setTimerBtn');
const hoursDisplay = document.getElementById('hoursDisplay');
const minutesDisplay = document.getElementById('minutesDisplay');
const secondsDisplay = document.getElementById('secondsDisplay');
const modeStopwatch = document.getElementById('modeStopwatch');
const modeTimer = document.getElementById('modeTimer');

modeStopwatch.addEventListener('click', switchToStopwatch);
modeTimer.addEventListener('click', switchToTimer);
startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);
display.addEventListener('click', openDialog);
setTimerBtn.addEventListener('click', setTimer);

function switchToStopwatch() {
    mode = 'stopwatch';
    modeStopwatch.style.backgroundColor = '#5e4b4b';
    modeTimer.style.backgroundColor = '#7A5C5C';
    display.textContent = '00:00:00';
    reset();
}

function switchToTimer() {
    mode = 'timer';
    modeTimer.style.backgroundColor = '#5e4b4b';
    modeStopwatch.style.backgroundColor = '#7A5C5C';
    display.textContent = '00:00:00';
    reset();
}

function start() {
    if (mode === 'stopwatch') {
        if (!running) {
            running = true;
            interval = setInterval(updateStopwatch, 1000);
        }
    } else if (mode === 'timer') {
        if (!running && totalSeconds > 0) {
            running = true;
            interval = setInterval(updateTimer, 1000);
        }
    }
}

function stop() {
    if (running) {
        running = false;
        clearInterval(interval);
    }
}

function reset() {
    stop();
    if (mode === 'stopwatch') {
        hours = 0;
        minutes = 0;
        seconds = 0;
        display.textContent = '00:00:00';
    } else if (mode === 'timer') {
        totalSeconds = 0;
        display.textContent = '00:00:00';
    }
}

function updateStopwatch() {
    seconds++;
    if (seconds == 60) {
        seconds = 0;
        minutes++;
        if (minutes == 60) {
            minutes = 0;
            hours++;
        }
    }
    display.textContent = formatTime(hours, minutes, seconds);
}

function updateTimer() {
    if (totalSeconds > 0) {
        totalSeconds--;
        const time = calculateTime(totalSeconds);
        display.textContent = formatTime(time.hours, time.minutes, time.seconds);
    } else {
        stop();
        alert('Timer finito!');
    }
}

function formatTime(hours, minutes, seconds) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(value) {
    return value.toString().padStart(2, '0');
}

function openDialog() {
    if (mode === 'timer') {
        dialog.style.display = 'block';
    }
}

function setTimer() {
    const hours = parseInt(hoursDisplay.textContent);
    const minutes = parseInt(minutesDisplay.textContent);
    const seconds = parseInt(secondsDisplay.textContent);
    totalSeconds = hours * 3600 + minutes * 60 + seconds;
    display.textContent = formatTime(hours, minutes, seconds);
    dialog.style.display = 'none';
}

function calculateTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { hours, minutes, seconds };
}

document.getElementById('hoursUp').addEventListener('click', () => {
    hoursDisplay.textContent = pad(parseInt(hoursDisplay.textContent) + 1);
});

document.getElementById('hoursDown').addEventListener('click', () => {
    hoursDisplay.textContent = pad(Math.max(parseInt(hoursDisplay.textContent) - 1, 0));
});

document.getElementById('minutesUp').addEventListener('click', () => {
    minutesDisplay.textContent = pad(parseInt(minutesDisplay.textContent) + 1);
});

document.getElementById('minutesDown').addEventListener('click', () => {
    minutesDisplay.textContent = pad(Math.max(parseInt(minutesDisplay.textContent) - 1, 0));
});

document.getElementById('secondsUp').addEventListener('click', () => {
    secondsDisplay.textContent = pad(parseInt(secondsDisplay.textContent) + 1);
});

document.getElementById('secondsDown').addEventListener('click', () => {
    secondsDisplay.textContent = pad(Math.max(parseInt(secondsDisplay.textContent) - 1, 0));
});
