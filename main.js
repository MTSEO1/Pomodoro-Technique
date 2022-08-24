const timerTxt = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const cancelBtn = document.getElementById('cancel-btn');
const pauseBtn = document.getElementById('pause-btn');
const audio = new Audio('sound/beep.mp3');
const timerMin = document.getElementById('timer-min');
const breakMin = document.getElementById('break-min');
const submitMin = document.getElementById('submit-min');

let START_TIME = 25 * 60;
let BREAK_TIME = 5 * 60;

submitMin.addEventListener('click', () => {
  if (BREAK_TIME > 0 && START_TIME > 0) {
    onClickCancel();
    BREAK_TIME = parseInt(breakMin.value) * 60;
    START_TIME = parseInt(timerMin.value) * 60;
  } else alert('시간 지정을 음수로 할 수 없습니다.');
});

//Timer
let time = '';
let min = '';
let sec = '';

let state = 0; // 0 = standby, 1 = running, 2 = paused, 3 = break time, 4 = break time paused

const HIDDEN_CLASSNAME = 'hidden';

let getTimer = null;

const timer = () => {
  min = parseInt(time / 60);
  sec = parseInt(time % 60);
  timerTxt.innerHTML = `${min} 분 ${sec} 초`;
  time--;
  if (time < 0 && state === 1) {
    clearTimeout(getTimer);
    audio.play();
    timerTxt.innerHTML = '끝, 휴식 시작할까요?';
    state = 3;
    startBtn.classList.remove(HIDDEN_CLASSNAME);
    pauseBtn.classList.add(HIDDEN_CLASSNAME);
  } else if (time < 0 && state === 3) {
    clearTimeout(getTimer);
    audio.play();
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
