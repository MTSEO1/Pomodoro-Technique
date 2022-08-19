const timer = document.querySelector('.timer');
const startBtn = document.querySelector('.start-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const pauseBtn = document.querySelector('.pause-btn');
// P Timer
let time = 1500;
let min = '';
let sec = '';
// Break Timer
let breakTime = 300;
let breakMin = '';
let breakSec = '';

// function finishTimer() {
//   console.log('Finishi! ');
//}

function onClickStart() {
  let pTimer = setInterval(function () {
    min = parseInt(time / 60);
    sec = time % 60;
    timer.innerHTML = `${min} 분 ${sec} 초`;
    time--;

    if (time < 0) {
      clearTimeout(pTimer);
      timer.innerHTML = '끝, 휴식 시작할까요?';
      breakTimer();
    }
  }, 1000);
}

function breakTimer() {
  let bTimer = setInterval(function () {
    min = parseInt(breakTime / 60);
    sec = breakTime % 60;
    timer.innerHTML = `${min} 분 ${sec} 초`;
    breakTime--;

    if (breakTime < 0) {
      clearTimeout(bTimer);
      timer.innerHTML = '휴식 끝';
    }
  }, 1000);
}

// function onClickCancel() {
//   clearInterval(pTimer);
// }
// function onClickPause() {}

startBtn.addEventListener('click', onClickStart);
// cancelBtn.addEventListener('click', onClickCancel);
// pauseBtn.addEventListener('click', onClickPause);
