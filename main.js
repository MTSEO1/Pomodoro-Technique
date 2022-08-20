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

let state = 0; // 0 = standby, 1 = running, 2 = paused, 3 = resumed

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
    // breakTimer();
  }
};

function onClickStart() {
  startBtn.classList.add(HIDDEN_CLASSNAME);
  pauseBtn.classList.remove(HIDDEN_CLASSNAME);
  time = 3;
  doit = setInterval(timer, 1000);
}

function onClickPause() {
  clearInterval(doit);
  remainedTime = time + 1;
  console.log('pause');
  console.log(remainedTime);
}
startBtn.addEventListener('click', onClickStart);
pauseBtn.addEventListener('click', onClickPause);
// cancelBtn.addEventListener('click', onClickCancel);

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
