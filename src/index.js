import { darkModeBtn } from './dark-mode';
import './style.css';
import myAudio from './sound/beep.mp3';
import onAudio from './sound/start.mp3';
import { displaySet } from './modal';
import NoSleep from 'nosleep.js';

var noSleep = new NoSleep();

const contents = document.getElementById('contanier-contents');
const timerTxt = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const cancelBtn = document.getElementById('cancel-btn');
const pauseBtn = document.getElementById('pause-btn');
const audio = new Audio(myAudio);
const audioStart = new Audio(onAudio); // 오디오 켜는 기능
const timerMin = document.getElementById('timer-min');
const breakMin = document.getElementById('break-min');
const submitMin = document.getElementById('submit-min');
const title = document.querySelector('title');
const autoTime = document.getElementById('auto-time');
const soundBtn = document.getElementById('sound-btn');

//Counter
const count = document.getElementById('counter');
let counter = 0;
count.innerHTML = `counter : ${counter}`;

//Set Time
let setTimerMin = parseInt(timerMin.value);
let setBreakMin = parseInt(breakMin.value);

timerMin.addEventListener('change', () => {
  setTimerMin = parseInt(timerMin.value);
  console.log('setTimerMin ', setTimerMin);
});

breakMin.addEventListener('change', () => {
  setBreakMin = parseInt(breakMin.value);
  console.log('setBreakMin ', setBreakMin);
});

//Timer default value
// let START_TIME = 5;
// let BREAK_TIME = 3;
let START_TIME = 25 * 60;
let BREAK_TIME = 5 * 60;

//set Timer
submitMin.addEventListener('click', () => {
  if (setTimerMin > 60 || setBreakMin > 60) {
    alert('시간을 올바르게 지정해 주세요.');
  } else if (setTimerMin > 0 && setBreakMin > 0) {
    onClickCancel();
    BREAK_TIME = setBreakMin * 60;
    START_TIME = setTimerMin * 60;
    timerTxt.innerHTML = `${
      START_TIME / 60 < 10 ? `0${START_TIME / 60}` : START_TIME / 60
    } 분 00 초`;
    counter = 0;
    count.innerHTML = `counter : ${counter}`;
    console.log('적용완료!');
  } else alert('시간을 올바르게 지정해 주세요.');
});

//Timer
let time = '';
let min = '';
let sec = '';
let remainedTime = '';

let state = 0; // 0 = standby, 1 = running, 2 = paused, 3 = break time, 4 = break time paused

let soundstate = 1; // 0 = off, 1 = on

let autostate = 0; // 0 = off, 1 = on

const HIDDEN_CLASSNAME = 'hidden';

let getTimer = null;
`🍅 ${min} : ${sec}`;
const timer = () => {
  min = parseInt(time / 60);
  sec = parseInt(time % 60);
  title.innerHTML =
    '🍅 ' + `${min < 10 ? `0${min}` : min} : ${sec < 10 ? `0${sec}` : sec}`;
  timerTxt.innerHTML = `${min < 10 ? `0${min}` : min} 분 ${
    sec < 10 ? `0${sec}` : sec
  } 초`;
  time--;
  if (time < 0 && state === 1) {
    clearTimeout(getTimer);
    audioPlay();

    if (autostate === 0) {
      timerTxt.innerHTML = '끝, 휴식 시작할까요?';
      title.innerHTML = '🍅 뽀모도로';
      state = 3;
      counter += 1;
      count.innerHTML = `counter : ${counter}`;
      startBtn.classList.remove(HIDDEN_CLASSNAME);
      pauseBtn.classList.add(HIDDEN_CLASSNAME);
      cancelBtn.classList.add(HIDDEN_CLASSNAME);
    } else {
      state = 3;
      counter += 1;
      count.innerHTML = `counter : ${counter}`;
      onClickStart();
    }
  } else if (time < 0 && state === 3) {
    clearTimeout(getTimer);
    audioPlay();

    if (autostate === 0) {
      timerTxt.innerHTML = '휴식 끝, 다시 집중하시겠어요?';
      title.innerHTML = '🍅 뽀모도로';
      state = 0;
      startBtn.classList.remove(HIDDEN_CLASSNAME);
      pauseBtn.classList.add(HIDDEN_CLASSNAME);
      cancelBtn.classList.add(HIDDEN_CLASSNAME);
    } else {
      state = 0;
      onClickStart();
    }
  }
};

function onClickStart() {
  startBtn.classList.add(HIDDEN_CLASSNAME);
  pauseBtn.classList.remove(HIDDEN_CLASSNAME);
  cancelBtn.classList.remove(HIDDEN_CLASSNAME);
  noSleep.enable();
  audioStart.play();
  if (state === 0) {
    console.log('state: ', state);
    state = 1;
    console.log('state: ', state);
    time = START_TIME;
    contents.classList.remove('break-mode');
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
    contents.classList.add('break-mode');
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
  cancelBtn.classList.remove(HIDDEN_CLASSNAME);
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
    clearTimeout(getTimer);
    title.innerHTML = '🍅 뽀모도로';
    console.log('state: ', state);
    noSleep.disable();
    state = 0;
    contents.classList.remove('break-mode');
    timerTxt.innerHTML = `${
      START_TIME / 60 < 10 ? `0${START_TIME / 60}` : START_TIME / 60
    } 분 00 초`;
    console.log('state: ', state);
    counter = 0;
    count.innerHTML = `counter : ${counter}`;
    startBtn.classList.remove(HIDDEN_CLASSNAME);
    pauseBtn.classList.add(HIDDEN_CLASSNAME);
    cancelBtn.classList.add(HIDDEN_CLASSNAME);
  }
}

function audioPlay() {
  if (soundstate === 1) {
    audio.play();
  } else {
    return;
  }
}

soundBtn.addEventListener('click', () => {
  if (soundstate === 0) {
    soundstate = 1; // sound on
    console.log('soundstate : ', soundstate);
  } else {
    soundstate = 0; // sound off
    console.log('soundstate : ', soundstate);
  }
});

autoTime.addEventListener('click', () => {
  if (autostate === 0) {
    autostate = 1; // on
    console.log('auto-time on', autostate);
  } else {
    autostate = 0; // off
    console.log('auto-time off', autostate);
  }
});

startBtn.addEventListener('click', onClickStart);
pauseBtn.addEventListener('click', onClickPause);
cancelBtn.addEventListener('click', onClickCancel);
