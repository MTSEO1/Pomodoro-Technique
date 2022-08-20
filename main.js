const timerTxt = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const cancelBtn = document.getElementById('cancel-btn');
const pauseBtn = document.getElementById('pause-btn');

//Timer
let time = '';
let min = '';
let sec = '';

let state = 0; // 0 = standby, 1 = running, 2 = paused, 3 = break time

// let START_TIME = 0;
// let BREAK_TIME = 3;

const HIDDEN_CLASSNAME = 'hidden';

let doit = null;

const timer = () => {
  min = parseInt(time / 60);
  sec = time % 60;
  timerTxt.innerHTML = `${min} 분 ${sec} 초`;
  time--;
  if (time < 0 && state == 1) {
    clearTimeout(doit);
    timerTxt.innerHTML = '끝, 휴식 시작할까요?';
    state = 3;
  } else if (time < 0 && state == 3) {
    clearTimeout(doit);
    timerTxt.innerHTML = '휴식 끝, 다시 집중하시겠어요?';
    state = 0;
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
  } else if (state == 3) {
    time = 3;
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
