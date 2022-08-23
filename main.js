const timerTxt = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const cancelBtn = document.getElementById('cancel-btn');
const pauseBtn = document.getElementById('pause-btn');
// const timerMin = parseInt(document.getElementById('timer-min'));

// console.log(typeof timerMin);

//Timer
let time = '';
let min = '';
let sec = '';

let state = 0; // 0 = standby, 1 = running, 2 = paused, 3 = break time, 4 = break time paused

let START_TIME = 5;
let BREAK_TIME = 3;

const HIDDEN_CLASSNAME = 'hidden';

let getTimer = null;

const timer = () => {
  min = parseInt(time / 60);
  sec = time % 60;
  timerTxt.innerHTML = `${min} 분 ${sec} 초`;
  time--;
  if (time < 0 && state === 1) {
    clearTimeout(getTimer);
    timerTxt.innerHTML = '끝, 휴식 시작할까요?';
    state = 3;
    startBtn.classList.remove(HIDDEN_CLASSNAME);
    pauseBtn.classList.add(HIDDEN_CLASSNAME);
  } else if (time < 0 && state === 3) {
    clearTimeout(getTimer);
    timerTxt.innerHTML = '휴식 끝, 다시 집중하시겠어요?';
    state = 0;
    startBtn.classList.remove(HIDDEN_CLASSNAME);
    pauseBtn.classList.add(HIDDEN_CLASSNAME);
  }
};

function onClickStart() {
  startBtn.classList.add(HIDDEN_CLASSNAME);
  pauseBtn.classList.remove(HIDDEN_CLASSNAME);
  if (state === 0) {
    console.log('state: ', state);
    state = 1;
    console.log('state: ', state);
    time = START_TIME;
    getTimer = setInterval(timer, 1000);
  } else if (state === 2) {
    console.log('state: ', state);
    state = 1;
    console.log('state: ', state);
    time = remainedTime;
    getTimer = setInterval(timer, 1000);
  } else if (state === 3) {
    console.log('state: ', state);
    time = BREAK_TIME;
    getTimer = setInterval(timer, 1000);
  } else if (state === 4) {
    console.log('state: ', state);
    state = 3;
    console.log('state: ', state);
    time = remainedTime;
    getTimer = setInterval(timer, 1000);
  }
}

function onClickPause() {
  startBtn.classList.remove(HIDDEN_CLASSNAME);
  pauseBtn.classList.add(HIDDEN_CLASSNAME);
  if (state === 1) {
    clearInterval(getTimer);
    console.log('state: ', state);
    state = 2;
    remainedTime = time;
    console.log('state: ', state);
  } else if (state === 3) {
    clearInterval(getTimer);
    console.log('state: ', state);
    state = 4;
    remainedTime = time;
    console.log('state: ', state);
  }
}

function onClickCancel() {
  if (state !== 0) {
    clearInterval(getTimer);
    timerTxt.innerHTML = '종료';
    console.log('state: ', state);
    state = 0;
    console.log('state: ', state);
    startBtn.classList.remove(HIDDEN_CLASSNAME);
    pauseBtn.classList.add(HIDDEN_CLASSNAME);
  }
}

startBtn.addEventListener('click', onClickStart);
pauseBtn.addEventListener('click', onClickPause);
cancelBtn.addEventListener('click', onClickCancel);
