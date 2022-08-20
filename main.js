const timerTxt = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const cancelBtn = document.getElementById('cancel-btn');
const pauseBtn = document.getElementById('pause-btn');

//Timer
let time = '';
let min = '';
let sec = '';

let state = 0; // 0 = standby, 1 = running, 2 = paused, 3 = break time, 4 = break time paused

let START_TIME = 5;
let BREAK_TIME = 3;

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
    time = START_TIME;
    doit = setInterval(timer, 1000);
  } else if (state == 2) {
    state = 1;
    time = remainedTime;
    doit = setInterval(timer, 1000);
  } else if (state == 3) {
    time = BREAK_TIME;
    doit = setInterval(timer, 1000);
  } else if (state == 4) {
    state = 3;
    time = remainedTime;
    doit = setInterval(timer, 1000);
  }
}

function onClickPause() {
  if (state == 1) {
    clearInterval(doit);
    remainedTime = time + 1;
    state = 2;
    console.log('pause');
    console.log(remainedTime);
  } else if (state == 3) {
    clearInterval(doit);
    remainedTime = time + 1;
    state = 4;
    console.log('pause');
    console.log(remainedTime);
  }
}

function onClickCancel() {
  clearInterval(doit);
  // time = 0;
  timerTxt.innerHTML = '종료';
  state = 0;
}

startBtn.addEventListener('click', onClickStart);
pauseBtn.addEventListener('click', onClickPause);
cancelBtn.addEventListener('click', onClickCancel);
