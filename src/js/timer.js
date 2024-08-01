let timerInterval;
let startTime;

export function startTimer() {
  clearInterval(timerInterval);
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsedTime = Date.now() - startTime;
    const minutes = String(Math.floor(elapsedTime / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(2, '0');
    document.querySelector('.timer').textContent = `${minutes}:${seconds}`;
  }, 1000);
}

export function stopTimer() {
  clearInterval(timerInterval);
}