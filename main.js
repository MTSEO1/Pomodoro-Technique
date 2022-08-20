const timerTxt = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const cancelBtn = document.getElementById('cancel-btn');
const pauseBtn = document.getElementById('pause-btn');
// P Timer
let time = '';
let min = '';
let sec = '';
// Break Timer
let breakTime = '';
let breakMin = '';
let breakSec = '';

let state = 0; // 0 = standby, 1 = running, 2 = paused, 3 = resumed, 4 = break time

const HIDDEN_CLASSNAME = 'hidden';

let doit = null;
const timer = () => {
  min = parseInt(time / 60);
  sec = time % 60;
  timerTxt.innerHTML = `${min} 분 ${sec} 초`;
  time--;
  if (time < 0) {
    clearTimeout(doit);
    timerTxt.innerHTML = '끝, 휴식 시작할까요?';
    state = 0;
    // breakTimer();
  }
};

function onClickStart() {
  startBtn.classList.add(HIDDEN_CLASSNAME);
  pauseBtn.classList.remove(HIDDEN_CLASSNAME);
  if (state == 0) {
    state = 1;
    time = 10;
    doit = setInterval(timer, 1000);
  } else if (state == 2) {
    state = 1;
    time = remainedTime;
    doit = setInterval(timer, 1000);
  }
}

function onClickPause() {
  clearInterval(doit);
  remainedTime = time + 1;
  state = 2;
  console.log('pause');
  console.log(remainedTime);
}

function onClickCancel() {
  clearInterval(doit);
  timerTxt.innerHTML = '종료';
  state = 0;
}

startBtn.addEventListener('click', onClickStart);
pauseBtn.addEventListener('click', onClickPause);
cancelBtn.addEventListener('click', onClickCancel);

// function breakTimer() {
//   breakTime = 10;
//   let bTimer = setInterval(function () {
//     min = parseInt(breakTime / 60);
//     sec = breakTime % 60;
//     timerTxt.innerHTML = `${min} 분 ${sec} 초`;
//     breakTime--;

//     if (breakTime === 0) {
//       clearTimeout(bTimer);
//       timer.innerHTML = '휴식 끝';
//       startBtn.classList.remove(HIDDEN_CLASSNAME);
//       pauseBtn.classList.add(HIDDEN_CLASSNAME);
//     }
//   }, 1000);
// }

// function onClickCancel() {
//   clearInterval(pTimer);
// }
